import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'

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
