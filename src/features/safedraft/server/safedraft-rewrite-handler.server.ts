import { createHash, randomUUID } from "node:crypto";

import { createSafeDraftBotGuard, type SafeDraftBotGuardPort } from "../core/bot-guard";
import type { SafeDraftCostCapPort } from "../core/cost-cap";
import { parseSafeDraftSubmission, type SafeDraftSubmission } from "../core/input-schema";
import {
  buildSafeDraftLeadCaptureRecord,
  type SafeDraftLeadCapturePort,
} from "../core/lead-capture-port";
import {
  buildSafeDraftMetadataRecord,
  type SafeDraftHashText,
  type SafeDraftMetadataRecord,
  type SafeDraftMetadataRecordResult,
  type SafeDraftRequestMetadata,
} from "../core/metadata-record";
import type { SafeDraftMetadataStorePort } from "../core/metadata-store-port";
import type { RewriteModelPort } from "../core/rewrite-model-port";
import { buildRewritePrompt } from "../core/rewrite-prompt";
import { runPreModelSafetyGate, type PreModelFinding } from "../core/pre-model-safety-gate";
import type { SafeDraftKillSwitchPort } from "../core/kill-switch";
import type { SafeDraftRateLimiterPort } from "../core/rate-limit";
import { parseStructuredModelOutput } from "../core/structured-output";

const DEFAULT_ESTIMATED_RUN_COST_USD = 0.015;
const BLOCKED_PUBLIC_STATUS = "Zatrzymane ze względów bezpieczeństwa";
const BLOCKED_INTERNAL_STATUS = "BLOCKED_SAFETY";

type SafeDraftRuntimeBlockReason =
  | "honeypot_filled"
  | "kill_switch_enabled"
  | "rate_limit_ip"
  | "rate_limit_email"
  | "rate_limit_session"
  | "daily_cost_cap_exceeded"
  | "monthly_cost_cap_exceeded"
  | "pre_model_safety";

export type SafeDraftRewriteHandlerDependencies = {
  model: RewriteModelPort;
  now?: () => Date;
  createSubmissionId?: () => string;
  hashText?: SafeDraftHashText;
  botGuard?: SafeDraftBotGuardPort;
  killSwitch?: SafeDraftKillSwitchPort;
  rateLimiter?: SafeDraftRateLimiterPort;
  costCap?: SafeDraftCostCapPort;
  metadataStore?: SafeDraftMetadataStorePort;
  leadCapture?: SafeDraftLeadCapturePort;
  estimatedRunCostUsd?: number;
};

