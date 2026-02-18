"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { AI_SDR_SOCIAL_PROOF_METRICS, AI_SDR_CALENDLY_URL } from "@/lib/ai-sdr-constants";
import { REVIEWS } from "@/lib/constants";

const billboardMetrics = [
  { value: "77%", label: "open rate", benchmark: "standard: 20-30%" },
  { value: "60%", label: "positive reply rate", benchmark: "standard: 5-15%" },
  { value: "6 dni", label: "do pierwszego deala", benchmark: "standard: 30-90 dni" },
];

export function SocialProof() {
  return (
    <section id="wyniki" className="py-28 md:py-40 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Wyniki"
            title="Wyniki z aktywnej kampanii. Nie obietnice — dane."
          />
        </FadeUp>

        {/* Billboard metrics — dark cards */}
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

        {/* Instantly Dashboard Screenshot */}
        <FadeUp delay={0.12}>
          <div className="bg-bg border border-border rounded-[6px] p-3 mb-12">
            <Image
              src="/images/instantly-dashboard.png"
              alt="Instantly Campaign Dashboard — 476 sent, 77% open rate, 60% positive reply, 12 opportunities, $9,900"
              width={1000}
              height={620}
              className="w-full h-auto rounded-[4px]"
              priority={false}
            />
          </div>
        </FadeUp>

        {/* Metrics table */}
        <FadeUp delay={0.15}>
          <div className="bg-bg border border-border rounded-[6px] overflow-hidden mb-4">
            <div className="grid grid-cols-3 gap-0 text-sm">
              <div className="p-4 font-sans font-semibold text-text-light bg-white border-b border-border">
                Metryka
              </div>
              <div className="p-4 font-sans font-semibold text-accent bg-white border-b border-border text-center">
                Nasz wynik
              </div>
              <div className="p-4 font-sans font-semibold text-text-light bg-white border-b border-border text-center">
                Standard branży
              </div>
              {AI_SDR_SOCIAL_PROOF_METRICS.map((row) => (
                <div key={row.label} className="contents">
                  <div className="p-4 text-text-secondary border-b border-border last:border-b-0">
                    {row.label}
                  </div>
                  <div className="p-4 font-mono font-semibold text-accent text-center border-b border-border last:border-b-0">
                    {row.ours}
                  </div>
                  <div className="p-4 font-mono text-text-muted text-center border-b border-border last:border-b-0">
                    {row.benchmark}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-text-muted text-center mb-12">
            Dane z kampanii LessManual AI SDR. Luty 2026. Kampania w toku (41% ukończona) — wyniki rosną z każdym tygodniem.
          </p>
        </FadeUp>

        {/* WiperApp Case Study — accent left bar */}
        <FadeUp delay={0.2}>
          <div className="bg-white border-l-[3px] border-l-accent border border-border rounded-r-[6px] rounded-l-none p-6 md:p-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-sans font-semibold uppercase tracking-wider bg-accent/10 text-accent rounded-full">
                Case Study
              </span>
              <span className="font-serif text-lg">WiperApp</span>
            </div>
            <p className="font-serif text-2xl text-text mb-4">
              Cold email. Podpisana umowa. <span className="text-accent">6 dni.</span>
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              WiperApp (SaaS, data erasure) potrzebował spotkań z firmami ITAD i Enterprise
              na poziomie C-Level, globalnie. Wysłaliśmy cold email, umówiliśmy spotkanie
              i podpisaliśmy umowę na współpracę. Od pierwszego maila do podpisu: 6 dni.
            </p>
            <p className="text-text font-medium">
              Nie tydzień na &ldquo;oglądanie oferty&rdquo;. 6 dni: mail &rarr; spotkanie &rarr; umowa.
            </p>
          </div>
        </FadeUp>

        {/* Google Reviews */}
        <FadeUp delay={0.25}>
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
            <Button href={AI_SDR_CALENDLY_URL} external>
              Chcę takie wyniki
            </Button>
            <p className="mt-6 text-text-secondary text-sm">
              OK, wyniki widzisz. Ale co dokładnie dostajesz za te pieniądze?
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
