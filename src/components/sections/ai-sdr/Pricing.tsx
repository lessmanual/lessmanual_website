"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  AI_SDR_SETUP_PLANS,
  AI_SDR_PER_MEETING_PRICING_FACTORS,
  AI_SDR_MEETING_DEFINITION,
  AI_SDR_CALENDLY_URL,
} from "@/lib/ai-sdr-constants";

export function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Cennik"
            title="Prosto. Bez stałych opłat. Płacisz za wynik."
          />
          <p className="text-text-secondary text-center mb-12">
            Płacisz za setup (jednorazowo) i za spotkania, które się odbędą.
            Zero miesięcznego abonamentu. Zero ukrytych kosztów. Zero retainera.
          </p>
        </FadeUp>

        {/* Setup cards — SCALE → GROWTH → STARTER (anchoring) */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {AI_SDR_SETUP_PLANS.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative bg-white border rounded-[6px] p-6 h-full flex flex-col ${
                  plan.popular
                    ? "border-accent border-2 md:order-none order-first"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-6 bg-accent text-white text-[0.65rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-b-[4px]">
                    Popularny wybór
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="font-serif text-xl">{plan.name}</h3>
                  <p className="text-sm text-text-muted">{plan.subtitle}</p>
                </div>

                <div className="mb-6">
                  <span className="font-mono text-3xl font-bold text-text">{plan.price}</span>
                  <span className="text-text-muted text-sm ml-1">PLN</span>
                  <span className="text-text-light text-xs ml-2">(jednorazowo)</span>
                </div>

                <div className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <Check size={16} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-sm text-text-secondary">{feat}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-text-muted mb-4">{plan.desc}</p>
                {plan.valueNote && (
                  <p className="text-xs text-accent mb-4">{plan.valueNote}</p>
                )}

                <Button
                  href={AI_SDR_CALENDLY_URL}
                  variant={plan.ctaVariant}
                  external
                  className="text-sm w-full"
                >
                  Wybieram {plan.name}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Payment terms */}
        <FadeUp delay={0.15}>
          <p className="text-center text-sm text-text-secondary mb-10">
            <strong className="text-text">50% zaliczki przed startem. 50% na dzień uruchomienia kampanii.</strong>
          </p>
        </FadeUp>

        {/* Per-meeting pricing */}
        <FadeUp delay={0.2}>
          <div className="bg-white border border-border rounded-[6px] overflow-hidden mb-8">
            <div className="p-6 border-b border-border">
              <h3 className="font-serif text-lg mb-1">Płatność za spotkania (bieżąco)</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-mono text-2xl font-bold text-accent">500–2 000 PLN</span>
                <span className="text-sm text-text-muted">za potwierdzone spotkanie</span>
              </div>
              <p className="text-sm text-text-secondary">
                Dokładną kwotę ustalamy razem na konsultacji. Nie płacisz za maile, leady ani &ldquo;MQL&rdquo; — tylko za realne spotkania z decision makerami z Twojego ICP.
              </p>
              <p className="text-sm text-text font-medium mt-3">
                Żadnych ukrytych opłat. Żadnych stałych abonamentów. Nie ma spotkań = nie płacisz.
              </p>
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-wider text-text-light font-semibold mb-4">Co wpływa na cenę</p>
              <div className="space-y-4">
                {AI_SDR_PER_MEETING_PRICING_FACTORS.map((item) => (
                  <div key={item.factor}>
                    <p className="text-sm font-medium text-text">{item.factor}</p>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-secondary mt-5 pt-4 border-t border-border">
                Dlaczego zakres, a nie jedna cena? Każdy biznes jest inny. Cenę ustalamy tak, żeby była fair dla obu stron. Zawsze poznasz ją <strong className="text-text">PRZED startem</strong>.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Meeting definition */}
        <FadeUp delay={0.25}>
          <div className="bg-white border border-border rounded-[6px] p-6 mb-8">
            <h4 className="font-serif text-base mb-4">
              Definicja &ldquo;spotkanie&rdquo; — płacisz TYLKO gdy spełnione są WSZYSTKIE warunki:
            </h4>
            <div className="space-y-3">
              {AI_SDR_MEETING_DEFINITION.map((item, idx) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-mono text-xs font-semibold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-text font-medium">
              Nie pojawił się? Nie płacisz. Nie pasuje do profilu? Nie płacisz. Anulował? Nie płacisz.
            </p>
          </div>

          <div className="text-center">
            <Button href={AI_SDR_CALENDLY_URL} external>
              Nie wiesz, który plan wybrać? Porozmawiajmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
