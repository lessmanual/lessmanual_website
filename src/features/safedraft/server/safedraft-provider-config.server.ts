import "server-only";

export const SAFEDRAFT_ANTHROPIC_MODEL_ID = "claude-sonnet-4-6";

export type SafeDraftProviderName = "fake" | "anthropic";

export type SafeDraftProviderConfig =
  | {
      ok: true;
      provider: "fake";
    }
  | {
      ok: true;
      provider: "anthropic";
      apiKey: string;
      modelId: typeof SAFEDRAFT_ANTHROPIC_MODEL_ID;
    }
  | {
      ok: false;
      provider: "anthropic";
      error: "anthropic_api_key_missing";
    }
  | {
      ok: false;
      provider: string;
      error: "provider_unsupported";
    };

type ProviderEnv = {
  [key: string]: string | undefined;
  SAFEDRAFT_REWRITE_PROVIDER?: string;
  ANTHROPIC_API_KEY?: string;
};

export function resolveSafeDraftProviderConfig(env: ProviderEnv = process.env): SafeDraftProviderConfig {
  const selectedProvider = normaliseProvider(env.SAFEDRAFT_REWRITE_PROVIDER);

  if (selectedProvider === "fake") {
    return {
      ok: true,
      provider: "fake",
    };
  }

  if (selectedProvider !== "anthropic") {
    return {
      ok: false,
      provider: selectedProvider,
      error: "provider_unsupported",
    };
  }

  const apiKey = env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      provider: "anthropic",
      error: "anthropic_api_key_missing",
    };
  }

  return {
    ok: true,
    provider: "anthropic",
    apiKey,
    modelId: SAFEDRAFT_ANTHROPIC_MODEL_ID,
  };
}

function normaliseProvider(value: string | undefined): string {
  const normalisedValue = value?.trim().toLowerCase();
  return normalisedValue ? normalisedValue : "fake";
}
