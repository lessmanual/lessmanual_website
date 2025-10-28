/**
 * ROI Calculation Utilities
 *
 * Dedicated ROI formulas for each LessManual product.
 * Based on CTO specifications from roi_calculator_prompt.md
 *
 * IMPORTANT CONSTRAINTS:
 * - NO "ROI %" or payback period (removed per CEO decision)
 * - NO total cost or pricing information
 * - ONLY show savings (monthly/yearly) and hours saved
 * - Bonus metrics (revenue) shown separately with disclaimer
 */

// Product IDs type
export type ProductId = 'chatbot' | 'voiceAgent' | 'contentAgent' | 'salesAutomation' | 'ragChatbot' | 'custom'

// ============================================
// CHATBOT 24/7
// ============================================

export interface ChatBotInputs {
  dailyInquiries: number
  avgMinutesPerInquiry: number
  hourlyWage: number
  automationRate: number // 0-100 (e.g., 70 = 70%)
}

export interface ChatBotResults {
  savingsMonth: number
  savingsYear: number
  savedHoursMonth: number
  automatedInquiries: number
}

export function calculateChatBotROI(inputs: ChatBotInputs): ChatBotResults {
  const workingDaysMonth = 22
  const totalInquiriesMonth = inputs.dailyInquiries * workingDaysMonth
  const totalMinutesMonth = totalInquiriesMonth * inputs.avgMinutesPerInquiry
  const totalHoursMonth = totalMinutesMonth / 60

  const savedHoursMonth = totalHoursMonth * (inputs.automationRate / 100)
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage)
  const savingsYear = savingsMonth * 12

  const automatedInquiries = Math.round(totalInquiriesMonth * (inputs.automationRate / 100))

  return {
    savingsMonth,
    savingsYear,
    savedHoursMonth: Math.round(savedHoursMonth),
    automatedInquiries
  }
}

// ============================================
// VOICE AGENT
// ============================================

export interface VoiceAgentInputs {
  dailyCalls: number
  avgCallMinutes: number
  hourlyWage: number
  additionalBookingsPercent: number // 0-100
  avgVisitValue: number
}

export interface VoiceAgentResults {
  savingsMonth: number
  savingsYear: number
  savedHoursMonth: number
  // BONUS metrics (shown separately with disclaimer)
  additionalBookingsMonth: number
  additionalRevenueMonth: number
}

export function calculateVoiceAgentROI(inputs: VoiceAgentInputs): VoiceAgentResults {
  const workingDaysMonth = 22
  const totalCallsMonth = inputs.dailyCalls * workingDaysMonth
  const savedHoursMonth = Math.round((totalCallsMonth * inputs.avgCallMinutes) / 60)
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage)

  // BONUS: Dodatkowe wizyty (revenue opportunity) - shown separately
  const missedCallsBefore = inputs.dailyCalls * 0.30 // 30% missed after hours
  const additionalBookingsMonth = Math.round(
    missedCallsBefore * workingDaysMonth * (inputs.additionalBookingsPercent / 100)
  )
  const additionalRevenueMonth = Math.round(additionalBookingsMonth * inputs.avgVisitValue)

  const savingsYear = savingsMonth * 12

  return {
    savingsMonth, // TYLKO oszczędności czasu
    savingsYear,
    savedHoursMonth,
    // BONUS (pokazujemy oddzielnie):
    additionalBookingsMonth,
    additionalRevenueMonth
  }
}

// ============================================
// CONTENT AGENT
// ============================================

export interface ContentAgentInputs {
  postsPerWeek: number
  hoursPerPost: number
  hourlyWage: number
  platformCount: number
}

export interface ContentAgentResults {
  savingsMonth: number
  savingsYear: number
  savedHoursMonth: number
  automatedPostsMonth: number
  leverageRatio: number
}

export function calculateContentAgentROI(inputs: ContentAgentInputs): ContentAgentResults {
  const postsPerMonth = inputs.postsPerWeek * 4.33
  const totalHoursMonth = Math.round(postsPerMonth * inputs.hoursPerPost)
  const savingsMonth = Math.round(totalHoursMonth * inputs.hourlyWage)
  const savingsYear = savingsMonth * 12

  const manualPostsMonth = Math.round(postsPerMonth)
  const automatedPostsMonth = Math.round(postsPerMonth * inputs.platformCount)

  return {
    savingsMonth,
    savingsYear,
    savedHoursMonth: totalHoursMonth,
    automatedPostsMonth,
    leverageRatio: inputs.platformCount
  }
}

