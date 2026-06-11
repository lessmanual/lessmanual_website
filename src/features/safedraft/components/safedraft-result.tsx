import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

import type { SafeDraftPublicStatus } from "../core/status";

export type SafeDraftDisplayResult = {
  publicStatus: SafeDraftPublicStatus;
  rewrittenText: string;
  oneSentenceSummary: string;
  manualReviewReasons: string[];
  riskMessages: string[];
};

type SafeDraftResultProps = {
  result: SafeDraftDisplayResult;
};

export function SafeDraftResult({ result }: SafeDraftResultProps) {
  const statusStyle = statusPresentation(result.publicStatus);
  const Icon = statusStyle.Icon;
  const hasRewrittenText = result.rewrittenText.trim().length > 0;

  return (
    <section
      aria-label="SafeDraft result"
      className="border border-[#E5E5E5] bg-white p-5 shadow-[0_18px_50px_rgba(10,10,10,0.05)] sm:p-6"
      style={{ borderRadius: 6 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">Status</p>
          <div className={`mt-2 inline-flex items-center gap-2 px-3 py-2 text-[13px] font-medium ${statusStyle.className}`}>
            <Icon aria-hidden="true" size={16} />
            <span>{result.publicStatus}</span>
          </div>
        </div>
        <p className="max-w-[420px] text-[13px] leading-[1.6] text-[#525252]">{result.oneSentenceSummary}</p>
      </div>

      <div className="mt-6 border-t border-[#E5E5E5] pt-5">
        <h3 className="text-[22px]">Poprawiona wersja</h3>
        {hasRewrittenText ? (
          <p className="mt-4 whitespace-pre-wrap text-[15px] leading-[1.75] text-[#171717]">{result.rewrittenText}</p>
        ) : (
          <p className="mt-4 text-[15px] leading-[1.7] text-[#525252]">
            Nie pokazujemy przerobionej wersji, bo wejście zostało zatrzymane przed modelem.
          </p>
        )}
      </div>

      {result.manualReviewReasons.length > 0 && (
        <div className="mt-5 border-t border-[#E5E5E5] pt-5">
          <h4 className="text-[15px] font-semibold text-[#171717]">Dlaczego review?</h4>
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.6] text-[#525252]">
            {result.manualReviewReasons.map((reason) => (
              <li key={reason}>• {reason}</li>
            ))}
          </ul>
        </div>
      )}

      {result.riskMessages.length > 0 && (
        <div className="mt-5 border-t border-[#E5E5E5] pt-5">
          <h4 className="text-[15px] font-semibold text-[#171717]">Sygnały bezpieczeństwa</h4>
          <ul className="mt-3 space-y-2 text-[14px] leading-[1.6] text-[#525252]">
            {result.riskMessages.map((message) => (
              <li key={message}>• {message}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function statusPresentation(status: SafeDraftPublicStatus): {
  Icon: typeof CheckCircle2;
  className: string;
} {
  if (status === "Gotowe do wysłania") {
    return {
      Icon: CheckCircle2,
      className: "bg-[#ECFDF3] text-[#166534]",
    };
  }

  if (status === "Zatrzymane ze względów bezpieczeństwa") {
    return {
      Icon: ShieldAlert,
      className: "bg-[#FEF2F2] text-[#991B1B]",
    };
  }

  return {
    Icon: AlertTriangle,
    className: "bg-[#FFFBEB] text-[#92400E]",
  };
}
