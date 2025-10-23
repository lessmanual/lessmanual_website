/**
 * Reusable Framer Motion Animation Variants
 *
 * Standardized animation presets for consistent motion across the app.
 * All animations are GPU-accelerated using transform properties.
 *
 * Performance Tips:
 * - Import only needed variants to reduce bundle size
 * - Animations respect prefers-reduced-motion media query
 * - Use with motion.div variants prop for best performance
 *
 * @example
 * ```tsx
 * import { fadeInUp, staggerContainer } from '@/lib/animations'
 *
 * <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.div variants={fadeInUp}>Child 1</motion.div>
 *   <motion.div variants={fadeInUp}>Child 2</motion.div>
 * </motion.div>
 * ```
 *
 * @see {@link https://www.framer.com/motion} - Framer Motion docs
 */

import { Variants } from 'framer-motion'

/**
 * Fade in with upward movement (0.6s)
 * Common for content reveals, card entries
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Simple fade in animation (0.5s)
 * Use for subtle reveals without movement
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

/**
 * Slide in from left with fade (0.6s)
 * Common for side navigation, mobile menus
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Slide in from right with fade (0.6s)
 * Common for side panels, notifications
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Scale up from 0.8 with fade (0.5s)
 * Common for modals, popups, cards
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

/**
 * Container variant for staggered children animations
 * Children animate with 0.1s delay between each
 *
 * @example
 * ```tsx
 * <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.div variants={fadeInUp}>Item 1</motion.div>
 *   <motion.div variants={fadeInUp}>Item 2</motion.div>
 * </motion.div>
 * ```
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

/**
 * 3D card tilt effect with scale on hover
 * GPU-accelerated using transform properties
 *
 * @example
 * ```tsx
 * <motion.div initial="rest" whileHover="hover" variants={cardTilt}>
 *   Card content
 * </motion.div>
 * ```
 */
export const cardTilt = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Advanced 3D product showcase animation (0.8s)
 * GPU-optimized with perspective and rotation
 *
 * Includes:
 * - Scale up from 0.8
 * - Y-axis rotation from -30° to 0°
 * - Z-depth movement for parallax effect
 * - Custom cubic-bezier easing for smooth 3D motion
 *
 * @example
 * ```tsx
 * <motion.div
 *   variants={product3D}
 *   initial="hidden"
 *   whileInView="visible"
 *   style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
 * >
 *   <ProductCard />
 * </motion.div>
 * ```
 */
export const product3D: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateY: -30,
    z: -50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    z: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95], // Custom easing for smooth 3D
      // Use transform properties for GPU acceleration
      transformPerspective: 1000,
    },
  },
}

/**
 * Parallax scroll animation variant (instant)
 * Use with useScroll and useTransform for smooth parallax effects
 *
 * @param {number} custom - Y offset calculated from scroll progress
 *
 * @example
 * ```tsx
 * const y = useTransform(scrollYProgress, [0, 1], [0, -100])
 *
 * <motion.div
 *   variants={parallaxVariant}
 *   animate="animate"
 *   custom={y}
 * >
 *   Parallax content
 * </motion.div>
 * ```
 */
export const parallaxVariant = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom,
    transition: {
      duration: 0,
    },
  }),
}

/**
 * Stagger container for 3D cards
 * Children animate with 0.15s delay, starts after 0.3s
 *
 * Use with product3D or cardTilt variants
 */
export const stagger3DCards: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

/**
 * Expandable card animation (0.4s)
 * Smooth height expansion with custom easing
 *
 * Common for accordion items, expandable sections
 */
export const expandableCard: Variants = {
  collapsed: {
    height: 'auto',
    opacity: 1,
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
}

/**
 * Timeline item reveal animation (0.6s)
 * Slide in from left with scale effect
 *
 * Common for step-by-step sections, process timelines
 */
export const timelineItem: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

/**
 * Get animation configuration respecting user motion preferences
 *
 * Disables animations if user has prefers-reduced-motion enabled (accessibility).
 * Recommended to call at app root to globally respect motion preferences.
 *
 * @returns {Object} Animation config with instant transitions if reduced motion is preferred
 *
 * @example
 * ```tsx
 * const animConfig = getAnimationConfig()
 *
 * <motion.div
 *   variants={fadeInUp}
 *   initial="hidden"
 *   animate="visible"
 *   {...animConfig}
 * >
 *   Content
 * </motion.div>
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion} - prefers-reduced-motion docs
 */
export const getAnimationConfig = () => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return {
      transition: prefersReducedMotion ? { duration: 0 } : undefined,
    }
  }
  return {}
}
