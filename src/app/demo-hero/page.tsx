"use client";

import { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import { motion } from "framer-motion";
import { ScatteredPapers } from "@/remotion/variants/ScatteredPapers";
import { TangledWires } from "@/remotion/variants/TangledWires";
import { StickyNotes } from "@/remotion/variants/StickyNotes";
import { DominoCascade } from "@/remotion/variants/DominoCascade";
import { ParticleCrystal } from "@/remotion/variants/ParticleCrystal";
import { TextRotator } from "@/components/animations/TextRotator";
import { Button } from "@/components/ui/Button";
import { Users, Star, Clock } from "lucide-react";
import { CALENDLY_URL, HERO_ROTATOR_WORDS } from "@/lib/constants";

const variants = [
  { id: 1, name: "Scattered Papers", desc: "Kartki → schludny stos", component: ScatteredPapers },
  { id: 2, name: "Tangled Wires", desc: "Plątanina → pipeline", component: TangledWires },
  { id: 3, name: "Sticky Notes", desc: "Karteczki → kanban", component: StickyNotes },
  { id: 4, name: "Domino Cascade", desc: "Klocki → grid z ripple", component: DominoCascade },
  { id: 5, name: "Particle Crystal", desc: "Pył → kryształ", component: ParticleCrystal },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

// ── Tiles Background ──
function TilesBackground() {
  const [grid, setGrid] = useState<{ cols: number; rows: number }>({ cols: 0, rows: 0 });

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
        <div key={c} className="shrink-0" style={{ borderLeft: "1px solid rgba(184,115,51,0.06)" }}>
          {Array.from({ length: grid.rows }).map((_, r) => (
            <div
              key={r}
              className="w-12 h-12"
              style={{ borderRight: "1px solid rgba(184,115,51,0.06)", borderTop: "1px solid rgba(184,115,51,0.06)" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DemoHeroPage() {
  const [activeVariant, setActiveVariant] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const ActiveComponent = variants[activeVariant].component;

  return (
    <div className="min-h-screen bg-bg relative">
      {/* ── Tiles Background (full page) ── */}
      <TilesBackground />

      {/* Vignette for readability */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 50% 45%, transparent 0%, rgba(240,237,238,0.5) 50%, rgba(240,237,238,0.95) 100%)",
        }}
      />

      {/* ── Variant Selector (top bar) ── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3 overflow-x-auto">
          <span className="font-mono text-xs text-text-light shrink-0 mr-2">WARIANT:</span>
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActiveVariant(i)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeVariant === i
                  ? "bg-accent text-white shadow-md"
                  : "bg-white border border-border text-text-secondary hover:border-accent/30"
              }`}
            >
              {v.id}. {v.name}
            </button>
          ))}
        </div>
        <p className="max-w-[1280px] mx-auto mt-1 text-xs text-text-light font-mono">
          {variants[activeVariant].desc}
        </p>
      </div>

      {/* ── Split Hero ── */}
      <section className="relative z-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT: Text */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Users, text: "10+ firm B2B" },
                  { icon: Star, text: "5.0 na Google" },
                  { icon: Clock, text: "Max 3 projekty miesięcznie", highlight: true },
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

              <motion.h1 variants={fadeUp} className="font-serif leading-[1.05] text-left">
                Odzyskaj swój czas na{" "}
                <TextRotator words={HERO_ROTATOR_WORDS} />
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 text-text-secondary text-lg leading-relaxed max-w-[540px]">
                Ile kosztuje Cię zespół który szuka klientów, odpowiada na
                zapytania i pisze oferty? Budujemy systemy AI które robią to za
                nich — pod klucz, z gwarancją wyników.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-start gap-5">
                <Button href={CALENDLY_URL} external>
                  Sprawdź ile czasu możesz odzyskać
                </Button>
                <Button href="#wyniki" variant="text">
                  Zobacz wyniki klientów
                </Button>
              </motion.div>

              <motion.p variants={fadeUp} className="mt-4 text-sm text-text-light">
                Pokażemy co możemy zautomatyzować w Twojej firmie. Zero zobowiązań.
              </motion.p>
            </motion.div>

            {/* RIGHT: Remotion Animation */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-border bg-white/60 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                {mounted ? (
                  <Player
                    key={activeVariant}
                    component={ActiveComponent}
                    compositionWidth={540}
                    compositionHeight={480}
                    durationInFrames={225}
                    fps={30}
                    loop
                    autoPlay
                    style={{ width: "100%", aspectRatio: "540 / 480" }}
                    controls={false}
                    clickToPlay={false}
                  />
                ) : (
                  <div className="w-full bg-bg" style={{ aspectRatio: "540 / 480" }} />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
