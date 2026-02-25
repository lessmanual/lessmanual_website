import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { Hero } from "@/components/sections/Hero";
import { generateFAQSchema } from "@/lib/schema";
import { FAQ_ITEMS } from "@/lib/constants";
import { HeroProof } from "@/components/sections/HeroProof";
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

const faqSchema = generateFAQSchema(FAQ_ITEMS);

export default function Home() {
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
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <Hero />
        <HeroProof />
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-sm text-text-muted leading-relaxed">
            LessManual.ai to polska agencja automatyzacji AI dla firm B2B. Budujemy done-for-you systemy: AI SDR (umawianie spotkań), SEO Content (blog na autopilocie), Obsługa Klienta AI (chatbot 24/7) i Generator Ofert (wycena w 5 minut). 11 firm obsłużonych, 13 wdrożeń, 5.0 na Google. Gwarancja wyników lub zwrot kosztów.
          </p>
        </div>
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
