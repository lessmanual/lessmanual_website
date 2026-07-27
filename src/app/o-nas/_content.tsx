"use client";

import Image from "next/image";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { FinalCTAV2 } from "@/components/v2/FinalCTAV2";

// Sekcja label mono
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
      {children}
    </div>
  );
}

// Kontekst zawodowy - fokus na domain expertise, nie biografii
const TIMELINE_ITEMS = [
  {
    date: "2018-2025",
    title: "Optymalizacja procesów B2B",
    desc: "8 lat w transporcie i logistyce międzynarodowej. Praca z procesami operacyjnymi, integracjami ERP, wyjątkami i odpowiedzialnością za działający system.",
  },
  {
    date: "2025",
    title: "Budowa kompetencji AI",
    desc: "Agenci AI, bazy wiedzy, aplikacje webowe i infrastruktura chmurowa. Od pierwszych prototypów do systemów pracujących na danych firm.",
  },
  {
    date: "10.2025",
    title: "Start LessManual",
    desc: "Powstała firma skupiona na automatyzacji sprzedaży, contentu, obsługi klienta i ofertowania. Każdy projekt zaczyna się od jednego procesu i mierzalnego kryterium wyniku.",
  },
  {
    date: "2025-2026",
    title: "Wdrożenia dla firm B2B",
    desc: "Projekty od diagnozy do uruchomienia. Osobiście odpowiadam za architekturę, budowę, testy oraz dalsze utrzymanie systemu.",
  },
];

// Trzy wartości - z profil.md (praktyczność, jakość, szybkość)
const MANIFEST_ITEMS = [
  {
    label: "01",
    title: "Praktyczność ponad wszystko",
    desc: "Zaczynam od kosztu ręcznej pracy i wyniku, który da się zmierzyć. Jeśli automatyzacja nie ma sensu, mówię to przed rozpoczęciem projektu.",
  },
  {
    label: "02",
    title: "Jakość bez kompromisów",
    desc: "System pracuje na zatwierdzonych źródłach, ma reguły działania, kontrolę wyniku i ścieżkę do człowieka. Kryteria odbioru ustalamy przed startem.",
  },
  {
    label: "03",
    title: "Mały zakres na początek",
    desc: "Projekt dzielę na diagnozę, pilotaż, uruchomienie i utrzymanie. Termin zależy od danych, integracji, liczby wyjątków oraz zakresu testów.",
  },
  {
    label: "04",
    title: "Odpowiedzialność po wdrożeniu",
    desc: "Po uruchomieniu sprawdzamy ustalone miary, logi i przypadki wymagające poprawy. System ma właściciela, plan utrzymania i jasne zasady eskalacji.",
  },
];

// Trzy zasady pracy
const HOW_ITEMS = [
  {
    label: "ZASADA 01",
    title: "Cena przed startem",
    desc: "Po diagnozie dostajesz zakres, wycenę, kryteria wyniku i sposób utrzymania. Zmiany uzgadniamy przed rozpoczęciem dodatkowych prac.",
  },
  {
    label: "ZASADA 02",
    title: "Jeden proces na początek",
    desc: "Najpierw uruchamiamy ograniczony pilotaż i sprawdzamy wynik. Kolejne elementy dokładamy dopiero wtedy, gdy pierwszy zakres działa.",
  },
  {
    label: "ZASADA 03",
    title: "Kontrola po uruchomieniu",
    desc: "Mierzymy uzgodnione kryteria, analizujemy błędy i poprawiamy system w ramach ustalonej opieki. Przypadki o większym ryzyku trafiają do człowieka.",
  },
  {
    label: "ZASADA 04",
    title: "Jasne granice działania",
    desc: "Agent działa tylko w uzgodnionym zakresie. Nie podejmuje samodzielnie decyzji, których nie obejmują reguły i dane przygotowane do wdrożenia.",
  },
];

export default function ONasContent() {
  return (
    <>
      <HeaderV2 />

      <main>
        {/* Sekcja 1 - Hero */}
        <section className="px-6 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1.3fr)_minmax(0,_0.7fr)] gap-12 lg:gap-20 items-center">
              {/* Lewa: tekst */}
              <div>
                <SectionLabel>O NAS</SectionLabel>
                <h1>
                  Buduję systemy,<br />
                  które zdejmują<br />
                  <span className="text-[#B87333]">ręczną pracę.</span>
                </h1>
                <p className="mt-8 max-w-[560px] text-[17px] leading-[1.6] text-[#525252]">
                  Bartłomiej Chudzik. Solo founder, architekt automatyzacji AI.
                  Przez 8 lat pracowałem w transporcie i logistyce, optymalizowałem procesy
                  i zarządzałem projektami. Dziś buduję systemy AI dla firm B2B w Polsce,
                  które zdejmują z ludzi ręczne, powtarzalne zadania.
                </p>
                <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[#525252]">
                  Misja LessManual jest prosta: mniej ręcznego przekładania danych,
                  więcej czasu na decyzje, klientów i rozwój firmy.
                </p>
              </div>

              {/* Prawa: zdjęcie */}
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/bartek.jpg"
                  alt="Bartłomiej Chudzik - LessManual"
                  width={320}
                  height={320}
                  className="rounded-full border-4 border-[#E5E5E5] shadow-sm"
                  style={{
                    width: "clamp(200px, 30vw, 320px)",
                    height: "clamp(200px, 30vw, 320px)",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja 2 - Manifest */}
        <section className="px-6 md:px-10 py-24 md:py-36 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>DLACZEGO</SectionLabel>
              <h2>Mniej manual. Więcej efektu.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {MANIFEST_ITEMS.map((item) => (
                <div key={item.label} className="bg-[#FAFAFA] p-8 md:p-10">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513] mb-4">
                    {item.label}
                  </div>
                  <h3 className="mb-4 text-[#0A0A0A]">{item.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-[#525252]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja 3 - Timeline */}
        <section className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>KONTEKST</SectionLabel>
              <h2>Skąd to doświadczenie.</h2>
            </header>

            <div className="relative max-w-[760px]">
              {/* Pionowa linia */}
              <div
                className="absolute left-[7px] top-2 bottom-2 w-px bg-[#B87333]/30"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-10">
                {TIMELINE_ITEMS.map((item, i) => (
                  <div key={i} className="relative pl-10">
                    {/* Kropka */}
                    <div
                      className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-[#B87333] bg-[#FAFAFA]"
                      aria-hidden="true"
                    />

                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513] mb-1">
                      {item.date}
                    </div>
                    <h3 className="mb-2 text-[#0A0A0A]">{item.title}</h3>
                    <p className="text-[15px] leading-[1.65] text-[#525252]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sekcja 4 - Jak pracuję */}
        <section className="px-6 md:px-10 py-24 md:py-36 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>JAK</SectionLabel>
              <h2>Zasady współpracy.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {HOW_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="border border-[#E5E5E5] bg-[#FAFAFA] p-8"
                  style={{ borderRadius: 8 }}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
                    {item.label}
                  </div>
                  <h3 className="mb-4 text-[#0A0A0A]">{item.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-[#525252]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sekcja 5 - Final CTA */}
        <FinalCTAV2 />

        {/* Stopka firmowa */}
        <div className="px-6 md:px-10 pb-8 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-mono text-[11px] text-[#737373] text-center">
              LessManual Bartłomiej Chudzik | NIP 1231589909 | Cendrowice, ul. Długa 33 | JDG od 09.10.2025
            </p>
          </div>
        </div>
      </main>

      <FooterV2 />
    </>
  );
}
