"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GEN_OFERT_SOLUTION_STEPS } from "@/lib/generator-ofert-constants";

export function Solution() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Rozwiązanie"
            title="Self-service konfigurator wycen. Klient sam wycenia. PDF automatycznie."
          />
          <p className="text-text-secondary text-center mb-12 leading-relaxed text-lg">
            Budujemy konfigurator, w którym Twój klient sam wycenia usługę i dostaje
            profesjonalny PDF z Twoim logo. Ty nie musisz konfigurować, uczyć się,
            utrzymywać &mdash; robimy to za Ciebie.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="space-y-5 mb-12">
          {GEN_OFERT_SOLUTION_STEPS.map((step) => (
            <StaggerItem key={step.num}>
              <div className="bg-bg border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-mono text-base font-semibold shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 md:p-8">
            <h3 className="font-serif text-xl mb-3">Rezultat:</h3>
            <div className="space-y-2 text-text-secondary leading-relaxed mb-4 text-base">
              <p><strong className="text-text">5 minut</strong> zamiast 2 godzin na ofertę</p>
              <p><strong className="text-text">Klient sam wycenia</strong> &mdash; na Twojej stronie, w chacie lub dedykowanej aplikacji</p>
              <p><strong className="text-text">3 warianty cenowe</strong> generowane automatycznie (od GROWTH)</p>
              <p><strong className="text-text">Follow-up automatyczny</strong> &mdash; po 3 i 7 dniach, bez Twojego udziału (od GROWTH)</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-base">
              <div className="bg-white/60 rounded-[6px] px-4 py-3">
                <span className="text-text-muted">Twój udział:</span>{" "}
                <span className="font-medium text-text">5-7 godzin na całe wdrożenie</span>
              </div>
              <div className="bg-white/60 rounded-[6px] px-4 py-3">
                <span className="text-text-muted">Resztę:</span>{" "}
                <span className="font-medium text-text">robimy my</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
