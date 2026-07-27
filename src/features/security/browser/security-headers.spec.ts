import { expect, test } from "@playwright/test";

test.describe("website security headers", () => {
  test("protects key journeys without CSP violations", async ({ page }) => {
    const cspViolations: string[] = [];
    page.on("console", (message) => {
      const text = message.text();
      if (
        message.type() === "error" &&
        (text.includes("Content Security Policy") ||
          text.includes("Refused to load") ||
          text.includes("Refused to connect"))
      ) {
        cspViolations.push(text);
      }
    });

    for (const path of ["/", "/kontakt", "/ai-growth-opportunity-map"]) {
      const response = await page.goto(path);
      if (!response) {
        throw new Error(`Expected an HTTP response for ${path}`);
      }

      const headers = response.headers();
      expect(headers["content-security-policy"]).toContain("default-src 'self'");
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["x-frame-options"]).toBe("DENY");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["permissions-policy"]).toContain("camera=()");
    }

    expect(cspViolations).toEqual([]);
  });
});
