"use client";

import { Clock } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SEO_CALENDLY_URL } from "@/lib/seo-content-constants";

export function Urgency() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Czas"
            title="Dlaczego warto zacząć teraz, nie za miesiąc"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="space-y-6 text-text-secondary leading-relaxed mb-10">
            <p>
              Przyjmuję max 3 onboardingi SEO Content miesięcznie. Każdy klient wymaga
              dedykowanego keyword research, konfiguracji systemu i testów jakości.
              Nie chcę robić tego masowo — chcę robić to dobrze.
            </p>
            <p>
              SEO to gra długoterminowa. Artykuł opublikowany dzisiaj zacznie rankować za 2-3
              miesiące. Artykuł opublikowany za 3 miesiące — za pół roku. Artykuł nieopublikowany
              — nigdy. Im wcześniej zaczniesz, tym wcześniej zbierasz ruch.
            </p>
            <p>
              Twoja konkurencja nie czeka. Ktoś w Twojej niszy właśnie opublikował kolejny artykuł.
              Zbiera pozycje w Google, które mogłyby być Twoje. Każdy dzień bez nowego contentu
              to pozycje, które oddajesz za darmo.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="bg-warning/10 border border-warning/30 rounded-[6px] p-6 text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={18} className="text-warning" strokeWidth={2} />
              <span className="font-mono text-sm font-semibold text-warning uppercase tracking-wider">
                Ograniczona dostępność
              </span>
            </div>
            <p className="font-serif text-2xl text-text">
              Zostały 2 miejsca na onboarding w marcu
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="text-center">
            <Button href={SEO_CALENDLY_URL} external>
              Sprawdź, czy jest jeszcze miejsce
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
