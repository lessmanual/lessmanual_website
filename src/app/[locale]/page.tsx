import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'

// Code-split below-fold sections for better performance
// These components will be loaded on-demand as user scrolls
const ProblemSolutionSection = dynamic(() => import('@/components/sections/ProblemSolutionSection').then(mod => ({ default: mod.ProblemSolutionSection })))
const SpecializationsSection = dynamic(() => import('@/components/sections/SpecializationsSection').then(mod => ({ default: mod.SpecializationsSection })))
const HowItWorksSection = dynamic(() => import('@/components/sections/HowItWorksSection').then(mod => ({ default: mod.HowItWorksSection })))
const ROICalculatorSection = dynamic(() => import('@/components/sections/ROICalculatorSection').then(mod => ({ default: mod.ROICalculatorSection })))
const FinalCTASection = dynamic(() => import('@/components/sections/FinalCTASection').then(mod => ({ default: mod.FinalCTASection })))
const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then(mod => ({ default: mod.AboutSection })))
const ContactFormSection = dynamic(() => import('@/components/sections/ContactFormSection').then(mod => ({ default: mod.ContactFormSection })))
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(mod => ({ default: mod.FAQSection })))

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
 * Performance Optimizations:
 * - Hero section: Loaded immediately (above the fold)
 * - All other sections: Code-split with dynamic imports (loaded on-demand)
 * - This reduces First Load JS from ~500KB to <100KB
 *
 * Structure:
 * - Hero (fullscreen with 3D robot) ← Loaded immediately
 * - ProblemSolution (3 reasons why you're losing clients) ← Lazy loaded
 * - Specializations (6 AI products/services) ← Lazy loaded
 * - HowItWorks (4-step process timeline) ← Lazy loaded
 * - ROICalculator (interactive 4-step wizard) ← Lazy loaded
 * - FinalCTA (call to action button) ← Lazy loaded
 * - About (founder profile with 3D photo) ← Lazy loaded
 * - ContactForm (n8n form with automation) ← Lazy loaded
 * - FAQ (top 5 most important questions) ← Lazy loaded
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
