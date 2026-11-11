import { describe, expect, it } from "vitest";
import { prepareBlogHtml, rewriteCalLinks, wrapTables } from "./blog-content";

describe("rewriteCalLinks", () => {
  it("kieruje każdy link cal.com na formularz, bo CTA bloga to formularz", () => {
    const html =
      '<a href="https://cal.com/lessmanual/30min" rel="noopener noreferrer">a</a><a href="https://app.cal.com/x?y=1">b</a>';
    expect(rewriteCalLinks(html)).toBe(
      '<a href="/#formularz" rel="noopener noreferrer">a</a><a href="/#formularz">b</a>',
    );
  });

  it("nie rusza innych linków ani domen kończących się podobnie", () => {
    const html = '<a href="https://example.com/cal.com">a</a><a href="https://notcal.com/x">b</a>';
    expect(rewriteCalLinks(html)).toBe(html);
  });
});

describe("wrapTables", () => {
  it("owija tabelę w kontener z przewijaniem poziomym", () => {
    const out = wrapTables("<p>x</p><table><tr><td>1</td></tr></table>");
    expect(out).toContain('<div class="lm-table-scroll"');
    expect(out.endsWith("</table></div>")).toBe(true);
  });

  it("zostawia treść bez tabel bez zmian", () => {
    expect(prepareBlogHtml("<p>x</p>")).toBe("<p>x</p>");
  });
});
