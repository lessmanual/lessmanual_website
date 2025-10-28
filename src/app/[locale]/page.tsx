import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { SpecializationsSection } from '@/components/sections/SpecializationsSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { ROICalculatorSection } from '@/components/sections/ROICalculatorSection'
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
 * - ProblemSolution (3 reasons why you're losing clients)
 * - Specializations (6 AI products/services)
 * - HowItWorks (4-step process timeline)
 * - ROICalculator (interactive 4-step wizard)
 * - About (founder profile with 3D photo)
 *
 * @returns {JSX.Element} Complete homepage
 */
export default function HomePage(): React.ReactElement {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProblemSolutionSection />
        <SpecializationsSection />
        <HowItWorksSection />
        <ROICalculatorSection />
        <AboutSection />
      </main>
    </>
  )
}
