"use client";

import { motion } from "framer-motion";
import { TextRotator } from "@/components/animations/TextRotator";
import { ProofBar } from "@/components/ui/ProofBar";
import { Button } from "@/components/ui/Button";
import {
  AI_SDR_CALENDLY_URL,
  AI_SDR_ROTATOR_WORDS,
  AI_SDR_PROOF_METRICS,
  AI_SDR_PROOF_META,
} from "@/lib/ai-sdr-constants";

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
          Spotkania z decydentami w Twoim kalendarzu. Płacisz tylko za{" "}
          <TextRotator words={AI_SDR_ROTATOR_WORDS} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary max-w-[680px] mx-auto text-xl leading-relaxed"
        >
          System AI, który znajduje Twoich idealnych klientów, pisze spersonalizowane
          wiadomości i umawia spotkania B2B. Zero stałych opłat miesięcznych. Zero ryzyka.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button href={AI_SDR_CALENDLY_URL} external>
            Chcę spotkania w kalendarzu
          </Button>
          <Button href="#wyniki" variant="text">
            Zobacz wyniki z aktywnej kampanii
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p variants={fadeUp} className="mt-5 text-sm text-text-light">
          Pokażemy, ile spotkań realistycznie możesz mieć. Zero zobowiązań.
        </motion.p>

        {/* Proof Bar */}
        <motion.div variants={fadeUp} className="mt-12">
          <ProofBar metrics={AI_SDR_PROOF_METRICS} meta={AI_SDR_PROOF_META} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary text-sm"
        >
          80% firm B2B traci ponad 100 godzin rocznie na ręczny prospecting, który nie przynosi spotkań.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-4 font-mono text-sm text-accent tracking-wide font-medium"
        >
          Pierwszy w Polsce: AI SDR z modelem Pay-Per-Meeting.
        </motion.p>
      </motion.div>
    </section>
  );
}
