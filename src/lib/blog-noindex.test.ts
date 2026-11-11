import { describe, expect, it } from "vitest";
import { NOINDEX_BLOG_SLUGS, isNoindexBlogSlug } from "./blog-noindex";

describe("blog noindex", () => {
  it("obejmuje 5 wpisów z listy CMO", () => {
    expect(NOINDEX_BLOG_SLUGS).toHaveLength(5);
    expect(isNoindexBlogSlug("ile-kosztuje-handlowiec-ai-polska")).toBe(true);
  });

  it("nie ukrywa pozostałych wpisów", () => {
    expect(isNoindexBlogSlug("ile-kosztuje-agent-ai-cennik-2026")).toBe(false);
  });
});
