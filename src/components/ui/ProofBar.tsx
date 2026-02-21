"use client";

import { Users, Star, Clock } from "lucide-react";
import { CountUp } from "@/components/animations/CountUp";

interface ProofMetric {
  value: string;
  label: string;
  countFrom?: number;
  countTo?: number;
  suffix?: string;
  prefix?: string;
}

interface ProofBadge {
  icon: typeof Users;
  text: string;
  highlight?: boolean;
}

interface ProofBarProps {
  metrics: ProofMetric[];
  badges?: ProofBadge[];
  meta?: string;
  className?: string;
}

export function ProofBar({ metrics, badges, meta, className = "" }: ProofBarProps) {
  return (
    <div className={`border-t border-border pt-10 ${className}`}>
      <div className="flex flex-wrap md:flex-nowrap justify-center items-start gap-10 md:gap-16">
        {metrics.map((m) => (
          <div key={m.label} className="text-center">
            <div className="font-mono text-3xl md:text-4xl font-semibold text-text">
              {m.countTo !== undefined ? (
                <CountUp
                  from={m.countFrom ?? 0}
                  to={m.countTo}
                  prefix={m.prefix}
                  suffix={m.suffix}
                />
              ) : (
                m.value
              )}
            </div>
            <div className="text-base text-text-muted mt-2">{m.label}</div>
          </div>
        ))}
      </div>
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {badges.map((badge) => (
            <span
              key={badge.text}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                badge.highlight
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-white border border-border text-text-secondary"
              }`}
            >
              <badge.icon size={14} strokeWidth={2} />
              {badge.text}
            </span>
          ))}
        </div>
      )}
      {meta && !badges && (
        <p className="text-center text-sm text-text-light mt-8">{meta}</p>
      )}
    </div>
  );
}
