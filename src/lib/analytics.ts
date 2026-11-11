type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams): boolean {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return true;
  }

  return false;
}

// Consent Mode v2 (developers.google.com/tag-platform/security/guides/consent): `default` musi
// poprzedzić `config`. Analytics ładujemy dopiero po zgodzie, więc `window.gtag` w ogóle nie istnieje
// przed zgodą, a `trackEvent` zwraca false i nic nie trafia do dataLayer. Reklamowe sygnały zostają
// zawsze odrzucone, bo na stronie nie ma reklam. Brak `anonymize_ip`: w GA4 ta opcja nie działa.
export function zbudujSkryptGa(identyfikatorGa: string): string {
  const id = JSON.stringify(identyfikatorGa);
  return [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag = gtag;",
    "gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});",
    "gtag('consent','update',{analytics_storage:'granted'});",
    "gtag('js', new Date());",
    `gtag('config', ${id}, {cookie_flags: 'SameSite=None;Secure'});`,
  ].join("\n");
}

// Nazwy cookies Google Analytics (`_ga`, `_ga_<ID>`, `_gid`...) z ciągu `document.cookie`.
export function nazwyCookiesGa(ciag: string): string[] {
  return ciag
    .split(";")
    .map((fragment) => fragment.split("=")[0]?.trim() ?? "")
    .filter((nazwa) => nazwa.startsWith("_ga") || nazwa === "_gid" || nazwa === "_gat");
}

// Usuwa cookies GA z domeny bieżącej i `.lessmanual.ai` (ścieżka `/`). Zwraca liczbę usuniętych nazw.
export function usunCookiesGa(): number {
  const nazwy = nazwyCookiesGa(document.cookie);
  const host = window.location.hostname;
  const domeny = [undefined, host, `.${host}`, ".lessmanual.ai"];
  for (const nazwa of nazwy) {
    for (const domena of domeny) {
      const czesci = [`${nazwa}=`, "expires=Thu, 01 Jan 1970 00:00:00 GMT", "path=/"];
      if (domena !== undefined) czesci.push(`domain=${domena}`);
      document.cookie = czesci.join("; ");
    }
  }
  return nazwy.length;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
