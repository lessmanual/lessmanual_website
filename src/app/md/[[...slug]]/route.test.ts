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
});
