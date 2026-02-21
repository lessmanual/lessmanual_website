"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_PROCESS_STEPS, GEN_OFERT_CALENDLY_URL } from "@/lib/generator-ofert-constants";

export function ProcessTimeline() {
  return (
    <section id="proces" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Proces"
            title="Od startu do działającego systemu w 7-21 dni"
          />
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="relative mb-12">
          {/* Vertical line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-border hidden md:block" />

          <div className="space-y-6">
            {GEN_OFERT_PROCESS_STEPS.map((step, idx) => (
              <StaggerItem key={step.week}>
                <div className="flex gap-5">
                  {/* Number circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-mono text-base font-semibold">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-bg border border-border rounded-[6px] p-5 flex-1 hover:border-accent transition-colors duration-200">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                        {step.week}
                      </span>
                      <h3 className="font-serif text-xl">{step.title}</h3>
                    </div>
                    <p className="text-base text-text-secondary leading-relaxed mb-3">
                      {step.desc}
                    </p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                      Twój czas: {step.yourTime}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-8">
            <p className="text-text font-medium">
              Łączne zaangażowanie z Twojej strony: ~5-7 godzin w ciągu całego wdrożenia.
            </p>
            <p className="text-text-secondary text-base mt-1">
              Resztę robimy my. Ty w tym czasie robisz to, co robisz najlepiej — prowadzisz firmę.
            </p>
          </div>

          <div className="text-center">
            <Button href={GEN_OFERT_CALENDLY_URL} external>
              Chcę system w 7-21 dni
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
