"use client";

import { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import { motion } from "framer-motion";
import { TangledWires } from "@/remotion/variants/TangledWires";
import { Button } from "@/components/ui/Button";
import { TilesBackground } from "@/components/ui/TilesBackground";
import { Users, Star, Clock } from "lucide-react";

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

      <section className="relative z-10 pt-20 pb-16 md:pt-24 md:pb-24">
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

            {/* Two-column: text left + animation right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 lg:gap-14 items-center">
              <div>
                {/* H1 */}
                <motion.h1
                  variants={fadeUp}
                  className="font-serif leading-[1.05]"
                  style={{ fontSize: "clamp(3.2rem, 7vw, 5rem)" }}
                >
                  Zatrudnij AI do rzeczy, których i tak nikt nie chce robić.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeUp}
                  className="text-text-secondary text-2xl leading-relaxed max-w-[600px] mt-8"
                >
                  Nasze systemy przejmują 80% powtarzalnej pracy, pod Twoim nadzorem. Odzyskaj czas i głowę do tego, co realnie rozwija Twój biznes.
                </motion.p>

                {/* CTA */}
                <motion.div
                  variants={fadeUp}
                  className="mt-10 flex flex-col sm:flex-row sm:items-center items-start gap-5"
                >
                  <Button href="#kalkulator" variant="primary" className="!px-11 !py-5 !text-xl">
                    Zobacz ile możesz zyskać
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
