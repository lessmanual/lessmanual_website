import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { locales } from '@/i18n/config'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-night text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
