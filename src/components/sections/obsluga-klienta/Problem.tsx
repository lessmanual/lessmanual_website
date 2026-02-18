"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  OBS_KLIENTA_CALENDLY_URL,
  OBS_KLIENTA_COST_TABLE,
} from "@/lib/obsluga-klienta-constants";

export function Problem() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Problem"
            title="Odpowiadasz na te same pytania 30 razy dziennie?"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-text-secondary leading-relaxed mb-10 space-y-4">
            <p>
              Znasz to. Poniedziałek, 8:00 rano. Otwierasz maila. 47 nowych
              wiadomości. Połowa to pytania, na które odpowiadałeś wczoraj.
              I przedwczoraj.
            </p>
            <p>
              &quot;Ile kosztuje?&quot; &quot;Czy macie na stanie?&quot; &quot;Jak długo trwa
              realizacja?&quot; Te same pytania. Dzień w dzień.
            </p>
            <p>
              A jak ktoś napisze o 22:00? Odpowiedź dostanie rano. Albo wcale.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h3 className="font-serif text-lg mb-6 text-center">Policz sam:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {OBS_KLIENTA_COST_TABLE.map((row) => (
              <div key={row.task} className="bg-bg border border-border rounded-[6px] p-5">
                <div className="text-sm font-medium text-text mb-3">{row.task}</div>
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="font-mono text-warning font-semibold">{row.result}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center">
            <p className="text-text font-medium">
              Problem nie jest w tym, że masz za mało ludzi. Problem jest w tym,
              że Twoi ludzie tracą godziny na robotę, którą system zrobiłby
              w sekundy.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Chcę odpowiedzi w 30 sekund
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
