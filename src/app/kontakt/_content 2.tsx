"use client";

import React, { useState } from "react";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { FinalCTAV2 } from "@/components/v2/FinalCTAV2";
import { FAQ_ITEMS } from "@/lib/constants";
import { CALENDLY_URL } from "@/lib/constants";

// ── Section label ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
      {children}
    </div>
  );
}

// ── FAQ accordion item (reused from hot-lead-catcher) ─────────────────────────

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `kontakt-faq-panel-${idx}`;
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

// ── Contact info item ─────────────────────────────────────────────────────────

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
        {label}
      </div>
      <div className="text-[15px] text-[#0A0A0A]">{children}</div>
    </div>
  );
}

// ── Main content ───────────────────────────────────────────────────────────────

// Pytania z pierwszej kategorii "Produkt i wdrozenie"
const MINI_FAQ = FAQ_ITEMS[0]?.items ?? [];

export default function KontaktContent() {
  return (
    <>
      <HeaderV2 />

      <main>
        {/* ── HERO ── */}
        <section className="px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <SectionLabel>KONTAKT</SectionLabel>
            <h1 className="max-w-[800px]">
              Porozmawiajmy<br />
              o Twoim projekcie.
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.55] text-[#525252]">
              Zarezerwuj 15-minutową rozmowę. Sprawdzimy razem czy agenty AI pasują do Twojego biznesu i co można zautomatyzować w pierwszej kolejności.
            </p>
          </div>
        </section>

        {/* ── GRID KONTAKT / CAL.COM ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

              {/* LEWA: dane kontaktowe */}
              <div className="flex flex-col gap-8">
                <div>
                  <SectionLabel>DANE KONTAKTOWE</SectionLabel>
                  <h2 className="text-[#0A0A0A]">Napisz lub zarezerwuj slot.</h2>
                  <p className="mt-4 text-[15px] leading-[1.65] text-[#525252]">
                    Wolisz maila? Napisz bezpośrednio. Wolisz pogadać? Wybierz termin w kalendarzu po prawej. Średni czas odpowiedzi na maila to 4 godziny w dni robocze.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <ContactRow label="EMAIL">
                    <a
                      href="mailto:kontakt@lessmanual.ai"
                      className="text-[#0A0A0A] hover:text-[#B87333] transition-colors duration-200"
                    >
                      kontakt@lessmanual.ai
                    </a>
                  </ContactRow>

                  <ContactRow label="ADRES">
                    <span className="text-[#525252]">Cendrowice, ul. Długa 33</span>
                  </ContactRow>

                  <ContactRow label="LINKEDIN">
                    <a
                      href="https://www.linkedin.com/in/bartlomiej-chudzik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0A0A0A] hover:text-[#B87333] transition-colors duration-200"
                    >
                      linkedin.com/in/bartlomiej-chudzik
                    </a>
                  </ContactRow>

                  <ContactRow label="CZAS ODPOWIEDZI">
                    <span className="text-[#525252]">Średnia 4h w dni robocze</span>
                  </ContactRow>
                </div>

                <div
                  className="border border-[#E5E5E5] bg-[#FAFAFA] px-6 py-5"
                  style={{ borderRadius: 6 }}
                >
                  <p className="font-mono text-[11px] text-[#737373] leading-[1.6]">
                    LessManual Bartłomiej Chudzik
                    <br />
                    NIP 1231589909
                    <br />
                    JDG od 09.10.2025
                  </p>
                </div>

                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px] w-fit"
                  style={{ borderRadius: 4 }}
                >
                  Zarezerwuj rozmowę (15 min)
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>

              {/* PRAWA: Cal.com iframe */}
              <div>
                <SectionLabel>REZERWACJA ROZMOWY</SectionLabel>
                <iframe
                  src="https://cal.com/bartłomiej-chudzik-2en6pt/15min?embed=true"
                  width="100%"
                  height="640"
                  style={{ border: 0, borderRadius: 4 }}
                  title="Rezerwacja rozmowy 15 minut"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── MINI FAQ ── */}
        <section className="px-6 md:px-10 py-16 md:py-24 bg-[#FAFAFA]">
          <div className="mx-auto max-w-[1440px]">
            <header className="mb-10 max-w-[720px]">
              <SectionLabel>SZYBKIE ODPOWIEDZI</SectionLabel>
              <h2 className="text-[#0A0A0A]">Najczęściej pytasz o...</h2>
              <p className="mt-4 text-[15px] leading-[1.65] text-[#525252]">
                Kilka pytań które pojawiają się na każdej rozmowie. Pełna lista odpowiedzi dostępna na stronie FAQ.
              </p>
            </header>

            <div
              className="max-w-[800px] border border-[#E5E5E5] bg-white px-8"
              style={{ borderRadius: 8 }}
            >
              {MINI_FAQ.map((item, idx) => (
                <FAQItem key={item.q} q={item.q} a={item.a} idx={idx} />
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/faq"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#B87333] hover:underline"
              >
                Wszystkie pytania i odpowiedzi →
              </a>
              <p className="mt-3 text-[13px] text-[#737373]">
                Masz inne pytanie? Napisz na kontakt@lessmanual.ai lub zarezerwuj rozmowę wyżej.
              </p>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <div className="bg-[#F5EDE6]">
          <FinalCTAV2 />
        </div>
      </main>

      <FooterV2 />
    </>
  );
}
