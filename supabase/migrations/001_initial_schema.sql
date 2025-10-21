-- LessManual Website Database Schema
-- Run this in Supabase SQL Editor
-- Created: 2025-10-21

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: contacts
-- Purpose: Store contact form submissions
-- =====================================================
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  industry TEXT CHECK (industry IN ('e-commerce', 'gabinet', 'agencja', 'uslugi_b2b', 'inne', NULL)),
  message TEXT,

  -- Metadata
  source TEXT NOT NULL DEFAULT 'website_form',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'demo_scheduled', 'lost')),
  hot_lead_score INT CHECK (hot_lead_score BETWEEN 1 AND 10),

  -- Indexes for common queries
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_hot_lead_score ON contacts(hot_lead_score DESC NULLS LAST);

-- RLS Policies
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (form submission)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated reads (for admin dashboard - future)
CREATE POLICY "Allow authenticated reads" ON contacts
  FOR SELECT TO authenticated
  USING (true);

-- =====================================================
-- TABLE: roi_calculations
-- Purpose: Store ROI calculator submissions
-- =====================================================
CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Calculator inputs
  email TEXT,
  specialization TEXT NOT NULL CHECK (specialization IN ('obsluga_klienta', 'lead_gen', 'content')),
  hours_per_month INT NOT NULL CHECK (hours_per_month >= 0 AND hours_per_month <= 1000),
  hourly_rate INT NOT NULL CHECK (hourly_rate >= 0 AND hourly_rate <= 10000),

  -- Calculated results
  potential_savings INT NOT NULL,

  -- Lead scoring
  hot_lead_score INT NOT NULL DEFAULT 5 CHECK (hot_lead_score BETWEEN 1 AND 10),

  -- Email validation
  CONSTRAINT email_format CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_roi_created_at ON roi_calculations(created_at DESC);
CREATE INDEX idx_roi_hot_lead_score ON roi_calculations(hot_lead_score DESC);
CREATE INDEX idx_roi_email ON roi_calculations(email) WHERE email IS NOT NULL;

-- RLS Policies
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON roi_calculations
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON roi_calculations
  FOR SELECT TO authenticated
  USING (true);

-- =====================================================
-- TABLE: chatbot_conversations
-- Purpose: Store chatbot conversation logs
-- =====================================================
CREATE TABLE chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Session tracking
  session_id UUID NOT NULL,
  messages JSONB[] NOT NULL DEFAULT '{}',

  -- Extracted data from conversation
  specialization TEXT CHECK (specialization IN ('obsluga_klienta', 'lead_gen', 'content', NULL)),
  queries_per_day TEXT CHECK (queries_per_day IN ('<50', '50-200', '200+', 'nie_wiem', NULL)),
  budget TEXT CHECK (budget IN ('3-5k', '5-10k', '10k+', 'chce_dowiedziec_sie_wiecej', NULL)),
  outcome TEXT CHECK (outcome IN ('demo_requested', 'email_sent', 'abandoned', NULL)),

  -- Contact info (if provided)
  email TEXT,
  phone TEXT,

  -- Lead scoring
  hot_lead_score INT CHECK (hot_lead_score BETWEEN 1 AND 10),

  -- Email validation
  CONSTRAINT email_format CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_chatbot_created_at ON chatbot_conversations(created_at DESC);
CREATE INDEX idx_chatbot_session_id ON chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_outcome ON chatbot_conversations(outcome);
CREATE INDEX idx_chatbot_hot_lead_score ON chatbot_conversations(hot_lead_score DESC NULLS LAST);

-- RLS Policies
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON chatbot_conversations
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON chatbot_conversations
  FOR SELECT TO authenticated
  USING (true);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to calculate hot lead score for ROI calculator
CREATE OR REPLACE FUNCTION calculate_roi_hot_lead_score(savings INT)
RETURNS INT AS $$
BEGIN
  -- High priority: savings >= 5000 PLN/month
  IF savings >= 5000 THEN
    RETURN 9;
  -- Medium priority: savings 3000-5000 PLN/month
  ELSIF savings >= 3000 THEN
    RETURN 7;
  -- Low priority: savings < 3000 PLN/month
  ELSE
    RETURN 5;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to calculate hot lead score for chatbot
CREATE OR REPLACE FUNCTION calculate_chatbot_hot_lead_score(
  p_queries_per_day TEXT,
  p_budget TEXT
)
RETURNS INT AS $$
DECLARE
  score INT := 5; -- base score
BEGIN
  -- High queries + high budget = hot lead
  IF p_queries_per_day = '200+' AND p_budget IN ('5-10k', '10k+') THEN
    RETURN 10;
  END IF;

  -- High budget alone
  IF p_budget = '10k+' THEN
    score := score + 3;
  ELSIF p_budget = '5-10k' THEN
    score := score + 2;
  ELSIF p_budget = '3-5k' THEN
    score := score + 1;
  END IF;

  -- High queries alone
  IF p_queries_per_day = '200+' THEN
    score := score + 2;
  ELSIF p_queries_per_day = '50-200' THEN
    score := score + 1;
  END IF;

  -- Cap at 10
  IF score > 10 THEN
    RETURN 10;
  END IF;

  RETURN score;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-calculate hot_lead_score on ROI insert
CREATE OR REPLACE FUNCTION trigger_calculate_roi_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.hot_lead_score := calculate_roi_hot_lead_score(NEW.potential_savings);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_roi_insert
  BEFORE INSERT ON roi_calculations
  FOR EACH ROW
  EXECUTE FUNCTION trigger_calculate_roi_score();

-- Auto-calculate hot_lead_score on chatbot insert/update
CREATE OR REPLACE FUNCTION trigger_calculate_chatbot_score()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.queries_per_day IS NOT NULL AND NEW.budget IS NOT NULL THEN
    NEW.hot_lead_score := calculate_chatbot_hot_lead_score(
      NEW.queries_per_day,
      NEW.budget
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_chatbot_insert
  BEFORE INSERT OR UPDATE ON chatbot_conversations
  FOR EACH ROW
  EXECUTE FUNCTION trigger_calculate_chatbot_score();

-- =====================================================
-- COMMENTS (Documentation)
-- =====================================================

COMMENT ON TABLE contacts IS 'Contact form submissions from website';
COMMENT ON TABLE roi_calculations IS 'ROI calculator usage and lead qualification';
COMMENT ON TABLE chatbot_conversations IS 'Chatbot conversation logs and lead qualification';

COMMENT ON FUNCTION calculate_roi_hot_lead_score IS 'Calculate lead priority based on potential savings';
COMMENT ON FUNCTION calculate_chatbot_hot_lead_score IS 'Calculate lead priority based on queries volume and budget';
