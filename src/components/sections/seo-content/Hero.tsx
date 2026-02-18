"use client";

import { motion } from "framer-motion";
import { TextRotator } from "@/components/animations/TextRotator";
import { ProofBar } from "@/components/ui/ProofBar";
import { Button } from "@/components/ui/Button";
import {
  SEO_CALENDLY_URL,
  SEO_ROTATOR_WORDS,
  SEO_PROOF_METRICS,
  SEO_PROOF_META,
} from "@/lib/seo-content-constants";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative pt-36 pb-28 md:pt-48 md:pb-40">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-[900px] mx-auto px-6 text-center"
      >
        {/* H1 */}
        <motion.h1 variants={fadeUp} className="font-serif leading-[1.05]">
          30 wpisów SEO miesięcznie. Bez Twojego{" "}
          <TextRotator words={SEO_ROTATOR_WORDS} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary max-w-[680px] mx-auto text-xl leading-relaxed"
        >
          Blog, który pisze się sam. AI generuje artykuły, human review pilnuje jakości,
          system publikuje na Twoim blogu. Ty zbierasz ruch z Google
          i cytowania w ChatGPT.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button href={SEO_CALENDLY_URL} external>
            Chcę ruch z Google bez pisania
          </Button>
          <Button href="#wyniki" variant="text">
            Zobacz case study
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p variants={fadeUp} className="mt-5 text-sm text-text-light">
          Pokażemy, ile ruchu tracisz i ile artykułów potrzebujesz. Zero zobowiązań.
        </motion.p>

        {/* Proof Bar */}
        <motion.div variants={fadeUp} className="mt-12">
          <ProofBar metrics={SEO_PROOF_METRICS} meta={SEO_PROOF_META} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary text-sm"
        >
          Firmy z blogiem generują 67% więcej leadów. 53% ruchu B2B = organiczny (BrightEdge, Demand Metric).
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-4 font-mono text-sm text-accent tracking-wide font-medium"
        >
          Google + ChatGPT + Gemini. Jeden system. Zero Twojego czasu.
        </motion.p>
      </motion.div>
    </section>
  );
}
