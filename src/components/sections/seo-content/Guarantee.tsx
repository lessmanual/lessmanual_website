"use client";

import { Shield, Check } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SEO_GUARANTEES, SEO_CALENDLY_URL } from "@/lib/seo-content-constants";

export function Guarantee() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <FadeUp>
          <SectionHeader eyebrow="Gwarancja" title="ROI 200% w 90 dni lub miesiąc gratis." />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-success/5 border-2 border-success/30 rounded-[6px] p-6 md:p-8 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <Shield size={20} className="text-success" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg">Gwarancja wyników</h3>
            </div>

            <div className="space-y-5">
              {SEO_GUARANTEES.map((guarantee) => (
                <div key={guarantee.title} className="flex items-start gap-3">
                  <Check size={18} className="text-success mt-0.5 shrink-0" strokeWidth={2} />
                  <div>
                    <p className="font-medium text-text mb-1">{guarantee.title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{guarantee.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-success/20">
              <p className="text-text font-medium">
                Ryzyko jest po naszej stronie, nie Twojej.
              </p>
              <p className="text-text-secondary text-sm mt-1">
                Dlatego możemy sobie na to pozwolić — bo wiemy, co robimy.
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="text-center">
            <Button href={SEO_CALENDLY_URL} external>
              Zacznij bez ryzyka
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
