'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { motion } from 'framer-motion'

/**
 * Language Switcher Component
 *
 * Animated language toggle for PL/EN locales using flag emojis.
 * Implements smooth transitions with Framer Motion layoutId animation.
 *
 * Features:
 * - Flag-only display (🇵🇱/🇬🇧) - no text labels
 * - Animated background pill follows active locale
 * - Preserves current route when switching languages
 * - Backdrop blur glass-morphism effect
 * - Keyboard accessible (focus ring on pear)
 * - Spring animation with layoutId for smooth transitions
 *
 * i18n Integration:
 * - Uses next-intl navigation API (useRouter, usePathname, useParams)
 * - Automatically handles localePrefix: 'as-needed' (PL without prefix, EN with /en)
 * - Preserves pathname and query params when switching locale
 * - Configured locales: PL (default), EN
 *
 * Accessibility:
 * - ARIA labels with full language names
 * - ARIA current for active locale
 * - Focus indicators (pear ring)
 * - Semantic button elements
 *
 * Performance:
 * - Client component (interactive state)
 * - Uses Framer Motion for GPU-accelerated animations
 * - No re-render on hover (CSS only)
 *
 * @example
 * ```tsx
 * // In Navbar or Header
 * <LanguageSwitcher />
 * ```
 *
 * @returns {React.ReactElement} Language switcher with animated flag buttons
 *
 * @see {@link https://next-intl-docs.vercel.app} - next-intl documentation
 * @see {@link @/i18n/config} - Locale configuration
 */
export function LanguageSwitcher(): React.ReactElement {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return

    // Use next-intl router with locale parameter
    // This automatically handles localePrefix: 'as-needed'
    router.replace(
      // @ts-expect-error - params is typed as Record<string, string | string[]>
      { pathname, params },
      { locale: newLocale }
    )
  }

  return (
    <div className="relative inline-flex rounded-lg bg-night/50 p-1 backdrop-blur-sm border border-tekhelet/20">
      {locales.map((loc) => {
        const isActive = loc === locale

        return (
          <button
            key={loc}
            onClick={() => switchLanguage(loc)}
            className={`
              relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${isActive ? 'text-night' : 'text-white/70 hover:text-white'}
              focus:outline-none focus:ring-2 focus:ring-pear/50
            `}
            aria-label={`Switch to ${localeNames[loc]}`}
            aria-pressed={isActive}
          >
            {/* Active background */}
            {isActive && (
              <motion.div
                layoutId="activeLocale"
                className="absolute inset-0 bg-pear rounded-md"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center">
              <span aria-hidden="true">{localeFlags[loc]}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
