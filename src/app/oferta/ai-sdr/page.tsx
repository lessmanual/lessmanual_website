import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Premium Cold Email+: sprzedaż B2B",
  description:
    "Jakościowy outbound oparty o research kont, sygnały biznesowe, personalizowany kąt wiadomości i kontrolę faktów. Setup i miesięczna obsługa.",
  alternates: {
    canonical: "/oferta/pipeline-machine",
  },
  openGraph: {
    title: "Premium Cold Email+ · LessManual",
    description:
      "Research kont, angle wiadomości, QA faktów, wysyłka, odpowiedzi i miesięczne iteracje kampanii.",
    url: "/oferta/ai-sdr",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Cold Email+ · LessManual",
    description:
      "Outbound premium z research packami, personalizacją biznesową i kontrolą języka.",
  },
};

export default function AISDRPage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.premiumColdEmail} />;
}
