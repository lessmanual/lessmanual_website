'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

/**
 * Header Component - LessManual Website
 *
 * Fixed navigation header with logo, navigation links, and language switcher.
 * Includes mobile hamburger menu with slide-down animation.
 *
 * Design Features:
 * - Semi-transparent background with backdrop blur (glassmorphism)
 * - Changes opacity on scroll for better visibility
 * - Desktop: horizontal navigation
 * - Mobile: hamburger menu (< 1024px)
 * - Sticky positioning (fixed at top)
 *
 * Accessibility:
 * - Semantic HTML (header, nav)
 * - ARIA labels for mobile menu button
 * - Keyboard navigation support
 * - Focus indicators (pear ring)
 * - Skip to content link for screen readers
 *
 * Performance:
 * - GPU-accelerated animations (transform, opacity)
 * - Scroll listener with useScroll hook
 * - Lazy load mobile menu (AnimatePresence)
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: nav.about, nav.specializations, nav.roi, nav.contact
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * @returns {React.ReactElement} Fixed navigation header
 *
 * @see {@link LanguageSwitcher} - Language toggle component
 */
export function Header(): React.ReactElement {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // Detect scroll for background opacity change
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
    })
  }, [scrollY])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Prevent scroll when mobile menu open
  useEffect(() => {
    // Store original overflow value
    const originalOverflow = window.getComputedStyle(document.body).overflow

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    }

    // Cleanup: restore original overflow value
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mobileMenuOpen])

  // Focus management for mobile menu (accessibility)
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      // When menu opens, focus first focusable element
      const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    } else if (!mobileMenuOpen && toggleButtonRef.current) {
      // When menu closes, return focus to toggle button
      toggleButtonRef.current.focus()
    }
  }, [mobileMenuOpen])

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')

    // Only handle anchor links (starting with #)
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const headerOffset = 80 // Height of fixed header
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })

        // Close mobile menu if open
        setMobileMenuOpen(false)
      }
    }
  }

  const navLinks = [
    { href: '#specializations', label: t('specializations'), isAnchor: true },
    { href: '#how-it-works', label: t('howItWorks'), isAnchor: true },
    { href: '#kalkulator', label: t('roi'), isAnchor: true },
    { href: '#about', label: t('about'), isAnchor: true },
    { href: `/${locale}/blog`, label: t('blog'), isAnchor: false },
    { href: `/${locale}/faq`, label: t('faq'), isAnchor: false },
    { href: '#contact', label: t('contact'), isAnchor: true },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'bg-night/95 border-pear/50 shadow-lg shadow-pear/10'
          : 'bg-night/80 border-pear/30'
      } backdrop-blur-md`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Skip to content link (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-pear focus:text-night focus:rounded-md"
      >
        {t('skipToContent')}
      </a>

      <nav
        className="mx-auto max-w-7xl px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pear focus:ring-offset-2 focus:ring-offset-night rounded-md"
          >
            <Image
              src="/images/logo.webp"
              alt="LessManual Logo"
              width={65}
              height={65}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className="relative text-sm font-medium text-white/70 transition-colors duration-200 hover:text-pear focus:outline-none focus:text-pear after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-pear after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-pear"
            aria-label={t('toggleMenu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                // X icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="lg:hidden overflow-hidden"
          initial={false}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="border-t border-pear/30 bg-night/95 backdrop-blur-lg px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className="block py-2 text-base font-medium text-white/70 hover:text-pear transition-colors focus:outline-none focus:text-pear"
              >
                {link.label}
              </a>
            ))}

            {/* Language Switcher (mobile) */}
            <div className="pt-4 border-t border-white/10">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}
