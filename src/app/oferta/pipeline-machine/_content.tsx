"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Player } from "@remotion/player";
import { PipelineMachineFlow } from "@/remotion/PipelineMachineFlow";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { LiveDemoTerminal, type Line } from "@/components/v2/LiveDemoTerminal";
import { CALENDLY_URL, EMAIL } from "@/lib/constants";
import { MRRIncludes } from "@/components/v2/MRRIncludes";

// ── Reduced motion hook ────────────────────────────────────────────────────────

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

// ── Terminal script ────────────────────────────────────────────────────────────

const PIPELINE_SCRIPT: Line[] = [
  { kind: "prompt", text: "lessmanual pipeline icp-scrape --source=linkedin-sales-nav" },
  { kind: "out", text: "Scraping ICP targets · 500 companies · Tech B2B", tone: "muted", delay: 380 },
  { kind: "out", text: "✓ 312 verified decision makers enriched", tone: "success", delay: 240 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual pipeline compose --tone=tech-to-tech" },
  { kind: "out", text: "Agent AI drafting 312 personalized emails · 2 sequences", tone: "muted", delay: 400 },
  { kind: "out", text: "Tone: casual · ICP context · competitor displacement", tone: "muted", delay: 220 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual pipeline send --via=instantly --schedule=Tue-09:00" },
  { kind: "out", text: "Sending via Instantly · 4 domains · 3 sekwencje", tone: "muted", delay: 380 },
  { kind: "out", text: "✓ 312 emails queued · warmup score 98/100", tone: "success", delay: 360 },
  { kind: "blank" },
  { kind: "out", text: "[ Day 7 ]", tone: "muted", delay: 280 },
  { kind: "out", text: "Open rate     76%   (benchmark 20-30%)", tone: "accent", delay: 180 },
  { kind: "out", text: "Reply rate    61%   (6/10 chce rozmawiać)", tone: "accent", delay: 180 },
  { kind: "out", text: "→ Meeting booked in 37 min from first email", tone: "success", delay: 260 },
];

// ── Pricing tiers ──────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "COLD START",
    sub: "Email",
    setup: "3 000 PLN",
    perMeeting: "500-2 000 PLN",
    featured: false,
    features: [
      "2 domeny + warmup",
      "Scraping + scoring ICP",
      "1 sekwencja email",
      "ICP Deep Dive Workshop (wart. 2 500 PLN)",
      "Monthly Performance Report (wart. 1 000 PLN/mies)",
    ],
  },
  {
    name: "FULL PIPELINE",
    sub: "Email + LinkedIn",
    setup: "4 500 PLN",
    perMeeting: "500-2 000 PLN",
    featured: true,
    features: [
      "3 domeny + warmup",
      "LinkedIn outreach",
      "2 sekwencje email + ICP rozbudowany",
      "ICP Deep Dive Workshop + Swipe File (wart. 4 000 PLN)",
      "Auto-Reply AI - draft odpowiedzi (wart. 3 000 PLN)",
      "Monthly Performance Report",
    ],
  },
  {
    name: "DOMINACJA",
    sub: "Multi-channel",
    setup: "7 000 PLN",
    perMeeting: "500-2 000 PLN",
    featured: false,
    features: [
      "4+ domeny + warmup",
      "Multi-persona + multi-kanał",
      "Priorytetowa obsługa",
      "Wszystkie bonusy FULL PIPELINE",
      "Quarterly Strategy Call (wart. 2 000 PLN)",
    ],
  },
];

// ── Industry variants ──────────────────────────────────────────────────────────

