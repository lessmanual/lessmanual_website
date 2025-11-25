'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

/**
 * Footer Component - LessManual.ai
 *
 * Main footer with navigation, legal links, contact info, and social media.
 *
 * Design System:
 * - Background: Night (#0C0D0A) with subtle pear/tekhelet blur effects
 * - Text: White (#FEFEFE) with pear (#DDE000) accents
 * - Layout: 4 columns on desktop → 2 on tablet → 1 on mobile
 * - Animations: Fade-in from bottom, link hover effects
 *
 * Structure:
 * 1. Main content section (4 columns):
 *    - Brand & tagline (with logo)
 *    - Products (AI services)
 *    - Company (about, blog, FAQ)
 *    - Contact (email, social, NIP)
 * 2. Legal links section (privacy, cookies, terms)
 * 3. Copyright section (© notice + language switcher)
 *
 * Accessibility:
 * - Semantic HTML5 structure (<footer>, <nav>)
 * - ARIA labels for social media links
 * - Keyboard navigation support
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
 */
export function Footer(): React.ReactElement {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('footer')

  const footerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  }

  const columnVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative bg-night overflow-hidden">
      {/* Background blur effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(221, 224, 0, 0.2) 0%, transparent 70%)`,
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] opacity-15"
          style={{
            background: `radial-gradient(circle, rgba(87, 22, 162, 0.2) 0%, transparent 70%)`,
            filter: 'blur(140px)',
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10"
        variants={footerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Top Section - 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Column 1: Brand & Tagline */}
          <motion.div variants={columnVariant}>
            <Link href="/" className="block mb-4">
              <h3
                className="text-2xl font-bold"
                style={{
                  color: '#DDE000',
                  textShadow: '0 0 40px rgba(221, 224, 0, 0.4)',
                }}
              >
                LessManual
              </h3>
            </Link>
            <p className="text-base text-white/80 mb-4 leading-relaxed">
              {t('tagline')}
            </p>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              {t('description')}
            </p>
            {/* Company details */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-white/60">
                {t('contact.nip')}: 1231589909
              </p>
              <p className="text-sm text-white/60">
                {t('contact.regon')}: 529368498
              </p>
            </div>
          </motion.div>

          {/* Column 2: Specializations */}
          <motion.div variants={columnVariant}>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-4 text-pear">
              {t('specializations.title')}
            </h4>
            <ul className="space-y-3">
              {[
                { key: 'customerSupport', href: '#specializations' },
                { key: 'contentCreation', href: '#specializations' },
                { key: 'salesAutomation', href: '#specializations' },
                { key: 'knowledgeAssistant', href: '#specializations' },
                { key: 'voiceAgent', href: '#specializations' },
                { key: 'customSolutions', href: '#specializations' },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-base text-white/80 hover:text-pear transition-colors duration-200"
                  >
                    {t(`specializations.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div variants={columnVariant}>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-4 text-pear">
              {t('company.title')}
            </h4>
            <ul className="space-y-3">
              {[
                { key: 'about', href: '#about' },
                { key: 'blog', href: '/blog' },
                { key: 'faq', href: '/faq' },
                { key: 'roi', href: '#kalkulator' },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-base text-white/80 hover:text-pear transition-colors duration-200"
                  >
                    {t(`company.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={columnVariant}>
            <h4 className="text-sm font-semibold tracking-wide uppercase mb-4 text-pear">
              {t('contact.title')}
            </h4>
            <ul className="space-y-3">
              {/* Email */}
              <li>
                <a
                  href="mailto:kontakt@lessmanual.ai"
                  className="text-base text-white/80 hover:text-pear transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t('contact.email')}
                </a>
              </li>

              {/* LinkedIn */}
              <li>
                <a
                  href="https://linkedin.com/company/lessmanual"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-white/80 hover:text-pear transition-colors duration-200 flex items-center gap-2"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
              </li>

              {/* Logo */}
              <li className="pt-4">
                <img
                  src="/images/logo.webp"
                  alt="LessManual Logo"
                  className="h-12 w-auto"
                />
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Legal Links Section */}
        <motion.div
          className="border-t border-white/10 pt-8 mb-8"
          variants={columnVariant}
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link
              href="/legal/polityka-prywatnosci"
              className="text-sm text-white/60 hover:text-pear transition-colors duration-200"
            >
              🔒 {t('legal.privacy')}
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/legal/polityka-cookies"
              className="text-sm text-white/60 hover:text-pear transition-colors duration-200"
            >
              🍪 {t('legal.cookies')}
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/legal/regulamin"
              className="text-sm text-white/60 hover:text-pear transition-colors duration-200"
            >
              📜 {t('legal.terms')}
            </Link>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="text-center text-sm text-white/50"
          variants={columnVariant}
        >
          <p>
            © {new Date().getFullYear()} LessManual. {t('copyright')}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
