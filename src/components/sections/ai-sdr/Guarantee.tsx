"use client";

import { Shield } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_CALENDLY_URL, AI_SDR_GUARANTEE_LAYERS } from "@/lib/ai-sdr-constants";

export function Guarantee() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Gwarancja" title="3 warstwy ochrony. Nic nie ryzykujesz." />
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {AI_SDR_GUARANTEE_LAYERS.map((layer) => (
            <StaggerItem key={layer.layer}>
              <div className="bg-success/5 border border-success/30 rounded-[6px] p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <span className="text-success font-mono font-bold text-sm">{layer.layer}</span>
                  </div>
                  <Shield size={18} className="text-success" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl mb-3">{layer.heading}</h3>
                <p className="text-lg text-text-secondary leading-relaxed">{layer.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <p className="text-center text-lg text-text font-medium mb-8">
            Ryzyko jest po naszej stronie, nie Twojej. Dlatego możemy sobie na to pozwolić - bo wiemy, co robimy.
          </p>
          <div className="text-center">
            <Button href={AI_SDR_CALENDLY_URL} external>
              Zacznij bez ryzyka
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
