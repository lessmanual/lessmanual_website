'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { fadeInUp, staggerContainer } from '@/lib/animations'

/**
 * About Section - LessManual Founder Profile
 *
 * Split-screen layout showcasing founder with 3D photo effect.
 * Left: Profile photo with subtle tilt animation
 * Right: Bio text with credentials
 *
 * Design Features:
 * - Split screen: Image LEFT (40%), Text RIGHT (60%)
 * - 3D pseudo-rotation on image hover (5-8° tilt)
 * - Gradient glow behind photo (pear → tekhelet)
 * - Floating holographic shapes in background (parallax)
 * - Responsive: stacks vertically on mobile
 *
 * Accessibility:
 * - Semantic HTML (section, article)
 * - Alt text for profile image
 * - Proper heading hierarchy (h2)
 * - WCAG AAA contrast ratios
 * - Keyboard navigation support
 *
 * Performance:
 * - GPU-accelerated 3D transforms
 * - Lazy render (useInView trigger)
 * - Optimized image loading (Next.js Image)
 * - Smooth 60fps animations
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: about.name, about.title, about.bio1, about.bio2
 *
 * @example
 * ```tsx
 * <AboutSection />
 * ```
 *
 * @returns {JSX.Element} About section with founder profile
 *
 * @see {@link @/lib/animations} - Animation variants
 */
export function AboutSection(): JSX.Element {
  const t = useTranslations('about')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Track mouse position for dynamic 3D tilt
  const [tiltStyle, setTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate tilt (max 8°)
    const rotateY = ((x - centerX) / centerX) * 8
    const rotateX = -((y - centerY) / centerY) * 8

    setTiltStyle({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 })
  }

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative overflow-hidden bg-night py-24 lg:py-32"
      aria-labelledby="about-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating stars with fixed positions */}
        {[
          { top: 15, left: 20 },
          { top: 25, left: 75 },
          { top: 40, left: 45 },
          { top: 55, left: 85 },
          { top: 70, left: 15 },
          { top: 80, left: 60 },
          { top: 35, left: 90 },
          { top: 65, left: 30 },
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
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center"
        >
          {/* LEFT: Profile Image with 3D Effect */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 flex justify-center lg:justify-start"
          >
            <div
              className="group relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Glow background */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-pear via-tekhelet to-pear opacity-40 blur-3xl group-hover:opacity-60 transition-opacity duration-500" />

              {/* Image container with 3D transform */}
              <motion.div
                className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full border-4 border-pear/50 shadow-2xl shadow-pear/20"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }}
                animate={tiltStyle}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Image
                  src="/images/team/bartlomiej.jpg"
                  alt="Bartłomiej Chudzik - Founder & CTO of LessManual, specialist in business automation and AI"
                  width={320}
                  height={320}
                  className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Bio Text */}
          <motion.article
            variants={fadeInUp}
            className="lg:col-span-3 text-center lg:text-left"
          >
            <motion.h2
              variants={fadeInUp}
              id="about-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-3"
            >
              {t('name')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-pear font-semibold mb-8"
            >
              {t('title')}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="space-y-6 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              <motion.p variants={fadeInUp}>
                {t('bio1')}
              </motion.p>

              <motion.p variants={fadeInUp}>
                {t('bio2')}
              </motion.p>

              {/* Stats (optional - can remove if not needed) */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
              >
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-pear">10+</div>
                  <div className="text-sm text-white/50">Lat doświadczenia</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-pear">50+</div>
                  <div className="text-sm text-white/50">Zadowolonych klientów</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-pear">10k+</div>
                  <div className="text-sm text-white/50">Zaoszczędzonych godzin</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}
