"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Player } from "@remotion/player";
import { OfferGeneratorFlow } from "@/remotion/OfferGeneratorFlow";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { LiveDemoTerminal, type Line } from "@/components/v2/LiveDemoTerminal";
import { CALENDLY_URL, EMAIL } from "@/lib/constants";
import { MRRIncludes } from "@/components/v2/MRRIncludes";

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

// ── LiveDemoTerminal script ──────────────────────────────────────────────────

const OFFER_GENERATOR_SCRIPT: Line[] = [
  { kind: "prompt", text: "lessmanual offer input --source=chat,form,qr" },
  { kind: "out", text: "Klient: chce wycenę · instalacja PV 8kW · dom jednorodzinny", tone: "muted", delay: 380 },
  { kind: "out", text: "RAG search · 247 paneli + falowniki w bazie", tone: "muted", delay: 240 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual offer calculate --variants=3" },
  { kind: "out", text: "Wariant ECO   32 000 PLN   ROI 7 lat", tone: "muted", delay: 260 },
  { kind: "out", text: "Wariant STANDARD   42 000 PLN   ROI 5.5 lat", tone: "muted", delay: 260 },
  { kind: "out", text: "Wariant PREMIUM   58 000 PLN   ROI 4 lata", tone: "muted", delay: 260 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual offer generate-pdf --brand=client" },
  { kind: "out", text: "Generowanie · 3 szablony · logo + brand colors", tone: "muted", delay: 380 },
  { kind: "out", text: "PDF 14 stron · wysłany mailem · tracking ON", tone: "success", delay: 280 },
  { kind: "blank" },
  { kind: "prompt", text: "lessmanual offer followup --auto=D3,D7" },
  { kind: "out", text: "Auto follow-up zaplanowany · kalendarz Cal.com podpięty", tone: "muted", delay: 360 },
  { kind: "blank" },
  { kind: "out", text: "[ tydzień ] Stats", tone: "muted", delay: 280 },
  { kind: "out", text: "Wyceny  28   Win rate  42%   (vs 18% baseline)", tone: "accent", delay: 180 },
  { kind: "out", text: "Czas oferty  5 min   (vs 2h manual)", tone: "accent", delay: 180 },
  { kind: "out", text: "→ ROI ~340% w 30 dni", tone: "success", delay: 260 },
];

// ── Pricing tiers ────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "STARTER",
    badge: null,
    setup: "5 000 PLN",
    monthly: "800 PLN/mies.",
    subtitle: "Chat + PDF",
    featured: false,
    features: [
      "Chat AI (link/embed na stronę)",
      "1 szablon PDF z logo klienta",
      "Baza RAG (cennik, produkty, specyfikacje)",
      "Wysyłka wyceny mailem",
      "Historia wycen w Google Sheets",
      "50 wycen/mies.",
    ],
  },
  {
    name: "GROWTH",
    badge: "NAJPOPULARNIEJSZY",
    setup: "9 000 PLN",
    monthly: "1 500 PLN/mies.",
    subtitle: "Dedykowana app",
    featured: true,
    features: [
      "Dedykowana app Next.js (wyceny.firma.pl)",
      "3 szablony PDF dobierane z inputu klienta",
      "3 warianty cenowe generowane automatycznie",
      "Auto follow-up po 3 i 7 dniach",
      "1 integracja CRM (HubSpot / Pipedrive)",
      "Cotygodniowy raport z analizą wycen",
      "Unlimited wycen",
    ],
  },
  {
    name: "SCALE",
    badge: null,
    setup: "14 000 PLN",
    monthly: "1 800 PLN/mies.",
    subtitle: "Full Suite",
    featured: false,
    features: [
      "Wszystko z GROWTH",
      "Unlimited szablonów PDF",
      "Tracking otwarć oferty z analytics",
      "Embed widget na dowolną stronę",
      "QR code dla showroom i targów",
      "Dodatkowe integracje (ERP, kalendarz)",
      "Dedykowany opiekun wdrożenia",
    ],
  },
];

