"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SEO_SOLUTION_STEPS } from "@/lib/seo-content-constants";

export function Solution() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Rozwiązanie"
            title="Blog, który pisze się sam. Dosłownie."
          />
          <p className="text-text-secondary text-center mb-12 leading-relaxed">
            Nie dajesz nam pieniędzy i czekasz. Stawiamy system, który robi keyword research,
            pisze artykuły SEO, optymalizuje i publikuje. Ty dostajesz ruch z Google
            i leady, które same Cię znajdują.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="space-y-5 mb-12">
          {SEO_SOLUTION_STEPS.map((step) => (
            <StaggerItem key={step.num}>
              <div className="relative bg-bg border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200 overflow-hidden">
                <span className="font-mono text-7xl text-accent/10 absolute -top-4 -right-2 select-none pointer-events-none">
                  {step.num}
                </span>
                <div className="relative">
                  <h3 className="font-serif text-lg mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 md:p-8 text-center">
            <p className="font-serif text-xl text-text">
              3 kroki. 0 Twojego czasu po setupie. Blog rośnie sam.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
