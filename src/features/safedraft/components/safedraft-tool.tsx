"use client";

import { FormEvent, type ReactNode, useMemo, useState } from "react";
import { Loader2, Send, ShieldCheck } from "lucide-react";

import type { SafeDraftChannel, SafeDraftTone } from "../core/input-schema";
import type { SafeDraftPublicStatus } from "../core/status";
import { SafeDraftResult, type SafeDraftDisplayResult } from "./safedraft-result";
import { SafeDraftSurvey } from "./safedraft-survey";

const CONSENT_VERSION = "safedraft-public-v0-2026-06-11";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DRAFT_LENGTH = 40;

const TONE_OPTIONS: { value: SafeDraftTone; label: string; description: string }[] = [
  {
    value: "direct_founder",
    label: "Founder direct",
    description: "Krótko, konkretnie, bez ozdobników.",
  },
  {
    value: "calm_advisor",
    label: "Spokojny doradca",
    description: "Miękko, rzeczowo, z większą empatią.",
  },
  {
    value: "c_level_brief",
    label: "C-level brief",
    description: "Zwięźle dla decydenta.",
  },
];

const CHANNEL_OPTIONS: { value: SafeDraftChannel; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "linkedin_dm", label: "LinkedIn DM" },
  { value: "follow_up", label: "Follow-up" },
  { value: "price_objection", label: "Obiekcja cenowa" },
  { value: "other", label: "Inne" },
];

type FormErrors = {
  draftText?: string;
  email?: string;
  privacyTerms?: string;
  processingConsent?: string;
};

type RewriteState =
  | { name: "idle"; result?: undefined; message?: undefined }
  | { name: "loading"; result?: undefined; message?: undefined }
  | { name: "result"; result: SafeDraftDisplayResult; message?: undefined }
  | { name: "error"; message: string; result?: undefined };

type ParsedApiOutcome =
  | { name: "result"; result: SafeDraftDisplayResult }
  | { name: "error"; message: string };

