"use client";

import { Star } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { SEO_CALENDLY_URL, SEO_BONUS_VALUES } from "@/lib/seo-content-constants";
import { REVIEWS } from "@/lib/constants";

const billboardMetrics = [
  { value: "od 83 PLN", label: "koszt per artykuł", benchmark: "copywriter: 300-800 PLN" },
  { value: "10-30", label: "artykułów miesięcznie", benchmark: "done-for-you" },
  { value: "+150-400%", label: "wzrost ruchu organicznego", benchmark: "w 6 miesięcy" },
];

export function SocialProof() {
  return (
    <section id="wyniki" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Wyniki"
            title="Ile kosztuje artykuł? Porównaj sam."
          />
        </FadeUp>

        {/* Billboard metrics */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {billboardMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className="bg-bg border border-border rounded-[6px] p-6 text-center">
                <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
                  {m.label}
                </div>
                <div className="font-mono text-3xl md:text-4xl font-bold text-accent mb-2">
                  {m.value}
                </div>
                <div className="text-xs text-text-light">{m.benchmark}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bonus values */}
        <FadeUp delay={0.15}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6 mb-12">
            <p className="font-serif text-base mb-4">Bonusy w cenie pakietu:</p>
            <div className="space-y-3">
              {SEO_BONUS_VALUES.map((bonus) => (
                <div key={bonus.tier} className="flex items-start gap-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-semibold bg-white/60 text-accent shrink-0">
                    {bonus.tier}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {bonus.desc}{" "}
                    <span className="font-medium text-text">(wartość {bonus.value})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Google Reviews */}
        <FadeUp delay={0.2}>
          <div className="text-center mb-8">
            <h3 className="font-serif text-xl mb-4">Co mówią nasi klienci</h3>
            <StarRating rating={5.0} count={6} className="justify-center" />
          </div>
        </FadeUp>

        <div className="relative overflow-hidden mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="shrink-0 w-[280px] md:w-[340px] bg-bg border border-border rounded-[6px] p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-sans font-semibold text-sm text-text-secondary border border-border">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-sans font-medium text-sm text-text">
                      {review.name}
                    </div>
                    <div className="text-xs text-text-light">{review.meta}</div>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={13}
                      className="fill-amber-400 text-amber-400"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        <FadeUp delay={0.3}>
          <div className="text-center">
            <p className="text-text-secondary mb-4">Chcesz takich wyników? Porozmawiajmy.</p>
            <Button href={SEO_CALENDLY_URL} external>
              Chcę takie wyniki
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
