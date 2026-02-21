"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { OBS_KLIENTA_DELIVERABLES, OBS_KLIENTA_CALENDLY_URL } from "@/lib/obsluga-klienta-constants";

export function WhatYouGet() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Co dostajesz"
            title="Co dokładnie dostajesz — krok po kroku"
          />
          <p className="text-text-secondary text-center mb-12">
            Nie sprzedajemy licencji na chatbota. Budujemy system obsługi klienta dopasowany
            do Twojej firmy. Ty odpowiadasz na nasze pytania (max 2h) — my robimy resztę.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {OBS_KLIENTA_DELIVERABLES.map((block) => (
            <StaggerItem key={block.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200">
                <h3 className="font-serif text-xl mb-4">{block.title}</h3>
                <div className="space-y-3">
                  {block.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check size={16} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-base text-text-secondary leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
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
