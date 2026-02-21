"use client";

import { AlertTriangle } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  GEN_OFERT_CALENDLY_URL,
  GEN_OFERT_AGITATION_TIMEFRAMES,
  GEN_OFERT_AGITATION_COSTS,
} from "@/lib/generator-ofert-constants";

export function Agitation() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Konsekwencje"
            title="Klient dostał 3 oferty. Wybrał tego, kto odpowiedział najszybciej."
          />
          <p className="text-text-secondary text-center mb-12 leading-relaxed text-lg">
            Wyobraź sobie: dzwoni klient, pyta o wycenę instalacji fotowoltaicznej.
            Mówi &ldquo;wyślij ofertę&rdquo;. Ty masz jeszcze 4 inne do zrobienia.
            Wpisujesz sobie w notatki. Wracasz do tego następnego dnia. Tymczasem firma
            z sąsiedztwa &mdash; ta, która ma system &mdash; generuje ofertę w 5 minut.
            Wysyła. Klient widzi profesjonalny PDF, trzy warianty cenowe, kalkulator ROI. Podpisuje.
            Ty następnego dnia otwierasz Excela.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="space-y-6 mb-12">
          {GEN_OFERT_AGITATION_TIMEFRAMES.map((tf) => (
            <StaggerItem key={tf.time}>
              <div className="bg-white border border-border rounded-[6px] p-6 hover:border-accent transition-colors duration-200">
                <div className="font-mono text-base font-semibold text-warning mb-3">
                  {tf.time}
                </div>
                <p className="text-text-secondary leading-relaxed text-base">{tf.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <p className="text-text font-medium text-center mb-6">
            Każdy tydzień bez systemu to:
          </p>

          <div className="space-y-3 max-w-[520px] mx-auto mb-10">
            {GEN_OFERT_AGITATION_COSTS.map((cost) => (
              <div key={cost} className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-warning mt-1 shrink-0" strokeWidth={2} />
                <span className="text-text-secondary leading-relaxed">
                  <strong className="text-text">{cost}</strong>
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href={GEN_OFERT_CALENDLY_URL} external>
              Pokaż mi, jak to rozwiązać
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
