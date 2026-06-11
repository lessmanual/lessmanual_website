export type SafeDraftRateLimitScope = "ip" | "email" | "session";

export type SafeDraftRateLimitPolicy = {
  windowMs: number;
  maxPerIp: number;
  maxPerEmail: number;
  maxPerSession: number;
};

export type SafeDraftRateLimitCheckInput = {
  nowMs: number;
  ipHash: string | null;
  emailHash: string;
  sessionHash: string | null;
};

export type SafeDraftRateLimitResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      scope: SafeDraftRateLimitScope;
      retryAfterSeconds: number;
    };

export type SafeDraftRateLimiterPort = {
  check(input: SafeDraftRateLimitCheckInput): Promise<SafeDraftRateLimitResult>;
};

type RateLimitHit = {
  scope: SafeDraftRateLimitScope;
  key: string;
  atMs: number;
};

export function createMemorySafeDraftRateLimiter(policy: SafeDraftRateLimitPolicy): SafeDraftRateLimiterPort {
  const hits: RateLimitHit[] = [];

  return {
    async check(input) {
      removeExpiredHits(hits, input.nowMs, policy.windowMs);

      const scopes = rateLimitScopes(input);
      for (const scope of scopes) {
        const maxAttempts = maxAttemptsForScope(scope.scope, policy);
        if (maxAttempts <= 0) {
          return {
            ok: false,
            scope: scope.scope,
            retryAfterSeconds: retryAfterSeconds(hits, scope, input.nowMs, policy.windowMs),
          };
        }

        const count = hits.filter((hit) => hit.scope === scope.scope && hit.key === scope.key).length;
        if (count >= maxAttempts) {
          return {
            ok: false,
            scope: scope.scope,
            retryAfterSeconds: retryAfterSeconds(hits, scope, input.nowMs, policy.windowMs),
          };
        }
      }

      for (const scope of scopes) {
        hits.push({ scope: scope.scope, key: scope.key, atMs: input.nowMs });
      }

      return { ok: true };
    },
  };
}

function rateLimitScopes(input: SafeDraftRateLimitCheckInput): { scope: SafeDraftRateLimitScope; key: string }[] {
  const scopes: { scope: SafeDraftRateLimitScope; key: string }[] = [{ scope: "email", key: input.emailHash }];

  if (input.ipHash) {
    scopes.push({ scope: "ip", key: input.ipHash });
  }

  if (input.sessionHash) {
    scopes.push({ scope: "session", key: input.sessionHash });
  }

  return scopes;
}

function maxAttemptsForScope(scope: SafeDraftRateLimitScope, policy: SafeDraftRateLimitPolicy): number {
  if (scope === "ip") {
    return policy.maxPerIp;
  }

  if (scope === "session") {
    return policy.maxPerSession;
  }

  return policy.maxPerEmail;
}

function removeExpiredHits(hits: RateLimitHit[], nowMs: number, windowMs: number): void {
  const oldestAllowedMs = nowMs - windowMs;
  let index = hits.length - 1;
  while (index >= 0) {
    if (hits[index]?.atMs <= oldestAllowedMs) {
      hits.splice(index, 1);
    }
    index -= 1;
  }
}

function retryAfterSeconds(
  hits: RateLimitHit[],
  scope: { scope: SafeDraftRateLimitScope; key: string },
  nowMs: number,
  windowMs: number
): number {
  const oldestHit = hits
    .filter((hit) => hit.scope === scope.scope && hit.key === scope.key)
    .sort((left, right) => left.atMs - right.atMs)[0];

  if (!oldestHit) {
    return Math.ceil(windowMs / 1000);
  }

  return Math.max(1, Math.ceil((oldestHit.atMs + windowMs - nowMs) / 1000));
}
