"use client";

import { Shield } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_CALENDLY_URL } from "@/lib/ai-sdr-constants";

export function Guarantee() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Gwarancja" title="0 spotkań w 45 dni = zwrot setup. Bez pytań." />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-success/5 border-2 border-success/30 rounded-[6px] p-6 md:p-8 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <Shield size={20} className="text-success" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl">Gwarancja wyników</h3>
            </div>

            <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
              <p>
                Uruchamiamy kampanię. Jeśli w ciągu 45 dni od startu nie umówimy ANI JEDNEGO
                spotkania spełniającego Twoje kryteria — zwracamy opłatę za setup. Bez pytań.
                Bez &ldquo;ale&rdquo;. Przelew wraca na Twoje konto.
              </p>

              <p className="font-medium text-text">Dlaczego to gwarantujemy?</p>

              <p>
                Bo dane z naszej kampanii mówią same za siebie. Open rate 3x powyżej standardu
                branży. Ponad połowa odpowiedzi to zainteresowani. Deal zamknięty w mniej niż
                tydzień od pierwszego maila.
              </p>

              <p className="text-text font-medium">
                Nie pytanie CZY system działa. System działa. Pytanie ILE spotkań chcesz.
              </p>

              <p>
                <strong className="text-text">Ryzyko jest po naszej stronie, nie Twojej.</strong>{" "}
                Dlatego możemy sobie na to pozwolić — bo wiemy, co robimy.
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
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