// ── Warianty branżowe ────────────────────────────────────────────────────────

const VARIANTS = [
  {
    segment: "OZE / FOTOWOLTAIKA",
    name: "OZE",
    basic: { price: "5 500 PLN", mrr: "800 PLN/mies.", note: "kalkulator ROI, baza paneli/falowników, chat wycenowy" },
    pro:   { price: "10 000 PLN", mrr: "1 500 PLN/mies.", note: "+ dedykowana app, warianty cenowe, follow-up, CRM sync" },
  },
  {
    segment: "MEBLE NA WYMIAR",
    name: "Meble",
    basic: { price: "6 000 PLN", mrr: "900 PLN/mies.", note: "kalkulacja materiałów, biblioteka dostawców, chat wycenowy" },
    pro:   { price: "11 000 PLN", mrr: "1 500 PLN/mies.", note: "+ dedykowana app, warianty cenowe, follow-up, CRM sync" },
  },
  {
    segment: "REMONTOWO-BUDOWLANE",
    name: "Remonty",
    basic: { price: "5 500 PLN", mrr: "800 PLN/mies.", note: "szablon kosztorysu, baza materiałów, chat wycenowy" },
    pro:   { price: "9 500 PLN", mrr: "1 500 PLN/mies.", note: "+ dedykowana app, warianty cenowe, follow-up, CRM sync" },
  },
];

