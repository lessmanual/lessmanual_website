"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_CALENDLY_URL } from "@/lib/generator-ofert-constants";

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
              <p className="font-mono text-base text-accent mb-6">Founder LessManual.ai</p>

              <div className="space-y-4 text-text-secondary leading-relaxed text-lg">
                <p>
                  Buduję systemy, które eliminują ręczną robotę z biznesu. Generator ofert powstał,
                  bo widziałem jak firmy OZE, producenci mebli i firmy budowlane tracą godziny
                  na wyceny — zamiast sprzedawać.
                </p>
                <p>
                  Każdy system konfiguruję osobiście pod specyfikę branży. Znam logikę wycen
                  w fotowoltaice, meblach na wymiar i kosztorysach budowlanych. Nie daję gotowego
                  narzędzia — buduję rozwiązanie, które zna Twój biznes.
                </p>
                <p className="text-text font-medium">
                  Nie sprzedaję marzeń. Sprzedaję system, który robi oferty za Ciebie — szybciej
                  i profesjonalniej niż ręcznie.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 mb-8">
                {["10+ wdrożeń", "5.0 na Google", "Done-for-you"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <Button href={GEN_OFERT_CALENDLY_URL} external>
                Porozmawiajmy o Twojej firmie
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
