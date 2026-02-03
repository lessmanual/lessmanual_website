'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * Guarantee Section - LessManual
 *
 * Displays trust-building guarantees to reduce purchase risk.
 * Three guarantee cards: ROI guarantee, 30-day trial, unlimited support.
 *
 * @returns {React.ReactElement} Guarantee section
 */

const GUARANTEE_KEYS = ['roi', 'trial', 'support'] as const
const BADGE_KEYS = ['rodo', 'aiAct', 'ssl'] as const

const ICONS = {
  roi: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  trial: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  support: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
}

const BADGE_ICONS = {
  rodo: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  aiAct: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  ssl: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
}

export function GuaranteeSection(): React.ReactElement {
  const t = useTranslations('guarantee')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="guarantee"
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-night to-night/95 py-20 lg:py-28"
      aria-labelledby="guarantee-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pear/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2
              id="guarantee-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {t('headline')}
            </h2>
            <p className="text-xl text-pear font-semibold">
              {t('subheadline')}
            </p>
          </motion.div>

          {/* Guarantee Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {GUARANTEE_KEYS.map((key) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="relative bg-white/5 backdrop-blur-sm border border-pear/20 rounded-2xl p-6 text-center hover:border-pear/40 transition-colors"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pear/10 text-pear mb-4">
                  {ICONS[key]}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {t(`items.${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {BADGE_KEYS.map((key) => (
              <div
                key={key}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
              >
                <span className="text-pear">
                  {BADGE_ICONS[key]}
                </span>
                <span className="text-sm text-white/70">
                  {t(`badges.${key}`)}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
