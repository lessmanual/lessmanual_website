'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { timelineItem, staggerContainer } from '@/lib/animations'

/**
 * Jak To Działa Section - LessManual Homepage
 *
 * Displays 4-step implementation process as an animated timeline.
 * Each step reveals on scroll with left-to-right slide animation.
 *
 * Design System:
 * - Brand colors: Night (#0C0D0A), Pear (#DDE000), Tekhelet (#5716A2)
 * - Layout: Vertical timeline with step numbers
 * - Animations: Staggered slide-in from left with scale effect
 * - Visual: Connected line between steps
 *
 * Performance:
 * - Uses Framer Motion for GPU-accelerated animations
 * - Scroll-triggered reveal (useInView)
 * - Reusable animation variants from lib/animations.ts
 *
 * Accessibility:
 * - Semantic HTML5 structure (section, ol, li)
 * - Ordered list for sequential steps
 * - Proper heading hierarchy (h2, h3)
 * - WCAG AAA contrast ratios
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: jakToDziala.title, subtitle, step1-4
 *
 * @example
 * ```tsx
 * <JakToDziala />
 * ```
 *
 * @returns {JSX.Element} 4-step timeline section
 *
 * @see {@link @/lib/animations} - Animation variants
 */
export function JakToDziala(): JSX.Element {
  const t = useTranslations('jakToDziala')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const steps = [
    {
      number: 1,
      titleKey: 'step1.title',
      descriptionKey: 'step1.description',
      icon: '📞',
    },
    {
      number: 2,
      titleKey: 'step2.title',
      descriptionKey: 'step2.description',
      icon: '🔍',
    },
    {
      number: 3,
      titleKey: 'step3.title',
      descriptionKey: 'step3.description',
      icon: '⚡',
    },
    {
      number: 4,
      titleKey: 'step4.title',
      descriptionKey: 'step4.description',
      icon: '📈',
    },
  ]

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-night via-night/95 to-night overflow-hidden"
      aria-labelledby="jak-to-dziala-heading"
    >
      {/* Background blur effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] opacity-15"
          style={{
            background: `radial-gradient(circle, rgba(87, 22, 162, 0.5) 0%, transparent 70%)`,
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="jak-to-dziala-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative max-w-4xl mx-auto"
        >
          {/* Connecting Line */}
          <div
            className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pear via-tekhelet to-pear opacity-30"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <motion.li
              key={step.number}
              variants={timelineItem}
              className="relative pl-16 md:pl-24 pb-16 last:pb-0"
            >
              {/* Step Number Circle */}
              <div
                className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pear to-pear/70 flex items-center justify-center text-night font-bold text-xl md:text-2xl shadow-lg shadow-pear/30"
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Content Card */}
              <div className="relative bg-night/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-pear/30 transition-all duration-300">
                {/* Icon */}
                <span className="text-4xl mb-4 block" aria-hidden="true">
                  {step.icon}
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                  {t(step.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  {t(step.descriptionKey)}
                </p>

                {/* Decorative glow */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(221, 224, 0, 0.1) 0%, transparent 50%)`,
                  }}
                />
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* CTA at bottom */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60 text-sm md:text-base mb-6">
            Od pierwszego kontaktu do działającego rozwiązania w <strong className="text-pear">2 tygodnie</strong>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
