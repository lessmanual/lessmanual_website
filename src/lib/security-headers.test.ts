import { describe, expect, it } from "vitest";
import {
  buildContentSecurityPolicy,
  buildSecurityHeaders,
} from "./security-headers";

describe("public website security headers", () => {
  it("builds a production CSP for the integrations used by the website", () => {
    const policy = buildContentSecurityPolicy(
      false,
      "https://project.supabase.co/rest/v1",
    );

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain(
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    );
    expect(policy).toContain(
      "connect-src 'self' https://project.supabase.co wss://project.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
    );
    expect(policy).not.toContain("*.supabase.co");
    expect(policy).toContain("frame-src https://cal.com");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("upgrade-insecure-requests");
    expect(policy).not.toContain("'unsafe-eval'");
    expect(policy).not.toContain("script-src *");
    expect(policy).not.toContain("\n");
  });

  it("allows the Next.js development runtime without weakening production", () => {
    const policy = buildContentSecurityPolicy(true);

    expect(policy).toContain("'unsafe-eval'");
    expect(policy).not.toContain("upgrade-insecure-requests");
  });

  it("ignores a non-HTTPS Supabase URL instead of injecting it into CSP", () => {
    const policy = buildContentSecurityPolicy(
      false,
      "http://127.0.0.1:54321",
    );

    expect(policy).not.toContain("127.0.0.1");
    expect(policy).not.toContain("54321");
  });

  it("ignores a wildcard Supabase host instead of widening connect-src", () => {
    const policy = buildContentSecurityPolicy(
      false,
      "https://*.supabase.co",
    );

    expect(policy).not.toContain("*.supabase.co");
  });

  it("adds one value for every global defence-in-depth header", () => {
    const headers = buildSecurityHeaders(false);
    const headerNames = headers.map((header) => header.key);

    expect(headerNames).toEqual([
      "Content-Security-Policy",
      "Strict-Transport-Security",
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
    ]);
    expect(new Set(headerNames).size).toBe(headerNames.length);
    expect(headers.find((header) => header.key === "X-Content-Type-Options")?.value).toBe("nosniff");
    expect(headers.find((header) => header.key === "X-Frame-Options")?.value).toBe("DENY");
    expect(headers.find((header) => header.key === "Referrer-Policy")?.value).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(headers.find((header) => header.key === "Permissions-Policy")?.value).toContain(
      "camera=()",
    );
  });
});
