# Implementation Guide - Legal Documents LessManual

**For:** Claude Code / Next.js Developer
**Project:** LessManual Website
**Stack:** Next.js 14 (App Router), Supabase, TypeScript, Tailwind CSS

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Legal Pages (Next.js Routes)](#legal-pages-nextjs-routes)
4. [RODO Consent Components](#rodo-consent-components)
5. [Supabase Database Schema](#supabase-database-schema)
6. [Form Integration](#form-integration)
7. [Cookie Banner](#cookie-banner)
8. [Testing Checklist](#testing-checklist)
9. [Deployment Checklist](#deployment-checklist)

---

## 1. Overview

This guide explains how to implement the complete legal compliance package for LessManual:

**Documents to implement:**
- ✅ `polityka_prywatnosci_kompletna.md` - Full Privacy Policy (RODO compliant)
- ✅ `polityka_cookies.md` - Cookie Policy
- ✅ `regulamin.md` - Terms of Service
- ✅ `klauzula_rodo_short.md` - Short RODO clause for forms

**Legal requirements:**
- RODO (GDPR) compliance
- Polish law compliance (Ustawa o ochronie danych osobowych, Prawo telekomunikacyjne)
- Consent tracking (required checkboxes, optional marketing consent)
- Cookie banner with opt-in for marketing cookies

---

## 2. File Structure

```
LessManual/
├── app/
│   ├── legal/
│   │   ├── polityka-prywatnosci/
│   │   │   └── page.tsx                 # Privacy Policy page
│   │   ├── polityka-cookies/
│   │   │   └── page.tsx                 # Cookie Policy page
│   │   ├── regulamin/
│   │   │   └── page.tsx                 # Terms of Service page
│   │   └── layout.tsx                   # Legal pages layout (optional)
│   ├── kontakt/
│   │   └── page.tsx                     # Contact page with RODO form
│   └── layout.tsx
├── components/
│   ├── legal/
│   │   ├── RodoConsent.tsx              # RODO consent checkbox component
│   │   ├── MarketingConsent.tsx         # Marketing consent checkbox
│   │   ├── CookieBanner.tsx             # Cookie consent banner
│   │   └── LegalFooter.tsx              # Footer with legal links
│   └── forms/
│       └── ContactForm.tsx              # Contact form with RODO integration
├── lib/
│   ├── supabase/
│   │   ├── client.ts                    # Supabase client
│   │   └── types.ts                     # TypeScript types
│   └── utils/
│       └── consent-tracking.ts          # Consent tracking helpers
├── content/
│   └── legal/
│       ├── polityka-prywatnosci.md      # Markdown source
│       ├── polityka-cookies.md
│       ├── regulamin.md
│       └── klauzula-rodo-short.md
└── supabase/
    └── migrations/
        └── YYYYMMDDHHMMSS_legal_consent_tables.sql
```

---

## 3. Legal Pages (Next.js Routes)

### 3.1 Privacy Policy Page

**File:** `app/legal/polityka-prywatnosci/page.tsx`

```tsx
import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export const metadata: Metadata = {
  title: 'Polityka Prywatności | LessManual',
  description: 'Polityka Prywatności LessManual zgodna z RODO i polskim prawem ochrony danych osobowych.',
  robots: 'index, follow',
}

export default async function PolitykaPrywatnosciPage() {
  // Read markdown file from content directory
  const filePath = path.join(process.cwd(), 'content/legal/polityka-prywatnosci-kompletna.md')
  const markdownContent = fs.readFileSync(filePath, 'utf-8')

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Polityka Prywatności</h1>
        <p className="text-gray-600">
          Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
        </p>
      </div>

      {/* Markdown Content */}
      <div className="prose prose-lg prose-slate max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-ul:my-6 prose-li:my-2
        prose-table:border prose-table:border-gray-300
        prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left
        prose-td:p-3 prose-td:border prose-td:border-gray-300
      ">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      {/* Contact CTA */}
      <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-2">Masz pytania dotyczące ochrony danych?</h3>
        <p className="text-gray-700 mb-4">
          Skontaktuj się z nami: <a href="mailto:kontakt@LessManual" className="text-blue-600 underline">kontakt@LessManual</a>
        </p>
        <a
          href="/kontakt"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Formularz kontaktowy
        </a>
      </div>
    </div>
  )
}
```

**Dependencies to install:**

```bash
npm install react-markdown rehype-raw remark-gfm
```

**Copy markdown to content directory:**

```bash
mkdir -p content/legal
cp lessmanual/legal/polityka_prywatnosci_kompletna.md content/legal/polityka-prywatnosci-kompletna.md
cp lessmanual/legal/polityka_cookies.md content/legal/polityka-cookies.md
cp lessmanual/legal/regulamin.md content/legal/regulamin.md
```

### 3.2 Cookie Policy Page

**File:** `app/legal/polityka-cookies/page.tsx`

```tsx
// Same structure as Privacy Policy, but load polityka-cookies.md

export const metadata: Metadata = {
  title: 'Polityka Cookies | LessManual',
  description: 'Polityka Cookies LessManual - informacje o plikach cookies używanych w serwisie.',
}

export default async function PolitykaCookiesPage() {
  const filePath = path.join(process.cwd(), 'content/legal/polityka-cookies.md')
  const markdownContent = fs.readFileSync(filePath, 'utf-8')

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Same structure as Privacy Policy */}
      {/* ... */}
    </div>
  )
}
```

### 3.3 Terms of Service Page

**File:** `app/legal/regulamin/page.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Regulamin Świadczenia Usług | LessManual',
  description: 'Regulamin świadczenia usług automatyzacji biznesowej przez LessManual.',
}

export default async function RegulaminPage() {
  const filePath = path.join(process.cwd(), 'content/legal/regulamin.md')
  const markdownContent = fs.readFileSync(filePath, 'utf-8')

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Same structure as Privacy Policy */}
      {/* ... */}
    </div>
  )
}
```

---

## 4. RODO Consent Components

### 4.1 RODO Consent Checkbox (Required)

**File:** `components/legal/RodoConsent.tsx`

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RodoConsentProps {
  value: boolean
  onChange: (value: boolean) => void
  error?: string
}

export function RodoConsent({ value, onChange, error }: RodoConsentProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className={`mt-1 h-5 w-5 rounded border-2 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
          required
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "rodo-error" : undefined}
        />
        <span className="text-sm text-gray-700 leading-relaxed">
          Oświadczam, że zapoznałem/am się z{' '}
          <Link
            href="/legal/polityka-prywatnosci"
            target="_blank"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Polityką Prywatności
          </Link>{' '}
          i wyrażam zgodę na przetwarzanie moich danych osobowych przez Bartłomiej Chudzik / LessManual
          w celu kontaktu oraz świadczenia usług automatyzacji AI.{' '}
          <span className="text-red-600 font-semibold">*</span>
        </span>
      </label>

      {error && (
        <p id="rodo-error" className="text-sm text-red-600 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
```

### 4.2 Marketing Consent Checkbox (Optional)

**File:** `components/legal/MarketingConsent.tsx`

```tsx
'use client'

import Link from 'next/link'

interface MarketingConsentProps {
  value: boolean
  onChange: (value: boolean) => void
}

export function MarketingConsent({ value, onChange }: MarketingConsentProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
      />
      <span className="text-sm text-gray-700 leading-relaxed">
        Wyrażam zgodę na otrzymywanie informacji handlowych oraz marketingowych drogą elektroniczną
        (email, SMS) od LessManual zgodnie z{' '}
        <Link
          href="/legal/regulamin"
          target="_blank"
          className="text-blue-600 underline hover:text-blue-700"
        >
          ustawą o świadczeniu usług drogą elektroniczną
        </Link>
        . Zgoda może być cofnięta w dowolnym momencie.{' '}
        <span className="text-gray-500">(opcjonalne)</span>
      </span>
    </label>
  )
}
```

---

## 5. Supabase Database Schema

### 5.1 Create Migration File

**File:** `supabase/migrations/YYYYMMDDHHMMSS_legal_consent_tables.sql`

Replace `YYYYMMDDHHMMSS` with current timestamp (e.g., `20250130194500`).

```sql
-- =====================================================
-- Legal Consent Tracking Tables
-- LessManual RODO Compliance
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. Contacts Table (for form submissions)
-- =====================================================

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,

  -- RODO Consent (REQUIRED)
  rodo_consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  rodo_consent_date TIMESTAMP WITH TIME ZONE,
  rodo_consent_ip INET,
  rodo_consent_user_agent TEXT,

  -- Marketing Consent (OPTIONAL)
  marketing_consent_given BOOLEAN DEFAULT FALSE,
  marketing_consent_date TIMESTAMP WITH TIME ZONE,
  marketing_consent_ip INET,

  -- Source Tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,

  -- Status
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'unsubscribed'

  -- Constraints
  CONSTRAINT contacts_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  CONSTRAINT contacts_rodo_consent_check CHECK (
    (rodo_consent_given = TRUE AND rodo_consent_date IS NOT NULL AND rodo_consent_ip IS NOT NULL)
    OR rodo_consent_given = FALSE
  )
);

-- Indexes for performance
CREATE INDEX contacts_email_idx ON contacts(email);
CREATE INDEX contacts_created_at_idx ON contacts(created_at DESC);
CREATE INDEX contacts_status_idx ON contacts(status);
CREATE INDEX contacts_rodo_consent_idx ON contacts(rodo_consent_given) WHERE rodo_consent_given = TRUE;
CREATE INDEX contacts_marketing_consent_idx ON contacts(marketing_consent_given) WHERE marketing_consent_given = TRUE;

-- =====================================================
-- 2. Consent Log Table (audit trail)
-- =====================================================

CREATE TABLE IF NOT EXISTS consent_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Reference to contact
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  email TEXT NOT NULL,

  -- Consent Details
  consent_type TEXT NOT NULL, -- 'rodo', 'marketing'
  action TEXT NOT NULL, -- 'given', 'withdrawn'

  -- Metadata
  ip_address INET,
  user_agent TEXT,
  method TEXT, -- 'form', 'email_unsubscribe', 'manual'

  -- Evidence (optional)
  evidence JSONB, -- Store form data snapshot, email content, etc.

  CONSTRAINT consent_log_consent_type_check CHECK (consent_type IN ('rodo', 'marketing')),
  CONSTRAINT consent_log_action_check CHECK (action IN ('given', 'withdrawn'))
);

-- Indexes
CREATE INDEX consent_log_contact_id_idx ON consent_log(contact_id);
CREATE INDEX consent_log_email_idx ON consent_log(email);
CREATE INDEX consent_log_created_at_idx ON consent_log(created_at DESC);
CREATE INDEX consent_log_consent_type_idx ON consent_log(consent_type);

-- =====================================================
-- 3. Cookie Consent Table
-- =====================================================

CREATE TABLE IF NOT EXISTS cookie_consent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- User Identification (anonymous until contact form)
  session_id TEXT UNIQUE NOT NULL, -- Client-side generated UUID
  email TEXT, -- Only if user submits contact form later

  -- Consent Preferences
  necessary_cookies BOOLEAN DEFAULT TRUE, -- Always TRUE (required for site functionality)
  functional_cookies BOOLEAN DEFAULT FALSE,
  analytics_cookies BOOLEAN DEFAULT FALSE,
  marketing_cookies BOOLEAN DEFAULT FALSE,

  -- Metadata
  ip_address INET,
  user_agent TEXT,
  consent_version TEXT DEFAULT '1.0', -- Track which version of cookie policy user agreed to

  -- Last Updated
  last_consent_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX cookie_consent_session_id_idx ON cookie_consent(session_id);
CREATE INDEX cookie_consent_email_idx ON cookie_consent(email) WHERE email IS NOT NULL;
CREATE INDEX cookie_consent_created_at_idx ON cookie_consent(created_at DESC);

-- =====================================================
-- 4. Row Level Security (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_consent ENABLE ROW LEVEL SECURITY;

-- Policy: Service role has full access (for API routes)
CREATE POLICY "Service role has full access to contacts"
  ON contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to consent_log"
  ON consent_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to cookie_consent"
  ON cookie_consent
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Anon users can only INSERT (for form submissions)
CREATE POLICY "Anon can insert contacts"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert consent_log"
  ON consent_log
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can insert/update cookie_consent"
  ON cookie_consent
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- 5. Triggers (auto-update timestamps)
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cookie_consent_updated_at
  BEFORE UPDATE ON cookie_consent
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 6. Functions (helper functions)
-- =====================================================

-- Function: Log consent change
CREATE OR REPLACE FUNCTION log_consent_change(
  p_contact_id UUID,
  p_email TEXT,
  p_consent_type TEXT,
  p_action TEXT,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_method TEXT DEFAULT 'form',
  p_evidence JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO consent_log (
    contact_id,
    email,
    consent_type,
    action,
    ip_address,
    user_agent,
    method,
    evidence
  ) VALUES (
    p_contact_id,
    p_email,
    p_consent_type,
    p_action,
    p_ip_address,
    p_user_agent,
    p_method,
    p_evidence
  ) RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. Sample Data (for testing - DELETE in production)
-- =====================================================

-- IMPORTANT: Comment out or delete this section before production deployment

/*
INSERT INTO contacts (
  name,
  email,
  company,
  message,
  rodo_consent_given,
  rodo_consent_date,
  rodo_consent_ip,
  marketing_consent_given,
  marketing_consent_date,
  status
) VALUES (
  'Jan Kowalski',
  'jan.kowalski@example.com',
  'Example Sp. z o.o.',
  'Chciałbym dowiedzieć się więcej o ChatBot AI.',
  TRUE,
  NOW(),
  '192.168.1.1'::INET,
  TRUE,
  NOW(),
  'new'
);
*/
```

### 5.2 Run Migration

```bash
# Make sure Supabase CLI is installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Run migration
supabase db push
```

---

## 6. Form Integration

### 6.1 Contact Form with RODO Consent

**File:** `components/forms/ContactForm.tsx`

```tsx
'use client'

import { useState, FormEvent } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { RodoConsent } from '@/components/legal/RodoConsent'
import { MarketingConsent } from '@/components/legal/MarketingConsent'

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
  rodoConsent?: string
  submit?: string
}

export function ContactForm() {
  const supabase = createClientComponentClient()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })

  const [rodoConsent, setRodoConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana'
    }

    if (!rodoConsent) {
      newErrors.rodoConsent = 'Zgoda na przetwarzanie danych osobowych jest wymagana'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Get client IP (server-side API route recommended for security)
  const getClientIP = async (): Promise<string | null> => {
    try {
      const response = await fetch('/api/get-ip')
      const data = await response.json()
      return data.ip || null
    } catch {
      return null
    }
  }

  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      // Get client IP and user agent
      const clientIP = await getClientIP()
      const userAgent = navigator.userAgent

      // Get UTM parameters and referrer from localStorage/sessionStorage
      const utmSource = sessionStorage.getItem('utm_source') || null
      const utmMedium = sessionStorage.getItem('utm_medium') || null
      const utmCampaign = sessionStorage.getItem('utm_campaign') || null
      const referrer = document.referrer || null

      // Insert contact to Supabase
      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          phone: formData.phone || null,
          message: formData.message,
          rodo_consent_given: rodoConsent,
          rodo_consent_date: new Date().toISOString(),
          rodo_consent_ip: clientIP,
          rodo_consent_user_agent: userAgent,
          marketing_consent_given: marketingConsent,
          marketing_consent_date: marketingConsent ? new Date().toISOString() : null,
          marketing_consent_ip: marketingConsent ? clientIP : null,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          referrer: referrer,
          status: 'new',
        })
        .select()
        .single()

      if (contactError) throw contactError

      // Log RODO consent
      if (contact) {
        await supabase.rpc('log_consent_change', {
          p_contact_id: contact.id,
          p_email: formData.email,
          p_consent_type: 'rodo',
          p_action: 'given',
          p_ip_address: clientIP,
          p_user_agent: userAgent,
          p_method: 'form',
          p_evidence: {
            form_data: formData,
            timestamp: new Date().toISOString(),
          },
        })

        // Log marketing consent if given
        if (marketingConsent) {
          await supabase.rpc('log_consent_change', {
            p_contact_id: contact.id,
            p_email: formData.email,
            p_consent_type: 'marketing',
            p_action: 'given',
            p_ip_address: clientIP,
            p_user_agent: userAgent,
            p_method: 'form',
          })
        }
      }

      // Send notification email (optional - via API route)
      await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact }),
      })

      // Success
      setIsSuccess(true)
      setFormData({ name: '', email: '', company: '', phone: '', message: '' })
      setRodoConsent(false)
      setMarketingConsent(false)

    } catch (error: any) {
      console.error('Form submission error:', error)
      setErrors({ submit: 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Dziękujemy za wiadomość!</h3>
        <p className="text-gray-700">
          Skontaktujemy się z Tobą w ciągu 24 godzin roboczych.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-blue-600 underline hover:text-blue-700"
        >
          Wyślij kolejną wiadomość
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Imię i nazwisko <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
            ${errors.name ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="Jan Kowalski"
          required
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition
            ${errors.email ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="jan.kowalski@firma.pl"
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Firma
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Nazwa Firmy Sp. z o.o."
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="+48 123 456 789"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Wiadomość <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none
            ${errors.message ? 'border-red-500' : 'border-gray-300'}
          `}
          placeholder="Opisz swoje potrzeby..."
          required
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {/* RODO Consent */}
      <RodoConsent
        value={rodoConsent}
        onChange={setRodoConsent}
        error={errors.rodoConsent}
      />

      {/* Marketing Consent */}
      <MarketingConsent
        value={marketingConsent}
        onChange={setMarketingConsent}
      />

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>

      {/* Legal Note */}
      <p className="text-xs text-gray-500 text-center">
        Pola oznaczone <span className="text-red-600">*</span> są wymagane.
        <br />
        Administratorem danych jest Bartłomiej Chudzik / LessManual.
      </p>
    </form>
  )
}
```

---

## 7. Cookie Banner

### 7.1 Cookie Consent Banner Component

**File:** `components/legal/CookieBanner.tsx`

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface CookiePreferences {
  necessary: boolean // Always true
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieBanner() {
  const supabase = createClientComponentClient()

  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')

  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user already made choice
    const consentGiven = localStorage.getItem('cookie-consent')

    if (!consentGiven) {
      setShowBanner(true)
    } else {
      // Load saved preferences
      const saved = JSON.parse(consentGiven)
      setPreferences(saved)
      applyConsent(saved)
    }

    // Generate or retrieve session ID
    let sid = sessionStorage.getItem('session-id')
    if (!sid) {
      sid = crypto.randomUUID()
      sessionStorage.setItem('session-id', sid)
    }
    setSessionId(sid)
  }, [])

  const applyConsent = (prefs: CookiePreferences) => {
    // Apply consent to third-party scripts

    // Analytics (Google Analytics + Google Tag Manager)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied'
      })
    }

    // Marketing (LinkedIn Ads, Meta Ads)
    if (prefs.marketing) {
      // Enable LinkedIn Insight Tag
      // Enable Meta Pixel
      // (Load scripts dynamically here)
    } else {
      // Disable marketing scripts
    }
  }

  const saveConsent = async (prefs: CookiePreferences) => {
    // Save to localStorage
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))

    // Save to Supabase
    const clientIP = await getClientIP()

    await supabase
      .from('cookie_consent')
      .upsert({
        session_id: sessionId,
        necessary_cookies: true,
        functional_cookies: prefs.functional,
        analytics_cookies: prefs.analytics,
        marketing_cookies: prefs.marketing,
        ip_address: clientIP,
        user_agent: navigator.userAgent,
        consent_version: '1.0',
        last_consent_date: new Date().toISOString(),
      }, {
        onConflict: 'session_id',
      })

    // Apply consent
    applyConsent(prefs)

    // Hide banner
    setShowBanner(false)
  }

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    setPreferences(allAccepted)
    saveConsent(allAccepted)
  }

  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    }
    setPreferences(necessaryOnly)
    saveConsent(necessaryOnly)
  }

  const saveCustom = () => {
    saveConsent(preferences)
  }

  const getClientIP = async (): Promise<string | null> => {
    try {
      const response = await fetch('/api/get-ip')
      const data = await response.json()
      return data.ip || null
    } catch {
      return null
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {!showDetails ? (
          // Simple banner
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Ta strona używa plików cookies</h3>
              <p className="text-sm text-gray-700">
                Używamy cookies aby zapewnić prawidłowe działanie strony oraz opcjonalnie do analizy ruchu i reklam.{' '}
                <Link href="/legal/polityka-cookies" target="_blank" className="text-blue-600 underline">
                  Dowiedz się więcej
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDetails(true)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Dostosuj
              </button>
              <button
                onClick={acceptNecessary}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Tylko niezbędne
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Akceptuj wszystkie
              </button>
            </div>
          </div>
        ) : (
          // Detailed preferences
          <div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Ustawienia cookies</h3>
              <p className="text-sm text-gray-700">
                Wybierz, które kategorie cookies chcesz zaakceptować.{' '}
                <Link href="/legal/polityka-cookies" target="_blank" className="text-blue-600 underline">
                  Polityka Cookies
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              {/* Necessary */}
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 h-5 w-5 rounded border-2 border-gray-400 text-gray-500 cursor-not-allowed"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Niezbędne cookies (wymagane)</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Te pliki cookies są niezbędne do prawidłowego działania strony i nie mogą być wyłączone.
                  </p>
                </div>
              </label>

              {/* Functional */}
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Funkcjonalne cookies</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Zapamiętanie preferencji użytkownika (np. strefa czasowa, język).
                  </p>
                </div>
              </label>

              {/* Analytics */}
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Analityczne cookies</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Google Analytics + Google Tag Manager (analiza ruchu).
                  </p>
                </div>
              </label>

              {/* Marketing */}
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Marketingowe cookies</div>
                  <p className="text-sm text-gray-600 mt-1">
                    LinkedIn Ads, Meta Ads - personalizacja reklam na podstawie zachowań.
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Wstecz
              </button>
              <button
                onClick={acceptNecessary}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Tylko niezbędne
              </button>
              <button
                onClick={saveCustom}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Zapisz wybrane
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## 8. Testing Checklist

Before deploying to production, test the following:

### 8.1 Legal Pages

- [ ] `/legal/polityka-prywatnosci` loads correctly
- [ ] `/legal/polityka-cookies` loads correctly
- [ ] `/legal/regulamin` loads correctly
- [ ] All internal links work (anchors, cross-references)
- [ ] External links open in new tab
- [ ] Mobile responsive (test on iPhone, Android)
- [ ] Markdown renders correctly (tables, lists, headings)

### 8.2 Contact Form

- [ ] Form validation works (required fields)
- [ ] Email validation (invalid format shows error)
- [ ] RODO consent checkbox required (cannot submit without)
- [ ] Marketing consent checkbox optional (can submit without)
- [ ] Form submission saves to Supabase `contacts` table
- [ ] `rodo_consent_given` = TRUE recorded
- [ ] `rodo_consent_date`, `rodo_consent_ip` recorded
- [ ] `marketing_consent_given` recorded correctly (TRUE/FALSE)
- [ ] Consent log entries created in `consent_log` table
- [ ] Success message displays after submission
- [ ] Error handling works (network error, Supabase error)

### 8.3 Cookie Banner

- [ ] Banner shows on first visit
- [ ] Banner hidden after choice
- [ ] "Akceptuj wszystkie" saves all preferences
- [ ] "Tylko niezbędne" saves only necessary cookies
- [ ] Custom preferences save correctly
- [ ] Preferences persisted in localStorage
- [ ] Preferences saved to Supabase `cookie_consent` table
- [ ] Session ID generated and tracked
- [ ] Third-party scripts load/block based on consent (Google Analytics, LinkedIn, Meta)

### 8.4 Database

- [ ] `contacts` table exists
- [ ] `consent_log` table exists
- [ ] `cookie_consent` table exists
- [ ] RLS policies work (anon can insert, service_role full access)
- [ ] Indexes exist for performance
- [ ] `log_consent_change` function works
- [ ] Timestamps auto-update (`updated_at` trigger)

---

## 9. Deployment Checklist

### 9.1 Before Deployment

- [x] **Replace placeholders** in markdown files: ✅ **DONE**
  - `[DATA]` → "30 października 2025" ✅
  - `[email]` → "kontakt@LessManual" ✅
  - `[telefon]` → USUNIĘTY (kontakt tylko email) ✅
  - `[NIP]` → "1231589909" (z CEIDG) ✅
  - `[kod pocztowy]` → "05-530" (z CEIDG) ✅

- [ ] **Review legal documents** with lawyer (optional but recommended)

- [ ] **Delete sample data** from migration file (`supabase/migrations/*_legal_consent_tables.sql` - comment out or delete `INSERT INTO contacts ...` section)

- [ ] **Environment variables** set in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (for API routes)

- [ ] **API route for IP detection** (`/api/get-ip/route.ts`):

```tsx
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Get IP from Vercel headers
  const ip = request.headers.get('x-real-ip') ||
             request.headers.get('x-forwarded-for')?.split(',')[0] ||
             'unknown'

  return NextResponse.json({ ip })
}
```

### 9.2 Post-Deployment

- [ ] Test all legal pages in production
- [ ] Test contact form submission in production
- [ ] Test cookie banner in incognito mode
- [ ] Verify Supabase data saved correctly
- [ ] Check console for errors
- [ ] Test on mobile devices (iOS Safari, Chrome Android)
- [ ] Monitor application logs for errors (first 24h)

### 9.3 RODO Compliance Final Checks

- [ ] Privacy Policy accessible from all forms (checkbox link works)
- [ ] Cookie Policy accessible from cookie banner
- [ ] Terms of Service accessible from footer
- [ ] Contact email for RODO requests visible (`kontakt@LessManual`)
- [ ] Consent logging works (audit trail in `consent_log` table)
- [ ] Data retention policy documented (in Privacy Policy)
- [ ] User rights documented (access, deletion, rectification, objection)

---

## 10. Maintenance

### 10.1 Regular Tasks

**Monthly:**
- Review `contacts` table for RODO compliance (delete old data per retention policy)
- Check `consent_log` for audit trail integrity

**Quarterly:**
- Review Privacy Policy for legal updates (RODO, Polish law changes)
- Update Cookie Policy if new cookies added

**Annually:**
- Legal audit with lawyer (recommended for B2B SaaS)
- Review consent retention policies (5 years for invoices, 3 years for marketing)

### 10.2 Contact for Questions

**Developer questions:**
- This implementation guide
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs

**Legal questions:**
- UODO (Polish DPA): https://uodo.gov.pl
- RODO text: https://eur-lex.europa.eu/eli/reg/2016/679/oj

---

**Implementation Guide Complete.**

**Questions? Contact:** kontakt@LessManual
