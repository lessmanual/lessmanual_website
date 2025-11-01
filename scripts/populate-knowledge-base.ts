/**
 * Populate Knowledge Base with OpenAI Embeddings
 *
 * This script extracts content from FAQ and website sections,
 * generates OpenAI embeddings, and populates the knowledge_base table.
 *
 * Usage:
 *   npx tsx scripts/populate-knowledge-base.ts
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - OPENAI_API_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import plMessages from '../src/messages/pl.json'
import enMessages from '../src/messages/en.json'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// Initialize Supabase client with service role key (has full access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface KnowledgeItem {
  content_type: 'faq' | 'section' | 'page'
  locale: 'pl' | 'en'
  source: string
  title: string | null
  content: string
  priority: number
  tags: string[]
}

/**
 * Extract FAQ items from messages JSON
 */
function extractFAQItems(locale: 'pl' | 'en'): KnowledgeItem[] {
  const messages = locale === 'pl' ? plMessages : enMessages
  const faq = (messages as any).faq
  const questions = faq?.questions || {}

  const items: KnowledgeItem[] = []

  for (const [key, data] of Object.entries(questions) as any) {
    items.push({
      content_type: 'faq',
      locale,
      source: 'faq',
      title: data.question,
      content: data.answer,
      priority: data.category === 'top5' ? 10 : 7, // Top 5 questions are highest priority
      tags: [data.category, 'faq']
    })
  }

  return items
}

/**
 * Extract website section content
 */
function extractSectionContent(locale: 'pl' | 'en'): KnowledgeItem[] {
  const messages = locale === 'pl' ? plMessages : enMessages
  const items: KnowledgeItem[] = []

  // Hero section
  const hero = (messages as any).hero
  if (hero) {
    items.push({
      content_type: 'section',
      locale,
      source: 'hero',
      title: `${hero.mainHeadline} ${hero.mainHeadlineAccent}`,
      content: `${hero.subheadline}\n\n${hero.body}`,
      priority: 9,
      tags: ['hero', 'main']
    })
  }

  // About section
  const about = (messages as any).about
  if (about) {
    const bio = [about.bio1, about.bio2, about.bio3, about.bio4, about.bio5]
      .filter(Boolean)
      .join('\n\n')

    items.push({
      content_type: 'section',
      locale,
      source: 'about',
      title: `${about.name} - ${about.title}`,
      content: bio,
      priority: 6,
      tags: ['about', 'founder', 'company']
    })
  }

  // Problem-Solution section
  const problemSolution = (messages as any).problemSolution
  if (problemSolution) {
    // Customer Service
    items.push({
      content_type: 'section',
      locale,
      source: 'problem_solution_customer_service',
      title: `${problemSolution.customerService.title} - ${problemSolution.customerService.problem.headline}`,
      content: `Problem: ${problemSolution.customerService.problem.headline}\n${problemSolution.customerService.problem.stats}\n\nRozwiązanie: ${problemSolution.customerService.solution.headline}\n${problemSolution.customerService.solution.description}`,
      priority: 8,
      tags: ['customer_service', 'chatbot', 'problem_solution']
    })

    // Sales
    items.push({
      content_type: 'section',
      locale,
      source: 'problem_solution_sales',
      title: `${problemSolution.sales.title} - ${problemSolution.sales.problem.headline}`,
      content: `Problem: ${problemSolution.sales.problem.headline}\n${problemSolution.sales.problem.stats}\n\nRozwiązanie: ${problemSolution.sales.solution.headline}\n${problemSolution.sales.solution.description}`,
      priority: 8,
      tags: ['sales', 'automation', 'problem_solution']
    })

    // Marketing
    items.push({
      content_type: 'section',
      locale,
      source: 'problem_solution_marketing',
      title: `${problemSolution.marketing.title} - ${problemSolution.marketing.problem.headline}`,
      content: `Problem: ${problemSolution.marketing.problem.headline}\n${problemSolution.marketing.problem.stats}\n\nRozwiązanie: ${problemSolution.marketing.solution.headline}\n${problemSolution.marketing.solution.description}`,
      priority: 8,
      tags: ['marketing', 'content', 'problem_solution']
    })
  }

  // Specializations section
  const specializations = (messages as any).specializations
  if (specializations?.items) {
    for (const [key, spec] of Object.entries(specializations.items) as any) {
      items.push({
        content_type: 'section',
        locale,
        source: `specialization_${key}`,
        title: spec.title,
        content: `${spec.description}\n\nWymierny efekt: ${spec.impact}`,
        priority: 7,
        tags: ['specialization', key]
      })
    }
  }

  return items
}

