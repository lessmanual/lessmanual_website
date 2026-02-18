"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";

export function About() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <p className="text-text-light text-sm mb-6 text-center">
            Zanim umówisz rozmowę — sprawdź z kim będziesz rozmawiać.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="font-serif text-center mb-12">Kto za tym stoi</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16">
          {/* Photo placeholder */}
          <FadeUp delay={0.15}>
            <div className="w-full max-w-[280px] mx-auto overflow-hidden rounded-[6px] border border-border">
              <Image
                src="/bartek.jpg"
                alt="Bartłomiej Chudzik - Founder LessManual.ai"
                width={280}
                height={373}
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>
          </FadeUp>

          {/* Bio */}
          <FadeUp delay={0.2}>
            <div>
              <h3 className="font-serif text-2xl mb-1">Bartłomiej Chudzik</h3>
              <p className="font-mono text-sm text-accent mb-6">Founder LessManual.ai</p>

              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  10 lat w logistyce — Saint-Gobain, Mondi, Raben. Optymalizowałem procesy
                  dla firm z obrotami w setkach milionów. Aż zobaczyłem wzorzec: 80% tej
                  roboty to powtarzalne zadania które może robić system.
                </p>
                <p>
                  Odszedłem z etatu i zacząłem budować te systemy. Dziś buduję je dla firm
                  B2B — sprzedaż, obsługa klienta, content, oferty. Wszystko co zjada czas
                  Twojego zespołu, a nie wymaga ludzkiej kreatywności.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 mb-8">
                {["5.0 na Google", "Gwarancja wyników", "Prowadzę osobiście"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <Button href={CALENDLY_URL} external>
                Sprawdź co mogę zautomatyzować u Ciebie
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
