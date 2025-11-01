import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { generateText, embed } from 'ai'
import { createClient } from '@supabase/supabase-js'
import plMessages from '@/messages/pl.json'
import enMessages from '@/messages/en.json'
import { checkGuardrails } from '@/lib/quick-guardrails'

// Initialize Supabase client (server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Rate limiting map (in-memory, 10 messages per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 })
    return true
  }

  if (limit.count >= 10) return false

  limit.count++
  return true
}

/**
 * Load FAQ context from pl.json or en.json
 */
function loadFAQContext(locale: 'pl' | 'en'): string {
  const messages = locale === 'pl' ? plMessages : enMessages
  const faq = (messages as any).faq

  if (!faq || !faq.questions) return ''

  // Format FAQ as text for GPT-4o-mini system prompt
  // Convert object to array using Object.values()
  const faqText = Object.values(faq.questions)
    .map((item: any) => `Q: ${item.question}\nA: ${item.answer}`)
    .join('\n\n')

  return `
CRITICAL INSTRUCTION - READ THIS FIRST:
You MUST REFUSE to answer ANY question that is NOT about LessManual.ai services.

Examples of questions you MUST REFUSE:
- Recipes (szarlotka, pizza, etc.)
- Weather
- General knowledge
- Math problems
- Programming help
- Any topic unrelated to LessManual.ai

For ANY off-topic question, respond EXACTLY with:
"Przepraszam, odpowiadam tylko na pytania związane z LessManual.ai i automatyzacją biznesową. Jak mogę Ci pomóc w temacie naszych usług?"

You are a professional assistant for LessManual.ai, a Polish AI automation company.

FAQ Knowledge Base:
${faqText}

RULES:
1. ONLY LessManual.ai topics allowed
2. Answer in the same language as the question
3. Keep responses concise (max 3-4 sentences)
4. Never invent prices or features not in FAQ
5. For details: direct to +48 784 099 604 or contact form

REMEMBER: Refuse all off-topic questions immediately. No exceptions.
`.trim()
}

/**
 * POST /api/chatbot
 * Main GPT-4o-mini integration endpoint
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          response:
            'Zbyt wiele zapytań. Proszę spróbować za chwilę. / Too many requests. Please try again in a moment.'
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { message, sessionId, locale = 'pl' } = body

    // Validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        {
          response: locale === 'pl' ? 'Proszę wpisać pytanie.' : 'Please enter a question.'
        },
        { status: 200 }
      )
    }

    // Max 1000 characters
    if (message.length > 1000) {
      return NextResponse.json(
        {
          response:
            locale === 'pl'
              ? 'Wiadomość zbyt długa. Maksymalnie 1000 znaków.'
              : 'Message too long. Maximum 1000 characters.'
        },
        { status: 200 }
      )
    }

    // ✅ PHASE 1: Quick Guardrails - Keyword-based off-topic detection
    // Blocks 80%+ of off-topic questions BEFORE sending to GPT (~1-5ms, $0 cost)
    const guardrailResponse = checkGuardrails(message, locale as 'pl' | 'en')
    if (guardrailResponse) {
      return NextResponse.json({
        response: guardrailResponse
      })
    }

    // ✅ PHASE 2: Semantic Search - Find exact FAQ match using OpenAI embeddings
    // If similarity >= 0.7, return direct answer from knowledge base (~150-300ms, 0.00002$ cost)
    try {
      // Generate embedding for user query
      const { embedding: queryEmbedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: message
      })

      // Search knowledge base using pgvector cosine similarity
      // Threshold 0.4 (40%) - lower than ideal but FAQ doesn't have exact match for "czym się zajmujecie"
      const { data: matches, error: searchError } = await supabase.rpc('match_knowledge', {
        query_embedding: queryEmbedding,
        match_threshold: 0.4,
        match_count: 1,
        filter_locale: locale as 'pl' | 'en',
        filter_content_type: null // Search both FAQ and sections
      })

      if (searchError) {
        console.error('Semantic search error:', searchError)
        // Continue to GPT fallback
      } else if (matches && matches.length > 0) {
        const bestMatch = matches[0]
        console.log(`✅ Semantic match found: "${bestMatch.title}" (similarity: ${bestMatch.similarity.toFixed(3)})`)

        // Return direct answer from knowledge base
        return NextResponse.json({
          response: bestMatch.content,
          responseTime: Date.now() - startTime,
          source: 'knowledge_base',
          similarity: bestMatch.similarity
        })
      }

      console.log('⚠️ No good semantic match found (similarity < 0.7), falling back to GPT')
    } catch (embeddingError) {
      console.error('Embedding generation error:', embeddingError)
      // Continue to GPT fallback
    }

    // ✅ PHASE 3: GPT Fallback - Only used when no good semantic match found
    // Load FAQ context for GPT system prompt
    const systemPrompt = loadFAQContext(locale as 'pl' | 'en')

    // Call OpenAI GPT-5-mini with timeout (30 seconds)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    let botResponse: string

    try {
      const { text } = await generateText({
        model: openai('gpt-4o-mini'), // Use GPT-4o-mini model
        system: systemPrompt,
        prompt: message,
        temperature: 0.2,
        maxTokens: 1500,
        abortSignal: controller.signal
      })

      botResponse = text
    } catch (error: any) {
      clearTimeout(timeout)

      // Handle timeout
      if (error.name === 'AbortError') {
        return NextResponse.json({
          response:
            locale === 'pl'
              ? 'Przepraszam, odpowiedź zajęła zbyt długo. Spróbuj ponownie.'
              : 'Sorry, the response took too long. Try again.'
        })
      }

      // Handle API errors
      throw error
    }

    clearTimeout(timeout)

    const responseTime = Date.now() - startTime

    // Log conversation to Supabase (non-blocking)
    supabase
      .from('chatbot_conversations')
      .insert({
        session_id: sessionId,
        messages: [
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: botResponse, timestamp: new Date().toISOString() }
        ],
        // Optional metadata (can be null)
        specialization: null,
        queries_per_day: null,
        budget: null,
        outcome: null,
        email: null,
        phone: null
      })
      .then(({ error }) => {
        if (error) console.error('Supabase logging error:', error)
      })

    // Return successful response
    return NextResponse.json({
      response: botResponse,
      responseTime
    })
  } catch (error: any) {
    console.error('Chatbot API error:', error)

    // Fallback error response
    return NextResponse.json({
      response:
        'Wystąpił błąd. Możesz wypełnić formularz kontaktowy poniżej. / An error occurred. You can fill out the contact form below.'
    })
  }
}
