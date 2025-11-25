import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

/**
 * Blog Page
 *
 * Blog listing page displaying published blog posts.
 *
 * Design Features:
 * - Clean layout with night background
 * - Responsive grid for blog posts
 * - Featured images with hover effects
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<React.ReactElement> {
  const { locale } = await params
  const t = await getTranslations('blog')

  // Blog posts data - in the future, this could come from a CMS or database
  const blogPosts = [
    {
      slug: 'jak-tworzyc-wyspecjalizowanych-asystentow-ai',
      title: 'Jak tworzyć wyspecjalizowanych asystentów AI?',
      description: 'Czyli parę słów o tym jak działają Projekty/Gemy w ChatGPT/Claude/Gemini.',
      date: '2025-11-04',
      dateDisplay: '4 listopada 2025',
      readTime: '8 min czytania',
      image: '/images/blog/jak-tworzyc-asystentow-ai/Zrzut_ekranu_2025-11-4_o_17.41.46.png',
    },
  ]

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

          {/* Blog Posts Grid */}
          <div className="space-y-12">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-pear/30 transition-all duration-300">
                  {/* Featured Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-white/50 text-sm mb-3">
                      <time dateTime={post.date}>{post.dateDisplay}</time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-pear transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-white/70 mb-4">{post.description}</p>

                    <span className="inline-flex items-center text-pear font-semibold group-hover:gap-2 transition-all">
                      {t('readMore')}
                      <span className="inline-block group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
