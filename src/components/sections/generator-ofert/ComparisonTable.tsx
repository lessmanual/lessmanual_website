"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { GEN_OFERT_COMPARISON_TABLE, GEN_OFERT_CALENDLY_URL } from "@/lib/generator-ofert-constants";

export function ComparisonTable() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Porównanie"
            title="Narzędzia SaaS vs LessManual. Jedno daje dashboard. Drugie — gotowy system."
          />
          <p className="text-text-secondary text-center mb-12 text-lg">
            Pewnie porównujesz opcje. Ułatwiamy:
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* Desktop table */}
          <div className="overflow-x-auto -mx-6 px-6 mb-8">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 text-base font-sans font-semibold text-text-light w-[28%]" />
                  <th className="text-center p-3 text-base font-sans font-semibold text-text-light w-[36%] bg-warning/5">
                    {GEN_OFERT_COMPARISON_TABLE.headers[1]}
                  </th>
                  <th className="text-center p-3 text-base font-sans font-semibold text-accent w-[36%] bg-accent/5 border-t-2 border-x-2 border-accent/20 rounded-t-[6px]">
                    {GEN_OFERT_COMPARISON_TABLE.headers[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {GEN_OFERT_COMPARISON_TABLE.rows.map((row, idx) => {
                  const isLast = idx === GEN_OFERT_COMPARISON_TABLE.rows.length - 1;
                  return (
                    <tr key={row.label} className="border-t border-border">
                      <td className="p-3 text-base font-medium text-text">
                        {row.label}
                      </td>
                      <td className="p-3 text-base text-text-secondary text-center bg-warning/5">
                        {row.saas}
                      </td>
                      <td className={`p-3 text-base font-medium text-text text-center bg-accent/5 border-x-2 border-accent/20 ${isLast ? "border-b-2 rounded-b-[6px]" : ""}`}>
                        {row.ours}
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
            <p className="text-text-secondary leading-relaxed text-base">
              <strong className="text-text">Narzędzia SaaS</strong> dają Ci pusty dashboard i mówią
              &ldquo;konfiguruj sam&rdquo;. Tygodnie konfiguracji Twojego czasu, który mógłbyś
              poświęcić na zamykanie deali.{" "}
              <strong className="text-text">My budujemy system pod klucz</strong> — z Twoimi
              cenami, materiałami, logiką wycen. Ty zatwierdzasz i korzystasz.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-8">
            <p className="text-text font-medium text-base">
              Narzędzie SaaS kosztuje 0 PLN za setup, ale tygodnie Twojego czasu na konfigurację.
              My bierzemy setup, ale 0 Twojego czasu na config. Który koszt jest wyższy?
            </p>
          </div>

          <div className="text-center">
            <Button href={GEN_OFERT_CALENDLY_URL} external>
              Pokaż mi to dla mojej firmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
