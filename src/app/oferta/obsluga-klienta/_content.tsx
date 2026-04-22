"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Player } from "@remotion/player";
import { CustomerServiceFlow } from "@/remotion/CustomerServiceFlow";
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

const CUSTOMER_SERVICE_SCRIPT: Line[] = [
  { kind: "prompt", text: "lessmanual support listen --channels=web,whatsapp,email" },
  { kind: "out", text: "Agent active · 3 channels · RAG ready (FAQ 247 docs)", tone: "muted", delay: 380 },
  { kind: "out", text: "Listening for incoming messages...", tone: "muted", delay: 240 },
  { kind: "blank" },
  { kind: "out", text: "[ 02:14 ] web · klient pyta o godziny dostawy", tone: "muted", delay: 280 },
  { kind: "prompt", text: "lessmanual support respond --source=rag --lang=pl" },
  { kind: "out", text: "RAG search · 99% precision match · answering...", tone: "muted", delay: 380 },
  { kind: "out", text: "Odpowiedź wysłana w 24s · CSAT 5/5", tone: "success", delay: 280 },
  { kind: "blank" },
  { kind: "out", text: "[ 02:47 ] whatsapp · skarga (score 32 < 50)", tone: "muted", delay: 280 },
  { kind: "prompt", text: "lessmanual support escalate --with-context" },
  { kind: "out", text: "Eskalacja do Ani z pełnym kontekstem rozmowy", tone: "muted", delay: 360 },
  { kind: "out", text: "Slack alert · SLA 2h · follow-up scheduled", tone: "success", delay: 280 },
  { kind: "blank" },
  { kind: "out", text: "[ dziś ] Stats 24h", tone: "muted", delay: 280 },
  { kind: "out", text: "Zapytania  138   (auto 104 · eskalacja 34)", tone: "accent", delay: 180 },
  { kind: "out", text: "Auto-resolve  75%   CSAT  4.7/5", tone: "accent", delay: 180 },
  { kind: "out", text: "→ Oszczędność etatów: 2.5 FTE", tone: "success", delay: 260 },
];

// ── Pricing tiers ────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "STARTER",
    badge: null,
    setup: "5 000 PLN",
    monthly: "900 PLN/mies.",
    subtitle: "1 kanał",
    featured: false,
    features: [
      "Chatbot na stronę LUB WhatsApp (1 kanał)",
      "RAG wytrenowany na FAQ firmy",
      "500 konwersacji/mies.",
      "Eskalacja do człowieka z kontekstem",
      "Bonus: eskalacja do człowieka z kontekstem rozmowy (wartość 1 000 PLN)",
    ],
  },
  {
    name: "GROWTH",
    badge: "NAJPOPULARNIEJSZY",
    setup: "10 000 PLN",
    monthly: "1 500 PLN/mies.",
    subtitle: "Multi-channel",
    featured: true,
    features: [
      "WhatsApp + email triage + chatbot web",
      "2 000 konwersacji/mies.",
      "Integracja CRM (HubSpot / Pipedrive)",
      "Miesięczny raport CSAT",
      "Bonus: Email Triage automation (wartość 600 PLN/mies)",
      "Bonus: WhatsApp Business integration (wartość 2 000 PLN)",
    ],
  },
  {
    name: "SCALE",
    badge: null,
    setup: "15 000 PLN",
    monthly: "2 200 PLN/mies.",
    subtitle: "Full Suite + Voice",
    featured: false,
    features: [
      "Wszystko z GROWTH",
      "Voice Agent (AI receptionist 24/7, polski głos)",
      "Unlimited konwersacje",
      "Wielojęzyczność (PL + EN + DE + UA)",
      "Custom integracje + 24/7 monitoring",
      "Bonus: Wielojęzyczność (wartość 3 000 PLN)",
    ],
  },
];

// ── Warianty segmentowe ──────────────────────────────────────────────────────

