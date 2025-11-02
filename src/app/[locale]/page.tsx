import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { SpecializationsSection } from '@/components/sections/SpecializationsSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { ROICalculatorSection } from '@/components/sections/ROICalculatorSection'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { FAQSection } from '@/components/sections/FAQSection'

/**
 * Generate metadata for homepage
 * Supports both PL and EN locales with Open Graph and Twitter Card metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lessmanual.ai'
  const ogImage = `${siteUrl}/images/og-image.png` // Professional 1200x630px OG image

  return {
    title: t('home.title'),
    description: t('home.description'),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        pl: `${siteUrl}/pl`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      url: `${siteUrl}/${locale}`,
      siteName: 'LessManual',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t('home.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
      images: [ogImage],
    },
  }
}

/**
 * Homepage - LessManual.ai
 *
 * Main landing page with all main sections.
 * Note: Header is now in layout.tsx (consistent across all pages)
 *
 * Structure:
 * - Hero (fullscreen with 3D robot)
 * - ProblemSolution (3 reasons why you're losing clients)
 * - Specializations (6 AI products/services)
 * - HowItWorks (4-step process timeline)
 * - ROICalculator (interactive 4-step wizard)
 * - FinalCTA (call to action button)
 * - About (founder profile with 3D photo)
 * - ContactForm (n8n form with automation)
 * - FAQ (top 5 most important questions)
 *
 * @returns {React.ReactElement} Complete homepage
 */
export default function HomePage(): React.ReactElement {
  return (
    <main id="main-content">
      <HeroSection />
      <ProblemSolutionSection />
      <SpecializationsSection />
      <HowItWorksSection />
      <ROICalculatorSection />
      <FinalCTASection />
      <AboutSection />
      <ContactFormSection />
      <FAQSection />
    </main>
  )
}
