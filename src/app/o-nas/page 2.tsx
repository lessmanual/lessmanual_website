import type { Metadata } from "next";
import ONasContent from "./_content";

export const metadata: Metadata = {
  title: "O nas | LessManual",
  description:
    "Bartłomiej Chudzik - buduję systemy AI dla firm B2B, które nie wymagają obsługi. Solo founder, JDG od 2025, klienci z całej Polski.",
  alternates: {
    canonical: "/o-nas",
  },
  openGraph: {
    title: "O nas | LessManual",
    description:
      "Bartłomiej Chudzik - buduję systemy AI dla firm B2B, które nie wymagają obsługi. Solo founder, JDG od 2025, klienci z całej Polski.",
    url: "https://lessmanual.ai/o-nas",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O nas | LessManual",
    description:
      "Bartłomiej Chudzik - buduję systemy AI dla firm B2B, które nie wymagają obsługi.",
  },
};

export default function ONasPage() {
  return <ONasContent />;
}
