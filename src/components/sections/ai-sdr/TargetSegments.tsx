"use client";

import { Code2, Users, Factory } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_TARGET_SEGMENTS } from "@/lib/ai-sdr-constants";

const iconMap = {
  Code2,
  Users,
  Factory,
} as const;

export function TargetSegments() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Dla kogo" title="Działa najlepiej dla" />
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {AI_SDR_TARGET_SEGMENTS.map((seg) => {
            const Icon = iconMap[seg.icon];
            return (
              <StaggerItem key={seg.title}>
                <div className="bg-bg border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200">
                  <div className="w-10 h-10 rounded-[6px] bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl mb-1">{seg.title}</h3>
                  {"subtitle" in seg && seg.subtitle && (
                    <p className="text-base text-accent mb-2">{seg.subtitle}</p>
                  )}
                  <p className="text-lg text-text-secondary leading-relaxed">{seg.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="text-center">
            <p className="text-text-secondary mb-4">Ta sama cena, inne ICP, emaile i źródła leadów. Twoja branża jest tutaj? Policz swój ROI:</p>
            <Button href="#roi-calculator">
              Policz swój ROI
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
