"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Player } from "@remotion/player";
import { ContentMachineFlow } from "@/remotion/ContentMachineFlow";
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

const SEO_SCRIPT: Line[] = [
  { kind: "prompt", text: "lessmanual seo keyword --niche=saas-b2b-poland" },
  { kind: "out", text: "Senuto scraping · 50 keyword candidates analyzed", tone: "muted", delay: 380 },
  { kind: "out", text: "✓ 12 high-intent clusters identified (KD 15-35)", tone: "success", delay: 260 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual seo outline --cluster=automation-b2b" },
  { kind: "out", text: "Agent AI drafting H1-H3 structure + SERP analysis", tone: "muted", delay: 380 },
  { kind: "out", text: "Brief ready · 1500 słów target · 8 internal links", tone: "muted", delay: 220 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual seo article --voice=brand --count=20" },
  { kind: "out", text: "Writing in brand voice · Human-in-the-loop review", tone: "muted", delay: 380 },
  { kind: "out", text: "✓ 20 articles ready · schema.org · meta + OG", tone: "success", delay: 360 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual seo publish --cms=webflow --calendar=monthly" },
  { kind: "out", text: "Publishing 20 articles · Internal linking · Sitemap updated", tone: "muted", delay: 380 },
  { kind: "out", text: "[ Miesiąc 6 ]", tone: "muted", delay: 280 },
  { kind: "out", text: "Ruch organiczny  +237%", tone: "accent", delay: 180 },
  { kind: "out", text: "Koszt artykułu    ~90 PLN  (vs 300-800 copywriter)", tone: "accent", delay: 180 },
  { kind: "out", text: "→ 18 fraz w TOP 10 Google", tone: "success", delay: 260 },
];

// ── Pricing tiers ──────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "STARTER",
    setup: "3 000 PLN",
    monthly: "1 000 PLN/mies.",
    featured: false,
    features: [
      "10 artykułów SEO/mies",
      "2 posty LinkedIn/tydzien + 1 watek X/tydzien",
      "1 klaster tematyczny",
      "Keyword research",
      "Podstawowe SEO (meta, OG, schema)",
      "Raport keyword research (wart. 2 000 PLN)",
    ],
  },
  {
    name: "GROWTH",
    setup: "5 000 PLN",
    monthly: "1 800 PLN/mies.",
    featured: true,
    features: [
      "20 artykułów SEO/mies",
      "5 postów LinkedIn/tydzień + wątki X + grafiki IG",
      "3 klastry tematyczne",
      "Internal linking + tracking pozycji",
      "Miesięczny raport SEO",
      "Kalendarz contentu 6 mies (wart. 2 000 PLN)",
      "Miesięczny audyt SEO (wart. 1 500 PLN/mies)",
    ],
  },
  {
    name: "SCALE",
    setup: "9 000 PLN",
    monthly: "2 500 PLN/mies.",
    featured: false,
    features: [
      "30 artykułów SEO/mies",
      "Social media full (LinkedIn Articles, X, IG, FB, TikTok hooks)",
      "Unlimited klastry tematyczne",
      "Content calendar + dedykowany PM",
      "Twoja firma w odpowiedziach ChatGPT, Perplexity i Gemini - nie tylko Google",
      "Technical SEO audit + fix: sitemap.xml, robots.txt, schema.org, meta tags, canonical",
      "GEO (Generative Engine Optimization): llms.txt dla LLM crawlerów, agent-skills/*.md które AI cytuje, MCP server-card opcjonalnie",
      "Analiza luk konkurencji (wart. 3 000 PLN)",
      "Wszystkie bonusy GROWTH",
    ],
  },
];

// ── Success metrics ────────────────────────────────────────────────────────────

const METRICS = [
  {
    value: "+150-400%",
    label: "ruch organiczny",
    desc: "wzrost w ciągu 6 miesięcy od startu systemu",
  },
  {
    value: "83-100 PLN",
    label: "koszt artykułu",
    desc: "vs 300-800 PLN copywriter. SCALE ok. 83 PLN, GROWTH ok. 90 PLN",
  },
  {
    value: "300-500%",
    label: "ROI rok 1",
    desc: "zwrot z inwestycji w pierwszym roku przy założeniu wzrostu ruchu",
  },
];

// ── FAQ items ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Ile trwa do pierwszych efektów?",
    a: "Pierwsze artykuły są opublikowane w tygodniu 1-2. Roboty Google indeksują je zwykle w ciągu 7-14 dni. Ruch zaczyna rosnąć po 60 dniach - pierwsze frazy wchodzą do TOP 30-50. Po 6 miesiącach standardowy wzrost to +150-400% ruchu organicznego.",
  },
  {
    q: "Jak zachowujecie brand voice?",
    a: "Na początku przygotowujemy prompt brandowy - zbieramy Twój ton, styl, słownictwo, tematy tabu. Artykuły są pisane przez agenta AI z tym promptem, potem przechodzi human-in-the-loop review. Jeśli chcesz zatwierdzać artykuły przed publikacją - to jest opcja w każdym tierze.",
  },
  {
    q: "Co jeśli artykuły nie rankują?",
    a: "W tierach GROWTH i SCALE masz monthly SEO audit w cenie. Jeśli artykuły nie rankują po 3 miesiącach - analizujemy przyczyny: za wysoki KD, zły intent, brak linków wewnętrznych, problemy techniczne SEO. Optymalizacja jest częścią subskrypcji.",
  },
  {
    q: "Czy używacie AI generycznego? ChatGPT?",
    a: "Nie. Agent AI (Anthropic) z promptem brandowym + keyword intent per artykuł + SERP analysis + schema.org + meta i OG tags. Każdy artykuł ma brief oparty o realne frazy z Twojej niszy (Senuto). Human-in-the-loop review przed publikacją. To nie jest ChatGPT copy-paste.",
  },
  {
    q: "Moja branża jest niszowa - zadziała?",
    a: "Keyword research na początku weryfikuje czy nisza ma potencjał. Jeśli KD jest poniżej 40 i volume jest wystarczające - system zadziała. Pracujemy z niszami takimi jak SMD-LED, OZE B2B, medtech, SaaS B2B, usługi przemysłowe.",
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
  const panelId = `faq-seo-panel-${idx}`;
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

export default function ContentMachineContent() {
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
                    Content Machine · zrobione za Ciebie · od 83 PLN/artykuł
                  </span>
                </div>

                <h1 className="text-[#0A0A0A]">
                  Blog który<br />
                  pisze się sam.<br />
                  Google zaczyna<br />
                  <span className="text-[#B87333]">Cię widzieć.</span>
                </h1>

                <p className="mt-4 max-w-[520px] text-[14px] leading-[1.55] text-[#B87333] font-medium">
                  To nie agencja SEO. To agentic workflow - buduje Twoją widoczność w Google, ChatGPT i Perplexity bez copywritera, bez project managera z Twojej strony.
                </p>

                <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-[#525252]">
                  10 do 30 artykułów SEO miesięcznie. Dostajesz keyword research, klastry tematyczne, internal linking i schema.org - wszystko gotowe do Google. Jeden artykuł zamienia się automatycznie w posty na LinkedIn i X. +150-400% ruchu organicznego w 6 miesięcy.
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
                    Content Machine
                  </span>
                  <span className="font-mono text-[11px] text-[#737373]">
                    demo na żywo
                  </span>
                </div>
                <LiveDemoTerminal
                  script={SEO_SCRIPT}
                  chromeLabel="lessmanual-cli · content-machine"
                />
                <div className="mt-4 flex items-center justify-end px-1 font-mono text-[11px] text-[#737373]">
                  <span>+237% ruch · 18 fraz TOP 10</span>
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
              <h2>Trzy kroki. Artykuły trafiają do Google bez Twojego zaangażowania.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {[
                {
                  num: "01",
                  title: "KEYWORD RESEARCH",
                  desc: "Senuto scrape Twojej niszy. Analizujemy 50+ kandydatów keywordowych, wybieramy frazy z KD 15-40 i volume adekwatnym do branży. Dzielimy na klastry tematyczne. Dostajesz raport - widzisz na co będziemy się pozycjonować.",
                },
                {
                  num: "02",
                  title: "BRIEF + ARTYKUŁ",
                  desc: "Dla każdego artykułu: analiza SERP, struktura H1-H3, internal links plan. Agent AI pisze w Twoim brand voice (prompt przygotowany w setupie). Human-in-the-loop review przed publikacją - możesz zatwierdzać lub dawać feedback.",
                },
                {
                  num: "03",
                  title: "PUBLIKACJA + SOCIAL + TRACKING",
                  desc: "Artykuły trafiają do Twojego CMS (Webflow, WordPress, Ghost, inne). Schema.org, meta tagi, OG, sitemap - wszystko w cenie. Z każdego artykułu agent generuje 3-5 postów LinkedIn, wątki X i grafiki IG/FB - jeden artykuł to 10+ kawałków contentu. Tracking pozycji (od GROWTH) - widzisz wzrost co miesiąc.",
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
                component={ContentMachineFlow}
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
              <h2>SMD-LED: 3 artykuły tygodniowo, TOP 10 w tydzień.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Lewa: klient + problem + workflow */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Klient
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#0A0A0A]">
                    SMD-LED - sklep B2B z oświetleniem LED. Niszowa branża, silna konkurencja w Google.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Problem
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Zero ruchu organicznego. Brak czasu na pisanie contentu. Copywriter kosztuje zbyt dużo na stały content plan.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Co dostał (workflow)
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Keyword research dla niszy LED: 40+ fraz z KD poniżej 35. Klastry tematyczne: typy oświetlenia, normy, zastosowania. 3 artykuły tygodniowo z brand voice, schema.org i internal linking. Publikacja na WordPress.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Dziś
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Artykuły wchodziły na 1. lub 2. stronę Google w tydzień od publikacji. Wartość ruchu organicznego po 6 miesiącach: 10-50 tys. PLN miesięcznie. Demo live na rozmowie.
                  </p>
                </div>
              </div>

              {/* Prawa: metryki */}
              <div className="border border-[#E5E5E5] bg-white p-8" style={{ borderRadius: 8 }}>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Inwestycja
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      3 000 PLN setup
                    </div>
                    <div className="font-mono text-[11px] text-[#737373]">+ 1 000 PLN/mies</div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Wartość ruchu organicznego
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      10-50k PLN/mies
                    </div>
                    <div className="font-mono text-[11px] text-[#737373]">po 6 miesiącach</div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Czas do TOP 10
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      7 dni
                    </div>
                    <div className="font-mono text-[11px] text-[#737373]">od pierwszej publikacji</div>
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
              <SectionLabel>CENNIK CONTENT MACHINE</SectionLabel>
              <h2>Trzy tiery. Ruch który rośnie co miesiąc.</h2>
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
              Gwarantowana liczba artykułów. Nie dostarczymy - zwrot proporcjonalny. Rabat 15% przy 2+ produktach LessManual.
            </p>
          </div>
        </section>

        {/* ── MRR INCLUDES ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[720px]">
              <MRRIncludes product="content" tier="GROWTH" />
            </div>
          </div>
        </section>

        {/* ── 5. METRYKI SUKCESU ── */}
        <section id="metryki" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>METRYKI SUKCESU</SectionLabel>
              <h2>Liczby które mają znaczenie dla Twojego biznesu.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="bg-white border border-[#E5E5E5] p-8 flex flex-col gap-3"
                  style={{ borderRadius: 8 }}
                >
                  <div className="text-[42px] font-medium text-[#0A0A0A] tracking-tight leading-none">
                    {m.value}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">
                    {m.label}
                  </div>
                  <p className="text-[14px] leading-[1.6] text-[#525252]">{m.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[13px] text-[#525252]">
              Metryki oparte na realnych wdrożeniach. Wyniki zależą od niszy, konkurencji i wyjściowego stanu SEO.
            </p>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section id="faq" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 max-w-[720px]">
              <SectionLabel>PYTANIA</SectionLabel>
              <h2>Najczęstsze pytania o Content Machine.</h2>
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
              Gotowy żeby Google zaczął Cię widzieć?
            </h2>

            <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.55] text-[#525252]">
              15 minut rozmowy. Sprawdzimy potencjał Twojej niszy, pokażę demo na żywo, ustalimy tier. Wychodzisz z planem albo bez zobowiązań.
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
