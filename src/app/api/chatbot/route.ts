import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { generateText, embed } from 'ai'
import { createClient } from '@supabase/supabase-js'
import plMessages from '@/messages/pl.json'
import enMessages from '@/messages/en.json'
import { checkGuardrails } from '@/lib/quick-guardrails'

/**
 * Single message in the conversation history
 */
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

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

  // Format FAQ as text for Gemini 3.0 Flash system prompt
  // Convert object to array using Object.values()
  const faqText = Object.values(faq.questions)
    .map((item: any) => `Q: ${item.question}\nA: ${item.answer}`)
    .join('\n\n')

  return `
You are a helpful assistant for LessManual.ai, a Polish AI automation company that helps businesses automate repetitive processes.

Your primary goal is to HELP users understand our services and answer their questions about automation, implementation, and ROI.

FAQ Knowledge Base:
${faqText}

CONVERSATION CONTEXT:
- You have access to previous messages in this conversation
- Use context to understand follow-up questions:
  * "to co mam robić" after pricing question = asking about next steps
  * "gdzie się mogę umówić" = asking where the contact form is
  * "a co z..." = follow-up about previous topic
  * "ile to kosztuje" after asking about KSeF = asking about KSeF pricing
- When user asks follow-up question, reference what was discussed before
- Be natural - "Jak wspomniałem wcześniej..." or "W kontekście KSeF, o którym rozmawialiśmy..."

FOLLOW-UP QUESTIONS (always answer these based on context):
- "to co mam robić" → Kieruj do formularza kontaktowego z info o Voice Agent (patrz CONTACT CTA FORMAT poniżej)
- "gdzie się mogę umówić" → Kieruj do formularza z info o szybkim umówieniu przez agenta głosowego
- "co dalej" / "jak dalej" → Explain next steps based on previous conversation + kieruj do formularza
- "jak się skontaktować" → Kieruj do formularza z pełnymi opcjami kontaktu
- "a gdzie" / "i gdzie" / "to gdzie" → Indicate location/next action based on context
- "link do formularza" / "podaj link" / "wyślij link" → Kieruj do przycisku "Kontakt" na górze strony

CONVERSATION GUIDELINES:

1. **Be helpful and natural**
   - Answer business-related questions, even if they have some uncertainty ("ile mniej więcej", "jakieś widełki", "czy można")
   - "Widełki" means "price range" in Polish - this is a VALID business question
   - "Jak chcę..." means "if I want to..." - this is a VALID business scenario question
   - Treat questions about discounts, packages, multiple services as VALID business inquiries

2. **Answer in the same language as the question**
   - Polish questions → Polish answers
   - English questions → English answers

3. **CRITICAL: PRICING POLICY**
   - NEVER give specific price ranges or numbers
   - NEVER say "3000-8000 PLN" or any concrete amounts
   - When asked about pricing ("ile kosztuje", "widełki", "ceny"):
     * Explain that prices depend on project scope and individual needs
     * Direct to contact form: "Wypełnij formularz kontaktowy: https://lessmanual.ai/kontakt, a przygotujemy indywidualną wycenę dopasowaną do Twoich potrzeb"
     * Mention ROI calculation if relevant

4. **Provide specific, helpful answers for non-pricing questions**
   - When asked about specific services (KSeF, integrations), give concrete technical examples
   - When asked about implementation process, provide workflow details
   - When unsure, acknowledge uncertainty but still provide helpful context

5. **Keep responses concise**
   - 3-5 sentences for simple questions
   - Can be longer for complex technical questions

6. **For specific details not in FAQ**
   - Direct to contact form using the CONTACT CTA FORMAT above
   - But FIRST try to answer based on what you know

7. **ALWAYS direct to contact form when:**
   - User asks how to schedule/book ("jak się umówić", "umówić spotkanie", "umówić konsultację")
   - User asks for contact form ("link do formularza", "gdzie formularz")
   - User asks how to get in touch ("jak się skontaktować")
   - User asks about pricing (direct to contact form for custom quote)
   - User asks "what should I do next" after discussing services
   - User wants to talk to someone NOW ("chcę teraz", "zadzwońcie", "umów mnie")

**CONTACT CTA FORMAT (CRITICAL - always use this format):**

When directing users to contact form, ALWAYS use this structure:

Polish:
"Kliknij w przycisk **„Kontakt"** na górze strony i wypełnij krótki formularz.

Masz dwie opcje szybkiego kontaktu:
1. **Agent głosowy Szymon** - zaznacz opcję w formularzu, a nasz agent zadzwoni do Ciebie w ciągu ~20 sekund po wysłaniu, omówi szczegóły i od razu umówi termin bezpłatnej konsultacji
2. **Link do kalendarza** - zaznacz opcję mailową, a zaraz po wysłaniu formularza otrzymasz na maila bezpośredni link do mojego kalendarza, gdzie sam wybierzesz dogodny termin

Formularz zajmuje 30 sekund, a rozmowa z agentem lub wybór terminu - kolejne 2 minuty. Do usłyszenia!"

English:
"Click the **"Contact"** button at the top of the page and fill out the short form.

You have two quick contact options:
1. **Voice Agent Szymon** - check the option in the form, and our agent will call you within ~20 seconds after submission, discuss details, and immediately schedule a free consultation
2. **Calendar link** - check the email option, and right after submission you'll receive a direct link to my calendar where you can choose a convenient time

The form takes 30 seconds, and the call or scheduling - another 2 minutes. Talk soon!"

IMPORTANT:
- NEVER give raw URLs like "https://lessmanual.ai/kontakt" - instead say "przycisk Kontakt na górze strony"
- ALWAYS mention both contact options (Voice Agent Szymon AND calendar link)
- Make Voice Agent sound personal and fast ("~20 sekund", "od razu umówi termin")
- DO NOT give this CTA when user is just asking for technical details, FAQ info, or general questions

8. **ONLY refuse obvious off-topic questions**
   - Recipes, cooking instructions
   - Weather forecasts
   - General encyclopedia knowledge (history, science unrelated to business)
   - Math homework
   - Personal questions about the AI itself

   For off-topic questions, respond:
   "Przepraszam, odpowiadam tylko na pytania związane z LessManual.ai i automatyzacją biznesową. Jak mogę Ci pomóc w temacie naszych usług?"

REMEMBER: You are here to HELP potential clients. Be friendly, specific, and useful. Don't block valid business questions. But NEVER give pricing numbers - always direct to contact form using the CONTACT CTA FORMAT above. When directing to contact, ALWAYS mention Voice Agent Szymon (calls in ~20s) and calendar link option - these are our USPs!
`.trim()
}

