"use client";

import Link from "next/link";
import { LiveDemoTerminal } from "./LiveDemoTerminal";
import { AI_GROWTH_MAP_URL, CALENDLY_URL } from "@/lib/constants";
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
                Automatyzacja AI dla firm B2B
              </span>
            </div>

            <h1 className="text-[#0A0A0A]">
              Zdejmujemy ręczną pracę ze sprzedaży, contentu i{" "}
              <span className="text-[#B87333]">obsługi klienta.</span>
            </h1>

            <p className="mt-8 max-w-[560px] text-[17px] leading-[1.55] text-[#525252]">
              Najpierw liczymy, gdzie firma traci czas i pieniądze. Potem
              wdrażamy agenta AI, który pracuje na zatwierdzonych danych,
              przechodzi kontrolę jakości i przekazuje wyjątki człowiekowi.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-[#525252]">
              <span>dane Twojej firmy</span>
              <span className="text-[#737373]">·</span>
              <span>jasne reguły</span>
              <span className="text-[#737373]">·</span>
              <span>kontrola człowieka</span>
              <span className="text-[#737373]">·</span>
              <span>wdrożenie i utrzymanie</span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={AI_GROWTH_MAP_URL}
                className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                <span>Sprawdź pierwszy proces do automatyzacji</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-6 py-3.5 text-[14px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#0A0A0A] hover:-translate-y-[1px]"
                style={{ borderRadius: 4 }}
              >
                Porozmawiaj o wdrożeniu
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
                <span className="text-[#525252]">{SOCIAL_PROOF.googleRating.toFixed(1)}</span>
                <span className="text-[#737373]">·</span>
                <span className="text-[#525252]">
                  {SOCIAL_PROOF.googleReviews} opinii Google · {SOCIAL_PROOF.companiesEngaged}+ firm B2B · {SOCIAL_PROOF.implementationsDelivered} wdrożenia
                </span>
              </div>
            </div>
          </div>

          {/* Right column: terminal */}
          <div className="relative">
            <LiveDemoTerminal />
            <div className="mt-4 flex items-center justify-between px-1 font-mono text-[11px] text-[#737373]">
              <span>Mapa pierwszego procesu AI</span>
              <span>diagnoza przed wdrożeniem</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarRow() {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#B87333" aria-hidden="true">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
