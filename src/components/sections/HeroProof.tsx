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
                value: "20-40h",
                label: "tyle oszczędzają nasi klienci",
                countTo: 40,
                suffix: "h",
              },
              {
                value: "7-21 dni",
                label: "do działającego systemu",
              },
              {
                value: "Gwarancja wyników",
                label: "lub pełny zwrot kosztów",
              },
            ]}
          />
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-10 flex justify-center">
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
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
