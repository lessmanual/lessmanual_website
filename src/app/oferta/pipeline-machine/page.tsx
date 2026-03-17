import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/ai-sdr/Hero";
import { HeroProof } from "@/components/sections/ai-sdr/HeroProof";
import { Problem } from "@/components/sections/ai-sdr/Problem";
import { Agitation } from "@/components/sections/ai-sdr/Agitation";
import { Solution } from "@/components/sections/ai-sdr/Solution";
import { Imagine } from "@/components/sections/ai-sdr/Imagine";
import { SocialProof } from "@/components/sections/ai-sdr/SocialProof";
import { WhatYouGet } from "@/components/sections/ai-sdr/WhatYouGet";
import { TargetSegments } from "@/components/sections/ai-sdr/TargetSegments";
import { SDRROICalculator } from "@/components/sections/ai-sdr/SDRROICalculator";
import { ComparisonTable } from "@/components/sections/ai-sdr/ComparisonTable";
import { ProcessTimeline } from "@/components/sections/ai-sdr/ProcessTimeline";
import { FAQ } from "@/components/sections/ai-sdr/FAQ";
import { Guarantee } from "@/components/sections/ai-sdr/Guarantee";
import { Bonuses } from "@/components/sections/ai-sdr/Bonuses";
import { Pricing } from "@/components/sections/ai-sdr/Pricing";
import { Urgency } from "@/components/sections/ai-sdr/Urgency";
import { FinalCTA } from "@/components/sections/ai-sdr/FinalCTA";
import { About } from "@/components/sections/ai-sdr/About";
import { StickyLocalNav } from "@/components/layout/StickyLocalNav";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { AI_SDR_FAQ_ITEMS } from "@/lib/ai-sdr-constants";

export const metadata: Metadata = {
  title: "Pipeline Machine - Spotkania z Decydentami B2B | LessManual.ai",
  description:
    "Pipeline Machine umawia spotkania z Twoimi idealnymi klientami. 76% open rate. 61% positive reply. Pay-per-meeting od 500 PLN - zero stałych opłat. 3 warstwy gwarancji.",
  openGraph: {
    title: "Pipeline Machine - Spotkania z Decydentami B2B | LessManual.ai",
    description:
      "Pipeline Machine umawia spotkania B2B. 76% open rate. 61% positive reply. Zero stałych opłat. 3 warstwy gwarancji.",
    url: "https://lessmanual.ai/oferta/pipeline-machine",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pipeline Machine - Spotkania z Decydentami B2B | LessManual.ai",
    description:
      "Pipeline Machine umawia spotkania B2B. 76% open rate. 61% positive reply. Zero stałych opłat. 3 warstwy gwarancji.",
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta/pipeline-machine",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pipeline Machine - Pay-Per-Meeting",
  description:
    "System który umawia kwalifikowane spotkania B2B. Płacisz tylko za spotkania, które się odbędą. 3 warstwy gwarancji.",
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
    price: "500",
    description:
      "od 500 PLN za spotkanie. Model pay-per-meeting, płacisz tylko za spotkania które się odbędą.",
    availability: "https://schema.org/InStock",
  },
  review: {
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Organization",
      name: "Google Reviews",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
  },
};

const faqSchema = generateFAQSchema(AI_SDR_FAQ_ITEMS);
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Strona główna", url: "https://lessmanual.ai" },
  { name: "Oferta", url: "https://lessmanual.ai/oferta" },
  { name: "Pipeline Machine", url: "https://lessmanual.ai/oferta/pipeline-machine" },
]);

export default function AISDRPage() {
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
        { name: "Cennik", href: "#pricing" },
        { name: "Jak działamy", href: "#proces" },
        { name: "Kalkulator", href: "#roi-calculator" },
        { name: "FAQ", href: "#faq" }
      ]} />
      <main className="pt-16 pb-16 md:pb-0">
        <Hero />
        <HeroProof />
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-sm text-text-muted leading-relaxed">
            Pipeline Machine od LessManual to system pay-per-meeting do umawiania spotkań B2B. System znajduje idealnych klientów, pisze spersonalizowane cold maile i umawia potwierdzone spotkania z decydentami. 76% open rate, 61% positive reply rate, deal w 6 dni. Płacisz od 500 PLN za spotkanie - zero stałych opłat. 3 warstwy gwarancji: 0 spotkań w 45 dni = zwrot setup.
          </p>
        </div>
        <Problem />
        <Agitation />
        <Solution />
        <Imagine />
        <SocialProof />
        <WhatYouGet />
        <Bonuses />
        <TargetSegments />
        <SDRROICalculator />
        <ComparisonTable />
        <Pricing />
        <Guarantee />
        <ProcessTimeline />
        <About />
        <Urgency />
        <FinalCTA />
        <FAQ />
        <div className="text-center text-sm text-text-muted py-6">
          Ostatnia aktualizacja: marzec 2026
        </div>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
