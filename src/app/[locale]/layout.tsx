import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'
import { ChatProvider } from '@/contexts/ChatContext'
import { ChatWidget } from '@/components/chatbot/ChatWidget'
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
    default: 'LessManual - Make your business LESSMANUAL',
    template: '%s | LessManual',
  },
  description: 'Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas.',
  keywords: ['AI', 'automatyzacja', 'chatbot', 'voice agent', 'polska firma', 'SaaS'],
  authors: [{ name: 'LessManual' }],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://lessmanual.ai',
    siteName: 'LessManual',
    title: 'LessManual - Make your business LESSMANUAL',
    description: 'Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LessManual - Make Your Business LESSMANUAL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LessManual - Make your business LESSMANUAL',
    description: 'Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas.',
    images: ['/images/og-image.png'],
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
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        {/* Lighthouse recommendation: reduces DNS lookup + TLS handshake time */}
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicon configuration */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="LessManual" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload critical images for faster LCP */}
        <link
          rel="preload"
          href="/images/logo.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/robot-preview.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body className="bg-night text-white antialiased font-sans">
        <GoogleTagManager />
        <NextIntlClientProvider messages={messages}>
          <ChatProvider>
            <Header />
            {children}
            <Footer />
            <CookieBanner />
            <ScrollToTopButton />
            <ChatWidget />
          </ChatProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
