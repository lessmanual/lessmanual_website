'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { fadeInUp } from '@/lib/animations'

/**
 * Props for ProblemCard component
 */
interface ProblemCardProps {
  /**
   * Card title (e.g., "Obsługa Klienta")
   */
  title: string
  /**
   * Problem headline (emotional scenario)
   */
  problemHeadline: string
  /**
   * Problem stats (numbers, losses)
   */
  problemStats: string
  /**
   * Solution headline (outcome-based)
   */
  solutionHeadline: string
  /**
   * Solution description
   */
  solutionDescription: string
  /**
   * CTA button text
   */
  ctaText: string
  /**
   * Problem background image path
   */
  problemImage?: string
  /**
   * Solution background image path
   */
  solutionImage?: string
}

/**
 * Problem Card Component
 *
 * Displays a problem/solution pair in vertical card layout.
 * Used in ProblemSolutionSection Bento Grid.
 *
 * Design Features:
 * - Problem: Dark background, red accent, heavy feeling
 * - Solution: Light background, pear glow, liberating
 * - Animated arrow separating problem/solution
 * - 3D hover effect (subtle tilt)
 * - Mobile-responsive (full width on small screens)
 *
 * Accessibility:
 * - Semantic HTML (section, article)
 * - WCAG AAA contrast ratios
 * - Keyboard navigation support
 * - Screen reader friendly
 *
 * @example
 * ```tsx
 * <ProblemCard
 *   title="Obsługa Klienta"
 *   problemHeadline="Sobota 21:37..."
 *   problemStats="20,000 PLN stracone"
 *   solutionHeadline="Odpowiedź w 2s, 24/7"
 *   solutionDescription="Nigdy więcej..."
 *   ctaText="Zazegnij problem"
 *   icon="📞"
 * />
 * ```
 */
export function ProblemCard({
  title,
  problemHeadline,
  problemStats,
  solutionHeadline,
  solutionDescription,
  ctaText,
  problemImage,
  solutionImage,
}: ProblemCardProps): React.ReactElement {
  return (
    <motion.article
      variants={fadeInUp}
      className="flex flex-col gap-4 h-full"
    >
      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {title}
        </h3>
      </div>

      {/* Problem Card */}
      <motion.div
        className="relative p-6 md:p-8 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/20 to-night shadow-[0_0_30px_rgba(239,68,68,0.1)] h-[350px] overflow-hidden"
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
      >
        {/* Background Image */}
        {problemImage && (
          <Image
            src={problemImage}
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          {/* Problem Headline */}
          <p className="text-base md:text-lg leading-relaxed mb-4 font-medium text-center" style={{ color: '#fefefe' }}>
            {problemHeadline}
          </p>

          {/* Problem Stats */}
          <div className="text-sm md:text-base text-red-300 font-semibold text-center">
            {problemStats}
          </div>
        </div>
      </motion.div>

      {/* Animated Arrow Divider */}
      <motion.div
        className="flex justify-center items-center py-2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          className="w-8 h-8 text-pear"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>

      {/* Solution Card */}
      <motion.div
        className="relative p-6 md:p-8 rounded-2xl border border-pear/40 bg-gradient-to-br from-pear/5 to-night shadow-[0_0_50px_rgba(221,224,0,0.15)] h-[350px] overflow-hidden"
        whileHover={{
          scale: 1.02,
          rotateX: -2,
          rotateY: -2,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-pear/10 blur-3xl rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Background Image */}
        {solutionImage && (
          <Image
            src={solutionImage}
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          {/* Solution Headline */}
          <p className="text-base md:text-lg leading-relaxed mb-3 font-semibold text-center" style={{ color: '#fefefe' }}>
            {solutionHeadline}
          </p>

          {/* Solution Description */}
          <p className="text-sm md:text-base mb-6 text-center" style={{ color: '#fefefe' }}>
            {solutionDescription}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="md"
              className="bg-pear text-night hover:bg-pear/90 w-full md:w-auto"
            >
              {ctaText} →
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
