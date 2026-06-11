import { createHash, randomUUID } from "node:crypto";

import { buildSafeDraftMetadataRecord, type SafeDraftHashText } from "../core/metadata-record";
import { parseSafeDraftSubmission } from "../core/input-schema";
import type { RewriteModelPort } from "../core/rewrite-model-port";
import { buildRewritePrompt } from "../core/rewrite-prompt";
import { runPreModelSafetyGate } from "../core/pre-model-safety-gate";
import { parseStructuredModelOutput } from "../core/structured-output";

export type SafeDraftRewriteHandlerDependencies = {
  model: RewriteModelPort;
  now?: () => Date;
  createSubmissionId?: () => string;
  hashText?: SafeDraftHashText;
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
  const createdAt = now().toISOString();
  const requestMetadata = {
    submission_id: createSubmissionId(),
    created_at: createdAt,
    consent_timestamp: createdAt,
    ip_address: clientIp(request.headers),
    user_agent: request.headers.get("user-agent") ?? undefined,
  };

  const safetyGate = runPreModelSafetyGate(parsedSubmission.value.draft_text);
  if (!safetyGate.allow_model_call) {
    const metadataRecord = buildSafeDraftMetadataRecord({
      submission: parsedSubmission.value,
      result: {
        output_text: "",
        public_status: safetyGate.public_status,
        internal_status: safetyGate.internal_status,
        risk_count: safetyGate.findings.length,
        removed_ai_tells_count: 0,
      },
      request: requestMetadata,
      model: {
        provider: "none",
        model_id: "not_called",
        latency_ms: 0,
        estimated_cost_usd: 0,
      },
      hashText,
    });

    return Response.json({
      ok: false,
      error: "blocked_safety",
      public_status: safetyGate.public_status,
      internal_status: safetyGate.internal_status,
      findings: safetyGate.findings,
      metadata_record: metadataRecord,
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
