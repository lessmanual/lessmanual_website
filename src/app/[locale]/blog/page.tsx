import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { BackButton } from '@/components/ui/BackButton'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

/**
 * Blog Page
 *
 * Blog listing page displaying published blog posts from Supabase.
 *
 * Design Features:
 * - Clean layout with night background
 * - Responsive grid for blog posts
 * - Featured images with hover effects
 *
 * i18n:
 * - Supports PL/EN via next-intl
 * - Content columns: title_pl/title_en, description_pl/description_en
 * - Fallback to PL if EN not available
 *
 * @example
 * ```tsx
 * // Accessible at /pl/blog and /en/blog
 * ```
 */

// Helper to format date based on locale
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<React.ReactElement> {
  const { locale } = await params
  const t = await getTranslations('blog')

  // Fetch blog posts from Supabase
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title_pl, title_en, description_pl, description_en, featured_image, published_at, reading_time_minutes')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const posts = data as BlogPost[] | null

  if (error) {
    console.error('Error fetching blog posts:', error)
  }

  // Transform posts with i18n support
  const blogPosts = (posts || []).map((post) => ({
    slug: post.slug,
    title: locale === 'en' && post.title_en ? post.title_en : post.title_pl,
    description: locale === 'en' && post.description_en ? post.description_en : post.description_pl,
    date: post.published_at || '',
    dateDisplay: post.published_at ? formatDate(post.published_at, locale) : '',
    readTime: `${post.reading_time_minutes || 5} min ${locale === 'pl' ? 'czytania' : 'read'}`,
    image: post.featured_image || '/images/blog/default.webp',
  }))

  return (
    <div className="min-h-screen bg-night">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <BackButton />
          </div>

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
            {blogPosts.length === 0 ? (
              <p className="text-center text-white/50">
                {locale === 'pl' ? 'Brak artykułów.' : 'No articles yet.'}
              </p>
            ) : (
              blogPosts.map((post) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
