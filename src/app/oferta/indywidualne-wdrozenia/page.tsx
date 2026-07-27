import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Indywidualne wdrożenia agentów AI",
  description:
    "Agent AI dopasowany do niestandardowego procesu, danych i integracji firmy. Diagnoza, projekt, wdrożenie i utrzymanie.",
  alternates: {
    canonical: "/oferta/indywidualne-wdrozenia",
  },
  openGraph: {
    title: "Indywidualne wdrożenia agentów AI | LessManual",
    description:
      "System dopasowany do procesu, integracji, danych i odpowiedzialności zespołu.",
    url: "/oferta/indywidualne-wdrozenia",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indywidualne wdrożenia agentów AI | LessManual",
    description:
      "Dedykowany agent AI z diagnozą, wdrożeniem, kontrolą i utrzymaniem.",
  },
};

export default function IndywidualneWdrozeniaPage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.customWorkflow} />;
}
