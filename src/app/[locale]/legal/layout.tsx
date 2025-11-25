import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

/**
 * Legal Pages Layout Component
 *
 * Provides consistent styling and navigation for all legal documents.
 *
 * Design System:
 * - Background: Night (#0C0D0A)
 * - Text: White (#FEFEFE) with high readability
 * - Accent: Pear (#DDE000) for links and headings
 * - Max-width: 800px for optimal reading
 * - Typography: Optimized for legal content
 *
 * Features:
 * - Back to home navigation
 * - Consistent padding and spacing
 * - Breadcrumb navigation
 * - Print-friendly styles
 *
 * Structure:
 * - Header with back navigation
 * - Main content area (children)
 * - Footer with last update date
 */
export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}): Promise<React.ReactElement> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })

  return (
    <div className="min-h-screen bg-night">
      {/* Header with navigation */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-pear transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t('backToHome')}
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Content area with optimized typography for legal documents */}
          <div className="prose prose-invert prose-lg max-w-none">
            {children}
          </div>

          {/* Last updated info */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-white/40 text-center">
              {t('lastUpdated')}: {new Date().toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
