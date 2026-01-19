import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/supabase'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

/**
 * Dynamic Blog Post Page
 *
 * Fetches article content from Supabase by slug.
 * Supports PL/EN with fallback to PL.
 *
 * Content is stored as HTML in Supabase and rendered with prose styling.
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

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  const { data } = await supabase
    .from('blog_posts')
    .select('title_pl, title_en, description_pl, description_en, meta_description_pl, meta_description_en, featured_image')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  const post = data as BlogPost | null

  if (!post) {
    return {
      title: 'Article Not Found | LessManual',
    }
  }

  const title = locale === 'en' && post.title_en ? post.title_en : post.title_pl
  const description = locale === 'en' && post.meta_description_en
    ? post.meta_description_en
    : (post.meta_description_pl || post.description_pl)

  return {
    title: `${title} | LessManual Blog`,
    description: description,
    openGraph: {
      title: title,
      description: description || '',
      images: post.featured_image ? [{
        url: post.featured_image,
        width: 1200,
        height: 630,
        alt: title,
      }] : [],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<React.ReactElement> {
  const { locale, slug } = await params

  // Fetch article from Supabase
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  const post = data as BlogPost | null

  if (error || !post) {
    notFound()
  }

  // Get localized content with fallback to PL
  const title = locale === 'en' && post.title_en ? post.title_en : post.title_pl
  const description = locale === 'en' && post.description_en ? post.description_en : post.description_pl
  const content = locale === 'en' && post.content_en ? post.content_en : post.content_pl

  const dateDisplay = post.published_at ? formatDate(post.published_at, locale) : ''
  const readTimeText = locale === 'pl' ? 'min czytania' : 'min read'
  const backText = locale === 'pl' ? '← Powrót do bloga' : '← Back to blog'

  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'pl' ? 'Strona główna' : 'Home',
        item: `https://www.lessmanual.ai/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `https://www.lessmanual.ai/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `https://www.lessmanual.ai/${locale}/blog/${slug}`,
      },
    ],
  }

  // Article Schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description || '',
    image: post.featured_image || 'https://www.lessmanual.ai/images/og-image.png',
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      '@type': 'Person',
      name: 'Bartłomiej Chudzik',
      url: 'https://www.lessmanual.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LessManual',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.lessmanual.ai/images/logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.lessmanual.ai/${locale}/blog/${slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-night">
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-pear hover:text-pear/80 transition-colors mb-8"
          >
            {backText}
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-white/70 mb-6">
                {description}
              </p>
            )}
            <div className="flex items-center gap-4 text-white/50 text-sm">
              {post.published_at && (
                <time dateTime={post.published_at}>{dateDisplay}</time>
              )}
              <span>•</span>
              <span>{post.reading_time_minutes || 5} {readTimeText}</span>
            </div>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="my-8 rounded-lg overflow-hidden border border-white/10">
              <Image
                src={post.featured_image}
                alt={title}
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          {/* Content - rendered as HTML */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:text-pear prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-white/80 prose-p:mb-4
              prose-strong:text-white
              prose-a:text-pear prose-a:no-underline hover:prose-a:underline
              prose-ul:text-white/80 prose-ul:space-y-2
              prose-li:text-white/80
              prose-blockquote:border-pear prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg prose-blockquote:p-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CTA */}
          <div className="bg-gradient-to-r from-pear/10 to-tekhelet/10 border border-pear/30 rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              {locale === 'pl' ? 'Chcesz porozmawiać o automatyzacji?' : 'Want to talk about automation?'}
            </h2>
            <p className="text-white/80 mb-6">
              {locale === 'pl'
                ? 'Umów się na bezpłatną konsultację. 30 minut, zero zobowiązań.'
                : 'Schedule a free consultation. 30 minutes, no obligations.'}
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-pear hover:bg-pear/90 text-night font-bold px-6 py-3 rounded-lg transition-colors"
            >
              {locale === 'pl' ? '→ Umów rozmowę' : '→ Book a call'}
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
