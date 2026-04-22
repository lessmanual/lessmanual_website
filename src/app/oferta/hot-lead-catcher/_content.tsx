"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { LiveDemoTerminal } from "@/components/v2/LiveDemoTerminal";
import { CALENDLY_URL, EMAIL } from "@/lib/constants";
import { MRRIncludes } from "@/components/v2/MRRIncludes";

// Lazy-load Remotion Player + composition — keeps them out of the initial bundle.
// ssr:false is valid here because this is a "use client" component.
const HotLeadCatcherPlayer = dynamic(
  () => import("./_player").then((m) => m.HotLeadCatcherPlayer),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ width: "100%", aspectRatio: "1/1", borderRadius: 8 }}
        className="bg-[#F0F0F0] animate-pulse"
        aria-hidden="true"
      />
    ),
  }
);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ── Pricing tiers ──────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "STARTER",
    setup: "3 000 PLN",
    monthly: "od 800 PLN/mies.",
    featured: false,
    features: [
      "2 źródła: newsy branżowe + oferty pracy",
      "Scoring intent podstawowy",
      "Agent wysyła maile autonomicznie via Instantly",
      "Auto-reply podstawowy (1 follow-up)",
      "1 agent dla 1 ICP",
      "Alert Telegram",
    ],
  },
  {
    name: "GROWTH",
    setup: "3 000 PLN",
    monthly: "od 1 300 PLN/mies.",
    featured: true,
    features: [
      "4 źródła: newsy + oferty pracy + recenzje (G2/Google) + wzmianki social",
      "Scoring intent zaawansowany (LLM custom rules)",
      "Agent wysyła + odpowiada autonomicznie (do 3 follow-upów)",
      "Tone of voice konfigurowalny pod markę",
      "2 agenty dla 2 ICP",
      "Wsparcie 24h SLA",
    ],
  },
  {
    name: "SCALE",
    setup: "3 000 PLN",
    monthly: "od 2 000 PLN/mies.",
    featured: false,
    features: [
      "8 źródeł: wszystko z GROWTH + Reddit + Facebook grupki + RSS branżowe + X",
      "Scoring custom z LLM + integracje API",
      "Pełna konwersacja autonomiczna (unlimited follow-upy + handling obiekcji)",
      "Multi-account inbox handling + integracja CRM",
      "Unlimited agentów i ICP",
      "Dedykowany account manager",
    ],
  },
];

// ── FAQ items ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Moja branża jest zbyt niszowa, agent nic nie znajdzie.",
    a: "Większość branż B2B ma min 100-500 aktywnych graczy w PL generujących sygnały zakupowe co tydzień. W ICP Deep Dive (dzień 1-7) sprawdzamy realnie - jeśli nisza jest martwa, mówimy Ci przed uruchomieniem i zwracamy setup. Do tej pory ustaliliśmy niszowy w 0% przypadków.",
  },
  {
    q: "Boję się że agent będzie spamował albo generował fake positives.",
    a: "Scoring algorithm ma threshold precision >85% (3 z 4 alertów musi być prawdziwy hot lead). Miesięczny report pokazuje accuracy rate i pozwala recalibrować. Nie trafia Ci nic poniżej score 75.",
  },
  {
    q: "Skąd agent wie, że sygnał jest hot?",
    a: "Scoring intent oparty o LLM. Każde źródło ma własne reguły scoringu (np. 'firma zatrudnia DPO' = 85, 'firma chwali się rundą' = 70). Próg hot = >75. Konfigurowalny pod ICP klienta.",
  },
  {
    q: "Co jeśli źródła nie generują sygnałów dla mojej branży?",
    a: "W setup audycie sprawdzamy które źródła pasują do ICP. Jeśli żadne z 4 default nie generuje wystarczająco - dobudowujemy custom źródło (np. konkretne fora branżowe, X, branżowe blogi). Tier SCALE.",
  },
  {
    q: "Ile czasu zajmuje uruchomienie?",
    a: "7 do 14 dni od podpisania. Setup: definicja ICP + scoring + integracje (Telegram + Instantly + CRM). Pierwszy agent działa już w 7 dniu, dopinanie do 14.",
  },
  {
    q: "Co dokładnie agent wysyła i jak unika spamu?",
    a: "Agent SAM wysyła personalizowanego maila (kontekst sygnału + propozycja rozmowy) i SAM odpowiada na zwrotne aż do umówienia spotkania. Każdy mail jest 1:1 dla konkretnego sygnału - zero szablonów, zero blast. Tone of voice konfigurowalny pod Twoją markę w setupie. Tryb 'draft only' (manual approval przed wysyłką) dostępny opcjonalnie.",
  },
  {
    q: "Mogę wypróbować zanim podpiszę?",
    a: "Tak. 14-dniowy pilot za 1 500 PLN - pełen setup, monitoring 1 źródła, 1 ICP, alert na Telegram. Po 14 dniach jeśli sygnały są - przechodzisz w pełny tier i pilot doliczamy do setupu. Jeśli nie - koniec, bez zobowiązań.",
  },
];

