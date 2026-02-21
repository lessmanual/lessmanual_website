"use client";

import { Clock } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_CALENDLY_URL } from "@/lib/generator-ofert-constants";
import { getNextMonthPL } from "@/lib/constants";

export function Urgency() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Czas"
            title="Dlaczego warto zacząć teraz, nie za miesiąc"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="space-y-6 text-text-secondary leading-relaxed mb-10 text-lg">
            <p>
              Wdrażam max 3 systemy jednocześnie. Każde wdrożenie wymaga dedykowanej
              konfiguracji pod Twój biznes — Twoje ceny, materiały, logikę wycen.
              Nie chcę robić tego masowo — chcę robić to dobrze.
            </p>
            <p>
              Każdy tydzień bez systemu to tydzień, w którym Ty (lub Twój handlowiec) ręcznie
              robicie oferty zamiast zamykać deale. 20 ofert x 2 godziny = 40 godzin zmarnowanych.
              Co miesiąc. Na same wyceny.
            </p>
            <p>
              Twoja konkurencja nie czeka. Firma, która odpowiada ofertą w 5 minut, wygrywa z tą,
              która odpowiada po 3 dniach. Nie dlatego, że jest lepsza. Dlatego, że jest szybsza.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="bg-warning/10 border border-warning/30 rounded-[6px] p-6 text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={18} className="text-warning" strokeWidth={2} />
              <span className="font-mono text-base font-semibold text-warning uppercase tracking-wider">
                Ograniczona dostępność
              </span>
            </div>
            <p className="font-serif text-2xl text-text">
              Zostało 1 miejsce w {getNextMonthPL()}
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="text-center">
            <Button href={GEN_OFERT_CALENDLY_URL} external>
              Sprawdź, czy jest jeszcze miejsce
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
