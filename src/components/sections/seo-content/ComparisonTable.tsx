"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SEO_COMPARISON_TABLE, SEO_CALENDLY_URL } from "@/lib/seo-content-constants";

export function ComparisonTable() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Porównanie"
            title="Copywriter vs agencja vs SaaS vs LessManual. Kto wygrywa?"
          />
          <p className="text-lg text-text-secondary text-center mb-12">
            Pewnie porównujesz opcje. Ułatwiamy:
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          {/* Desktop table */}
          <div className="overflow-x-auto -mx-6 px-6 mb-8">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 text-base font-sans font-semibold text-text-light w-[20%]" />
                  <th className="text-center p-3 text-base font-sans font-semibold text-text-light w-[20%]">
                    Copywriter
                  </th>
                  <th className="text-center p-3 text-base font-sans font-semibold text-text-light w-[20%]">
                    Agencja contentowa
                  </th>
                  <th className="text-center p-3 text-base font-sans font-semibold text-text-light w-[20%]">
                    SaaS (Surfer/Jasper)
                  </th>
                  <th className="text-center p-3 text-base font-sans font-semibold text-accent w-[20%] bg-accent/5 border-t-2 border-x-2 border-accent/20 rounded-t-[6px]">
                    LessManual
                  </th>
                </tr>
              </thead>
              <tbody>
                {SEO_COMPARISON_TABLE.rows.map((row, idx) => {
                  const isLast = idx === SEO_COMPARISON_TABLE.rows.length - 1;
                  return (
                    <tr key={row.label} className="border-t border-border">
                      <td className="p-3 text-base font-medium text-text">
                        {row.label}
                      </td>
                      <td className="p-3 text-base text-text-secondary text-center">
                        {row.copywriter}
                      </td>
                      <td className="p-3 text-base text-text-secondary text-center">
                        {row.agency}
                      </td>
                      <td className="p-3 text-base text-text-secondary text-center">
                        {row.saas}
                      </td>
                      <td className={`p-3 text-base font-medium text-text text-center bg-accent/5 border-x-2 border-accent/20 ${isLast ? "border-b-2 rounded-b-[6px]" : ""}`}>
                        {row.lessmanual}
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
              <strong className="text-text">Copywriter za 8-10 artykułów bierze 5-8k PLN.</strong>{" "}
              Agencja contentowa za 4-12 artykułów: 1.6-5.5k PLN. SaaS daje narzędzia, ale Ty
              robisz wszystko sam.{" "}
              <strong className="text-text">LessManual: 10-30 artykułów, done-for-you, od 1,000 PLN/mies.</strong>
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center mb-8">
            <p className="text-text font-medium text-base">
              Gwarancja ROI 200% w 90 dni. Nie dowieziemy? Miesiąc gratis.
            </p>
          </div>

          <div className="text-center">
            <Button href={SEO_CALENDLY_URL} external>
              Pokaż mi to dla mojej firmy
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
