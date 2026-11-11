import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

// Mapa 301 ze starej oferty na nowe systemy (11.11.2026): ruch z Google na /oferta/* nie ma trafić w 404.
async function redirectMap() {
  const rules = (await nextConfig.redirects?.()) ?? [];
  return rules;
}

function resolve(
  rules: Awaited<ReturnType<typeof redirectMap>>,
  pathname: string,
): string | undefined {
  for (const rule of rules) {
    const pattern = rule.source.replace(/\/:path\*$/, "(?:/.*)?");
    if (new RegExp(`^${pattern}$`).test(pathname)) return rule.destination;
  }
  return undefined;
}

describe("redirects from the retired offer pages", () => {
  // Spec budowy wymaga 301 (nie 308, które Next daje dla `permanent: true`), bo część narzędzi SEO
  // i starsze klienty HTTP traktują 301 jako jedyny pewny sygnał przeniesienia adresu.
  it("are all 301", async () => {
    const rules = await redirectMap();
    expect(rules.length).toBeGreaterThan(0);
    expect(rules.every((rule) => "statusCode" in rule && rule.statusCode === 301)).toBe(true);
  });

  it.each([
    ["/oferta", "/systemy"],
    ["/oferta/hot-lead-catcher", "/systemy/okazje-sprzedazowe-i-przetargi"],
    ["/oferta/content-machine", "/systemy/tresci-sklepu-pod-google"],
    ["/oferta/content-machine/cennik", "/systemy/tresci-sklepu-pod-google"],
    ["/oferta/seo-content", "/systemy/tresci-sklepu-pod-google"],
    ["/oferta/seo-content/x", "/systemy/tresci-sklepu-pod-google"],
    ["/oferta/pipeline-machine", "/systemy"],
    ["/oferta/ai-sdr", "/systemy"],
    ["/oferta/obsluga-klienta", "/systemy"],
    ["/oferta/generator-ofert", "/systemy"],
    ["/oferta/indywidualne-wdrozenia", "/"],
    ["/oferta/cokolwiek-innego", "/systemy"],
    ["/systemy/wyszukiwanie-przetargow", "/systemy/okazje-sprzedazowe-i-przetargi"],
    ["/systemy/tresci-sklepu", "/systemy/tresci-sklepu-pod-google"],
    ["/systemy/zapytania-ofertowe", "/systemy"],
    ["/demo-hero", "/"],
    ["/demo-hero-final", "/"],
    ["/demo-layouts", "/"],
  ])("sends %s to %s", async (from, to) => {
    expect(resolve(await redirectMap(), from)).toBe(to);
  });
});
