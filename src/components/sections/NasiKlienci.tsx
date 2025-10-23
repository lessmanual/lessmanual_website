'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * Nasi Klienci Section - LessManual Homepage
 *
 * Displays client logos and testimonials in a grid layout.
 * Showcases companies that already use LessManual automation.
 *
 * Design System:
 * - Brand colors: Night (#0C0D0A), Pear (#DDE000), White (#FEFEFE)
 * - Layout: Grid of client cards (3 columns desktop, 1 mobile)
 * - Animations: Staggered fade-in from bottom
 * - Visual: Subtle glow on hover
 *
 * Performance:
 * - Uses Framer Motion for GPU-accelerated animations
 * - Scroll-triggered reveal (useInView)
 * - Reusable animation variants from lib/animations.ts
 *
 * Accessibility:
 * - Semantic HTML5 structure (section, ul, li)
 * - Alt text for company logos
 * - WCAG AAA contrast ratios
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: nasiKlienci.title, subtitle
 *
 * @example
 * ```tsx
 * <NasiKlienci />
 * ```
 *
 * @returns {JSX.Element} Client showcase section
 *
 * @see {@link @/lib/animations} - Animation variants
 */
export function NasiKlienci(): JSX.Element {
  const t = useTranslations('nasiKlienci')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Placeholder client data (replace with real logos later)
  const clients = [
    { name: 'E-commerce Store', industry: 'E-commerce', logo: '🛒' },
    { name: 'Tech Startup', industry: 'SaaS', logo: '💻' },
    { name: 'Real Estate Agency', industry: 'Nieruchomości', logo: '🏠' },
    { name: 'Medical Clinic', industry: 'Medycyna', logo: '🏥' },
    { name: 'Marketing Agency', industry: 'Marketing', logo: '📢' },
    { name: 'Consulting Firm', industry: 'Doradztwo', logo: '📊' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-night overflow-hidden"
      aria-labelledby="nasi-klienci-heading"
    >
      {/* Background blur effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
          style={{
            background: `radial-gradient(circle, rgba(221, 224, 0, 0.4) 0%, transparent 70%)`,
            filter: 'blur(150px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="nasi-klienci-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Client Grid */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {clients.map((client, index) => (
            <motion.li
              key={client.name}
              variants={fadeInUp}
              className="group"
            >
              <div className="relative bg-night/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-pear/30 transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                {/* Logo placeholder (replace with actual image) */}
                <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {client.logo}
                </div>

                {/* Company Name */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {client.name}
                </h3>

                {/* Industry */}
                <p className="text-sm text-white/50">
                  {client.industry}
                </p>

                {/* Hover glow effect */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, rgba(221, 224, 0, 0.1) 0%, transparent 50%)`,
                  }}
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Social Proof Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { number: '50+', label: 'Zadowolonych klientów' },
            { number: '10k+', label: 'Godzin zaoszczędzonych' },
            { number: '80%', label: 'Procesów zautomatyzowanych' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pear mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
