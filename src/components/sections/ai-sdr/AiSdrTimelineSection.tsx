'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer, timelineItem } from '@/lib/animations'

/**
 * AI SDR Timeline Section
 *
 * Vertical timeline showing the 3-week path from start to meetings.
 * Each item has a pear-colored dot, title, description, and time badge.
 * Connected by a vertical line on the left side.
 *
 * Design:
 * - Vertical timeline with left-aligned dots
 * - Progressive reveal on scroll using timelineItem variant
 * - Pear-colored dot markers and time badges
 * - Summary line at the bottom
 *
 * @returns {React.ReactElement} Timeline section
 */

const timelineItems = [
  {
    week: 'Tydzień 1',
    title: 'Kick-off',
    description:
      '30-minutowy call. Określamy Twojego idealnego klienta (ICP), ton komunikacji, cele. To jedyny większy blok Twojego czasu.',
    time: '30 min',
  },
  {
    week: 'Tydzień 1-3',
    title: 'Konfiguracja techniczna',
    description:
      'Konfigurujemy domeny, rozgrzewamy skrzynki, scrapujemy i weryfikujemy bazę kontaktów, piszemy sekwencje mailingowe. Wszystko po naszej stronie.',
    time: '0 min',
  },
  {
    week: 'Tydzień 3',
    title: 'Start kampanii',
    description:
      'Pierwsze wiadomości wychodzą. Monitorujemy deliverability, wskaźnik otwarć, bounce rate. Optymalizujemy w czasie rzeczywistym.',
    time: '0 min',
  },
  {
    week: 'Tydzień 3-4',
    title: 'Pierwsze odpowiedzi',
    description:
      'Zainteresowani odpowiadają. AI kwalifikuje odpowiedzi i umawia spotkania. Ty dostajesz tylko gotowe, zakwalifikowane spotkania.',
    time: '5 min/tydz',
  },
  {
    week: 'Tydzień 4+',
    title: 'Stabilna praca',
    description:
      'System działa ciągle. Co tydzień nowe spotkania w kalendarzu. Skalujemy wolumen w górę na podstawie wyników.',
    time: '5 min/tydz',
  },
]

export function AiSdrTimelineSection(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="timeline-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-pear/5 rounded-full blur-3xl" />
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
              id="timeline-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Od startu do spotkań w{' '}
              <span className="text-pear">3 tygodnie</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-white/10" />

              <div className="space-y-10">
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={timelineItem}
                    className="relative flex items-start gap-6 md:gap-8"
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-night border-2 border-pear shadow-lg shadow-pear/20">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-pear" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-pear uppercase tracking-wider">
                          {item.week}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pear/10 text-pear border border-pear/20">
                          Twój czas: {item.time}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-base text-white/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-8 py-4">
              <span className="text-lg md:text-xl text-white">
                Łączne zaangażowanie:{' '}
                <span className="font-bold text-pear">
                  ~1 godzina na konfigurację + 5 minut tygodniowo
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
