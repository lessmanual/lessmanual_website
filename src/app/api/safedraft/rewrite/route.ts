import { createAnthropicRewriteModelPort } from "@/features/safedraft/adapters/anthropic-rewrite-model.server";
import { createFakeRewriteModelPort } from "@/features/safedraft/adapters/fake-rewrite-model.server";
import { resolveSafeDraftProviderConfig } from "@/features/safedraft/server/safedraft-provider-config.server";
import { handleSafeDraftRewriteRequest } from "@/features/safedraft/server/safedraft-rewrite-handler.server";

export const runtime = "nodejs";

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
  });
}
