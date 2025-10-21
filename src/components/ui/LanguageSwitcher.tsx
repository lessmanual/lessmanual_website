'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { motion } from 'framer-motion'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return

    // Replace locale in pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
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
            aria-current={isActive ? 'true' : undefined}
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
