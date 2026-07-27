import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Content Machine: treści SEO i social",
  description:
    "Pipeline do researchu, pisania, publikacji i dystrybucji treści. LessManual buduje Content Machine z kontrolą jakości, źródłami i miesięczną obsługą.",
  alternates: {
    canonical: "/oferta/content-machine",
  },
  openGraph: {
    title: "Content Machine · LessManual",
    description:
      "Jakościowy pipeline treści: research, brief, redakcja, publikacja, dystrybucja i miesięczna kontrola jakości.",
    url: "/oferta/seo-content",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Machine · LessManual",
    description:
      "Research, briefy, redakcja, publikacja i dystrybucja treści w jednym workflow.",
  },
};

export default function SeoContentPage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.contentMachine} />;
}
