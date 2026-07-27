import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Cold email B2B oparty na sygnałach i źródłach",
  description:
    "Kampanie cold email B2B oparte na selekcji firm, publicznym powodzie kontaktu, kontroli faktów i ręcznej akceptacji wiadomości.",
  alternates: {
    canonical: "/oferta/pipeline-machine",
  },
  openGraph: {
    title: "Cold email B2B oparty na sygnałach i źródłach | LessManual",
    description:
      "Selekcja firm, publiczny powód kontaktu, kontrola faktów i iteracje na podstawie odpowiedzi.",
    url: "/oferta/pipeline-machine",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold email B2B oparty na sygnałach i źródłach | LessManual",
    description:
      "Sprzedaż B2B z konkretnym kontekstem, źródłami i kontrolą języka.",
  },
};

export default function PipelineMachinePage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.premiumColdEmail} />;
}
