'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'

/**
 * Thank You Page - Contact Form Success
 *
 * Displayed after successful form submission via n8n.
 * Automatically tracks Facebook Pixel Lead event.
 *
 * Features:
 * - Clean, simple design matching brand
 * - Automatic FB Pixel Lead tracking on mount
 * - Thank you message + CTA back to homepage
 * - Responsive layout
 * - i18n support (PL/EN)
 *
 * URLs:
 * - Polish: /pl/thank-you
 * - English: /en/thank-you
 *
 * @example
 * n8n redirect after form submit: https://www.lessmanual.ai/pl/thank-you
 */
export default function ThankYouPage(): React.ReactElement {
  const t = useTranslations('thankYou')

  // Track Lead event on page load (form submitted successfully)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Contact Form Submission',
        source: 'thank_you_page',
        status: 'completed',
      })

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ FB Pixel: Lead event tracked (form submission)')
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-night flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Glow effect */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(circle, rgba(221, 224, 0, 0.4) 0%, transparent 70%)`,
                filter: 'blur(60px)',
              }}
            />

            {/* Check icon */}
            <div className="relative w-24 h-24 bg-pear/10 rounded-full flex items-center justify-center border-2 border-pear/30">
              <svg
                className="w-12 h-12 text-pear"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Thank you message */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          {t('title')}
        </h1>

        <p className="text-xl sm:text-2xl text-white/80 mb-4">
          {t('subtitle')}
        </p>

        <p className="text-base sm:text-lg text-white/60 mb-12 max-w-xl mx-auto">
          {t('description')}
        </p>

        {/* CTA back to homepage */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t('cta')}
            </Button>
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mt-16 text-white/40 text-sm">
          <p>{t('footer')}</p>
        </div>
      </div>
    </main>
  )
}

// TypeScript declaration for fbq
declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, any>) => void
  }
}