export function SafeDraftTool() {
  const [draftText, setDraftText] = useState("");
  const [email, setEmail] = useState("");
  const [privacyTermsAccepted, setPrivacyTermsAccepted] = useState(false);
  const [processingConsentAccepted, setProcessingConsentAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [tone, setTone] = useState<SafeDraftTone>("direct_founder");
  const [channel, setChannel] = useState<SafeDraftChannel>("email");
  const [errors, setErrors] = useState<FormErrors>({});
  const [rewriteState, setRewriteState] = useState<RewriteState>({ name: "idle" });

  const draftCountLabel = useMemo(() => `${draftText.trim().length}/4000`, [draftText]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm({
      draftText,
      email,
      privacyTermsAccepted,
      processingConsentAccepted,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setRewriteState({ name: "idle" });
      return;
    }

    setRewriteState({ name: "loading" });

    try {
      const response = await fetch("/api/safedraft/rewrite", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          draft_text: draftText,
          email,
          privacy_terms_accepted: privacyTermsAccepted,
          processing_consent_accepted: processingConsentAccepted,
          marketing_consent: marketingConsent,
          consent_version: CONSENT_VERSION,
          tone,
          channel,
        }),
      });
      const body: unknown = await response.json();
      const parsed = parseRewriteResponse(body);

      if (parsed.name === "result") {
        setRewriteState({ name: "result", result: parsed.result });
        return;
      }

      setRewriteState({ name: "error", message: parsed.message });
    } catch {
      setRewriteState({
        name: "error",
        message: "Nie udało się połączyć z lokalnym adapterem fake.",
      });
    }
  }

  return (
    <div className="grid gap-6 py-0 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]">
      <form
        aria-label="SafeDraft tool"
        noValidate
        onSubmit={handleSubmit}
        className="border border-[#E5E5E5] bg-white p-5 shadow-[0_18px_50px_rgba(10,10,10,0.05)] sm:p-6"
        style={{ borderRadius: 6 }}
      >
        <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-5">
          <div className="flex items-center gap-2 text-[13px] text-[#525252]">
            <ShieldCheck aria-hidden="true" size={17} className="text-[#8B4513]" />
            <span>Fake route lokalnie. Produkcja disabled.</span>
          </div>
          <h2 className="text-[28px]">Popraw draft</h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="safedraft-draft" className="text-[14px] font-medium text-[#171717]">
              Draft do poprawy
            </label>
            <span className="font-mono text-[11px] text-[#737373]">{draftCountLabel}</span>
          </div>
          <textarea
            id="safedraft-draft"
            value={draftText}
            onChange={(event) => setDraftText(event.currentTarget.value)}
            aria-invalid={Boolean(errors.draftText)}
            aria-describedby={errors.draftText ? "safedraft-draft-error" : undefined}
            rows={8}
            className="mt-2 min-h-40 w-full resize-y border border-[#D4D4D4] bg-[#FAFAFA] px-4 py-3 text-[15px] leading-[1.6] text-[#171717] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#B87333] focus:bg-white"
            style={{ borderRadius: 6 }}
            placeholder="Wklej wiadomość B2B, którą chcesz dopracować przed wysyłką."
          />
          {errors.draftText && (
            <p id="safedraft-draft-error" className="mt-2 text-[13px] text-[#B42318]">
              {errors.draftText}
            </p>
          )}
        </div>

        <div className="mt-5">
          <div>
            <label htmlFor="safedraft-email" className="text-[14px] font-medium text-[#171717]">
              Email
            </label>
            <input
              id="safedraft-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "safedraft-email-error" : undefined}
              className="mt-2 min-h-11 w-full border border-[#D4D4D4] bg-[#FAFAFA] px-4 text-[15px] text-[#171717] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#B87333] focus:bg-white"
              style={{ borderRadius: 6 }}
              placeholder="bartek@firma.pl"
            />
            {errors.email && (
              <p id="safedraft-email-error" className="mt-2 text-[13px] text-[#B42318]">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-3 border-t border-[#E5E5E5] pt-5">
          <ConsentCheckbox
            checked={privacyTermsAccepted}
            onChange={setPrivacyTermsAccepted}
            label={
              <>
                Akceptuję{" "}
                <a className="text-[#8A4F1D] underline" href="/legal/regulamin" rel="noreferrer" target="_blank">
                  regulamin
                </a>{" "}
                i{" "}
                <a
                  className="text-[#8A4F1D] underline"
                  href="/legal/polityka-prywatnosci"
                  rel="noreferrer"
                  target="_blank"
                >
                  politykę prywatności
                </a>
              </>
            }
            error={errors.privacyTerms}
            errorId="safedraft-privacy-error"
          />
          <ConsentCheckbox
            checked={processingConsentAccepted}
            onChange={setProcessingConsentAccepted}
            label="Zgadzam się na przetworzenie draftu w SafeDraft public v0"
            description="Draft trafia do modelu AI w celu przeredagowania. Nie zapisujemy surowego draftu ani surowej odpowiedzi w telemetrii SafeDraft."
            error={errors.processingConsent}
            errorId="safedraft-processing-error"
          />
          <ConsentCheckbox
            checked={marketingConsent}
            onChange={setMarketingConsent}
            label="Chcę dostać follow-up marketingowy"
            description="Opcjonalne. Domyślnie wyłączone."
          />
        </div>

        <fieldset className="mt-5">
          <legend className="text-[14px] font-medium text-[#171717]">Ton</legend>
          <div className="mt-2 grid gap-3 md:grid-cols-3">
            {TONE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex min-h-[104px] cursor-pointer flex-col justify-between border border-[#D4D4D4] bg-[#FAFAFA] p-4 text-[#171717] transition-colors has-[:checked]:border-[#B87333] has-[:checked]:bg-[#FFF8F1]"
                style={{ borderRadius: 6 }}
              >
                <span className="flex items-center gap-2 text-[14px] font-medium">
                  <input
                    type="radio"
                    name="safedraft-tone"
                    value={option.value}
                    checked={tone === option.value}
                    onChange={() => setTone(option.value)}
                    className="h-4 w-4 accent-[#B87333]"
                  />
                  {option.label}
                </span>
                <span className="mt-3 text-[12px] leading-[1.5] text-[#525252]">{option.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5">
          <label htmlFor="safedraft-channel" className="text-[14px] font-medium text-[#171717]">
            Kanał
          </label>
          <select
            id="safedraft-channel"
            value={channel}
            onChange={(event) => setChannel(readChannel(event.currentTarget.value))}
            className="mt-2 min-h-11 w-full border border-[#D4D4D4] bg-[#FAFAFA] px-4 text-[15px] text-[#171717] outline-none transition-colors focus:border-[#B87333] focus:bg-white"
            style={{ borderRadius: 6 }}
          >
            {CHANNEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={rewriteState.name === "loading"}
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#0A0A0A] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#B87333] disabled:cursor-not-allowed disabled:bg-[#737373] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87333] focus-visible:ring-offset-2"
            style={{ borderRadius: 4 }}
          >
            {rewriteState.name === "loading" ? (
              <Loader2 aria-hidden="true" size={18} className="animate-spin" />
            ) : (
              <Send aria-hidden="true" size={18} />
            )}
            {rewriteState.name === "loading" ? "Przerabiam draft..." : "Przerób draft"}
          </button>
          <p className="text-[12px] leading-[1.5] text-[#737373]">Nie wysyłamy maila. Nie zapisujemy raw draftu.</p>
        </div>

        <div className="mt-4 min-h-6" aria-live="polite">
          {rewriteState.name === "loading" && (
            <p className="text-[13px] text-[#525252]">Łączę się z lokalnym fake adapterem.</p>
          )}
          {rewriteState.name === "error" && <p className="text-[13px] text-[#B42318]">{rewriteState.message}</p>}
        </div>
      </form>

      <aside className="flex flex-col gap-5">
        {rewriteState.name === "result" ? (
          <>
            <SafeDraftResult result={rewriteState.result} />
            <SafeDraftSurvey marketingConsent={marketingConsent} />
          </>
        ) : (
          <div
            className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 text-[14px] leading-[1.65] text-[#525252] sm:p-6"
            style={{ borderRadius: 6 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B4513]">Preview</p>
            <h3 className="mt-2 text-[24px]">Wynik pojawi się tutaj</h3>
            <p className="mt-3">
              Po submit zobaczysz poprawioną wersję, publiczny status i krótką ankietę. Survey jest ukryty do momentu
              wyniku.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  label,
  description,
  error,
  errorId,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  description?: string;
  error?: string;
  errorId?: string;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.6] text-[#404040]">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.currentTarget.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error && errorId ? errorId : undefined}
          className="mt-1 h-4 w-4 accent-[#B87333]"
        />
        <span>
          {label}
          {description && <span className="block text-[12px] text-[#737373]">{description}</span>}
        </span>
      </label>
      {error && errorId && (
        <p id={errorId} className="mt-1 pl-7 text-[13px] text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}

function validateForm({
  draftText,
  email,
  privacyTermsAccepted,
  processingConsentAccepted,
}: {
  draftText: string;
  email: string;
  privacyTermsAccepted: boolean;
  processingConsentAccepted: boolean;
}): FormErrors {
  const nextErrors: FormErrors = {};
  const trimmedDraft = draftText.trim();
  const trimmedEmail = email.trim();

  if (trimmedDraft.length < MIN_DRAFT_LENGTH) {
    nextErrors.draftText = "Wklej minimum 40 znaków draftu";
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    nextErrors.email = "Podaj poprawny email";
  }

  if (!privacyTermsAccepted) {
    nextErrors.privacyTerms = "Zaakceptuj regulamin i politykę prywatności";
  }

  if (!processingConsentAccepted) {
    nextErrors.processingConsent = "Zgoda na przetworzenie draftu jest wymagana";
  }

  return nextErrors;
}

function readChannel(value: string): SafeDraftChannel {
  if (value === "linkedin_dm" || value === "follow_up" || value === "price_objection" || value === "other") {
    return value;
  }
  return "email";
}

function parseRewriteResponse(input: unknown): ParsedApiOutcome {
  if (!isRecord(input)) {
    return { name: "error", message: "Route zwróciła niepoprawną odpowiedź." };
  }

  if (input.ok === true) {
    const result = parseResult(input.result);
    if (result) {
      return { name: "result", result };
    }
    return { name: "error", message: "Model zwrócił wynik w niepoprawnym formacie." };
  }

  const publicStatus = readString(input, "public_status");
  const errorCode = readString(input, "error");
  if (errorCode === "blocked_safety" && isPublicStatus(publicStatus)) {
    return {
      name: "result",
      result: {
        publicStatus,
        rewrittenText: "",
        oneSentenceSummary: "SafeDraft zatrzymał draft przed wywołaniem modelu.",
        manualReviewReasons: ["Wejście wymaga ręcznego sprawdzenia przed dalszą pracą."],
        riskMessages: readFindingMessages(input.findings),
      },
    };
  }

  if (errorCode === "validation_failed") {
    return { name: "error", message: "Sprawdź pola formularza i zgody." };
  }

  return { name: "error", message: "SafeDraft zatrzymał request." };
}

function parseResult(input: unknown): SafeDraftDisplayResult | undefined {
  if (!isRecord(input)) {
    return undefined;
  }

  const publicStatus = readString(input, "public_status");
  const rewrittenText = readString(input, "rewritten_text");
  const oneSentenceSummary = readString(input, "one_sentence_summary");
  const manualReviewReasons = readStringArray(input, "manual_review_reasons");
  const riskMessages = readRiskMessages(input.risk_flags);

  if (
    !isPublicStatus(publicStatus) ||
    rewrittenText === undefined ||
    oneSentenceSummary === undefined ||
    manualReviewReasons === undefined ||
    riskMessages === undefined
  ) {
    return undefined;
  }

  return {
    publicStatus,
    rewrittenText,
    oneSentenceSummary,
    manualReviewReasons,
    riskMessages,
  };
}

function readRiskMessages(input: unknown): string[] | undefined {
  if (!Array.isArray(input)) {
    return undefined;
  }

  const messages: string[] = [];
  for (const item of input) {
    if (!isRecord(item)) {
      return undefined;
    }
    const message = readString(item, "message");
    if (message === undefined) {
      return undefined;
    }
    messages.push(message);
  }
  return messages;
}

function readFindingMessages(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  const messages: string[] = [];
  for (const item of input) {
    if (isRecord(item)) {
      const message = readString(item, "message");
      if (message) {
        messages.push(message);
      }
    }
  }
  return messages;
}

function readStringArray(record: Record<string, unknown>, key: string): string[] | undefined {
  const value = record[key];
  if (!Array.isArray(value)) {
    return undefined;
  }

  const strings: string[] = [];
  for (const item of value) {
    if (typeof item !== "string") {
      return undefined;
    }
    strings.push(item);
  }
  return strings;
}

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPublicStatus(value: string | undefined): value is SafeDraftPublicStatus {
  return (
    value === "Gotowe do wysłania" ||
    value === "Wymaga ręcznego review" ||
    value === "Zatrzymane ze względów bezpieczeństwa"
  );
}
