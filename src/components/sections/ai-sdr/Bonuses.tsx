"use client";

import { Gift, Check, Minus } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AI_SDR_BONUSES } from "@/lib/ai-sdr-constants";

const TIER_NAMES = ["COLD START", "FULL PIPELINE", "DOMINACJA"];

export function Bonuses() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Bonusy"
            title="Bonusy o wartości do 10,000 PLN. W cenie setupu."
          />
          <p className="text-lg text-text-secondary text-center mb-12">
            Zamiast rabatów dajesz więcej. Każdy bonus to wartość którą zatrzymujesz na zawsze.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="space-y-4 mb-10">
          {AI_SDR_BONUSES.map((bonus) => (
            <StaggerItem key={bonus.name}>
              <div className="bg-bg border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[6px] bg-accent/10 flex items-center justify-center shrink-0">
                      <Gift size={16} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl">{bonus.name}</h3>
                  </div>
                  <span className="text-accent font-mono font-bold text-lg whitespace-nowrap">
                    {bonus.value}
                  </span>
                </div>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">{bonus.desc}</p>
                <div className="flex gap-4">
                  {TIER_NAMES.map((tier) => (
                    <div key={tier} className="flex items-center gap-1.5">
                      {bonus.tiers.includes(tier) ? (
                        <Check size={14} className="text-success" strokeWidth={2} />
                      ) : (
                        <Minus size={14} className="text-text-light" strokeWidth={2} />
                      )}
                      <span className="text-sm text-text-muted">{tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { tier: "COLD START", value: "3,500 PLN" },
              { tier: "FULL PIPELINE", value: "8,000 PLN" },
              { tier: "DOMINACJA", value: "10,000 PLN" },
            ].map((item) => (
              <div key={item.tier} className="bg-accent/5 border border-accent/20 rounded-[6px] p-4">
                <p className="text-sm font-semibold text-text-muted mb-1">{item.tier}</p>
                <p className="font-mono text-xl font-bold text-accent">{item.value}</p>
                <p className="text-sm text-text-light">bonusów w cenie</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
