import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validSubmission = {
  name: "Bartek",
  email: "bartek@example.com",
  company: "Example SA",
  website: "example.com",
  industry: "Usługi B2B",
  currentSystems: "ClickUp, Google Sheets, ChatGPT, Google Docs, Asana",
  productMode: "customer_operations_ai",
  priority: "relieve_team_now",
  bottleneck: "Zespół nie ma czasu na nowych klientów i obsługę zapytań.",
  weeklyProcessVolume: 125,
  minutesPerOccurrence: 12,
  notes: "Prosimy o mapę pierwszego procesu.",
  privacyConsent: true,
  researchConsent: true,
};

describe("Growth Map intake route V10", () => {
  afterEach(() => {
    delete process.env.CLOUDCSO_LEAD_MAGNET_WEBHOOK_URL;
    delete process.env.CLOUDCSO_LEAD_MAGNET_WEBHOOK_TOKEN;
    delete process.env.CLOUDCSO_LEAD_MAGNET_REQUIRE_WEBHOOK;
    delete process.env.VERCEL_ENV;
  });

  it("returns local preview success without a webhook in local mode", async () => {
    const response = await POST(jsonRequest(validSubmission));
    const body = await jsonBody(response);

    expect(response.status).toBe(202);
    expect(body.ok).toBe(true);
    expect(body.status).toBe("local_preview_ready");
    expect(typeof body.requestId).toBe("string");
    expect(body.message).toContain("trybie testowym");
    expect(body.message).not.toContain("brief");
  });

  it("does not fake success when webhook is required", async () => {
    process.env.CLOUDCSO_LEAD_MAGNET_REQUIRE_WEBHOOK = "1";

    const response = await POST(jsonRequest(validSubmission));
    const body = await jsonBody(response);

    expect(response.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.message).toContain("Automatyczna wysyłka");
  });

  it("forwards the fixed routing and numeric V10 baseline", async () => {
    const originalFetch = globalThis.fetch;
    const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
    process.env.CLOUDCSO_LEAD_MAGNET_WEBHOOK_URL = "http://127.0.0.1:8787/lead-magnet";
    process.env.CLOUDCSO_LEAD_MAGNET_WEBHOOK_TOKEN = "local-test-token";
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      calls.push({ input, init });
      return new Response(JSON.stringify({ ok: true }), {
        status: 202,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    try {
      const response = await POST(jsonRequest(validSubmission));
      const body = await jsonBody(response);
      const forwarded = calls[0];
      const headers = forwarded.init?.headers;
      const payload = JSON.parse(String(forwarded.init?.body)) as Record<string, unknown>;
      const forwardedRequest = readRecord(payload.request);

      expect(response.status).toBe(202);
      expect(body.ok).toBe(true);
      expect(body.status).toBe("queued_for_cloudcso");
      expect(body.message).toContain("analiza ruszyła");
      expect(body.message).not.toContain("brief");
      expect(String(forwarded.input)).toBe("http://127.0.0.1:8787/lead-magnet");
      expect(headers instanceof Headers ? headers.get("authorization") : "").toBe("Bearer local-test-token");
      expect(payload.recordType).toBe("cloudcso_lead_magnet_request");
      expect(payload.version).toBe("2026-07-10-v10");
      expect(readRecord(payload.lead).email).toBe(validSubmission.email);
      expect(forwardedRequest.productMode).toBe("not_sure");
      expect(forwardedRequest.weeklyProcessVolume).toBe(125);
      expect(forwardedRequest.minutesPerOccurrence).toBe(12);
      expect(forwardedRequest.currentSystems).toEqual([
        "ClickUp",
        "Google Sheets",
        "ChatGPT",
        "Google Docs",
        "Asana",
      ]);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("returns field errors for missing context and invalid numeric baselines", async () => {
    const response = await POST(jsonRequest({
      ...validSubmission,
      email: "",
      website: "",
      currentSystems: "",
      weeklyProcessVolume: 0,
      minutesPerOccurrence: 1_441,
    }));
    const body = await jsonBody(response);

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    const fieldErrors = readRecord(body.fieldErrors);
    expect(readString(fieldErrors, "email")).toContain("email");
    expect(readString(fieldErrors, "website")).toContain("strony");
    expect(readString(fieldErrors, "currentSystems")).toContain("systemy");
    expect(readString(fieldErrors, "weeklyProcessVolume")).toContain("tygodniu");
    expect(readString(fieldErrors, "minutesPerOccurrence")).toContain("minut");
  });
});

function jsonRequest(body: unknown) {
  return new Request("http://localhost:3011/api/lead-magnet/growth-map", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function jsonBody(response: Response): Promise<Record<string, unknown>> {
  const body: unknown = await response.json();

  if (!isRecord(body)) {
    throw new Error("Expected JSON object response");
  }

  return body;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function readString(input: Record<string, unknown>, field: string): string {
  const value = input[field];
  return typeof value === "string" ? value : "";
}
