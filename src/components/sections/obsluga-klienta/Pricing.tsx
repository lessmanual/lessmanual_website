"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  OBS_KLIENTA_SETUP_PLANS,
  OBS_KLIENTA_CALENDLY_URL,
} from "@/lib/obsluga-klienta-constants";

export function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Cennik"
            title="Ile to kosztuje? Mniej niż pracownik. A robi więcej."
          />
          <p className="text-text-secondary text-center mb-12">
            Płacisz za setup (jednorazowo) i abonament miesięczny za utrzymanie i rozwój systemu.
            Wybierz plan, który pasuje do Twojego biznesu.
          </p>
        </FadeUp>

        {/* Setup cards */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {OBS_KLIENTA_SETUP_PLANS.map((plan) => (
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

                <div className="mb-2">
                  <span className="font-mono text-3xl font-bold text-text">{plan.setup}</span>
                  <span className="text-text-muted text-sm ml-1">PLN</span>
                  <span className="text-text-light text-xs ml-2">(jednorazowo)</span>
                </div>
                <div className="mb-6">
                  <span className="font-mono text-lg font-semibold text-accent">+ {plan.mrr} PLN</span>
                  <span className="text-text-muted text-sm ml-1">/ mies</span>
                </div>

                <div className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <Check size={16} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-sm text-text-secondary">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                    Delivery: {plan.delivery}
                  </span>
                </div>

                <p className="text-xs text-text-muted mb-4">{plan.desc}</p>
                {plan.valueNote && (
                  <p className="text-xs text-accent mb-4">{plan.valueNote}</p>
                )}

                <Button
                  href={OBS_KLIENTA_CALENDLY_URL}
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
            <strong className="text-text">50% zaliczki przed startem. 50% po wdrożeniu i zatwierdzeniu.</strong>
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="text-center">
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Nie wiesz, który plan wybrać? Porozmawiajmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
