import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  FileSearch,
  Gauge,
  Map,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { V2ShellStyles, v2FontClasses } from "@/components/v2/V2ShellStyles";
import { FooterV2 } from "@/components/v2/FooterV2";
import { AIGrowthOpportunityMapForm } from "@/components/lead-magnet/AIGrowthOpportunityMapForm";

export const metadata: Metadata = {
  title: "Mapa pierwszego procesu AI | LessManual.ai",
  description:
    "Znajdź pierwszy proces, który AI może przejąć w Twojej firmie. Otrzymaj spersonalizowany, 2-stronicowy raport PDF na email.",
  alternates: {
    canonical: "/ai-growth-opportunity-map",
  },
  openGraph: {
    title: "Mapa pierwszego procesu AI | LessManual.ai",
    description:
      "Spersonalizowany raport wskazujący pierwszy mierzalny proces do wdrożenia z AI.",
    url: "/ai-growth-opportunity-map",
    type: "website",
    locale: "pl_PL",
  },
};

const reportPages = [
  {
    page: "01 / 02",
    title: "Diagnoza firmy",
    sections: [
      {
        title: "Punkt wyjścia firmy",
        body: "Skala powtarzalnej pracy, czas jednej czynności, używane systemy i wskazana blokada.",
        icon: Building2,
      },
      {
        title: "Fakty z publicznych źródeł",
        body: "Informacje, które można sprawdzić na stronie firmy i w dostępnych materiałach publicznych.",
        icon: FileSearch,
      },
    ],
  },
  {
    page: "02 / 02",
    title: "Plan działania",
    sections: [
      {
        title: "Pierwszy system do wdrożenia",
        body: "Jeden proces z jasnym zakresem, danymi wejściowymi i wynikiem, który można zmierzyć.",
        icon: Map,
      },
      {
        title: "Kontrolowane wdrożenie",
        body: "Co sprawdzić przed startem, gdzie zostawić decyzję człowiekowi i jak mierzyć efekt.",
        icon: ShieldCheck,
      },
    ],
  },
];

const journeyStages = ["Analiza", "Mapa", "Decyzja", "Wdrożenie", "Wynik"];

