"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Player } from "@remotion/player";
import { ChaosToSystem } from "@/remotion/ChaosToSystem";
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function HeroSplit() {
  // Prevent SSR hydration mismatch with Remotion Player
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT: Text Content ─── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 mb-8"
            >
              {[
                { icon: Users, text: "10+ firm B2B" },
                { icon: Star, text: "5.0 na Google" },
                {
                  icon: Clock,
                  text: "Max 3 projekty miesięcznie",
                  highlight: true,
                },
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
            <motion.h1
              variants={fadeUp}
              className="font-serif leading-[1.05] text-left"
            >
              Dobry produkt. Pusty pipeline.{" "}
              <span className="text-accent">Naprawiamy to.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-text-secondary text-lg leading-relaxed max-w-[540px]"
            >
              Firmy B2B tracą 100-300 tys. PLN rocznie na szukanie klientów,
              odpowiadanie na zapytania i pisanie ofert. Budujemy systemy AI
              które robią to pod klucz — z gwarancją wyników.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-start gap-5"
            >
              <Button href={CALENDLY_URL} external>
                Sprawdź ile czasu możesz odzyskać
              </Button>
              <Button href="#wyniki" variant="text">
                Zobacz wyniki klientów
              </Button>
            </motion.div>

            {/* Microcopy */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm text-text-light"
            >
              Pokażemy co możemy zautomatyzować w Twojej firmie. Zero
              zobowiązań.
            </motion.p>

            {/* Proof Bar */}
            <motion.div variants={fadeUp} className="mt-10">
              <ProofBar
                metrics={[
                  {
                    value: "20-40h",
                    label: "tyle oszczędzają nasi klienci",
                    countTo: 40,
                    suffix: "h",
                  },
                  { value: "7-21 dni", label: "do działającego systemu" },
                  {
                    value: "Gwarancja wyników",
                    label: "lub pełny zwrot kosztów",
                  },
                ]}
              />
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Remotion Animation ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            {/* Decorative border */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              {mounted ? (
                <Player
                  component={ChaosToSystem}
                  compositionWidth={540}
                  compositionHeight={480}
                  durationInFrames={225}
                  fps={30}
                  loop
                  autoPlay
                  style={{
                    width: "100%",
                    aspectRatio: "540 / 480",
                  }}
                  controls={false}
                  clickToPlay={false}
                />
              ) : (
                // SSR placeholder
                <div
                  className="w-full bg-bg"
                  style={{ aspectRatio: "540 / 480" }}
                />
              )}
            </div>

            {/* Decorative accents */}
            <div className="absolute -top-3 -right-3 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Testimonial — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 flex items-center gap-3 justify-center lg:justify-start"
        >
          <Image
            src="/arek-skuza.jpg"
            alt="Arek Skuza"
            width={36}
            height={36}
            className="rounded-full border border-border shrink-0"
          />
          <p className="text-sm text-text-secondary text-left">
            <span className="italic">
              &ldquo;Focus. Precision. Excellent time management, and AI
              agents&apos; knowledge are what make Bartek an exceptional
              architect and engineer.&rdquo;
            </span>{" "}
            <span className="text-text-light text-xs">
              — Arek Skuza, CEO and boards advisor on AI Powered Growth
            </span>
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 font-mono text-sm text-text-light tracking-wide text-center lg:text-left"
        >
          Make your business LessManual.
        </motion.p>
      </div>
    </section>
  );
}
