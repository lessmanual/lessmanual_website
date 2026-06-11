export type SafeDraftBotGuardReason = "honeypot_filled";

export type SafeDraftBotGuardResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      reason: SafeDraftBotGuardReason;
    };

export type SafeDraftBotGuardPort = {
  check(input: unknown): SafeDraftBotGuardResult;
};

const DEFAULT_HONEYPOT_FIELDS = ["website", "homepage", "company_website", "safedraft_honeypot"];

export function createSafeDraftBotGuard(honeypotFields: string[] = DEFAULT_HONEYPOT_FIELDS): SafeDraftBotGuardPort {
  return {
    check(input) {
      return runSafeDraftBotGuard(input, honeypotFields);
    },
  };
}

export function runSafeDraftBotGuard(input: unknown, honeypotFields: string[] = DEFAULT_HONEYPOT_FIELDS): SafeDraftBotGuardResult {
  if (!isRecord(input)) {
    return { ok: true };
  }

  for (const field of honeypotFields) {
    const value = input[field];
    if (typeof value === "string" && value.trim().length > 0) {
      return { ok: false, reason: "honeypot_filled" };
    }
  }

  return { ok: true };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
