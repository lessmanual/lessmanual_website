"use client";

import { ZDARZENIE_USTAWIEN_COOKIES } from "@/lib/consent";

// Wycofanie zgody ma być tak samo łatwe jak jej udzielenie (art. 7 ust. 3 RODO): przycisk w stopce
// otwiera drugą warstwę banera cookies.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(ZDARZENIE_USTAWIEN_COOKIES))}
    >
      Ustawienia cookies
    </button>
  );
}
