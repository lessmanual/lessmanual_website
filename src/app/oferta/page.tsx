import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { OfertaGrid } from "@/components/sections/OfertaGrid";
import {
  generateItemListSchema,
  generateBreadcrumbSchema,
  serializeJsonLd,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wdrożenia AI dla firm: sprzedaż, content i obsługa",
  description:
    "Wdrażamy agentów AI do sprzedaży B2B, contentu, SEO i obsługi klienta. Zakres, termin i wycena powstają po diagnozie procesu.",
  openGraph: {
    title: "Wdrożenia AI dla firm: sprzedaż, content i obsługa | LessManual",
    description:
      "Agenci AI dopasowani do procesu firmy. Projekt, wdrożenie i utrzymanie.",
    url: "https://www.lessmanual.ai/oferta",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wdrożenia AI dla firm: sprzedaż, content i obsługa | LessManual",
    description:
      "Agenci AI dopasowani do procesu firmy. Projekt, wdrożenie i utrzymanie.",
  },
  alternates: {
    canonical: "https://www.lessmanual.ai/oferta",
  },
};

const itemListSchema = generateItemListSchema([
  {
    name: "Content Machine",
    url: "https://www.lessmanual.ai/oferta/content-machine",
    description:
      "System planowania, przygotowania, publikacji i dystrybucji contentu dla firm B2B.",
  },
  {
    name: "Customer Operations AI",
    url: "https://www.lessmanual.ai/oferta/obsluga-klienta",
    description:
      "Agent AI do obsługi pytań, spraw i eskalacji w wielu kanałach.",
  },
  {
    name: "Premium Cold Email+",
    url: "https://www.lessmanual.ai/oferta/pipeline-machine",
    description:
      "Sprzedaż B2B oparta na sygnałach, źródłach i konkretnym kontekście.",
  },
  {
    name: "Generator Ofert AI - Wycena w 5 Minut",
    url: "https://www.lessmanual.ai/oferta/generator-ofert",
    description:
      "Drafty ofert przygotowane na podstawie danych i cennika firmy.",
  },
  {
    name: "Hot Lead Catcher",
    url: "https://www.lessmanual.ai/oferta/hot-lead-catcher",
    description:
      "Monitoring sygnałów zakupowych z podaniem źródła i kontekstu.",
  },
  {
    name: "Indywidualne wdrożenia AI",
    url: "https://www.lessmanual.ai/oferta/indywidualne-wdrozenia",
    description:
      "Agent AI dopasowany do niestandardowego procesu, danych i integracji firmy.",
  },
]);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Strona główna", url: "https://www.lessmanual.ai" },
  { name: "Oferta", url: "https://www.lessmanual.ai/oferta" },
]);

export default function OfertaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
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
