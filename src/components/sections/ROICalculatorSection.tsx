'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { NumberInput } from '@/components/ui/NumberInput'
import { ProductQuizModal } from '@/components/modals/ProductQuizModal'
import { formatCurrency, formatNumber, type Locale } from '@/lib/currency'
import {
  calculateChatBotROI,
  calculateVoiceAgentROI,
  calculateContentAgentROI,
  calculateSalesAutomationROI,
  calculateRAGChatbotROI,
  calculateCustomSolutionsROI,
  CHATBOT_PRESETS,
  VOICE_AGENT_PRESETS,
  CONTENT_AGENT_PRESETS,
  SALES_AUTOMATION_PRESETS,
  RAG_CHATBOT_PRESETS,
  CUSTOM_SOLUTIONS_PRESETS,
  type ChatBotInputs,
  type VoiceAgentInputs,
  type ContentAgentInputs,
  type SalesAutomationInputs,
  type RAGChatbotInputs,
  type CustomSolutionsInputs,
  type ChatBotResults,
  type VoiceAgentResults,
  type ContentAgentResults,
  type SalesAutomationResults,
  type RAGChatbotResults,
  type CustomSolutionsResults
} from '@/lib/roi-calculations'
import {
  leadCaptureSchema,
  type LeadCaptureFormData
} from '@/lib/lead-capture'
import {
  trackProductSelected,
  trackStepCompleted,
  trackResultsViewed,
  trackLeadCaptured,
  trackPresetUsed
} from '@/lib/analytics'
import { z } from 'zod'

/**
 * ROI Calculator Section
 *
 * Interactive 4-step wizard for calculating ROI for LessManual products.
 * Single-page calculator with hash-based navigation.
 *
 * Steps:
 * 1. Product Selection (6 tiles)
 * 2. Questions (4-6 per product)
 * 3. Results (metrics + charts)
 * 4. Lead Capture (email + PDF)
 *
 * Design:
 * - Step 1: Bento grid (2x3 on desktop, 1 column mobile)
 * - Progress bar at top
 * - Hash navigation (#kalkulator-chatbot)
 * - URL preset support (?preset=ecommerce)
 *
 * @returns {JSX.Element} ROI Calculator section
 */

type ProductId = 'chatbot' | 'voiceAgent' | 'contentAgent' | 'salesAutomation' | 'ragChatbot' | 'custom'

