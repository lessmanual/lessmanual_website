"use client";

import Link from "next/link";
import { LiveDemoTerminal } from "./LiveDemoTerminal";
import { CALENDLY_URL } from "@/lib/constants";
import { SOCIAL_PROOF } from "@/lib/social-proof";

export function HeroV2() {
  return (
    <section className="relative px-6 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_1fr)] gap-12 lg:gap-16 items-center">
          {/* Left column: copy */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-3 py-1.5 mb-8">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              <span className="font-mono text-[11px] tracking-tight text-[#525252]">
                Max 3 nowe projekty miesięcznie
              </span>
            </div>

            <h1 className="text-[#0A0A0A]">
              Zatrudnij agenta AI<br />
              za <span className="text-[#B87333]">1/5 ceny pracownika.</span>
            </h1>

            <p className="mt-8 max-w-[560px] text-[17px] leading-[1.55] text-[#525252]">
              Sprzedaż, obsługa, marketing, raportowanie - 24/7, bez L4, bez lojalności, bez stałej wypłaty. Od 900 PLN/mies.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-[#525252]">
              <span>76% open</span>
              <span className="text-[#A3A3A3]">·</span>
              <span>61% reply</span>
              <span className="text-[#A3A3A3]">·</span>
              <span>4h avg response</span>
              <span className="text-[#A3A3A3]">·</span>
              <span>{SOCIAL_PROOF.systemsLive} systemów live</span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                <span>Zarezerwuj rozmowę (15 min)</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="#systems"
                className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-6 py-3.5 text-[14px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#0A0A0A] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                Zobacz systemy
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["M", "D", "M", "P", "C", "A"].map((ch, i) => (
                  <span
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-[#F5EDE6] font-mono text-[11px] text-[#0A0A0A]"
                    style={{ zIndex: 10 - i }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <StarRow />
                <span className="text-[#525252]">5.0</span>
                <span className="text-[#A3A3A3]">·</span>
                <span className="text-[#525252]">{SOCIAL_PROOF.googleReviews} opinii Google · {SOCIAL_PROOF.companiesEngaged}+ firm B2B · {SOCIAL_PROOF.implementationsDelivered} wdrożeń</span>
              </div>
            </div>
          </div>

          {/* Right column: terminal */}
          <div className="relative">
            <LiveDemoTerminal />
            <div className="mt-4 flex items-center justify-between px-1 font-mono text-[11px] text-[#A3A3A3]">
              <span>Hot Lead Catcher · real-time demo</span>
              <span>76% open · 61% reply</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarRow() {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#B87333" aria-hidden="true">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
