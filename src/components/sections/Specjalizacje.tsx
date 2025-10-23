'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Specjalizacje Section - LessManual Homepage
 *
 * Displays three service specializations with expandable cards.
 * Each card reveals detailed description and metrics on click.
 *
 * Design System:
 * - Brand colors: Night (#0C0D0A), Pear (#DDE000), Tekhelet (#5716A2)
 * - Layout: 3-column grid (desktop), stacked (mobile)
 * - Animations: Expand/collapse with Framer Motion AnimatePresence
 * - Interactive: Click to toggle card expansion
 *
 * Performance:
 * - Uses Framer Motion for GPU-accelerated animations
 * - AnimatePresence for smooth height transitions
 * - Lazy render: only animated when in viewport
 *
 * Accessibility:
 * - Semantic HTML5 structure (section, article)
 * - ARIA attributes (aria-expanded, aria-controls)
 * - Keyboard navigation (Tab, Enter/Space to toggle)
 * - Focus indicators (ring on pear)
 * - WCAG AAA contrast ratios
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: specjalizacje.title, subtitle, obsługaKlienta, etc.
 *
 * @example
 * ```tsx
 * <Specjalizacje />
 * ```
 *
 * @returns {JSX.Element} Specializations section with 3 expandable cards
 *
 * @see {@link https://www.framer.com/motion/animate-presence/} - AnimatePresence docs
 */
export function Specjalizacje(): JSX.Element {
  const t = useTranslations('specjalizacje')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Track which cards are expanded (null = all collapsed)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  const specializations = [
    {
      id: 'obsługaKlienta',
      icon: '💬',
      titleKey: 'obsługaKlienta.title',
      descriptionKey: 'obsługaKlienta.description',
      metrics: [
        'obsługaKlienta.metric1',
        'obsługaKlienta.metric2',
        'obsługaKlienta.metric3',
      ],
    },
    {
      id: 'leadGeneration',
      icon: '🎯',
      titleKey: 'leadGeneration.title',
      descriptionKey: 'leadGeneration.description',
      metrics: [
        'leadGeneration.metric1',
        'leadGeneration.metric2',
        'leadGeneration.metric3',
      ],
    },
    {
      id: 'contentMarketing',
      icon: '✍️',
      titleKey: 'contentMarketing.title',
      descriptionKey: 'contentMarketing.description',
      metrics: [
        'contentMarketing.metric1',
        'contentMarketing.metric2',
        'contentMarketing.metric3',
      ],
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-night overflow-hidden"
      aria-labelledby="specjalizacje-heading"
    >
      {/* Background blur effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(221, 224, 0, 0.3) 0%, transparent 70%)`,
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] opacity-15"
          style={{
            background: `radial-gradient(circle, rgba(87, 22, 162, 0.4) 0%, transparent 70%)`,
            filter: 'blur(120px)',
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
            id="specjalizacje-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec, index) => {
            const isExpanded = expandedCard === spec.id

            return (
              <motion.article
                key={spec.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <button
                  onClick={() => toggleCard(spec.id)}
                  className={`
                    w-full text-left p-6 rounded-2xl border-2 transition-all duration-300
                    ${
                      isExpanded
                        ? 'bg-night/90 border-pear shadow-lg shadow-pear/20'
                        : 'bg-night/50 border-white/10 hover:border-white/20'
                    }
                    backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pear/50
                  `}
                  aria-expanded={isExpanded}
                  aria-controls={`card-content-${spec.id}`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl" aria-hidden="true">
                        {spec.icon}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {t(spec.titleKey)}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-pear text-2xl"
                      aria-hidden="true"
                    >
                      ▼
                    </motion.div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`card-content-${spec.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/80 mb-6 leading-relaxed">
                          {t(spec.descriptionKey)}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-1 gap-3">
                          {spec.metrics.map((metricKey, idx) => (
                            <motion.div
                              key={metricKey}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 + 0.2 }}
                              className="flex items-center gap-2 px-3 py-2 bg-pear/10 border border-pear/30 rounded-lg"
                            >
                              <span className="text-pear text-lg" aria-hidden="true">
                                ✓
                              </span>
                              <span className="text-sm md:text-base text-white font-medium">
                                {t(metricKey)}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
