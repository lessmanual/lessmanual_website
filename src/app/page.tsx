import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DzialProvider } from "@/components/home-v4/DzialProvider";
import { HeroV4 } from "@/components/home-v4/HeroV4";
import { PrzejscieObiekt } from "@/components/home-v4/PrzejscieObiekt";
import { ModulDzialow } from "@/components/home-v4/ModulDzialow";
import { Wspolpraca } from "@/components/home-v4/Wspolpraca";
import { Bezpieczenstwo } from "@/components/home-v4/Bezpieczenstwo";
import { OpinieRzad } from "@/components/home-v4/OpinieRzad";
import { FaqV4 } from "@/components/home-v4/FaqV4";
import { WezwanieKoncowe } from "@/components/home-v4/WezwanieKoncowe";
import { PasekMobilny } from "@/components/home-v4/PasekMobilny";
import { FormSection } from "@/components/home/FormSection";
import { HOME_V4 } from "@/content/home-v4";
import { META, SITE_URL } from "@/content/site";
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

// Jedyny FAQPage na stronie: 7 pytań v4, te same, które widać w FaqV4.
const faqSchema = generateFaqPageSchema(HOME_V4.faq.pytania);
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
          <ModulDzialow />
          <Wspolpraca />
          <Bezpieczenstwo />
          <OpinieRzad />
          <FormSection />
          <FaqV4 />
          <WezwanieKoncowe />
        </main>
      </DzialProvider>
      <SiteFooter />
      <PasekMobilny />
    </>
  );
}
