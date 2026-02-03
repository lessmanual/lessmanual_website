'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * Comparison Section - LessManual
 *
 * Side-by-side comparison of alternatives: in-house, agency, DIY vs LessManual.
 * Shows why LessManual is the best choice.
 *
 * @returns {React.ReactElement} Comparison section
 */

const ALTERNATIVE_KEYS = ['inhouse', 'agency', 'diy'] as const

export function ComparisonSection(): React.ReactElement {
  const t = useTranslations('comparison')
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="comparison"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="comparison-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pear/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2
              id="comparison-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {t('headline')}
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              {t('subheadline')}
            </p>
          </motion.div>

          {/* Comparison Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Alternatives (with cons) */}
            {ALTERNATIVE_KEYS.map((key) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                {/* Header */}
                <h3 className="text-lg font-bold text-white/80 mb-4">
                  {t(`options.${key}.name`)}
                </h3>

                {/* Cost & Time */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/40">{t('labels.cost')}:</span>
                    <span className="text-white/70">{t(`options.${key}.cost`)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/40">{t('labels.time')}:</span>
                    <span className="text-white/70">{t(`options.${key}.time`)}</span>
                  </div>
                </div>

                {/* Cons */}
                <ul className="space-y-2">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-400/80">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t(`options.${key}.cons.${i}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* LessManual (highlighted, with pros) */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-pear/10 border-2 border-pear rounded-2xl p-6 pt-8"
            >
              {/* Best choice badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pear text-night text-xs font-bold px-3 py-1 rounded-full">
                {t('labels.bestChoice')}
              </div>

              {/* Header */}
              <h3 className="text-lg font-bold text-pear mb-4">
                {t('options.lessmanual.name')}
              </h3>

              {/* Cost & Time */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/40">{t('labels.cost')}:</span>
                  <span className="text-pear font-semibold">{t('options.lessmanual.cost')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/40">{t('labels.time')}:</span>
                  <span className="text-pear font-semibold">{t('options.lessmanual.time')}</span>
                </div>
              </div>

              {/* Pros */}
              <ul className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-pear">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t(`options.lessmanual.pros.${i}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <a
              href={`#${locale === 'en' ? 'contact' : 'kontakt'}`}
              onClick={(e) => {
                e.preventDefault()
                const contactId = locale === 'en' ? 'contact' : 'kontakt'
                const target = document.querySelector(`#${contactId}`)
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-flex items-center gap-2 bg-pear text-night font-semibold px-8 py-4 rounded-lg hover:bg-pear/90 transition-colors"
            >
              {t('cta')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
