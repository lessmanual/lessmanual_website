import type { BlogPost } from "./supabase";
import { normalizePublicProse } from "./public-prose";
import { LINKS, META, PROOF, SITE_URL } from "@/content/site";

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

// Opis, ocena i profile pochodzą z src/content/site.ts, więc nie rozjeżdżają się z tekstem strony
// (ocena Google: PROOF.google).
export const ORGANIZATION_NODE = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "LessManual.ai",
  url: SITE_URL,
  description: META.llmsSentence,
  logo: "https://www.lessmanual.ai/logo-icon.png",
  email: LINKS.email,
  founder: {
    "@type": "Person",
    name: "Bartłomiej Chudzik",
    sameAs: [LINKS.linkedinBartek],
  },
  sameAs: [LINKS.linkedinBartek],
  areaServed: {
    "@type": "Country",
    name: "Polska",
  },
  // AggregateRating tylko z odczytu profilu Google w dniu publikacji (TEKSTY v3, sekcja 0 i 8).
  // Dopóki PROOF.google jest null, pola nie ma w danych strukturalnych.
  ...(PROOF.google !== null
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: PROOF.google.ratingValue,
          reviewCount: PROOF.google.reviews,
          bestRating: 5,
        },
      }
    : {}),
};

const WEBSITE_NODE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "LessManual.ai",
  url: SITE_URL,
  inLanguage: "pl-PL",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [ORGANIZATION_NODE, WEBSITE_NODE],
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

export function generateFaqPageSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function generateAboutPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: page.name,
    description: page.description,
    url: page.url,
    inLanguage: "pl-PL",
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#bartek`,
      name: "Bartłomiej Chudzik",
      jobTitle: "Założyciel",
      image: `${SITE_URL}/bartek.jpg`,
      sameAs: [LINKS.linkedinBartek],
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  };
}
