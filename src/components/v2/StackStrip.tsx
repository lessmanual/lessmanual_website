"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const STACK = [
  "Supabase",
  "Vercel",
  "Claude (Anthropic)",
  "AWS",
  "GCP",
  "Remotion",
  "Apify",
  "OpenAI",
];

export function StackStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className="border-y border-[#E5E5E5] bg-white px-6 md:px-10 py-8"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
            Zbudowane na
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {STACK.map((name) => (
              <span
                key={name}
                className="font-mono text-[13px] tracking-tight text-[#525252] transition-colors duration-200 hover:text-[#0A0A0A]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
