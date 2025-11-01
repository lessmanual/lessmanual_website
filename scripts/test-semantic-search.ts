/**
 * Test Semantic Search
 *
 * This script tests the semantic search functionality by:
 * 1. Generating embeddings for test queries
 * 2. Calling match_knowledge() RPC function
 * 3. Displaying matching FAQ items with similarity scores
 *
 * Usage:
 *   npx tsx scripts/test-semantic-search.ts
 */

import { createClient } from '@supabase/supabase-js'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testSemanticSearch(query: string, locale: 'pl' | 'en' = 'pl') {
  console.log(`\n🔍 Testing query: "${query}" (${locale})\n`)

  try {
    // Step 1: Generate embedding for query
    const { embedding: queryEmbedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: query
    })

    // Step 2: Search knowledge base using pgvector cosine similarity
    const { data: matches, error } = await supabase.rpc('match_knowledge', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 3,
      filter_locale: locale,
      filter_content_type: null // Search both FAQ and sections
    })

    if (error) {
      console.error('❌ Error:', error)
      return
    }

    if (!matches || matches.length === 0) {
      console.log('⚠️  No matches found (similarity < 0.7)')
      console.log('   Try lowering match_threshold or adding more FAQ items\n')
      return
    }

    // Step 3: Display results
    console.log(`✅ Found ${matches.length} matches:\n`)
    matches.forEach((match: any, i: number) => {
      console.log(`${i + 1}. "${match.title}" (similarity: ${match.similarity.toFixed(3)})`)
      console.log(`   Source: ${match.source}`)
      console.log(`   Type: ${match.content_type}`)
      console.log(`   Priority: ${match.priority}/10`)
      console.log(`   Content: ${match.content.substring(0, 150)}...`)
      console.log()
    })
  } catch (error) {
    console.error('💥 Error:', error)
  }
}

async function main() {
  console.log('🚀 Testing Semantic Search\n')
  console.log('=' .repeat(60))

  // Test 1: About services (most common question)
  await testSemanticSearch('czym się zajmujecie')

  console.log('=' .repeat(60))

  // Test 2: Pricing
  await testSemanticSearch('ile kosztuje chatbot')

  console.log('=' .repeat(60))

  // Test 3: Implementation time
  await testSemanticSearch('jak długo trwa wdrożenie')

  console.log('=' .repeat(60))

  // Test 4: ROI calculation
  await testSemanticSearch('czy to się zwróci')

  console.log('=' .repeat(60))

  // Test 5: Data security
  await testSemanticSearch('czy moje dane będą bezpieczne')

  console.log('=' .repeat(60))

  // Test 6: English query
  await testSemanticSearch('what do you do', 'en')

  console.log('=' .repeat(60))

  console.log('\n✨ Test complete!')
  console.log('\nInterpretation:')
  console.log('- Similarity ≥ 0.85: Excellent match (use directly)')
  console.log('- Similarity 0.70-0.85: Good match (use with minor adjustment)')
  console.log('- Similarity < 0.70: Poor match (fall back to GPT)')
}

main()
