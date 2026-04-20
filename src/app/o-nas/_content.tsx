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

// Dane timeline - tylko z profil.md, bez fabrykat
const TIMELINE_ITEMS = [
  {
    date: "02.2025",
    title: "Koniec etatu",
    desc: "Wyrzucony z Mondi Solec. Koniec 8 lat w transporcie i logistyce. Pierwszy raz w życiu sam wybieram, czym się zajmuję.",
  },
  {
    date: "03.2025",
    title: "All-in w AI",
    desc: "Decyzja o pełnym poświęceniu się automatyzacji. Samouk, darmowe źródła, 12 godzin dziennie, 6 dni tygodniowo.",
  },
  {
    date: "10.2025",
    title: "Założenie LessManual",
    desc: "Rejestracja JDG. Oficjalny start firmy. Buduję systemy AI dla firm B2B, które uwalniają je od ręcznej roboty.",
  },
  {
    date: "01.2026",
    title: "Pierwsza wycena dla Volvo",
    desc: "Przypadkowa oferta okazała się być dla Volvo. Poprowadziłem całe spotkanie po angielsku z Global IT Director i Prezesem Renault Trucks PL. PoC 28 500 PLN.",
  },
];

// Trzy wartości - z profil.md (praktyczność, jakość, szybkość)
const MANIFEST_ITEMS = [
  {
    label: "01",
    title: "Praktyczność ponad wszystko",
    desc: "Buduję tylko to, co rozwiązuje realny problem. Żaden system nie wychodzi z mojej pracowni, jeśli nie redukuje ręcznej roboty o minimum 70%. Efekt musi być mierzalny i widoczny w ciągu dni, nie miesięcy.",
  },
  {
    label: "02",
    title: "Jakość bez kompromisów",
    desc: "Nie robię rzeczy których się wstydzę. Każdy system który wdrażam, mógłbym pokazać publicznie z nazwą klienta. Jeśli coś nie działa - naprawiam, nie ukrywam. Gwarancja wyników albo zwrot.",
  },
  {
    label: "03",
    title: "Szybkość, która dostarcza",
    desc: "7-dniowy sprint od kontraktu do działającego systemu. Nie ma projektów które ciągną się miesiącami. Ship today, iteruj jutro. Czas klienta jest drogi, mój też.",
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
    desc: "Każdy projekt zamykam w 7 dni. Nie ma u mnie projektów które czekają w kolejce miesiącami. Jeśli biorę temat, to daję mu pełną uwagę i dostarczam na czas. Wolne sloty to wolne sloty, nie obietnica.",
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
                  które uwalniają ludzi od ręcznej, powtarzalnej roboty.
                </p>
                <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[#525252]">
                  Misja: "Make your business Less Manual". Każde rozwiązanie, które wychodzi
                  z mojej pracowni, redukuje ręczną robotę o minimum 70%.
                </p>
              </div>

              {/* Prawa: zdjęcie */}
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/bartek.jpg"
                  alt="Bartłomiej Chudzik - LessManual"
                  width={320}
                  height={320}
                  className="rounded-full object-cover border-4 border-[#E5E5E5] shadow-sm"
                  style={{ width: "clamp(200px, 30vw, 320px)", height: "clamp(200px, 30vw, 320px)" }}
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
              <SectionLabel>DROGA</SectionLabel>
              <h2>Jak dotarłem tutaj.</h2>
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
