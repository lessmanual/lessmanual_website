"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AI_GROWTH_MAP_URL, CALENDLY_URL } from "@/lib/constants";

export function FinalCTAV2() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="px-6 md:px-10 py-32 md:py-48"
      initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.95 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <div className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-3 py-1.5 mb-8">
          <span className="block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          <span className="font-mono text-[11px] tracking-tight text-[#525252]">
            Pierwszy krok: diagnoza procesu
          </span>
        </div>

        <h2 className="mx-auto max-w-[900px]">
          Zacznij od procesu, który zabiera najwięcej czasu.
        </h2>

        <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.55] text-[#525252]">
          Mapa pokaże pierwszy proces do automatyzacji, źródła potrzebne do
          działania agenta i sposób kontroli wyniku. Jeśli wdrożenie nie ma
          sensu, powiem Ci to wprost.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={AI_GROWTH_MAP_URL}
            className="group inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
            style={{ borderRadius: 4 }}
          >
            Sprawdź pierwszy proces do automatyzacji
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-6 py-3.5 text-[14px] font-medium text-[#0A0A0A] transition-all duration-200 hover:border-[#0A0A0A] hover:-translate-y-[1px]"
            style={{ borderRadius: 4 }}
          >
            Umów rozmowę o wdrożeniu
          </Link>
        </div>

        <div className="mt-16 pt-10 border-t border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#525252]">
          <span className="font-mono">LessManual.ai · Bartłomiej Chudzik</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/oferta" className="v2-link">Oferta</Link>
            <Link href="/blog" className="v2-link">Blog</Link>
            <Link href="/faq" className="v2-link">FAQ</Link>
            <Link href="/legal/polityka-prywatnosci" className="v2-link">Polityka prywatności</Link>
            <Link href="/legal/polityka-cookies" className="v2-link">Cookies</Link>
            <Link href="/legal/regulamin" className="v2-link">Regulamin</Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
