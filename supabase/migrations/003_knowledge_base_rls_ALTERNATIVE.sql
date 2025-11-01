-- Migration 003 ALTERNATIVE: Temporarily DISABLE RLS for knowledge_base
-- Purpose: Unblock inserts if RLS policies are causing issues
-- NOTE: This is less secure - use only for testing/development
-- Date: 2025-11-01

-- Option 1: DISABLE RLS completely (testing only)
ALTER TABLE knowledge_base DISABLE ROW LEVEL SECURITY;

-- IMPORTANT: For production, you should enable RLS with proper policies:
-- ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
-- (then add policies from 003_knowledge_base_rls.sql)

COMMENT ON TABLE knowledge_base IS
  'RLS DISABLED for testing - enable with proper policies before production';
