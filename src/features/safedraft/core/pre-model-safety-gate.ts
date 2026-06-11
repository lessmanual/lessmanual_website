import { publicStatusForInternalStatus, type SafeDraftInternalStatus, type SafeDraftPublicStatus } from "./status";

export type PreModelFindingSeverity = "review" | "block";

export type PreModelFinding = {
  category: "secret" | "prompt_injection" | "sensitive_advice" | "unsupported_request" | "malicious_payload" | "length";
  severity: PreModelFindingSeverity;
  message: string;
};

export type PreModelSafetyGateResult = {
  allow_model_call: boolean;
  internal_status: SafeDraftInternalStatus;
  public_status: SafeDraftPublicStatus;
  findings: PreModelFinding[];
};

const MAX_DRAFT_LENGTH = 4000;

const SECRET_PATTERNS = [
  /sk-[A-Za-z0-9_-]{20,}/i,
  /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,
  /aws_secret_access_key\s*[:=]\s*[^\s]+/i,
  /api[_ -]?key\s*[:=]\s*[^\s]+/i,
  /authorization\s*[:=]\s*bearer\s+[A-Za-z0-9._-]+/i,
  /bearer\s+[A-Za-z0-9._-]{20,}/i,
  /password\s*[:=]\s*[^\s]+/i,
  /token\s*[:=]\s*[^\s]+/i,
  /-----BEGIN (?:RSA |OPENSSH |EC |)PRIVATE KEY-----/i,
];

const PROMPT_INJECTION_PATTERNS = [
  /ignore previous instructions/i,
  /zignoruj poprzednie instrukcje/i,
  /system prompt/i,
  /ujawnij prompt/i,
  /reveal your prompt/i,
  /developer message/i,
  /dzia[lł]aj jako system/i,
];

const SENSITIVE_ADVICE_PATTERNS = [
  /porad[ay]\s+(?:prawn|medyczn|finansow)/i,
  /legalnie bezpieczne/i,
  /diagnoz[ay]\s+medyczn/i,
  /rekomendacj[ae]\s+inwestycyjn/i,
  /\bpesel\b/i,
  /\bdane medyczne\b/i,
  /\bdane finansowe\b/i,
];

const UNSUPPORTED_REQUEST_PATTERNS = [
  /\bprzepis(?:u)?\b.*\b(?:pizz|makaron|ciast|zup|obiad|kolacj)/i,
  /\b(?:pogoda|temperatura|opady)\b/i,
  /\b(?:plan treningowy|trening|dieta|kalorie)\b/i,
  /\b(?:napisz|wygeneruj|stw[oó]rz)\b.*\b(?:kod|python|javascript|skrypt)\b/i,
  /\b(?:pole[cć]|rekomenduj)\b.*\b(?:film|serial|ksi[aą][zż]k|muzyk|gra)\b/i,
];

const MALICIOUS_PAYLOAD_PATTERNS = [/<script[\s>]/i, /javascript:/i, /onerror\s*=/i, /onload\s*=/i];

export function runPreModelSafetyGate(draftText: string): PreModelSafetyGateResult {
  const findings: PreModelFinding[] = [];

  if (draftText.length > MAX_DRAFT_LENGTH) {
    findings.push({
      category: "length",
      severity: "block",
      message: "Draft is too long for SafeDraft public v0.",
    });
  }

  collectFindings(findings, draftText, SECRET_PATTERNS, "secret", "Input contains a likely secret.");
  collectFindings(
    findings,
    draftText,
    PROMPT_INJECTION_PATTERNS,
    "prompt_injection",
    "Input contains prompt injection instructions."
  );
  collectFindings(
    findings,
    draftText,
    SENSITIVE_ADVICE_PATTERNS,
    "sensitive_advice",
    "Input asks for sensitive or regulated advice."
  );
  collectFindings(
    findings,
    draftText,
    UNSUPPORTED_REQUEST_PATTERNS,
    "unsupported_request",
    "Input is outside SafeDraft B2B communication scope."
  );
  collectFindings(
    findings,
    draftText,
    MALICIOUS_PAYLOAD_PATTERNS,
    "malicious_payload",
    "Input contains HTML or script-like payload."
  );

  if (findings.some((finding) => finding.severity === "block")) {
    return {
      allow_model_call: false,
      internal_status: "BLOCKED_SAFETY",
      public_status: publicStatusForInternalStatus("BLOCKED_SAFETY"),
      findings,
    };
  }

  return {
    allow_model_call: true,
    internal_status: "NEEDS_REVIEW",
    public_status: publicStatusForInternalStatus("NEEDS_REVIEW"),
    findings,
  };
}

function collectFindings(
  findings: PreModelFinding[],
  draftText: string,
  patterns: RegExp[],
  category: PreModelFinding["category"],
  message: string
): void {
  if (patterns.some((pattern) => pattern.test(draftText))) {
    findings.push({ category, severity: "block", message });
  }
}
