import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/seo-content/Hero";
import { HeroProof } from "@/components/sections/seo-content/HeroProof";
import { Problem } from "@/components/sections/seo-content/Problem";
import { Agitation } from "@/components/sections/seo-content/Agitation";
import { Solution } from "@/components/sections/seo-content/Solution";
import { Imagine } from "@/components/sections/seo-content/Imagine";
import { SocialProof } from "@/components/sections/seo-content/SocialProof";
import { WhatYouGet } from "@/components/sections/seo-content/WhatYouGet";
import { TargetSegments } from "@/components/sections/seo-content/TargetSegments";
import { ROICalculator } from "@/components/sections/seo-content/ROICalculator";
import { ComparisonTable } from "@/components/sections/seo-content/ComparisonTable";
import { Pricing } from "@/components/sections/seo-content/Pricing";
import { Guarantee } from "@/components/sections/seo-content/Guarantee";
import { ProcessTimeline } from "@/components/sections/seo-content/ProcessTimeline";
import { About } from "@/components/sections/seo-content/About";
import { Urgency } from "@/components/sections/seo-content/Urgency";
import { FinalCTA } from "@/components/sections/seo-content/FinalCTA";
import { FAQ } from "@/components/sections/seo-content/FAQ";
import { StickyLocalNav } from "@/components/layout/StickyLocalNav";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SEO_FAQ_ITEMS } from "@/lib/seo-content-constants";

export const metadata: Metadata = {
  title: "Content Machine - Blog pisze się sam. Google zaczyna Cię widzieć | LessManual.ai",
  description:
    "10 do 30 artykułów SEO miesięcznie. Bez copywritera, bez Twojego czasu. Dajesz branżę - my robimy resztę. +150-400% ruchu organicznego w 6 miesięcy. Done-for-you.",
  openGraph: {
    title: "Content Machine - Blog pisze się sam | LessManual.ai",
    description:
      "10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł. Bez copywritera, bez Twojego czasu. +150-400% ruchu organicznego.",
    url: "https://lessmanual.ai/oferta/seo-content",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Machine - Blog pisze się sam | LessManual.ai",
    description:
      "10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł. Bez copywritera, bez Twojego czasu. +150-400% ruchu organicznego.",
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta/seo-content",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Content Machine",
  description:
    "Done-for-you system produkcji contentu SEO. 10-30 artykułów miesięcznie. Dajesz branżę - my robimy resztę. Bez copywritera, bez Twojego czasu.",
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
    price: "1000",
    description:
      "od 1,000 PLN/mies. 10-30 artykułów SEO miesięcznie z keyword research i human review.",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
  },
};

const faqSchema = generateFAQSchema(SEO_FAQ_ITEMS);
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Strona główna", url: "https://lessmanual.ai" },
  { name: "Oferta", url: "https://lessmanual.ai/oferta" },
  { name: "SEO Content", url: "https://lessmanual.ai/oferta/seo-content" },
]);

export default function SEOContentPage() {
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
            Content Machine od LessManual to done-for-you system produkcji artykułów SEO. AI generuje 10-30 artykułów miesięcznie z keyword research, klastry tematyczne i internal linking. Opcjonalny human-in-the-loop review. Od 83 PLN za artykuł. Wzrost ruchu organicznego +150-400% w 6 miesięcy.
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
          Ostatnia aktualizacja: luty 2026
        </div>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
