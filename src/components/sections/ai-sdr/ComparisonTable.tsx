"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AI_SDR_COMPARISON_TABLE, AI_SDR_CALENDLY_URL } from "@/lib/ai-sdr-constants";

export function ComparisonTable() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Porównanie"
            title="Zatrudnienie SDR-a vs AI SDR. Jedno kosztuje 12k miesięcznie. Drugie — zero stałych."
          />
          <p className="text-text-secondary text-center mb-12">
            Pewnie porównujesz opcje. Ułatwiamy:
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* Desktop table */}
          <div className="overflow-x-auto -mx-6 px-6 mb-8">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 text-sm font-sans font-semibold text-text-light w-[22%]" />
                  <th className="text-center p-3 text-sm font-sans font-semibold text-text-light w-[26%] bg-warning/5">
                    Twój SDR
                  </th>
                  <th className="text-center p-3 text-sm font-sans font-semibold text-text-light w-[26%]">
                    Agencja Lead Gen
                  </th>
                  <th className="text-center p-3 text-sm font-sans font-semibold text-accent w-[26%] bg-accent/5 border-t-2 border-x-2 border-accent/20 rounded-t-[6px]">
                    AI SDR (LessManual)
                  </th>
                </tr>
              </thead>
              <tbody>
                {AI_SDR_COMPARISON_TABLE.rows.map((row, idx) => {
                  const isLast = idx === AI_SDR_COMPARISON_TABLE.rows.length - 1;
                  return (
                    <tr key={row.label} className="border-t border-border">
                      <td className="p-3 text-sm font-medium text-text">
                        {row.label}
                      </td>
                      <td className="p-3 text-sm text-text-secondary text-center bg-warning/5">
                        {row.sdr}
                      </td>
                      <td className="p-3 text-sm text-text-secondary text-center">
                        {row.agency}
                      </td>
                      <td className={`p-3 text-sm font-medium text-text text-center bg-accent/5 border-x-2 border-accent/20 ${isLast ? "border-b-2 rounded-b-[6px]" : ""}`}>
                        {row.aiSdr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="bg-bg border border-border rounded-[6px] p-6 mb-8">
            <p className="text-text-secondary leading-relaxed text-sm">
              <strong className="text-text">Koszt jednego spotkania z in-house SDR-em:</strong>{" "}
              1,000-1,830 PLN (przy 12 spotkaniach/mies — branżowy benchmark).{" "}
              <strong className="text-text">Koszt jednego spotkania z nami:</strong>{" "}
              750-2,000 PLN. Porównywalnie lub taniej. Bez stałych kosztów. Bez ryzyka.
              Bez 3 miesięcy czekania.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-8">
            <p className="text-text font-medium text-sm">
              Agencja lead gen bierze 3-15k PLN retainer miesięcznie niezależnie od tego czy coś dowiezie.
              My bierzemy 0 PLN miesięcznie. Płacisz za spotkania, które się odbędą.
              Ryzyko jest po naszej stronie.
            </p>
          </div>

          <div className="text-center">
            <Button href={AI_SDR_CALENDLY_URL} external>
              Pokaż mi to dla mojej firmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
