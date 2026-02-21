"use client";

import { AlertTriangle } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  OBS_KLIENTA_AGITATION_TIMEFRAMES,
  OBS_KLIENTA_AGITATION_COSTS,
} from "@/lib/obsluga-klienta-constants";

export function Agitation() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Konsekwencje"
            title="Każde nieodpowiedziane zapytanie = klient, który poszedł do konkurencji"
          />
          <p className="text-text-secondary text-center mb-12 leading-relaxed">
            Ile zapytań dostałeś w ostatnim tygodniu, na które nie odpowiedziałeś
            w ciągu godziny? 5? 10? 30?
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="space-y-3 max-w-[520px] mx-auto mb-12">
            {OBS_KLIENTA_AGITATION_COSTS.map((cost) => (
              <div key={cost} className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-warning mt-1 shrink-0" strokeWidth={2} />
                <span className="text-text-secondary leading-relaxed">
                  <strong className="text-text">{cost}</strong>
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="space-y-6 mb-12">
          {OBS_KLIENTA_AGITATION_TIMEFRAMES.map((tf) => (
            <StaggerItem key={tf.time}>
              <div className="bg-white border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="font-mono text-base font-semibold text-warning mb-3">
                  {tf.time}
                </div>
                <p className="text-text-secondary leading-relaxed">{tf.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 mb-10">
            <p className="text-text-secondary leading-relaxed italic">
              &quot;300 maili dziennie, spotkania od 9 do 17 bez przerw na myślenie.&quot;
              — tak opisują swój dzień przedsiębiorcy, z którymi rozmawiamy
            </p>
          </div>

          <p className="text-text font-medium text-center mb-8">
            Potrzebujesz systemu, który pracuje gdy Ty śpisz.
          </p>

          <div className="text-center">
            <Button href="#wyniki" variant="text">
              Zobacz jak działa na żywo
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
