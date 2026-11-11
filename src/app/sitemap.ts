import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/supabase";
import { SYSTEM_PAGES } from "@/content/systemy";
import { isNoindexBlogSlug } from "@/lib/blog-noindex";

// Bez tego Next buduje sitemapę raz przy deployu (Route Handler jest cache'owany
// domyślnie), więc post opublikowany z bazy nie trafiał do sitemap.xml aż do
// następnego wdrożenia strony. 60 s jak na /blog i /blog/[slug] (24.09.2026).
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.lessmanual.ai";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: "2026-11-11", changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/systemy`, lastModified: "2026-11-11", changeFrequency: "weekly", priority: 0.9 },
    ...SYSTEM_PAGES.map((page) => ({
      url: page.url,
      lastModified: "2026-11-11",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${base}/o-nas`, lastModified: "2026-11-11", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: "2026-11-11", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: "2026-11-11", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: "2026-11-11", changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/legal/regulamin`, lastModified: "2026-11-11", changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/polityka-prywatnosci`, lastModified: "2026-11-11", changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/polityka-cookies`, lastModified: "2026-11-11", changeFrequency: "yearly", priority: 0.3 },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    blogPages = posts
      .filter((post) => !isNoindexBlogSlug(post.slug))
      .map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.published_at || post.updated_at,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    // Supabase unavailable at build time — skip blog posts
  }

  return [...staticPages, ...blogPages];
}
