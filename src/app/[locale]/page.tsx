import { HeroSection } from '@/components/sections/HeroSection'
import { Specjalizacje } from '@/components/sections/Specjalizacje'
import { JakToDziala } from '@/components/sections/JakToDziala'
import { NasiKlienci } from '@/components/sections/NasiKlienci'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/ui/Footer'

/**
 * Homepage - LessManual.ai
 *
 * Main landing page with all marketing sections.
 * Fully responsive, animated, and accessible.
 *
 * Sections:
 * 1. Hero - 3D robot + headline + CTAs
 * 2. Specjalizacje - 3 expandable service cards
 * 3. Jak to działa - 4-step timeline
 * 4. Nasi Klienci - Client showcase grid
 * 5. FAQ - 5 expandable questions
 * 6. Footer - Links and legal
 *
 * Performance Target:
 * - Lighthouse Performance: 90+
 * - LCP: <1.5s
 * - 60fps animations
 *
 * @returns {JSX.Element} Complete homepage
 */
export default function HomePage(): JSX.Element {
  return (
    <>
      <main>
        <HeroSection />
        <Specjalizacje />
        <JakToDziala />
        <NasiKlienci />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
