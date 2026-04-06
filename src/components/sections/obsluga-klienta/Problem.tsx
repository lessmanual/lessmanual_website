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
            title="Znasz to?"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-text-secondary leading-relaxed mb-10 space-y-4">
            <p>
              O 3 w nocy ktoś pisze na WhatsAppie. Mail o 22:00. Telefon w weekend.
              Nikt nie odpowiada. Klient idzie do konkurencji, bo tam odpisali szybciej.
            </p>
            <p>
              &quot;Gdzie moja paczka?&quot; &quot;Czy macie wolne terminy?&quot; &quot;Ile kosztuje?&quot;
              70% zapytań to FAQ. Twoi ludzie tracą 30 godzin tygodniowo na kopiuj-wklej.
            </p>
            <p>
              Etat obsługi to 8,000-9,000 PLN miesięcznie. I tak nie pracuje 24/7.
              A jak weźmie L4 w szczycie sezonu, jesteś w punkcie wyjścia.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h3 className="font-serif text-xl mb-6 text-center">Policz sam:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {OBS_KLIENTA_COST_TABLE.map((row) => (
              <div key={row.task} className="bg-bg border border-border rounded-[6px] p-5">
                <div className="text-base font-medium text-text mb-3">{row.task}</div>
                <div className="flex items-baseline gap-2 text-base">
                  <span className="font-mono text-warning font-semibold">{row.result}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center">
            <p className="text-text font-medium">
              Mail się rozjeżdża, WhatsApp to chaos, telefon dzwoni w pustkę.
              Tracisz klientów nie dlatego, że Twój produkt jest gorszy - tylko
              dlatego, że nie odpowiadasz wystarczająco szybko.
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
