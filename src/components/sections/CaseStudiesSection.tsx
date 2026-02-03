'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * Case Studies Section - LessManual
 *
 * Displays client success stories with metrics.
 * Grid layout with cards showing company, solution, and key metric.
 *
 * @returns {React.ReactElement} Case Studies section
 */

const CASE_KEYS = ['recyklingKarat', 'smdLed', 'szkolaTanca', 'stolarkabudowlana', 'oze'] as const

export function CaseStudiesSection(): React.ReactElement {
  const t = useTranslations('caseStudies')
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="case-studies-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pear/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tekhelet/10 rounded-full blur-3xl" />
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
              id="case-studies-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {t('headline')}
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              {t('subheadline')}
            </p>
          </motion.div>

          {/* Case Studies Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {CASE_KEYS.map((caseKey, index) => (
              <motion.div
                key={caseKey}
                variants={fadeInUp}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-pear/30 transition-all duration-300"
              >
                {/* Metric badge */}
                <div className="absolute -top-4 right-8 bg-pear text-night font-bold px-4 py-2 rounded-full text-lg">
                  {t(`cases.${caseKey}.metric`)}
                  <span className="text-sm font-normal ml-1">
                    {t(`cases.${caseKey}.metricLabel`)}
                  </span>
                </div>

                {/* Company & Industry */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-pear transition-colors">
                    {t(`cases.${caseKey}.company`)}
                  </h3>
                  <p className="text-white/40 text-sm">
                    {t(`cases.${caseKey}.industry`)}
                  </p>
                </div>

                {/* Solution tag */}
                <div className="inline-block bg-tekhelet/20 text-tekhelet-light px-3 py-1 rounded-full text-sm mb-4">
                  {t(`cases.${caseKey}.solution`)}
                </div>

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {t(`cases.${caseKey}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <p className="text-white/50 text-lg">
              Chcesz takich wyników?{' '}
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
                className="text-pear hover:text-pear/80 underline underline-offset-4 transition-colors"
              >
                Porozmawiajmy
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
