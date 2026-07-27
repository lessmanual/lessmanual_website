import type { Metadata } from "next";
import { V2ShellStyles, v2FontClasses } from "@/components/v2/V2ShellStyles";
import { WebMCPProvider } from "@/components/webmcp-provider";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { ArekBadgeV2 } from "@/components/v2/ArekBadgeV2";
import { ProblemV2 } from "@/components/v2/ProblemV2";
import { ProductsV2 } from "@/components/v2/ProductsV2";
import { ControlledWorkflowV2 } from "@/components/v2/ControlledWorkflowV2";
import { TestimonialsV2 } from "@/components/v2/TestimonialsV2";
import { WhoWeAreCard } from "@/components/v2/WhoWeAreCard";
import { ProcessV2 } from "@/components/v2/ProcessV2";
import { PricingV2 } from "@/components/v2/PricingV2";
import { HomepageFAQV2 } from "@/components/v2/HomepageFAQV2";
import { FinalCTAV2 } from "@/components/v2/FinalCTAV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { HOME_FAQ_ITEMS } from "@/lib/homepage-faq";
import { generateFAQSchema, serializeJsonLd } from "@/lib/schema";

const title = "Automatyzacja AI dla firm B2B | LessManual";
const description =
  "Wdrażamy agentów AI do sprzedaży, contentu i obsługi klienta. Zaczynamy od diagnozy procesu, potem budujemy, uruchamiamy i utrzymujemy system.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "automatyzacja AI dla firm",
    "automatyzacja procesów w firmie",
    "wdrożenia AI dla firm",
    "agenci AI dla firm",
    "automatyzacja sprzedaży B2B",
    "automatyzacja obsługi klienta",
  ],
  alternates: {
    canonical: "https://www.lessmanual.ai",
  },
  openGraph: {
    title,
    description,
    url: "https://www.lessmanual.ai",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const homepageFaqSchema = generateFAQSchema(HOME_FAQ_ITEMS);

export default function Home() {
  return (
    <div className={`v2-scope ${v2FontClasses}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homepageFaqSchema) }}
      />
      <V2ShellStyles />
      <WebMCPProvider />
      <HeaderV2 />
      <main>
        <HeroV2 />
        <ArekBadgeV2 />
        <ProblemV2 />
        <ProductsV2 />
        <ControlledWorkflowV2 />
        <TestimonialsV2 />
        <WhoWeAreCard />
        <ProcessV2 />
        <PricingV2 />
        <HomepageFAQV2 />
        <FinalCTAV2 />
      </main>
      <FooterV2 />
    </div>
  );
}