export default function AIGrowthOpportunityMapPage() {
  return (
    <div className={`v2-scope ${v2FontClasses}`}>
      <V2ShellStyles />

      <header className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 md:px-10">
          <Link href="/" className="flex items-center gap-2" aria-label="LessManual.ai, strona główna">
            <Image src="/logo-icon.png" alt="" width={28} height={28} className="shrink-0" priority />
            <span className="text-[14px] font-medium tracking-normal text-[#0A0A0A]">
              lessmanual<span className="text-[#B87333]">.</span>ai
            </span>
          </Link>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] sm:block">
            Mapa pierwszego procesu AI
          </span>
        </div>
      </header>

      <main>
        <section className="px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-16">
          <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,_0.9fr)_minmax(500px,_1.1fr)] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#D4D4D4] bg-white px-3 py-1.5">
                <span className="block h-1.5 w-1.5 rounded-full bg-[#10B981]" aria-hidden="true" />
                <span className="font-mono text-[11px] tracking-normal text-[#525252]">
                  Bezpłatny raport dla firm
                </span>
              </div>

              <h1 className="mt-7 max-w-[760px] text-[#0A0A0A]">
                Znajdź pierwszy proces, który AI może przejąć w Twojej firmie.
              </h1>

              <p className="mt-6 max-w-[680px] text-[18px] leading-[1.6] text-[#525252]">
                Na podstawie formularza oraz publicznych źródeł firmy przygotujemy spersonalizowany, 2-stronicowy raport PDF. Raport wyślemy na podany email.
              </p>

              <div className="mt-7 grid max-w-[680px] grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "skala ręcznej pracy w jednym procesie",
                  "fakty z publicznie dostępnych materiałów",
                  "jeden rekomendowany system na start",
                  "sposób pomiaru pierwszego efektu",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-[14px] leading-[1.5] text-[#525252]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#F5EDE6] text-[#8B4513]" style={{ borderRadius: 4 }}>
                      <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9">
                <Link
                  href="#formularz"
                  className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-[1px] hover:bg-[#B87333] sm:w-auto"
                  style={{ borderRadius: 4 }}
                >
                  Sprawdź pierwszy proces
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <p className="mt-3 text-[12px] leading-[1.5] text-[#737373]">
                  Dwa krótkie kroki. Nie potrzebujemy dostępu do prywatnych systemów ani plików.
                </p>
              </div>
            </div>

            <div
              className="border border-[#D4D4D4] bg-[#EFEFEF] p-4 shadow-[0_24px_64px_rgba(10,10,10,0.08)] md:p-5"
              style={{ borderRadius: 6 }}
              aria-label="Podgląd dwóch stron raportu"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#737373]">Podgląd raportu</p>
                  <p className="mt-1 text-[13px] font-medium text-[#0A0A0A]">Mapa pierwszego procesu AI</p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center bg-white text-[#8B4513]" style={{ borderRadius: 4 }}>
                  <SearchCheck size={18} aria-hidden="true" />
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {reportPages.map((reportPage) => (
                  <article
                    key={reportPage.page}
                    className="flex min-h-[330px] flex-col border border-[#E5E5E5] bg-white p-5 shadow-[0_8px_24px_rgba(10,10,10,0.06)]"
                    style={{ borderRadius: 3 }}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-[#E5E5E5] pb-4">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#B87333]">LessManual.ai</p>
                        <h2 className="mt-2 text-[19px] leading-[1.2] text-[#0A0A0A]">{reportPage.title}</h2>
                      </div>
                      <span className="font-mono text-[10px] text-[#737373]">{reportPage.page}</span>
                    </div>

                    <div className="mt-5 space-y-5">
                      {reportPage.sections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <div key={section.title} className="grid grid-cols-[28px_minmax(0,_1fr)] gap-3">
                            <span className="flex h-7 w-7 items-center justify-center bg-[#F5EDE6] text-[#8B4513]" style={{ borderRadius: 4 }}>
                              <Icon size={14} aria-hidden="true" />
                            </span>
                            <div>
                              <h3 className="text-[13px] font-medium leading-[1.35] text-[#0A0A0A]">{section.title}</h3>
                              <p className="mt-1 text-[11px] leading-[1.5] text-[#737373]">{section.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-auto border-t border-[#E5E5E5] pt-3">
                      <div className="h-1.5 w-16 bg-[#C4956A]" />
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-3 text-[11px] leading-[1.5] text-[#737373]">
                Przykładowy układ. Wnioski i rekomendacje będą wynikać z danych Twojej firmy.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E5E5E5] bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                  Droga do pierwszego mierzalnego wdrożenia
                </div>
                <h2 className="mt-4 max-w-[520px]">Raport ma prowadzić do decyzji, którą można sprawdzić w praktyce.</h2>
              </div>
              <p className="max-w-[600px] text-[16px] leading-[1.65] text-[#525252] md:justify-self-end">
                Każdy etap porządkuje kolejną decyzję. Celem nie jest zbieranie punktów ani kolejnych materiałów, tylko wybór jednego procesu i pomiar pierwszego wyniku.
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 border-l border-[#D4D4D4] sm:grid-cols-5 sm:border-l-0 sm:border-t">
              {journeyStages.map((stage, index) => (
                <li key={stage} className="relative px-5 py-4 sm:px-3 sm:pt-6">
                  <span className="absolute -left-[5px] top-5 h-[9px] w-[9px] rounded-full border-2 border-white bg-[#B87333] sm:-top-[5px] sm:left-3" aria-hidden="true" />
                  <span className="font-mono text-[10px] text-[#B87333]">0{index + 1}</span>
                  <span className="mt-1 block text-[13px] font-medium text-[#0A0A0A]">{stage}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="formularz" className="scroll-mt-6 px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                Twoja firma
              </div>
              <h2 className="mt-4 max-w-[460px]">Opisz jeden proces. Resztę oprzemy na faktach.</h2>
              <p className="mt-5 max-w-[500px] text-[16px] leading-[1.65] text-[#525252]">
                Podaj przybliżony tygodniowy wolumen i czas ręcznej pracy. Dzięki temu rekomendacja zacznie się od realnego punktu odniesienia, a nie ogólnej listy pomysłów.
              </p>

              <div className="mt-7 space-y-4 border-t border-[#E5E5E5] pt-6">
                <div className="flex items-start gap-3">
                  <Gauge size={18} className="mt-0.5 shrink-0 text-[#8B4513]" aria-hidden="true" />
                  <p className="text-[13px] leading-[1.55] text-[#525252]">Przybliżone liczby wystarczą. Raport nie jest wyceną ani obietnicą wyniku.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#8B4513]" aria-hidden="true" />
                  <p className="text-[13px] leading-[1.55] text-[#525252]">Analizujemy formularz i publiczne materiały. Nie prosimy o loginy ani prywatne dokumenty.</p>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-[#E5E5E5] pt-6">
                <Image
                  src="/bartek.jpg"
                  alt="Bartłomiej Chudzik"
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8B4513]">
                    Projekt i kryteria tej mapy
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-[#0A0A0A]">Bartłomiej Chudzik</p>
                  <p className="text-[12px] leading-[1.5] text-[#737373]">CEO &amp; Solution Architect, LessManual</p>
                </div>
              </div>
            </div>

            <AIGrowthOpportunityMapForm />
          </div>
        </section>
      </main>

      <FooterV2 />
    </div>
  );
}
