'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Guarantee Section
 *
 * Guarantee section with pulsing shield icon and proof points.
 * Special gradient background with pear accents.
 *
 * @returns {React.ReactElement} Guarantee section
 */

const PROOF_POINTS = [
  {
    stat: '73% wskaźnik otwarć',
    detail: '3x średnia rynkowa',
  },
  {
    stat: '63% wskaźnik odpowiedzi',
    detail: 'Ponad połowa odpowiada pozytywnie',
  },
  {
    stat: 'Deal zamknięty w 6 dni',
    detail: 'Od cold maila do podpisanej umowy',
  },
]

export function AiSdrGuaranteeSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="gwarancja"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="guarantee-heading"
    >
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Main Guarantee Card */}
          <motion.div
            variants={fadeInUp}
            className="relative bg-gradient-to-br from-pear/5 to-pear/10 border-2 border-pear/30 rounded-2xl p-8 md:p-12 text-center"
          >
            {/* Pulsing Shield Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pear/10 text-pear mb-6"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(221, 224, 0, 0.2)',
                  '0 0 0 20px rgba(221, 224, 0, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              <ShieldCheck className="w-10 h-10" />
            </motion.div>

            {/* Heading */}
            <h2
              id="guarantee-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              0 spotkań w 45 dni = zwrot za uruchomienie
            </h2>

            {/* Description */}
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Jeśli po 45 dniach od uruchomienia kampanii nie umówimy ani jednego kwalifikowanego spotkania, zwracamy 100% kosztu uruchomienia. Bez pytań, bez haczyka. Ryzyko jest po naszej stronie, bo wierzymy w skuteczność systemu.
            </p>

            {/* Proof Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {PROOF_POINTS.map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-night/40 border border-pear/20 rounded-xl p-4"
                >
                  <div className="text-lg font-bold text-pear mb-1">
                    {point.stat}
                  </div>
                  <div className="text-sm text-white/50">
                    {point.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
