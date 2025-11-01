'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'

/**
 * FAQ Page - Complete FAQ List (30 Questions)
 *
 * Comprehensive FAQ page displaying all questions organized by 6 categories:
 * - Top 5 (most important)
 * - Business & Strategy (CEO)
 * - Marketing & Content (CMO)
 * - Sales & Leads (CSO)
 * - Technology & Security (CTO)
 * - Compliance & Legal
 *
 * Design Features:
 * - Accordion-style Q&A with smooth animations
 * - Category sections with visual separators
 * - Gradient borders on active items (pear color)
 * - Mobile-optimized responsive layout
 *
 * Accessibility:
 * - Semantic HTML (section, button, article)
 * - ARIA attributes (aria-expanded, aria-controls)
 * - Keyboard navigation support
 * - WCAG AAA contrast ratios
 *
 * Performance:
 * - GPU-accelerated animations
 * - Lazy rendering with AnimatePresence
 * - Optimized re-renders (useState for single active item per category)
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: faq.*
 *
 * @example
 * ```tsx
 * // Accessible at /pl/faq and /en/faq
 * ```
 *
 * @returns {React.ReactElement} Complete FAQ page
 */
export default function FAQPage(): React.ReactElement {
  const t = useTranslations('faq')
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null)

  // FAQ structure organized by category
  const faqCategories = {
    top5: ['q1', 'q2', 'q3', 'q4', 'q5'],
    business: ['q6', 'q7', 'q8', 'q9', 'q10'],
    marketing: ['q11', 'q12', 'q13', 'q14', 'q15', 'q16'],
    sales: ['q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23'],
    tech: ['q24', 'q25', 'q26', 'q27', 'q28'],
    compliance: ['q29', 'q30'],
  }

  const toggleAccordion = (questionId: string) => {
    setActiveQuestionId(activeQuestionId === questionId ? null : questionId)
  }

  return (
    <div className="min-h-screen bg-night">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-pear mb-4"
              style={{
                textShadow: '0 0 40px rgba(221, 224, 0, 0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('headline')}
            </motion.h1>
            <motion.p
              className="text-xl text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('subheadline')}
            </motion.p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {Object.entries(faqCategories).map(([categoryKey, questionIds], categoryIndex) => (
              <section key={categoryKey} className="space-y-4">
                {/* Category Header */}
                <motion.div
                  className="border-b border-pear/20 pb-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-pear">
                    {t(`categories.${categoryKey}`)}
                  </h2>
                </motion.div>

                {/* Questions in Category */}
                <div className="space-y-4">
                  {questionIds.map((questionId, questionIndex) => {
                    const isActive = activeQuestionId === questionId
                    const question = t(`questions.${questionId}.question`)
                    const answer = t(`questions.${questionId}.answer`)

                    return (
                      <motion.article
                        key={questionId}
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: questionIndex * 0.05 }}
                      >
                        <div
                          className={`
                            relative overflow-hidden rounded-xl border transition-all duration-300
                            ${
                              isActive
                                ? 'border-pear bg-night/50 shadow-lg shadow-pear/10'
                                : 'border-white/10 bg-night/30 hover:border-pear/50'
                            }
                          `}
                        >
                          {/* Question Button */}
                          <button
                            onClick={() => toggleAccordion(questionId)}
                            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                            aria-expanded={isActive}
                            aria-controls={`faq-answer-${questionId}`}
                          >
                            <h3 className="text-lg md:text-xl font-semibold text-white pr-4 group-hover:text-pear transition-colors">
                              {question}
                            </h3>
                            <div
                              className={`
                                flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                                transition-all duration-300
                                ${
                                  isActive
                                    ? 'bg-pear text-night rotate-180'
                                    : 'bg-white/10 text-white group-hover:bg-pear/20'
                                }
                              `}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </div>
                          </button>

                          {/* Answer Content */}
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                id={`faq-answer-${questionId}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-2">
                                  <div className="prose prose-invert max-w-none">
                                    <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                                      {answer}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-16 text-center p-8 rounded-2xl border border-pear/20 bg-night/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              {t('stillHaveQuestions', { default: 'Nie znalazłeś odpowiedzi?' })}
            </h3>
            <p className="text-white/70 mb-6">
              {t('contactUs', {
                default: 'Skontaktuj się z nami - odpowiemy na wszystkie Twoje pytania',
              })}
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-pear text-night font-semibold rounded-lg hover:bg-pear/90 transition-all hover:scale-105"
            >
              {t('contactCTA', { default: 'Skontaktuj się z nami' })}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
