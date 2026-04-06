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
            eyebrow="Jak to rozwiązujemy"
            title="Stawiamy AI chatbota, który zna Twoją firmę lepiej niż nowy pracownik."
          />
          <p className="text-text-secondary text-center mb-12 leading-relaxed">
            Wytrenowany na Twoim FAQ, regulaminie, cenniku. Odpowiada na stronie,
            WhatsAppie, mailu i telefonie. Z jednego dashboardu.
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
            <h3 className="font-serif text-xl mb-3">Jak wygląda proces</h3>
            <ol className="text-text-secondary leading-relaxed space-y-2 list-decimal list-inside">
              <li>Dajesz nam FAQ i materiały firmy</li>
              <li>My trenujemy bota i ustawiamy kanały</li>
              <li>W 14 dni system jest live</li>
              <li>Ty patrzysz na dashboard i widzisz ile zapytań obsłużył bot</li>
            </ol>
          </div>

          <p className="text-text font-medium text-center mb-8">
            Done-for-you. Daj FAQ, my robimy resztę.
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
