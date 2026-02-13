'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

/**
 * AI SDR Mid-Page CTA
 *
 * Placed after social proof section, before pricing.
 * Catches visitors who are convinced by results and want to act now
 * without scrolling through the pricing details.
 *
 * @returns {React.ReactElement} Mid-page CTA section
 */

const CAL_URL = 'https://cal.com/bart%C5%82omiej-chudzik-2en6pt'

export function AiSdrMidCta(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-r from-pear/5 via-pear/10 to-pear/5 border-y border-pear/20 py-12"
    >
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-xl md:text-2xl font-bold text-white">
              Chcesz takie wyniki?
            </p>
            <p className="text-white/60 mt-1">
              15 minut. Pokążę Ci ile spotkań możesz dostawać miesięcznie.
            </p>
          </div>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-pear text-night font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-pear/30 hover:bg-pear/90 hover:shadow-pear/50 hover:scale-105 transition-all duration-300"
          >
            Umów konsultację
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
