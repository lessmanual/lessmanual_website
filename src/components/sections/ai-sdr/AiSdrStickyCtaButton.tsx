'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Sticky CTA Button
 *
 * Floating "Umów konsultację" button that appears after scrolling
 * past the hero section. Fixed to bottom-right on desktop,
 * bottom-center on mobile.
 *
 * @returns {React.ReactElement} Sticky CTA button
 */

const CAL_URL = 'https://cal.com/bart%C5%82omiej-chudzik-2en6pt'

export function AiSdrStickyCtaButton(): React.ReactElement {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~80% of viewport height (past hero)
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 z-50 hidden md:block"
        >
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pear text-night font-bold text-sm px-6 py-3 rounded-full shadow-xl shadow-pear/30 hover:bg-pear/90 hover:shadow-pear/50 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Umów konsultację
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
