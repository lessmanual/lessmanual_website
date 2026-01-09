'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * Contact Form Section - Custom Form with n8n Webhook
 *
 * Beautiful two-column layout with trust signals and form.
 * Sends data to n8n webhook, redirects to thank-you page on success.
 *
 * Features:
 * - Two-column layout (info left, form right)
 * - Responsive (stacks on mobile)
 * - Form fields in pairs (Imię+Nazwisko, Email+Telefon)
 * - Trust signals and voice agent CTA
 * - Loading and error states
 * - i18n support (PL/EN)
 *
 * @returns {React.ReactElement} Contact form section
 */
export function ContactFormSection(): React.ReactElement {
  const t = useTranslations('contact')
  const locale = useLocale()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: '',
    wantCall: false,
    preferEmail: false,
  })

  // Webhook URLs per language
  const webhookUrl = locale === 'en'
    ? 'https://n8n.lessmanual.cloud/webhook/a985598d-f8bf-4fad-b8ee-6f4ecaaf8997'
    : 'https://n8n.lessmanual.cloud/webhook/df11da67-ef34-4d32-b3de-ff6c2612770c'

  // Interest options
  const interestOptions = [
    { value: 'ChatBot - Obsługa klienta 24/7', labelKey: 'chatbot' },
    { value: 'Voice Agent - Automatyzacja telefoniczna', labelKey: 'voiceAgent' },
    { value: 'Content Agent - Automatyzacja contentu', labelKey: 'contentAgent' },
    { value: 'Sales Automation - Lead gen + kampania mailo', labelKey: 'salesAutomation' },
    { value: 'RAG Chatbot - Baza wiedzy', labelKey: 'ragChatbot' },
    { value: 'Custom - Nie wiem, potrzebuję konsultacji', labelKey: 'custom' },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Build checkbox array (same format as n8n form)
    const callPreference: string[] = []
    if (formData.wantCall) callPreference.push('Chcę')
    if (formData.preferEmail) callPreference.push('Wolę kontakt mailowy')

    // Build payload with exact n8n field names
    const payload = {
      'Imię': formData.firstName,
      'Nazwisko': formData.lastName,
      'Email': formData.email,
      'Telefon': parseInt(formData.phone) || formData.phone,
      'Firma': formData.company,
      'Co Cię interesuje?': formData.interest,
      'Wiadomość': formData.message,
      'Czy chcesz żeby nasz agent głosowy (Szymon) zadzwonił do Ciebie teraz (~20s po wysłaniu formularza), omówił szczegóły i umówił od razu termin na bezpłatną konsultację?': callPreference,
      'submittedAt': new Date().toISOString(),
      'formMode': 'production',
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Webhook error')
      }

      // Redirect to thank you page
      router.push(locale === 'en' ? '/en/thank-you' : '/dziekujemy')
    } catch {
      setError(t('form.error'))
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id={locale === 'en' ? 'contact' : 'kontakt'}
      ref={ref}
      className="relative overflow-hidden bg-night py-16 lg:py-24"
      aria-labelledby="contact-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { top: 10, left: 15 },
          { top: 20, left: 85 },
          { top: 35, left: 50 },
          { top: 60, left: 20 },
          { top: 75, left: 80 },
          { top: 85, left: 45 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-pear/50"
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* Left Side - Info & Trust Signals */}
          <motion.div variants={fadeInUp} className="lg:sticky lg:top-24">
            <h2
              id="contact-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {t('headline')}
            </h2>
            <p className="text-xl text-white/70 mb-10">
              {t('subheadline')}
            </p>

            {/* Trust Signals */}
            <div className="space-y-4 mb-10">
              {['trust1', 'trust2', 'trust3'].map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pear/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-pear" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80">{t(`form.${key}`)}</span>
                </div>
              ))}
            </div>

            {/* Voice Agent CTA */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pear/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-pear" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {t('form.voiceAgentTitle')}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {t('form.voiceAgentDesc')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div variants={fadeInUp}>
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
            >
              {/* Row 1: Imię + Nazwisko */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">
                    {t('form.firstName')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t('form.firstNamePlaceholder')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pear focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">
                    {t('form.lastName')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t('form.lastNamePlaceholder')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pear focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email + Telefon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pear focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    {t('form.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('form.phonePlaceholder')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pear focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Firma */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                  {t('form.company')} *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={t('form.companyPlaceholder')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pear focus:border-transparent transition-all"
                />
              </div>

              {/* Row 4: Co Cię interesuje? */}
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-white/80 mb-2">
                  {t('form.interest')} *
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pear focus:border-transparent transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem',
                  }}
                >
                  <option value="" disabled className="bg-night text-white/40">
                    {t('form.interestPlaceholder')}
                  </option>
                  {interestOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-night text-white">
                      {t(`form.interests.${option.labelKey}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Wiadomość */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  {t('form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('form.messagePlaceholder')}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pear focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Row 6: Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="wantCall"
                    checked={formData.wantCall}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-pear focus:ring-pear focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
                    {t('form.wantCall')}
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="preferEmail"
                    checked={formData.preferEmail}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-pear focus:ring-pear focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-white/70 text-sm group-hover:text-white/90 transition-colors">
                    {t('form.preferEmail')}
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-pear hover:bg-pear/90 disabled:bg-pear/50 text-night font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('form.submitting')}
                  </>
                ) : (
                  t('form.submit')
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-white/40 text-xs text-center">
                {t('form.privacy')}
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
