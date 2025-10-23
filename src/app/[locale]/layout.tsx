import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { locales } from '@/i18n/config'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.home' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pl: '/pl',
        en: '/en',
      },
    },
  }
}

/**
 * Provides a locale-aware root layout that sets the document language, supplies translations to children, and renders a top-right language switcher.
 *
 * @param children - The page or application content to render inside the layout.
 * @param params - A promise resolving to an object with a `locale` string used to set the HTML `lang` attribute and select translations.
 * @returns The HTML layout element containing the internationalization provider, language switcher, and supplied children.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-night text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="fixed top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}