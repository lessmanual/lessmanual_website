'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Pricing Section
 *
 * Fair pricing model:
 *   Step 1 — Setup (one-time): 2,000–4,000 PLN depending on channels & scale
 *   Step 2 — Per-meeting: 500–2,000 PLN (set together during consultation)
 *
 * No ACV-based tiered table. Price depends on client value + market size,
 * discussed transparently during consultation.
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
    subtitle: 'Chcesz przetestować cold email na jednym kanale.',
    features: [
      'Dedykowana domena + rozgrzewanie 14–21 dni',
      'Badanie ICP + lista sprawdzonych kontaktów',
      'Sekwencja 3–5 spersonalizowanych maili',
      'Pilnujemy żeby maile trafiały do skrzynek',
      'Raportowanie w czasie rzeczywistym',
    ],
  },
  {
    name: 'GROWTH',
    title: 'GROWTH — Email + LinkedIn',
    price: '3 000 PLN',
    subtitle: 'Docierasz do ludzi tam gdzie są: mail i LinkedIn.',
    highlighted: true,
    badge: 'Popularny wybór',
    features: [
      'Wszystko z planu STARTER',
      'LinkedIn outreach (zaproszenia + wiadomości)',
      'Docieramy mailem i na LinkedIn jednocześnie',
      'Testujemy co działa lepiej (tematy, treści)',
      'AI personalizuje każdą wiadomość',
      'Cotygodniowe rozmowy optymalizacyjne',
      'Dedykowany kanał Slack',
    ],
  },
  {
    name: 'SCALE',
    title: 'SCALE — Pełna moc',
    price: '4 000 PLN',
    subtitle: 'Duży rynek, duża skala, więcej kanałów.',
    features: [
      'Wszystko z planu GROWTH',
      'Większa skala (więcej kontaktów miesięcznie)',
      'Wiemy kto szuka rozwiązania TERAZ (dane o intencjach)',
      'Zbieramy więcej info o Twoich leadach',
      'Priorytetowe wsparcie + gwarantowany czas reakcji',
      'Miesięczny przegląd strategiczny',
    ],
  },
]

const MEETING_CRITERIA = [
  'Osoba decyzyjna (C-level, VP, dyrektor, kierownik)',
  'Firma pasuje do Twojego ICP (branża, wielkość, lokalizacja)',
  'Wyraża zainteresowanie rozmową w odpowiedzi na wiadomość',
  'Spotkanie zrealizowane (min. 15 minut)',
]

const PRICE_FACTORS = [
  {
    factor: 'Wartość Twojego klienta',
    description: 'Spotkanie warte 50k PLN to co innego niż spotkanie warte 5k PLN — wkładamy więcej pracy w targetowanie i personalizację.',
  },
  {
    factor: 'Wielkość rynku',
    description: 'Niszowy rynek z 200 firmami wymaga innego podejścia niż rynek z 10 000 firm — większa precyzja = więcej pracy.',
  },
  {
    factor: 'Kanały',
    description: 'Sam email to jedno. Email + LinkedIn + dane o intencjach = więcej punktów styku, więcej konfiguracji.',
  },
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
              Transparentny model rozliczenia
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Jednorazowe uruchomienie + p&#322;atno&#347;&#263; za spotkania.
              Zero sta&#322;ych op&#322;at miesi&#281;cznych. P&#322;acisz za wynik, nie za obietnice.
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
          {/*  STEP 2 — Per-meeting pricing (FAIR)                      */}
          {/* -------------------------------------------------------- */}
          <motion.div variants={fadeInUp} className="mb-16">
            <StepBadge step={2} label="P&#322;atno&#347;&#263; za spotkania (bie&#380;&#261;co)" />

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              500&ndash;2&nbsp;000 PLN za potwierdzone spotkanie
            </h3>
            <p className="text-white/60 max-w-2xl mb-4">
              Dok&#322;adn&#261; kwot&#281; ustalamy razem na konsultacji. Nie p&#322;acisz
              za maile, leady ani &bdquo;MQL&rdquo; &mdash; tylko za realne spotkania z decision
              makerami z Twojego ICP.
            </p>
            <p className="text-white/50 text-sm max-w-2xl mb-10">
              &#379;adnych ukrytych op&#322;at. &#379;adnych sta&#322;ych abonament&#243;w.
              Nie ma spotka&#324; = nie p&#322;acisz.
            </p>

            {/* Fair pricing explanation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {PRICE_FACTORS.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="text-sm font-bold text-pear mb-2">
                    {item.factor}
                  </div>
                  <div className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What price depends on — summary */}
            <div className="bg-white/5 border border-pear/20 rounded-xl p-5 max-w-2xl mx-auto text-center">
              <p className="text-sm text-white/70 leading-relaxed">
                <span className="font-bold text-white">Dlaczego zakres, a nie jedna cena?</span>{' '}
                Ka&#380;dy biznes jest inny. Spotkanie z CEO firmy z ACV 150k PLN wymaga wi&#281;cej
                pracy ni&#380; spotkanie z kierownikiem w firmie z ACV 10k PLN &mdash;
                inne targetowanie, inna personalizacja, inna skala. Cen&#281; ustalamy tak,
                &#380;eby by&#322;a fair dla obu stron. Zawsze poznasz j&#261; PRZED startem.
              </p>
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
              Przyk&#322;ad: software house, kontrakt ok. 50&nbsp;tys.&nbsp;PLN
            </h4>
            <p className="text-sm text-white/50 mb-6">
              Plan GROWTH (email + LinkedIn), cena za spotkanie: 1&nbsp;200 PLN.
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
                    <span className="font-semibold text-white">3 000 PLN</span>
                  </li>
                  <li className="flex justify-between">
                    <span>4 spotkania &times; 1 200 PLN</span>
                    <span className="font-semibold text-white">4 800 PLN</span>
                  </li>
                  <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                    <span className="font-semibold text-white">Razem (1. miesi&#261;c)</span>
                    <span className="font-bold text-pear">7 800 PLN</span>
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
                    <span>4 spotkania &times; 25% wsp. zamkni&#281;cia</span>
                    <span className="font-semibold text-white">1 klient</span>
                  </li>
                  <li className="flex justify-between">
                    <span>1 klient &times; 50 000 PLN</span>
                    <span className="font-semibold text-white">50 000 PLN</span>
                  </li>
                  <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                    <span className="font-semibold text-white">ROI</span>
                    <span className="font-bold text-green-400">6,4x</span>
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
