"use client";

import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SEO_PROBLEM_BULLETS } from "@/lib/seo-content-constants";

export function Problem() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Problem"
            title={"\u201eBlog leży odłogiem od miesięcy. Wiem, że powinienem pisać. Nie mam czasu.\u201d"}
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-text-secondary leading-relaxed mb-8 text-center">
            Otwierasz WordPressa. Patrzysz na ostatni wpis sprzed 4 miesięcy.
            Myślisz: &ldquo;Trzeba coś wrzucić&rdquo;. Zamykasz. Masz 15 innych rzeczy do zrobienia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {SEO_PROBLEM_BULLETS.map((item) => (
              <div key={item.num} className="relative bg-bg border border-border rounded-[6px] p-6 md:p-8 overflow-hidden hover:border-warning/50 transition-colors duration-200 group">
                <span className="absolute top-4 right-5 font-mono text-7xl font-bold text-accent/10 leading-none select-none pointer-events-none group-hover:text-accent/15 transition-colors duration-200">
                  {item.num}
                </span>
                <p className="text-text font-medium mb-2 pr-14">{item.title}</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] px-6 py-4 text-center">
            <p className="text-text font-medium">
              Zero artykułów = zero ruchu organicznego = cały budżet leci na reklamy.
            </p>
          </div>
          <p className="mt-6 text-text-secondary text-center leading-relaxed">
            20 artykułów miesięcznie to ~600 artykułów w 2.5 roku. Przy średnio 200 odwiedzin
            miesięcznie per artykuł = 120,000 odwiedzin miesięcznie. Za darmo. Na zawsze.
            Ile kosztuje 120,000 kliknięć z Google Ads?
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
