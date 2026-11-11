import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności serwisu lessmanual.ai: administrator, cele, odbiorcy, okresy przechowywania i Twoje prawa.",
  alternates: {
    canonical: "https://www.lessmanual.ai/legal/polityka-prywatnosci",
  },
};

export default function PolitykaPrywatnosciPage() {
  return <LegalPageContent title="Polityka prywatności" filename="polityka-prywatnosci.md" />;
}
