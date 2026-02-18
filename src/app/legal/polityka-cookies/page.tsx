import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Polityka Cookies | LessManual.ai",
  description:
    "Polityka Cookies LessManual.ai — informacje o plikach cookies uzywanych w serwisie.",
  alternates: {
    canonical: "https://lessmanual.ai/legal/polityka-cookies",
  },
};

export default function PolitykaCookiesPage() {
  return (
    <LegalPageContent
      title="Polityka Cookies"
      filename="polityka-cookies.md"
    />
  );
}
