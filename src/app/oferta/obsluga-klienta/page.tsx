import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Automatyzacja obsługi klienta z AI",
  description:
    "Agent AI odpowiada na podstawie bazy wiedzy, zbiera kontekst sprawy i przekazuje człowiekowi wyjątki wymagające decyzji.",
  alternates: {
    canonical: "/oferta/obsluga-klienta",
  },
  openGraph: {
    title: "Automatyzacja obsługi klienta z AI | LessManual",
    description:
      "Obsługa pytań i spraw na danych firmy, z kontrolą jakości oraz eskalacją do zespołu.",
    url: "/oferta/obsluga-klienta",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatyzacja obsługi klienta z AI | LessManual",
    description:
      "Agent AI do obsługi pytań, zbierania kontekstu i eskalacji do zespołu.",
  },
};

export default function ObslugaKlientaPage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.customerOperations} />;
}
