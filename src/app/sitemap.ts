import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

/**
 * Dynamic sitemap generation for LessManual.ai
 * Supports both Polish (pl) and English (en) locales
 * Includes dynamic blog posts from Supabase
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.lessmanual.ai'
  const currentDate = new Date()

  // Initialize Supabase client for fetching blog posts
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch published blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Define static routes with their priorities and update frequencies
  const routes = [
    {
      url: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/faq',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      url: '/blog',
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/oferta/ai-sdr',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/legal/polityka-prywatnosci',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      url: '/legal/polityka-cookies',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      url: '/legal/regulamin',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ]

  // Generate sitemap entries for both locales
  // pl (default) = no prefix, en = /en prefix
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Polish (default locale) - no prefix
  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}${route.url}`,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  })

  // English (non-default locale) - /en prefix
  routes.forEach((route) => {
    sitemapEntries.push({
      url: `${baseUrl}/en${route.url}`,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  })

  // Add blog posts to sitemap (both PL and EN)
  if (blogPosts && blogPosts.length > 0) {
    blogPosts.forEach((post) => {
      // Polish version
      sitemapEntries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
      // English version
      sitemapEntries.push({
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  }

  return sitemapEntries
}