// ============================================
// SALES AUTOMATION
// ============================================

export interface SalesAutomationInputs {
  leadsPerMonth: number
  minutesPerLead: number
  automationRate: number // 0-100
  hourlyWage: number
  avgDealValue: number
  conversionImprovement: number // 0-100 (e.g., 5 = 5%)
}

export interface SalesAutomationResults {
  savingsMonth: number
  savingsYear: number
  savedHoursMonth: number
  // BONUS metrics (shown separately with disclaimer)
  additionalDealsMonth: number
  additionalRevenueMonth: number
}

export function calculateSalesAutomationROI(inputs: SalesAutomationInputs): SalesAutomationResults {
  const totalMinutesMonth = inputs.leadsPerMonth * inputs.minutesPerLead
  const savedHoursMonth = Math.round((totalMinutesMonth * (inputs.automationRate / 100)) / 60)
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage)

  // BONUS: Dodatkowe deale (revenue opportunity) - shown separately
  const additionalDealsMonth = inputs.leadsPerMonth * (inputs.conversionImprovement / 100)
  const additionalRevenueMonth = Math.round(additionalDealsMonth * inputs.avgDealValue)

  const savingsYear = savingsMonth * 12

  return {
    savingsMonth, // TYLKO oszczędności czasu
    savingsYear,
    savedHoursMonth,
    // BONUS (pokazujemy oddzielnie):
    additionalDealsMonth: Math.round(additionalDealsMonth),
    additionalRevenueMonth
  }
}

// ============================================
// RAG CHATBOT
// ============================================

export interface RAGChatbotInputs {
  documentsCount: number
  dailyQueries: number
  avgSearchMinutes: number
  hourlyWage: number
}

export interface RAGChatbotResults {
  savingsMonth: number
  savingsYear: number
  savedHoursMonth: number
  queriesAnsweredMonth: number
}

export function calculateRAGChatbotROI(inputs: RAGChatbotInputs): RAGChatbotResults {
  const workingDaysMonth = 22
  const totalQueriesMonth = inputs.dailyQueries * workingDaysMonth
  const savedHoursMonth = Math.round((totalQueriesMonth * inputs.avgSearchMinutes) / 60)
  const savingsMonth = Math.round(savedHoursMonth * inputs.hourlyWage)
  const savingsYear = savingsMonth * 12

  return {
    savingsMonth,
    savingsYear,
    savedHoursMonth,
    queriesAnsweredMonth: totalQueriesMonth
  }
}

// ============================================
// CUSTOM SOLUTIONS
// ============================================

export interface CustomSolutionsInputs {
  hoursPerMonth: number
  teamSize: number
  avgHourlyWage: number
  revenueImpact: boolean
  revenueIncreasePercent?: number // 0-100
  currentMonthlyRevenue?: number
}

export interface CustomSolutionsResults {
  savingsMonth: number
  savingsYear: number
  savedHoursMonth: number
  // BONUS metrics (shown separately if applicable)
  additionalRevenueMonth: number
}

export function calculateCustomSolutionsROI(inputs: CustomSolutionsInputs): CustomSolutionsResults {
  const totalHoursMonth = inputs.hoursPerMonth * inputs.teamSize
  const savingsMonth = Math.round(totalHoursMonth * inputs.avgHourlyWage)

  // BONUS: Dodatkowy przychód (jeśli applicable) - shown separately
  const additionalRevenueMonth = inputs.revenueImpact && inputs.revenueIncreasePercent && inputs.currentMonthlyRevenue
    ? Math.round(inputs.currentMonthlyRevenue * (inputs.revenueIncreasePercent / 100))
    : 0

  const savingsYear = savingsMonth * 12

  return {
    savingsMonth, // TYLKO oszczędności czasu
    savingsYear,
    savedHoursMonth: totalHoursMonth,
    // BONUS (pokazujemy oddzielnie jeśli >0):
    additionalRevenueMonth
  }
}

// ============================================
// PRESET SCENARIOS
// ============================================

