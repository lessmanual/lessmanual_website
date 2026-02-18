import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/generator-ofert/Hero";
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

export const metadata: Metadata = {
  title: "System Generowania Ofert - Wyceny w 5 Minut | LessManual.ai",
  description:
    "System AI generujacy profesjonalne oferty PDF w 5 minut zamiast 2 godzin. Dla firm OZE, producent\u00f3w mebli i firm remontowo-budowlanych. Done-for-you. 7-21 dni do dzia\u0142aj\u0105cego systemu.",
  openGraph: {
    title: "System Generowania Ofert - Wyceny w 5 Minut | LessManual.ai",
    description:
      "Profesjonalne oferty PDF w 5 minut zamiast 2 godzin. 96% mniej czasu na wyceny. Done-for-you w 7-21 dni.",
    url: "https://lessmanual.ai/oferta/generator-ofert",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "System Generowania Ofert - Wyceny w 5 Minut | LessManual.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Generowania Ofert - Wyceny w 5 Minut | LessManual.ai",
    description:
      "Profesjonalne oferty PDF w 5 minut zamiast 2 godzin. 96% mniej czasu na wyceny. Done-for-you w 7-21 dni.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta/generator-ofert",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "System Generowania Ofert",
  description:
    "System AI generuj\u0105cy profesjonalne oferty PDF w 5 minut zamiast 2 godzin. Done-for-you, pod klucz, z gwarancj\u0105 wynik\u00f3w.",
  provider: {
    "@type": "Organization",
    name: "LessManual.ai",
    url: "https://lessmanual.ai",
  },
  areaServed: "PL",
  serviceType: "AI Quote Generation System",
};

export default function GeneratorOfertPage() {
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
