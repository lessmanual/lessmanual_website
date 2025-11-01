'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ProblemCard } from '@/components/ui/ProblemCard'
import { staggerContainer } from '@/lib/animations'

/**
 * Problem/Solution Section - LessManual Homepage
 *
 * Bento Grid layout showcasing 3 main pain points and solutions.
 * One column per specialization (Customer Service, Sales, Marketing).
 *
 * Design Features:
 * - 3-column grid on desktop (Bento Grid)
 * - Single column stack on mobile
 * - Problem cards: dark with red accents
 * - Solution cards: light with pear glow
 * - Scroll-triggered stagger animation
 * - Emotional contrast (pain → relief)
 *
 * Pain Points (from pain_points.md):
 * 1. Customer Service: Lost clients after hours (20k PLN/month)
 * 2. Sales: Cold outreach hell (200 emails → 0 clients)
 * 3. Marketing: LinkedIn invisibility (47 views)
 *
 * Accessibility:
 * - Semantic HTML (section, h2)
 * - WCAG AAA contrast
 * - Keyboard navigation
 * - Screen reader friendly
 *
 * Performance:
 * - Lazy render (useInView trigger)
 * - GPU-accelerated animations
 * - Optimized stagger timing
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: problemSolution.*
 *
 * @example
 * ```tsx
 * <ProblemSolutionSection />
 * ```
 *
 * @returns {React.ReactElement} Problem/Solution section with 3 cards
 */
export function ProblemSolutionSection(): React.ReactElement {
  const t = useTranslations('problemSolution')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 bg-night overflow-hidden"
      aria-labelledby="problem-solution-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(221,224,0,0.1) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="problem-solution-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t('headline')}
          </h2>
          <p className="text-xl md:text-2xl text-red-300 font-semibold">
            {t('subheadline')}
          </p>
        </motion.div>

        {/* Bento Grid - 3 columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Card 1: Customer Service */}
          <ProblemCard
            title={t('customerService.title')}
            problemHeadline={t('customerService.problem.headline')}
            problemStats={t('customerService.problem.stats')}
            solutionHeadline={t('customerService.solution.headline')}
            solutionDescription={t('customerService.solution.description')}
            ctaText={t('customerService.cta')}
            problemImage="/images/problem-solution/CS problem.webp"
            solutionImage="/images/problem-solution/CS solution.webp"
          />

          {/* Card 2: Sales */}
          <ProblemCard
            title={t('sales.title')}
            problemHeadline={t('sales.problem.headline')}
            problemStats={t('sales.problem.stats')}
            solutionHeadline={t('sales.solution.headline')}
            solutionDescription={t('sales.solution.description')}
            ctaText={t('sales.cta')}
            problemImage="/images/problem-solution/sales problem.webp"
            solutionImage="/images/problem-solution/sales solution.webp"
          />

          {/* Card 3: Marketing */}
          <ProblemCard
            title={t('marketing.title')}
            problemHeadline={t('marketing.problem.headline')}
            problemStats={t('marketing.problem.stats')}
            solutionHeadline={t('marketing.solution.headline')}
            solutionDescription={t('marketing.solution.description')}
            ctaText={t('marketing.cta')}
            problemImage="/images/problem-solution/marketing problem.webp"
            solutionImage="/images/problem-solution/marketing solution.webp"
          />
        </motion.div>
      </div>
    </section>
  )
}
