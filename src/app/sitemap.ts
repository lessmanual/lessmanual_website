import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://lessmanual.ai";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: "2026-02-18", changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/oferta`, lastModified: "2026-02-18", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/ai-sdr`, lastModified: "2026-02-18", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/seo-content`, lastModified: "2026-02-18", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/obsluga-klienta`, lastModified: "2026-02-18", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/generator-ofert`, lastModified: "2026-02-18", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: "2026-02-18", changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/legal/regulamin`, lastModified: "2026-02-18", changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/polityka-prywatnosci`, lastModified: "2026-02-18", changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/polityka-cookies`, lastModified: "2026-02-18", changeFrequency: "yearly", priority: 0.3 },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    blogPages = posts.map((post) => ({
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
