'use client'

import { useState, useEffect, useRef } from 'react'
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
 * - Proper tabindex management for mobile menu
 *
 * Performance:
 * - GPU-accelerated animations (transform, opacity)
 * - Scroll listener with useScroll hook
 * - Lazy load mobile menu (AnimatePresence)
 * - Pointer-events optimization (disabled when menu closed)
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
  const [mounted, setMounted] = useState(false)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Initial mount animation
  useEffect(() => {
    setMounted(true)
  }, [])

  // Detect scroll for background opacity change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        // Get header height for offset
        const headerHeight = 64 // Fixed header height

        // Calculate position - we want the element at the top of viewport minus header
        const targetPosition = target.getBoundingClientRect().top + window.scrollY
        const offsetPosition = targetPosition - headerHeight - 16 // 16px extra padding

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
    { href: `#${locale === 'en' ? 'contact' : 'kontakt'}`, label: t('contact'), isAnchor: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'bg-night/95 border-pear/50 shadow-lg shadow-pear/10'
          : 'bg-night/80 border-pear/30'
      } backdrop-blur-md ${
        mounted ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
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
              className="h-11 w-11 md:h-14 md:w-14 lg:h-16 lg:w-16"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleSmoothScroll}
                  className="relative text-sm font-medium text-white/70 transition-colors duration-200 hover:text-pear focus:outline-none focus:text-pear after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-pear after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-white/70 transition-colors duration-200 hover:text-pear focus:outline-none focus:text-pear after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-pear after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              )
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

        {/* Mobile Menu - SIMPLIFIED VERSION */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="lg:hidden"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
          <div className="border-t border-pear/30 bg-night/95 backdrop-blur-lg px-6 py-6 space-y-4 relative z-50">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleSmoothScroll}
                  className="block py-2 text-base font-medium text-white/70 hover:text-pear transition-colors focus:outline-none focus:text-pear"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-base font-medium text-white/70 hover:text-pear transition-colors focus:outline-none focus:text-pear"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}

            {/* Language Switcher (mobile) */}
            <div className="pt-4 border-t border-white/10">
              <LanguageSwitcher />
            </div>
          </div>
          </div>
        )}
      </nav>
    </header>
  )
}
