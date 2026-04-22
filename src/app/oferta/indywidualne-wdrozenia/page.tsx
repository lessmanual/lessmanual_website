import type { Metadata } from "next";
import IndywidualneContent from "./_content";

export const metadata: Metadata = {
  title: "Indywidualne Wdrożenia · LessManual.ai",
  description:
    "Twój proces jest zbyt specyficzny na standardowy produkt. Budujemy agenty AI od zera - dedykowane pod Twój workflow, integracje i branżę. Wycena projektowa po Discovery. 3 warstwy gwarancji.",
  alternates: {
    canonical: "/oferta/indywidualne-wdrozenia",
  },
  openGraph: {
    title: "Indywidualne Wdrożenia · LessManual.ai",
    description:
      "Twój workflow nie pasuje do żadnego gotowego produktu. Budujemy system agentów AI od zera - pod Twoje systemy, procesy i branżę. Wycena projektowa. 3 warstwy gwarancji.",
    url: "/oferta/indywidualne-wdrozenia",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indywidualne Wdrożenia · LessManual.ai",
    description:
      "Buduję agenty AI od zera pod Twój specyficzny workflow. Wycena projektowa po Discovery Workshop.",
  },
};

export default function IndywidualneWdrozeniaPage() {
  return <IndywidualneContent />;
}
