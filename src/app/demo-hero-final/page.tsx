"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Player } from "@remotion/player";
import { motion } from "framer-motion";
import { ScatteredPapersFinal } from "@/remotion/variants/ScatteredPapersFinal";
import { TextRotator } from "@/components/animations/TextRotator";
import { ProofBar } from "@/components/ui/ProofBar";
import { Button } from "@/components/ui/Button";
import { Users, Star, Clock } from "lucide-react";
import { CALENDLY_URL, HERO_ROTATOR_WORDS } from "@/lib/constants";

/* ─── Animation variants (same as original Hero) ─── */
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

/* ─── Tiles Background ─── */
function TilesBackground() {
  const [grid, setGrid] = useState<{ cols: number; rows: number }>({
    cols: 0,
    rows: 0,
  });

  useEffect(() => {
    function calc() {
      const tileSize = 48;
      setGrid({
        cols: Math.ceil(window.innerWidth / tileSize) + 2,
        rows: Math.ceil(window.innerHeight / tileSize) + 2,
      });
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  if (grid.cols === 0) return null;

  return (
    <div className="absolute inset-0 z-0 flex justify-center overflow-hidden pointer-events-none">
      {Array.from({ length: grid.cols }).map((_, c) => (
        <div
          key={c}
          className="shrink-0"
          style={{
            borderLeft: "1px solid rgba(184,115,51,0.05)",
          }}
        >
          {Array.from({ length: grid.rows }).map((_, r) => (
            <div
              key={r}
              className="w-12 h-12"
              style={{
                borderRight: "1px solid rgba(184,115,51,0.05)",
                borderTop: "1px solid rgba(184,115,51,0.05)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function DemoHeroFinalPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      {/* Tiles Background */}
      <TilesBackground />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 40% 48%, transparent 0%, rgba(240,237,238,0.45) 50%, rgba(240,237,238,0.95) 100%)",
        }}
      />

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 pt-36 pb-28 md:pt-48 md:pb-40">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
            {/* ─── LEFT: Content (1:1 z oryginalnego Hero, text-left) ─── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {/* Trust Badges */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 mb-10"
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
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                      badge.highlight
                        ? "bg-accent/10 text-accent border border-accent/20"
                        : "bg-white/80 border border-border text-text-secondary"
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
                className="font-serif leading-[1.05]"
              >
                Odzyskaj swój czas na{" "}
                <TextRotator words={HERO_ROTATOR_WORDS} />
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="mt-8 text-text-secondary max-w-[680px] text-xl leading-relaxed"
              >
                Ile kosztuje Cię zespół który szuka klientów, odpowiada na
                zapytania i pisze oferty? Budujemy systemy AI które robią to za
                nich — pod klucz, z gwarancją wyników.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="mt-12 flex flex-col sm:flex-row items-start gap-5"
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
                className="mt-5 text-sm text-text-light"
              >
                Pokażemy co możemy zautomatyzować w Twojej firmie. Zero
                zobowiązań.
              </motion.p>

              {/* Proof Bar */}
              <motion.div variants={fadeUp} className="mt-12">
                <ProofBar
                  metrics={[
                    {
                      value: "20-40h",
                      label: "tyle oszczędzają nasi klienci",
                      countTo: 40,
                      suffix: "h",
                    },
                    {
                      value: "7-21 dni",
                      label: "do działającego systemu",
                    },
                    {
                      value: "Gwarancja wyników",
                      label: "lub pełny zwrot kosztów",
                    },
                  ]}
                />
              </motion.div>

              {/* Testimonial */}
              <motion.div
                variants={fadeUp}
                className="mt-8 inline-flex items-center gap-3"
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
                variants={fadeUp}
                className="mt-6 font-mono text-sm text-text-light tracking-wide"
              >
                Make your business LessManual.
              </motion.p>
            </motion.div>

            {/* ─── RIGHT: Remotion Animation (mniejsza, 420px) ─── */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-border bg-white/50 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                {mounted ? (
                  <Player
                    component={ScatteredPapersFinal}
                    compositionWidth={420}
                    compositionHeight={400}
                    durationInFrames={225}
                    fps={30}
                    loop
                    autoPlay
                    style={{
                      width: "100%",
                      aspectRatio: "420 / 400",
                    }}
                    controls={false}
                    clickToPlay={false}
                  />
                ) : (
                  <div
                    className="w-full bg-bg"
                    style={{ aspectRatio: "420 / 400" }}
                  />
                )}
              </div>

              {/* Subtle copper glow */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-accent/5 rounded-full blur-xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
