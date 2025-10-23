'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

/**
 * Footer Component - LessManual Website
 *
 * Global footer with company info, product links, legal links, and social media.
 * Displayed at the bottom of every page.
 *
 * Design System:
 * - Brand colors: Night (#0C0D0A), Pear (#DDE000), White (#FEFEFE)
 * - Layout: 4-column grid (desktop), stacked (mobile)
 * - Typography: Inter font family
 *
 * Structure:
 * - Column 1: Company name, tagline, social links
 * - Column 2: Products (ChatBot, Voice Agent, Custom AI)
 * - Column 3: Company (About, Blog, FAQ)
 * - Column 4: Legal (Privacy Policy, Terms of Service, Contact)
 *
 * Accessibility:
 * - Semantic HTML5 structure (footer, nav)
 * - Proper link markup with descriptive text
 * - Focus indicators on interactive elements
 * - WCAG AAA contrast ratios
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: footer.*
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @returns {JSX.Element} Global footer component
 */
export function Footer(): JSX.Element {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-night border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-pear mb-2">
              {t('company')}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {t('tagline')}
            </p>
            {/* Social Links (placeholder) */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pear transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-pear transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <nav aria-label="Products">
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('products')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/produkty/chatbot"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('chatbot')}
                </Link>
              </li>
              <li>
                <Link
                  href="/produkty/voiceagent"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('voiceAgent')}
                </Link>
              </li>
              <li>
                <Link
                  href="/produkty/custom"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('customAI')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Company */}
          <nav aria-label="Company">
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('company_section')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/o-nas"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('faq_link')}
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: Legal */}
          <nav aria-label="Legal">
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-pear transition-colors duration-300 text-sm"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-center text-sm text-white/50">
            © {currentYear} {t('company')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}
