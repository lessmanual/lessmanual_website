"use client";

import { useCompletion } from "@ai-sdk/react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const LS_KEY = "lm_email_gen_count";
const WINDOW_MS = 24 * 60 * 60 * 1000;
const DAILY_LIMIT = 3;

function loadLocalTimestamps(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    return parsed
      .filter((v): v is number => typeof v === "number")
      .filter((ts) => now - ts < WINDOW_MS);
  } catch {
    return [];
  }
}

function saveLocalTimestamps(timestamps: number[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(timestamps));
  } catch {
    // localStorage may be blocked in private mode
  }
}

interface ParsedEmail {
  subject: string;
  body: string;
}

function parseCompletion(raw: string): ParsedEmail {
  if (raw.includes("---")) {
    const parts = raw.split("---");
    const subjectLine = (parts[0] ?? "").trim();
    const body = (parts[1] ?? "").trim();
    const subject = subjectLine.replace(/^Subject:\s*/i, "").trim();
    return { subject, body };
  }

  const subjectMatch = raw.match(/Subject:\s*(.+?)(?:\n|$)/i);
  if (subjectMatch) {
    const subject = (subjectMatch[1] ?? "").trim();
    const afterSubject = raw.slice((subjectMatch.index ?? 0) + subjectMatch[0].length).trim();
    return { subject, body: afterSubject };
  }

  return { subject: "", body: raw };
}

