/**
 * Test with LOW threshold to see if there are ANY matches
 */

import { createClient } from '@supabase/supabase-js'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testLowThreshold() {
  console.log('🧪 Testing with LOW threshold (0.1) to see ANY results...\n')

  const query = 'czym się zajmujecie'
  console.log(`Query: "${query}"\n`)

  // Generate embedding
  const { embedding: queryEmbedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query
  })

  console.log(`✅ Generated embedding (length: ${queryEmbedding.length})\n`)

  // Test with threshold 0.1 (very low - should match almost anything)
  const { data: matches, error } = await supabase.rpc('match_knowledge', {
    query_embedding: queryEmbedding,
    match_threshold: 0.1, // VERY LOW
    match_count: 10,      // Return top 10
    filter_locale: 'pl',
    filter_content_type: null
  })

  if (error) {
    console.error('❌ RPC Error:', error)
    return
  }

  console.log(`RPC returned: ${matches?.length || 0} results\n`)

  if (!matches || matches.length === 0) {
    console.error('⚠️  Still no results with threshold 0.1!')
    console.error('   This means RPC function is broken or no data in DB')

    // Double-check: count rows in DB
    const { count } = await supabase
      .from('knowledge_base')
      .select('*', { count: 'exact', head: true })
      .eq('locale', 'pl')

    console.error(`   Polish rows in DB: ${count}`)
    return
  }

  console.log('✅ Found matches! Top results:\n')
  matches.slice(0, 5).forEach((match: any, i: number) => {
    console.log(`${i + 1}. Similarity: ${match.similarity.toFixed(3)}`)
    console.log(`   Title: ${match.title}`)
    console.log(`   Source: ${match.source}`)
    console.log(`   Content: ${match.content.substring(0, 100)}...`)
    console.log()
  })

  console.log('\n📊 Similarity distribution:')
  const similarities = matches.map((m: any) => m.similarity)
  console.log(`   Highest: ${Math.max(...similarities).toFixed(3)}`)
  console.log(`   Lowest: ${Math.min(...similarities).toFixed(3)}`)
  console.log(`   Average: ${(similarities.reduce((a: number, b: number) => a + b, 0) / similarities.length).toFixed(3)}`)
}

testLowThreshold()
