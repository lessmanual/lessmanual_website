import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { resolveSafeDraftProviderConfig, SAFEDRAFT_ANTHROPIC_MODEL_ID } from "./safedraft-provider-config.server";

describe("resolveSafeDraftProviderConfig", () => {
  it("defaults to fake when no provider env is set", () => {
    expect(resolveSafeDraftProviderConfig({})).toEqual({
      ok: true,
      provider: "fake",
    });
  });

  it("fails closed when Anthropic is selected without an API key", () => {
    expect(resolveSafeDraftProviderConfig({ SAFEDRAFT_REWRITE_PROVIDER: "anthropic" })).toEqual({
      ok: false,
      provider: "anthropic",
      error: "anthropic_api_key_missing",
    });
  });

  it("accepts Anthropic only with server API key and fixed model id", () => {
    expect(
      resolveSafeDraftProviderConfig({
        SAFEDRAFT_REWRITE_PROVIDER: "anthropic",
        ANTHROPIC_API_KEY: "test-key",
      })
    ).toEqual({
      ok: true,
      provider: "anthropic",
      apiKey: "test-key",
      modelId: SAFEDRAFT_ANTHROPIC_MODEL_ID,
    });
  });
});
