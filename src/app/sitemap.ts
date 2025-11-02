import { MetadataRoute } from 'next'

/**
 * Dynamic sitemap generation for LessManual.ai
 * Supports both Polish (pl) and English (en) locales
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lessmanual.ai'
  const currentDate = new Date()

  // Define all routes with their priorities and update frequencies
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

  // Generate sitemap entries for both locales (pl, en)
  const locales = ['pl', 'en']
  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.url}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    })
  })

  return sitemapEntries
}
