import type { Metadata } from "next";
import ONasContent from "./_content";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Bartłomiej Chudzik projektuje, wdraża i utrzymuje agentów AI, które zdejmują ręczną pracę z procesów firm B2B.",
  alternates: {
    canonical: "/o-nas",
  },
  openGraph: {
    title: "O nas | LessManual",
    description:
      "Bartłomiej Chudzik projektuje, wdraża i utrzymuje agentów AI dla firm B2B.",
    url: "https://www.lessmanual.ai/o-nas",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O nas | LessManual",
    description:
      "Od procesów operacyjnych do kontrolowanych wdrożeń agentów AI.",
  },
};

export default function ONasPage() {
  return <ONasContent />;
}
