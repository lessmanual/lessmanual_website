-- Migration: Create calculator_leads table
-- Created: 2025-10-27
-- Purpose: Store ROI Calculator lead submissions with RODO compliance

-- Create calculator_leads table
CREATE TABLE IF NOT EXISTS calculator_leads (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,

  -- Calculator data
  product_id TEXT NOT NULL CHECK (product_id IN (
    'chatbot',
    'voiceAgent',
    'contentAgent',
    'salesAutomation',
    'ragChatbot',
    'customSolutions'
  )),
  savings_month INTEGER NOT NULL CHECK (savings_month >= 0),
  savings_year INTEGER NOT NULL CHECK (savings_year >= 0),
  saved_hours_month INTEGER CHECK (saved_hours_month >= 0),
  additional_revenue_month INTEGER DEFAULT 0 CHECK (additional_revenue_month >= 0),

  -- Consent (RODO compliance)
  rodo_consent BOOLEAN NOT NULL DEFAULT FALSE,
  newsletter_consent BOOLEAN DEFAULT FALSE,

  -- Metadata
  inputs JSONB, -- Store all calculator inputs for reference
  source_url TEXT,
  user_agent TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_calculator_leads_email ON calculator_leads(email);
CREATE INDEX IF NOT EXISTS idx_calculator_leads_created_at ON calculator_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calculator_leads_product_id ON calculator_leads(product_id);

-- Enable Row Level Security (RLS)
ALTER TABLE calculator_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow INSERT from anyone (anonymous users can submit)
CREATE POLICY "Allow INSERT for calculator leads"
ON calculator_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- RLS Policy: Only authenticated users can READ (admin dashboard)
CREATE POLICY "Only authenticated users can view leads"
ON calculator_leads
FOR SELECT
TO authenticated
USING (true);

-- Comments for documentation
COMMENT ON TABLE calculator_leads IS 'ROI Calculator lead submissions with RODO compliance';
COMMENT ON COLUMN calculator_leads.rodo_consent IS 'Required: User consent for RODO data processing';
COMMENT ON COLUMN calculator_leads.newsletter_consent IS 'Optional: User consent for marketing newsletter';
COMMENT ON COLUMN calculator_leads.inputs IS 'JSON storing all original calculator inputs for reference';

-- Create function to automatically score high-value leads
CREATE OR REPLACE FUNCTION calculate_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  -- High-value leads: monthly savings >= 5000 PLN
  IF NEW.savings_month >= 5000 THEN
    -- You can add a lead_score column later and update it here
    -- For now, this is placeholder for future n8n webhook trigger
    NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for lead scoring (optional - for future n8n integration)
CREATE TRIGGER trigger_lead_scoring
AFTER INSERT ON calculator_leads
FOR EACH ROW
EXECUTE FUNCTION calculate_lead_score();
