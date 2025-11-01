/**
 * Simple test: Can we insert ANY data to knowledge_base?
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testInsert() {
  console.log('🧪 Testing simple insert...\n')

  // Test 1: Insert without embedding
  console.log('Test 1: Insert without embedding')
  const { data: data1, error: error1 } = await supabase
    .from('knowledge_base')
    .insert({
      content_type: 'faq',
      locale: 'pl',
      source: 'test',
      title: 'Test Question',
      content: 'Test Answer',
      priority: 5,
      tags: ['test']
    })
    .select()

  if (error1) {
    console.error('❌ Error:', error1)
  } else if (!data1 || data1.length === 0) {
    console.error('⚠️  No data returned (silent fail - probably RLS)')
  } else {
    console.log('✅ Success! Inserted ID:', data1[0].id)
  }

  // Test 2: Insert with simple embedding (all zeros)
  console.log('\nTest 2: Insert with zero embedding')
  const zeroEmbedding = new Array(1536).fill(0)

  const { data: data2, error: error2 } = await supabase
    .from('knowledge_base')
    .insert({
      content_type: 'faq',
      locale: 'pl',
      source: 'test',
      title: 'Test Question 2',
      content: 'Test Answer 2',
      embedding: zeroEmbedding,
      priority: 5,
      tags: ['test']
    })
    .select()

  if (error2) {
    console.error('❌ Error:', error2)
  } else if (!data2 || data2.length === 0) {
    console.error('⚠️  No data returned (silent fail - probably RLS)')
  } else {
    console.log('✅ Success! Inserted ID:', data2[0].id)
  }

  // Test 3: Count total rows
  console.log('\nTest 3: Count total rows')
  const { count, error: countError } = await supabase
    .from('knowledge_base')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    console.error('❌ Error:', countError)
  } else {
    console.log(`✅ Total rows: ${count}`)
  }

  console.log('\n🏁 Test complete!')
}

testInsert()
