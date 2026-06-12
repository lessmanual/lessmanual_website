import { loadEnvConfig } from "@next/env";
import { describe, expect, it, vi } from "vitest";

loadLocalRealEvalEnv();

vi.mock("server-only", () => ({}));

import { createAnthropicRewriteModelPort } from "../adapters/anthropic-rewrite-model.server";
import { createMemorySafeDraftMetadataStore } from "../adapters/memory-metadata-store.server";
import {
  SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES,
  type SafeDraftEvalFixture,
} from "../core/eval-pack-fixtures";
import type { RewriteModelPort, RewriteModelResponse } from "../core/rewrite-model-port";
import type { SafeDraftPublicStatus } from "../core/status";
import { parseStructuredModelOutput } from "../core/structured-output";
import {
  resolveSafeDraftProviderConfig,
  SAFEDRAFT_ANTHROPIC_MODEL_ID,
} from "./safedraft-provider-config.server";
import { handleSafeDraftRewriteRequest } from "./safedraft-rewrite-handler.server";

type SafeDraftRealEvalFailure = {
  id: string;
  expected_model_call: boolean;
  expected_public_statuses: SafeDraftPublicStatus[];
  actual: SafeDraftRealEvalResponseSummary;
};

type SafeDraftRealEvalResponseSummary = {
  http_status: number;
  ok: boolean | null;
  error: string | null;
  public_status: string | null;
  internal_status: string | null;
  block_reason: string | null;
  model_calls: number;
  provider: string | null;
  model_id: string | null;
  pre_handler_parse_ok: boolean | null;
  pre_handler_parse_reason: string | null;
  output_length: number | null;
  risk_count: number | null;
  estimated_cost_usd: number | null;
  latency_ms: number | null;
};

const SHOULD_RUN_REAL_EVAL = process.env.SAFEDRAFT_RUN_REAL_EVAL === "1";
const HAS_ANTHROPIC_API_KEY = Boolean(process.env.ANTHROPIC_API_KEY?.trim());
const describeRealEval = SHOULD_RUN_REAL_EVAL ? describe : describe.skip;
const itWithApiKey = HAS_ANTHROPIC_API_KEY ? it : it.skip;

describeRealEval("SafeDraft local real Anthropic eval", () => {
  it("requires a local Anthropic key only when real eval is explicitly enabled", () => {
    expect(HAS_ANTHROPIC_API_KEY).toBe(true);
  });

  itWithApiKey(
    "matches public v0 eval expectations without raw draft persistence",
    async () => {
      const providerConfig = resolveSafeDraftProviderConfig({
        ...process.env,
        SAFEDRAFT_REWRITE_PROVIDER: "anthropic",
      });
      expect(providerConfig.ok).toBe(true);
      if (!providerConfig.ok) {
        return;
      }

      const failures: SafeDraftRealEvalFailure[] = [];
      const allRecordsSerialised: string[] = [];

      for (const fixture of selectedFixtures()) {
        let modelCalls = 0;
        let preHandlerParse: SafeDraftRealEvalParseSummary = {
          ok: null,
          reason: null,
        };
        const metadataStore = createMemorySafeDraftMetadataStore();
        const model = fixture.expected_model_call
          ? createCountingModel(
              createAnthropicRewriteModelPort({
                apiKey: providerConfig.apiKey,
                modelId: providerConfig.modelId,
              }),
              () => {
                modelCalls += 1;
              },
              (response) => {
                preHandlerParse = summariseStructuredParse(response.raw_output);
              }
            )
          : createBlockedPathModel(() => {
              modelCalls += 1;
            });

        const response = await handleSafeDraftRewriteRequest(createRequest(fixture), {
          model,
          metadataStore,
          now: () => new Date("2026-06-11T12:00:00.000Z"),
          createSubmissionId: () => `safedraft_real_${fixture.id.toLowerCase()}`,
          hashText: stableHash,
        });
        const body: unknown = await response.json();
        const records = metadataStore.records();
        const summary = summariseResponse(response.status, body, modelCalls, preHandlerParse);

        allRecordsSerialised.push(JSON.stringify(records));

        if (!matchesFixtureExpectation(fixture, summary)) {
          failures.push({
            id: fixture.id,
            expected_model_call: fixture.expected_model_call,
            expected_public_statuses: fixture.expected_public_statuses,
            actual: summary,
          });
        }
      }

      const persistedMetadata = allRecordsSerialised.join("\n");
      for (const fixture of selectedFixtures()) {
        expect(persistedMetadata).not.toContain(fixture.payload.draft_text);
        expect(persistedMetadata).not.toContain(fixture.payload.email);
      }
      expect(failures).toEqual([]);
    },
    180_000
  );
});

type SafeDraftRealEvalParseSummary = {
  ok: boolean | null;
  reason: string | null;
};

