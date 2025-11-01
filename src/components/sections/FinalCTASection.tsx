'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeInUp } from '@/lib/animations'

/**
 * Final CTA Section - Call to action button after ROI Calculator
 *
 * Simple, centered CTA button encouraging users to book a free consultation.
 * Positioned between ROI Calculator and About sections.
 *
 * Design Features:
 * - Large pear-colored button with rounded corners
 * - Centered on dark (night) background
 * - Smooth scroll to contact form on click
 * - Hover effect with scale and glow
 * - Fade-in animation on scroll into view
 *
 * Accessibility:
 * - Semantic HTML (section, button)
 * - ARIA label for screen readers
 * - Keyboard navigation support
 * - High contrast (pear on night)
 * - Clear focus states
 *
 * Performance:
 * - Lazy render (useInView trigger)
 * - GPU-accelerated transforms
 * - Smooth scroll behavior
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation key: finalCta.button
 *
 * @example
 * ```tsx
 * <FinalCTASection />
 * ```
 *
 * @returns {JSX.Element} Final CTA section with consultation button
 *
 * @see {@link @/lib/animations} - Animation variants
 */
export function FinalCTASection(): React.ReactElement {
  const t = useTranslations('finalCta')
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-night py-20 lg:py-28"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex justify-center"
        >
          <motion.button
            onClick={handleScrollToContact}
            className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-night bg-pear rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pear/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t('aria.buttonLabel')}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-pear via-white to-pear opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

            {/* Button text */}
            <span className="relative z-10">{t('button')}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
