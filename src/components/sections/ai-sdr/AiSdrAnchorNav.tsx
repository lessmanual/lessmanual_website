'use client'

import React, { useState, useEffect, useCallback } from 'react'

/**
 * AI SDR Anchor Navigation
 *
 * Sticky mini-nav that appears after scrolling past the hero section.
 * Links to key page sections for quick navigation.
 * Highlights the currently visible section.
 *
 * @returns {React.ReactElement} Anchor navigation bar
 */

const NAV_ITEMS = [
  { label: 'Jak działa', href: '#solution' },
  { label: 'Wyniki', href: '#wyniki' },
  { label: 'Cennik', href: '#cennik' },
  { label: 'FAQ', href: '#faq' },
] as const

export function AiSdrAnchorNav(): React.ReactElement {
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const handleScroll = useCallback(() => {
    // Show after scrolling past hero (~80vh)
    setVisible(window.scrollY > window.innerHeight * 0.8)

    // Determine active section based on scroll position
    const sections = NAV_ITEMS.map((item) => item.href.slice(1))
    let current = ''

    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) {
        const rect = el.getBoundingClientRect()
        // Section is "active" when its top is within the upper 40% of viewport
        if (rect.top <= window.innerHeight * 0.4) {
          current = id
        }
      }
    }

    setActiveSection(current)
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.getElementById(href.slice(1))
    if (el) {
      const headerOffset = 120 // account for fixed header + this nav
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (!visible) return <></>

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-night/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Nawigacja sekcji">
        <ul className="flex items-center justify-center gap-1 sm:gap-2 py-2.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`
                    px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-pear/15 text-pear border border-pear/30'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
                    }
                  `}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
