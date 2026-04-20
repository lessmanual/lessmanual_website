import type { Metadata } from "next";
import ContentMachineContent from "./_content";

export const metadata: Metadata = {
  title: "Content Machine - automatyczny system treści SEO + social + lead magnety · LessManual",
  description:
    "10 do 30 artykułów SEO miesięcznie. Bez copywritera, bez Twojego czasu. Dajesz branżę - my robimy resztę. +150-400% ruchu organicznego w 6 miesięcy. Od 83 PLN za artykuł.",
  alternates: {
    canonical: "/oferta/content-machine",
  },
  openGraph: {
    title: "Content Machine - automatyczny system treści SEO · LessManual",
    description:
      "10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł. Bez copywritera, bez Twojego czasu. +150-400% ruchu organicznego.",
    url: "/oferta/content-machine",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Machine · LessManual",
    description:
      "10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł. Bez copywritera. +150-400% ruchu organicznego.",
  },
};

export default function ContentMachinePage() {
  return <ContentMachineContent />;
}
