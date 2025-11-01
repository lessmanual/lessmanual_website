-- Test if match_knowledge RPC function exists and works

-- Test 1: Check if function exists
SELECT
  proname as function_name,
  pronargs as num_args,
  prorettype::regtype as return_type
FROM pg_proc
WHERE proname = 'match_knowledge';

-- Test 2: Check if embeddings exist in database
-- pgvector doesn't have array_length, use vector_dims() instead
SELECT
  id,
  title,
  vector_dims(embedding) as embedding_dimensions,
  embedding IS NOT NULL as has_embedding
FROM knowledge_base
LIMIT 5;

-- Test 3: Call match_knowledge with first item's embedding (self-match test)
-- This should return similarity = 1.0 (identical)
WITH first_item AS (
  SELECT embedding FROM knowledge_base LIMIT 1
)
SELECT * FROM match_knowledge(
  (SELECT embedding FROM first_item),
  0.5,  -- Lower threshold to see ANY results
  5,    -- Return top 5
  'pl',
  NULL
);
