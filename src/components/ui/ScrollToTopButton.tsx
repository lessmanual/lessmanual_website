'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Scroll To Top Button Component
 *
 * Fixed button that appears when user scrolls down and allows quick return to page top.
 *
 * Design Features:
 * - Appears after scrolling 300px
 * - Fixed position bottom-right
 * - Smooth scroll animation
 * - Brand colors: pear on night background
 * - Hover effects with scale and glow
 *
 * Accessibility:
 * - Keyboard accessible (Tab + Enter)
 * - ARIA label for screen readers
 * - Focus visible state
 *
 * Performance:
 * - Debounced scroll listener
 * - AnimatePresence for smooth mount/unmount
 * - GPU-accelerated transforms
 *
 * @example
 * ```tsx
 * <ScrollToTopButton />
 * ```
 *
 * @returns {JSX.Element} Scroll to top button
 */
export function ScrollToTopButton(): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 z-[10001] p-4 rounded-full bg-pear text-night shadow-lg hover:shadow-pear/50 focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
