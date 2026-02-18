"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AI_SDR_SOLUTION_STEPS } from "@/lib/ai-sdr-constants";

export function Solution() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Rozwiązanie"
            title="System, który umawia spotkania za Ciebie"
          />
          <p className="text-text-secondary text-center mb-12 leading-relaxed">
            Nie dajesz nam pieniędzy i czekasz. Stawiamy system AI, który robi to, co SDR
            — ale szybciej, taniej i bez chorobowego. Ty dostajesz spotkania w kalendarzu
            z ludźmi, którzy mogą u Ciebie kupić.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="space-y-5 mb-12">
          {AI_SDR_SOLUTION_STEPS.map((step) => (
            <StaggerItem key={step.num}>
              <div className="bg-bg border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-mono text-base font-semibold shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 md:p-8">
            <h3 className="font-serif text-lg mb-3">Co Ty dostajesz?</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Powiadomienie: &ldquo;Masz spotkanie z Anną, COO w FirmaTech.
              Temat: automatyzacja procesów. Czwartek, 14:00.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="bg-white/60 rounded-[6px] px-4 py-3">
                <span className="text-text-muted">Twój udział:</span>{" "}
                <span className="font-medium text-text">1 godzina na setup + 5 minut tygodniowo</span>
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
