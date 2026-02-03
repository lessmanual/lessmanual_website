'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const REASON_KEYS = ['competition', 'costs', 'capacity'] as const

export function WhyNowSection(): React.ReactElement {
  const t = useTranslations('whyNow')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-night py-16 lg:py-20"
      aria-labelledby="why-now-heading"
    >
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h2
              id="why-now-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-3"
            >
              {t('headline')}
            </h2>
            <p className="text-lg text-white/60">
              {t('subheadline')}
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {REASON_KEYS.map((key, index) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="relative bg-red-500/10 border border-red-500/30 rounded-xl p-5 text-center"
              >
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {t(`reasons.${key}.stat`)}
                </div>
                <div className="text-white font-medium mb-1">
                  {t(`reasons.${key}.title`)}
                </div>
                <div className="text-sm text-white/60">
                  {t(`reasons.${key}.description`)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
