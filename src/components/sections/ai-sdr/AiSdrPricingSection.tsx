'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Pricing Section
 *
 * Two-step pricing flow:
 *   Step 1 — Setup tiers (one-time): Starter / Growth / Scale
 *   Step 2 — Per-meeting pricing (ongoing, by ACV bracket)
 * Followed by a concrete example scenario and meeting definition criteria.
 *
 * @returns {React.ReactElement} Pricing section
 */

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface SetupTier {
  name: string
  title: string
  price: string
  subtitle: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

const SETUP_TIERS: SetupTier[] = [
  {
    name: 'STARTER',
    title: 'STARTER — Email',
    price: '2 000 PLN',
    subtitle: 'Dla firm, kt\u00F3re chc\u0105 przetestowa\u0107 system.',
    features: [
      'Dedykowana domena email + warmup 14\u201321 dni',
      'Konfiguracja dostarczalno\u015Bci (deliverability)',
      'Badanie ICP + lista prospect\u00F3w z AI scoringiem',
      'Sekwencja 3\u20135 maili (copywriting AI)',
      'Raportowanie w czasie rzeczywistym',
    ],
  },
  {
    name: 'GROWTH',
    title: 'GROWTH — Email + LinkedIn',
    price: '3 500 PLN',
    subtitle: 'Dla firm, kt\u00F3re chc\u0105 pe\u0142n\u0105 moc systemu.',
    highlighted: true,
    badge: 'Popularny wyb\u00F3r',
    features: [
      'Wszystko z planu STARTER',
      'LinkedIn outreach (zaproszenia + wiadomo\u015Bci)',
      'Sekwencje wielokana\u0142owe (email + LinkedIn)',
      'Testy A/B temat\u00F3w i tre\u015Bci',
      'Personalizacja AI per prospect',
      'Cotygodniowe rozmowy optymalizacyjne',
      'Dedykowany kana\u0142 Slack',
    ],
  },
  {
    name: 'SCALE',
    title: 'SCALE — Wielokana\u0142owy',
    price: '5 000 PLN',
    subtitle: 'Dla firm z du\u017Cym rynkiem do zagospodarowania.',
    features: [
      'Wszystko z planu GROWTH',
      'Zwi\u0119kszona skala (wi\u0119cej prospect\u00F3w)',
      'Zaawansowane dane o intencjach + triggery',
      'Dedykowany proces wzbogacania danych',
      'Priorytetowe wsparcie + SLA',
      'Miesi\u0119czny przegl\u0105d strategiczny',
    ],
  },
]

interface MeetingPrice {
  acv: string
  price: string
  priceNum: number
  roi: string
}

const MEETING_PRICES: MeetingPrice[] = [
  { acv: '5\u201320 tys. PLN', price: '750 PLN', priceNum: 750, roi: 'ROI 233%' },
  { acv: '20\u201350 tys. PLN', price: '1 000 PLN', priceNum: 1000, roi: 'ROI 600%' },
  { acv: '50\u2013150 tys. PLN', price: '1 500 PLN', priceNum: 1500, roi: 'ROI 1 233%' },
  { acv: '150 tys.+ PLN', price: '2 000 PLN', priceNum: 2000, roi: 'ROI 1 400%' },
]

const MEETING_CRITERIA = [
  'Osoba decyzyjna (C-level, VP, dyrektor, kierownik)',
  'Firma pasuje do Twojego ICP (bran\u017Ca, wielko\u015B\u0107, lokalizacja)',
  'Wyra\u017Ca zainteresowanie rozmow\u0105 w odpowiedzi na wiadomo\u015B\u0107',
  'Spotkanie zrealizowane (min. 15 minut)',
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function StepBadge({ step, label }: { step: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pear text-night text-sm font-bold shrink-0">
        {step}
      </span>
      <span className="text-sm font-semibold uppercase tracking-wider text-pear">
        {label}
      </span>
    </div>
  )
}

function CheckIcon({ className = 'text-pear' }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AiSdrPricingSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="cennik"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="pricing-heading"
    >
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pear/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* -------------------------------------------------------- */}
          {/*  Header                                                   */}
          {/* -------------------------------------------------------- */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2
              id="pricing-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Jak wygl&#261;da rozliczenie?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Dwa proste kroki. Jednorazowe uruchomienie&nbsp;+ p&#322;atno&#347;&#263; tylko
              za zrealizowane spotkania z&nbsp;osobami decyzyjnymi. &#379;adnych
              sta&#322;ych op&#322;at miesi&#281;cznych.
            </p>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/*  STEP 1 — Setup Tiers                                     */}
          {/* -------------------------------------------------------- */}
          <motion.div variants={fadeInUp}>
            <StepBadge step={1} label="Uruchomienie systemu (jednorazowo)" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4"
          >
            {SETUP_TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeInUp}
                className={`relative rounded-2xl p-6 pt-8 ${
                  tier.highlighted
                    ? 'bg-pear/10 border-2 border-pear'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pear text-night text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}

                {/* Title */}
                <h3
                  className={`text-lg font-bold mb-4 ${
                    tier.highlighted ? 'text-pear' : 'text-white'
                  }`}
                >
                  {tier.title}
                </h3>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-3xl font-bold text-pear">
                    {tier.price}
                  </span>
                  <span className="text-white/50 text-sm ml-2">jednorazowo</span>
                </div>

                {/* Subtitle */}
                <p className="text-sm text-white/50 mb-6">{tier.subtitle}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Payment note */}
          <motion.p
            variants={fadeInUp}
            className="text-center text-white/50 text-sm mb-20"
          >
            50% zaliczki przed startem. 50% w dniu uruchomienia kampanii.
          </motion.p>

          {/* -------------------------------------------------------- */}
          {/*  STEP 2 — Per-meeting pricing                             */}
          {/* -------------------------------------------------------- */}
          <motion.div variants={fadeInUp} className="mb-16">
            <StepBadge step={2} label="P&#322;atno&#347;&#263; za spotkania (bie&#380;&#261;co)" />

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              P&#322;acisz tylko za zrealizowane spotkania
            </h3>
            <p className="text-white/60 max-w-2xl mb-8">
              Kwota zale&#380;y od &#347;redniej warto&#347;ci Twojego kontraktu (ACV).
              Im wi&#281;kszy deal, tym wi&#281;ksza warto&#347;&#263;
              spotkania&nbsp;&mdash; i&nbsp;proporcjonalnie wy&#380;sza cena.
              Nie p&#322;acisz za maile, leady ani &bdquo;MQL&rdquo;.
            </p>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/70">
                      Tw&#243;j &#347;redni kontrakt
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/70">
                      Cena za spotkanie
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-white/70">
                      Przyk&#322;adowy ROI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MEETING_PRICES.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-t border-white/5 ${
                        index % 2 === 0 ? 'bg-white/[0.02]' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-white/80">
                        {row.acv}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-pear">
                        {row.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-400 font-semibold">
                        {row.roi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {MEETING_PRICES.map((row, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="text-xs text-white/50 mb-2">{row.acv}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-pear">
                      {row.price}
                    </span>
                    <span className="text-sm text-green-400 font-semibold">
                      {row.roi}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/*  Example Scenario                                         */}
          {/* -------------------------------------------------------- */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto mb-16"
          >
            <h4 className="text-lg font-bold text-white mb-1">
              Przyk&#322;ad: software house, &#347;redni kontrakt 50&nbsp;tys.&nbsp;PLN
            </h4>
            <p className="text-sm text-white/50 mb-6">
              Wybierasz plan GROWTH (email + LinkedIn).
            </p>

            {/* Cost side */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40 mb-3">
                  Tw&#243;j koszt
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex justify-between">
                    <span>Uruchomienie (jednorazowo)</span>
                    <span className="font-semibold text-white">3 500 PLN</span>
                  </li>
                  <li className="flex justify-between">
                    <span>4 spotkania &times; 1 500 PLN</span>
                    <span className="font-semibold text-white">6 000 PLN</span>
                  </li>
                  <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                    <span className="font-semibold text-white">Razem (1. miesi&#261;c)</span>
                    <span className="font-bold text-pear">9 500 PLN</span>
                  </li>
                </ul>
              </div>

              {/* Return side */}
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40 mb-3">
                  Potencjalny przych&#243;d
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex justify-between">
                    <span>4 spotkania &times; 25% wsp. zamknięcia</span>
                    <span className="font-semibold text-white">1 klient</span>
                  </li>
                  <li className="flex justify-between">
                    <span>1 klient &times; 50 000 PLN</span>
                    <span className="font-semibold text-white">50 000 PLN</span>
                  </li>
                  <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                    <span className="font-semibold text-white">ROI</span>
                    <span className="font-bold text-green-400">5,3x</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-white/40 mt-6">
              * Przyk&#322;ad pogl&#261;dowy. Rzeczywiste wyniki zale&#380;&#261;
              od bran&#380;y, ICP i&nbsp;jako&#347;ci oferty.
              W kolejnych miesi&#261;cach nie p&#322;acisz ju&#380; za uruchomienie
              &mdash; zostaje tylko koszt spotka&#324;.
            </p>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/*  Meeting Definition                                       */}
          {/* -------------------------------------------------------- */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 border border-pear/30 rounded-xl p-6 max-w-3xl mx-auto"
          >
            <h4 className="text-lg font-bold text-white mb-4">
              Co liczy si&#281; jako &bdquo;kwalifikowane spotkanie&rdquo;?
            </h4>
            <p className="text-sm text-white/50 mb-4">
              P&#322;acisz TYLKO gdy spe&#322;nione s&#261; WSZYSTKIE
              poni&#380;sze warunki:
            </p>
            <ul className="space-y-3">
              {MEETING_CRITERIA.map((criterion, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <CheckIcon className="text-green-400" />
                  {criterion}
                </li>
              ))}
            </ul>
            <p className="text-xs text-white/40 mt-4">
              Nie p&#322;acisz za: no-show, osob&#281; spoza ICP, spotkanie
              anulowane przed terminem.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