/**
 * Generate OpenAI embedding for text
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: text
  })

  return embedding
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting knowledge base population...\n')

  try {
    // Step 1: Clear existing data
    console.log('🗑️  Clearing existing knowledge base data...')
    const { error: deleteError } = await supabase
      .from('knowledge_base')
      .delete()
      .neq('id', 0) // Delete all rows

    if (deleteError) {
      console.error('Error clearing data:', deleteError)
      throw deleteError
    }
    console.log('✅ Cleared existing data\n')

    // Step 2: Extract content from both languages
    console.log('📖 Extracting content from messages...')
    const plFAQ = extractFAQItems('pl')
    const enFAQ = extractFAQItems('en')
    const plSections = extractSectionContent('pl')
    const enSections = extractSectionContent('en')

    const allItems = [...plFAQ, ...enFAQ, ...plSections, ...enSections]
    console.log(`✅ Extracted ${allItems.length} items:`)
    console.log(`   - PL FAQ: ${plFAQ.length}`)
    console.log(`   - EN FAQ: ${enFAQ.length}`)
    console.log(`   - PL Sections: ${plSections.length}`)
    console.log(`   - EN Sections: ${enSections.length}\n`)

    // Step 3: Generate embeddings and insert to database
    console.log('🤖 Generating embeddings and populating database...')
    let successCount = 0
    let errorCount = 0

    for (const [index, item] of allItems.entries()) {
      try {
        // Generate embedding
        const textToEmbed = item.title
          ? `${item.title}\n\n${item.content}`
          : item.content

        const embedding = await generateEmbedding(textToEmbed)

        // Debug: Log first item to see what we're sending
        if (index === 0) {
          console.log(`\n🔍 Debug - First item data:`)
          console.log(`   Embedding length: ${embedding.length}`)
          console.log(`   Embedding type: ${typeof embedding}`)
          console.log(`   Embedding sample: [${embedding.slice(0, 3).join(', ')}...]`)
          console.log(`   Content type: ${item.content_type}`)
          console.log(`   Locale: ${item.locale}`)
          console.log(`   Title: ${item.title?.substring(0, 50)}`)
          console.log()
        }

        // Insert to database
        const { data, error } = await supabase.from('knowledge_base').insert({
          content_type: item.content_type,
          locale: item.locale,
          source: item.source,
          title: item.title,
          content: item.content,
          embedding: embedding, // Pass as number array - Supabase should handle conversion
          priority: item.priority,
          tags: item.tags
        }).select()

        if (error) {
          console.error(`\n❌ Error inserting item ${index + 1}:`)
          console.error(`   Code: ${error.code}`)
          console.error(`   Message: ${error.message}`)
          console.error(`   Details:`, error.details)
          console.error(`   Hint:`, error.hint)
          errorCount++
        } else if (!data || data.length === 0) {
          console.error(`\n⚠️  Insert silently failed for item ${index + 1} (no error, but no data returned)`)
          console.error(`   This usually means RLS policy is blocking the insert`)
          console.error(`   Item:`, {
            content_type: item.content_type,
            locale: item.locale,
            source: item.source,
            title: item.title?.substring(0, 50)
          })
          errorCount++
        } else {
          successCount++
          process.stdout.write(
            `\r   Progress: ${successCount}/${allItems.length} (${Math.round((successCount / allItems.length) * 100)}%)`
          )
        }

        // Rate limiting: 3000 requests/minute for text-embedding-3-small
        // Sleep 20ms between requests to stay under limit
        await new Promise((resolve) => setTimeout(resolve, 20))
      } catch (error) {
        console.error(`\n❌ Error processing item ${index + 1}:`, error)
        errorCount++
      }
    }

    console.log(`\n\n✅ Population complete!`)
    console.log(`   Success: ${successCount}`)
    console.log(`   Errors: ${errorCount}`)

    // Step 4: Verify data
    console.log('\n🔍 Verifying data...')
    const { count } = await supabase
      .from('knowledge_base')
      .select('*', { count: 'exact', head: true })

    console.log(`✅ Total rows in knowledge_base: ${count || 0}`)

    // Show sample by locale
    const { count: plCount } = await supabase
      .from('knowledge_base')
      .select('*', { count: 'exact', head: true })
      .eq('locale', 'pl')

    const { count: enCount } = await supabase
      .from('knowledge_base')
      .select('*', { count: 'exact', head: true })
      .eq('locale', 'en')

    console.log(`   - Polish (pl): ${plCount || 0}`)
    console.log(`   - English (en): ${enCount || 0}`)

    console.log('\n✨ Knowledge base is ready for semantic search!')
  } catch (error) {
    console.error('\n💥 Fatal error:', error)
    process.exit(1)
  }
}

// Run the script
main()
