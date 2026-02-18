import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/seo-content/Hero";
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

export const metadata: Metadata = {
  title: "SEO Content System - 30 Artykułów Miesięcznie | LessManual.ai",
  description:
    "Blog, który pisze się sam. AI generuje 10-30 artykułów SEO miesięcznie, human review pilnuje jakości, system publikuje na Twoim blogu. Od 83 PLN za artykuł. +150-400% ruchu organicznego w 6 miesięcy.",
  openGraph: {
    title: "SEO Content System - 30 Artykułów Miesięcznie | LessManual.ai",
    description:
      "Blog, który pisze się sam. AI generuje 10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł. +150-400% ruchu organicznego.",
    url: "https://lessmanual.ai/oferta/seo-content",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SEO Content System - 30 Artykułów Miesięcznie | LessManual.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Content System - 30 Artykułów Miesięcznie | LessManual.ai",
    description:
      "Blog, który pisze się sam. AI generuje 10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta/seo-content",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO Content System",
  description:
    "Done-for-you system produkcji contentu SEO. AI generuje artykuły, human review pilnuje jakości, system publikuje na Twoim blogu.",
  provider: {
    "@type": "Organization",
    name: "LessManual.ai",
    url: "https://lessmanual.ai",
  },
  areaServed: "PL",
  serviceType: "SEO Content Marketing",
};

export default function SEOContentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <Hero />
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
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
