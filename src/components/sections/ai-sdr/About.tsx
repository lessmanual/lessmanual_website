"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { AI_SDR_CALENDLY_URL } from "@/lib/ai-sdr-constants";

export function About() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <h2 className="font-serif text-center mb-12">Kto za tym stoi</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16">
          <FadeUp delay={0.1}>
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

          <FadeUp delay={0.15}>
            <div>
              <h3 className="font-serif text-2xl mb-1">Bartłomiej Chudzik</h3>
              <p className="font-mono text-lg text-accent mb-6">Founder LessManual.ai</p>

              <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
                <p>
                  8 lat w logistyce B2B nauczyło mnie jednego: ręczna robota zabija biznes.
                  AI SDR powstał, bo sam potrzebowałem spotkań. Zamiast zatrudnić handlowca
                  za 12k/mies — postawiłem system. Wyniki wyżej to moja kampania, nie teoria.
                </p>
                <p>
                  Teraz ten sam system stawiam dla firm B2B które chcą spotkania bez ręcznego prospectingu.
                </p>
                <p className="text-text font-medium">
                  Nie sprzedaję marzeń. Sprzedaję spotkania z ludźmi którzy mogą u Ciebie kupić.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 mb-8">
                {["77% open rate", "Deal w 6 dni", "Prowadzę osobiście"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-base font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <Button href={AI_SDR_CALENDLY_URL} external>
                Porozmawiajmy o Twojej firmie
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
