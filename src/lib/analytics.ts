type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams): boolean {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
    return true;
  }

  return false;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
