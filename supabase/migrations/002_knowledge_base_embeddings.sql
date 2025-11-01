-- Migration: Knowledge Base with OpenAI Embeddings (Phase 2)
-- Purpose: Enable semantic search for FAQ + website content
-- Model: text-embedding-3-small (1536 dimensions)

-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create knowledge_base table
-- Stores FAQ items + website content with OpenAI embeddings
CREATE TABLE IF NOT EXISTS knowledge_base (
  id BIGSERIAL PRIMARY KEY,

  -- Content metadata
  content_type TEXT NOT NULL CHECK (content_type IN ('faq', 'section', 'page')),
  locale TEXT NOT NULL DEFAULT 'pl' CHECK (locale IN ('pl', 'en')),

  -- Source information
  source TEXT NOT NULL, -- e.g., 'faq', 'hero', 'specializations', 'about'
  title TEXT, -- Question or section title

  -- Main content
  content TEXT NOT NULL, -- Answer or section description

  -- OpenAI embedding vector (text-embedding-3-small = 1536 dimensions)
  embedding vector(1536),

  -- Metadata for filtering/ranking
  priority INTEGER DEFAULT 5, -- Higher = more important (1-10)
  tags TEXT[], -- e.g., ['pricing', 'chatbot', 'wdrożenie']

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast vector similarity search
-- Using ivfflat algorithm (recommended for <1M vectors)
CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx
ON knowledge_base
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for filtering by locale
CREATE INDEX IF NOT EXISTS knowledge_base_locale_idx
ON knowledge_base (locale);

-- Create index for content_type filtering
CREATE INDEX IF NOT EXISTS knowledge_base_content_type_idx
ON knowledge_base (content_type);

-- Create full-text search index for hybrid search (optional enhancement)
CREATE INDEX IF NOT EXISTS knowledge_base_content_search_idx
ON knowledge_base
USING gin(to_tsvector('polish', content));

-- Function: Semantic search with cosine similarity
-- Returns most similar content to query embedding
CREATE OR REPLACE FUNCTION match_knowledge (
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 3,
  filter_locale text DEFAULT 'pl',
  filter_content_type text DEFAULT NULL
)
RETURNS TABLE (
  id bigint,
  content_type text,
  source text,
  title text,
  content text,
  priority integer,
  tags text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_base.id,
    knowledge_base.content_type,
    knowledge_base.source,
    knowledge_base.title,
    knowledge_base.content,
    knowledge_base.priority,
    knowledge_base.tags,
    1 - (knowledge_base.embedding <=> query_embedding) as similarity
  FROM knowledge_base
  WHERE
    knowledge_base.locale = filter_locale
    AND (filter_content_type IS NULL OR knowledge_base.content_type = filter_content_type)
    AND 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
  ORDER BY
    knowledge_base.embedding <=> query_embedding,
    knowledge_base.priority DESC
  LIMIT match_count;
END;
$$;

-- Function: Update timestamp on record change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at
CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE knowledge_base IS 'Stores FAQ and website content with OpenAI embeddings for semantic search';
COMMENT ON COLUMN knowledge_base.embedding IS 'OpenAI text-embedding-3-small vector (1536 dimensions)';
COMMENT ON COLUMN knowledge_base.priority IS 'Content importance (1-10, higher = more important)';
COMMENT ON FUNCTION match_knowledge IS 'Semantic search using cosine similarity with OpenAI embeddings';
