"use client";

import { AlertTriangle } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  SEO_CALENDLY_URL,
  SEO_AGITATION_TIMEFRAMES,
  SEO_AGITATION_STATS,
} from "@/lib/seo-content-constants";

export function Agitation() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Konsekwencje"
            title="Każdy miesiąc bez contentu to pozycje, które zabiera Twoja konkurencja"
          />
          <p className="text-lg text-text-secondary text-center mb-12 leading-relaxed">
            SEO to nie reklama. Nie klikasz &ldquo;włącz&rdquo; i &ldquo;wyłącz&rdquo;.
            To aktywo, które buduje się miesiącami. Im później zaczniesz, tym później zobaczysz wyniki.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="space-y-6 mb-12">
          {SEO_AGITATION_TIMEFRAMES.map((tf) => (
            <StaggerItem key={tf.time}>
              <div className="bg-white border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="font-mono text-base font-semibold text-warning mb-3">
                  {tf.time}
                </div>
                <p className="text-lg text-text-secondary leading-relaxed">{tf.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <div className="space-y-3 max-w-[600px] mx-auto mb-10">
            {SEO_AGITATION_STATS.map((stat) => (
              <div key={stat} className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-warning mt-1 shrink-0" strokeWidth={2} />
                <span className="text-lg text-text-secondary leading-relaxed">
                  <strong className="text-text">{stat}</strong>
                </span>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-10">
            <p className="text-lg text-text font-medium">
              Każdy dzień bez nowego contentu to pozycje, które zabiera konkurencja. Dosłownie.
            </p>
          </div>

          <div className="text-center">
            <Button href={SEO_CALENDLY_URL} external>
              Pokaż mi, ile ruchu tracę
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
