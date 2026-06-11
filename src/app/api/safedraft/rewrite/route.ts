import { createAnthropicRewriteModelPort } from "@/features/safedraft/adapters/anthropic-rewrite-model.server";
import { createFakeRewriteModelPort } from "@/features/safedraft/adapters/fake-rewrite-model.server";
import { createMemorySafeDraftMetadataStore } from "@/features/safedraft/adapters/memory-metadata-store.server";
import { createSafeDraftBotGuard } from "@/features/safedraft/core/bot-guard";
import { createMemorySafeDraftCostCap } from "@/features/safedraft/core/cost-cap";
import { createSafeDraftKillSwitch, isSafeDraftKillSwitchEnvEnabled } from "@/features/safedraft/core/kill-switch";
import { createMemorySafeDraftRateLimiter } from "@/features/safedraft/core/rate-limit";
import { resolveSafeDraftProviderConfig } from "@/features/safedraft/server/safedraft-provider-config.server";
import { handleSafeDraftRewriteRequest } from "@/features/safedraft/server/safedraft-rewrite-handler.server";

export const runtime = "nodejs";

const metadataStore = createMemorySafeDraftMetadataStore();
const botGuard = createSafeDraftBotGuard();
const rateLimiter = createMemorySafeDraftRateLimiter({
  windowMs: 60 * 60 * 1000,
  maxPerIp: 20,
  maxPerEmail: 5,
  maxPerSession: 10,
});
const costCap = createMemorySafeDraftCostCap({
  dailyLimitUsd: readUsdEnv("SAFEDRAFT_DAILY_COST_CAP_USD", 1),
  monthlyLimitUsd: readUsdEnv("SAFEDRAFT_MONTHLY_COST_CAP_USD", 10),
});

export async function POST(request: Request): Promise<Response> {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ ok: false, error: "safedraft_public_v0_disabled" }, { status: 404 });
  }

  const providerConfig = resolveSafeDraftProviderConfig();
  if (!providerConfig.ok) {
    return Response.json(
      {
        ok: false,
        error: "provider_config_invalid",
        provider: providerConfig.provider,
        reason: providerConfig.error,
      },
      { status: 500 }
    );
  }

  const model =
    providerConfig.provider === "anthropic"
      ? createAnthropicRewriteModelPort({
          apiKey: providerConfig.apiKey,
          modelId: providerConfig.modelId,
        })
      : createFakeRewriteModelPort();

  return handleSafeDraftRewriteRequest(request, {
    model,
    botGuard,
    killSwitch: createSafeDraftKillSwitch(
      isSafeDraftKillSwitchEnvEnabled(process.env.SAFEDRAFT_KILL_SWITCH) ||
        isSafeDraftKillSwitchEnvEnabled(process.env.SAFEDRAFT_PUBLIC_V0_KILL_SWITCH)
    ),
    rateLimiter,
    costCap,
    metadataStore,
  });
}

function readUsdEnv(name: string, fallback: number): number {
  const rawValue = process.env[name];
  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : fallback;
}
