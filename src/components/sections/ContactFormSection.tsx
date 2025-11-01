'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * Contact Form Section - n8n Form Integration
 *
 * Embedded n8n form trigger with custom styling.
 * Form handles: Supabase storage, Notion CRM, Email/Voice Agent automation.
 *
 * Design Features:
 * - iframe with n8n form (custom styled in workflow)
 * - Responsive height adjustment
 * - Seamless integration with page design
 * - Brand colors: night background, pear accents
 *
 * Accessibility:
 * - Section landmark with proper heading
 * - iframe title for screen readers
 * - Keyboard navigation support
 *
 * Performance:
 * - Lazy render with useInView
 * - iframe lazy loading
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Different n8n forms per language
 * - Translation keys: contact.headline, contact.subheadline
 *
 * @example
 * ```tsx
 * <ContactFormSection />
 * ```
 *
 * @returns {React.ReactElement} Contact form section with n8n iframe
 *
 * @see {@link @/lib/animations} - Animation variants
 */
export function ContactFormSection(): React.ReactElement {
  const t = useTranslations('contact')
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // n8n form URLs (from workflow Form Trigger)
  const formUrl = locale === 'en'
    ? 'https://n8n.lessmanual.cloud/form/12k3-jk4j-13j5-hk4b-h345-38kktp2098d6s'
    : 'https://n8n.lessmanual.cloud/form/129a3a05-e0ac-40b6-8743-9d4d01732aff'

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-night py-12 lg:py-16"
      aria-labelledby="contact-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Floating stars */}
        {[
          { top: 10, left: 15 },
          { top: 20, left: 85 },
          { top: 35, left: 50 },
          { top: 60, left: 20 },
          { top: 75, left: 80 },
          { top: 85, left: 45 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-pear/50"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <motion.h2
              variants={fadeInUp}
              id="contact-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {t('headline')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-white/70"
            >
              {t('subheadline')}
            </motion.p>
          </motion.div>

          {/* n8n Form Iframe */}
          <motion.div
            variants={fadeInUp}
            className="relative w-full"
          >
            <iframe
              src={formUrl}
              title={t('iframeTitle')}
              className="w-full border-0 rounded-xl overflow-hidden"
              style={{
                minHeight: '1300px',
                background: 'transparent',
              }}
              loading="lazy"
              sandbox="allow-scripts allow-forms allow-same-origin"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
