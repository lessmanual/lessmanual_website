"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  OBS_KLIENTA_CALENDLY_URL,
  OBS_KLIENTA_SOLUTION_STEPS,
} from "@/lib/obsluga-klienta-constants";

export function Solution() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Rozwiązanie"
            title="System Obsługi Klienta LessManual — odpowiada za Ciebie. 24/7. Na każdym kanale."
          />
          <p className="text-text-secondary text-center mb-12 leading-relaxed">
            Wytrenowany na wiedzy Twojej firmy. Wie tyle co Twój najlepszy
            pracownik — ale nigdy nie wymyśla odpowiedzi, bo korzysta TYLKO
            z Twoich danych.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="space-y-5 mb-12">
          {OBS_KLIENTA_SOLUTION_STEPS.map((step) => (
            <StaggerItem key={step.num}>
              <div className="bg-bg border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-mono text-base font-semibold shrink-0">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-serif text-xl">{step.title}</h3>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full">
                        {step.tier}
                      </span>
                    </div>
                    <p className="text-text-secondary text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 md:p-8 mb-8">
            <h3 className="font-serif text-xl mb-3">Technologia RAG</h3>
            <p className="text-text-secondary leading-relaxed">
              System odpowiada <strong className="text-text">WYŁĄCZNIE</strong> na
              podstawie Twoich danych. Nie szuka w internecie. Nie wymyśla. Nie
              zgaduje. Jeśli nie zna odpowiedzi — mówi wprost i przekazuje do
              konsultanta.
            </p>
          </div>

          <p className="text-text font-medium text-center mb-8">
            Jeden dashboard na wszystko. Chat, WhatsApp, email, telefon —
            wszystkie kanały w jednym miejscu.
          </p>

          <div className="text-center">
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Chcę odpowiedzi w 30 sekund
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
