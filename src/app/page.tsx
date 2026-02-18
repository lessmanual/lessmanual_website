import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Agitation } from "@/components/sections/Agitation";
import { Solutions } from "@/components/sections/Solutions";
import { Imagine } from "@/components/sections/Imagine";
import { SocialProof } from "@/components/sections/SocialProof";
import { ValueStack } from "@/components/sections/ValueStack";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Guarantee } from "@/components/sections/Guarantee";
import { Urgency } from "@/components/sections/Urgency";
import { FinalCTA } from "@/components/sections/FinalCTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "LessManual.ai",
  url: "https://lessmanual.ai",
  description:
    "Systemy AI dla firm B2B — AI SDR, SEO Content, Chatbot 24/7, Generator Ofert. Gwarancja wyników lub pełny zwrot kosztów.",
  email: "kontakt@lessmanual.ai",
  founder: {
    "@type": "Person",
    name: "Bartłomiej Chudzik",
  },
  areaServed: "PL",
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
  },
};

export default function Home() {
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
        <Solutions />
        <Imagine />
        <SocialProof />
        <ValueStack />
        <Process />
        <About />
        <Guarantee />
        <Urgency />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
