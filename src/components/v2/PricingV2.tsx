"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AI_GROWTH_MAP_URL } from "@/lib/constants";

const ROWS = [
  {
    name: "Content Machine",
    slug: "content i SEO",
    setup: "wdrożenie",
    monthly: "miesięczna obsługa",
    note: "dla firm, które chcą stały content bez zatrudniania zespołu",
  },
  {
    name: "Customer Operations AI",
    slug: "obsługa zapytań i spraw",
    setup: "wdrożenie",
    monthly: "miesięczna obsługa",
    note: "dla firm z rosnącym wolumenem pytań, maili i spraw",
  },
  {
    name: "Premium Cold Email+",
    slug: "sprzedaż B2B",
    setup: "wdrożenie",
    monthly: "miesięczna obsługa",
    note: "dla kampanii, gdzie jakość listy i personalizacji ma wygrać z wolumenem",
  },
  {
    name: "Indywidualne wdrożenie",
    slug: "niestandardowy proces",
    setup: "po diagnozie",
    monthly: "utrzymanie",
    note: "gdy trzeba połączyć dane, narzędzia i decyzje w jeden proces",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function PricingV2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-white border-y border-[#E5E5E5] px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-16 max-w-[720px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
            Model współpracy
          </div>
          <h2>Zakres i wycena po diagnozie procesu.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Pracujemy w modelu wdrożenie + miesięczna obsługa. Na koszt
            wpływają dane, integracje, wolumen, ryzyko błędu i poziom
            utrzymania. Najpierw sprawdzamy opłacalność, potem podajemy
            konkretny zakres, termin i cenę.
          </p>
        </header>

        <div className="border border-[#E5E5E5] bg-[#FAFAFA]">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_1.2fr] gap-6 px-6 py-4 border-b border-[#E5E5E5] font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
            <div>System</div>
            <div>Start</div>
            <div>Dalej</div>
            <div>Kiedy pasuje</div>
          </div>

          <motion.div
            ref={ref}
            initial={reducedMotion ? "visible" : "hidden"}
            animate={reducedMotion || inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {ROWS.map((r) => (
              <motion.div
                key={r.name}
                className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr_1fr_1.2fr] gap-2 md:gap-6 px-6 py-5 md:py-6 border-b border-[#E5E5E5] last:border-b-0 transition-colors duration-200 hover:bg-white"
                variants={itemVariants}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <div className="text-[15px] font-medium text-[#0A0A0A]">{r.name}</div>
                  <div className="text-[13px] text-[#737373]">{r.slug}</div>
                </div>
                <div className="font-mono text-[14px] text-[#0A0A0A]">{r.setup}</div>
                <div className="font-mono text-[14px] text-[#0A0A0A]">{r.monthly}</div>
                <div className="text-[13px] text-[#525252]">{r.note}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[14px] text-[#525252]">
            Jasny zakres · cena po diagnozie · utrzymanie systemu w zakresie
          </p>
          <Link
            href={AI_GROWTH_MAP_URL}
            className="inline-flex items-center gap-2 bg-[#0A0A0A] px-6 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#B87333] hover:-translate-y-[1px]"
            style={{ borderRadius: 4 }}
          >
            Sprawdź pierwszy proces do automatyzacji
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
