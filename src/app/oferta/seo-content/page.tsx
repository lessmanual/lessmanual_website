import type { Metadata } from "next";
import SeoContentContent from "./_content";

export const metadata: Metadata = {
  title: "SEO Content System · blog który pisze się sam · LessManual",
  description:
    "10 do 30 artykułów SEO miesięcznie. Bez copywritera, bez Twojego czasu. Dajesz branżę - my robimy resztę. +150-400% ruchu organicznego w 6 miesięcy. Od 83 PLN za artykuł.",
  alternates: {
    canonical: "/oferta/seo-content",
  },
  openGraph: {
    title: "SEO Content System · blog który pisze się sam · LessManual",
    description:
      "10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł. Bez copywritera, bez Twojego czasu. +150-400% ruchu organicznego.",
    url: "/oferta/seo-content",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Content System · LessManual",
    description:
      "10-30 artykułów SEO miesięcznie. Od 83 PLN za artykuł. Bez copywritera. +150-400% ruchu organicznego.",
  },
};

export default function SeoContentPage() {
  return <SeoContentContent />;
}
