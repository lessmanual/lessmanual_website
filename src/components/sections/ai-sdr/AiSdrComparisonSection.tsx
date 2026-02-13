'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Comparison Section
 *
 * Side-by-side comparison of traditional SDR vs AI SDR (LessManual).
 * Updated punchline with new price range (500-2,000 PLN).
 *
 * @returns {React.ReactElement} Comparison section
 */

interface ComparisonRow {
  category: string
  sdr: string
  aiSdr: string
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: 'Koszt miesięczny',
    sdr: '12–22k PLN (pensja + ZUS + narzędzia)',
    aiSdr: '0 PLN stałych. Płacisz za spotkania.',
  },
  {
    category: 'Czas do wyników',
    sdr: '3–6 miesięcy (rekrutacja + onboarding + rozruch)',
    aiSdr: '3 tygodnie (konfiguracja + rozgrzewanie + start)',
  },
  {
    category: 'Ryzyko',
    sdr: 'Płacisz z góry. Nawet jak nie umówi spotkań.',
    aiSdr: 'Zero ryzyka. Nie ma spotkań = nie płacisz.',
  },
  {
    category: 'Skalowanie',
    sdr: 'Kolejny SDR = kolejne 12k+ PLN/mies',
    aiSdr: 'Zwiększ kampanię. System skaluje się liniowo.',
  },
  {
    category: 'Dostępność',
    sdr: 'Pn-Pt 8-16. Urlopy. L4. Słabsze dni.',
    aiSdr: '24/7. Bez przerw. Bez urlopów.',
  },
  {
    category: 'Rotacja',
    sdr: '40% SDR-ów odchodzi w ciągu roku',
    aiSdr: 'Brak problemu. System jest Twój.',
  },
  {
    category: 'Zarządzanie',
    sdr: 'Musisz nadzorować, szkolić, motywować',
    aiSdr: 'My zarządzamy całością. Ty dostajesz spotkania.',
  },
]

export function AiSdrComparisonSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="porownanie"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="comparison-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pear/5 rounded-full blur-3xl" />
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
              Zatrudnienie SDR-a vs. AI SDR
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Porównaj koszty, ryzyko i wyniki.
            </p>
          </motion.div>

          {/* Desktop: Side-by-side columns */}
          <div className="hidden lg:block">
            <motion.div variants={fadeInUp} className="grid grid-cols-[1fr_2fr_2fr] gap-0 overflow-hidden rounded-2xl border border-white/10">
              {/* Header Row */}
              <div className="bg-white/5 px-6 py-4 border-b border-white/5" />
              <div className="bg-red-500/5 px-6 py-4 border-b border-white/5 border-l border-white/5">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-bold text-red-400">Twój SDR</span>
                </div>
              </div>
              <div className="bg-pear/10 px-6 py-4 border-b border-white/5 border-l border-white/5">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-pear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold text-pear">AI SDR (LessManual)</span>
                </div>
              </div>

              {/* Data Rows */}
              {COMPARISON_ROWS.map((row, index) => (
                <React.Fragment key={index}>
                  <div className={`px-6 py-4 text-sm font-semibold text-white/80 ${
                    index < COMPARISON_ROWS.length - 1 ? 'border-b border-white/5' : ''
                  } ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                    {row.category}
                  </div>
                  <div className={`px-6 py-4 text-sm text-white/60 border-l border-white/5 ${
                    index < COMPARISON_ROWS.length - 1 ? 'border-b border-white/5' : ''
                  } ${index % 2 === 0 ? 'bg-red-500/[0.03]' : 'bg-red-500/[0.01]'}`}>
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {row.sdr}
                    </div>
                  </div>
                  <div className={`px-6 py-4 text-sm text-white/80 border-l border-white/5 ${
                    index < COMPARISON_ROWS.length - 1 ? 'border-b border-white/5' : ''
                  } ${index % 2 === 0 ? 'bg-pear/[0.03]' : 'bg-pear/[0.01]'}`}>
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-pear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {row.aiSdr}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Mobile: Stacked cards */}
          <div className="lg:hidden space-y-4">
            {COMPARISON_ROWS.map((row, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="rounded-xl overflow-hidden border border-white/10"
              >
                <div className="bg-white/5 px-4 py-3">
                  <span className="text-sm font-semibold text-white">{row.category}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="bg-red-500/5 border-t border-white/5 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <span className="text-xs text-red-400/60 font-semibold block mb-1">SDR</span>
                        <span className="text-sm text-white/60">{row.sdr}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-pear/5 border-t border-white/5 sm:border-l px-4 py-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-pear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="text-xs text-pear font-semibold block mb-1">AI SDR</span>
                        <span className="text-sm text-white/80">{row.aiSdr}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Punchline */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-pear/10 border border-pear/30 rounded-xl px-6 py-4">
              <p className="text-white/80 text-sm md:text-base">
                <span className="font-bold text-red-400">SDR:</span> 12–22k PLN/mies stale, niezależnie od wyników.{' '}
                <span className="font-bold text-pear">AI SDR:</span> 500–2 000 PLN za realne, kwalifikowane spotkanie.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
