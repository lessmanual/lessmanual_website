"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { REVIEWS } from "@/lib/constants";
import { SOCIAL_PROOF } from "@/lib/social-proof";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function TestimonialsV2() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-white border-y border-[#E5E5E5] px-6 md:px-10 py-32 md:py-48">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-16 max-w-[720px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
            {SOCIAL_PROOF.googleRating.toFixed(1)} · Google Reviews · {SOCIAL_PROOF.googleReviews} opinii
          </div>
          <h2>Klienci nie oglądają demo. Oglądają wyniki.</h2>
        </header>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={reducedMotion ? "visible" : "hidden"}
          animate={reducedMotion || inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {REVIEWS.filter(r => r.name !== "Arek Skuza").map((r, i, arr) => (
            <motion.article
              key={r.name}
              className={`border border-[#E5E5E5] p-8 md:p-10 bg-[#FAFAFA] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#0A0A0A]/40 ${
                i === arr.length - 1 && arr.length % 2 === 1
                  ? "md:col-span-2"
                  : ""
              }`}
              variants={itemVariants}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white font-mono text-[13px] text-[#0A0A0A]">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-[14px] font-medium text-[#0A0A0A]">
                      {r.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#737373]">
                      Google Review · {r.meta}
                    </div>
                  </div>
                </div>
                <StarRow />
              </div>

              <p className="text-[15px] leading-[1.65] text-[#0A0A0A]">
                {r.text}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#E5E5E5] pt-5">
                <span className="font-mono text-[11px] text-[#737373]">przed</span>
                <span className="text-[13px] text-[#525252]">{r.before}</span>
                <span className="text-[#B87333]">→</span>
                <span className="font-mono text-[11px] text-[#737373]">po</span>
                <span className="text-[13px] text-[#0A0A0A]">{r.after}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StarRow() {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill="#B87333" aria-hidden="true">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
