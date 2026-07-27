import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Automatyzacja contentu i SEO dla firm",
  description:
    "System regularnie przygotowuje treści na podstawie źródeł firmy, sprawdza fakty i prowadzi materiał do akceptacji, publikacji oraz dystrybucji.",
  alternates: {
    canonical: "/oferta/content-machine",
  },
  openGraph: {
    title: "Automatyzacja contentu i SEO dla firm | LessManual",
    description:
      "Regularne treści oparte na źródłach firmy, z kontrolą faktów i publikacją.",
    url: "/oferta/content-machine",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatyzacja contentu i SEO dla firm | LessManual",
    description:
      "Regularne treści oparte na źródłach firmy, z kontrolą faktów i publikacją.",
  },
};

export default function ContentMachinePage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.contentMachine} />;
}
