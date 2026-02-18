"use client";

import { motion } from "framer-motion";
import { TextRotator } from "@/components/animations/TextRotator";
import { ProofBar } from "@/components/ui/ProofBar";
import { Button } from "@/components/ui/Button";
import {
  GEN_OFERT_CALENDLY_URL,
  GEN_OFERT_ROTATOR_WORDS,
  GEN_OFERT_PROOF_METRICS,
  GEN_OFERT_PROOF_META,
} from "@/lib/generator-ofert-constants";

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
          Wyceny w 5 minut zamiast 2 godzin. Profesjonalna oferta PDF{" "}
          <TextRotator words={GEN_OFERT_ROTATOR_WORDS} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary max-w-[680px] mx-auto text-xl leading-relaxed"
        >
          Klient sam wycenia na Twojej stronie — Ty dostajesz gotowe zapytanie z PDF.
          Dla firm OZE, producentów mebli i firm remontowo-budowlanych. Pod klucz,
          z gwarancją wyników. Koniec z Excelem do 23:00.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button href={GEN_OFERT_CALENDLY_URL} external>
            Chcę oferty w 5 minut
          </Button>
          <Button href="#wyniki" variant="text">
            Zobacz przykładową ofertę PDF
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p variants={fadeUp} className="mt-5 text-sm text-text-light">
          Pokażemy Ci, jak to działa na przykładzie Twojej firmy. Zero zobowiązań.
        </motion.p>

        {/* Proof Bar */}
        <motion.div variants={fadeUp} className="mt-12">
          <ProofBar metrics={GEN_OFERT_PROOF_METRICS} meta={GEN_OFERT_PROOF_META} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary text-sm"
        >
          Firmy tracą średnio 40h miesięcznie na ręczne wyceny. To cały tydzień pracy. Każdego miesiąca.
        </motion.p>
      </motion.div>
    </section>
  );
}