export function ROICalculatorSection(): React.ReactElement {
  const t = useTranslations('roiCalculator')
  const locale = useLocale() as Locale
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [selectedProduct, setSelectedProduct] = useState<ProductId | null>(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  // Results state
  type ROIResults = ChatBotResults | VoiceAgentResults | ContentAgentResults | SalesAutomationResults | RAGChatbotResults | CustomSolutionsResults
  const [roiResults, setRoiResults] = useState<ROIResults | null>(null)

  // ChatBot form state
  const [chatbotInputs, setChatbotInputs] = useState<ChatBotInputs>({
    dailyInquiries: 200,
    avgMinutesPerInquiry: 5,
    hourlyWage: 50,
    automationRate: 70
  })

  // Voice Agent form state
  const [voiceAgentInputs, setVoiceAgentInputs] = useState<VoiceAgentInputs>({
    dailyCalls: 50,
    avgCallMinutes: 8,
    hourlyWage: 60,
    additionalBookingsPercent: 15,
    avgVisitValue: 500
  })

  // Content Agent form state
  const [contentAgentInputs, setContentAgentInputs] = useState<ContentAgentInputs>({
    postsPerWeek: 14,
    hoursPerPost: 2,
    hourlyWage: 100,
    platformCount: 4
  })

  // Sales Automation form state
  const [salesAutomationInputs, setSalesAutomationInputs] = useState<SalesAutomationInputs>({
    leadsPerMonth: 150,
    minutesPerLead: 30,
    automationRate: 70,
    hourlyWage: 120,
    avgDealValue: 8000,
    conversionImprovement: 5
  })

  // RAG Chatbot form state
  const [ragChatbotInputs, setRagChatbotInputs] = useState<RAGChatbotInputs>({
    documentsCount: 1000,
    dailyQueries: 100,
    avgSearchMinutes: 12,
    hourlyWage: 100
  })

  // Custom Solutions form state
  const [customSolutionsInputs, setCustomSolutionsInputs] = useState<CustomSolutionsInputs>({
    hoursPerMonth: 40,
    teamSize: 2,
    avgHourlyWage: 80,
    revenueImpact: true,
    revenueIncreasePercent: 15,
    currentMonthlyRevenue: 100000
  })

  // Step 4: Lead Capture Form state
  const [formData, setFormData] = useState<LeadCaptureFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    rodoConsent: false,
    newsletterConsent: false
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitErrorMessage, setSubmitErrorMessage] = useState('')

  const products: ProductId[] = [
    'chatbot',
    'voiceAgent',
    'contentAgent',
    'salesAutomation',
    'ragChatbot',
    'custom'
  ]

  // Hash Navigation: Product slug mapping
  const productSlugMap: Record<string, ProductId> = {
    'chatbot': 'chatbot',
    'voice-agent': 'voiceAgent',
    'content-agent': 'contentAgent',
    'sales-automation': 'salesAutomation',
    'rag-chatbot': 'ragChatbot',
    'custom-solutions': 'custom',
    'custom': 'custom'
  }

  const productIdToSlug: Record<ProductId, string> = {
    chatbot: 'chatbot',
    voiceAgent: 'voice-agent',
    contentAgent: 'content-agent',
    salesAutomation: 'sales-automation',
    ragChatbot: 'rag-chatbot',
    custom: 'custom-solutions'
  }

  // Hash Navigation: Read hash on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const hash = window.location.hash
    if (hash.startsWith('#kalkulator-')) {
      const slug = hash.replace('#kalkulator-', '')
      const productId = productSlugMap[slug]

      if (productId) {
        setSelectedProduct(productId)
        setCurrentStep(2)
      }
    }
  }, []) // Run only once on mount

  // Hash Navigation: Update hash when product selected
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (selectedProduct && currentStep >= 2) {
      const slug = productIdToSlug[selectedProduct]
      window.history.replaceState(null, '', `#kalkulator-${slug}`)
    } else if (currentStep === 1) {
      // Clear hash when returning to Step 1
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [selectedProduct, currentStep])

  // URL Preset Auto-fill: Apply preset from URL query parameter
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!selectedProduct) return // Wait for product to be selected

    // Read preset from URL query params
    const searchParams = new URLSearchParams(window.location.search)
    const presetParam = searchParams.get('preset')

    if (!presetParam) return // No preset in URL

    // Apply preset based on selected product
    if (selectedProduct === 'chatbot' && presetParam in CHATBOT_PRESETS) {
      handleChatbotPreset(presetParam as keyof typeof CHATBOT_PRESETS)
    } else if (selectedProduct === 'voiceAgent' && presetParam in VOICE_AGENT_PRESETS) {
      handleVoiceAgentPreset(presetParam as keyof typeof VOICE_AGENT_PRESETS)
    } else if (selectedProduct === 'contentAgent' && presetParam in CONTENT_AGENT_PRESETS) {
      handleContentAgentPreset(presetParam as keyof typeof CONTENT_AGENT_PRESETS)
    } else if (selectedProduct === 'salesAutomation' && presetParam in SALES_AUTOMATION_PRESETS) {
      handleSalesAutomationPreset(presetParam as keyof typeof SALES_AUTOMATION_PRESETS)
    } else if (selectedProduct === 'ragChatbot' && presetParam in RAG_CHATBOT_PRESETS) {
      handleRagChatbotPreset(presetParam as keyof typeof RAG_CHATBOT_PRESETS)
    } else if (selectedProduct === 'custom' && presetParam in CUSTOM_SOLUTIONS_PRESETS) {
      handleCustomSolutionsPreset(presetParam as keyof typeof CUSTOM_SOLUTIONS_PRESETS)
    }
  }, [selectedProduct]) // Run when product changes

  // Track Results Viewed: When user reaches Step 3 with calculated results
  useEffect(() => {
    if (currentStep === 3 && roiResults && selectedProduct) {
      // Calculate ROI percentage for tracking
      const roi = roiResults.savingsYear > 0 ? Math.round((roiResults.savingsYear / 12000) * 100) : 0

      trackResultsViewed(
        selectedProduct,
        roiResults.savingsMonth,
        roiResults.savingsYear,
        roi
      )
    }
  }, [currentStep, roiResults, selectedProduct])

  const handleProductSelect = (productId: ProductId) => {
    setSelectedProduct(productId)
    setCurrentStep(2)

    // Track product selection
    const productNames: Record<ProductId, string> = {
      chatbot: 'ChatBot 24/7',
      voiceAgent: 'Voice Agent',
      contentAgent: 'Content Agent',
      salesAutomation: 'Sales Automation',
      ragChatbot: 'RAG Chatbot',
      custom: 'Custom Solutions'
    }
    trackProductSelected(productId, productNames[productId])
  }

  const handleQuizComplete = (productId: ProductId) => {
    setSelectedProduct(productId)
    setCurrentStep(2)

    // Track product selection from quiz
    const productNames: Record<ProductId, string> = {
      chatbot: 'ChatBot 24/7',
      voiceAgent: 'Voice Agent',
      contentAgent: 'Content Agent',
      salesAutomation: 'Sales Automation',
      ragChatbot: 'RAG Chatbot',
      custom: 'Custom Solutions'
    }
    trackProductSelected(productId, productNames[productId] + ' (from quiz)')
  }

  const handleChatbotPreset = (presetKey: keyof typeof CHATBOT_PRESETS) => {
    const preset = CHATBOT_PRESETS[presetKey]
    setChatbotInputs(preset)
    trackPresetUsed('chatbot', preset.name)
  }

  const handleVoiceAgentPreset = (presetKey: keyof typeof VOICE_AGENT_PRESETS) => {
    const preset = VOICE_AGENT_PRESETS[presetKey]
    setVoiceAgentInputs(preset)
    trackPresetUsed('voiceAgent', preset.name)
  }

  const handleContentAgentPreset = (presetKey: keyof typeof CONTENT_AGENT_PRESETS) => {
    const preset = CONTENT_AGENT_PRESETS[presetKey]
    setContentAgentInputs(preset)
    trackPresetUsed('contentAgent', preset.name)
  }

  const handleSalesAutomationPreset = (presetKey: keyof typeof SALES_AUTOMATION_PRESETS) => {
    const preset = SALES_AUTOMATION_PRESETS[presetKey]
    setSalesAutomationInputs(preset)
    trackPresetUsed('salesAutomation', preset.name)
  }

  const handleRagChatbotPreset = (presetKey: keyof typeof RAG_CHATBOT_PRESETS) => {
    const preset = RAG_CHATBOT_PRESETS[presetKey]
    setRagChatbotInputs(preset)
    trackPresetUsed('ragChatbot', preset.name)
  }

  const handleCustomSolutionsPreset = (presetKey: keyof typeof CUSTOM_SOLUTIONS_PRESETS) => {
    const preset = CUSTOM_SOLUTIONS_PRESETS[presetKey]
    setCustomSolutionsInputs(preset)
    trackPresetUsed('custom', preset.name)
  }

  const handleCalculate = () => {
    // Calculate ROI based on selected product
    let results: ROIResults | null = null

    if (selectedProduct === 'chatbot') {
      results = calculateChatBotROI(chatbotInputs)
    } else if (selectedProduct === 'voiceAgent') {
      results = calculateVoiceAgentROI(voiceAgentInputs)
    } else if (selectedProduct === 'contentAgent') {
      results = calculateContentAgentROI(contentAgentInputs)
    } else if (selectedProduct === 'salesAutomation') {
      results = calculateSalesAutomationROI(salesAutomationInputs)
    } else if (selectedProduct === 'ragChatbot') {
      results = calculateRAGChatbotROI(ragChatbotInputs)
    } else if (selectedProduct === 'custom') {
      results = calculateCustomSolutionsROI(customSolutionsInputs)
    }

    setRoiResults(results)

    // Track step completion (Step 2 → Step 3)
    if (selectedProduct) {
      trackStepCompleted(selectedProduct, 2)
    }

    setCurrentStep(3)
  }

  // Step 4: Form handlers
  const handleFormChange = (field: keyof LeadCaptureFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user types
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setFormErrors({})
    setSubmitStatus('idle')
    setSubmitErrorMessage('')

    // Validate with Zod
    try {
      leadCaptureSchema.parse(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        setFormErrors(errors)
        return
      }
    }

    // Submit to n8n webhook
    setIsSubmitting(true)

    try {
      if (!selectedProduct || !roiResults) {
        throw new Error('Missing calculator data')
      }

      // Get current product inputs for metadata
      let inputs: Record<string, any> = {}
      if (selectedProduct === 'chatbot') inputs = chatbotInputs
      else if (selectedProduct === 'voiceAgent') inputs = voiceAgentInputs
      else if (selectedProduct === 'contentAgent') inputs = contentAgentInputs
      else if (selectedProduct === 'salesAutomation') inputs = salesAutomationInputs
      else if (selectedProduct === 'ragChatbot') inputs = ragChatbotInputs
      else if (selectedProduct === 'custom') inputs = customSolutionsInputs

      // Prepare payload for API
      const payload = {
        // Contact information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName || null,

        // Product & ROI results
        productId: selectedProduct,
        savingsMonth: roiResults.savingsMonth,
        savingsYear: roiResults.savingsYear,
        savedHoursMonth: 'savedHoursMonth' in roiResults ? roiResults.savedHoursMonth : null,
        additionalRevenueMonth: 'additionalRevenueMonth' in roiResults ? roiResults.additionalRevenueMonth : null,

        // Calculator inputs (for PDF generation)
        inputs,

        // Consent (RODO compliance)
        rodoConsent: formData.rodoConsent,
        newsletterConsent: formData.newsletterConsent || false,

        // Metadata
        locale: locale, // Language version for webhook routing (PL vs EN)
        sourceUrl: typeof window !== 'undefined' ? window.location.href : null,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : null,
        timestamp: new Date().toISOString()
      }

      // Send to API route (which proxies to webhooks)
      console.log('📤 Sending calculator data to API...')
      let response
      try {
        response = await fetch('/api/submit-calculator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
      } catch (fetchError) {
        console.error('❌ API fetch error:', fetchError)
        throw new Error(`Nie można połączyć się z serwerem. Sprawdź połączenie internetowe.`)
      }

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ API error response:', response.status, errorData)
        throw new Error(errorData.message || `Błąd serwera: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ API response:', result)

      // Track lead capture
      trackLeadCaptured(
        selectedProduct,
        formData.email,
        formData.phone,
        formData.companyName
      )

      setSubmitStatus('success')
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitErrorMessage(error instanceof Error ? error.message : 'Nieznany błąd')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="kalkulator"
      className="relative py-20 md:py-32 bg-night overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-pear/5 to-night pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('headline')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            {t('subheadline')}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-2">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                    ${step <= currentStep
                      ? 'bg-pear text-night'
                      : 'bg-white/10 text-white/50'
                    }
                  `}
                >
                  {step}
                </div>
                {index < 3 && (
                  <div
                    className={`
                      w-16 h-1 mx-2
                      ${step < currentStep ? 'bg-pear' : 'bg-white/10'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-white/60">
            {t('progress.step')} {currentStep} {t('progress.of')} 4
          </p>
        </div>

        {/* Step 1: Product Selection */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Step Title */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('step1.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                {t('step1.subtitle')}
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              {products.map((productId, index) => {
                const product = t.raw(`step1.products.${productId}`) as {
                  icon: string
                  name: string
                  description: string
                  avgSavings: string
                  tags: string[]
                }

                return (
                  <motion.button
                    key={productId}
                    className="
                      group relative p-6 bg-night border-2 border-pear/20 rounded-xl
                      hover:border-pear hover:shadow-2xl hover:shadow-pear/20
                      transition-all duration-300 text-left
                      focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night
                    "
                    onClick={() => handleProductSelect(productId)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, translateY: -4 }}
                  >
                    {/* Title with inline Icon */}
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-pear transition-colors flex items-center gap-3">
                      <span className="text-3xl">{product.icon}</span>
                      {product.name}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4">
                      {product.description}
                    </p>

                    {/* Average Savings */}
                    <p className="text-sm font-semibold text-pear mb-4">
                      {product.avgSavings}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-white/5 text-white/70 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 text-pear opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Help Button */}
            <div className="text-center">
              <button
                className="
                  inline-flex items-center gap-2 px-6 py-3
                  bg-white/5 hover:bg-white/10
                  text-white/80 hover:text-white
                  border border-white/20 hover:border-white/40
                  rounded-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-white/50
                "
                onClick={() => setIsQuizOpen(true)}
              >
                {t('step1.helpButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Questions */}
        {currentStep === 2 && selectedProduct === 'chatbot' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            {/* Step Title */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('step2.title')} - ChatBot 24/7
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                {t('step2.subtitle', { count: 4 })}
              </p>
            </div>

            {/* Preset Scenarios */}
            <div className="mb-8">
              <p className="text-sm text-white/70 mb-3">
                {t('step2.presetLabel')}
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(CHATBOT_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handleChatbotPreset(key as keyof typeof CHATBOT_PRESETS)}
                    className="
                      px-4 py-2 bg-white/5 hover:bg-pear/20 border border-pear/30 hover:border-pear
                      text-white/80 hover:text-white text-sm rounded-lg
                      transition-all duration-300
                    "
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-8 bg-white/5 p-8 rounded-xl border border-pear/20">
              {/* Q1: Daily Inquiries */}
              <RangeSlider
                label={t('step2.chatbot.q1.label')}
                value={chatbotInputs.dailyInquiries}
                onChange={(value) => setChatbotInputs({ ...chatbotInputs, dailyInquiries: value })}
                min={50}
                max={500}
                step={10}
                unit={t('step2.chatbot.q1.unit')}
              />

              {/* Q2: Minutes per Inquiry */}
              <RangeSlider
                label={t('step2.chatbot.q2.label')}
                value={chatbotInputs.avgMinutesPerInquiry}
                onChange={(value) => setChatbotInputs({ ...chatbotInputs, avgMinutesPerInquiry: value })}
                min={2}
                max={15}
                step={1}
                unit={t('step2.chatbot.q2.unit')}
              />

              {/* Q3: Hourly Wage */}
              <NumberInput
                label={t('step2.chatbot.q3.label')}
                value={chatbotInputs.hourlyWage}
                onChange={(value) => setChatbotInputs({ ...chatbotInputs, hourlyWage: value })}
                unit={t('step2.chatbot.q3.unit')}
                placeholder="50"
              />

              {/* Q4: Automation Rate */}
              <RangeSlider
                label={t('step2.chatbot.q4.label')}
                value={chatbotInputs.automationRate}
                onChange={(value) => setChatbotInputs({ ...chatbotInputs, automationRate: value })}
                min={50}
                max={90}
                step={5}
                unit={t('step2.chatbot.q4.unit')}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="
                  px-6 py-3 bg-white/5 hover:bg-white/10 text-white
                  border border-white/20 hover:border-white/40
                  rounded-lg font-semibold transition-all duration-300
                "
              >
                {t('step2.backButton')}
              </button>
              <button
                onClick={handleCalculate}
                className="
                  px-8 py-3 bg-pear hover:bg-pear/90 text-night
                  rounded-lg font-bold transition-all duration-300
                  shadow-lg shadow-pear/30 hover:shadow-pear/50
                "
              >
                {t('step2.calculateButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Voice Agent */}
        {currentStep === 2 && selectedProduct === 'voiceAgent' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('step2.title')} - {t('step1.products.voiceAgent.name')}
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                {t('step2.subtitle', { count: 5 })}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-white/70 mb-3">
                {t('step2.presetLabel')}
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(VOICE_AGENT_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handleVoiceAgentPreset(key as keyof typeof VOICE_AGENT_PRESETS)}
                    className="px-4 py-2 bg-white/5 hover:bg-pear/20 border border-pear/30 hover:border-pear text-white/80 hover:text-white text-sm rounded-lg transition-all duration-300"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-white/5 p-8 rounded-xl border border-pear/20">
              <RangeSlider
                label={t('step2.voiceAgent.q1.label')}
                value={voiceAgentInputs.dailyCalls}
                onChange={(value) => setVoiceAgentInputs({ ...voiceAgentInputs, dailyCalls: value })}
                min={20}
                max={200}
                step={5}
                unit={t('step2.voiceAgent.q1.unit')}
              />

              <RangeSlider
                label={t('step2.voiceAgent.q2.label')}
                value={voiceAgentInputs.avgCallMinutes}
                onChange={(value) => setVoiceAgentInputs({ ...voiceAgentInputs, avgCallMinutes: value })}
                min={3}
                max={20}
                step={1}
                unit={t('step2.voiceAgent.q2.unit')}
              />

              <NumberInput
                label={t('step2.voiceAgent.q3.label')}
                value={voiceAgentInputs.hourlyWage}
                onChange={(value) => setVoiceAgentInputs({ ...voiceAgentInputs, hourlyWage: value })}
                unit={t('step2.voiceAgent.q3.unit')}
                placeholder="60"
              />

              <RangeSlider
                label={t('step2.voiceAgent.q4.label')}
                value={voiceAgentInputs.additionalBookingsPercent}
                onChange={(value) => setVoiceAgentInputs({ ...voiceAgentInputs, additionalBookingsPercent: value })}
                min={5}
                max={30}
                step={1}
                unit={t('step2.voiceAgent.q4.unit')}
              />

              <NumberInput
                label={t('step2.voiceAgent.q5.label')}
                value={voiceAgentInputs.avgVisitValue}
                onChange={(value) => setVoiceAgentInputs({ ...voiceAgentInputs, avgVisitValue: value })}
                unit={t('step2.voiceAgent.q5.unit')}
                placeholder="500"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
              >
                {t('step2.backButton')}
              </button>
              <button
                onClick={handleCalculate}
                className="px-8 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50"
              >
                {t('step2.calculateButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Content Agent */}
        {currentStep === 2 && selectedProduct === 'contentAgent' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('step2.title')} - {t('step1.products.contentAgent.name')}
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                {t('step2.subtitle', { count: 4 })}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-white/70 mb-3">
                {t('step2.presetLabel')}
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(CONTENT_AGENT_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handleContentAgentPreset(key as keyof typeof CONTENT_AGENT_PRESETS)}
                    className="px-4 py-2 bg-white/5 hover:bg-pear/20 border border-pear/30 hover:border-pear text-white/80 hover:text-white text-sm rounded-lg transition-all duration-300"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-white/5 p-8 rounded-xl border border-pear/20">
              <RangeSlider
                label={t('step2.contentAgent.q1.label')}
                value={contentAgentInputs.postsPerWeek}
                onChange={(value) => setContentAgentInputs({ ...contentAgentInputs, postsPerWeek: value })}
                min={3}
                max={20}
                step={1}
                unit={t('step2.contentAgent.q1.unit')}
              />

              <RangeSlider
                label={t('step2.contentAgent.q2.label')}
                value={contentAgentInputs.hoursPerPost}
                onChange={(value) => setContentAgentInputs({ ...contentAgentInputs, hoursPerPost: value })}
                min={1}
                max={4}
                step={0.5}
                unit={t('step2.contentAgent.q2.unit')}
              />

              <NumberInput
                label={t('step2.contentAgent.q3.label')}
                value={contentAgentInputs.hourlyWage}
                onChange={(value) => setContentAgentInputs({ ...contentAgentInputs, hourlyWage: value })}
                unit={t('step2.contentAgent.q3.unit')}
                placeholder="100"
              />

              <RangeSlider
                label={t('step2.contentAgent.q4.label')}
                value={contentAgentInputs.platformCount}
                onChange={(value) => setContentAgentInputs({ ...contentAgentInputs, platformCount: value })}
                min={1}
                max={5}
                step={1}
                unit={t('step2.contentAgent.q4.unit')}
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
              >
                {t('step2.backButton')}
              </button>
              <button
                onClick={handleCalculate}
                className="px-8 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50"
              >
                {t('step2.calculateButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Sales Automation */}
        {currentStep === 2 && selectedProduct === 'salesAutomation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('step2.title')} - {t('step1.products.salesAutomation.name')}
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                {t('step2.subtitle', { count: 6 })}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-white/70 mb-3">
                {t('step2.presetLabel')}
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(SALES_AUTOMATION_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handleSalesAutomationPreset(key as keyof typeof SALES_AUTOMATION_PRESETS)}
                    className="px-4 py-2 bg-white/5 hover:bg-pear/20 border border-pear/30 hover:border-pear text-white/80 hover:text-white text-sm rounded-lg transition-all duration-300"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-white/5 p-8 rounded-xl border border-pear/20">
              <RangeSlider
                label={t('step2.salesAutomation.q1.label')}
                value={salesAutomationInputs.leadsPerMonth}
                onChange={(value) => setSalesAutomationInputs({ ...salesAutomationInputs, leadsPerMonth: value })}
                min={50}
                max={500}
                step={10}
                unit={t('step2.salesAutomation.q1.unit')}
              />

              <RangeSlider
                label={t('step2.salesAutomation.q2.label')}
                value={salesAutomationInputs.minutesPerLead}
                onChange={(value) => setSalesAutomationInputs({ ...salesAutomationInputs, minutesPerLead: value })}
                min={15}
                max={60}
                step={5}
                unit={t('step2.salesAutomation.q2.unit')}
              />

              <RangeSlider
                label={t('step2.salesAutomation.q3.label')}
                value={salesAutomationInputs.automationRate}
                onChange={(value) => setSalesAutomationInputs({ ...salesAutomationInputs, automationRate: value })}
                min={50}
                max={80}
                step={5}
                unit={t('step2.salesAutomation.q3.unit')}
              />

              <NumberInput
                label={t('step2.salesAutomation.q4.label')}
                value={salesAutomationInputs.hourlyWage}
                onChange={(value) => setSalesAutomationInputs({ ...salesAutomationInputs, hourlyWage: value })}
                unit={t('step2.salesAutomation.q4.unit')}
                placeholder="120"
              />

              <NumberInput
                label={t('step2.salesAutomation.q5.label')}
                value={salesAutomationInputs.avgDealValue}
                onChange={(value) => setSalesAutomationInputs({ ...salesAutomationInputs, avgDealValue: value })}
                unit={t('step2.salesAutomation.q5.unit')}
                placeholder="8000"
              />

              <RangeSlider
                label={t('step2.salesAutomation.q6.label')}
                value={salesAutomationInputs.conversionImprovement}
                onChange={(value) => setSalesAutomationInputs({ ...salesAutomationInputs, conversionImprovement: value })}
                min={1}
                max={10}
                step={0.5}
                unit={t('step2.salesAutomation.q6.unit')}
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
              >
                {t('step2.backButton')}
              </button>
              <button
                onClick={handleCalculate}
                className="px-8 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50"
              >
                {t('step2.calculateButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: RAG Chatbot */}
        {currentStep === 2 && selectedProduct === 'ragChatbot' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('step2.title')} - {t('step1.products.ragChatbot.name')}
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                {t('step2.subtitle', { count: 4 })}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-white/70 mb-3">
                {t('step2.presetLabel')}
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(RAG_CHATBOT_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handleRagChatbotPreset(key as keyof typeof RAG_CHATBOT_PRESETS)}
                    className="px-4 py-2 bg-white/5 hover:bg-pear/20 border border-pear/30 hover:border-pear text-white/80 hover:text-white text-sm rounded-lg transition-all duration-300"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-white/5 p-8 rounded-xl border border-pear/20">
              <RangeSlider
                label={t('step2.ragChatbot.q1.label')}
                value={ragChatbotInputs.documentsCount}
                onChange={(value) => setRagChatbotInputs({ ...ragChatbotInputs, documentsCount: value })}
                min={50}
                max={5000}
                step={50}
                unit={t('step2.ragChatbot.q1.unit')}
              />

              <RangeSlider
                label={t('step2.ragChatbot.q2.label')}
                value={ragChatbotInputs.dailyQueries}
                onChange={(value) => setRagChatbotInputs({ ...ragChatbotInputs, dailyQueries: value })}
                min={20}
                max={200}
                step={10}
                unit={t('step2.ragChatbot.q2.unit')}
              />

              <RangeSlider
                label={t('step2.ragChatbot.q3.label')}
                value={ragChatbotInputs.avgSearchMinutes}
                onChange={(value) => setRagChatbotInputs({ ...ragChatbotInputs, avgSearchMinutes: value })}
                min={5}
                max={30}
                step={1}
                unit={t('step2.ragChatbot.q3.unit')}
              />

              <NumberInput
                label={t('step2.ragChatbot.q4.label')}
                value={ragChatbotInputs.hourlyWage}
                onChange={(value) => setRagChatbotInputs({ ...ragChatbotInputs, hourlyWage: value })}
                unit={t('step2.ragChatbot.q4.unit')}
                placeholder="100"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
              >
                {t('step2.backButton')}
              </button>
              <button
                onClick={handleCalculate}
                className="px-8 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50"
              >
                {t('step2.calculateButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Custom Solutions */}
        {currentStep === 2 && selectedProduct === 'custom' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t('step2.title')} - {t('step1.products.custom.name')}
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                {t('step2.subtitle', { count: customSolutionsInputs.revenueImpact ? 6 : 4 })}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm text-white/70 mb-3">
                {t('step2.presetLabel')}
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(CUSTOM_SOLUTIONS_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handleCustomSolutionsPreset(key as keyof typeof CUSTOM_SOLUTIONS_PRESETS)}
                    className="px-4 py-2 bg-white/5 hover:bg-pear/20 border border-pear/30 hover:border-pear text-white/80 hover:text-white text-sm rounded-lg transition-all duration-300"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-white/5 p-8 rounded-xl border border-pear/20">
              <RangeSlider
                label={t('step2.customSolutions.q1.label')}
                value={customSolutionsInputs.hoursPerMonth}
                onChange={(value) => setCustomSolutionsInputs({ ...customSolutionsInputs, hoursPerMonth: value })}
                min={10}
                max={200}
                step={5}
                unit={t('step2.customSolutions.q1.unit')}
              />

              <RangeSlider
                label={t('step2.customSolutions.q2.label')}
                value={customSolutionsInputs.teamSize}
                onChange={(value) => setCustomSolutionsInputs({ ...customSolutionsInputs, teamSize: value })}
                min={1}
                max={10}
                step={1}
                unit={t('step2.customSolutions.q2.unit')}
              />

              <NumberInput
                label={t('step2.customSolutions.q3.label')}
                value={customSolutionsInputs.avgHourlyWage}
                onChange={(value) => setCustomSolutionsInputs({ ...customSolutionsInputs, avgHourlyWage: value })}
                unit={t('step2.customSolutions.q3.unit')}
                placeholder="80"
              />

              {/* Revenue Impact Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <label className="text-sm font-medium text-white">
                  {t('step2.customSolutions.q4.label')}
                </label>
                <button
                  onClick={() => setCustomSolutionsInputs({ ...customSolutionsInputs, revenueImpact: !customSolutionsInputs.revenueImpact })}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${customSolutionsInputs.revenueImpact ? 'bg-pear' : 'bg-white/20'}`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-night rounded-full transition-transform duration-300 ${customSolutionsInputs.revenueImpact ? 'translate-x-7' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              {/* Conditional Revenue Fields */}
              {customSolutionsInputs.revenueImpact && (
                <>
                  <RangeSlider
                    label={t('step2.customSolutions.q5.label')}
                    value={customSolutionsInputs.revenueIncreasePercent || 0}
                    onChange={(value) => setCustomSolutionsInputs({ ...customSolutionsInputs, revenueIncreasePercent: value })}
                    min={10}
                    max={50}
                    step={1}
                    unit={t('step2.customSolutions.q5.unit')}
                  />

                  <NumberInput
                    label={t('step2.customSolutions.q6.label')}
                    value={customSolutionsInputs.currentMonthlyRevenue || 0}
                    onChange={(value) => setCustomSolutionsInputs({ ...customSolutionsInputs, currentMonthlyRevenue: value })}
                    unit={t('step2.customSolutions.q6.unit')}
                    placeholder="100000"
                  />
                </>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
              >
                {t('step2.backButton')}
              </button>
              <button
                onClick={handleCalculate}
                className="px-8 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50"
              >
                {t('step2.calculateButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && roiResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t('step3.title')}
              </h3>
              <p className="text-lg md:text-xl text-gray-300">
                {t('step3.subtitle')}
              </p>
            </div>

            {/* Core Metrics Grid - 2 columns only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Metric: Monthly Savings - BIG NUMBER */}
              <motion.div
                className="bg-gradient-to-br from-pear/20 to-pear/5 border-2 border-pear rounded-xl p-8 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="text-sm text-white/70 mb-2">
                  {t('step3.metrics.savingsMonth')}
                </div>
                <motion.div
                  className="text-5xl font-bold text-pear"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {formatCurrency(roiResults.savingsMonth, locale)}
                </motion.div>
              </motion.div>

              {/* Metric: Annual Savings */}
              <motion.div
                className="bg-white/5 border-2 border-white/10 rounded-xl p-8 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-sm text-white/70 mb-2">
                  {t('step3.metrics.savingsYear')}
                </div>
                <div className="text-4xl font-bold text-white">
                  {formatCurrency(roiResults.savingsYear, locale)}
                </div>
              </motion.div>
            </div>

            {/* Additional Product-Specific Metrics */}
            {'savedHoursMonth' in roiResults && roiResults.savedHoursMonth && (
              <motion.div
                className="flex flex-wrap justify-center gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-80">
                  <div className="text-sm text-white/70 mb-2">
                    {t('step3.metrics.savedHours')}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatNumber(roiResults.savedHoursMonth, locale)} h/mies
                  </div>
                </div>

                {('automatedInquiries' in roiResults) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-80">
                    <div className="text-sm text-white/70 mb-2">
                      Zapytań zautomatyzowanych
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatNumber(roiResults.automatedInquiries, locale)}
                    </div>
                  </div>
                )}

                {('additionalBookingsMonth' in roiResults) && roiResults.additionalBookingsMonth && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-80">
                    <div className="text-sm text-white/70 mb-2">
                      {t('step3.metrics.additionalBookings')}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatNumber(roiResults.additionalBookingsMonth, locale)}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* BONUS SECTION: Revenue Opportunity (Voice Agent & Sales Automation only) */}
            {('additionalRevenueMonth' in roiResults && roiResults.additionalRevenueMonth > 0) && (
              <motion.div
                className="mb-12 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  💰 Dodatkowy potencjał przychodowy
                </h3>
                <p className="text-sm text-white/60 mb-6">
                  Poniższe dane to szacunkowy potencjał na podstawie doświadczeń naszych klientów
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                  {('additionalBookingsMonth' in roiResults && roiResults.additionalBookingsMonth) && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-96">
                        <div className="text-sm text-white/70 mb-2">
                          Dodatkowe wizyty umówione (24/7)
                        </div>
                        <div className="text-3xl font-bold text-white">
                          {formatNumber(roiResults.additionalBookingsMonth, locale)}/mies
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-96">
                        <div className="text-sm text-white/70 mb-2">
                          Potencjalny zysk z wizyt
                        </div>
                        <div className="text-3xl font-bold text-green-400">
                          +{formatCurrency(roiResults.additionalRevenueMonth, locale)}/mies
                        </div>
                      </div>
                    </>
                  )}

                  {('additionalDealsMonth' in roiResults && roiResults.additionalDealsMonth) && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-96">
                        <div className="text-sm text-white/70 mb-2">
                          Dodatkowe deale zamknięte
                        </div>
                        <div className="text-3xl font-bold text-white">
                          {formatNumber(roiResults.additionalDealsMonth, locale)}/mies
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-96">
                        <div className="text-sm text-white/70 mb-2">
                          Potencjalny zysk z dealów
                        </div>
                        <div className="text-3xl font-bold text-green-400">
                          +{formatCurrency(roiResults.additionalRevenueMonth, locale)}/mies
                        </div>
                      </div>
                    </>
                  )}

                  {/* Custom Solutions - tylko dodatni przychód bez szczegółów */}
                  {selectedProduct === 'custom' && roiResults.additionalRevenueMonth > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center w-full md:w-96">
                      <div className="text-sm text-white/70 mb-2">
                        Szacowany wzrost przychodów miesięcznych
                      </div>
                      <div className="text-3xl font-bold text-green-400">
                        +{formatCurrency(roiResults.additionalRevenueMonth, locale)}/mies
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
              >
                {t('step2.backButton')}
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50"
                >
                  📩 Wyślij raport na email →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Lead Capture Form */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {submitStatus === 'success' ? (
              /* Success State */
              <div className="text-center">
                <div className="mb-6 text-6xl">✅</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Raport wysłany!
                </h3>
                <p className="text-xl text-white/80 mb-2">
                  Sprawdź swoją skrzynkę: <span className="text-pear font-semibold">{formData.email}</span>
                </p>
                <p className="text-white/60 mb-8">
                  Raport ROI z szczegółową analizą został wysłany na Twój email.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setCurrentStep(1)
                      setSelectedProduct(null)
                      setSubmitStatus('idle')
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        rodoConsent: false,
                        newsletterConsent: false
                      })
                    }}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
                  >
                    Oblicz dla innego produktu
                  </button>
                  <a
                    href="https://cal.com/lessmanual/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50"
                  >
                    📅 Umów demo (15 min)
                  </a>
                </div>
              </div>
            ) : (
              /* Form State */
              <>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    📧 Otrzymaj raport na email
                  </h3>
                  <p className="text-white/70">
                    Wyślemy Ci szczegółowy raport ROI w formacie PDF
                  </p>
                </div>

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">
                      ⚠️ {submitErrorMessage || 'Wystąpił błąd. Spróbuj ponownie.'}
                    </p>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-white/90 mb-2">
                      Imię i nazwisko <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleFormChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        formErrors.fullName ? 'border-red-500' : 'border-white/10'
                      } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pear focus:ring-2 focus:ring-pear/30 transition-all`}
                      placeholder="Jan Kowalski"
                      disabled={isSubmitting}
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email firmowy <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        formErrors.email ? 'border-red-500' : 'border-white/10'
                      } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pear focus:ring-2 focus:ring-pear/30 transition-all`}
                      placeholder="jan@firma.pl"
                      disabled={isSubmitting}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                      Telefon <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        formErrors.phone ? 'border-red-500' : 'border-white/10'
                      } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pear focus:ring-2 focus:ring-pear/30 transition-all`}
                      placeholder="+48 123 456 789"
                      disabled={isSubmitting}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-white/90 mb-2">
                      Nazwa firmy (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleFormChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-pear focus:ring-2 focus:ring-pear/30 transition-all"
                      placeholder="Example Sp. z o.o."
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* RODO Consent */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rodoConsent}
                        onChange={(e) => handleFormChange('rodoConsent', e.target.checked)}
                        className={`mt-1 w-5 h-5 rounded border ${
                          formErrors.rodoConsent ? 'border-red-500' : 'border-white/30'
                        } bg-white/5 checked:bg-pear checked:border-pear focus:ring-2 focus:ring-pear/30 transition-all`}
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-white/80">
                        Zgadzam się na przetwarzanie danych osobowych zgodnie z{' '}
                        <a href="/privacy" target="_blank" className="text-pear hover:underline">
                          polityką prywatności
                        </a>{' '}
                        <span className="text-red-400">*</span>
                      </span>
                    </label>
                    {formErrors.rodoConsent && (
                      <p className="mt-1 text-sm text-red-400">{formErrors.rodoConsent}</p>
                    )}
                  </div>

                  {/* Newsletter Consent */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.newsletterConsent}
                        onChange={(e) => handleFormChange('newsletterConsent', e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border border-white/30 bg-white/5 checked:bg-pear checked:border-pear focus:ring-2 focus:ring-pear/30 transition-all"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-white/80">
                        Chcę otrzymywać newsletter z case studies i tips automatyzacji
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 rounded-lg font-semibold transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      ← Wstecz
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-8 py-3 bg-pear hover:bg-pear/90 text-night rounded-lg font-bold transition-all duration-300 shadow-lg shadow-pear/30 hover:shadow-pear/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Wysyłanie...
                        </span>
                      ) : (
                        '📩 Wyślij raport na email'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Product Quiz Modal */}
      <ProductQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />
    </section>
  )
}
