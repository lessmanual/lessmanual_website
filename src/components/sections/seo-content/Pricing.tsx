"use client";

import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  SEO_SETUP_PLANS,
  SEO_DELIVERY_TIMES,
  SEO_CALENDLY_URL,
} from "@/lib/seo-content-constants";

export function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Cennik"
            title="Prosto. Setup + abonament. Bez ukrytych kosztów."
          />
          <p className="text-lg text-text-secondary text-center mb-12">
            Jednorazowy setup + miesięczny abonament. Wiesz z góry, ile płacisz.
            Żadnych niespodzianek.
          </p>
        </FadeUp>

        {/* Setup cards — SCALE → GROWTH (popular) → STARTER (anchoring) */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {SEO_SETUP_PLANS.map((plan) => (
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
                  <h3 className="font-serif text-2xl">{plan.name}</h3>
                  <p className="text-base text-text-muted">{plan.subtitle}</p>
                </div>

                <div className="mb-2">
                  <span className="font-mono text-3xl font-bold text-text">{plan.setupPrice}</span>
                  <span className="text-text-muted text-base ml-1">PLN setup</span>
                </div>
                <div className="mb-2">
                  <span className="font-mono text-xl font-semibold text-text">{plan.monthlyPrice}</span>
                  <span className="text-text-muted text-base ml-1">PLN/mies</span>
                </div>
                <div className="mb-6">
                  <span className="font-mono text-base font-medium text-accent">{plan.perArticle}</span>
                </div>

                <div className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <Check size={16} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-base text-text-secondary">{feat}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-text-muted mb-4">{plan.desc}</p>
                {"valueNote" in plan && plan.valueNote && (
                  <p className="text-xs text-accent mb-4">{plan.valueNote}</p>
                )}

                <Button
                  href={SEO_CALENDLY_URL}
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
          <p className="text-center text-base text-text-secondary mb-10">
            <strong className="text-text">50% zaliczki przed startem. 50% na dzień uruchomienia systemu.</strong>
          </p>
        </FadeUp>

        {/* Delivery times */}
        <FadeUp delay={0.2}>
          <div className="bg-white border border-border rounded-[6px] overflow-hidden mb-8">
            <div className="p-6 border-b border-border">
              <h3 className="font-serif text-xl mb-1">Czas wdrożenia</h3>
              <p className="text-base text-text-secondary">
                Od podpisania umowy do pierwszych artykułów na Twoim blogu:
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {SEO_DELIVERY_TIMES.map((item) => (
                  <div key={item.plan} className="flex items-center justify-between">
                    <span className="font-mono text-base font-semibold text-text">{item.plan}</span>
                    <span className="text-base text-text-secondary">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button href={SEO_CALENDLY_URL} external>
              Nie wiesz, który plan wybrać? Porozmawiajmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
