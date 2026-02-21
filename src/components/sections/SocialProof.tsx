"use client";

import { Star } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { CountUp } from "@/components/animations/CountUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import {
  SOCIAL_PROOF_METRICS,
  SPOTLIGHT_CASES,
  MORE_CASES,
  REVIEWS,
  CALENDLY_URL,
} from "@/lib/constants";

export function SocialProof() {
  return (
    <section id="wyniki" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Wyniki klientów" title="Liczby mówią same za siebie." />
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-center text-lg text-text-secondary mb-4">
            <strong className="text-text">10+ firm B2B</strong> zaufało LessManual.
            Od startupów SaaS po firmy z branży automotive, recyklingu i OZE.
          </p>
          <p className="text-center text-text-secondary mb-16">
            Nie obiecujemy. Pokazujemy wyniki.
          </p>
        </FadeUp>

        {/* Metrics Grid — BILLBOARD sized */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 mb-20"
        >
          {SOCIAL_PROOF_METRICS.map((m) => (
            <StaggerItem key={m.label} className="text-center">
              <div className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-2">
                <CountUp to={m.countTo} suffix={m.suffix} decimals={m.decimals ?? 0} />
              </div>
              <div className="text-base text-text-secondary mb-1">{m.label}</div>
              <div className="text-base text-text-muted">standard: {m.benchmark}</div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Spotlight Cases */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {SPOTLIGHT_CASES.map((c) => (
            <StaggerItem key={c.company}>
              <Card spotlight className="p-6 md:p-8">
                <div className="text-sm font-sans font-semibold uppercase tracking-wider text-accent mb-3">
                  {c.type}
                </div>
                <h3 className="font-serif text-2xl mb-3">{c.company}</h3>
                <p className="text-text-secondary text-base leading-relaxed mb-4">
                  Inwestycja: <span className="font-mono font-medium text-text">{c.investment}</span>.
                  Wynik: <span className="font-mono font-medium text-text">{c.result}</span>.
                </p>
                <p className="text-text-secondary text-base leading-relaxed mb-4">
                  {c.detail}
                </p>
                <p className="font-mono text-base font-medium text-success">
                  Szacunkowa wartość: {c.value}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* More Cases */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {MORE_CASES.map((c) => (
            <StaggerItem key={c.company}>
              <Card spotlight className="p-5">
                <div className="text-sm font-sans font-semibold uppercase tracking-wider text-accent mb-2">
                  {c.type}
                </div>
                <h4 className="font-serif text-xl text-text mb-2">{c.company}</h4>
                <p className="text-text-secondary text-base leading-relaxed">{c.result}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Google Reviews */}
        <FadeUp>
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl mb-4">Co mówią nasi klienci</h3>
            <StarRating rating={5.0} count={6} className="justify-center" />
          </div>
        </FadeUp>

        {/* Reviews marquee — infinite scroll */}
        <div className="relative overflow-hidden mb-12">
          {/* Fade edges */}
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
                <p className="text-text-secondary text-base leading-relaxed line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        <FadeUp>
          <div className="text-center">
            <p className="text-text-secondary text-lg mb-4">
              Chcesz takich wyników? Porozmawiajmy.
            </p>
            <Button href={CALENDLY_URL} external>
              Chcę takich wyników
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
