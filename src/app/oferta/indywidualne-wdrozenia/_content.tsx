"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { CALENDLY_URL, EMAIL } from "@/lib/constants";
import { MRRIncludes } from "@/components/v2/MRRIncludes";

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
      {children}
    </div>
  );
}

// ── FAQ data ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Ile kosztuje wdrożenie indywidualne?",
    a: "Zależy od zakresu. Zaczynamy od bezpłatnej 30-minutowej rozmowy wstępnej - oceniam czy Twój projekt kwalifikuje się do Indywidualnych Wdrożeń. Budżety projektowe od 15 000 PLN wzwyż - bez górnej granicy, zależnie od złożoności. Wycena finalna po Discovery Workshop.",
  },
  {
    q: "Ile trwa wdrożenie?",
    a: "4-12 tygodni zależnie od complexity. Pilot (jeden proces, max 3 integracje): 28 dni - Discovery 7 + Build 14 + UAT 7. Większe wdrożenia (multi-departament, 5+ integracji): 8-12 tygodni. Timeline ustalamy razem w dokumencie Discovery - zanim zacznę pisać kod, masz konkretny kalendarz.",
  },
  {
    q: "Czy moja branża jest zbyt specyficzna?",
    a: "Indywidualne Wdrożenia istnieją właśnie dlatego że niektóre branże i procesy są zbyt specyficzne dla standardowych produktów. Pracowałem z logistyką, produkcją, medtech, doradztwem inwestycyjnym, branżą prawną. Jeśli masz powtarzalny proces który łączy 3+ systemy albo wymaga wiedzy domenowej - to mój territory.",
  },
  {
    q: "Czy nie jest to ryzykowne w porównaniu do gotowych produktów?",
    a: "3 warstwy gwarancji eliminują ryzyko. Po pierwsze: wycena finalna dopiero po Discovery - nie płacisz za nieznany zakres. Po drugie: 50% przy starcie Pilota, 50% po UAT i Twojej akceptacji - nie płacisz za coś czego nie zatwierdziłeś. Po trzecie: jeśli nie dostarczyłbym w terminie z mojej winy - kolejny miesiąc wsparcia gratis.",
  },
  {
    q: "Co jeśli mój przypadek to tylko inna konfiguracja Pipeline Machine albo innego produktu?",
    a: "Wtedy proponuję Pipeline Machine (lub inny standardowy produkt) - i dostarczam szybciej i taniej. Discovery zawsze zaczyna od mapowania: czy to custom czy standard. Zdarza się że klient przychodzi z 'potrzebuję agenta X' i po 30-minutowej rozmowie okazuje się że Pipeline Machine rozwiązuje 80% problemu. Nie mam powodu żeby sprzedawać droższe rozwiązanie gdy tańsze działa.",
  },
  {
    q: "Czy mogę zrezygnować po Discovery Workshop?",
    a: "Tak. Discovery kończy się dokumentem: architektura systemu, zakres prac, timeline, wycena finalna. Możesz z tym dokumentem iść do innego wykonawcy - bez pytań. Jeśli po Discovery zdecydujesz się kontynuować, fee Discovery zalicza się na poczet projektu. Jeśli nie - płacisz tylko za Discovery.",
  },
  {
    q: "Jak wygląda wsparcie po wdrożeniu?",
    a: "3 miesiące wsparcia w cenie: bug fixes, drobne modyfikacje zakresu (do 4h miesięcznie), monitoring dashboardu, miesięczny call review. Po 3 miesiącach: retainer wsparcia (wycena indywidualna) lub przekazanie dokumentacji i kodu Twojemu zespołowi IT. Dedykowany monitoring z reakcją do 4h na incydenty.",
  },
  {
    q: "Kto będzie robił deployment i czy dane są bezpieczne?",
    a: "Buduję i deployuję sam - nie przekazuję projektu podwykonawcom bez Twojej wiedzy. Dane nigdy nie opuszczają infrastruktury którą wspólnie ustalamy (Twój AWS, GCP lub mój - zależnie od specyfiki). NDA podpisujemy przed pierwszą sesją Discovery. Architektura opisana w dokumencie Discovery zanim zacznę budować.",
  },
];

