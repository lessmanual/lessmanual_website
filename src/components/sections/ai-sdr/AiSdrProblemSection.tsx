'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Problem Section
 *
 * 4 pain points of manual B2B prospecting.
 * Uses WAL persona language — emotional, direct, concrete.
 *
 * @returns {React.ReactElement} Problem section
 */

const painPoints = [
  {
    bold: 'Tracisz 20–40 godzin miesięcznie na szukanie klientów.',
    detail:
      'LinkedIn, Google, bazy danych. Sprawdzasz kto decyduje. Szukasz maila. Piszesz wiadomość. I tak w kółko. Zamiast sprzedawać — szukasz komu sprzedawać. Każdy dzień to samo.',
  },
  {
    bold: 'Płaciłeś za „leady” i dostawałeś ciszę.',
    detail:
      'Agencja obiecała 50 leadów miesięcznie. Dostałeś arkusz z mailami. Piszesz. Nikt nie odpowiada. Bo to nie były leady — to była lista mailingowa. Wyrzucone pieniądze.',
  },
  {
    bold: 'Zatrudnienie SDR-a? 8–12k PLN miesięcznie. I nadzieja.',
    detail:
      'Plus narzędzia, onboarding, management. 3 miesiące zanim zacznie dowozić — jeśli nie odejdzie wcześniej. 40% SDR-ów odchodzi w ciągu roku. Znów od zera.',
  },
  {
    bold: 'Żyjesz z poleceń i nie wiesz co będzie za miesiąc.',
    detail:
      'Polecenia są super — dopóki są. Ale nie masz nad nimi kontroli. Nie wiesz ile klientów przyjdzie w przyszłym miesiącu. Zero przewidywalności = zero spokoju.',
  },
]

export function AiSdrProblemSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="problem"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="problem-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-pear/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-tekhelet/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2
              id="problem-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Szukasz klientów{' '}
              <span className="text-pear">B2B</span>?
            </h2>
          </motion.div>

          {/* Pain Points */}
          <div className="max-w-3xl mx-auto space-y-10">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative pl-6 border-l-2 border-white/10"
              >
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  <span className="font-bold text-white">{point.bold}</span>
                </p>
                <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed">
                  {point.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Punchline */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <p className="text-2xl md:text-3xl font-bold text-white">
              Potrzebujesz{' '}
              <span
                className="text-pear"
                style={{ textShadow: '0 0 40px rgba(221, 224, 0, 0.3)' }}
              >
                spotkań z decydentami
              </span>
              , nie kolejnych leadów.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