const VARIANTS = [
  {
    label: "BRANŻA TECH",
    name: "Pipeline Machine dla technologii",
    icp: "CEO/CTO software house 10-200 osób, SaaS B2B",
    sources: "LinkedIn Sales Nav, Clutch, G2, Crunchbase",
    angle: "tech-to-tech, przejmowanie klientów konkurencji",
    price: "od 3 000 PLN setup + PPM",
  },
  {
    label: "BRANŻA REKRUTACJA",
    name: "Pipeline Machine dla rekrutacji",
    icp: "CEO/MD agencji rekrutacyjnych 5-100 osób",
    sources: "LinkedIn Sales Nav, Clutch, portale pracy",
    angle: "Kandydatów masz - klientów brakuje",
    price: "od 3 000 PLN setup + PPM",
  },
  {
    label: "BRANŻA PRZEMYSŁ",
    name: "Pipeline Machine dla przemysłu",
    icp: "Dyrektor handlowy / CEO firm produkcyjnych 20-500 osób",
    sources: "Biznesradar, KRS, LinkedIn, katalogi branżowe",
    angle: "efektywność operacyjna, zgodność EU",
    price: "od 3 000 PLN setup + PPM",
  },
];

// ── FAQ items ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Ile trwa do pierwszego spotkania?",
    a: "3-4 tygodnie od podpisania. Setup: ICP Workshop + konfiguracja domen + warmup + sekwencje. Pierwsza kampania startuje w tygodniu 1-2. Pierwsze spotkania pojawiają się w tygodniu 3-4. Dla porównania: rekrutacja handlowca B2B trwa 3-6 miesięcy.",
  },
  {
    q: "Co jeżeli 0 spotkań w 45 dni?",
    a: "Warstwa 1 gwarancji: pełny zwrot setup fee. Bez pytań. Przelew w 7 dni roboczych. Nie ma negocjacji, nie ma wyjątków - jeśli system nie dostarczył spotkań w 45 dni, oddajemy pieniądze.",
  },
  {
    q: "Jak działa model pay-per-meeting?",
    a: "Płacisz setup raz (3 000-7 000 PLN zależnie od tiera). Potem płacisz tylko za spotkania które się odbyły. Cena za spotkanie: 500-2 000 PLN zależnie od Twojego ACV (średnia wartość kontraktu). Zero stałych opłat miesięcznych. Zero retainera.",
  },
  {
    q: "Co jeśli moja branża nie pasuje do 3 wariantów?",
    a: "Każdy wariant to punkt wyjścia - ICP, lead sources i angle dostosowujemy do Twojej branży w ramach ICP Deep Dive Workshop (bonus w cenie setupu). Pracujemy z IT, logistyką, OZE, agencjami, produkcją, medtech i wieloma innymi segmentami.",
  },
  {
    q: "Kiedy płacę za spotkanie i co ze spotkaniami no-show?",
    a: "Płatność po odbyciu się spotkania - nie po umówieniu. No-show protection: jeśli klient się nie pojawił bez uprzedzenia, to spotkanie nie jest płatne. Jeśli odwołał z wyprzedzeniem, ustalamy razem tryb postępowania.",
  },
  {
    q: "Czym Pipeline Machine różni się od Hot Lead Catcher?",
    a: "Pipeline Machine = outbound cold email/LinkedIn na ICP. Skalowany zasieg, systematyczne pozyskiwanie leadow. Hot Lead Catcher = precision strike gdy pojawia sie sygnal zakupowy (firma zatrudnia DPO, dostala runde, ma zle recenzje konkurenta). Razem: PM robi regularny outbound, HLC odpala celowany strzal gdy okazja.",
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
  const panelId = `faq-pm-panel-${idx}`;
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

export default function PipelineMachineContent() {
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
                    Pipeline Machine · pay-per-meeting · PIERWSZY W POLSCE
                  </span>
                </div>

                <h1 className="text-[#0A0A0A]">
                  Spotkania z decydentami<br />
                  B2B. Płacisz<br />
                  tylko za wynik.<br />
                  <span className="text-[#B87333]">Zero stałych opłat.</span>
                </h1>

                <p className="mt-8 max-w-[520px] text-[17px] leading-[1.55] text-[#525252]">
                  System który filtruje ICP, pisze spersonalizowane cold maile, wysyła przez Instantly i umawia potwierdzone spotkania z decydentami. 76% open rate, 61% positive reply rate, booking w 37 minut od pierwszego maila.
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

              {/* Right: terminal */}
              <div className="relative">
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="font-mono text-[13px] uppercase tracking-[0.18em] font-medium text-[#0A0A0A]">
                    Pipeline Machine
                  </span>
                  <span className="font-mono text-[11px] text-[#737373]">
                    demo na żywo
                  </span>
                </div>
                <LiveDemoTerminal
                  script={PIPELINE_SCRIPT}
                  chromeLabel="lessmanual-cli · pipeline-machine"
                />
                <div className="mt-4 flex items-center justify-end px-1 font-mono text-[11px] text-[#737373]">
                  <span>76% open · 61% reply</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. JAK DZIAŁA ── */}
        <section id="jak-dziala" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>JAK TO DZIAŁA</SectionLabel>
              <h2>Trzy kroki. Ty wchodzisz dopiero gdy spotkanie jest potwierdzone.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {[
                {
                  num: "01",
                  title: "SCRAPING + SCORING",
                  desc: "Agent zbiera decydentów z LinkedIn Sales Nav, Clutch, Crunchbase i KRS zgodnie z Twoim ICP. Enrichment: firma + stanowisko + email zweryfikowany. Scoring intent - filtrujemy tych którzy pasują najbardziej.",
                },
                {
                  num: "02",
                  title: "PERSONALIZACJA + SEKWENCJE",
                  desc: "Agent AI pisze spersonalizowanego cold maila dla każdego kontaktu (nie szablon blast). Kontekst: branża, stanowisko, competitor displacement. 1-2 sekwencje z follow-upami. Tone of voice konfigurowalny pod Twoją markę.",
                },
                {
                  num: "03",
                  title: "WYSYŁKA + BOOKING",
                  desc: "Kampania przez Instantly na rozgrzanych domenach (warmup score 95+). Agent SAM monitoruje odpowiedzi i umawia spotkania. Ty wchodzisz dopiero gdy spotkanie jest potwierdzone w kalendarzu.",
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

            {/* Remotion flow */}
            <div className="mt-16 max-w-[640px] mx-auto">
              <Player
                component={PipelineMachineFlow}
                durationInFrames={240}
                fps={30}
                compositionWidth={640}
                compositionHeight={640}
                autoPlay={!reducedMotion}
                loop={!reducedMotion}
                controls={reducedMotion}
                acknowledgeRemotionLicense
                style={{ width: "100%", aspectRatio: "1/1", borderRadius: 8 }}
              />
              {reducedMotion && (
                <p className="mt-3 text-center font-mono text-[11px] text-[#737373]">
                  Animacja wstrzymana (prefers-reduced-motion). Kliknij play, aby odtworzyć.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── 3. CASE STUDY ── */}
        <section id="case" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CASE STUDY</SectionLabel>
              <h2>SaaS B2B: cold email. Podpisana umowa. 6 dni.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Lewa: klient + problem + workflow */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Klient
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#0A0A0A]">
                    SaaS B2B (data erasure / ITAD) - target: firmy enterprise, poziom C-Level, globalnie.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Problem
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Brak systemu outbound. Reczne pozyskiwanie leadow na LinkedIn zajmowalo dziesiatki godzin tygodniowo bez mierzalnych wynikow.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Co dostał (workflow)
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Full Pipeline: scraping decydentów z LinkedIn Sales Nav + Crunchbase pod ICP ITAD enterprise. Agent AI pisze personalizowane cold maile (tech-to-tech tone). Wysyłka przez Instantly na 3 domenach. Agent monitoruje odpowiedzi i umawia spotkania.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Dziś
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Pipeline autonomiczny. Od pierwszego cold maila do podpisanej umowy: 6 dni. Pełne liczby i demo live na rozmowie 15-min.
                  </p>
                </div>
              </div>

              {/* Prawa: metryki */}
              <div className="border border-[#E5E5E5] bg-white p-8" style={{ borderRadius: 8 }}>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Open rate kampanii
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      76%
                    </div>
                    <div className="font-mono text-[11px] text-[#737373]">benchmark: 20-30%</div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Positive reply rate
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      61%
                    </div>
                    <div className="font-mono text-[11px] text-[#737373]">6 na 10 odpowiedzi to chęć rozmowy</div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Od maila do umowy
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      6 dni
                    </div>
                    <div className="font-mono text-[11px] text-[#737373]">benchmark: 30-90 dni</div>
                  </div>
                </div>

                <p className="mt-6 font-mono text-[11px] text-[#737373] leading-[1.6]">
                  Pełne liczby 1:1 w rozmowie 15-min.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PRICING ── */}
        <section id="pricing" className="px-6 md:px-10 py-24 md:py-36 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CENNIK PIPELINE MACHINE</SectionLabel>
              <h2>Trzy tiery. Płacisz za spotkania, nie za czas.</h2>
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
                      NAJPOPULARNIEJSZY
                    </div>
                  )}

                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      {tier.name}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8B4513] mb-3">
                      {tier.sub}
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      {tier.perMeeting} PLN
                    </div>
                    <div className="text-[13px] text-[#737373] mt-1">
                      za spotkanie (zależne od ACV)
                    </div>
                    <div className="text-[13px] text-[#737373] mt-0.5">
                      Setup: {tier.setup}
                    </div>
                  </div>

                  <p className="text-[12px] text-[#525252] leading-[1.5] border-t border-[#E5E5E5] pt-4">
                    500-2 000 PLN za spotkanie (zależnie od ACV). Zero stałych opłat.
                  </p>

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
              3 warstwy gwarancji. Rabat 15% przy 2+ produktach LessManual.
            </p>
          </div>
        </section>

        {/* ── MRR INCLUDES ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[720px]">
              <MRRIncludes product="pipeline" tier="GROWTH" />
            </div>
          </div>
        </section>

        {/* ── 5. WARIANTY BRANŻOWE ── */}
        <section id="warianty" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>WARIANTY BRANŻOWE</SectionLabel>
              <h2>Ten sam system. Twoja branża. Twój ICP.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VARIANTS.map((v) => (
                <div
                  key={v.label}
                  className="bg-white border border-[#E5E5E5] p-8 flex flex-col gap-4"
                  style={{ borderRadius: 8 }}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">
                    {v.label}
                  </div>
                  <h3 className="text-[16px] font-medium text-[#0A0A0A]">{v.name}</h3>

                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#737373] mb-1">
                      ICP
                    </div>
                    <p className="text-[14px] text-[#525252]">{v.icp}</p>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#737373] mb-1">
                      Lead Sources
                    </div>
                    <p className="text-[14px] text-[#525252]">{v.sources}</p>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#737373] mb-1">
                      Email Angle
                    </div>
                    <p className="text-[14px] text-[#525252]">{v.angle}</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[#E5E5E5]">
                    <span className="font-mono text-[11px] text-[#8B4513]">{v.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[13px] text-[#525252]">
              Nie widzisz swojej branży? ICP Deep Dive Workshop w setupie dopasuje system do Twojego segmentu.
            </p>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section id="faq" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 max-w-[720px]">
              <SectionLabel>PYTANIA</SectionLabel>
              <h2>Najczęstsze pytania o Pipeline Machine.</h2>
            </header>

            <div className="max-w-[800px] border border-[#E5E5E5] bg-white px-8" style={{ borderRadius: 8 }}>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={item.q} q={item.q} a={item.a} idx={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. FINAL CTA ── */}
        <section id="kontakt" className="px-6 md:px-10 py-24 md:py-36 bg-[#F5EDE6]">
          <div className="mx-auto max-w-[1440px] text-center">
            <h2 className="mx-auto max-w-[800px]">
              Gotowy na spotkania z decydentami B2B?
            </h2>

            <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.55] text-[#525252]">
              15 minut rozmowy. Sprawdzimy Twój ICP, pokażę demo na żywo, ustalimy tier. Wychodzisz z planem albo bez zobowiązań.
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
