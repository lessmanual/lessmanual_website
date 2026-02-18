"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { OBS_KLIENTA_COMPARISON_TABLE, OBS_KLIENTA_CALENDLY_URL } from "@/lib/obsluga-klienta-constants";

export function ComparisonTable() {
  const lastColIdx = OBS_KLIENTA_COMPARISON_TABLE.headers.length - 1;

  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Porównanie"
            title="LessManual vs alternatywy"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* Desktop table */}
          <div className="overflow-x-auto -mx-6 px-6 mb-8">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  {OBS_KLIENTA_COMPARISON_TABLE.headers.map((header, idx) => {
                    if (idx === 0) {
                      return (
                        <th key={idx} className="text-left p-3 text-sm font-sans font-semibold text-text-light w-[16%]" />
                      );
                    }
                    if (idx === lastColIdx) {
                      return (
                        <th
                          key={idx}
                          className="text-center p-3 text-sm font-sans font-semibold text-accent w-[16%] bg-accent/5 border-t-2 border-x-2 border-accent/20 rounded-t-[6px]"
                        >
                          {header}
                        </th>
                      );
                    }
                    return (
                      <th key={idx} className="text-center p-3 text-sm font-sans font-semibold text-text-light w-[16%] bg-warning/5">
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {OBS_KLIENTA_COMPARISON_TABLE.rows.map((row, rowIdx) => {
                  const isLast = rowIdx === OBS_KLIENTA_COMPARISON_TABLE.rows.length - 1;
                  return (
                    <tr key={row.label} className="border-t border-border">
                      <td className="p-3 text-sm font-medium text-text">
                        {row.label}
                      </td>
                      {row.cols.map((col, colIdx) => {
                        const isLastCol = colIdx === row.cols.length - 1;
                        if (isLastCol) {
                          return (
                            <td
                              key={colIdx}
                              className={`p-3 text-sm font-medium text-text text-center bg-accent/5 border-x-2 border-accent/20 ${isLast ? "border-b-2 rounded-b-[6px]" : ""}`}
                            >
                              {col}
                            </td>
                          );
                        }
                        return (
                          <td key={colIdx} className="p-3 text-sm text-text-secondary text-center bg-warning/5">
                            {col}
                          </td>
                        );
                      })}
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
              <strong className="text-text">Różnica?</strong> Tidio, InteliWISE, KODA — to narzędzia. Ty konfigurujesz.{" "}
              <strong className="text-text">LessManual — to system.</strong> My budujemy, trenujemy, monitorujemy.
            </p>
          </div>

          <div className="text-center">
            <Button href={OBS_KLIENTA_CALENDLY_URL} external>
              Pokaż mi to dla mojej firmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