// ── Section label component ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
      {children}
    </div>
  );
}

// ── FAQ accordion item ─────────────────────────────────────────────────────────

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${idx}`;
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

export default function HotLeadCatcherContent() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <HeaderV2 />

      <main>
        {/* ── 1. HERO ── */}
        <section className="relative px-6 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_1fr)] gap-12 lg:gap-16 items-center">
              {/* Left: copy */}
              <div>
                <div className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-3 py-1.5 mb-8">
                  <span className="block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  <span className="font-mono text-[11px] tracking-tight text-[#525252]">
                    Agent #1 LessManual · NAJCZĘŚCIEJ WYBIERANY
                  </span>
                </div>

                <h1 className="text-[#0A0A0A]">
                  Agent AI, który łapie<br />
                  gorące leady<br />
                  <span className="text-[#B87333]">zanim konkurencja je zauważy.</span>
                </h1>

                <p className="mt-8 max-w-[520px] text-[17px] leading-[1.55] text-[#525252]">
                  Monitoring od 2 do 8 źródeł sygnałów zakupowych (newsy, oferty pracy, recenzje, social, Reddit, Facebook grupki, RSS, X). Scoring intent. Agent SAM wysyła personalizowane maile i SAM odpowiada na zwrotne. Wchodzisz w wątek dopiero gdy spotkanie do umówienia.
                </p>

                <p className="mt-4 max-w-[520px] text-[14px] font-mono text-[#B87333]">
                  Pierwsze alerty w 24h po setupie. {/* TODO Bartek: update monthly X/5 */}
                  Max 5 nowych klientów HLC miesięcznie.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
                    style={{ borderRadius: 4 }}
                  >
                    Zarezerwuj rozmowę (15 min)
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                  <Link
                    href="#pricing"
                    className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-6 py-3.5 text-[14px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#0A0A0A] hover:-translate-y-[1px]"
                    style={{ borderRadius: 4 }}
                  >
                    Zobacz cennik
                  </Link>
                </div>
              </div>

              {/* Right: animated CLI terminal (reuse main page LiveDemoTerminal) */}
              <div className="relative">
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="font-mono text-[13px] uppercase tracking-[0.18em] font-medium text-[#0A0A0A]">
                    Hot Lead Catcher
                  </span>
                  <span className="font-mono text-[11px] text-[#737373]">
                    demo na żywo
                  </span>
                </div>
                <LiveDemoTerminal />
                <div className="mt-4 flex items-center justify-end px-1 font-mono text-[11px] text-[#737373]">
                  <span>do 8 źródeł · alert w 60s</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 1b. PROBLEM AGITATION ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-white border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[760px]">
              <SectionLabel>PROBLEM</SectionLabel>
              <h2 className="text-[#0A0A0A]">
                Przegapiasz gorące leady w momencie gdy są najbardziej otwarci.
              </h2>
              <p className="mt-6 text-[17px] leading-[1.65] text-[#525252]">
                Firma X dziś wpisuje na LinkedIn &quot;szukamy rozwiązania dla [Twoja branża]&quot;.
                Twój konkurent zauważa to w 30 minut. Ty dowiadujesz się o 2 tygodnie za późno,
                gdy już podpisali umowę z kimś innym.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "Twój zespół handlowy nie ma czasu monitorować 4 źródeł sygnałów 24/7.",
                  "Narzędzia intent data w PL są drogie - Bombora, G2 intent = 3-8k USD/mies.",
                  "Samodzielne monitorowanie LinkedIn/news = 40h/mies tylko na obserwację.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-[#525252]">
                    <span className="text-[#B87333] shrink-0 mt-0.5" aria-hidden="true">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[17px] leading-[1.65] text-[#0A0A0A] font-medium">
                Hot Lead Catcher łapie sygnał w 15 minut od publikacji. Alert na Telegram, kontekst gotowy, Ty dzwonisz pierwszy.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. JAK DZIAŁA ── */}
        <section id="jak-dziala" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>JAK TO DZIAŁA</SectionLabel>
              <h2>Trzy kroki. Zero ręcznych czynności.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {[
                {
                  num: "01",
                  title: "SKAN",
                  desc: "Agent monitoruje od 2 do 8 źródeł sygnałów zakupowych: newsy o branży klienta, oferty pracy (szukają DPO/CTO/Marketing Director), recenzje na Google/G2, wzmianki social, wątki na Reddicie, Facebook grupki, RSS branżowe, posty na X. Codziennie. Bez przerwy.",
                },
                {
                  num: "02",
                  title: "SCORING",
                  desc: "'CTO firmy X szuka pracy' = score 90+. 'Firma Y chwali się rundą A' = score 70+. Każdy sygnał dostaje score intent (0-100). Filtrowanie: tylko hot (>75) idą dalej.",
                },
                {
                  num: "03",
                  title: "WYSYŁKA + REPLY",
                  desc: "Agent SAM wysyła personalizowanego maila (kontekst sygnału + propozycja rozmowy) i SAM odpowiada na zwrotne. Tone of voice konfigurowalny pod Twoją markę. Wchodzisz dopiero gdy spotkanie do umówienia. Alert na Telegram.",
                },
              ].map((s) => (
                <div key={s.num} className="bg-[#FAFAFA] p-8 md:p-10">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-[56px] font-medium leading-none tracking-tight text-[#B87333]">
                      {s.num}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                      {s.title}
                    </span>
                  </div>
                  <p className="text-[15px] leading-[1.65] text-[#525252]">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Animated flow: 8 sources → agent → alert (Remotion, lazy-loaded) */}
            <div className="mt-16 max-w-[640px] mx-auto">
              <HotLeadCatcherPlayer reducedMotion={reducedMotion} />
            </div>
          </div>
        </section>

        {/* ── 3. CASE STUDY ── */}
        {/* TODO Bartek: potwierdzić NDA WiperApp - jeśli OK cofnąć anonimizację */}
        <section id="case" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CASE STUDY</SectionLabel>
              <h2>Firma z branży mobile apps: od 200 cold emaili z zero odpowiedzi do pipeline&apos;u opartego o sygnały.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Lewa: klient + problem + workflow */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Klient
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#0A0A0A]">
                    SaaS B2B z kategorii mobile apps, target: Marketing Director w retail.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Problem
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    200 cold emaili z generycznym pitchem. Zero odpowiedzi. Brak danych żeby wiedzieć kogo zaczepić w odpowiednim momencie.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Co dostał (workflow)
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Agent skanuje 4 źródła pod ICP retail (newsy, oferty pracy DPO/CMO, recenzje konkurentów, wzmianki social). Score &gt;75 = mail wysłany via Instantly z kontekstem (&quot;widziałem że szukacie DPO&quot; / &quot;gratuluję rundy&quot;). Agent SAM odpowiada na zwrotne i prowadzi wątek aż do umówienia spotkania.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Dziś
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Pipeline w pełni autonomiczny: klient dostaje tylko alert na Telegram &quot;spotkanie do potwierdzenia&quot;. Pokazuję działający setup live na rozmowie 15-min.
                  </p>
                </div>
              </div>

              {/* Prawa: metryki */}
              <div className="border border-[#E5E5E5] bg-white p-8" style={{ borderRadius: 8 }}>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Czas od sygnału do maila
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      60 sekund
                    </div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Źródeł monitorowanych
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      4 (24/7)
                    </div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Próg hot signal
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      score &gt; 75
                    </div>
                  </div>
                </div>

                <p className="mt-6 font-mono text-[11px] text-[#737373] leading-[1.6]">
                  Pełne liczby (leady, konwersja, ROI) pokazujemy 1:1 w rozmowie 15-min.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PRICING ── */}
        <section id="pricing" className="px-6 md:px-10 py-24 md:py-36 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CENNIK HLC</SectionLabel>
              <h2>Trzy tiery. Stała kwota. Zero godzin.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="relative bg-white p-8 flex flex-col gap-6"
                  style={{
                    border: tier.featured ? "1.5px solid #B87333" : "1px solid #E5E5E5",
                    borderRadius: 8,
                    boxShadow: tier.featured
                      ? "0 4px 24px rgba(184, 115, 51, 0.12)"
                      : undefined,
                  }}
                >
                  {tier.featured && (
                    <div
                      className="absolute -top-3 left-6 font-mono text-[11px] uppercase tracking-[0.18em] bg-[#8B4513] text-white px-3 py-1"
                      style={{ borderRadius: 4 }}
                    >
                      NAJCZĘŚCIEJ WYBIERANY
                    </div>
                  )}

                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                      {tier.name}
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      {tier.monthly}
                    </div>
                    <div className="text-[13px] text-[#737373] mt-1">
                      Setup: {tier.setup}
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#525252]">
                        <span className="text-[#B87333] mt-0.5 shrink-0" aria-hidden="true">+</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium transition-all duration-200 hover:-translate-y-[1px]"
                    style={{
                      borderRadius: 4,
                      background: tier.featured ? "#0A0A0A" : "transparent",
                      color: tier.featured ? "#ffffff" : "#0A0A0A",
                      border: tier.featured ? "none" : "1px solid #E5E5E5",
                    }}
                  >
                    Zarezerwuj rozmowę →
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[12px] text-[#525252]">
              Wszystkie ceny za konkretny zakres. Rabat 15% przy kontrakcie 6+ miesięcy.
            </p>

            {/* Bundle Stack Value Table - GROWTH */}
            <div className="mt-12 border border-[#B87333] bg-[#FAFAFA] p-8 max-w-[640px]" style={{ borderRadius: 8 }}>
              <SectionLabel>CO DOSTAJESZ W GROWTH (rekomendowany)</SectionLabel>
              <table className="w-full text-[14px]">
                <tbody>
                  {[
                    ["Setup + ICP config", "3 000 PLN"],
                    ["ICP Deep Dive Workshop", "2 500 PLN"],
                    ["4 źródła sygnałów (news/jobs/reviews/social)", "3 000 PLN"],
                    ["Alert Channels setup", "1 000 PLN"],
                    ["Monthly Report (12 mies.)", "12 000 PLN"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-[#E5E5E5]">
                      <td className="py-3 text-[#525252]">{label}</td>
                      <td className="py-3 text-right text-[#525252]">{value}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-[#B87333]">
                    <td className="py-3 font-medium text-[#0A0A0A]">TOTAL VALUE rok 1</td>
                    <td className="py-3 text-right font-medium text-[#0A0A0A]">21 500 PLN</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#B87333]">TWOJA CENA</td>
                    <td className="py-3 text-right font-medium text-[#B87333]">18 600 PLN</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-[13px] text-[#525252]">Oszczędzasz 2 900 PLN + bonusy w cenie.</p>
            </div>
          </div>
        </section>

        {/* ── 4b. MRR INCLUDES ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[720px]">
              <MRRIncludes product="hlc" tier="GROWTH" />
            </div>
          </div>
        </section>

        {/* ── 4b. GWARANCJA ── */}
        <section id="gwarancja" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 max-w-[720px]">
              <SectionLabel>GWARANCJA</SectionLabel>
              <h2>3 warstwy ochrony. Nic nie ryzykujesz.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Warstwa 1: Bezwarunkowa",
                  desc: "30 dni 0 hot leads w Telegramie/Slacku = pełny zwrot setup. Bez pytań. Przelew w 7 dni.",
                },
                {
                  title: "Warstwa 2: Rynkowa",
                  desc: "Koszt per hot lead powyżej 300 PLN (benchmark hotLead PPL w Polsce) = następne 30 dni HLC gratis.",
                },
                {
                  title: "Warstwa 3: ICP Satysfakcja",
                  desc: "Po kalibracji (dzień 7-14) nie jesteś zadowolony z ICP? 100% zwrot. Zanim agent ruszy.",
                },
              ].map((g) => (
                <div
                  key={g.title}
                  className="bg-white border border-[#E5E5E5] p-8"
                  style={{ borderRadius: 8 }}
                >
                  <h3 className="text-[16px] font-medium text-[#0A0A0A] mb-3">{g.title}</h3>
                  <p className="text-[14px] leading-[1.65] text-[#525252]">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. FAQ ── */}
        <section id="faq" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 max-w-[720px]">
              <SectionLabel>PYTANIA</SectionLabel>
              <h2>Najczęstsze pytania o HLC.</h2>
            </header>

            <div className="max-w-[800px] border border-[#E5E5E5] bg-white px-8" style={{ borderRadius: 8 }}>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={item.q} q={item.q} a={item.a} idx={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FINAL CTA ── */}
        <section id="kontakt" className="px-6 md:px-10 py-24 md:py-36 bg-[#F5EDE6]">
          <div className="mx-auto max-w-[1440px] text-center">
            <h2 className="mx-auto max-w-[800px]">
              Gotowy żeby agent łapał leady za Ciebie?
            </h2>

            <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.55] text-[#525252]">
              15 minut rozmowy. Sprawdzimy czy HLC pasuje do Twojego ICP, pokażę demo na żywo, ustalimy tier.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                Zarezerwuj rozmowę
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
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
              Średnia odpowiedź: 4h w dni robocze.
            </p>
          </div>
        </section>
      </main>

      <FooterV2 />
    </>
  );
}
