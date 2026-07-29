import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

describe("Markdown route cache headers", () => {
  it("separates Markdown responses from negotiated HTML responses", async () => {
    const response = await GET(
      new NextRequest("http://localhost:3000/md"),
      { params: Promise.resolve({ slug: [] }) },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("vary")).toContain("Accept");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
  });

  it.each([
    "hot-lead-catcher",
    "pipeline-machine",
    "content-machine",
    "obsluga-klienta",
    "generator-ofert",
    "indywidualne-wdrozenia",
  ])("serves the Markdown variant for %s", async (productSlug) => {
    const response = await GET(
      new NextRequest(`http://localhost:3000/md/oferta/${productSlug}`),
      {
        params: Promise.resolve({
          slug: ["oferta", productSlug],
        }),
      },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
  });
});
