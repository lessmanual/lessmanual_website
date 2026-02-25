import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { OfertaGrid } from "@/components/sections/OfertaGrid";
import { generateItemListSchema, generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Oferta — AI dla Twojej Firmy | LessManual.ai",
  description:
    "4 systemy AI pod klucz: AI SDR, SEO Content, Obsługa Klienta 24/7, Generator Ofert. Gwarancja wyników lub pełny zwrot kosztów. Wdrożenie w 7-21 dni.",
  openGraph: {
    title: "Oferta — AI dla Twojej Firmy | LessManual.ai",
    description:
      "4 systemy AI pod klucz: AI SDR, SEO Content, Obsługa Klienta 24/7, Generator Ofert. Gwarancja wyników lub pełny zwrot kosztów.",
    url: "https://lessmanual.ai/oferta",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oferta — AI dla Twojej Firmy | LessManual.ai",
    description:
      "4 systemy AI pod klucz: AI SDR, SEO Content, Obsługa Klienta 24/7, Generator Ofert. Gwarancja wyników lub pełny zwrot kosztów.",
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta",
  },
};

const itemListSchema = generateItemListSchema([
  {
    name: "AI SDR — Spotkania z Decydentami B2B",
    url: "https://lessmanual.ai/oferta/ai-sdr",
    description:
      "System AI umawiający kwalifikowane spotkania B2B. Pay-per-meeting od 500 PLN.",
  },
  {
    name: "SEO Content — Blog na Autopilocie",
    url: "https://lessmanual.ai/oferta/seo-content",
    description:
      "Done-for-you system produkcji artykułów SEO. 10-30 artykułów miesięcznie od 1,000 PLN/mies.",
  },
  {
    name: "Obsługa Klienta AI — Chatbot 24/7",
    url: "https://lessmanual.ai/oferta/obsluga-klienta",
    description:
      "Chatbot i voiceagent na bazie wiedzy firmy. 60-80% zapytań automatycznie. Od 900 PLN/mies.",
  },
  {
    name: "Generator Ofert AI — Wycena w 5 Minut",
    url: "https://lessmanual.ai/oferta/generator-ofert",
    description:
      "Konfigurator wycen na stronie. Klient sam wycenia, dostaje PDF automatycznie. Setup od 4,000 PLN.",
  },
]);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Strona główna", url: "https://lessmanual.ai" },
  { name: "Oferta", url: "https://lessmanual.ai/oferta" },
]);

export default function OfertaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <OfertaGrid />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
