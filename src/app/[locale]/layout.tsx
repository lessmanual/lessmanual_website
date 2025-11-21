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
      default: locale === 'pl'
        ? 'Automatyzacja AI dla Firm - Agenci AI, ChatBoty, Automatyzacja Biznesu | LessManual'
        : 'AI Automation for Business - AI Agents, ChatBots, Business Automation | LessManual',
      template: '%s | LessManual',
    },
    description: locale === 'pl'
      ? 'Wdrażamy automatyzację AI i agentów AI dla polskich firm. ChatBot 24/7, Voice Agent, automatyzacja sprzedaży i obsługi klienta. ROI już od 2 miesięcy. Wdrożenie w 7 dni.'
      : 'We implement AI automation and AI agents for Polish businesses. ChatBot 24/7, Voice Agent, sales and customer service automation. ROI from 2 months. Implementation in 7 days.',
    keywords: locale === 'pl'
      ? [
          'automatyzacja AI',
          'agenci AI',
          'automatyzacja biznesu',
          'AI dla firm',
          'chatbot dla firm',
          'automatyzacja obsługi klienta',
          'automatyzacja sprzedaży AI',
          'voice agent',
          'chatbot 24/7',
          'RAG chatbot',
          'automatyzacja marketingu',
          'AI agent głosowy',
          'wdrożenie AI',
          'chatbot polska',
          'automatyzacja procesów biznesowych'
        ]
      : [
          'AI automation',
          'AI agents',
          'business automation',
          'AI for business',
          'chatbot for companies',
          'customer service automation',
          'sales automation AI',
          'voice agent',
          'chatbot 24/7',
          'RAG chatbot',
          'marketing automation',
          'AI voice agent',
          'AI implementation',
          'chatbot Poland',
          'business process automation'
        ],
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
      title: locale === 'pl'
        ? 'Automatyzacja AI dla Firm - ChatBoty, Agenci AI, Automatyzacja Biznesu | LessManual'
        : 'AI Automation for Business - ChatBots, AI Agents, Business Automation | LessManual',
      description: locale === 'pl'
        ? 'Wdrażamy automatyzację AI i agentów AI dla polskich firm. ChatBot 24/7, Voice Agent, automatyzacja sprzedaży i obsługi klienta. ROI już od 2 miesięcy. Wdrożenie w 7 dni.'
        : 'We implement AI automation and AI agents for Polish businesses. ChatBot 24/7, Voice Agent, sales and customer service automation. ROI from 2 months. Implementation in 7 days.',
      images: [
        {
          url: 'https://www.lessmanual.ai/images/og-image.png?v=2',
          width: 1200,
          height: 630,
          alt: 'LessManual - Make Your Business LESSMANUAL',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'pl'
        ? 'Automatyzacja AI dla Firm - ChatBoty, Agenci AI | LessManual'
        : 'AI Automation for Business - ChatBots, AI Agents | LessManual',
      description: locale === 'pl'
        ? 'Wdrażamy automatyzację AI i agentów AI dla polskich firm. ChatBot 24/7, Voice Agent, automatyzacja sprzedaży. ROI już od 2 miesięcy.'
        : 'We implement AI automation and AI agents for Polish businesses. ChatBot 24/7, Voice Agent, sales automation. ROI from 2 months.',
      images: ['https://www.lessmanual.ai/images/og-image.png?v=2'],
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
        <meta name="description" content={
          locale === 'pl'
            ? 'Wdrażamy automatyzację AI i agentów AI dla polskich firm. ChatBot 24/7, Voice Agent, automatyzacja sprzedaży i obsługi klienta. ROI już od 2 miesięcy. Wdrożenie w 7 dni.'
            : 'We implement AI automation and AI agents for Polish businesses. ChatBot 24/7, Voice Agent, sales and customer service automation. ROI from 2 months. Implementation in 7 days.'
        } />

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

        {/* Structured Data (JSON-LD) for SEO & AEO/GEO */}
        {/* Organization Schema - For brand identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'LessManual',
              legalName: 'LessManual - Automatyzacja AI dla Firm',
              url: 'https://www.lessmanual.ai',
              logo: 'https://www.lessmanual.ai/images/logo.webp',
              description: locale === 'pl'
                ? 'Wdrażamy automatyzację AI i agentów AI dla polskich firm. Specjalizujemy się w ChatBotach 24/7, Voice Agentach, automatyzacji sprzedaży i obsługi klienta.'
                : 'We implement AI automation and AI agents for Polish businesses. We specialize in ChatBots 24/7, Voice Agents, sales and customer service automation.',
              foundingDate: '2024',
              slogan: locale === 'pl' ? 'Make Your Business LESSMANUAL' : 'Make Your Business LESSMANUAL',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'sales',
                email: 'kontakt@lessmanual.ai',
                availableLanguage: ['Polish', 'English'],
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PL',
              },
              sameAs: [
                // Add social media links when available
                'https://www.linkedin.com/company/lessmanual',
              ],
            }),
          }}
        />

        {/* WebSite Schema - For site-wide search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'LessManual',
              url: 'https://www.lessmanual.ai',
              description: locale === 'pl'
                ? 'Platforma automatyzacji AI dla polskich firm - ChatBoty, Voice Agenci, automatyzacja sprzedaży i marketingu.'
                : 'AI automation platform for Polish businesses - ChatBots, Voice Agents, sales and marketing automation.',
              inLanguage: ['pl-PL', 'en-US'],
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.lessmanual.ai/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Service Schema - For main offerings (AI agents visibility) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: locale === 'pl' ? 'Automatyzacja AI dla Firm' : 'AI Automation for Businesses',
              provider: {
                '@type': 'Organization',
                name: 'LessManual',
                url: 'https://www.lessmanual.ai',
              },
              areaServed: {
                '@type': 'Country',
                name: 'Poland',
              },
              description: locale === 'pl'
                ? 'Kompleksowe rozwiązania automatyzacji AI: ChatBot 24/7, Voice Agent, automatyzacja sprzedaży, obsługi klienta i marketingu. ROI już od 2 miesięcy, wdrożenie w 7 dni.'
                : 'Comprehensive AI automation solutions: ChatBot 24/7, Voice Agent, sales, customer service and marketing automation. ROI from 2 months, implementation in 7 days.',
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'PLN',
                availability: 'https://schema.org/InStock',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: locale === 'pl' ? 'Produkty AI' : 'AI Products',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: locale === 'pl' ? 'ChatBot 24/7 - Obsługa Klienta AI' : 'ChatBot 24/7 - AI Customer Support',
                      description: locale === 'pl'
                        ? 'Inteligentny chatbot odpowiadający na pytania klientów w czasie rzeczywistym - 24/7, w każdym kanale.'
                        : 'Intelligent chatbot answering customer questions in real-time - 24/7, on every channel.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: locale === 'pl' ? 'Agent Głosowy - Voice AI' : 'Voice Agent - Voice AI',
                      description: locale === 'pl'
                        ? 'Agent głosowy który brzmi jak człowiek, umawiający wizyty i obsługujący połączenia 24/7.'
                        : 'Voice agent that sounds like a human, scheduling appointments and handling calls 24/7.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: locale === 'pl' ? 'Automatyzacja Sprzedaży AI' : 'AI Sales Automation',
                      description: locale === 'pl'
                        ? 'Automatyczna sprzedaż B2B: pozyskiwanie leadów, personalizacja, umawianie spotkań.'
                        : 'Automated B2B sales: lead generation, personalization, appointment scheduling.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: locale === 'pl' ? 'Tworzenie Treści AI' : 'AI Content Creation',
                      description: locale === 'pl'
                        ? 'Automatyczne generowanie i publikacja treści do mediów społecznościowych i bloga.'
                        : 'Automated content generation and publishing for social media and blog.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: locale === 'pl' ? 'Asystent Wiedzy (RAG)' : 'Knowledge Assistant (RAG)',
                      description: locale === 'pl'
                        ? 'Prywatny ChatGPT trenowany na dokumentach firmy dla szybkiego dostępu do wiedzy.'
                        : 'Private ChatGPT trained on company documents for quick knowledge access.',
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* LocalBusiness Schema - For local visibility (Poland) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'LessManual',
              image: 'https://www.lessmanual.ai/images/logo.webp',
              '@id': 'https://www.lessmanual.ai',
              url: 'https://www.lessmanual.ai',
              telephone: '+48 XXX XXX XXX', // Replace with actual phone when available
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PL',
              },
              geo: {
                '@type': 'GeoCoordinates',
                addressCountry: 'PL',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday'
                ],
                opens: '09:00',
                closes: '18:00',
              },
              sameAs: [
                'https://www.linkedin.com/company/lessmanual',
              ],
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