export async function handleSafeDraftRewriteRequest(
  request: Request,
  dependencies: SafeDraftRewriteHandlerDependencies
): Promise<Response> {
  const body = await readJsonBody(request);
  const parsedSubmission = parseSafeDraftSubmission(body);

  if (!parsedSubmission.ok) {
    return Response.json(
      {
        ok: false,
        error: "validation_failed",
        errors: parsedSubmission.errors,
      },
      { status: 400 }
    );
  }

  const hashText = dependencies.hashText ?? sha256Hex;
  const now = dependencies.now ?? (() => new Date());
  const createSubmissionId = dependencies.createSubmissionId ?? defaultSubmissionId;
  const requestTime = now();
  const createdAt = requestTime.toISOString();
  const requestMetadata = {
    submission_id: createSubmissionId(),
    created_at: createdAt,
    consent_timestamp: createdAt,
    ip_address: clientIp(request.headers),
    user_agent: request.headers.get("user-agent") ?? undefined,
  };
  const sessionId = clientSessionId(request.headers, body);
  const botGuard = dependencies.botGuard ?? createSafeDraftBotGuard();
  const botGuardResult = botGuard.check(body);
  if (!botGuardResult.ok) {
    return buildBlockedResponse({
      blockReason: botGuardResult.reason,
      submission: parsedSubmission.value,
      request: requestMetadata,
      hashText,
      metadataStore: dependencies.metadataStore,
      leadCapture: dependencies.leadCapture,
    });
  }

  const killSwitchEnabled = dependencies.killSwitch ? await dependencies.killSwitch.isEnabled() : false;
  if (killSwitchEnabled) {
    return buildBlockedResponse({
      blockReason: "kill_switch_enabled",
      submission: parsedSubmission.value,
      request: requestMetadata,
      hashText,
      metadataStore: dependencies.metadataStore,
      leadCapture: dependencies.leadCapture,
    });
  }

  const normalisedEmail = parsedSubmission.value.email.trim().toLowerCase();
  const rateLimitResult = await dependencies.rateLimiter?.check({
    nowMs: requestTime.getTime(),
    ipHash: requestMetadata.ip_address ? hashText(requestMetadata.ip_address) : null,
    emailHash: hashText(normalisedEmail),
    sessionHash: sessionId ? hashText(sessionId) : null,
  });
  if (rateLimitResult && !rateLimitResult.ok) {
    return buildBlockedResponse({
      blockReason: `rate_limit_${rateLimitResult.scope}`,
      submission: parsedSubmission.value,
      request: requestMetadata,
      hashText,
      metadataStore: dependencies.metadataStore,
      leadCapture: dependencies.leadCapture,
    });
  }

  const costCapResult = await dependencies.costCap?.check({
    now: requestTime,
    estimatedRunCostUsd: dependencies.estimatedRunCostUsd ?? DEFAULT_ESTIMATED_RUN_COST_USD,
  });
  if (costCapResult && !costCapResult.ok) {
    return buildBlockedResponse({
      blockReason: costCapResult.scope === "daily" ? "daily_cost_cap_exceeded" : "monthly_cost_cap_exceeded",
      submission: parsedSubmission.value,
      request: requestMetadata,
      hashText,
      metadataStore: dependencies.metadataStore,
      leadCapture: dependencies.leadCapture,
    });
  }

  const safetyGate = runPreModelSafetyGate(parsedSubmission.value.draft_text);
  if (!safetyGate.allow_model_call) {
    return buildBlockedResponse({
      blockReason: "pre_model_safety",
      submission: parsedSubmission.value,
      request: requestMetadata,
      hashText,
      metadataStore: dependencies.metadataStore,
      leadCapture: dependencies.leadCapture,
      findings: safetyGate.findings,
      captureLead: true,
    });
  }

  const prompt = buildRewritePrompt(parsedSubmission.value);
  let modelResponse;
  try {
    modelResponse = await dependencies.model.rewrite({ prompt });
  } catch {
    return Response.json(
      {
        ok: false,
        error: "provider_call_failed",
        public_status: "Zatrzymane ze względów bezpieczeństwa",
        internal_status: "BLOCKED_SAFETY",
      },
      { status: 502 }
    );
  }
  await dependencies.costCap?.record({
    now: now(),
    estimatedCostUsd: modelResponse.estimated_cost_usd,
  });

  const parsedOutput = parseStructuredModelOutput(modelResponse.raw_output);

  if (!parsedOutput.ok) {
    const metadataRecord = buildSafeDraftMetadataRecord({
      submission: parsedSubmission.value,
      result: {
        output_text: "",
        public_status: "Zatrzymane ze względów bezpieczeństwa",
        internal_status: "BLOCKED_SAFETY",
        risk_count: 1,
        removed_ai_tells_count: 0,
      },
      request: requestMetadata,
      model: modelResponse,
      hashText,
    });
    await saveMetadata(dependencies.metadataStore, metadataRecord);
    const leadCaptureFailure = await saveLeadCapture(
      dependencies.leadCapture,
      parsedSubmission.value,
      metadataRecord
    );
    if (leadCaptureFailure) {
      return leadCaptureFailure;
    }

    return Response.json(
      {
        ok: false,
        error: "model_output_invalid",
        public_status: "Zatrzymane ze względów bezpieczeństwa",
        internal_status: "BLOCKED_SAFETY",
        metadata_record: metadataRecord,
      },
      { status: 502 }
    );
  }

  const metadataRecord = buildSafeDraftMetadataRecord({
    submission: parsedSubmission.value,
    result: {
      output_text: parsedOutput.value.rewritten_text,
      public_status: parsedOutput.value.public_status,
      internal_status: parsedOutput.value.internal_status,
      risk_count: parsedOutput.value.risk_flags.length,
      removed_ai_tells_count: parsedOutput.value.removed_ai_tells.length,
    },
    request: requestMetadata,
    model: modelResponse,
    hashText,
  });
  await saveMetadata(dependencies.metadataStore, metadataRecord);
  const leadCaptureFailure = await saveLeadCapture(dependencies.leadCapture, parsedSubmission.value, metadataRecord);
  if (leadCaptureFailure) {
    return leadCaptureFailure;
  }

  return Response.json({
    ok: true,
    result: parsedOutput.value,
    metadata_record: metadataRecord,
  });
}

