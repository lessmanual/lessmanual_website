import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Sygnały zakupowe dla sprzedaży B2B",
  description:
    "Warstwa sygnałów zakupowych dla outboundu i sprzedaży. System monitoruje zdarzenia, ocenia intencję i przygotowuje kontekst do kontaktu.",
  alternates: {
    canonical: "/oferta/hot-lead-catcher",
  },
  openGraph: {
    title: "Sygnały zakupowe dla sprzedaży B2B | LessManual",
    description:
      "Sygnały zakupowe, kontekst biznesowy i materiał do personalizowanego kontaktu.",
    url: "/oferta/hot-lead-catcher",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sygnały zakupowe dla sprzedaży B2B | LessManual",
    description:
      "Monitoring źródeł i kontekst do kontaktu z właściwą firmą.",
  },
};

export default function HotLeadCatcherPage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.hotLeadCatcher} />;
}
