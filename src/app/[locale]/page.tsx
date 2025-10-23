import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'

/**
 * Generate metadata for homepage
 * Supports both PL and EN locales
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('home.title'),
    description: t('home.description'),
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
 * Homepage - LessManual.ai
 *
 * Main landing page with header, hero, and about sections.
 *
 * Structure:
 * - Header (fixed navigation)
 * - Hero (fullscreen with 3D robot)
 * - About (founder profile with 3D photo)
 *
 * @returns {JSX.Element} Complete homepage
 */
export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
      </main>
    </>
  )
}
