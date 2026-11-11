import { describe, expect, it } from "vitest";
import { optimizeContentImages, prepareBlogHtml, rewriteCalLinks, wrapTables } from "./blog-content";

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

// Obraz z Supabase Storage ma iść przez /_next/image, inne adresy zostają bez zmian.
describe("optimizeContentImages", () => {
  it("kieruje obrazy z Supabase Storage przez optymalizację Next", () => {
    const html = '<img src="https://mpshzmbgsupznnyhpyyl.supabase.co/storage/v1/object/public/blog-images/a b.png" alt="x">';
    expect(optimizeContentImages(html)).toBe(
      '<img src="/_next/image?url=https%3A%2F%2Fmpshzmbgsupznnyhpyyl.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fblog-images%2Fa%20b.png&amp;w=828&amp;q=75" alt="x">',
    );
  });

  it("nie rusza obrazów z innych domen", () => {
    const html = '<img src="https://example.com/a.png">';
    expect(optimizeContentImages(html)).toBe(html);
  });
});
