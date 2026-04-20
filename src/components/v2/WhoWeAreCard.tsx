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
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-center">
          {/* Lewa: avatar + nazwa */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image
              src="/bartek.jpg"
              alt="Bartłomiej Chudzik - LessManual"
              width={96}
              height={96}
              className="rounded-full border-2 border-[#E5E5E5]"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
            <div className="text-center md:text-left">
              <div className="text-[15px] font-medium text-[#0A0A0A]">
                Bartłomiej Chudzik
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A3A3A3] mt-0.5">
                CEO &amp; Solution Architect
              </div>
            </div>
          </div>

          {/* Prawa: opis + link */}
          <div>
            <p className="text-[16px] leading-[1.65] text-[#525252] max-w-[600px]">
              Buduję systemy AI dla firm B2B w Polsce od 2025 roku.
              {SOCIAL_PROOF.companiesEngaged}+ firm B2B, {SOCIAL_PROOF.implementationsDelivered} wdrożeń, {SOCIAL_PROOF.googleRating} na Google.
            </p>
            <Link
              href="/o-nas"
              className="v2-link inline-flex items-center gap-1.5 mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[#B87333] hover:text-[#0A0A0A] transition-colors duration-150"
            >
              O nas →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
