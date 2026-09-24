import type { BlogPost } from "./supabase";
import { normalizePublicProse } from "./public-prose";

type FAQItem = { q: string; a: string };
type FAQCategory = { category: string; items: readonly FAQItem[] };

export function generateFAQSchema(faqItems: readonly FAQCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.flatMap((cat) =>
      cat.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };
}

export function generateBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: normalizePublicProse(post.title_pl),
    description: normalizePublicProse(
      post.meta_description_pl || post.description_pl || "",
    ),
    image: post.featured_image || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    wordCount: post.word_count || undefined,
    author: {
      "@type": "Person",
      name: "Bartłomiej Chudzik",
      url: "https://www.lessmanual.ai",
      jobTitle: "Founder & CTO",
    },
    // Redaktor = człowiek z odpowiedzialnością redakcyjną za tekst (AI Act art. 50 ust. 4).
    editor: {
      "@type": "Person",
      name: "Bartłomiej Chudzik",
      url: "https://www.lessmanual.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "LessManual.ai",
      url: "https://www.lessmanual.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.lessmanual.ai/blog/${post.slug}`,
    },
    keywords: [post.primary_keyword, ...(post.secondary_keywords || [])].filter(
      Boolean
    ),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.lessmanual.ai/#organization",
      name: "LessManual.ai",
      url: "https://www.lessmanual.ai",
      logo: "https://www.lessmanual.ai/logo-icon.png",
      founder: {
        "@type": "Person",
        name: "Bartłomiej Chudzik",
      },
      email: "kontakt@lessmanual.ai",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.lessmanual.ai/#website",
      name: "LessManual.ai",
      url: "https://www.lessmanual.ai",
      inLanguage: "pl-PL",
      publisher: {
        "@id": "https://www.lessmanual.ai/#organization",
      },
    },
  ],
};

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function generateItemListSchema(
  items: { name: string; url: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@id": "https://www.lessmanual.ai/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Polska",
    },
  };
}
