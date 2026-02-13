'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Database, MessageSquare, Send, Calendar } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * AI SDR Solution Section
 *
 * Presents the 5-step process of the AI SDR system.
 * Each step has an icon, number, title, and description.
 * Ends with a highlight box showing what the client receives.
 *
 * Design:
 * - Numbered steps with Lucide icons
 * - Pear-accented step numbers
 * - Highlight box with pear border at bottom
 * - Staggered animations on scroll
 *
 * @returns {React.ReactElement} Solution section
 */

const steps = [
  {
    icon: Target,
    number: '01',
    title: 'Definiujemy Twojego idealnego klienta',
    description:
      'Wspólnie określamy ICP: branża, wielkość firmy, stanowisko osoby decyzyjnej, lokalizacja. Precyzyjne targetowanie = wyższy wskaźnik odpowiedzi.',
  },
  {
    icon: Database,
    number: '02',
    title: 'Budujemy bazę i weryfikujemy',
    description:
      'Scrapujemy i weryfikujemy dane kontaktowe. Każdy lead jest sprawdzony: aktualny mail, prawdziwa osoba, pasuje do Twojego ICP.',
  },
  {
    icon: MessageSquare,
    number: '03',
    title: 'Personalizujemy komunikację',
    description:
      'AI analizuje firmę i osobę. Pisze spersonalizowaną wiadomość, która nie wygląda jak mass mailing. Dlatego wskaźnik otwarć przekracza 70%.',
  },
  {
    icon: Send,
    number: '04',
    title: 'Prowadzimy kampanię',
    description:
      'Wysyłka z rozgrzanych domen, follow-upy, A/B testy tematów. Monitorujemy deliverability i optymalizujemy na bieżąco.',
  },
  {
    icon: Calendar,
    number: '05',
    title: 'Spotkanie ląduje w Twoim kalendarzu',
    description:
      'Gdy ktoś odpowie pozytywnie - umawiamy spotkanie bezpośrednio w Twoim kalendarzu. Ty dostajesz powiadomienie i wchodzisz na call.',
  },
]

export function AiSdrSolutionSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="solution"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="solution-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-tekhelet/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pear/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div variants={fadeInUp} className="text-center mb-6">
            <h2
              id="solution-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-white mb-6"
            >
              System, który umawia{' '}
              <span className="text-pear">spotkania</span> za Ciebie
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Od zdefiniowania klienta do spotkania w kalendarzu. Cały proces
              działa w tle - Ty skupiasz się na zamykaniu deali.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto mt-16 space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-6 group"
                >
                  {/* Icon + Number */}
                  <div className="flex-shrink-0 relative">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-pear/50 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-pear" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-pear text-night text-xs font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Highlight Box */}
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto mt-16"
          >
            <div className="relative rounded-2xl border-2 border-pear/30 bg-pear/5 p-8 md:p-10">
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-pear/5 blur-xl" />

              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold text-pear mb-4">
                  Co Ty dostajesz?
                </h3>
                <div className="bg-night/50 rounded-xl p-5 border border-white/10">
                  <p className="text-white/80 text-base md:text-lg leading-relaxed font-mono">
                    <span className="text-pear font-bold">Nowe spotkanie:</span>{' '}
                    Marek Kowalski, CTO @ TechFirma Sp. z o.o.
                    <br />
                    <span className="text-white/50">Temat:</span> Automatyzacja
                    procesów sprzedażowych
                    <br />
                    <span className="text-white/50">Kiedy:</span> Wtorek, 14:00
                    <br />
                    <span className="text-white/50">Link:</span>{' '}
                    <span className="text-pear/80">Google Meet</span>
                  </p>
                </div>
                <p className="mt-4 text-sm text-white/50">
                  Dokładnie takie powiadomienie leci do Ciebie. Bez Twojego udziału.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
