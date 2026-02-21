"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AI_SDR_DELIVERABLES } from "@/lib/ai-sdr-constants";

export function WhatYouGet() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Co dostajesz"
            title="Nie kupujesz narzędzia. Kupujesz spotkania z decydentami i partnera, który je dowozi."
          />
          <p className="text-lg text-text-secondary text-center mb-12">
            Ile razy płaciłeś za leady, które okazały się listą kontaktów?
            Płacisz za spotkania, które się odbędą. Oto co dostajesz niezależnie od wybranego planu:
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {AI_SDR_DELIVERABLES.map((block) => (
            <StaggerItem key={block.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200">
                <h3 className="font-serif text-2xl mb-4">{block.title}</h3>
                <div className="space-y-3">
                  {block.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check size={16} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-lg text-text-secondary leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8 mb-8">
            <p className="text-text font-medium mb-3">Dlaczego pay-per-meeting?</p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Bo jeśli nie dowieziemy spotkań — zarabiamy zero. Nasz interes jest tożsamy z Twoim.
              Agencja zarabia na retainerze niezależnie od wyników. My zarabiamy TYLKO gdy Ty masz
              spotkania w kalendarzu.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4">
            <p className="text-text font-medium mb-1">Ukryta korzyść:</p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Dostajesz pełną bazę danych o swoim rynku. Kto otworzył mail, kto kliknął,
              kto odpowiedział, jakie obiekcje mają. Po 3 miesiącach masz wiedzę o rynku,
              której konkurencja nie ma.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
