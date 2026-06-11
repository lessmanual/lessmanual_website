import { createFakeRewriteModelPort } from "@/features/safedraft/adapters/fake-rewrite-model.server";
import { handleSafeDraftRewriteRequest } from "@/features/safedraft/server/safedraft-rewrite-handler.server";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ ok: false, error: "safedraft_public_v0_disabled" }, { status: 404 });
  }

  return handleSafeDraftRewriteRequest(request, {
    model: createFakeRewriteModelPort(),
  });
}