export const CHATBOT_PRESETS = {
  ecommerce: {
    name: 'E-commerce (Duży sklep)',
    dailyInquiries: 200,
    avgMinutesPerInquiry: 5,
    hourlyWage: 50,
    automationRate: 70
  },
  saas: {
    name: 'SaaS/Tech Support',
    dailyInquiries: 150,
    avgMinutesPerInquiry: 8,
    hourlyWage: 80,
    automationRate: 60
  },
  services: {
    name: 'Usługi lokalne (salon, gabinet)',
    dailyInquiries: 80,
    avgMinutesPerInquiry: 4,
    hourlyWage: 40,
    automationRate: 75
  }
}

export const VOICE_AGENT_PRESETS = {
  clinic: {
    name: 'Klinika stomatologiczna',
    dailyCalls: 50,
    avgCallMinutes: 8,
    hourlyWage: 60,
    additionalBookingsPercent: 15,
    avgVisitValue: 500
  },
  restaurant: {
    name: 'Restauracja',
    dailyCalls: 30,
    avgCallMinutes: 10,
    hourlyWage: 70,
    additionalBookingsPercent: 20,
    avgVisitValue: 2000
  },
  salon: {
    name: 'Salon kosmetyczny',
    dailyCalls: 40,
    avgCallMinutes: 6,
    hourlyWage: 50,
    additionalBookingsPercent: 12,
    avgVisitValue: 300
  }
}

export const CONTENT_AGENT_PRESETS = {
  agency: {
    name: 'Agencja marketingowa',
    postsPerWeek: 14,
    hoursPerPost: 2,
    hourlyWage: 100,
    platformCount: 4
  },
  ecommerce: {
    name: 'E-commerce (own brand)',
    postsPerWeek: 10,
    hoursPerPost: 1.5,
    hourlyWage: 70,
    platformCount: 3
  },
  personal: {
    name: 'Personal brand (founder)',
    postsPerWeek: 5,
    hoursPerPost: 3,
    hourlyWage: 150,
    platformCount: 2
  }
}

export const SALES_AUTOMATION_PRESETS = {
  saas: {
    name: 'B2B SaaS',
    leadsPerMonth: 150,
    minutesPerLead: 30,
    automationRate: 70,
    hourlyWage: 120,
    avgDealValue: 8000,
    conversionImprovement: 5
  },
  ecommerce: {
    name: 'E-commerce (high-ticket)',
    leadsPerMonth: 300,
    minutesPerLead: 20,
    automationRate: 75,
    hourlyWage: 80,
    avgDealValue: 3000,
    conversionImprovement: 4
  },
  consulting: {
    name: 'Usługi B2B (konsulting)',
    leadsPerMonth: 100,
    minutesPerLead: 45,
    automationRate: 65,
    hourlyWage: 150,
    avgDealValue: 12000,
    conversionImprovement: 3
  }
}

export const RAG_CHATBOT_PRESETS = {
  accounting: {
    name: 'Biuro rachunkowe',
    documentsCount: 1000,
    dailyQueries: 100,
    avgSearchMinutes: 12,
    hourlyWage: 100
  },
  legal: {
    name: 'Kancelaria prawna',
    documentsCount: 2000,
    dailyQueries: 60,
    avgSearchMinutes: 15,
    hourlyWage: 200
  },
  hr: {
    name: 'Dział HR (duża firma)',
    documentsCount: 500,
    dailyQueries: 80,
    avgSearchMinutes: 8,
    hourlyWage: 80
  }
}

export const CUSTOM_SOLUTIONS_PRESETS = {
  reporting: {
    name: 'Raportowanie dla e-commerce',
    hoursPerMonth: 40,
    teamSize: 2,
    avgHourlyWage: 80,
    revenueImpact: true,
    revenueIncreasePercent: 15,
    currentMonthlyRevenue: 100000
  },
  onboarding: {
    name: 'Onboarding klienta (SaaS)',
    hoursPerMonth: 60,
    teamSize: 3,
    avgHourlyWage: 100,
    revenueImpact: true,
    revenueIncreasePercent: 20,
    currentMonthlyRevenue: 80000
  },
  dataEntry: {
    name: 'Data entry (logistics)',
    hoursPerMonth: 120,
    teamSize: 2,
    avgHourlyWage: 50,
    revenueImpact: false
  }
}
