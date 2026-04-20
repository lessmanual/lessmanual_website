"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_PROOF } from "@/lib/social-proof";

export function WhoWeAreCard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="bg-[#FAFAFA] border-t border-[#E5E5E5] px-6 md:px-10 py-[80px] md:py-[120px]"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-8">
          KTO BUDUJE
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-start">
          {/* Lewa: avatar + nazwa + rola */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src="/bartek.jpg"
              alt="Bartłomiej Chudzik - LessManual"
              width={120}
              height={120}
              className="rounded-full border-2 border-[#E5E5E5]"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
            <div className="text-center md:text-left">
              <div className="text-[17px] font-semibold text-[#0A0A0A]">
                Bartłomiej Chudzik
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mt-1">
                CEO &amp; Solution Architect
              </div>
            </div>
          </div>

          {/* Prawa: pitch + proof + CTA */}
          <div className="flex flex-col gap-5">
            <p className="text-[17px] leading-[1.6] text-[#0A0A0A] max-w-[640px]">
              Solo founder. Buduję agenty AI dla firm B2B w Polsce od 2025 roku.
              Pięć produktów core. Sprint developmentu: 7 dni po scope locku (discovery + PRD + baza wiedzy osobno). Wycena projektowa, nigdy godzinowa.
            </p>

            <p className="text-[15px] leading-[1.65] text-[#525252] max-w-[640px]">
              Pracuję bez pośredników. Kod, wdrożenie, pomiar efektu, utrzymanie - wszystko u jednej osoby.
              8 lat w logistyce B2B nauczyło mnie, że tam gdzie ludzie powtarzają te same kroki setki razy dziennie, zawsze lepszy jest system.
            </p>

            {/* Proof strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-[#E5E5E5]">
              <ProofStat value={`${SOCIAL_PROOF.companiesEngaged}+`} label="firm B2B" />
              <ProofStat value={`${SOCIAL_PROOF.implementationsDelivered}`} label="wdrożeń" />
              <ProofStat value={`${SOCIAL_PROOF.googleRating}`} label="★ Google" />
              <ProofStat value="7d" label="sprint" />
            </div>

            <Link
              href="/o-nas"
              className="v2-link inline-flex items-center gap-1.5 mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[#B87333] hover:text-[#0A0A0A] transition-colors duration-150 w-fit"
            >
              Więcej o firmie →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ProofStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-semibold text-[17px] text-[#0A0A0A]">{value}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#525252]">{label}</span>
    </div>
  );
}
