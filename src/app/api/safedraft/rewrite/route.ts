import { createAnthropicRewriteModelPort } from "@/features/safedraft/adapters/anthropic-rewrite-model.server";
import { createFakeRewriteModelPort } from "@/features/safedraft/adapters/fake-rewrite-model.server";
import { createMemorySafeDraftMetadataStore } from "@/features/safedraft/adapters/memory-metadata-store.server";
import { createSupabaseSafeDraftLeadCaptureFromEnv } from "@/features/safedraft/adapters/supabase-lead-capture.server";
import { createSafeDraftBotGuard } from "@/features/safedraft/core/bot-guard";
import { createMemorySafeDraftCostCap } from "@/features/safedraft/core/cost-cap";
import type { SafeDraftLeadCapturePort } from "@/features/safedraft/core/lead-capture-port";
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
  const publicV0Enabled = isSafeDraftPublicV0Enabled(process.env.SAFEDRAFT_PUBLIC_V0_ENABLED);
  if (process.env.NODE_ENV === "production" && !publicV0Enabled) {
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

  if (process.env.NODE_ENV === "production" && providerConfig.provider !== "anthropic") {
    return Response.json(
      {
        ok: false,
        error: "provider_config_invalid",
        provider: providerConfig.provider,
        reason: "anthropic_required_for_public_v0",
      },
      { status: 500 }
    );
  }

  const leadCaptureConfig = resolveLeadCapture({
    productionEnabled: process.env.NODE_ENV === "production" && publicV0Enabled,
    provider: process.env.SAFEDRAFT_LEAD_CAPTURE_PROVIDER,
  });
  if (!leadCaptureConfig.ok) {
    return Response.json(
      {
        ok: false,
        error: "lead_capture_config_invalid",
        reason: leadCaptureConfig.error,
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
    leadCapture: leadCaptureConfig.leadCapture,
  });
}

export function isSafeDraftPublicV0Enabled(value: string | undefined): boolean {
  switch (value?.trim().toLowerCase()) {
    case "1":
    case "true":
    case "yes":
    case "on":
    case "enabled":
      return true;
    default:
      return false;
  }
}

function readUsdEnv(name: string, fallback: number): number {
  const rawValue = process.env[name];
  if (!rawValue) {
    return fallback;
  }

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : fallback;
}

type LeadCaptureConfig =
  | {
      ok: true;
      leadCapture?: SafeDraftLeadCapturePort;
    }
  | {
      ok: false;
      error: "supabase_url_missing" | "supabase_service_role_key_missing";
    };

function resolveLeadCapture(input: { productionEnabled: boolean; provider: string | undefined }): LeadCaptureConfig {
  const provider = input.provider?.trim().toLowerCase();
  if (!input.productionEnabled && provider !== "supabase") {
    return { ok: true };
  }

  const config = createSupabaseSafeDraftLeadCaptureFromEnv();
  if (!config.ok) {
    return { ok: false, error: config.error };
  }

  return { ok: true, leadCapture: config.port };
}
