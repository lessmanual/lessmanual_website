import type { BlogPost } from "./supabase";

type FAQItem = { q: string; a: string };
type FAQCategory = { category: string; items: FAQItem[] };

export function generateFAQSchema(faqItems: FAQCategory[]) {
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
    headline: post.title_pl,
    description: post.meta_description_pl || post.description_pl,
    image: post.featured_image || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    wordCount: post.word_count || undefined,
    author: {
      "@type": "Person",
      name: "Bartłomiej Chudzik",
      url: "https://lessmanual.ai",
      jobTitle: "Founder & CTO",
    },
    publisher: {
      "@type": "Organization",
      name: "LessManual.ai",
      url: "https://lessmanual.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lessmanual.ai/blog/${post.slug}`,
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
  "@type": "Organization",
  name: "LessManual.ai",
  url: "https://lessmanual.ai",
  logo: "https://lessmanual.ai/logo.svg",
  founder: {
    "@type": "Person",
    name: "Bartłomiej Chudzik",
  },
  email: "kontakt@lessmanual.ai",
  sameAs: ["https://linkedin.com/company/lessmanual"],
};

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
