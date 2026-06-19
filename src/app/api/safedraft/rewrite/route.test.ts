import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { isSafeDraftPublicV0Enabled, POST } from "./route";

const VALID_DRAFT =
  "Czesc, dzieki za rozmowe o automatyzacji follow-upow. Chce wyslac wiadomosc, ktora brzmi mniej sztucznie i nie dodaje nowych obietnic.";

describe("POST /api/safedraft/rewrite provider gate", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("parses only explicit public v0 enablement values", () => {
    expect(isSafeDraftPublicV0Enabled(undefined)).toBe(false);
    expect(isSafeDraftPublicV0Enabled("")).toBe(false);
    expect(isSafeDraftPublicV0Enabled("false")).toBe(false);
    expect(isSafeDraftPublicV0Enabled("true")).toBe(true);
    expect(isSafeDraftPublicV0Enabled(" enabled ")).toBe(true);
    expect(isSafeDraftPublicV0Enabled("1")).toBe(true);
  });

  it("keeps fake provider as the default local route", async () => {
    vi.stubEnv("SAFEDRAFT_REWRITE_PROVIDER", "");
    vi.stubEnv("ANTHROPIC_API_KEY", "");

    const response = await POST(createRequest(validPayload()));
    const body: unknown = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      ok: true,
      metadata_record: {
        provider: "fake",
        model_id: "fake-rewrite-model-v0",
      },
    });
  });

  it("fails closed when Anthropic provider is selected without an API key", async () => {
    vi.stubEnv("SAFEDRAFT_REWRITE_PROVIDER", "anthropic");
    vi.stubEnv("ANTHROPIC_API_KEY", "");

    const response = await POST(createRequest(validPayload()));
    const body: unknown = await response.json();
    const serialised = JSON.stringify(body);

    expect(response.status).toBe(500);
    expect(body).toEqual({
      ok: false,
      error: "provider_config_invalid",
      provider: "anthropic",
      reason: "anthropic_api_key_missing",
    });
    expect(serialised).not.toContain(VALID_DRAFT);
    expect(serialised).not.toContain("founder@example.com");
  });

  it("keeps production route disabled before explicit future COSTSEC pass", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SAFEDRAFT_REWRITE_PROVIDER", "anthropic");
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");

    const response = await POST(createRequest(validPayload()));
    const body: unknown = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({
      ok: false,
      error: "safedraft_public_v0_disabled",
    });
  });

  it("rejects fake provider when public v0 is explicitly enabled in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SAFEDRAFT_PUBLIC_V0_ENABLED", "true");
    vi.stubEnv("SAFEDRAFT_REWRITE_PROVIDER", "");

    const response = await POST(createRequest(validPayload()));
    const body: unknown = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      ok: false,
      error: "provider_config_invalid",
      provider: "fake",
      reason: "anthropic_required_for_public_v0",
    });
  });

  it("requires Supabase lead capture config when public v0 is explicitly enabled in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SAFEDRAFT_PUBLIC_V0_ENABLED", "true");
    vi.stubEnv("SAFEDRAFT_REWRITE_PROVIDER", "anthropic");
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");

    const response = await POST(createRequest(validPayload()));
    const body: unknown = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      ok: false,
      error: "lead_capture_config_invalid",
      reason: "supabase_url_missing",
    });
  });
});

function validPayload(): Record<string, unknown> {
  return {
    draft_text: VALID_DRAFT,
    email: "founder@example.com",
    privacy_terms_accepted: true,
    processing_consent_accepted: true,
    consent_version: "safedraft-public-v0-2026-06-11",
    tone: "direct_founder",
    channel: "follow_up",
    marketing_consent: false,
  };
}

function createRequest(payload: Record<string, unknown>): Request {
  return new Request("http://localhost/api/safedraft/rewrite", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "Vitest SafeDraft Client",
      "x-forwarded-for": "203.0.113.42",
    },
    body: JSON.stringify(payload),
  });
}
