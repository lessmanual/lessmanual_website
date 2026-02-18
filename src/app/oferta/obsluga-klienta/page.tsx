import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/obsluga-klienta/Hero";
import { Problem } from "@/components/sections/obsluga-klienta/Problem";
import { Agitation } from "@/components/sections/obsluga-klienta/Agitation";
import { Solution } from "@/components/sections/obsluga-klienta/Solution";
import { Imagine } from "@/components/sections/obsluga-klienta/Imagine";
import { SocialProof } from "@/components/sections/obsluga-klienta/SocialProof";
import { WhatYouGet } from "@/components/sections/obsluga-klienta/WhatYouGet";
import { TargetSegments } from "@/components/sections/obsluga-klienta/TargetSegments";
import { ROICalculator } from "@/components/sections/obsluga-klienta/ROICalculator";
import { ComparisonTable } from "@/components/sections/obsluga-klienta/ComparisonTable";
import { Pricing } from "@/components/sections/obsluga-klienta/Pricing";
import { Guarantee } from "@/components/sections/obsluga-klienta/Guarantee";
import { ProcessTimeline } from "@/components/sections/obsluga-klienta/ProcessTimeline";
import { About } from "@/components/sections/obsluga-klienta/About";
import { Urgency } from "@/components/sections/obsluga-klienta/Urgency";
import { FinalCTA } from "@/components/sections/obsluga-klienta/FinalCTA";
import { FAQ } from "@/components/sections/obsluga-klienta/FAQ";

export const metadata: Metadata = {
  title: "System Obslugi Klienta AI -- odpowiedzi w 30 sekund, 24/7 | LessManual.ai",
  description:
    "AI Customer Service System. Chatbot, WhatsApp, Email Triage, Voice Agent. 60-80% zapytan rozwiazanych automatycznie. Done-for-you w 7-21 dni. Od 5,000 PLN setup + 900 PLN/mies.",
  openGraph: {
    title: "System Obslugi Klienta AI -- odpowiedzi w 30 sekund, 24/7 | LessManual.ai",
    description:
      "AI Customer Service System. Chatbot, WhatsApp, Email Triage, Voice Agent. 60-80% zapytan rozwiazanych automatycznie. Done-for-you w 7-21 dni.",
    url: "https://lessmanual.ai/oferta/obsluga-klienta",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "System Obslugi Klienta AI -- odpowiedzi w 30 sekund, 24/7 | LessManual.ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "System Obslugi Klienta AI -- odpowiedzi w 30 sekund, 24/7 | LessManual.ai",
    description:
      "AI Customer Service System. Chatbot, WhatsApp, Email Triage, Voice Agent. 60-80% zapytan rozwiazanych automatycznie. Done-for-you w 7-21 dni.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://lessmanual.ai/oferta/obsluga-klienta",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "System Obslugi Klienta AI",
  description:
    "AI Customer Service System. Chatbot na strone, WhatsApp Bot, Email Triage, Voice Agent. Odpowiedzi w 30 sekund, 24/7. Done-for-you, pod klucz.",
  provider: {
    "@type": "Organization",
    name: "LessManual.ai",
    url: "https://lessmanual.ai",
  },
  areaServed: "PL",
  serviceType: "AI Customer Service System",
};

export default function ObslugaKlientaPage() {
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
