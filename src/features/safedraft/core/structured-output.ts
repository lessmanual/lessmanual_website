import type { SafeDraftInternalStatus, SafeDraftPublicStatus } from "./status";

export type SafeDraftRiskFlag = {
  category: "tone" | "fact_change" | "claim" | "privacy" | "safety" | "scope";
  severity: "info" | "review" | "block";
  message: string;
};

export type StructuredModelOutput = {
  rewritten_text: string;
  public_status: SafeDraftPublicStatus;
  internal_status: SafeDraftInternalStatus;
  confidence: number;
  removed_ai_tells: string[];
  manual_review_reasons: string[];
  unchanged_facts: string[];
  risk_flags: SafeDraftRiskFlag[];
  one_sentence_summary: string;
};

type StructuredOutputFailureReason = "invalid_json" | "invalid_shape" | "invalid_enum" | "empty_rewrite";

export type StructuredOutputParseResult =
  | {
      ok: true;
      value: StructuredModelOutput;
      internal_status: SafeDraftInternalStatus;
      reason?: undefined;
    }
  | {
      ok: false;
      internal_status: "BLOCKED_SAFETY";
      reason: StructuredOutputFailureReason;
      value?: undefined;
    };

export function parseStructuredModelOutput(rawOutput: string): StructuredOutputParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawOutput);
  } catch {
    return failClosed("invalid_json");
  }

  if (!isRecord(parsed)) {
    return failClosed("invalid_shape");
  }

  const rewrittenText = readString(parsed, "rewritten_text");
  const publicStatus = readString(parsed, "public_status");
  const internalStatus = readString(parsed, "internal_status");
  const confidence = parsed.confidence;
  const removedAiTells = readStringArray(parsed, "removed_ai_tells");
  const manualReviewReasons = readStringArray(parsed, "manual_review_reasons");
  const unchangedFacts = readStringArray(parsed, "unchanged_facts");
  const oneSentenceSummary = readString(parsed, "one_sentence_summary");

  if (
    rewrittenText === undefined ||
    removedAiTells === undefined ||
    manualReviewReasons === undefined ||
    unchangedFacts === undefined ||
    typeof confidence !== "number" ||
    !Number.isFinite(confidence) ||
    oneSentenceSummary === undefined
  ) {
    return failClosed("invalid_shape");
  }

  if (!isPublicStatus(publicStatus) || !isInternalStatus(internalStatus)) {
    return failClosed("invalid_enum");
  }

  if (rewrittenText.trim().length === 0 && internalStatus !== "BLOCKED_SAFETY") {
    return failClosed("empty_rewrite");
  }

  const riskFlags = parseRiskFlags(parsed.risk_flags);
  if (riskFlags === undefined) {
    return failClosed("invalid_shape");
  }

  return {
    ok: true,
    internal_status: internalStatus,
    value: {
      rewritten_text: rewrittenText,
      public_status: publicStatus,
      internal_status: internalStatus,
      confidence,
      removed_ai_tells: removedAiTells,
      manual_review_reasons: manualReviewReasons,
      unchanged_facts: unchangedFacts,
      risk_flags: riskFlags,
      one_sentence_summary: oneSentenceSummary,
    },
  };
}

function failClosed(reason: StructuredOutputFailureReason): StructuredOutputParseResult {
  return {
    ok: false,
    internal_status: "BLOCKED_SAFETY",
    reason,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function readStringArray(record: Record<string, unknown>, key: string): string[] | undefined {
  const value = record[key];
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    return undefined;
  }
  return value;
}

function parseRiskFlags(value: unknown): SafeDraftRiskFlag[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const flags: SafeDraftRiskFlag[] = [];
  for (const item of value) {
    if (!isRecord(item)) {
      return undefined;
    }
    const category = readString(item, "category");
    const severity = readString(item, "severity");
    const message = readString(item, "message");
    if (!isRiskCategory(category) || !isRiskSeverity(severity) || message === undefined) {
      return undefined;
    }
    flags.push({ category, severity, message });
  }
  return flags;
}

function isPublicStatus(value: string | undefined): value is SafeDraftPublicStatus {
  switch (value) {
    case "Gotowe do wysłania":
    case "Wymaga ręcznego review":
    case "Zatrzymane ze względów bezpieczeństwa":
      return true;
    default:
      return false;
  }
}

function isInternalStatus(value: string | undefined): value is SafeDraftInternalStatus {
  switch (value) {
    case "READY_TO_SEND":
    case "NEEDS_REVIEW":
    case "BLOCKED_SAFETY":
      return true;
    default:
      return false;
  }
}

function isRiskCategory(value: string | undefined): value is SafeDraftRiskFlag["category"] {
  switch (value) {
    case "tone":
    case "fact_change":
    case "claim":
    case "privacy":
    case "safety":
    case "scope":
      return true;
    default:
      return false;
  }
}

function isRiskSeverity(value: string | undefined): value is SafeDraftRiskFlag["severity"] {
  switch (value) {
    case "info":
    case "review":
    case "block":
      return true;
    default:
      return false;
  }
}
