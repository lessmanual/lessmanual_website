"use client";

import Image from "next/image";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { FinalCTAV2 } from "@/components/v2/FinalCTAV2";

// Sekcja label mono
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A3A3A3] mb-4">
      {children}
    </div>
  );
}

// Kontekst zawodowy - fokus na domain expertise, nie biografii
const TIMELINE_ITEMS = [
  {
    date: "2018-2025",
    title: "Optymalizacja procesów B2B",
    desc: "8 lat w transporcie i logistyce międzynarodowej. Projektowanie i wdrażanie procesów operacyjnych, integracje systemów ERP, redukcja ręcznej pracy w zespołach 20+ osób. Ten sam wzorzec: tam gdzie ludzie powtarzają tę samą czynność setki razy, zawsze jest lepszy system.",
  },
  {
    date: "03-09.2025",
    title: "Pełne przejście na AI",
    desc: "Intensywna budowa kompetencji technicznych: LLM agents, RAG, vector databases, Next.js, Supabase, Vercel, AWS. Od pierwszych prototypów do produkcyjnych workflow z klientami.",
  },
  {
    date: "10.2025",
    title: "Start LessManual",
    desc: "Rejestracja działalności. Pięć produktów core: Hot Lead Catcher, Pipeline Machine, Content Machine, Obsługa Klienta, Generator Ofert. Każdy to gotowy system z 7-dniowym sprintem developmentu (po wcześniejszym discovery, scope locku i przygotowaniu bazy wiedzy).",
  },
  {
    date: "11-12.2025",
    title: "Pierwsze wdrożenia",
    desc: "Projekty dla klientów z sektora logistyki, legal tech, e-commerce i SaaS. Od PoC po pełne wdrożenia MRR. Wszystkie dowiezione w zadeklarowanym terminie.",
  },
];

// Trzy wartości - z profil.md (praktyczność, jakość, szybkość)
const MANIFEST_ITEMS = [
  {
    label: "01",
    title: "Praktyczność ponad wszystko",
    desc: "Buduję tylko to, co rozwiązuje realny problem. Żaden system nie wychodzi z mojej pracowni, jeśli nie redukuje powtarzalnych czynności o minimum 70%. Efekt musi być mierzalny i widoczny w ciągu dni, nie miesięcy.",
  },
  {
    label: "02",
    title: "Jakość bez kompromisów",
    desc: "Nie robię rzeczy których się wstydzę. Każdy system który wdrażam, mógłbym pokazać publicznie z nazwą klienta. Jeśli coś nie działa - naprawiam, nie ukrywam. Gwarancja wyników albo zwrot.",
  },
  {
    label: "03",
    title: "Szybkość, która dostarcza",
    desc: "Proces: 1-2 spotkania discovery (ICP, zakres, integracje, narzędzia, workflow) → scope lock i PRD → 2-5 dni baza wiedzy i prompty → 7-dniowy sprint developmentu → handover. Razem 3-4 tygodnie od pierwszego calla do live. Bez projektów, które ciągną się miesiącami.",
  },
];

// Trzy zasady pracy
const HOW_ITEMS = [
  {
    label: "ZASADA 01",
    title: "Zero godzin",
    desc: "Nie wyceniam czasu, wyceniam efekt. Klient płaci za działający system z konkretnymi wynikami, nie za moje godziny. Cena jest stała i ustalona przed startem. Żadnych niespodzianek na fakturze.",
  },
  {
    label: "ZASADA 02",
    title: "Szybko, a nie kiedyś",
    desc: "Sam sprint developmentu zamykam w 7 dni po dogranym zakresie. Cały proces od kontraktu do live: 3-4 tygodnie kalendarzowo. Nie ma u mnie projektów, które czekają w kolejce miesiącami. Jeśli biorę temat, daję mu pełną uwagę i dostarczam na czas.",
  },
  {
    label: "ZASADA 03",
    title: "Gwarancja albo zwrot",
    desc: "Jeśli system nie działa zgodnie z ustaleniami w 14 dni od wdrożenia, oddaję pieniądze. Bez dyskusji, bez kar, bez okresu wypowiedzenia. Ryzyko jest po mojej stronie, nie po stronie klienta.",
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
                  które nie wymagają<br />
                  <span className="text-[#B87333]">obsługi.</span>
                </h1>
                <p className="mt-8 max-w-[560px] text-[17px] leading-[1.6] text-[#525252]">
                  Bartłomiej Chudzik. Solo founder, architekt automatyzacji AI.
                  Przez 8 lat pracowałem w transporcie i logistyce, optymalizowałem procesy
                  i zarządzałem projektami. Dziś buduję systemy AI dla firm B2B w Polsce,
                  które zdejmują z ludzi ręczne, powtarzalne zadania.
                </p>
                <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[#525252]">
                  Misja: "Make your business Less Manual". Każde rozwiązanie, które wychodzi
                  z mojej pracowni, redukuje ręczne operacje o minimum 70%.
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {MANIFEST_ITEMS.map((item) => (
                <div key={item.label} className="bg-[#FAFAFA] p-8 md:p-10">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B87333] mb-4">
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

                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B87333] mb-1">
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
              <h2>Trzy zasady. Bez wyjątków.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="border border-[#E5E5E5] bg-[#FAFAFA] p-8"
                  style={{ borderRadius: 8 }}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A3A3A3] mb-4">
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
            <p className="font-mono text-[11px] text-[#A3A3A3] text-center">
              LessManual Bartłomiej Chudzik | NIP 1231589909 | Cendrowice, ul. Długa 33 | JDG od 09.10.2025
            </p>
          </div>
        </div>
      </main>

      <FooterV2 />
    </>
  );
}
