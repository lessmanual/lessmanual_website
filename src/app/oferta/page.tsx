import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { OfertaGrid } from "@/components/sections/OfertaGrid";

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oferta — AI dla Twojej Firmy | LessManual.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oferta — AI dla Twojej Firmy | LessManual.ai",
    description:
      "4 systemy AI pod klucz: AI SDR, SEO Content, Obsługa Klienta 24/7, Generator Ofert. Gwarancja wyników lub pełny zwrot kosztów.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta",
  },
};

export default function OfertaPage() {
  return (
    <>
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <OfertaGrid />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