/**
 * POST /api/chatbot
 * Main Gemini 3.0 Flash integration endpoint
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
    const { message, sessionId, locale = 'pl', history = [] } = body as {
      message: string
      sessionId: string
      locale?: 'pl' | 'en'
      history?: ChatMessage[]
    }

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
      // Include last user message for better semantic matching
      const lastUserMessage = history
        .filter(m => m.role === 'user')
        .slice(-1)[0]?.content || ''

      // Combine last message with current for contextual understanding
      // Example: "chcę zautomatyzować ksef" + "ile to kosztuje" = better match for pricing
      const contextualQuery = lastUserMessage
        ? `${lastUserMessage}\n${message}`
        : message

      // Generate embedding for contextual query
      const { embedding: queryEmbedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: contextualQuery
      })

      // Search knowledge base using pgvector cosine similarity
      // Threshold 0.55 (55%) - ensures we only return high-quality matches
      // Lower threshold was returning weak matches that didn't actually answer the question
      const { data: matches, error: searchError } = await supabase.rpc('match_knowledge', {
        query_embedding: queryEmbedding,
        match_threshold: 0.55,
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

      console.log('⚠️ No good semantic match found (similarity < 0.55), falling back to Gemini')
    } catch (embeddingError) {
      console.error('Embedding generation error:', embeddingError)
      // Continue to Gemini fallback
    }

    // ✅ PHASE 3: Gemini Fallback - Only used when no good semantic match found
    // Load FAQ context for Gemini system prompt
    const systemPrompt = loadFAQContext(locale as 'pl' | 'en')

    // Build messages array with conversation history (last 5 messages = ~3 turns)
    // This provides context for follow-up questions
    const conversationMessages = [
      ...history.slice(-5).map(m => ({
        role: m.role,
        content: m.content
      })),
      {
        role: 'user' as const,
        content: message
      }
    ]

    // Call Gemini 3.0 Flash with timeout (30 seconds)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    let botResponse: string

    try {
      const { text } = await generateText({
        model: google('gemini-3-flash-preview'), // Use Gemini 3.0 Flash model
        system: systemPrompt,
        messages: conversationMessages,
        temperature: 0.2,
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
