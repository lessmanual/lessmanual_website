"use client";

import { Shield, Banknote, BarChart3, CalendarCheck } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/Button";
import { SEO_CALENDLY_URL, SEO_EMAIL } from "@/lib/seo-content-constants";

const trustElements = [
  { icon: Shield, text: "30 dni trial" },
  { icon: Banknote, text: "Od 100 PLN/artykuł" },
  { icon: BarChart3, text: "ROI 200% w 90 dni" },
  { icon: CalendarCheck, text: "5-14 dni do startu" },
];

export function FinalCTA() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-10">
            <h2 className="font-serif text-text mb-6">
              Ile artykułów opublikujesz w tym miesiącu?
            </h2>
            <p className="text-text-secondary text-xl leading-relaxed max-w-[680px] mx-auto">
              15 minut. Pokażemy, jak wygląda keyword research w Twojej branży, ile artykułów
              potrzebujesz i jaki ruch możesz zbudować. Od kiedy chcesz, żeby blog pracował za Ciebie?
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="text-center mb-10">
            <Button href={SEO_CALENDLY_URL} external>
              Chcę blog, który pisze się sam
            </Button>
            <p className="mt-5 text-text-muted text-base max-w-[520px] mx-auto">
              Jeśli pasujemy — startujemy w 5-14 dni. Jeśli nie — wyjdziesz z darmową
              analizą SEO Twojej branży i konkretnymi wskazówkami, co publikować.
            </p>
          </div>
        </FadeUp>

        {/* Trust elements */}
        <FadeUp delay={0.15}>
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 gap-4 mb-10">
            {trustElements.map((el) => (
              <StaggerItem key={el.text}>
                <div className="flex items-center gap-3 bg-bg border border-border rounded-[6px] p-4">
                  <el.icon size={18} className="text-accent shrink-0" strokeWidth={1.5} />
                  <span className="text-text-secondary text-base">{el.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeUp>

        {/* Alt contact */}
        <FadeUp delay={0.2}>
          <div className="text-center border-t border-border pt-8">
            <p className="text-text-muted text-base mb-2">Wolisz napisać?</p>
            <a
              href={`mailto:${SEO_EMAIL}`}
              className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {SEO_EMAIL}
            </a>
          </div>
        </FadeUp>

        {/* P.S. */}
        <FadeUp delay={0.25}>
          <div className="mt-10 text-text-muted text-base leading-relaxed">
            <p>
              <strong className="text-text-secondary">P.S.</strong> Każdy dzień bez nowego artykułu
              to pozycje w Google, które zbiera Twoja konkurencja. Artykuł opublikowany dzisiaj
              zacznie rankować za 2-3 miesiące. Im wcześniej zaczniesz, tym wcześniej zbierasz.
            </p>
            <p className="mt-3 text-text-light">— Bartek</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-12 text-center font-mono text-sm text-accent uppercase tracking-widest">
            Less Manual. More Growth.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
