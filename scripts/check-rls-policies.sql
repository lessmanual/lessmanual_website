-- Check if RLS is enabled on knowledge_base table
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE tablename = 'knowledge_base';

-- Check existing policies on knowledge_base table
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'knowledge_base'
ORDER BY policyname;

-- Check total rows in knowledge_base
SELECT COUNT(*) as total_rows FROM knowledge_base;

-- Check if service_role can insert (test)
-- This will fail if RLS is blocking, showing us the exact error
-- INSERT INTO knowledge_base (content_type, locale, source, title, content, embedding, priority)
-- VALUES ('faq', 'pl', 'test', 'Test Question', 'Test Answer', array_fill(0, ARRAY[1536])::vector, 5);