const VARIANTS = [
  {
    segment: "E-COMMERCE",
    name: "E-com",
    basic: { price: "5 000 PLN", mrr: "1 000 PLN/mies.", note: "koszyk, śledzenie zamówień, FAQ" },
    pro:   { price: "10 000 PLN", mrr: "1 800 PLN/mies.", note: "+ rekomendacje produktów, odzyskiwanie porzuconych koszyków" },
  },
  {
    segment: "PRZYCHODNIE / MEDYCYNA",
    name: "Med",
    basic: { price: "6 000 PLN", mrr: "1 200 PLN/mies.", note: "umawianie wizyt, FAQ, zgodność RODO" },
    pro:   { price: "12 000 PLN", mrr: "2 000 PLN/mies.", note: "+ przypomnienia SMS, integracja z systemem" },
  },
  {
    segment: "HOTELE / HORECA",
    name: "Hotel",
    basic: { price: "5 500 PLN", mrr: "1 000 PLN/mies.", note: "rezerwacje, wielojęzyczność, FAQ" },
    pro:   { price: "11 000 PLN", mrr: "1 800 PLN/mies.", note: "+ upselling, integracja z PMS" },
  },
];

// ── FAQ items ────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Czy AI nie pomyli się i nie zrazi klientów?",
    a: "Agent odpowiada wyłącznie z Twojej bazy wiedzy (RAG) - nie wymyśla, nie fantazjuje. Jeśli nie znajdzie odpowiedzi, eskaluje do człowieka z pełnym kontekstem rozmowy. Masz pełną kontrolę nad tym co system mówi.",
  },
  {
    q: "Jakie kanały obsługuje system?",
    a: "STARTER: chatbot na stronę LUB WhatsApp (1 kanał do wyboru). GROWTH: WhatsApp + email triage + chatbot web. SCALE: wszystkie kanały + Voice Agent (telefon). Każdy kanał przez jeden dashboard.",
  },
  {
    q: "Ile trwa wdrożenie?",
    a: "14 dni od podpisania. W tym czasie: trening RAG na FAQ Twojej firmy, konfiguracja kanałów, testy na danych testowych, uruchomienie produkcyjne. Jeśli nie wdrożymy w 14 dni - zwracamy setup.",
  },
  {
    q: "Czy system obsługuje wiele języków?",
    a: "Wielojęzyczność dostępna w tierze SCALE. Domyślnie: PL + EN + DE + UA. Dodatkowe języki na zamówienie. W STARTER i GROWTH: język polski + angielski.",
  },
  {
    q: "Czy jest integracja z CRM?",
    a: "Tak, od tieru GROWTH. HubSpot, Pipedrive, Salesforce, custom API. Każda eskalacja trafia do CRM z pełnym kontekstem rozmowy - zero ręcznego przepisywania.",
  },
  {
    q: "Czy dane klientów są bezpieczne?",
    a: "Serwery w EU, zgodność z RODO i AI Act. Dane Twoich klientów nie trenują modeli AI - zostają w Twoim systemie. Pełna izolacja per klient.",
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
  const panelId = `faq-panel-ok-${idx}`;
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

export default function ObslugaKlientaContent() {
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
                    Agent #3 LessManual · OBSŁUGA KLIENTA
                  </span>
                </div>

                <h1 className="text-[#0A0A0A]">
                  Odpowiedź w 30 sekund,<br />
                  24/7, na wszystkich<br />
                  <span className="text-[#B87333]">kanałach jednocześnie.</span>
                </h1>

                <p className="mt-8 max-w-[520px] text-[17px] leading-[1.55] text-[#525252]">
                  Chatbot RAG wytrenowany na FAQ Twojej firmy obsługuje web, WhatsApp i email. 60-80% zapytań automatycznie. Eskalacja do człowieka z pełnym kontekstem gdy trzeba. System od 900 PLN/mies. vs pracownik 8-9 tys. PLN/mies.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 border border-[#B87333] bg-[#F5EDE6] px-4 py-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">SCALE</span>
                  <span className="text-[13px] text-[#0A0A0A] font-medium">Voice Agent 24/7 - agent głosowy odbiera telefony po polsku</span>
                </div>

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
                    System Obsługi Klienta
                  </span>
                  <span className="font-mono text-[11px] text-[#737373]">
                    demo na żywo
                  </span>
                </div>
                <LiveDemoTerminal
                  script={CUSTOMER_SERVICE_SCRIPT}
                  chromeLabel="lessmanual-cli · obsluga-klienta"
                />
                <div className="mt-4 flex items-center justify-end px-1 font-mono text-[11px] text-[#737373]">
                  <span>3 kanały · auto-resolve 75%</span>
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
              <h2>Trzy kroki. Klient dostaje odpowiedź zanim Ty zdążysz odblokować telefon.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
              {[
                {
                  num: "01",
                  title: "TRENING RAG",
                  desc: "Agent uczy się na FAQ, regulaminach, cenniku i historii rozmów Twojej firmy. Baza wiedzy to tylko Twoje dokumenty - nic nie wymyśla. Aktualizacja bazy w minuty przez panel. Wdrożenie: 14 dni.",
                },
                {
                  num: "02",
                  title: "OBSŁUGA KANAŁÓW",
                  desc: "Zapytanie wpada przez web, WhatsApp lub email. Agent odpowiada w tym samym kanale w ciągu kilku sekund. CSAT scoring per rozmowę. Gdy rozmowa wymaga człowieka - eskalacja z pełnym kontekstem trafia do Slack lub CRM.",
                },
                {
                  num: "03",
                  title: "RAPORT + OPTYMALIZACJA",
                  desc: "Miesięczny raport CSAT (od GROWTH): ile zapytań obsłużonych, ile eskalacji, średni czas odpowiedzi, tematy najczęstszych pytań. Dane wskazują co dodać do bazy by podnieść auto-resolve powyżej 80%.",
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
                component={CustomerServiceFlow}
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

        {/* ── 2.5 VOICE AGENT ── */}
        <section id="voice-agent" className="px-6 md:px-10 py-24 md:py-36 bg-[#0A0A0A]">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B87333] mb-4">
                  SCALE TIER · VOICE AGENT
                </div>
                <h2 className="text-white">
                  Kiedy Twoi klienci dzwonią o 22:00, nasz agent głosowy odbiera.
                </h2>
                <p className="mt-6 text-[17px] leading-[1.55] text-[#A3A3A3]">
                  Polski głos (ElevenLabs), naturalny styl rozmowy. Agent kwalifikuje rozmowce, odpowiada na FAQ, umawia spotkania w kalendarzu, aktualizuje CRM na zywo. Eskalacja do człowieka z pełnym transkryptem gdy trzeba.
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {[
                    "Odbiera 100% połączeń - zero kolejek, zero straconych klientów",
                    "Transkrypt + analiza per rozmowa - widzisz co klienci pytają",
                    "Booking w kalendarzu bez ingerencji człowieka",
                    "CRM update live - każda rozmowa trafia jako nota z kontekstem",
                    "Eskalacja z pełnym transkryptem gdy sytuacja wymaga decyzji",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-[#D4D4D4]">
                      <span className="text-[#B87333] mt-0.5 shrink-0">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-[#B87333] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#8B4513] hover:-translate-y-[1px]"
                    style={{ borderRadius: 4 }}
                  >
                    SCALE - zapytaj o Voice Agent
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </div>
              <div className="border border-[#262626] bg-[#141414] p-8" style={{ borderRadius: 8 }}>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-6">
                  voice-agent.log
                </div>
                <div className="flex flex-col gap-4 font-mono text-[12px]">
                  <div>
                    <span className="text-[#737373]">[ 22:14 ]</span>
                    <span className="ml-2 text-[#D4D4D4]">Przychodzące połączenie · Anna Kowalska</span>
                  </div>
                  <div className="pl-4 text-[#A3A3A3]">Agent: Dzień dobry, Pani Anno. W czym mogę pomoc?</div>
                  <div className="pl-4 text-[#A3A3A3]">Klient: Chciałabym umówić spotkanie na przyszły tydzień.</div>
                  <div className="pl-4 text-[#10B981]">Agent: Mamy wolne wtorek 14:00 lub środa 10:30. Który termin pasuje?</div>
                  <div className="border-t border-[#262626] pt-4">
                    <span className="text-[#B87333]">→</span>
                    <span className="ml-2 text-[#D4D4D4]">Booking potwierdzony · SMS wysłany · CRM zaktualizowany</span>
                  </div>
                  <div>
                    <span className="text-[#B87333]">→</span>
                    <span className="ml-2 text-[#D4D4D4]">Czas rozmowy: 2m 14s · Transkrypt zapisany</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CASE STUDY ── */}
        <section id="case" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CASE STUDY</SectionLabel>
              <h2>E-commerce: 200 zapytań dziennie obsługiwanych bez jednego pracownika działu obsługi.</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Left */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Klient
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#0A0A0A]">
                    Sklep e-commerce, segment mid-market, 200+ zapytań dziennie o statusy zamówień, zwroty i godziny dostawy.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Problem
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    Pracownik działu obsługi: 8-9 tys. PLN/mies. Odpowiadał na te same 15 pytań w kółko. Poza godzinami pracy - zero odpowiedzi. Klienci pisali negatywne opinie o czasie oczekiwania.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Co dostał
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    System GROWTH: chatbot web + WhatsApp + email triage. RAG wytrenowany na FAQ, regulaminie zwrotów i bazie produktowej. Eskalacja z kontekstem gdy klient prosi o decyzję. Integracja z CRM - każda eskalacja trafia z historią rozmowy.
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-2">
                    Dziś
                  </div>
                  <p className="text-[16px] leading-[1.7] text-[#525252]">
                    75% zapytań obsługiwanych automatycznie, średnia odpowiedź w 24 sekundy. Pracownik obsługi skupia się na przypadkach wymagających decyzji - nie na powtarzalnych pytaniach.
                  </p>
                </div>
              </div>

              {/* Right: metryki */}
              <div className="border border-[#E5E5E5] bg-white p-8" style={{ borderRadius: 8 }}>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Automatyzacja zapytań
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      75% (było 0%)
                    </div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Czas odpowiedzi
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      &lt;30s (było 4-24h)
                    </div>
                  </div>
                  <div className="border-t border-[#E5E5E5]" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
                      Koszt systemu vs pracownik
                    </div>
                    <div className="text-[28px] font-medium text-[#0A0A0A] tracking-tight">
                      900 vs 8 500 PLN/mies.
                    </div>
                  </div>
                </div>

                <p className="mt-6 font-mono text-[11px] text-[#737373] leading-[1.6]">
                  Pełne liczby i demo live pokazujemy na rozmowie 15-min.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PRICING ── */}
        <section id="pricing" className="px-6 md:px-10 py-24 md:py-36 bg-white border-y border-[#E5E5E5]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>CENNIK OBSŁUGA KLIENTA</SectionLabel>
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

            {/* Voice Agent add-on box */}
            <div
              className="mt-8 p-6 border border-[#E5E5E5] bg-[#FAFAFA] flex flex-col md:flex-row md:items-center gap-4"
              style={{ borderRadius: 8 }}
            >
              <div className="flex-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513] mb-1">
                  VOICE AGENT
                </div>
                <p className="text-[15px] font-medium text-[#0A0A0A]">
                  Recepcjonistka która nigdy nie idzie na L4.
                </p>
                <p className="text-[14px] text-[#525252] mt-1">
                  AI odbiera telefon 24/7, kwalifikuje rozmówcę, umawia spotkania w kalendarzu, wysyła SMS z potwierdzeniem. Nagrania i transkrypcje każdej rozmowy. Dostępny w tierze SCALE lub jako add-on.
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
              <MRRIncludes product="obsluga" tier="GROWTH" />
            </div>
          </div>
        </section>

        {/* ── 5. WARIANTY BRANŻOWE ── */}
        <section id="warianty" className="px-6 md:px-10 py-24 md:py-36 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-16 max-w-[720px]">
              <SectionLabel>WARIANTY BRANŻOWE</SectionLabel>
              <h2>Ten sam system, dedykowane wdrożenie pod Twoją branżę.</h2>
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
                      BASIC
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
              <h2>Najczęstsze pytania o system obsługi klienta.</h2>
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
              Gotowy żeby system odpowiadał klientom za Ciebie?
            </h2>

            <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.55] text-[#525252]">
              15 minut rozmowy. Pokażę demo na FAQ Twojej firmy, ustalimy kanały i tier. Wdrożenie w 14 dni.
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
