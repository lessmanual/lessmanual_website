import type { Metadata, Viewport } from 'next'
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
import { SpeedInsights } from '@vercel/speed-insights/next'
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
 * Generate root metadata with locale support
 * Includes canonical URLs and language alternates for proper SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    metadataBase: new URL('https://www.lessmanual.ai'),
    title: {
      default: 'LessManual - Make your business LESSMANUAL',
      template: '%s | LessManual',
    },
    description: 'Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas.',
    keywords: ['AI', 'automatyzacja', 'chatbot', 'voice agent', 'polska firma', 'SaaS'],
    authors: [{ name: 'LessManual' }],
    alternates: {
      canonical: `https://www.lessmanual.ai/${locale}`,
      languages: {
        pl: 'https://www.lessmanual.ai/pl',
        en: 'https://www.lessmanual.ai/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      url: `https://www.lessmanual.ai/${locale}`,
      siteName: 'LessManual',
      title: 'LessManual - Make your business LESSMANUAL',
      description: 'Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas.',
      images: [
        {
          url: 'https://www.lessmanual.ai/images/og-image.png',
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
      images: ['https://www.lessmanual.ai/images/og-image.png'],
    },
  }
}

/**
 * Viewport configuration for mobile responsiveness
 * Required for SEO 100 score in Lighthouse
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
        {/* CRITICAL: Static meta description for Lighthouse (before metadata streaming) */}
        <meta name="description" content="Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas." />

        {/* Preconnect to external domains for faster resource loading */}
        {/* Lighthouse recommendation: reduces DNS lookup + TLS handshake time */}
        {/* GTM preconnect removed - lazyOnload strategy loads GTM after page interactive */}
        {/* Unpkg preconnect removed - not used by browser, wastes ~150ms */}

        {/* Favicon configuration - PNG sizes first for Google Search */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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

        {/* Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'LessManual',
              url: 'https://lessmanual.ai',
              logo: 'https://lessmanual.ai/logo.png',
              description: 'Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas.',
              foundingDate: '2024',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PL',
              },
              sameAs: [
                // Add social media links here when available
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'LessManual',
              url: 'https://lessmanual.ai',
              description: 'Automatyzacja AI dla firm. Wdrażamy technologię, która zarabia pieniądze i oszczędza czas.',
              inLanguage: ['pl', 'en'],
            }),
          }}
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
        <SpeedInsights />
      </body>
    </html>
  )
}
