"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Star, Clock } from "lucide-react";
import { TextRotator } from "@/components/animations/TextRotator";
import { Button } from "@/components/ui/Button";
import {
  OBS_KLIENTA_CALENDLY_URL,
  OBS_KLIENTA_ROTATOR_WORDS,
} from "@/lib/obsluga-klienta-constants";

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
          Twoi klienci dostaną odpowiedź w 30 sekund. 24/7.
          <br />
          Bez{" "}
          <TextRotator words={OBS_KLIENTA_ROTATOR_WORDS} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary max-w-[680px] mx-auto text-xl leading-relaxed"
        >
          System wytrenowany na wiedzy Twojej firmy. Odpowiada jak Twój najlepszy
          pracownik — tyle że nie choruje, nie bierze urlopu i nie śpi. Chat,
          WhatsApp, email, telefon — jeden system na wszystko.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button href={OBS_KLIENTA_CALENDLY_URL} external>
            Chcę odpowiedzi w 30 sekund
          </Button>
          <Button href="#wyniki" variant="text">
            Zobacz jak działa na żywo
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p variants={fadeUp} className="mt-5 text-sm text-text-light">
          Pokażemy jak system odpowiada na pytania Twoich klientów. Zero zobowiązań.
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary text-sm"
        >
          62% klientów oczekuje odpowiedzi w ciągu 5 minut. Średni czas odpowiedzi w firmach B2B? 4 godziny.
        </motion.p>

        {/* Bottom mono line */}
        <motion.p
          variants={fadeUp}
          className="mt-6 font-mono text-xs text-text-light tracking-wider uppercase"
        >
          Jeden system. Każdy kanał. Zero nieodebranych.
        </motion.p>
      </motion.div>
    </section>
  );
}
