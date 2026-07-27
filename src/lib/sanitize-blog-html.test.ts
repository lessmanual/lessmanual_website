import { describe, expect, it } from "vitest";
import { sanitizeBlogHtml } from "./sanitize-blog-html";

describe("sanitizeBlogHtml", () => {
  it("removes executable markup and unsafe URLs", () => {
    const html = [
      '<script>alert("xss")</script>',
      '<img src="https://example.com/image.jpg" onerror="alert(1)">',
      '<a href="javascript:alert(1)">niebezpieczny link</a>',
    ].join("");

    const result = sanitizeBlogHtml(html);

    expect(result).not.toContain("<script");
    expect(result).not.toContain("alert");
    expect(result).not.toContain("onerror");
    expect(result).not.toContain("javascript:");
  });

  it("keeps the editorial elements used in published articles", () => {
    const html =
      '<h2 id="proces">Proces</h2><p>Treść z <strong>ważnym</strong> fragmentem.</p><a href="https://www.lessmanual.ai/oferta">Oferta</a>';

    const result = sanitizeBlogHtml(html);

    expect(result).toContain('<h2 id="proces">Proces</h2>');
    expect(result).toContain("<strong>ważnym</strong>");
    expect(result).toContain('href="https://www.lessmanual.ai/oferta"');
  });
});
