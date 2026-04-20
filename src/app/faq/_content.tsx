"use client";

import React, { useState } from "react";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { FinalCTAV2 } from "@/components/v2/FinalCTAV2";
import { FAQ_ITEMS } from "@/lib/constants";

// ── Section label ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A3A3A3] mb-4">
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

export default function FaqContent() {
  return (
    <>
      <HeaderV2 />

      <main>
        {/* ── HERO ── */}
        <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <SectionLabel>FAQ</SectionLabel>
            <h1 className="max-w-[800px]">
              Najczęstsze pytania<br />
              o systemy AI LessManual
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.55] text-[#525252]">
              Wszystko co chcesz wiedzieć zanim zarezerwujesz rozmowę. Jeżeli nie znajdziesz odpowiedzi, napisz na{" "}
              <a
                href="mailto:kontakt@lessmanual.ai"
                className="text-[#B87333] hover:underline"
              >
                kontakt@lessmanual.ai
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── KATEGORIE ── */}
        {FAQ_ITEMS.map((category, catIdx) => (
          <section
            key={category.category}
            className={`px-6 md:px-10 py-16 md:py-24 ${catIdx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}
          >
            <div className="mx-auto max-w-[1440px]">
              <header className="mb-10 max-w-[720px]">
                <SectionLabel>{category.category.toUpperCase()}</SectionLabel>
                <h2 className="text-[#0A0A0A]">{category.category}</h2>
                <p className="mt-4 text-[15px] leading-[1.65] text-[#525252]">
                  {catIdx === 0 && "Odpowiedzi na pytania o to jak działają nasze systemy, ile trwa wdrożenie i czego możesz się spodziewać."}
                  {catIdx === 1 && "Szczegóły dotyczące cen, warunków współpracy i gwarancji jaką oferujemy każdemu klientowi."}
                  {catIdx === 2 && "Pytania o bezpieczeństwo danych, zgodność z RODO i jak możesz nam zaufać jako partnerowi."}
                </p>
              </header>

              <div
                className="max-w-[800px] border border-[#E5E5E5] bg-white px-8"
                style={{ borderRadius: 8 }}
              >
                {category.items.map((item, itemIdx) => (
                  <FAQItem
                    key={item.q}
                    q={item.q}
                    a={item.a}
                    idx={catIdx * 10 + itemIdx}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── FINAL CTA ── */}
        <div className="bg-[#F5EDE6]">
          <FinalCTAV2 />
        </div>
      </main>

      <FooterV2 />
    </>
  );
}
