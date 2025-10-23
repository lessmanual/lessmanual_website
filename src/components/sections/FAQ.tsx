'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { expandableCard } from '@/lib/animations'

/**
 * FAQ Section - LessManual Homepage
 *
 * Displays frequently asked questions in an accordion format.
 * Each question can be expanded to reveal the answer.
 *
 * Design System:
 * - Brand colors: Night (#0C0D0A), Pear (#DDE000), White (#FEFEFE)
 * - Layout: Vertical stack of expandable cards
 * - Animations: Smooth height expansion with AnimatePresence
 * - Interactive: Click to toggle question expansion
 *
 * Performance:
 * - Uses Framer Motion for GPU-accelerated animations
 * - AnimatePresence for smooth height transitions
 * - Lazy render: only animated when in viewport
 *
 * Accessibility:
 * - Semantic HTML5 structure (section, dl, dt, dd)
 * - ARIA attributes (aria-expanded, aria-controls)
 * - Keyboard navigation (Tab, Enter/Space to toggle)
 * - Focus indicators (ring on pear)
 * - WCAG AAA contrast ratios
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: faq.title, q1-5.question, q1-5.answer
 *
 * @example
 * ```tsx
 * <FAQ />
 * ```
 *
 * @returns {JSX.Element} FAQ section with 5 expandable questions
 *
 * @see {@link https://www.framer.com/motion/animate-presence/} - AnimatePresence docs
 */
export function FAQ(): JSX.Element {
  const t = useTranslations('faq')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Track which question is expanded (null = all collapsed)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  const questions = [
    { id: 1, questionKey: 'q1.question', answerKey: 'q1.answer' },
    { id: 2, questionKey: 'q2.question', answerKey: 'q2.answer' },
    { id: 3, questionKey: 'q3.question', answerKey: 'q3.answer' },
    { id: 4, questionKey: 'q4.question', answerKey: 'q4.answer' },
    { id: 5, questionKey: 'q5.question', answerKey: 'q5.answer' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-night via-night/98 to-night overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Background blur effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] opacity-15"
          style={{
            background: `radial-gradient(circle, rgba(87, 22, 162, 0.5) 0%, transparent 70%)`,
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* Questions */}
        <dl className="max-w-3xl mx-auto space-y-4">
          {questions.map((q, index) => {
            const isExpanded = expandedQuestion === q.id

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className={`
                    w-full text-left p-6 rounded-xl border-2 transition-all duration-300
                    ${
                      isExpanded
                        ? 'bg-night/90 border-pear shadow-lg shadow-pear/20'
                        : 'bg-night/50 border-white/10 hover:border-white/20'
                    }
                    backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pear/50
                  `}
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${q.id}`}
                >
                  {/* Question */}
                  <dt className="flex items-start justify-between gap-4">
                    <span className="text-lg md:text-xl font-semibold text-white">
                      {t(q.questionKey)}
                    </span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-pear text-2xl flex-shrink-0"
                      aria-hidden="true"
                    >
                      ▼
                    </motion.span>
                  </dt>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.dd
                        id={`faq-answer-${q.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
                          {t(q.answerKey)}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </dl>

        {/* CTA at bottom */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60 text-sm md:text-base mb-4">
            Masz więcej pytań?
          </p>
          <a
            href="/kontakt"
            className="inline-block px-6 py-3 bg-pear text-night font-semibold rounded-lg hover:bg-pear/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pear/50"
          >
            Skontaktuj się z nami
          </a>
        </motion.div>
      </div>
    </section>
  )
}
