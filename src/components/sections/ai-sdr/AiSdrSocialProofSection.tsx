'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Social Proof Section
 *
 * Dashboard screenshot, annotation cards, case study cards,
 * and metrics comparison table.
 *
 * @returns {React.ReactElement} Social proof section
 */

const ANNOTATIONS = [
  {
    stat: '463 maile wysłane',
    detail: 'kampania ukończona w 32%',
  },
  {
    stat: '73% wskaźnik otwarć',
    detail: '3x średnia rynkowa',
  },
  {
    stat: '63.2% wskaźnik odpowiedzi',
    detail: 'ponad połowa zainteresowanych',
  },
  {
    stat: '12 szans sprzedażowych | ~40k PLN',
    detail: 'z 1/3 kampanii',
  },
]

const CASE_STUDIES = [
  {
    company: 'WiperApp',
    headline: 'Cold email \u2192 podpisana umowa w 6 dni',
    details: [
      'SaaS w branży automotive',
      'Osoba decyzyjna odpowiedziała na 2. maila',
      'Rozmowa wstępna + demo w tym samym tygodniu',
      'Umowa podpisana na 6. dzień od pierwszego maila',
    ],
  },
  {
    company: 'Flying Dynamite',
    headline: 'Software house. Rozmowa wstępna po cold emailu.',
    details: [
      'Software house szukający klientów B2B',
      'Pozytywna odpowiedź na 1. maila w sekwencji',
      'Umówiona rozmowa wstępna z CTO',
      'Rozmowy o współpracy w toku',
    ],
  },
]

const COMPARISON_ROWS = [
  { metric: 'Wskaźnik otwarć', ours: '73%', benchmark: '20-30%' },
  { metric: 'Wskaźnik odpowiedzi', ours: '63%', benchmark: '~15-20%' },
  { metric: 'Czas do deala', ours: '6 dni', benchmark: '30-90 dni' },
  { metric: 'Spotkanie \u2192 Zamknięcie', ours: '50%', benchmark: '20-30%' },
]

export function AiSdrSocialProofSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="wyniki"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="social-proof-heading"
    >
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pear/5 rounded-full blur-3xl" />
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
              id="social-proof-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Wyniki z aktywnej kampanii
            </h2>
          </motion.div>

          {/* Dashboard Screenshot */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="relative rounded-2xl border-2 border-white/10 shadow-2xl overflow-hidden">
              <Image
                src="/images/ai-sdr/instantly-dashboard.png"
                alt="Dashboard Instantly - kampania AI SDR, luty 2026"
                width={1400}
                height={788}
                className="w-full h-auto"
                priority
              />
            </div>
            <p className="text-center text-sm text-white/50 mt-4">
              Dashboard Instantly — kampania AI SDR, luty 2026
            </p>
          </motion.div>

          {/* Annotation Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16"
          >
            {ANNOTATIONS.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-pear/30 transition-colors"
              >
                <div className="text-lg font-bold text-pear mb-1">
                  {item.stat}
                </div>
                <div className="text-sm text-white/60">
                  {item.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Case Study Cards */}
          <motion.div variants={fadeInUp} className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Przykłady wdrożeń
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((study, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/5 border border-pear/20 rounded-2xl p-6 hover:border-pear/40 transition-colors"
                >
                  <div className="inline-flex items-center gap-2 bg-pear/10 border border-pear/30 rounded-full px-3 py-1 mb-4">
                    <span className="text-xs font-semibold text-pear">{study.company}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">
                    {study.headline}
                  </h4>
                  <ul className="space-y-2">
                    {study.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-pear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Metrics Comparison Table */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Nasze wyniki vs. średnia rynkowa
            </h3>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/70">
                      Co mierzymy
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-pear">
                      Nasz wynik
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/50">
                      Średnia rynkowa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-t border-white/5 ${
                        index % 2 === 0 ? 'bg-white/[0.02]' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-white/80">
                        {row.metric}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-pear">
                        {row.ours}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/40">
                        {row.benchmark}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {COMPARISON_ROWS.map((row, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="text-xs text-white/50 mb-1">{row.metric}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-white/40 mr-2">Śr. rynkowa:</span>
                      <span className="text-sm text-white/50">{row.benchmark}</span>
                    </div>
                    <div className="text-lg font-bold text-pear">{row.ours}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
