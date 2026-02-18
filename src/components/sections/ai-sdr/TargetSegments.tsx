"use client";

import { Code2, Megaphone, Cloud, Handshake } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_TARGET_SEGMENTS } from "@/lib/ai-sdr-constants";

const iconMap = {
  Code2,
  Megaphone,
  Cloud,
  Handshake,
} as const;

export function TargetSegments() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Dla kogo" title="Działa najlepiej dla" />
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {AI_SDR_TARGET_SEGMENTS.map((seg) => {
            const Icon = iconMap[seg.icon];
            return (
              <StaggerItem key={seg.title}>
                <div className="bg-bg border border-border rounded-[6px] p-6 h-full hover:border-accent transition-colors duration-200">
                  <div className="w-10 h-10 rounded-[6px] bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg mb-2">{seg.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{seg.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="text-center">
            <p className="text-text-secondary mb-4">Twoja branża jest tutaj? Policz, ile możesz zarobić:</p>
            <Button href="#roi-calculator">
              Policz swój ROI
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
