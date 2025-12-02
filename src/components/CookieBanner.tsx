'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Cookie Banner Component - RODO/GDPR Compliant
 *
 * Displays cookie consent banner on first visit and manages consent preferences.
 *
 * Features:
 * - RODO/GDPR compliant (consent required before tracking)
 * - 3 consent levels: Accept All, Reject All, Customize
 * - localStorage persistence (12 months expiry)
 * - Respects user preferences
 * - Responsive design
 * - Accessibility compliant
 *
 * Cookie Categories:
 * - Essential: Always active (technical cookies)
 * - Analytics: Google Analytics, Vercel Analytics
 * - Marketing: (none currently, prepared for future)
 *
 * Integration:
 * - Updates window.gtag consent state
 * - Blocks GA4 script loading until consent
 *
 * @example
 * ```tsx
 * <CookieBanner />
 * ```
 */

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const CONSENT_EXPIRY_DAYS = 365 // 12 months
const STORAGE_KEY = 'lessmanual_cookie_consent'

export function CookieBanner(): React.ReactElement | null {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('cookies')
  const [showBanner, setShowBanner] = useState<boolean>(false)
  const [showCustomize, setShowCustomize] = useState<boolean>(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
  })

  // Check if consent is already given
  useEffect(() => {
    const storedConsent = localStorage.getItem(STORAGE_KEY)

    if (storedConsent) {
      try {
        const parsed: CookiePreferences = JSON.parse(storedConsent)
        const expiryTime = parsed.timestamp + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000

        // Check if consent is still valid
        if (Date.now() < expiryTime) {
          // Apply stored preferences
          applyConsent(parsed)
          return
        }
      } catch (error) {
        // Invalid stored data, show banner
        console.error('Invalid cookie consent data:', error)
      }
    }

    // No valid consent found, show banner
    setShowBanner(true)
  }, [])

  const applyConsent = (prefs: CookiePreferences) => {
    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
      })
    }

    // Update Facebook Pixel consent
    if (typeof window !== 'undefined' && window.fbq) {
      if (prefs.marketing) {
        // Grant consent - enable tracking
        window.fbq('consent', 'grant')
      } else {
        // Revoke consent - disable tracking
        window.fbq('consent', 'revoke')
      }
    }
  }

  const savePreferences = (prefs: CookiePreferences) => {
    prefs.timestamp = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    applyConsent(prefs)
    setShowBanner(false)
  }

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }
    savePreferences(prefs)
  }

  const handleRejectAll = () => {
    const prefs: CookiePreferences = {
      essential: true, // Can't reject essential cookies
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }
    savePreferences(prefs)
  }

  const handleSaveCustom = () => {
    savePreferences(preferences)
  }

  if (!showBanner) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-night/80 backdrop-blur-sm" />

        {/* Banner Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
          <div className="bg-night border border-pear/20 rounded-xl p-6 shadow-2xl max-w-4xl mx-auto">
            {!showCustomize ? (
              // Main Banner View
              <>
                <div className="flex items-start gap-4 mb-6">
                  {/* Cookie Icon */}
                  <div className="flex-shrink-0 text-4xl">🍪</div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-pear mb-2">
                      {t('title')}
                    </h3>
                    <p className="text-base text-white/80 leading-relaxed mb-4">
                      {t('description')}
                    </p>
                    <p className="text-sm text-white/60">
                      {t('moreInfo')}{' '}
                      <Link
                        href="/legal/polityka-cookies"
                        className="text-pear hover:underline"
                      >
                        {t('cookiePolicy')}
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-pear text-night font-semibold rounded-lg hover:bg-pear/90 transition-colors duration-200"
                  >
                    {t('acceptAll')}
                  </button>

                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    {t('rejectAll')}
                  </button>

                  <button
                    onClick={() => setShowCustomize(true)}
                    className="px-6 py-3 bg-transparent text-pear font-semibold rounded-lg border border-pear/40 hover:border-pear hover:bg-pear/10 transition-all duration-200"
                  >
                    {t('customize')}
                  </button>
                </div>
              </>
            ) : (
              // Customize View
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-pear mb-4">
                    {t('customizeTitle')}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">
                    {t('customizeDescription')}
                  </p>

                  {/* Cookie Categories */}
                  <div className="space-y-4">
                    {/* Essential Cookies (Always On) */}
                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {t('essential')}
                        </h4>
                        <p className="text-sm text-white/60">
                          {t('essentialDesc')}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <span className="text-sm text-white/40">
                          {t('alwaysActive')}
                        </span>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {t('analytics')}
                        </h4>
                        <p className="text-sm text-white/60">
                          {t('analyticsDesc')}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={preferences.analytics}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                analytics: e.target.checked,
                              })
                            }
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pear rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pear"></div>
                        </label>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {t('marketing')}
                        </h4>
                        <p className="text-sm text-white/60">
                          {t('marketingDesc')}
                        </p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={preferences.marketing}
                            onChange={(e) =>
                              setPreferences({
                                ...preferences,
                                marketing: e.target.checked,
                              })
                            }
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pear rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pear"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSaveCustom}
                    className="px-6 py-3 bg-pear text-night font-semibold rounded-lg hover:bg-pear/90 transition-colors duration-200"
                  >
                    {t('savePreferences')}
                  </button>

                  <button
                    onClick={() => setShowCustomize(false)}
                    className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200"
                  >
                    {t('back')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// TypeScript declaration for gtag and fbq
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: Record<string, string>
    ) => void
    fbq?: (action: string, event: string, params?: Record<string, any>) => void
  }
}
