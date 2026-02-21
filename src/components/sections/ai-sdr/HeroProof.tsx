"use client";

import Image from "next/image";
import { FadeUp } from "@/components/animations/FadeUp";
import { ProofBar } from "@/components/ui/ProofBar";

export function HeroProof() {
  return (
    <section className="py-14 md:py-20 bg-bg border-t border-border">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <ProofBar
            metrics={[
              {
                value: "77%",
                label: "open rate (3x standard)",
                countTo: 77,
                suffix: "%",
              },
              {
                value: "6 dni",
                label: "od maila do umowy",
                countTo: 6,
                suffix: " dni",
              },
              {
                value: "0 PLN",
                label: "stałych kosztów",
              },
            ]}
          />
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-5">
            <div className="inline-flex items-center gap-4">
              <Image
                src="/arek-skuza.jpg"
                alt="Arek Skuza"
                width={44}
                height={44}
                className="rounded-full border border-border shrink-0"
              />
              <p className="text-base text-text-secondary text-left max-w-[520px]">
                <span className="italic">
                  &ldquo;Focus. Precision. Excellent time management, and AI
                  agents&apos; knowledge are what make Bartek an exceptional
                  architect and engineer.&rdquo;
                </span>{" "}
                <span className="text-text-light text-sm">
                  — Arek Skuza, CEO
                </span>
              </p>
            </div>
            <p className="font-mono text-sm text-accent tracking-wide font-medium text-center">
              Pierwszy w Polsce: AI SDR z modelem Pay-Per-Meeting.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