export function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

async function readJsonBody(request: Request): Promise<unknown> {
  try {
    const body: unknown = await request.json();
    return body;
  } catch {
    return undefined;
  }
}

function defaultSubmissionId(): string {
  return `safedraft_${randomUUID()}`;
}

function clientIp(headers: Headers): string | undefined {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstForwardedIp = forwardedFor.split(",")[0]?.trim();
    if (firstForwardedIp) {
      return firstForwardedIp;
    }
  }

  const realIp = headers.get("x-real-ip")?.trim();
  return realIp ? realIp : undefined;
}

async function buildBlockedResponse(input: {
  blockReason: SafeDraftRuntimeBlockReason;
  submission: SafeDraftSubmission;
  request: SafeDraftRequestMetadata;
  hashText: SafeDraftHashText;
  metadataStore?: SafeDraftMetadataStorePort;
  leadCapture?: SafeDraftLeadCapturePort;
  findings?: PreModelFinding[];
  captureLead?: boolean;
}): Promise<Response> {
  const metadataRecord = buildSafeDraftMetadataRecord({
    submission: input.submission,
    result: blockedMetadataResult(input.findings?.length ?? 1),
    request: input.request,
    model: {
      provider: "none",
      model_id: "not_called",
      latency_ms: 0,
      estimated_cost_usd: 0,
    },
    hashText: input.hashText,
  });
  await saveMetadata(input.metadataStore, metadataRecord);
  if (input.captureLead) {
    const leadCaptureFailure = await saveLeadCapture(input.leadCapture, input.submission, metadataRecord);
    if (leadCaptureFailure) {
      return leadCaptureFailure;
    }
  }

  return Response.json({
    ok: false,
    error: "blocked_safety",
    block_reason: input.blockReason,
    public_status: BLOCKED_PUBLIC_STATUS,
    internal_status: BLOCKED_INTERNAL_STATUS,
    findings: input.findings ?? [],
    metadata_record: metadataRecord,
  });
}

async function saveLeadCapture(
  leadCapture: SafeDraftLeadCapturePort | undefined,
  submission: SafeDraftSubmission,
  metadataRecord: SafeDraftMetadataRecord
): Promise<Response | undefined> {
  if (!leadCapture) {
    return undefined;
  }

  try {
    await leadCapture.save(buildSafeDraftLeadCaptureRecord({ submission, metadataRecord }));
    return undefined;
  } catch {
    return Response.json(
      {
        ok: false,
        error: "lead_capture_failed",
        public_status: BLOCKED_PUBLIC_STATUS,
        internal_status: BLOCKED_INTERNAL_STATUS,
      },
      { status: 502 }
    );
  }
}

function blockedMetadataResult(riskCount: number): SafeDraftMetadataRecordResult {
  return {
    output_text: "",
    public_status: BLOCKED_PUBLIC_STATUS,
    internal_status: BLOCKED_INTERNAL_STATUS,
    risk_count: riskCount,
    removed_ai_tells_count: 0,
  };
}

async function saveMetadata(
  metadataStore: SafeDraftMetadataStorePort | undefined,
  metadataRecord: SafeDraftMetadataRecord
): Promise<void> {
  if (metadataStore) {
    await metadataStore.save(metadataRecord);
  }
}

function clientSessionId(headers: Headers, body: unknown): string | undefined {
  const headerSessionId = headers.get("x-safedraft-session-id")?.trim();
  if (headerSessionId) {
    return headerSessionId;
  }

  if (!isRecord(body)) {
    return undefined;
  }

  const sessionId = optionalBodyString(body, "session_id") ?? optionalBodyString(body, "safedraft_session_id");
  return sessionId;
}

function optionalBodyString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
