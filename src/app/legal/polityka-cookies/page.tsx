import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description: "Polityka cookies serwisu lessmanual.ai: jakie cookies zapisujemy, po co i jak zmienić zgodę.",
  alternates: {
    canonical: "https://www.lessmanual.ai/legal/polityka-cookies",
  },
};

export default function PolitykaCookiesPage() {
  return <LegalPageContent title="Polityka cookies" filename="polityka-cookies.md" />;
}
