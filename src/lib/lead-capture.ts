/**
 * Lead Capture - ROI Calculator
 *
 * Handles form validation and submission for calculator leads.
 * Implements RODO compliance and Polish phone number validation.
 */

import { z } from 'zod'
import { supabase } from './supabase'
import type { ProductId } from './roi-calculations'

// ============================================
// ZOD VALIDATION SCHEMA
// ============================================

/**
 * Polish phone number regex
 * Accepts formats: +48 123 456 789, +48123456789, 123456789, etc.
 */
const POLISH_PHONE_REGEX = /^(\+48)?[\s-]?[1-9]\d{8}$/

/**
 * Lead Capture Form Schema
 * Implements validation rules from PRD
 */
export const leadCaptureSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Imię i nazwisko musi mieć minimum 2 znaki')
    .max(100, 'Imię i nazwisko jest za długie')
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/, 'Nieprawidłowe znaki w imieniu i nazwisku'),

  email: z
    .string()
    .email('Nieprawidłowy format email')
    .min(5, 'Email jest za krótki')
    .max(100, 'Email jest za długi')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(POLISH_PHONE_REGEX, 'Nieprawidłowy numer telefonu (format: +48 XXX XXX XXX)')
    .transform((val) => val.replace(/[\s-]/g, '')), // Normalize: remove spaces and dashes

  companyName: z
    .string()
    .max(200, 'Nazwa firmy jest za długa')
    .optional()
    .or(z.literal('')), // Allow empty string

  rodoConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Zgoda na przetwarzanie danych jest wymagana'
    })
})

export type LeadCaptureFormData = z.infer<typeof leadCaptureSchema>

// ============================================
// SUPABASE TYPES
// ============================================

export interface CalculatorLead {
  id?: string
  created_at?: string

  // Contact info
  full_name: string
  email: string
  phone: string
  company_name?: string | null

  // Calculator data
  product_id: string
  savings_month: number
  savings_year: number
  saved_hours_month?: number | null
  additional_revenue_month?: number | null

  // Consent
  rodo_consent: boolean

  // Metadata
  inputs?: Record<string, any> | null // JSON with all calculator inputs
  source_url?: string | null
  user_agent?: string | null
}

// ============================================
// LEAD SUBMISSION
// ============================================

export interface SubmitLeadParams {
  formData: LeadCaptureFormData
  productId: ProductId
  savingsMonth: number
  savingsYear: number
  savedHoursMonth?: number
  additionalRevenueMonth?: number
  inputs?: Record<string, any> // Store original calculator inputs
}

/**
 * Submit lead to Supabase calculator_leads table
 *
 * @throws Error if submission fails
 */
export async function submitCalculatorLead(params: SubmitLeadParams): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const {
      formData,
      productId,
      savingsMonth,
      savingsYear,
      savedHoursMonth,
      additionalRevenueMonth,
      inputs
    } = params

    // Prepare lead data
    const leadData: CalculatorLead = {
      // Contact info
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company_name: formData.companyName || null,

      // Calculator results
      product_id: productId,
      savings_month: savingsMonth,
      savings_year: savingsYear,
      saved_hours_month: savedHoursMonth || null,
      additional_revenue_month: additionalRevenueMonth || null,

      // Consent
      rodo_consent: formData.rodoConsent,

      // Metadata
      inputs: inputs || null,
      source_url: typeof window !== 'undefined' ? window.location.href : null,
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : null
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('calculator_leads')
      .insert(leadData as any)
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(`Błąd zapisu do bazy: ${error.message}`)
    }

    return {
      success: true,
      leadId: (data as any)?.id
    }

  } catch (error) {
    console.error('Submit lead error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Nieznany błąd'
    }
  }
}

/**
 * Check if email already exists in leads
 * (Optional - for preventing duplicate submissions)
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('calculator_leads')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .limit(1)

    if (error) {
      console.error('Check email error:', error)
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.error('Check email error:', error)
    return false
  }
}
