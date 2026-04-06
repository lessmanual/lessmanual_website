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
import { StickyLocalNav } from "@/components/layout/StickyLocalNav";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { GEN_OFERT_FAQ_ITEMS } from "@/lib/generator-ofert-constants";

export const metadata: Metadata = {
  title: "Generator Ofert AI - Klient Sam Wycenia, Ty Dostajesz Ofertę | LessManual.ai",
  description:
    "Self-service konfigurator wycen. Klient sam wycenia na Twojej stronie, dostaje PDF w 5 minut. 96% oszczędności czasu, +25-40% win rate. Done-for-you w 7-14 dni.",
  openGraph: {
    title: "Generator Ofert AI - Klient Sam Wycenia, Ty Dostajesz Ofertę | LessManual.ai",
    description:
      "Klient sam wycenia na Twojej stronie, dostaje PDF w 5 minut. 96% oszczędności czasu, +25-40% win rate. Wdrożenie w 7-14 dni.",
    url: "https://lessmanual.ai/oferta/generator-ofert",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generator Ofert AI - Klient Sam Wycenia, Ty Dostajesz Ofertę | LessManual.ai",
    description:
      "Klient sam wycenia na Twojej stronie, dostaje PDF w 5 minut. 96% oszczędności czasu, +25-40% win rate. Wdrożenie w 7-14 dni.",
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta/generator-ofert",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Konfigurator Wycen",
  description:
    "Self-service konfigurator wycen. Klient sam wycenia na Twojej stronie i dostaje profesjonalny PDF automatycznie. Done-for-you, pod klucz.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  provider: {
    "@type": "Organization",
    name: "LessManual.ai",
    url: "https://lessmanual.ai",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "PLN",
    price: "800",
    description:
      "od 800 PLN/mies. Self-service konfigurator wycen, klient sam wycenia na Twojej stronie, dostaje PDF w 5 minut.",
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
      <StickyLocalNav items={[
        { name: "Wyniki", href: "#wyniki" },
        { name: "Kalkulator", href: "#roi-calculator" },
        { name: "Cennik", href: "#pricing" },
        { name: "Jak działamy", href: "#proces" },
        { name: "FAQ", href: "#faq" }
      ]} />
      <main className="pt-16 pb-16 md:pb-0">
        <Hero />
        <HeroProof />
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-sm text-text-muted leading-relaxed">
            Generator Ofert AI od LessManual to self-service konfigurator wycen dla firm usługowych. Klient sam wycenia na Twojej stronie, system generuje profesjonalny PDF z Twoim logo i wysyła mailem w 5 minut. Bez ręcznej roboty, bez exceli. 96% oszczędności czasu, +25-40% win rate. Wdrożenie done-for-you w 7-14 dni.
          </p>
        </div>
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
          Ostatnia aktualizacja: kwiecień 2026
        </div>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
