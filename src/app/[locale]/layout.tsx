import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import '@/styles/globals.css'

/**
 * Font configurations
 * - Inter: Body text (400-700 weights, latin + latin-ext for Polish)
 * - Sora: Headings (300 Light weight only)
 */
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  weight: '300',
  variable: '--font-sora',
  display: 'swap',
})

/**
 * Root metadata
 * Page-specific metadata should override these in page.tsx
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://lessmanual.ai'),
  title: {
    default: 'LessManual - AI + Automatyzacja dla polskich firm',
    template: '%s | LessManual',
  },
  description: 'Zautomatyzuj swoją firmę z AI. ChatBoty, Voice Agents, Automatyzacja procesów.',
  keywords: ['AI', 'automatyzacja', 'chatbot', 'voice agent', 'polska firma', 'SaaS'],
  authors: [{ name: 'LessManual' }],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://lessmanual.ai',
    siteName: 'LessManual',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

/**
 * Root Layout for [locale] route
 *
 * Features:
 * - Font loading (Inter body, Sora headings)
 * - NextIntl i18n provider for client components
 * - Global styles
 * - CSS custom properties for design tokens
 *
 * @param children - Page content
 * @param params - Route params containing locale
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}): Promise<React.ReactElement> {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Load messages for this locale
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-night text-white antialiased font-sans">
        <GoogleTagManager />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