// ── FAQ items ────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Czy klient sam wycenia bez ingerencji handlowca?",
    a: "Tak. Chat AI zadaje pytania, baza RAG oblicza warianty cenowe, system generuje PDF z Twoim logo i wysyła mailem. Klient wycenia o 23:00, w weekend, w święta - Ty rano masz gotowe zapytanie.",
  },
  {
    q: "Co jeśli baza cen się zmienia?",
    a: "W GROWTH i SCALE masz panel CMS do aktualizacji bazy RAG. Zmiana ceny lub dodanie produktu: kilka minut. Nie czekasz na programistę. STARTER: aktualizacja przez nas w ramach abonamentu.",
  },
  {
    q: "Czy system działa na mojej stronie?",
    a: "STARTER: embed widget lub link do chatu (gotowe w 2 kliknięciach). GROWTH: dedykowana subdomena wyceny.firma.pl (Next.js, Twój branding). SCALE: embed widget + QR code dla showroom i targów.",
  },
  {
    q: "Ile szablonów PDF mogę mieć?",
    a: "STARTER: 1 szablon. GROWTH: 3 szablony dobierane automatycznie na podstawie inputu klienta (np. inny dla klienta B2B, inny dla B2C). SCALE: unlimited szablonów.",
  },
  {
    q: "Czy jest integracja z CRM?",
    a: "Tak, od tieru GROWTH. HubSpot, Pipedrive, Salesforce, custom API. Każda wycena trafia do CRM z danymi klienta i wybranym wariantem.",
  },
  {
    q: "Czy mogę dodać Voice Agent na tej samej bazie?",
    a: "Tak. Ta sama baza RAG, podpinamy Voice Agent (ElevenLabs). Klient dzwoni, agent wycenia przez telefon, PDF na maila. Dodatkowy setup: od 3 500 PLN + 1 200 PLN/mies.",
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
      {children}
    </div>
  );
}

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-go-${idx}`;
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

// ── Main content ─────────────────────────────────────────────────────────────

export default function GeneratorOfertContent() {
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
                    Agent #4 LessManual · GENERATOR OFERT
                  </span>
                </div>

                <h1 className="text-[#0A0A0A]">
                  Wycena w 5 minut<br />
                  zamiast 2 godzin.<br />
                  Klient sam wycenia,<br />
                  <span className="text-[#B87333]">Ty dostajesz gotowe zapytanie.</span>
                </h1>

                <p className="mt-8 max-w-[520px] text-[17px] leading-[1.55] text-[#525252]">
                  Samoobsługowy konfigurator wycen oparty o RAG. Klient podaje dane przez chat, formularz lub QR kod. System oblicza warianty, generuje profesjonalny PDF z Twoim logo i wysyła mailem. Auto follow-up po 3 i 7 dniach. Win rate +25-40%.
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

              {/* Right: LiveDemoTerminal */}
              <div className="relative">
                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="font-mono text-[13px] uppercase tracking-[0.18em] font-medium text-[#0A0A0A]">
                    Generator Ofert
                  </span>
                  <span className="font-mono text-[11px] text-[#737373]">
                    demo na żywo
                  </span>
                </div>
                <LiveDemoTerminal
                  script={OFFER_GENERATOR_SCRIPT}
                  chromeLabel="lessmanual-cli · generator-ofert"
                />
                <div className="mt-4 flex items-center justify-end px-1 font-mono text-[11px] text-[#737373]">
                  <span>5 min · win rate +40%</span>
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
              <h2>Trzy kroki. Klient dostaje wycenę zanim zdążysz odpisać na jego zapytanie.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {[
                {
                  num: "01",
                  title: "INPUT KLIENTA",
                  desc: "Klient podaje dane przez chat AI na Twojej stronie, formularz konfiguratora lub skanując QR kod na targach/showroomie. Agent zadaje doprecyzowujące pytania i wyciąga z bazy RAG odpowiednie produkty i ceny.",
                },
                {
                  num: "02",
                  title: "KALKULACJA + PDF",
                  desc: "System oblicza 1-3 warianty cenowe (ECO / STANDARD / PREMIUM lub custom). Generuje profesjonalny PDF z Twoim logo, opisami produktów i kalkulacją. PDF wysyłany mailem do klienta w ciągu 5 minut od pierwszego pytania.",
                },
                {
                  num: "03",
                  title: "FOLLOW-UP + CRM",
                  desc: "Auto follow-up po 3 i 7 dniach (od GROWTH). Klient który nie odpisał dostaje przypomnienie z linkiem do wyceny. Każda wycena trafia do CRM z danymi klienta, wybranym wariantem i statusem otwarcia PDF (SCALE).",
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

            {/* Remotion Player */}
            <div className="mt-16 max-w-[640px] mx-auto">
              <Player
                component={OfferGeneratorFlow}
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
              <h2>Firma OZE: od 3 godzin na wycenę do zera. Klient podaje dane, PDF leci mailem sam.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Left */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Klient
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#0A0A0A]">
                    Firma z branży OZE (fotowoltaika), kilkuset instalacji rocznie, wyceny ręczne zajmowały 2-3h per klient.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Problem
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Każda wycena: handlowiec zbierał dane przez telefon, otwierał Excel, liczył ręcznie, robił PDF w Wordzie, wysyłał mailem. 2-3 godziny per wycenę. Klient czekał 24-48h. Połowa nie odpowiadała po tak długim czasie.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Co dostał
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    System GROWTH: chat wycenowy na stronie, baza RAG z pełnym katalogiem paneli i falowników, kalkulator ROI, 3 warianty cenowe, PDF z brandingiem firmy. Auto follow-up D3 i D7. Integracja z CRM.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Dziś
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Klient wycenia sam o dowolnej porze. PDF w 5 minut. Handlowiec dostaje powiadomienie gdy klient otworzył ofertę - dzwoni w odpowiednim momencie. Win rate wyższy o 30+ punktów procentowych.
                  </p>
                </div>
              </div>

              {/* Right: metryki */}
              <div className="border border-[#E5E5E5] bg-white p-8" style={{ borderRadius: 8 }}>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Czas przygotowania wyceny
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      2h → 5 minut
                    </div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Win rate po wdrożeniu
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      +25-40%
                    </div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      ROI w 30 dni
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      ~300%
                    </div>
                  </div>
                </div>

                <p className="mt-6 font-mono text-[11px] text-[#737373] leading-[1.6]">
                  Pełne liczby i demo live na rozmowie 15-min.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PRICING ── */}
        <section id="pricing" className="px-6 md:px-10 py-24 md:py-36 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CENNIK GENERATOR OFERT</SectionLabel>
              <h2>Trzy tiery. Setup + abonament. Zero stawki godzinowej.</h2>
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
                      ? "0 4px 24px rgba(184,115,51,0.12)"
                      : undefined,
                  }}
                >
                  {tier.badge && (
                    <div
                      className="absolute -top-3 left-6 font-mono text-[11px] uppercase tracking-[0.18em] bg-[#8B4513] text-white px-3 py-1"
                      style={{ borderRadius: 4 }}
                    >
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      {tier.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#8B4513] mb-2">
                      {tier.subtitle}
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

            {/* Voice Agent upsell box */}
            <div
              className="mt-8 p-6 border border-[#E5E5E5] bg-[#FAFAFA] flex flex-col md:flex-row md:items-center gap-4"
              style={{ borderRadius: 8 }}
            >
              <div className="flex-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513] mb-1">
                  VOICE AGENT - ROZSZERZENIE
                </div>
                <p className="text-[15px] font-medium text-[#0A0A0A]">
                  Ta sama baza RAG → Voice Agent wycenia przez telefon.
                </p>
                <p className="text-[14px] text-[#525252] mt-1">
                  Klient dzwoni, agent zadaje pytania, oblicza warianty, wysyła PDF na maila. Zero handlowca w pierwszym kontakcie. Dodatkowy setup od 3 500 PLN + 1 200 PLN/mies.
                </p>
              </div>
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-5 py-3 text-[14px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#0A0A0A] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                Zapytaj o Voice →
              </Link>
            </div>

            <p className="mt-6 text-[12px] text-[#525252]">
              50% zaliczki przed startem. Reszta po wdrożeniu. Wdrożenie w 14 dni albo zwrot setup.
            </p>
          </div>
        </section>

        {/* ── MRR INCLUDES ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[720px]">
              <MRRIncludes product="generator" tier="GROWTH" />
            </div>
          </div>
        </section>

        {/* ── 5. WARIANTY BRANŻOWE ── */}
        <section id="warianty" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>WARIANTY BRANŻOWE</SectionLabel>
              <h2>Ten sam konfigurator, dedykowane wdrożenie pod Twoją branżę i typ wyceny.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VARIANTS.map((v) => (
                <div
                  key={v.segment}
                  className="bg-white border border-[#E5E5E5] p-6 flex flex-col gap-4"
                  style={{ borderRadius: 8 }}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                    {v.segment}
                  </div>

                  <div className="border-t border-[#E5E5E5] pt-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#8B4513] mb-2">
                      STARTER
                    </div>
                    <div className="text-[16px] font-medium text-[#0A0A0A]">
                      {v.basic.price} setup
                    </div>
                    <div className="text-[13px] text-[#525252] mt-0.5">
                      {v.basic.mrr}
                    </div>
                    <p className="text-[13px] text-[#737373] mt-2">
                      {v.basic.note}
                    </p>
                  </div>

                  <div className="border-t border-[#E5E5E5] pt-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#8B4513] mb-2">
                      PRO
                    </div>
                    <div className="text-[16px] font-medium text-[#0A0A0A]">
                      {v.pro.price} setup
                    </div>
                    <div className="text-[13px] text-[#525252] mt-0.5">
                      {v.pro.mrr}
                    </div>
                    <p className="text-[13px] text-[#737373] mt-2">
                      {v.pro.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section id="faq" className="px-6 md:px-10 py-24 md:py-36 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-12 max-w-[720px]">
              <SectionLabel>PYTANIA</SectionLabel>
              <h2>Najczęstsze pytania o generator ofert.</h2>
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
              Gotowy żeby klienci wyceniali się sami?
            </h2>

            <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.55] text-[#525252]">
              15 minut rozmowy. Pokażę demo na produktach z Twojej branży, ustalimy warianty i tier. Wdrożenie w 14 dni.
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