// ── FAQ accordion item ────────────────────────────────────────────────────────

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-ind-panel-${idx}`;
  return (
    <div className="border-b border-[#E5E5E5] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-[#0A0A0A]">{q}</span>
        <span
          className="font-mono text-[18px] text-[#B87333] leading-none mt-0.5 shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <p id={panelId} className="pb-5 text-[15px] leading-[1.65] text-[#525252]">
          {a}
        </p>
      )}
    </div>
  );
}

// ── Main content ───────────────────────────────────────────────────────────────

export default function IndywidualneContent() {
  return (
    <>
      <HeaderV2 />

      <main>

        {/* ── 1. HERO ── */}
        <section className="relative px-6 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">

            <div className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-3 py-1.5 mb-8">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              <span className="font-mono text-[11px] tracking-tight text-[#525252]">
                Max 5 klientów miesięcznie. Ostatnie miejsce w maju.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_1fr)] gap-12 lg:gap-16 items-start">
              <div>
                <h1 className="text-[#0A0A0A]">
                  Twój proces jest zbyt specyficzny<br />
                  na standardowy produkt.<br />
                  <span className="text-[#B87333]">Zbudujemy go od zera.</span>
                </h1>

                <p className="mt-8 max-w-[560px] text-[17px] leading-[1.55] text-[#525252]">
                  Masz workflow którego nie da się wcisnąć w gotowe narzędzie. Każda agencja mówi &quot;sorry, to niestandardowe&quot;. My to lubimy. Zaczynamy od 30-minutowej rozmowy bezpłatnej. Oceniam czy to dla nas i co dokładnie zbudować.
                </p>

                <p className="mt-4 max-w-[560px] text-[15px] leading-[1.55] text-[#525252]">
                  Budżety od 15 000 PLN wzwyż. Wycena projektowa - nie godzinowa. 3 warstwy gwarancji.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
                    style={{ borderRadius: 4 }}
                  >
                    Zarezerwuj konsultacje (30 min)
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                  </Link>
                  <Link
                    href="#jak-wyceniamy"
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-6 py-3.5 text-[14px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#0A0A0A] hover:-translate-y-[1px]"
                    style={{ borderRadius: 4 }}
                  >
                    Zobacz proces wyceny
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { num: "30 min", label: "Bezpłatna rozmowa wstępna - oceniamy czy to dla Ciebie" },
                  { num: "28 dni", label: "Od kickoffu do działającego agenta na produkcji (Pilot)" },
                  { num: "1-2h", label: "Twojego czasu tygodniowo w trakcie budowy - resztę robimy my" },
                  { num: "3", label: "Warstwy gwarancji - nie akceptujesz deliverable, nie płacisz drugiej raty" },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="bg-white border border-[#E5E5E5] px-6 py-5 flex items-center gap-5"
                    style={{ borderRadius: 8 }}
                  >
                    <span className="font-mono text-[28px] font-medium text-[#B87333] leading-none shrink-0">
                      {item.num}
                    </span>
                    <span className="text-[14px] leading-[1.5] text-[#525252]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. DLA KOGO ── */}
        <section id="dla-kogo" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <div>
                <SectionLabel>DLA KOGO</SectionLabel>
                <h2 className="mb-8">To jest dla Ciebie jeśli...</h2>
                <ul className="flex flex-col gap-4">
                  {[
                    "Rozmawiałeś z agencją AI i usłyszałeś 'nasze standardowe pakiety tu nie pasują'",
                    "Masz unikalny workflow który łączy 3+ systemy (ERP, CRM, własna baza, legacy software)",
                    "Twoja branża jest na tyle niszowa że gotowe rozwiązania 'prawie działają' ale nie radzą sobie z Twoimi edge casami",
                    "Chcesz wdrożyć AI w kilku działach naraz - sprzedaż, obsługa klienta, operacje",
                    "Jesteś CEO lub COO z horyzontem 6-12 miesięcy na ROI i potrzebujesz pewności co do zakresu i ceny przed startem",
                    "Próbowałem SaaS który 'prawie działał' ale nie radził sobie ze specyfiką Twojego procesu",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] text-[#525252] leading-[1.65]">
                      <span className="text-[#B87333] mt-1 shrink-0" aria-hidden="true">+</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionLabel>CZEGO TO NIE JEST</SectionLabel>
                <h2 className="mb-8">To nie jest dla Ciebie jeśli...</h2>
                <ul className="flex flex-col gap-4">
                  {[
                    "Szukasz szablonowego chatbota który odpowiada na FAQ - mamy do tego Obsługę Klienta AI",
                    "Potrzebujesz systemu cold email + LinkedIn - to Pipeline Machine",
                    "Twój workflow jest w zasadzie standardowy, tylko chcesz custom brandingu",
                    "Przychodzisz z 'zróbcie coś z AI, zobaczymy' bez konkretnego procesu do zautomatyzowania",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] text-[#525252] leading-[1.65]">
                      <span className="text-[#737373] mt-1 shrink-0" aria-hidden="true">-</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <blockquote className="mt-8 border-l-2 border-[#B87333] pl-5 text-[15px] leading-[1.7] text-[#525252] italic">
                  &ldquo;Wygląda jakbyś miał proces który jest jednocześnie Twoją największą przewagą i Twoim największym bólem - bo nikt nie może go skopiować, ale też nikt nie może Ci w nim pomóc.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. JAK WYCENIAMY ── */}
        <section id="jak-wyceniamy" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA] border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>JAK WYCENIAMY</SectionLabel>
              <h2>Wycena indywidualna - nie godzinowa. 4 kroki zanim zacznę budować.</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-[#525252]">
                Nie podaję cen z góry bez wiedzy co buduję. Ale nie zostawiam Cię z &quot;wycenimy po rozmowie&quot; bez struktury. Masz poniżej cały proces - wiesz czego się spodziewać i kiedy.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {[
                {
                  num: "01",
                  title: "30-MINUTOWA ROZMOWA",
                  sub: "Bezpłatna",
                  desc: "Opisujesz w 3-4 zdaniach co chcesz zautomatyzować i jakie systemy masz w firmie. Oceniam czy to dla mnie i czy Indywidualne Wdrożenie ma sens, czy któryś standardowy produkt wystarczy. Wychodzisz z jasną odpowiedzią - nie z 'zadzwonimy'.",
                },
                {
                  num: "02",
                  title: "DISCOVERY WORKSHOP",
                  sub: "Opcjonalnie, jeśli potrzebny",
                  desc: "Sesja 2-3h z Tobą i kluczowymi osobami z firmy. Mapujemy workflow, identyfikujemy gdzie agent daje największy ROI, definiujemy scope i KPIs. Na końcu: architektura systemu, zakres prac, timeline. Możesz z tym dokumentem iść do innego wykonawcy.",
                },
                {
                  num: "03",
                  title: "SCOPING DOKUMENT",
                  sub: "W ciągu 3 dni",
                  desc: "Po Discovery dostajesz: diagram systemu, listę integracji, stack techniczny, szacowany czas i cenę finalną. Zero surprises w połowie projektu. Akceptujesz albo nie - bez presji. Discovery zalicza się na poczet projektu jeśli kontynuujesz.",
                },
                {
                  num: "04",
                  title: "WYCENA PROJEKTOWA",
                  sub: "Budżety od 15 000 PLN",
                  desc: "Stała cena za projekt - nie godzinowa. Wiesz z góry ile zapłacisz i co dostajesz. 50% przy starcie Pilota, 50% po UAT i Twojej akceptacji systemu. Nie akceptujesz - nie płacisz drugiej raty.",
                },
              ].map((s) => (
                <div key={s.num} className="bg-[#FAFAFA] p-8 md:p-10">
                  <span className="font-mono text-[56px] font-medium leading-none tracking-tight text-[#B87333] block mb-2">
                    {s.num}
                  </span>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                    {s.title}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8B4513] mb-4">
                    {s.sub}
                  </div>
                  <p className="text-[15px] leading-[1.65] text-[#525252]">{s.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[13px] text-[#525252]">
              Budżet anchor: projekty indywidualne od 15 000 PLN wzwyż. Bez górnej granicy - zależy od zakresu i złożoności.
            </p>
          </div>
        </section>

        {/* ── 4. DELIVERY ── */}
        <section id="jak-dziala" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>DELIVERY</SectionLabel>
              <h2>Od Discovery do działającego systemu na produkcji.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
              {[
                {
                  num: "1",
                  title: "Discovery",
                  duration: "Tydzień 1",
                  desc: "Sesja z Tobą + kluczowe osoby z firmy. Mapowanie workflow, definicja KPIs, architektura systemu. Deliverable: scoping dokument.",
                },
                {
                  num: "2",
                  title: "Architecture",
                  duration: "Tydzień 1-2",
                  desc: "Projekt techniczny: stack, integracje, data flows. Wszystko black on white zanim zacznę kodować. Akceptujesz architekturę lub proponujesz zmiany.",
                },
                {
                  num: "3",
                  title: "Pilot Build",
                  duration: "Tydzień 2-4",
                  desc: "2 check-iny tygodniowo po 30 min. Wszystko w jednym Notion workspace - widzisz każdy etap. Ty: 1-2h tygodniowo wiedzy domenowej. My: reszta.",
                },
                {
                  num: "4",
                  title: "UAT",
                  duration: "Tydzień 4-5",
                  desc: "Tydzień testów akceptacyjnych na Twoich realnych danych. Lista bugów z priorytetami, fix każdego przed go-live. Zero surprises na produkcji.",
                },
                {
                  num: "5",
                  title: "Production + Support",
                  duration: "Go-live + 3 miesiące",
                  desc: "Wdrożenie z monitoringiem przez pierwsze 48 godzin. 3 miesiące wsparcia w cenie: bug fixes, drobne zmiany, miesięczny call review.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-white border border-[#E5E5E5] p-6 flex flex-col gap-3"
                  style={{ borderRadius: 8 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[40px] font-medium text-[#B87333] leading-none">
                      {step.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#737373]">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-medium text-[#0A0A0A]">{step.title}</h3>
                  <p className="text-[13px] leading-[1.6] text-[#525252]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. BUNDLE STACK ── */}
        <section id="co-dostajesz" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CO DOSTAJESZ</SectionLabel>
              <h2>W każdym projekcie - bez wyjątków.</h2>
            </header>

            <div className="overflow-x-auto">
              <table
                className="w-full border-collapse border border-[#E5E5E5] bg-white"
                style={{ borderRadius: 8 }}
              >
                <thead>
                  <tr className="border-b border-[#E5E5E5]">
                    <th className="text-left px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                      Co dostajesz
                    </th>
                    <th className="text-left px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                      Wartość standalone
                    </th>
                    <th className="text-left px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                      W każdym projekcie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: "Discovery Workshop (sesja + deliverable architektura)", value: "4 000 PLN" },
                    { item: "Architektura systemu i dokumentacja techniczna", value: "5 000 PLN" },
                    { item: "Build agenta / systemu agentow (core projektu)", value: "indywidualnie" },
                    { item: "Integracje z Twoimi systemami (ERP, CRM, własne API)", value: "3 000-8 000 PLN" },
                    { item: "UAT i testy akceptacyjne na realnych danych", value: "2 000 PLN" },
                    { item: "Dashboard monitoringu i raportowania", value: "3 000 PLN" },
                    { item: "Dokumentacja użytkownika (jak obsługiwać, jak edytować)", value: "2 000 PLN" },
                    { item: "Wsparcie 3 miesiące po wdrożeniu (bug fixes + drobne zmiany)", value: "4 500 PLN" },
                    { item: "Nagranie sesji onboardingowej dla Twojego zespolu", value: "1 000 PLN" },
                  ].map((row) => (
                    <tr key={row.item} className="border-b border-[#E5E5E5] last:border-b-0">
                      <td className="px-6 py-4 text-[14px] text-[#0A0A0A]">{row.item}</td>
                      <td className="px-6 py-4 text-[14px] text-[#525252] font-mono">{row.value}</td>
                      <td className="px-6 py-4">
                        <span className="text-[#10B981] font-medium text-[14px]">TAK</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 6. GWARANCJE ── */}
        <section id="gwarancje" className="px-6 md:px-10 py-24 md:py-36 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>GWARANCJE</SectionLabel>
              <h2>3 warstwy ochrony. Jeśli nie dostarczę - nie płacisz.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  layer: "Warstwa 1",
                  title: "Discovery bez ryzyka",
                  desc: "Jeśli po Discovery Workshop scope jest niemożliwy do zdefiniowania lub projekt nie kwalifikuje się - zwracam 50% Discovery fee. Przelew w 7 dni roboczych. Bez pytań.",
                },
                {
                  layer: "Warstwa 2",
                  title: "Pilot na czas",
                  desc: "Jeśli Pilot nie zostanie dostarczony w uzgodnionym terminie z mojej winy - następny miesiąc wsparcia gratis. Opóźnienie powyżej 14 dni - zwrot 25% wartości projektu.",
                },
                {
                  layer: "Warstwa 3",
                  title: "Działa albo nie płacisz reszty",
                  desc: "50% przy starcie Pilota, 50% po UAT i Twojej akceptacji. Nie akceptujesz deliverable (agent nie spełnia zdefiniowanego w SoW zakresu) - nie płacisz drugiej raty. 7 dni na fix lub pełny zwrot pierwszej raty.",
                },
              ].map((g) => (
                <div
                  key={g.layer}
                  className="bg-[#FAFAFA] border border-[#E5E5E5] p-8 flex flex-col gap-4"
                  style={{ borderRadius: 8 }}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">
                    {g.layer}
                  </div>
                  <h3 className="text-[16px] font-medium text-[#0A0A0A]">{g.title}</h3>
                  <p className="text-[14px] leading-[1.65] text-[#525252]">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. MRR INCLUDES ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[720px]">
              <MRRIncludes product="indywidualne" tier="CUSTOM" />
            </div>
          </div>
        </section>

        {/* ── 8. CASE STUDY PLACEHOLDER ── */}
        <section id="case-studies" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 max-w-[720px]">
              <SectionLabel>CASE STUDIES</SectionLabel>
              <h2>Case studies</h2>
            </header>

            <div
              className="border border-dashed border-[#E5E5E5] bg-[#FAFAFA] p-10 max-w-[640px]"
              style={{ borderRadius: 8 }}
            >
              <p className="text-[16px] leading-[1.7] text-[#525252]">
                Pierwsze projekty indywidualne zamykamy w Q2 2026. Case studies udostępnimy gdy klienci zatwierdzą publiczną publikację.
              </p>
              <p className="mt-4 font-mono text-[11px] text-[#737373]">
                Pełne liczby i przykładowe scope na rozmowie 30-min.
              </p>
              {/* TODO Bartek: dodac case studies (Drinks2Cash, BP2, Karat) gdy projekty zamkniete + client approval */}
            </div>
          </div>
        </section>

        {/* ── 9. FAQ ── */}
        <section id="faq" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 max-w-[720px]">
              <SectionLabel>PYTANIA</SectionLabel>
              <h2>Najczęstsze pytania o Indywidualne Wdrożenia.</h2>
            </header>

            <div className="max-w-[800px] border border-[#E5E5E5] bg-white px-8" style={{ borderRadius: 8 }}>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={item.q} q={item.q} a={item.a} idx={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. CROSS-SELL ── */}
        <section className="px-6 md:px-10 py-16 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-8 max-w-[720px]">
              <SectionLabel>A MOŻE SZUKASZ CZEGOŚ GOTOWEGO?</SectionLabel>
              <p className="text-[15px] leading-[1.65] text-[#525252]">
                Indywidualne Wdrożenia to oferta dla złożonych przypadków. Jeśli Twój proces pasuje do jednego z poniższych - dostarczę szybciej i taniej:
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "Pipeline Machine", desc: "System cold email + LinkedIn który umawia spotkania. Płacisz za wynik.", href: "/oferta/pipeline-machine" },
                { title: "Hot Lead Catcher", desc: "Monitoring sygnałów zakupowych, alertuje gdy firma z Twojego ICP jest w oknie zakupowym.", href: "/oferta/hot-lead-catcher" },
                { title: "Obsługa Klienta AI", desc: "Chatbot + voice agent 24/7, integracja z WhatsApp i email.", href: "/oferta/obsluga-klienta" },
                { title: "Generator Ofert", desc: "Klient sam wycenia na Twojej stronie. Ty dostajesz gotowe zapytanie z PDF.", href: "/oferta/generator-ofert" },
                { title: "Content Machine", desc: "10-30 artykułów miesięcznie pisanych przez agenta AI, optymalizowanych pod Google + social media (LinkedIn, X, IG).", href: "/oferta/content-machine" },
              ].map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="bg-[#FAFAFA] border border-[#E5E5E5] p-5 flex flex-col gap-2 transition-all duration-200 hover:border-[#B87333] hover:-translate-y-[1px]"
                  style={{ borderRadius: 8 }}
                >
                  <span className="text-[14px] font-medium text-[#0A0A0A]">{p.title}</span>
                  <span className="text-[12px] leading-[1.5] text-[#737373]">{p.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. FINAL CTA ── */}
        <section id="kontakt" className="px-6 md:px-10 py-24 md:py-36 bg-[#F5EDE6]">
          <div className="mx-auto max-w-[1440px] text-center">

            <div className="inline-flex items-center gap-2 border border-[#C4956A] bg-white px-3 py-1.5 mb-8">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              <span className="font-mono text-[11px] tracking-tight text-[#525252]">
                Max 5 klientów miesięcznie. Ostatnie miejsce w maju.
              </span>
            </div>

            <h2 className="mx-auto max-w-[800px]">
              Nie wiem czy Twój projekt się kwalifikuje. Sprawdźmy to razem.
            </h2>

            <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.55] text-[#525252]">
              30 minut rozmowy. Opisz w 3-4 zdaniach co chcesz zautomatyzować i jakie systemy masz w firmie. Oceniam czy to dla mnie i odpisuję w ciągu 24 godzin. Jeśli Indywidualne Wdrożenie nie ma sensu - powiem Ci wprost i wskażę co zamiast tego.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                Zarezerwuj konsultacje (30 min)
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
              <Link
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-6 py-3.5 text-[14px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#0A0A0A] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                {EMAIL}
              </Link>
            </div>

            <p className="mt-8 font-mono text-[11px] text-[#525252]">
              Wycena projektowa - nie godzinowa. Budżety od 15 000 PLN wzwyż. Odpowiedź w 24h.
            </p>
          </div>
        </section>

      </main>

      <FooterV2 />
    </>
  );
}
