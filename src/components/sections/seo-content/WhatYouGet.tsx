"use client";

import { Check, X } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SEO_DELIVERABLES_TABLE, SEO_BONUS_VALUES } from "@/lib/seo-content-constants";

export function WhatYouGet() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <SectionHeader
            eyebrow="Co dostajesz"
            title="Nie kupujesz artykułów. Kupujesz ruch z Google i leady, które same Cię znajdują."
          />
          <p className="text-lg text-text-secondary text-center mb-12">
            Każdy pakiet to pełny system — od keyword research po monitoring pozycji.
            Oto co dokładnie dostajesz:
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="overflow-x-auto -mx-6 px-6 mb-8">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  {SEO_DELIVERABLES_TABLE.headers.map((header, idx) => (
                    <th
                      key={header}
                      className={`p-3 text-base font-sans font-semibold border-b border-border ${
                        idx === 0
                          ? "text-left text-text-light w-[34%]"
                          : "text-center text-text-light w-[22%]"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SEO_DELIVERABLES_TABLE.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border">
                    <td className="p-3 text-base text-text">{row.label}</td>
                    {(["starter", "growth", "scale"] as const).map((tier) => {
                      const val = row[tier];
                      return (
                        <td key={tier} className="p-3 text-base text-center">
                          {val === true ? (
                            <Check size={16} className="text-success mx-auto" strokeWidth={2} />
                          ) : val === false ? (
                            <X size={16} className="text-text-muted mx-auto" strokeWidth={2} />
                          ) : (
                            <span className="text-text-secondary">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Bonus values */}
        <FadeUp delay={0.15}>
          <div className="bg-accent/10 border border-accent/20 rounded-[6px] p-6">
            <p className="font-serif text-lg mb-4">Wartość bonusów w cenie pakietu:</p>
            <div className="space-y-3">
              {SEO_BONUS_VALUES.map((bonus) => (
                <div key={bonus.tier} className="flex items-start gap-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-mono font-semibold bg-white/60 text-accent shrink-0">
                    {bonus.tier}
                  </span>
                  <span className="text-base text-text-secondary">
                    {bonus.desc}{" "}
                    <span className="font-medium text-text">(wartość {bonus.value})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
