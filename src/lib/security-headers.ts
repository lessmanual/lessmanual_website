export type WebsiteSecurityHeader = {
  key: string;
  value: string;
};

export function buildContentSecurityPolicy(
  isDevelopment: boolean,
  supabaseUrl?: string,
): string {
  const supabaseOrigin = readHttpsOrigin(supabaseUrl);
  const scriptSources = [
    "'self'",
    "'unsafe-inline'",
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
    "https://www.googletagmanager.com",
  ];
  const connectSources = [
    "'self'",
    ...(supabaseOrigin
      ? [supabaseOrigin, supabaseOrigin.replace(/^https:/, "wss:")]
      : []),
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://www.googletagmanager.com",
    ...(isDevelopment
      ? ["ws://localhost:*", "ws://127.0.0.1:*"]
      : []),
  ];
  const directives = [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src ${connectSources.join(" ")}`,
    "frame-src https://cal.com",
    "media-src 'self' data: blob:",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    ...(!isDevelopment ? ["upgrade-insecure-requests"] : []),
  ];

  return directives.join("; ");
}

export function buildSecurityHeaders(
  isDevelopment: boolean,
  supabaseUrl?: string,
): Array<WebsiteSecurityHeader> {
  return [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(isDevelopment, supabaseUrl),
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=31536000",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()",
    },
  ];
}

function readHttpsOrigin(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.hostname.includes("*")
    ) {
      return undefined;
    }

    return url.origin;
  } catch {
    return undefined;
  }
}
