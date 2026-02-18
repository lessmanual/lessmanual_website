"use client";

import { AlertTriangle } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  AI_SDR_CALENDLY_URL,
  AI_SDR_AGITATION_TIMEFRAMES,
  AI_SDR_AGITATION_COSTS,
} from "@/lib/ai-sdr-constants";

export function Agitation() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Konsekwencje"
            title="Co się stanie jeśli nic nie zmienisz?"
          />
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="space-y-6 mb-12">
          {AI_SDR_AGITATION_TIMEFRAMES.map((tf) => (
            <StaggerItem key={tf.time}>
              <div className="bg-white border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="font-mono text-sm font-semibold text-warning mb-3">
                  {tf.time}
                </div>
                <p className="text-text-secondary leading-relaxed">{tf.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <p className="text-text font-medium text-center mb-6">
            Ile spotkań straciłeś w ostatnim miesiącu, bo nie miałeś systemu, żeby do tych ludzi dotrzeć?
          </p>

          <div className="space-y-3 max-w-[520px] mx-auto mb-10">
            {AI_SDR_AGITATION_COSTS.map((cost) => (
              <div key={cost} className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-warning mt-1 shrink-0" strokeWidth={2} />
                <span className="text-text-secondary leading-relaxed">
                  <strong className="text-text">{cost}</strong>
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href={AI_SDR_CALENDLY_URL} external>
              Pokaż mi jak to działa
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