export function LiveEmailGenerator() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  const [industry, setIndustry] = useState("");
  const [icp, setIcp] = useState("");
  const [copied, setCopied] = useState(false);
  const [localLimitHit, setLocalLimitHit] = useState(false);
  const [formError, setFormError] = useState("");
  const [localTimestamps, setLocalTimestamps] = useState<number[]>([]);

  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/generate-email",
    streamProtocol: "text",
  });

  // Load localStorage on mount
  useEffect(() => {
    const timestamps = loadLocalTimestamps();
    setLocalTimestamps(timestamps);
    if (timestamps.length >= DAILY_LIMIT) {
      setLocalLimitHit(true);
    }
  }, []);

  const handleSubmit = async () => {
    setFormError("");

    if (!industry.trim() || !icp.trim()) {
      setFormError("Wypełnij oba pola przed wygenerowaniem.");
      return;
    }

    if (industry.trim().length > 100 || icp.trim().length > 100) {
      setFormError("Każde pole może mieć maks. 100 znaków.");
      return;
    }

    if (localLimitHit) {
      return;
    }

    // Optimistically record usage in localStorage
    const now = Date.now();
    const updated = [...localTimestamps, now];
    setLocalTimestamps(updated);
    saveLocalTimestamps(updated);
    if (updated.length >= DAILY_LIMIT) {
      setLocalLimitHit(true);
    }

    await complete("", {
      body: { industry: industry.trim(), icp: icp.trim() },
    });
  };

  const handleCopy = async () => {
    if (!completion) return;
    try {
      await navigator.clipboard.writeText(completion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API may be blocked
    }
  };

  const isButtonDisabled =
    isLoading || localLimitHit || !industry.trim() || !icp.trim();

  const showOutput = completion.length > 0;
  const parsed = showOutput ? parseCompletion(completion) : null;

  const errorMessage =
    error != null ? "Agent chwilowo niedostępny, spróbuj później." : null;

  return (
    <motion.section
      ref={sectionRef}
      className="v2-scope border-y border-[#E5E5E5] bg-[#FAFAFA] py-[80px] md:py-[120px]"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={reducedMotion || inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-4">
            ZOBACZ AGENTA W AKCJI
          </div>
          <h2 className="font-semibold text-[32px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
            Wygeneruj cold email dla TWOJEJ branży.
          </h2>
          <p className="mt-4 text-[#525252] max-w-[640px] text-[17px] leading-[1.55]">
            Agent wygeneruje cold email dla Twojego ICP w 3-6 sekund. Zobacz, jak to działa na realnym przykładzie.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* LEFT: Form */}
          <div className="flex flex-col gap-6">
            {/* Branża */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lm-industry"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]"
              >
                BRANŻA
              </label>
              <input
                id="lm-industry"
                type="text"
                maxLength={100}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="np. SaaS B2B, agencja e-commerce, kancelaria prawna"
                className="w-full border border-[#E5E5E5] bg-white px-4 py-3 rounded-[4px] text-[15px] text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:border-[#B87333] transition-colors"
              />
            </div>

            {/* ICP */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lm-icp"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]"
              >
                ICP (komu sprzedajesz)
              </label>
              <input
                id="lm-icp"
                type="text"
                maxLength={100}
                value={icp}
                onChange={(e) => setIcp(e.target.value)}
                placeholder="np. CTO SaaS, dyrektor marketingu, właściciel kancelarii"
                className="w-full border border-[#E5E5E5] bg-white px-4 py-3 rounded-[4px] text-[15px] text-[#0A0A0A] placeholder-[#737373] focus:outline-none focus:border-[#B87333] transition-colors"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              aria-busy={isLoading}
              className={`bg-[#0A0A0A] text-white rounded-[4px] px-6 py-3 text-sm font-medium transition-colors ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#B87333]"
              }`}
            >
              {isLoading ? "Generuję..." : "Wygeneruj cold email"}
            </button>

            {/* Meta info */}
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#737373]">
              Claude Sonnet · ~3-6 sekund · maks. 3 generacje / 24h
            </p>

            {/* Error states */}
            <AnimatePresence>
              {localLimitHit && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[14px] text-[#8B4513]"
                >
                  Limit 3 generacji na dobę osiągnięty. Spróbuj jutro.
                </motion.p>
              )}
              {formError && !localLimitHit && (
                <motion.p
                  key="formError"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[14px] text-[#8B4513]"
                >
                  {formError}
                </motion.p>
              )}
              {errorMessage && (
                <motion.p
                  key="apiError"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[14px] text-[#525252]"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Output */}
          <div className="border border-[#E5E5E5] bg-white rounded-[4px] p-6 min-h-[400px] flex flex-col">
            {/* Output header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#737373]">
                WYGENEROWANY EMAIL
              </span>
              {showOutput && !isLoading && (
                <span className="font-mono text-[10px] text-[#737373]">
                  Claude Sonnet
                </span>
              )}
            </div>

            {/* Output body */}
            <div
              className="flex-1 font-mono text-[13px] leading-[1.7]"
              role="status"
              aria-live="polite"
              aria-busy={isLoading}
            >
              <span className="sr-only">
                {isLoading
                  ? "Generowanie cold emaila trwa, proszę czekać."
                  : showOutput
                    ? "Cold email wygenerowany."
                    : ""}
              </span>
              {isLoading && !showOutput && (
                <div className="flex items-center gap-3 text-[#737373]">
                  {/* Spinner */}
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="#E5E5E5"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 2a6 6 0 0 1 6 6"
                      stroke="#B87333"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Agent pisze...</span>
                </div>
              )}

              {showOutput && parsed && (
                <div className="flex flex-col gap-4">
                  {/* Subject */}
                  {parsed.subject && (
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#737373]">
                        SUBJECT
                      </span>
                      <p className="font-semibold text-[#0A0A0A] mt-1">
                        {parsed.subject}
                        {isLoading && (
                          <span className="animate-pulse text-[#B87333]">
                            {"\u258A"}
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Separator */}
                  {parsed.subject && parsed.body && (
                    <div className="border-t border-[#E5E5E5]" />
                  )}

                  {/* Body */}
                  {parsed.body && (
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#737373]">
                        TREŚĆ
                      </span>
                      <p className="text-[#0A0A0A] mt-1 whitespace-pre-wrap text-[13px] leading-[1.7]">
                        {parsed.body}
                        {isLoading && !parsed.subject && (
                          <span className="animate-pulse text-[#B87333]">
                            {"\u258A"}
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!isLoading && !showOutput && !errorMessage && !localLimitHit && (
                <p className="text-[#737373] text-[13px]">
                  Wypełnij formularz po lewej. Email pojawi się tutaj.
                </p>
              )}
              {!isLoading && !showOutput && !errorMessage && localLimitHit && (
                <p className="text-[#8B4513] text-[13px]">
                  Dzienny limit 3 generacji osiągnięty. Spróbuj jutro lub napisz na kontakt@lessmanual.ai.
                </p>
              )}
            </div>

            {/* Copy button */}
            {!isLoading && showOutput && completion.length > 10 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#737373] hover:text-[#8B4513] transition-colors"
                >
                  {copied ? "Skopiowano" : "Skopiuj"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
