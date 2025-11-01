import { useTranslations } from 'next-intl'

/**
 * Blog Page
 *
 * Blog listing page - placeholder for future blog posts.
 *
 * Design Features:
 * - Clean layout with night background
 * - Responsive grid for blog posts
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Translation keys: blog.*
 *
 * @example
 * ```tsx
 * // Accessible at /pl/blog and /en/blog
 * ```
 */

export default function BlogPage(): React.ReactElement {
  const t = useTranslations('blog')

  return (
    <div className="min-h-screen bg-night">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-5xl font-bold text-pear mb-4"
              style={{
                textShadow: '0 0 40px rgba(221, 224, 0, 0.3)',
              }}
            >
              {t('headline')}
            </h1>
            <p className="text-xl text-white/70">{t('subheadline')}</p>
          </div>

          {/* Placeholder Content */}
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <p className="text-xl text-white/60">{t('comingSoon')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
