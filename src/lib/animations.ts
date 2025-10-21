/**
 * Reusable Framer Motion animation variants
 * Use these instead of inline animations for consistency
 */

import { Variants } from 'framer-motion'

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

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// 3D card tilt effect with GPU acceleration
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

// Advanced 3D Product Showcase Animation (GPU-optimized)
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

// Parallax scroll animation hook variant
export const parallaxVariant = {
  initial: { y: 0 },
  animate: (custom: number) => ({
    y: custom,
    transition: {
      duration: 0,
    },
  }),
}

// Stagger animation for multiple 3D cards
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

// Expandable card animation (for Specjalizacje section)
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

// Timeline reveal animation (for Jak to działa section)
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

// Respect prefers-reduced-motion
export const getAnimationConfig = () => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return {
      transition: prefersReducedMotion ? { duration: 0 } : undefined,
    }
  }
  return {}
}
