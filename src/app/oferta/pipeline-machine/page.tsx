import type { Metadata } from "next";
import PipelineMachineContent from "./_content";

export const metadata: Metadata = {
  title: "Pipeline Machine · pay-per-meeting · LessManual",
  description:
    "System który umawia spotkania z Twoimi idealnymi klientami B2B. 76% open rate. 61% positive reply. Pay-per-meeting od 500 PLN - zero stałych opłat. 3 warstwy gwarancji.",
  alternates: {
    canonical: "/oferta/pipeline-machine",
  },
  openGraph: {
    title: "Pipeline Machine · pay-per-meeting · LessManual",
    description:
      "Spotkania z decydentami B2B. 76% open rate. 61% positive reply. Pay-per-meeting od 500 PLN. Zero stałych opłat. 3 warstwy gwarancji.",
    url: "/oferta/pipeline-machine",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pipeline Machine · pay-per-meeting · LessManual",
    description:
      "System który umawia spotkania B2B. 76% open rate. 61% positive reply. Zero stałych opłat. 3 warstwy gwarancji.",
  },
};

export default function PipelineMachinePage() {
  return <PipelineMachineContent />;
}
