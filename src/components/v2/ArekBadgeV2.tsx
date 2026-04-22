"use client";

import Image from "next/image";

export function ArekBadgeV2() {
  return (
    <section className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-8 md:py-10">
        <div className="flex items-center gap-4 md:gap-5 max-w-[820px] mx-auto">
          <Image
            src="/arek-skuza.jpg"
            alt="Arek Skuza"
            width={48}
            height={48}
            className="rounded-full border border-[#E5E5E5] shrink-0"
          />
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-1">
              LinkedIn · 2026
            </div>
            <p className="text-[15px] leading-[1.55] text-[#0A0A0A]">
              <span className="italic">&ldquo;Focus. Precision. Excellent time management, and AI agents&apos; knowledge are what make Bartek an exceptional architect and engineer.&rdquo;</span>{" "}
              <span className="text-[#525252]">- Arek Skuza, CEO and boards advisor on AI Powered Growth</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
