"use client";

import { Clock } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { OBS_KLIENTA_CALENDLY_URL } from "@/lib/obsluga-klienta-constants";

export function Urgency() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Ograniczona dostępność"
            title="Ile zapytań zostanie dziś bez odpowiedzi?"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="space-y-6 text-text-secondary leading-relaxed mb-10">
            <p>
              Nie powiem Ci &quot;ostatnie miejsca!&quot;. To nie sklep z kurtkami.
            </p>
            <p>
              Każde wdrożenie robimy porządnie. Dlatego biorę maksymalnie 3 nowe
              wdrożenia jednocześnie.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="bg-warning/10 border border-warning/30 rounded-[6px] p-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-warning" strokeWidth={2} />
              <span className="font-mono text-sm font-semibold text-warning uppercase tracking-wider">
                Co tracisz codziennie
              </span>
            </div>
            <div className="space-y-3">
              {[
                "Kolejne zapytanie o 23:00 bez odpowiedzi — klient idzie do konkurencji",
                "Kolejny poniedziałek z 200 mailami — kolejny dzień stracony",
                "Kolejny nieodebrany telefon — kolejna utracona szansa",
                "Kolejne 50 godzin miesięcznie na powtarzalną robotę",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="text-warning mt-0.5 shrink-0">&#x2022;</span>
                  <span className="text-base text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-10">
            <p className="text-text font-medium">
              Twoja konkurencja już coś z tym robi. Im dłużej czekasz, tym większa przepaść.
            </p>
          </div>

          <div className="text-center">
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Chcę odpowiedzi w 30 sekund
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
