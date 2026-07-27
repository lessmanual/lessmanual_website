import { afterEach, describe, expect, it } from "vitest";
import { trackEvent } from "@/lib/analytics";

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
