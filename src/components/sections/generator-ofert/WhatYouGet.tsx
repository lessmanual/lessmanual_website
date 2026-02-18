"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GEN_OFERT_DELIVERABLES } from "@/lib/generator-ofert-constants";

export function WhatYouGet() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Co dostajesz"
            title="Nie kupujesz narzędzia. Kupujesz system, który robi oferty za Ciebie."
          />
          <p className="text-text-secondary text-center mb-12">
            Nie musisz nic konfigurować, uczyć się, ani utrzymywać. Dostajesz gotowy system
            pod klucz — my budujemy, Ty zatwierdzasz i korzystasz.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {GEN_OFERT_DELIVERABLES.map((block) => (
            <StaggerItem key={block.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200">
                <h3 className="font-serif text-lg mb-4">{block.title}</h3>
                <div className="space-y-3">
                  {block.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check size={16} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-white border border-border rounded-[6px] p-6 md:p-8 mb-8">
            <p className="text-text font-medium mb-3">Dlaczego done-for-you?</p>
            <p className="text-text-secondary leading-relaxed">
              Bo narzędzia SaaS dają Ci pusty dashboard i mówią &ldquo;konfiguruj&rdquo;. My budujemy
              cały system pod Twój biznes — z Twoimi cenami, materiałami, marżami. Ty nie musisz
              się uczyć nowego narzędzia. Dostajesz gotowe rozwiązanie, które działa od dnia 1.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4">
            <p className="text-text font-medium mb-1">Ukryta korzyść:</p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Każda wygenerowana oferta to dane. Po 3 miesiącach wiesz, które produkty klienci
              wybierają najczęściej, jaka jest średnia wartość oferty i gdzie tracisz deale.
              Masz wiedzę o swoim biznesie, której nie miałeś.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
