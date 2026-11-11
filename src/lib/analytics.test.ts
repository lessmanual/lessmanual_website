import { afterEach, describe, expect, it } from "vitest";
import { nazwyCookiesGa, trackEvent, zbudujSkryptGa } from "@/lib/analytics";

describe("trackEvent", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("reports that an event was not sent without an active Google tag", () => {
    expect(trackEvent("growth_map_form_started")).toBe(false);
  });

  it("reports success only after passing the event to the active Google tag", () => {
    const calls: unknown[][] = [];
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        gtag: (...args: unknown[]) => calls.push(args),
      },
    });

    expect(
      trackEvent("growth_map_form_started", {
        delivery_mode: "manual_email",
      }),
    ).toBe(true);
    expect(calls).toEqual([
      [
        "event",
        "growth_map_form_started",
        {
          delivery_mode: "manual_email",
        },
      ],
    ]);
  });
});

describe("zbudujSkryptGa", () => {
  it("denies all consent types by default before config and never uses anonymize_ip", () => {
    const skrypt = zbudujSkryptGa("G-TEST123");
    expect(skrypt.indexOf("'consent','default'")).toBeLessThan(skrypt.indexOf("'config'"));
    for (const klucz of ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"]) {
      expect(skrypt).toContain(`${klucz}:'denied'`);
    }
    expect(skrypt).not.toContain("anonymize_ip");
    expect(skrypt).toContain('"G-TEST123"');
  });
});

describe("nazwyCookiesGa", () => {
  it("picks only Google Analytics cookie names", () => {
    expect(nazwyCookiesGa("a=1; _ga=GA1.1.2; _ga_ABC123=x; _gid=3; inne=4")).toEqual([
      "_ga",
      "_ga_ABC123",
      "_gid",
    ]);
    expect(nazwyCookiesGa("")).toEqual([]);
  });
});
