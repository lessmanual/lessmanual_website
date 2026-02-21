"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PROCESS_STEPS, CALENDLY_URL } from "@/lib/constants";

export function Process() {
  return (
    <section id="proces" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Jak działamy" title="Od rozmowy do działającego systemu w 7-21 dni." />
        </FadeUp>

        {/* Timeline — cards with arrows */}
        <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.step}>
              <div className="bg-bg border border-border rounded-[6px] p-6 h-full">
                {/* Step number */}
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-mono text-lg font-semibold mb-5">
                  {step.step}
                </div>

                <h3 className="font-serif text-2xl mb-1">{step.title}</h3>
                <p className="font-mono text-lg text-accent mb-4">{step.duration}</p>

                <ul className="space-y-2">
                  {step.points.map((point) => (
                    <li key={point} className="text-lg text-text-secondary leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 font-mono text-sm text-text-light">
                  Twój czas: {step.yourTime}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp>
          <div className="text-center">
            <p className="font-mono text-lg text-text mb-2">
              Łącznie Twój czas: <strong>około 2 godziny</strong> przez cały proces.
            </p>
            <p className="text-text-secondary text-base mb-8">
              Masz 2 godziny żeby odzyskać 20-40 godzin miesięcznie?
              Nie działa? Nie płacisz — z gwarancją wyników.
            </p>
            <Button href={CALENDLY_URL} external>
              Odzyskaj czas
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
