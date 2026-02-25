import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/generator-ofert/Hero";
import { HeroProof } from "@/components/sections/generator-ofert/HeroProof";
import { Problem } from "@/components/sections/generator-ofert/Problem";
import { Agitation } from "@/components/sections/generator-ofert/Agitation";
import { Solution } from "@/components/sections/generator-ofert/Solution";
import { Imagine } from "@/components/sections/generator-ofert/Imagine";
import { SocialProof } from "@/components/sections/generator-ofert/SocialProof";
import { WhatYouGet } from "@/components/sections/generator-ofert/WhatYouGet";
import { TargetSegments } from "@/components/sections/generator-ofert/TargetSegments";
import { ROICalculator } from "@/components/sections/generator-ofert/ROICalculator";
import { ComparisonTable } from "@/components/sections/generator-ofert/ComparisonTable";
import { Pricing } from "@/components/sections/generator-ofert/Pricing";
import { Guarantee } from "@/components/sections/generator-ofert/Guarantee";
import { ProcessTimeline } from "@/components/sections/generator-ofert/ProcessTimeline";
import { About } from "@/components/sections/generator-ofert/About";
import { Urgency } from "@/components/sections/generator-ofert/Urgency";
import { FinalCTA } from "@/components/sections/generator-ofert/FinalCTA";
import { FAQ } from "@/components/sections/generator-ofert/FAQ";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { GEN_OFERT_FAQ_ITEMS } from "@/lib/generator-ofert-constants";

export const metadata: Metadata = {
  title: "Generator Ofert AI — Wycena w 5 Minut | LessManual.ai",
  description:
    "Klient sam wycenia na Twojej stronie, dostaje profesjonalny PDF automatycznie. 96% mniej czasu na wyceny. Dla OZE, mebli, budowlanki. Done-for-you w 7-21 dni.",
  openGraph: {
    title: "Generator Ofert AI — Wycena w 5 Minut | LessManual.ai",
    description:
      "Klient sam wycenia na Twojej stronie, dostaje PDF automatycznie. 96% mniej czasu na wyceny.",
    url: "https://lessmanual.ai/oferta/generator-ofert",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generator Ofert AI — Wycena w 5 Minut | LessManual.ai",
    description:
      "Klient sam wycenia na Twojej stronie, dostaje PDF automatycznie. 96% mniej czasu na wyceny.",
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta/generator-ofert",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Konfigurator Wycen",
  description:
    "Self-service konfigurator wycen. Klient sam wycenia na Twojej stronie i dostaje profesjonalny PDF automatycznie. Done-for-you, pod klucz.",
  provider: {
    "@type": "Organization",
    name: "LessManual.ai",
    url: "https://lessmanual.ai",
  },
  areaServed: "PL",
  serviceType: "AI Quote Generation System",
  offers: {
    "@type": "Offer",
    priceCurrency: "PLN",
    price: "4000",
    description:
      "setup od 4,000 PLN. Konfigurator wycen na stronie — klient sam wycenia, dostaje PDF automatycznie.",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
  },
};

const faqSchema = generateFAQSchema(GEN_OFERT_FAQ_ITEMS);
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Strona główna", url: "https://lessmanual.ai" },
  { name: "Oferta", url: "https://lessmanual.ai/oferta" },
  {
    name: "Generator Ofert AI",
    url: "https://lessmanual.ai/oferta/generator-ofert",
  },
]);

export default function GeneratorOfertPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <Hero />
        <HeroProof />
        <Problem />
        <Agitation />
        <Solution />
        <Imagine />
        <SocialProof />
        <WhatYouGet />
        <TargetSegments />
        <ROICalculator />
        <ComparisonTable />
        <Pricing />
        <Guarantee />
        <ProcessTimeline />
        <About />
        <Urgency />
        <FinalCTA />
        <FAQ />
        <div className="text-center text-sm text-text-muted py-6">
          Ostatnia aktualizacja: luty 2026
        </div>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
