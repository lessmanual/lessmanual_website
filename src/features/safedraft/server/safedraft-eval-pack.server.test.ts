import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { createMemorySafeDraftMetadataStore } from "../adapters/memory-metadata-store.server";
import { SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES, type SafeDraftEvalFixture } from "../core/eval-pack-fixtures";
import type { RewriteModelPort, RewriteModelResponse } from "../core/rewrite-model-port";
import type { SafeDraftInternalStatus, SafeDraftPublicStatus } from "../core/status";
import { handleSafeDraftRewriteRequest } from "./safedraft-rewrite-handler.server";

const MODEL_CALL_FIXTURES = SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES.filter((fixture) => fixture.expected_model_call);
const BLOCKED_FIXTURES = SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES.filter((fixture) => !fixture.expected_model_call);

describe("SafeDraft public v0 eval pack", () => {
  it("contains the approved synthetic launch eval set", () => {
    const ids = SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES.map((fixture) => fixture.id);

    expect(SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES).toHaveLength(18);
    expect(new Set(ids).size).toBe(ids.length);
    expect(MODEL_CALL_FIXTURES).toHaveLength(10);
    expect(BLOCKED_FIXTURES).toHaveLength(8);

    for (const fixture of SAFEDRAFT_PUBLIC_V0_EVAL_FIXTURES) {
      expect(fixture.payload.email).toMatch(/@example\.com$/);
      expect(fixture.payload.privacy_terms_accepted).toBe(true);
      expect(fixture.payload.processing_consent_accepted).toBe(true);
      expect(fixture.payload.marketing_consent).toBe(false);
      expect(fixture.payload.draft_text.length).toBeGreaterThanOrEqual(40);
      expect(fixture.expected_public_statuses.length).toBeGreaterThan(0);
    }
  });

  it.each(MODEL_CALL_FIXTURES)("$id reaches the model and stores metadata only", async (fixture) => {
    let modelCalls = 0;
    const metadataStore = createMemorySafeDraftMetadataStore();
    const expectedStatus = firstExpectedStatus(fixture);

    const response = await handleSafeDraftRewriteRequest(createRequest(fixture), {
      model: createEvalModel(fixture, () => {
        modelCalls += 1;
      }),
      metadataStore,
      now: () => new Date("2026-06-11T12:00:00.000Z"),
      createSubmissionId: () => `safedraft_${fixture.id.toLowerCase()}`,
      hashText: stableHash,
    });
    const body: unknown = await response.json();
    const records = metadataStore.records();
    const serialised = JSON.stringify({ body, records });

    expect(response.status).toBe(200);
    expect(modelCalls).toBe(1);
    expect(body).toMatchObject({
      ok: true,
      result: {
        public_status: expectedStatus,
        internal_status: internalStatusForPublicStatus(expectedStatus),
      },
      metadata_record: {
        submission_id: `safedraft_${fixture.id.toLowerCase()}`,
        provider: "fake-eval",
        model_id: "fake-eval-model-v0",
        public_status: expectedStatus,
      },
    });
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      provider: "fake-eval",
      model_id: "fake-eval-model-v0",
      email_domain: "example.com",
      input_sha256: stableHash(fixture.payload.draft_text),
      public_status: expectedStatus,
    });
    expectNoRawFixtureData(serialised, fixture);
  });

  it.each(BLOCKED_FIXTURES)("$id blocks before model and stores only safe metadata", async (fixture) => {
    let modelCalls = 0;
    const metadataStore = createMemorySafeDraftMetadataStore();

    const response = await handleSafeDraftRewriteRequest(createRequest(fixture), {
      model: createEvalModel(fixture, () => {
        modelCalls += 1;
      }),
      metadataStore,
      now: () => new Date("2026-06-11T12:00:00.000Z"),
      createSubmissionId: () => `safedraft_${fixture.id.toLowerCase()}`,
      hashText: stableHash,
    });
    const body: unknown = await response.json();
    const records = metadataStore.records();
    const serialised = JSON.stringify({ body, records });

    expect(response.status).toBe(200);
    expect(modelCalls).toBe(0);
    expect(body).toMatchObject({
      ok: false,
      error: "blocked_safety",
      block_reason: "pre_model_safety",
      public_status: "Zatrzymane ze względów bezpieczeństwa",
      internal_status: "BLOCKED_SAFETY",
      metadata_record: {
        submission_id: `safedraft_${fixture.id.toLowerCase()}`,
        provider: "none",
        model_id: "not_called",
        public_status: "Zatrzymane ze względów bezpieczeństwa",
      },
    });
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      provider: "none",
      model_id: "not_called",
      output_length: 0,
      public_status: "Zatrzymane ze względów bezpieczeństwa",
      internal_status: "BLOCKED_SAFETY",
    });
    expectNoRawFixtureData(serialised, fixture);
  });
});

