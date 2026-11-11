import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

async function fetchMarkdown(slug: string[]) {
  return GET(new NextRequest(`http://localhost:3000/md/${slug.join("/")}`), {
    params: Promise.resolve({ slug }),
  });
}

describe("Markdown route cache headers", () => {
  it("separates Markdown responses from negotiated HTML responses", async () => {
    const response = await fetchMarkdown([]);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("vary")).toContain("Accept");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
  });

  it.each([
    "odczyt-dokumentow",
    "okazje-sprzedazowe-i-przetargi",
    "panel-firmy",
    "tresci-sklepu-pod-google",
  ])("serves the Markdown variant for system %s", async (systemSlug) => {
    const response = await fetchMarkdown(["systemy", systemSlug]);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
  });

  it.each(["wyszukiwanie-przetargow", "zapytania-ofertowe", "tresci-sklepu"])(
    "no longer serves the retired system slug %s",
    async (systemSlug) => {
      const response = await fetchMarkdown(["systemy", systemSlug]);

      expect(response.status).toBe(404);
    },
  );

  it("no longer serves the retired /oferta variants", async () => {
    const response = await fetchMarkdown(["oferta", "pipeline-machine"]);

    expect(response.status).toBe(404);
  });
});

describe("Markdown variants describe the current offer", () => {
  const RETIRED = ["Pipeline Machine", "Content Machine", "Hot Lead Catcher", "STARTER", "GROWTH"];

  it.each([[[]], [["faq"]], [["o-nas"]], [["kontakt"]], [["systemy"]]])(
    "does not mention retired products in %j",
    async (slug: string[]) => {
      const body = await (await fetchMarkdown(slug)).text();

      for (const phrase of RETIRED) {
        expect(body).not.toContain(phrase);
      }
    },
  );
});
