"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Diagnoza procesu",
    duration: "punkt startu",
    desc: "Sprawdzamy, gdzie znika czas, ile kosztuje obecny sposób pracy i po czym poznamy, że wdrożenie ma sens.",
  },
  {
    num: "02",
    title: "Źródła i reguły",
    duration: "zakres",
    desc: "Ustalamy, z jakich danych agent korzysta, co może zrobić sam i które decyzje zawsze zostają po stronie człowieka.",
  },
  {
    num: "03",
    title: "Pilot na realnych danych",
    duration: "sprawdzenie",
    desc: "Uruchamiamy ograniczony zakres, mierzymy jakość wyniku i poprawiamy reguły przed przejściem na produkcję.",
  },
  {
    num: "04",
    title: "Produkcja i utrzymanie",
    duration: "stała opieka",
    desc: "Wdrażamy system do codziennej pracy, monitorujemy błędy i rozwijamy go wraz ze zmianą procesu.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function ProcessV2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  return (
    <section id="proces" className="px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-16 max-w-[720px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
            Proces
          </div>
          <h2>Od procesu do działającego systemu.</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-[#525252]">
            Najpierw sprawdzamy sens wdrożenia. Dopiero potem dobieramy
            technologię, zakres pilota i sposób utrzymania.
          </p>
        </header>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E5E5E5] border border-[#E5E5E5]"
          initial={reducedMotion ? "visible" : "hidden"}
          animate={reducedMotion || inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {STEPS.map((s) => (
            <motion.div
              key={s.num}
              className="bg-[#FAFAFA] p-8 md:p-10"
              variants={itemVariants}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-[56px] font-medium leading-none tracking-tight text-[#B87333]">
                  {s.num}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                  {s.duration}
                </span>
              </div>
              <h3 className="text-[#0A0A0A]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#525252]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
