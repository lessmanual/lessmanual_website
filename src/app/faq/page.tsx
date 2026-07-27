import type { Metadata } from "next";
import FaqContent from "./_content";
import { FAQ_ITEMS } from "@/lib/constants";
import { generateFAQSchema, serializeJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Najczęstsze pytania o wdrożenia AI",
  description:
    "Odpowiedzi na najczęstsze pytania o systemy AI LessManual. Dowiedz się jak działamy, ile to kosztuje i jak zadbamy o bezpieczeństwo Twoich danych.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Najczęstsze pytania | LessManual",
    description:
      "Odpowiedzi na najczęstsze pytania o systemy AI LessManual. Produkt i wdrożenie, ceny i warunki, bezpieczeństwo i zaufanie.",
    url: "/faq",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | LessManual",
    description:
      "Najczęstsze pytania o agentów AI dla firm B2B, wycenę, bezpieczeństwo i sposób wdrożenia.",
  },
};

export default function FaqPage() {
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <FaqContent />
    </>
  );
}
