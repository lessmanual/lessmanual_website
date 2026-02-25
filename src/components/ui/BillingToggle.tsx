"use client";

import { useState } from "react";

type BillingPeriod = "monthly" | "annual";

interface BillingToggleProps {
  onChange: (period: BillingPeriod) => void;
}

export function BillingToggle({ onChange }: BillingToggleProps) {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const handleToggle = (newPeriod: BillingPeriod) => {
    setPeriod(newPeriod);
    onChange(newPeriod);
  };

  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <button
        onClick={() => handleToggle("monthly")}
        className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
          period === "monthly"
            ? "bg-text text-white"
            : "text-text-muted hover:text-text"
        }`}
      >
        Miesięcznie
      </button>
      <button
        onClick={() => handleToggle("annual")}
        className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
          period === "annual"
            ? "bg-text text-white"
            : "text-text-muted hover:text-text"
        }`}
      >
        Rocznie
        <span className="ml-1.5 text-xs font-semibold text-accent">-17%</span>
      </button>
    </div>
  );
}

export function getAnnualPrice(monthlyPrice: string): string {
  const num = parseFloat(monthlyPrice.replace(/,/g, ""));
  const annual = Math.round(num * 0.83);
  return annual.toLocaleString("pl-PL");
}
