import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DzialProvider } from "@/components/home-v4/DzialProvider";
import { HeroV4 } from "@/components/home-v4/HeroV4";
import { PrzejscieObiekt } from "@/components/home-v4/PrzejscieObiekt";
import { ProcessLine } from "@/components/home/ProcessLine";
import { BzykGuide } from "@/components/home/BzykGuide";
import { FormSection } from "@/components/home/FormSection";
import {
  Faq,
  ForWhom,
  Guarantee,
  Paths,
  Pricing,
  ScopeCard,
  Systems,
  Testimonials,
} from "@/components/home/Sections";
import { FAQ, META, SITE_URL } from "@/content/site";
import { generateFaqPageSchema, generateServiceSchema, serializeJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: META.title },
  description: META.description,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: META.ogTitle,
    description: META.ogDescription,
    url: SITE_URL,
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: META.ogTitle,
    description: META.ogDescription,
  },
};

const faqSchema = generateFaqPageSchema(FAQ.items);
const serviceSchema = generateServiceSchema({
  name: "Systemy AI dla firm: wdrożenie etapami i opieka co miesiąc",
  description: META.description,
  url: SITE_URL,
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <SiteHeader />
      <DzialProvider>
        <main>
          <HeroV4 />
          <PrzejscieObiekt />
          <ForWhom />
          <ProcessLine />
          <ScopeCard />
          <Systems />
          <Paths />
          <Guarantee />
          <Pricing />
          <Testimonials />
          <Faq />
          <FormSection />
        </main>
      </DzialProvider>
      <SiteFooter />
      <BzykGuide />
    </>
  );
}
