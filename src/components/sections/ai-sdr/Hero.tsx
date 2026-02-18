"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Star, Clock } from "lucide-react";
import { TextRotator } from "@/components/animations/TextRotator";
import { Button } from "@/components/ui/Button";
import {
  AI_SDR_CALENDLY_URL,
  AI_SDR_ROTATOR_WORDS,
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
        {/* Back link */}
        <motion.div variants={fadeUp} className="text-left mb-8">
          <Link
            href="/oferta"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            Oferta
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: Users, text: "10+ firm B2B" },
            { icon: Star, text: "5.0 na Google" },
            { icon: Clock, text: "Zostały 2 miejsca w marcu", highlight: true },
          ].map((badge) => (
            <span
              key={badge.text}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                badge.highlight
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-white border border-border text-text-secondary"
              }`}
            >
              <badge.icon size={14} strokeWidth={2} />
              {badge.text}
            </span>
          ))}
        </motion.div>

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