function createRequest(fixture: SafeDraftEvalFixture): Request {
  return new Request("http://localhost/api/safedraft/rewrite", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "Vitest SafeDraft Eval Pack",
      "x-forwarded-for": "203.0.113.77",
      "x-safedraft-session-id": `session-${fixture.id.toLowerCase()}`,
    },
    body: JSON.stringify(fixture.payload),
  });
}

function createEvalModel(fixture: SafeDraftEvalFixture, onCall: () => void): RewriteModelPort {
  return {
    async rewrite(): Promise<RewriteModelResponse> {
      onCall();
      const publicStatus = firstExpectedStatus(fixture);
      const internalStatus = internalStatusForPublicStatus(publicStatus);

      return {
        provider: "fake-eval",
        model_id: "fake-eval-model-v0",
        latency_ms: 0,
        estimated_cost_usd: 0,
        raw_output: JSON.stringify({
          rewritten_text:
            "Syntetyczny wynik ewaluacyjny SafeDraft. Tekst jest kontrolowanym outputem testowym, bez danych klienta i bez realnego wywołania modelu.",
          public_status: publicStatus,
          internal_status: internalStatus,
          confidence: publicStatus === "Gotowe do wysłania" ? 0.92 : 0.74,
          removed_ai_tells: publicStatus === "Gotowe do wysłania" ? ["uprzejmie informuję"] : [],
          manual_review_reasons:
            publicStatus === "Wymaga ręcznego review"
              ? ["Fixture wymaga ręcznego sprawdzenia faktów przed wysyłką."]
              : [],
          unchanged_facts: ["Zachowano tylko fakty podane w syntetycznym przykładzie."],
          risk_flags:
            publicStatus === "Wymaga ręcznego review"
              ? [{ category: "claim", severity: "review", message: "Brakuje potwierdzenia części faktów." }]
              : [],
          one_sentence_summary: "Kontrolowany wynik eval packa bez realnego provider calla.",
        }),
      };
    },
  };
}

function firstExpectedStatus(fixture: SafeDraftEvalFixture): SafeDraftPublicStatus {
  const status = fixture.expected_public_statuses[0];
  if (status) {
    return status;
  }

  return "Wymaga ręcznego review";
}

function internalStatusForPublicStatus(status: SafeDraftPublicStatus): SafeDraftInternalStatus {
  if (status === "Gotowe do wysłania") {
    return "READY_TO_SEND";
  }

  if (status === "Zatrzymane ze względów bezpieczeństwa") {
    return "BLOCKED_SAFETY";
  }

  return "NEEDS_REVIEW";
}

function expectNoRawFixtureData(serialised: string, fixture: SafeDraftEvalFixture): void {
  expect(serialised).not.toContain(fixture.payload.draft_text);
  expect(serialised).not.toContain(fixture.payload.email);
  expect(serialised).not.toContain(fixture.payload.company_type ?? "unused-company-type");
  expect(serialised).not.toContain(fixture.payload.role ?? "unused-role");
}

function stableHash(value: string): string {
  return `sha256:${value.length}`;
}
