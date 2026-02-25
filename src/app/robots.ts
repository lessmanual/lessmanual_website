import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // AI Search Bots — explicitly allowed
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      // Block training-only crawlers
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Safety",
        disallow: "/",
      },
    ],
    sitemap: "https://lessmanual.ai/sitemap.xml",
  };
}
