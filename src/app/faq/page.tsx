import type { Metadata } from "next";
import FaqContent from "./_content";

export const metadata: Metadata = {
  title: "Najczęstsze pytania | LessManual",
  description:
    "Odpowiedzi na najczęstsze pytania o systemy AI LessManual. Dowiedz się jak działamy, ile to kosztuje i jak zadbamy o bezpieczeństwo Twoich danych.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Najczęstsze pytania | LessManual",
    description:
      "Odpowiedzi na najczęstsze pytania o systemy AI LessManual. Produkt i wdrożenie, ceny i warunki, bezpieczeństwo i zaufanie.",
    url: "/faq",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | LessManual",
    description:
      "Najczęstsze pytania o agentów AI dla firm B2B. Jak działamy, ile kosztuje, gwarancja wyników.",
  },
};

export default function FaqPage() {
  return <FaqContent />;
}
