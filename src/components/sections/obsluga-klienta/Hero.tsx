"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Player } from "@remotion/player";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Star, Clock } from "lucide-react";
import { ChatSupport } from "@/remotion/variants/ChatSupport";
import { Button } from "@/components/ui/Button";
import {
  OBS_KLIENTA_CALENDLY_URL,
} from "@/lib/obsluga-klienta-constants";

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

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative overflow-hidden">
      <TilesBackground />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, transparent 0%, rgba(240,237,238,0.5) 50%, rgba(240,237,238,0.95) 100%)",
        }}
      />

      <section className="relative z-10 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Back link */}
            <motion.div variants={fadeUp} className="mb-3">
              <Link
                href="/oferta"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <ArrowLeft size={16} />
                Oferta
              </Link>
            </motion.div>

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

            {/* Two-column: text left + animation right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-14 items-center">
              <div>
                {/* H1 */}
                <motion.h1
                  variants={fadeUp}
                  className="font-serif leading-[1.05]"
                  style={{ fontSize: "clamp(3.2rem, 7vw, 5rem)" }}
                >
                  Zatrudnij AI do odpowiadania klientom. O każdej porze.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeUp}
                  className="text-text-secondary text-2xl leading-relaxed max-w-[600px] mt-8"
                >
                  Chat, WhatsApp, email — jeden system wytrenowany na Twojej bazie wiedzy. Ty dostajesz tylko sprawy, które wymagają człowieka.
                </motion.p>

                {/* Definition block — AI SEO */}
                <motion.p
                  variants={fadeUp}
                  className="text-text-secondary/80 text-lg leading-relaxed max-w-[600px] mt-4"
                >
                  Obsługa Klienta AI od LessManual to chatbot i voiceagent wytrenowany na bazie wiedzy Twojej firmy. Odpowiada na 60-80% zapytań automatycznie w 30 sekund, 24/7. Integracja z CRM, auto-sortowanie maili, lead capture. Od 900 PLN/mies. Wdrożenie w 7 dni.
                </motion.p>

                {/* CTA */}
                <motion.div
                  variants={fadeUp}
                  className="mt-10 flex flex-col sm:flex-row sm:items-center items-start gap-5"
                >
                  <Button href={OBS_KLIENTA_CALENDLY_URL} variant="primary" external className="!px-11 !py-5 !text-xl">
                    Chcę udzielać odpowiedzi automatycznie
                  </Button>
                  <Button href="#wyniki" variant="text" className="!text-lg">
                    Zobacz wyniki klientów
                  </Button>
                </motion.div>
              </div>

              {/* Animation */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="hidden lg:block relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-border bg-white/50 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  {mounted ? (
                    <Player
                      component={ChatSupport}
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
                    <div
                      className="w-full bg-bg"
                      style={{ aspectRatio: "540 / 480" }}
                    />
                  )}
                </div>

                {/* Copper glow accents */}
                <div className="absolute -top-4 -right-4 w-28 h-28 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
