"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TextRotator } from "@/components/animations/TextRotator";
import { ProofBar } from "@/components/ui/ProofBar";
import { Button } from "@/components/ui/Button";
import { Users, Star, Clock } from "lucide-react";
import { CALENDLY_URL, HERO_ROTATOR_WORDS } from "@/lib/constants";

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
          Odzyskaj swój czas na{" "}
          <TextRotator words={HERO_ROTATOR_WORDS} />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-8 text-text-secondary max-w-[680px] mx-auto text-xl leading-relaxed"
        >
          Ile kosztuje Cię zespół który szuka klientów, odpowiada na zapytania
          i pisze oferty? Budujemy systemy AI które robią to za nich — pod klucz,
          z gwarancją wyników.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button href={CALENDLY_URL} external>
            Sprawdź ile czasu możesz odzyskać
          </Button>
          <Button href="#wyniki" variant="text">
            Zobacz wyniki klientów
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p variants={fadeUp} className="mt-5 text-sm text-text-light">
          Pokażemy co możemy zautomatyzować w Twojej firmie. Zero zobowiązań.
        </motion.p>

        {/* Proof Bar */}
        <motion.div variants={fadeUp} className="mt-12">
          <ProofBar
            metrics={[
              { value: "20-40h", label: "tyle oszczędzają nasi klienci", countTo: 40, suffix: "h" },
              { value: "7-21 dni", label: "do działającego systemu" },
              { value: "Gwarancja wyników", label: "lub pełny zwrot kosztów" },
            ]}
          />
        </motion.div>

        {/* Testimonial */}
        <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-3 mx-auto">
          <Image
            src="/arek-skuza.jpg"
            alt="Arek Skuza"
            width={36}
            height={36}
            className="rounded-full border border-border shrink-0"
          />
          <p className="text-sm text-text-secondary text-left">
            <span className="italic">&ldquo;Focus. Precision. Excellent time management, and AI agents&apos; knowledge are what make Bartek an exceptional architect and engineer.&rdquo;</span>
            {" "}<span className="text-text-light text-xs">— Arek Skuza, CEO and boards advisor on AI Powered Growth</span>
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 font-mono text-sm text-text-light tracking-wide"
        >
          Make your business LessManual.
        </motion.p>
      </motion.div>
    </section>
  );
}
