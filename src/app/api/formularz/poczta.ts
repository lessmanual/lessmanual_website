// Mail do Bartka przez Resend (POST /emails, dokumentacja: resend.com/docs/api-reference/emails/send-email).
// Błąd maila nie może zepsuć odpowiedzi dla klienta, bo zapis w CRM jest ważniejszy.

import type { TrescMaila } from "@/lib/lead/podsumowanie";

const DOMYSLNY_ODBIORCA = "kontakt@lessmanual.ai";
// Jedyna zweryfikowana domena w Resend (sprawdzone 11.11.2026).
const DOMYSLNY_NADAWCA = "LessManual formularz <formularz@updates.lessmanual.ai>";

function jestObiektem(wartosc: unknown): wartosc is Record<string, unknown> {
  return typeof wartosc === "object" && wartosc !== null && !Array.isArray(wartosc);
}

/** Zwraca id maila z Resend albo null (brak klucza, błąd HTTP, błąd sieci). */
export async function wyslijMail(tresc: TrescMaila, replyTo: string): Promise<string | null> {
  const klucz = process.env.RESEND_API_KEY;
  if (!klucz) {
    console.error("[formularz] Mail pominięty: brak RESEND_API_KEY");
    return null;
  }
  try {
    const odpowiedz = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${klucz}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_NOTIFY_FROM ?? DOMYSLNY_NADAWCA,
        to: [process.env.LEAD_NOTIFY_TO ?? DOMYSLNY_ODBIORCA],
        reply_to: replyTo,
        subject: tresc.temat,
        text: tresc.tekst,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!odpowiedz.ok) {
      console.error(`[formularz] Resend zwrócił HTTP ${odpowiedz.status}`);
      return null;
    }
    const json: unknown = await odpowiedz.json();
    return jestObiektem(json) && typeof json.id === "string" ? json.id : null;
  } catch (blad) {
    console.error(`[formularz] Błąd wysyłki maila: ${blad instanceof Error ? blad.name : "nieznany"}`);
    return null;
  }
}
