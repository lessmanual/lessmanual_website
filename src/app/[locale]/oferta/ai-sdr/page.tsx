import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { AiSdrHeroSection } from '@/components/sections/ai-sdr/AiSdrHeroSection'

// Code-split below-fold sections for better performance
const AiSdrMetricsBar = dynamic(() => import('@/components/sections/ai-sdr/AiSdrMetricsBar').then(mod => ({ default: mod.AiSdrMetricsBar })))
const AiSdrProblemSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrProblemSection').then(mod => ({ default: mod.AiSdrProblemSection })))
const AiSdrSolutionSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrSolutionSection').then(mod => ({ default: mod.AiSdrSolutionSection })))
const AiSdrTimelineSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrTimelineSection').then(mod => ({ default: mod.AiSdrTimelineSection })))
const AiSdrSocialProofSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrSocialProofSection').then(mod => ({ default: mod.AiSdrSocialProofSection })))
const AiSdrPricingSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrPricingSection').then(mod => ({ default: mod.AiSdrPricingSection })))
const AiSdrComparisonSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrComparisonSection').then(mod => ({ default: mod.AiSdrComparisonSection })))
const AiSdrGuaranteeSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrGuaranteeSection').then(mod => ({ default: mod.AiSdrGuaranteeSection })))
const AiSdrCalculatorSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrCalculatorSection').then(mod => ({ default: mod.AiSdrCalculatorSection })))
const AiSdrPersonasSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrPersonasSection').then(mod => ({ default: mod.AiSdrPersonasSection })))
const AiSdrFaqSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrFaqSection').then(mod => ({ default: mod.AiSdrFaqSection })))
const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then(mod => ({ default: mod.AboutSection })))
const AiSdrCtaSection = dynamic(() => import('@/components/sections/ai-sdr/AiSdrCtaSection').then(mod => ({ default: mod.AiSdrCtaSection })))

/**
 * AI SDR Landing Page - LessManual
 *
 * Dedicated landing page for the AI SDR as a Service product.
 * Showcases the automated B2B meeting booking system.
 *
 * Performance:
 * - Hero section loaded immediately (above the fold)
 * - All other sections code-split with dynamic imports
 *
 * SEO:
 * - Custom metadata for AI SDR keywords
 * - Structured content for search engines
 */

export const metadata: Metadata = {
  title: 'AI SDR — Spotkania z osobami decyzyjnymi | LessManual',
  description:
    'System AI umawiający kwalifikowane spotkania B2B. 73% wskaźnik otwarć. Zero stałych opłat. Płacisz za spotkanie z osobą decyzyjną z Twojego ICP.',
  openGraph: {
    title: 'AI SDR — Spotkania z osobami decyzyjnymi | LessManual',
    description:
      'System AI umawiający kwalifikowane spotkania B2B. 73% wskaźnik otwarć. Zero stałych opłat. Płacisz za spotkanie z osobą decyzyjną z Twojego ICP.',
    type: 'website',
  },
}

export default function AiSdrPage(): React.ReactElement {
  return (
    <main id="main-content">
      <AiSdrHeroSection />
      <AiSdrMetricsBar />
      <AiSdrProblemSection />
      <AiSdrSolutionSection />
      <AiSdrTimelineSection />
      <AiSdrSocialProofSection />
      <AiSdrPricingSection />
      <AiSdrComparisonSection />
      <AiSdrGuaranteeSection />
      <AiSdrCalculatorSection />
      <AiSdrPersonasSection />
      <AiSdrFaqSection />
      <AboutSection />
      <AiSdrCtaSection />
    </main>
  )
}
