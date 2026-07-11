import {
  buildCloudCsoGrowthMapPayload,
  parseGrowthMapSubmission,
} from "@/lib/lead-magnet/growth-map";

export const runtime = "nodejs";

type IntakeResponse =
  | {
      ok: true;
      requestId: string;
      status: "queued_for_cloudcso" | "local_preview_ready";
      message: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string>;
    };

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "Nie udało się odczytać formularza. Spróbuj ponownie.",
      },
      400,
    );
  }

  const parsed = parseGrowthMapSubmission(body);

  if (!parsed.ok) {
    return jsonResponse(
      {
        ok: false,
        message: "Uzupełnij brakujące pola i spróbuj ponownie.",
        fieldErrors: parsed.fieldErrors,
      },
      400,
    );
  }

  const requestId = createRequestId();
  const submittedAt = new Date().toISOString();
  const payload = buildCloudCsoGrowthMapPayload(parsed.value, requestId, submittedAt);
  const webhookUrl = process.env.CLOUDCSO_LEAD_MAGNET_WEBHOOK_URL?.trim() || "";
  const requireWebhook =
    process.env.CLOUDCSO_LEAD_MAGNET_REQUIRE_WEBHOOK === "1" ||
    process.env.VERCEL_ENV === "production";

  if (!webhookUrl) {
    if (requireWebhook) {
      return jsonResponse(
        {
          ok: false,
          message: "Automatyczna wysyłka raportu nie jest jeszcze skonfigurowana. Spróbuj później albo napisz na kontakt@lessmanual.ai.",
        },
        503,
      );
    }

    return jsonResponse(
      {
        ok: true,
        requestId,
        status: "local_preview_ready",
        message: "Zgłoszenie przyjęte w trybie testowym. Analiza i wysyłka ruszą po podpięciu pełnej automatyzacji.",
      },
      202,
    );
  }

  const webhookTarget = parseWebhookUrl(webhookUrl);

  if (!webhookTarget) {
    return jsonResponse(
        {
          ok: false,
          message: "Konfiguracja formularza wymaga poprawki. Spróbuj później albo napisz na kontakt@lessmanual.ai.",
        },
        500,
      );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const headers = new Headers({ "content-type": "application/json" });
    const webhookToken = process.env.CLOUDCSO_LEAD_MAGNET_WEBHOOK_TOKEN?.trim() || "";
    if (webhookToken) {
      headers.set("authorization", `Bearer ${webhookToken}`);
    }

    const response = await fetch(webhookTarget, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return jsonResponse(
        {
          ok: false,
          message: "Nie udało się przyjąć zgłoszenia. Spróbuj ponownie za chwilę.",
        },
        502,
      );
    }

    const webhookResult = await readJsonObject(response);

    if (webhookResult?.emailDeliveryMode === "mock") {
      return jsonResponse(
        {
          ok: true,
          requestId,
          status: "local_preview_ready",
          message: "Tryb testowy: CloudCSO przygotowuje raport lokalnie. W tym trybie email nie jest wysyłany.",
        },
        202,
      );
    }
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "Formularz jest chwilowo niedostępny. Spróbuj ponownie za chwilę.",
      },
      502,
    );
  } finally {
    clearTimeout(timeout);
  }

  return jsonResponse(
    {
      ok: true,
      requestId,
      status: "queued_for_cloudcso",
      message: "Etap 1/5 ukończony: analiza ruszyła. Potwierdzenie przyjdzie na email, a raport PDF wyślemy osobno po zakończeniu analizy.",
    },
    202,
  );
}

function jsonResponse(body: IntakeResponse, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function parseWebhookUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function createRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function readJsonObject(response: Response): Promise<Record<string, unknown> | undefined> {
  try {
    const body: unknown = await response.json();
    return isRecord(body) ? body : undefined;
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
