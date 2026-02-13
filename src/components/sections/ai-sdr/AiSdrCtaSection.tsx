'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR CTA Section
 *
 * Final call-to-action section with booking link.
 * Primary CTA links to Cal.com for consultation booking.
 * Secondary contact via email.
 *
 * Design:
 * - Full-width section with centered content
 * - Large pear CTA button with hover glow effect
 * - Scale animation on hover/tap
 * - Subtle trust line and email alternative
 *
 * @returns {React.ReactElement} CTA section
 */

const CAL_URL = 'https://cal.com/bartłomiej-chudzik-2en6pt'

export function AiSdrCtaSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="cta-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pear/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-tekhelet/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            id="cta-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ile spotkań chcesz{' '}
            <span className="text-pear">w tym miesiącu</span>?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
          >
            Umów 15-minutową konsultację. Pokażę Ci jak system działa,
            ile spotkań możesz oczekiwać i czy to ma sens dla Twojego biznesu.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div variants={fadeInUp}>
            <motion.a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-pear text-night rounded-2xl px-12 py-5 text-xl font-bold overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pear/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Umów bezpłatną konsultację - otwiera Cal.com w nowej karcie"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-pear via-white to-pear opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

              {/* Button text */}
              <span className="relative z-10">
                Umów bezpłatną konsultację &rarr;
              </span>
            </motion.a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-sm text-white/50"
          >
            Zero zobowiązań. Zero presji.
          </motion.p>

          {/* Alternative contact */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-base text-white/40"
          >
            Wolisz napisać?{' '}
            <a
              href="mailto:kontakt@lessmanual.ai"
              className="text-pear hover:underline transition-colors"
            >
              kontakt@lessmanual.ai
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
