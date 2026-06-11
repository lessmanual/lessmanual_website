import { describe, expect, it } from "vitest";

import { buildSafeDraftMetadataRecord } from "./metadata-record";

const UNIQUE_DRAFT = "UNIQUE_RAW_DRAFT_PHRASE_20260611 popraw prosze ten follow-up po rozmowie o automatyzacji.";
const UNIQUE_OUTPUT = "UNIQUE_MODEL_OUTPUT_PHRASE_20260611 Dzieki za rozmowe. Wroce z konkretnym kolejnym krokiem.";
const EMAIL = "Founder@TestExample.com";

describe("buildSafeDraftMetadataRecord", () => {
  it("keeps only allowed metadata fields for a successful fake run", () => {
    const record = buildSafeDraftMetadataRecord({
      submission: {
        draft_text: UNIQUE_DRAFT,
        email: EMAIL,
        privacy_terms_accepted: true,
        processing_consent_accepted: true,
        consent_version: "safedraft-public-v0-2026-06-11",
        tone: "direct_founder",
        channel: "follow_up",
        marketing_consent: false,
        utm_source: "linkedin",
        utm_campaign: "safedraft",
        utm_content: "post-a",
        ad_click_id: "raw-click-id-should-not-appear",
      },
      result: {
        output_text: UNIQUE_OUTPUT,
        public_status: "Wymaga ręcznego review",
        internal_status: "NEEDS_REVIEW",
        risk_count: 1,
        removed_ai_tells_count: 2,
      },
      request: {
        submission_id: "safedraft_20260611_test",
        created_at: "2026-06-11T11:00:00.000Z",
        consent_timestamp: "2026-06-11T11:00:00.000Z",
        ip_address: "203.0.113.42",
        user_agent: "Vitest SafeDraft Client",
      },
      model: {
        provider: "fake",
        model_id: "fake-rewrite-model-v0",
        latency_ms: 12,
        estimated_cost_usd: 0,
      },
      hashText: stableHash,
    });

    expect(record).toMatchObject({
      submission_id: "safedraft_20260611_test",
      created_at: "2026-06-11T11:00:00.000Z",
      email_hash: stableHash("founder@testexample.com"),
      email_domain: "testexample.com",
      privacy_terms_accepted: true,
      processing_consent_accepted: true,
      marketing_consent: false,
      consent_version: "safedraft-public-v0-2026-06-11",
      consent_timestamp: "2026-06-11T11:00:00.000Z",
      ip_hash: stableHash("203.0.113.42"),
      user_agent_hash: stableHash("Vitest SafeDraft Client"),
      utm_source: "linkedin",
      utm_campaign: "safedraft",
      utm_content: "post-a",
      ad_click_id_hash: stableHash("raw-click-id-should-not-appear"),
      channel: "follow_up",
      tone: "direct_founder",
      input_sha256: stableHash(UNIQUE_DRAFT),
      input_length: UNIQUE_DRAFT.length,
      output_sha256: stableHash(UNIQUE_OUTPUT),
      output_length: UNIQUE_OUTPUT.length,
      provider: "fake",
      model_id: "fake-rewrite-model-v0",
      latency_ms: 12,
      estimated_cost_usd: 0,
      public_status: "Wymaga ręcznego review",
      internal_status: "NEEDS_REVIEW",
      risk_count: 1,
      removed_ai_tells_count: 2,
    });
  });

  it("does not serialise raw draft, raw output, email plaintext or raw ad click id", () => {
    const record = buildSafeDraftMetadataRecord({
      submission: {
        draft_text: UNIQUE_DRAFT,
        email: EMAIL,
        privacy_terms_accepted: true,
        processing_consent_accepted: true,
        consent_version: "safedraft-public-v0-2026-06-11",
        tone: "calm_advisor",
        channel: "email",
        marketing_consent: true,
        ad_click_id: "raw-click-id-should-not-appear",
      },
      result: {
        output_text: UNIQUE_OUTPUT,
        public_status: "Gotowe do wysłania",
        internal_status: "READY_TO_SEND",
        risk_count: 0,
        removed_ai_tells_count: 3,
      },
      request: {
        submission_id: "safedraft_20260611_test_2",
        created_at: "2026-06-11T11:01:00.000Z",
        consent_timestamp: "2026-06-11T11:01:00.000Z",
      },
      model: {
        provider: "fake",
        model_id: "fake-rewrite-model-v0",
        latency_ms: 8,
        estimated_cost_usd: 0,
      },
      hashText: stableHash,
    });

    const serialised = JSON.stringify(record);

    expect(serialised).not.toContain(UNIQUE_DRAFT);
    expect(serialised).not.toContain(UNIQUE_OUTPUT);
    expect(serialised).not.toContain(EMAIL);
    expect(serialised).not.toContain(EMAIL.toLowerCase());
    expect(serialised).not.toContain("raw-click-id-should-not-appear");
  });
});

function stableHash(value: string): string {
  return `sha256:${value.length}`;
}
