"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Mapujemy proces, cel i zakres",
    duration: "30 minut rozmowy",
    desc: "Mapujemy Twoje procesy, definiujemy cel i zakres. Dostajesz konkretną propozycję zakresu, terminu i ceny.",
  },
  {
    num: "02",
    title: "Budujemy system",
    duration: "7 do 21 dni",
    desc: "Budujemy na Twoich danych i procesach. Ty dajesz 1 do 2 godzin na feedback. Resztę robimy.",
  },
  {
    num: "03",
    title: "Odbierasz wyniki",
    duration: "cotygodniowy raport",
    desc: "System idzie na produkcję. Monitorujemy i optymalizujemy. Cotygodniowy raport liczb. Trzy warstwy gwarancji.",
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
          <h2>Trzy kroki. Bez fakturowania godzin.</h2>
        </header>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]"
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
