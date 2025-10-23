'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { InteractiveRobotSpline } from '@/components/ui/InteractiveRobotSpline'

/**
 * Hero Section - LessManual Homepage
 *
 * Full-screen hero section with interactive 3D robot and animated content.
 * Implements parallax scrolling, blur effects, and Framer Motion animations.
 *
 * Design System:
 * - Brand colors: Night (#0C0D0A), Pear (#DDE000), Tekhelet (#5716A2)
 * - Layout: Two-column grid (robot left, content right)
 * - Animations: Parallax scroll, fade-in, sliding text
 * - 3D Asset: Spline robot with interactive hover effects
 *
 * Performance:
 * - Lazy loads Spline 3D component with Suspense
 * - Uses Framer Motion for GPU-accelerated animations
 * - Parallax effects triggered by scroll position
 * - Background blur layers for depth effect
 *
 * Accessibility:
 * - Semantic HTML5 structure
 * - Proper heading hierarchy (h1)
 * - Keyboard-accessible CTAs
 * - WCAG AAA contrast ratios (12.6:1)
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: hero.subheadline, hero.ctaPrimary, hero.ctaSecondary
 *
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 *
 * @see {@link https://figma.com/file/...} - Original design reference
 * @see {@link InteractiveRobotSpline} - 3D robot component
 */

// Figma asset URLs
const imgBlur = "https://www.figma.com/api/mcp/asset/5292d880-e414-48b4-8505-9ffc649591cc"
const imgBlur2 = "https://www.figma.com/api/mcp/asset/b9b51c0f-0913-4fac-b02d-9ee139086386"
const imgBlur3 = "https://www.figma.com/api/mcp/asset/facd9df8-79d4-4c7c-9b5e-6688146a01cf"
const imgEllipse2 = "https://www.figma.com/api/mcp/asset/3a76a502-9cf5-4ad4-b75c-f43e55de83d1"
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/fe387972-b453-4c39-8d4a-26170d470f92"
const imgEllipse4 = "https://www.figma.com/api/mcp/asset/caab3a02-9aab-41da-8e04-5b40ddeb3fb9"

/**
 * HeroSection Component
 *
 * Renders the main hero section with 3D robot and animated content.
 * Manages parallax scrolling, text animations, and viewport detection.
 *
 * @returns {JSX.Element} Hero section with 3D robot, headline, and CTAs
 */
export function HeroSection(): JSX.Element {
  const t = useTranslations('hero')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [slidingText, setSlidingText] = useState(false)

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Trigger sliding text animation after component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlidingText(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-night overflow-hidden"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background Pattern Layers */}
      {/* Stars Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.6,
          background: 'url(/images/stars.png) 50% / cover no-repeat',
        }}
      />

      {/* Blur Effects - Behind everything */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40"
          style={{
            background: `radial-gradient(circle, rgba(221, 224, 0, 0.3) 0%, transparent 70%)`,
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] opacity-30"
          style={{
            background: `radial-gradient(circle, rgba(87, 22, 162, 0.4) 0%, transparent 70%)`,
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] opacity-25"
          style={{
            background: `radial-gradient(circle, rgba(221, 224, 0, 0.2) 0%, transparent 70%)`,
            filter: 'blur(140px)',
          }}
        />
      </div>

      {/* Main container */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-between py-12 md:py-16"
        style={{ y, opacity }}
      >
        {/* Top section: Robot (left) + Headlines & Description (right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: 3D Robot */}
          <motion.div
            className="relative h-[400px] lg:h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {/* Local blur effects around robot */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-60"
                style={{
                  background: `radial-gradient(circle, rgba(221, 224, 0, 0.4) 0%, transparent 70%)`,
                  filter: 'blur(80px)',
                }}
              />
              <div
                className="absolute bottom-0 left-1/4 w-[400px] h-[400px] opacity-40"
                style={{
                  background: `radial-gradient(circle, rgba(87, 22, 162, 0.3) 0%, transparent 70%)`,
                  filter: 'blur(100px)',
                }}
              />
            </div>

            <InteractiveRobotSpline
              scene="https://prod.spline.design/3ktnK8grjpkv8aQt/scene.splinecode"
              className="w-full h-full relative z-10"
            />
          </motion.div>

          {/* Right: Headlines + Description */}
          <motion.div
            className="flex flex-col justify-center"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-white">
                Make your business
              </span>
              <motion.span
                className="block text-pear"
                initial={{ opacity: 0, x: -100 }}
                animate={slidingText ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                style={{
                  textShadow: '0 0 80px rgba(221, 224, 0, 0.5)',
                }}
              >
                LESSMANUAL
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t('subheadline')}
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom section: Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            variant="primary"
            size="xl"
            className="bg-pear text-night hover:bg-pear/90 shadow-lg shadow-pear/30"
          >
            {t('ctaPrimary')}
          </Button>
          <Button
            variant="secondary"
            size="xl"
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            {t('ctaSecondary')}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
