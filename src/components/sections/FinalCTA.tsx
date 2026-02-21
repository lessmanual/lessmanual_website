"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CALENDLY_URL, EMAIL } from "@/lib/constants";

const ctaPoints = [
  "Sprawdzimy gdzie tracisz czas i pieniądze",
  "Pokażę który system pasuje do Twojej firmy",
  "Ustalimy konkretne wyniki które chcesz osiągnąć",
  "Powiem wprost czy mamy sens współpracować",
];

export function FinalCTA() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Następny krok"
            title="Odzyskaj kontrolę nad wynikami."
          />
          <p className="text-text-secondary text-lg text-center mb-10">
            Umów bezpłatną rozmowę. 15 minut. Bez zobowiązań.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-bg border border-border rounded-[6px] p-6 md:p-8 mb-10">
            <p className="text-text-light mb-5 text-center text-lg">Na rozmowie:</p>
            <StaggerContainer staggerDelay={0.1} className="space-y-4 max-w-[520px] mx-auto">
              {ctaPoints.map((point) => (
                <StaggerItem key={point}>
                  <div className="flex items-start gap-3 text-text-secondary text-lg leading-relaxed">
                    <Check size={20} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{point}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-10">
            <p className="text-text font-medium text-lg">
              Jeśli nie pasujemy — powiem Ci to wprost. Ale jeśli Twoja firma ma dobry produkt
              i chce rosnąć szybciej — ta rozmowa może być najlepszą inwestycją 15 minut w tym kwartale.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="text-center">
            <Button href={CALENDLY_URL} external>
              Zacznij oszczędzać czas i pieniądze
            </Button>

            <div className="mt-10 space-y-2">
              <p className="text-text-light text-base">Nie jesteś gotowy na rozmowę?</p>
              <Button href="/audyt" variant="text">
                Pobierz audyt: &ldquo;5 procesów do automatyzacji w firmie B2B&rdquo;
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-text-light text-base mb-1">Lub napisz bezpośrednio:</p>
              <a
                href={`mailto:${EMAIL}`}
                className="font-mono text-base text-text-secondary hover:text-accent transition-colors"
              >
                {EMAIL}
              </a>
            </div>

            <p className="mt-10 font-mono text-base text-accent tracking-wide">
              Make your business LessManual.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
