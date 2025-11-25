'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { Link } from '@/i18n/navigation'

/**
 * FAQ Section - Top 5 Most Important Questions (Landing Page)
 *
 * Accordion-style FAQ section displaying the 5 most important questions
 * about LessManual services. Located under the contact form on the homepage.
 *
 * Design Features:
 * - Accordion UI with smooth expand/collapse animations
 * - Only top 5 FAQs displayed (category: "top5")
 * - Gradient borders on active items (pear color)
 * - Icon rotation animation on expand/collapse
 * - Mobile-optimized responsive layout
 *
 * Accessibility:
 * - Semantic HTML (button, h3, article)
 * - ARIA attributes (aria-expanded, aria-controls)
 * - Keyboard navigation support (Enter, Space)
 * - WCAG AAA contrast ratios
 *
 * Performance:
 * - GPU-accelerated animations (transform, opacity)
 * - Lazy rendering with AnimatePresence
 * - Optimized re-renders (useState for single active item)
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: faq.landingHeadline, faq.questions.q1-q5
 *
 * @example
 * ```tsx
 * <FAQSection />
 * ```
 *
 * @returns {React.ReactElement} FAQ section with top 5 questions
 *
 * @see {@link @/messages/pl.json} - Polish translations
 * @see {@link @/messages/en.json} - English translations
 */
export function FAQSection(): React.ReactElement {
  const t = useTranslations('faq')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Top 5 FAQ IDs
  const top5Questions = ['q1', 'q2', 'q3', 'q4', 'q5']

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Generate FAQPage structured data for SEO/AEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: top5Questions.map((questionId) => ({
      '@type': 'Question',
      name: t(`questions.${questionId}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`questions.${questionId}.answer`),
      },
    })),
  }

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="faq-heading"
    >
      {/* FAQPage Structured Data for SEO/AEO (Featured Snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(to_right,#DDE000_1px,transparent_1px),linear-gradient(to_bottom,#DDE000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('landingHeadline')}
          </motion.h2>
          <motion.p
            className="text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('subheadline')}
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {top5Questions.map((questionId, index) => {
            const isActive = activeIndex === index
            const question = t(`questions.${questionId}.question`)
            const answer = t(`questions.${questionId}.answer`)

            return (
              <motion.article
                key={questionId}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`
                    relative overflow-hidden rounded-xl border transition-all duration-300
                    ${isActive
                      ? 'border-pear bg-night/50 shadow-lg shadow-pear/10'
                      : 'border-white/10 bg-night/30 hover:border-pear/50'
                    }
                  `}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-white pr-4 group-hover:text-pear transition-colors">
                      {question}
                    </h3>
                    <div
                      className={`
                        flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                        transition-all duration-300
                        ${isActive
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
                        id={`faq-answer-${index}`}
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

        {/* Link to full FAQ page */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-pear font-semibold hover:underline transition-all hover:gap-3"
          >
            {t('viewAllQuestions', { default: 'Zobacz wszystkie pytania' })}
            <ChevronDown className="w-5 h-5 -rotate-90" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
