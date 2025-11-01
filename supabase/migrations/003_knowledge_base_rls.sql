-- Migration 003: Add RLS policies for knowledge_base table
-- Purpose: Allow service_role to insert/read embeddings for semantic search
-- Issue: knowledge_base table had no RLS policies, causing silent insert failures
-- Date: 2025-11-01

-- Enable Row Level Security
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow service_role to insert
-- Used by: scripts/populate-knowledge-base.ts
CREATE POLICY "Allow service_role inserts" ON knowledge_base
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Policy 2: Allow service_role to read
-- Used by: match_knowledge() RPC function
CREATE POLICY "Allow service_role reads" ON knowledge_base
  FOR SELECT TO service_role
  USING (true);

-- Policy 3: Allow anon to read (for chatbot API route)
-- Used by: src/app/api/chatbot/route.ts (with SUPABASE_SERVICE_ROLE_KEY)
CREATE POLICY "Allow anon reads for semantic search" ON knowledge_base
  FOR SELECT TO anon
  USING (true);

-- Documentation
COMMENT ON POLICY "Allow service_role inserts" ON knowledge_base IS
  'Allows populate-knowledge-base.ts script to insert FAQ embeddings using service_role key';

COMMENT ON POLICY "Allow service_role reads" ON knowledge_base IS
  'Allows match_knowledge() RPC function to query embeddings for semantic search';

COMMENT ON POLICY "Allow anon reads for semantic search" ON knowledge_base IS
  'Allows chatbot API route (authenticated with service_role key) to perform semantic search';