function createRequest(fixture: SafeDraftEvalFixture): Request {
  return new Request("http://localhost/api/safedraft/rewrite", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "Vitest SafeDraft Real Eval",
      "x-forwarded-for": "203.0.113.88",
      "x-safedraft-session-id": `real-eval-${fixture.id.toLowerCase()}`,
    },
    body: JSON.stringify(fixture.payload),
  });
}

function createCountingModel(
  model: RewriteModelPort,
  onCall: () => void,
  onResponse: (response: RewriteModelResponse) => void
): RewriteModelPort {
  return {
    async rewrite(request): Promise<RewriteModelResponse> {
      onCall();
      const response = await model.rewrite(request);
      onResponse(response);
      return response;
    },
  };
}

function createBlockedPathModel(onCall: () => void): RewriteModelPort {
  return {
    async rewrite(): Promise<RewriteModelResponse> {
      onCall();
      throw new Error("Blocked eval fixture attempted to call a model");
    },
  };
}

function matchesFixtureExpectation(
  fixture: SafeDraftEvalFixture,
  summary: SafeDraftRealEvalResponseSummary
): boolean {
  if (!fixture.expected_model_call) {
    return (
      summary.http_status === 200 &&
      summary.ok === false &&
      summary.error === "blocked_safety" &&
      summary.block_reason === "pre_model_safety" &&
      summary.model_calls === 0 &&
      summary.provider === "none" &&
      summary.model_id === "not_called" &&
      summary.public_status === "Zatrzymane ze względów bezpieczeństwa"
    );
  }

  return (
    summary.http_status === 200 &&
    summary.ok === true &&
    summary.error === null &&
    summary.model_calls === 1 &&
    summary.provider === "anthropic" &&
    summary.model_id === SAFEDRAFT_ANTHROPIC_MODEL_ID &&
    summary.public_status !== null &&
    fixture.expected_public_statuses.includes(summary.public_status) &&
    summary.output_length !== null &&
    summary.output_length > 0
  );
}

function summariseResponse(
  httpStatus: number,
  body: unknown,
  modelCalls: number,
  preHandlerParse: SafeDraftRealEvalParseSummary
): SafeDraftRealEvalResponseSummary {
  const metadataRecord = readRecord(body, "metadata_record");
  const result = readRecord(body, "result");

  return {
    http_status: httpStatus,
    ok: readBoolean(body, "ok"),
    error: readString(body, "error"),
    public_status: readString(body, "public_status") ?? readString(result, "public_status"),
    internal_status: readString(body, "internal_status") ?? readString(result, "internal_status"),
    block_reason: readString(body, "block_reason"),
    model_calls: modelCalls,
    provider: readString(metadataRecord, "provider"),
    model_id: readString(metadataRecord, "model_id"),
    pre_handler_parse_ok: preHandlerParse.ok,
    pre_handler_parse_reason: preHandlerParse.reason,
    output_length: readNumber(metadataRecord, "output_length"),
    risk_count: readNumber(metadataRecord, "risk_count"),
    estimated_cost_usd: readNumber(metadataRecord, "estimated_cost_usd"),
    latency_ms: readNumber(metadataRecord, "latency_ms"),
  };
}

function selectedFixtures(): SafeDraftEvalFixture[] {
  const fixtureId = process.env.SAFEDRAFT_REAL_EVAL_FIXTURE_ID?.trim();
  if (!fixtureId) {
    return SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES;
  }

  return SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES.filter((fixture) => fixture.id === fixtureId);
}

function summariseStructuredParse(rawOutput: string): SafeDraftRealEvalParseSummary {
  const parsed = parseStructuredModelOutput(rawOutput);
  if (parsed.ok) {
    return {
      ok: true,
      reason: null,
    };
  }

  return {
    ok: false,
    reason: parsed.reason,
  };
}

function readRecord(record: unknown, key: string): Record<string, unknown> | undefined {
  if (!isRecord(record)) {
    return undefined;
  }

  const value = record[key];
  return isRecord(value) ? value : undefined;
}

function readString(record: unknown, key: string): string | null {
  if (!isRecord(record)) {
    return null;
  }

  const value = record[key];
  return typeof value === "string" ? value : null;
}

function readNumber(record: unknown, key: string): number | null {
  if (!isRecord(record)) {
    return null;
  }

  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readBoolean(record: unknown, key: string): boolean | null {
  if (!isRecord(record)) {
    return null;
  }

  const value = record[key];
  return typeof value === "boolean" ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stableHash(value: string): string {
  return `sha256:${value.length}`;
}

function loadLocalRealEvalEnv(): void {
  const nodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  loadEnvConfig(process.cwd(), true, undefined, true);
  process.env.NODE_ENV = nodeEnv;
}
