import type { Metadata } from "next";
import ObslugaKlientaContent from "./_content";

export const metadata: Metadata = {
  title: "System Obsługi Klienta · chatbot AI + multi-channel · LessManual",
  description:
    "Chatbot RAG na web, WhatsApp i email. 60-80% zapytań obsługiwanych automatycznie. Odpowiedź w 30 sekund, 24/7. Voice Agent w tierze SCALE. Od 5 000 PLN setup + 900 PLN/mies. Wdrożenie w 14 dni.",
  alternates: {
    canonical: "/oferta/obsluga-klienta",
  },
  openGraph: {
    title: "System Obsługi Klienta · chatbot AI + multi-channel",
    description:
      "60-80% zapytań automatycznie. Odpowiedź w 30 sekund, 24/7. Web + WhatsApp + email w jednym systemie. Wdrożenie w 14 dni.",
    url: "/oferta/obsluga-klienta",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Obsługi Klienta · LessManual",
    description:
      "Chatbot RAG na web, WhatsApp i email. 60-80% zapytań automatycznie. Od 900 PLN/mies. vs pracownik 8-9 tys. PLN/mies.",
  },
};

export default function ObslugaKlientaPage() {
  return <ObslugaKlientaContent />;
}
