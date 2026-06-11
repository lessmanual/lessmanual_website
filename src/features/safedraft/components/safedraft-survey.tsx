"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";

type SafeDraftSurveyProps = {
  marketingConsent: boolean;
};

const PROBLEM_OPTIONS = [
  "Brzmi zbyt sztucznie",
  "Jest za długie",
  "Za mocno sprzedaje",
  "Brakuje konkretu",
];

export function SafeDraftSurvey({ marketingConsent }: SafeDraftSurveyProps) {
  const [selectedProblem, setSelectedProblem] = useState(PROBLEM_OPTIONS[0]);
  const [wantsDiscount, setWantsDiscount] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      aria-label="SafeDraft survey"
      className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 sm:p-6"
      style={{ borderRadius: 6 }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">Survey</p>
          <h3 className="mt-2 text-[24px]">Co najbardziej przeszkadzało w draftcie?</h3>
          <p className="mt-3 max-w-[620px] text-[14px] leading-[1.65] text-[#525252]">
            Odpowiedź zostaje lokalnie w stanie formularza. Ten public v0 nie odpala CRM, maila ani automatyzacji.
          </p>
        </div>
        <div className="bg-white px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#737373]">
          Discount CTA
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {PROBLEM_OPTIONS.map((option) => (
          <label
            key={option}
            className="flex min-h-12 cursor-pointer items-center gap-3 border border-[#E5E5E5] bg-white px-4 py-3 text-[14px] text-[#171717]"
            style={{ borderRadius: 6 }}
          >
            <input
              type="radio"
              name="safedraft-survey-problem"
              value={option}
              checked={selectedProblem === option}
              onChange={(event) => setSelectedProblem(event.currentTarget.value)}
              className="h-4 w-4 accent-[#B87333]"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 border-t border-[#E5E5E5] pt-5">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.6] text-[#404040]">
          <input
            type="checkbox"
            checked={wantsDiscount}
            onChange={(event) => setWantsDiscount(event.currentTarget.checked)}
            className="mt-1 h-4 w-4 accent-[#B87333]"
          />
          <span>Chcę rabat na wdrożenie SafeDraft po testach public v0.</span>
        </label>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 bg-[#0A0A0A] px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#B87333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2"
          style={{ borderRadius: 4 }}
        >
          <BadgeCheck aria-hidden="true" size={17} />
          Zapisz odpowiedź
        </button>
        {submitted && (
          <p className="mt-3 text-[13px] leading-[1.6] text-[#525252]" role="status">
            Zapisane lokalnie: {selectedProblem}.{" "}
            {wantsDiscount && !marketingConsent
              ? "Rabat zaznaczony, ale bez zgody marketingowej nie uruchamiam follow-upu."
              : "Bez zewnętrznych wysyłek i bez automatyzacji."}
          </p>
        )}
      </div>
    </section>
  );
}
