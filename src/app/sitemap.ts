import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://lessmanual.ai";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: "2026-04-20", changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/oferta`, lastModified: "2026-04-20", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/hot-lead-catcher`, lastModified: "2026-04-20", changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/oferta/pipeline-machine`, lastModified: "2026-04-20", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/content-machine`, lastModified: "2026-04-20", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/obsluga-klienta`, lastModified: "2026-04-20", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/generator-ofert`, lastModified: "2026-04-20", changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/oferta/indywidualne-wdrozenia`, lastModified: "2026-04-21", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: "2026-04-20", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: "2026-04-20", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/o-nas`, lastModified: "2026-04-20", changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/newsletter`, lastModified: "2026-02-26", changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: "2026-04-20", changeFrequency: "daily", priority: 0.8 },
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
