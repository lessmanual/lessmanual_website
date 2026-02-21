"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Player } from "@remotion/player";
import { motion } from "framer-motion";
import { TangledWires } from "@/remotion/variants/TangledWires";
import { TextRotator } from "@/components/animations/TextRotator";
import { ProofBar } from "@/components/ui/ProofBar";
import { Button } from "@/components/ui/Button";
import { Users, Star, Clock } from "lucide-react";
import { CALENDLY_URL, HERO_ROTATOR_WORDS } from "@/lib/constants";

/* ─── Animations ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
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
      setGrid({
        cols: Math.ceil(window.innerWidth / 48) + 2,
        rows: Math.ceil(window.innerHeight / 48) + 2,
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
          style={{ borderLeft: "1px solid rgba(184,115,51,0.045)" }}
        >
          {Array.from({ length: grid.rows }).map((_, r) => (
            <div
              key={r}
              className="w-12 h-12"
              style={{
                borderRight: "1px solid rgba(184,115,51,0.045)",
                borderTop: "1px solid rgba(184,115,51,0.045)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Hero Overlap (V2) ─── */
export default function DemoLayoutsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <TilesBackground />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, transparent 0%, rgba(240,237,238,0.5) 50%, rgba(240,237,238,0.95) 100%)",
        }}
      />

      <section className="relative z-10 pt-20 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Trust badges — centered */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 justify-center mb-10"
            >
              {[
                { icon: Users, text: "10+ firm B2B", highlight: false },
                { icon: Star, text: "5.0 na Google", highlight: false },
                {
                  icon: Clock,
                  text: "Max 3 projekty miesięcznie",
                  highlight: true,
                },
              ].map((b) => (
                <span
                  key={b.text}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-medium backdrop-blur-sm ${
                    b.highlight
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "bg-white/80 border border-border text-text-secondary"
                  }`}
                >
                  <b.icon size={16} strokeWidth={2} />
                  {b.text}
                </span>
              ))}
            </motion.div>

            {/* H1 — full width, centered */}
            <motion.h1
              variants={fadeUp}
              className="font-serif leading-[1.05] text-center"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}
            >
              Odzyskaj swój czas na{" "}
              <TextRotator words={HERO_ROTATOR_WORDS} />
            </motion.h1>

            {/* Two-column: text left + animation right */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-14 items-start">
              <div>
                {/* Subtitle */}
                <motion.p
                  variants={fadeUp}
                  className="text-text-secondary text-2xl leading-relaxed max-w-[720px] mt-2"
                >
                  Ile kosztuje Cię zespół który szuka klientów, odpowiada na
                  zapytania i pisze oferty? Budujemy systemy AI które robią to
                  za nich — pod klucz, z gwarancją wyników.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fadeUp}
                  className="mt-12 flex flex-col sm:flex-row sm:items-center items-start gap-5"
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
                  className="mt-5 text-base text-text-light"
                >
                  Pokażemy co możemy zautomatyzować w Twojej firmie. Zero
                  zobowiązań.
                </motion.p>

                {/* Proof bar */}
                <motion.div variants={fadeUp} className="mt-14">
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
              </div>

              {/* Animation */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="hidden lg:block -mt-2 relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-border bg-white/50 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  {mounted ? (
                    <Player
                      component={TangledWires}
                      compositionWidth={440}
                      compositionHeight={400}
                      durationInFrames={225}
                      fps={30}
                      loop
                      autoPlay
                      style={{
                        width: "100%",
                        aspectRatio: "440 / 400",
                      }}
                      controls={false}
                      clickToPlay={false}
                    />
                  ) : (
                    <div
                      className="w-full bg-bg"
                      style={{ aspectRatio: "440 / 400" }}
                    />
                  )}
                </div>

                {/* Copper glow accents */}
                <div className="absolute -top-4 -right-4 w-28 h-28 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              </motion.div>
            </div>

            {/* Bottom — testimonial + tagline centered */}
            <motion.div
              variants={fadeUp}
              className="mt-14 flex flex-col items-center gap-5"
            >
              <div className="inline-flex items-center gap-4">
                <Image
                  src="/arek-skuza.jpg"
                  alt="Arek Skuza"
                  width={44}
                  height={44}
                  className="rounded-full border border-border shrink-0"
                />
                <p className="text-base text-text-secondary text-left max-w-[520px]">
                  <span className="italic">
                    &ldquo;Focus. Precision. Excellent time management, and AI
                    agents&apos; knowledge are what make Bartek an exceptional
                    architect and engineer.&rdquo;
                  </span>{" "}
                  <span className="text-text-light text-sm">
                    — Arek Skuza, CEO
                  </span>
                </p>
              </div>
              <p className="font-mono text-base text-text-light tracking-wide text-center">
                Make your business LessManual.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
