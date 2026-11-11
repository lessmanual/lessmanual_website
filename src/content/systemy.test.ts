import { describe, expect, it } from "vitest";
import { PATHS, SYSTEMS } from "./site";
import { SYSTEM_PAGES, SYSTEMS_INDEX, VISIBLE_CARDS, getSystemPage } from "./systemy";

const BANNED = ["transformacja", "rewolucja", "innowacyjn", "agentic workflows", "Claude Code", "—"];
const START_SLUGS = [
  "odczyt-dokumentow",
  "okazje-sprzedazowe-i-przetargi",
  "panel-firmy",
  "tresci-sklepu-pod-google",
];

describe("system pages", () => {
  it("builds exactly the four START pages that site.ts links to, in card order", () => {
    const linked = SYSTEMS.cards.filter((card) => card.visible && card.pageHref).map((card) => card.slug);
    expect(SYSTEM_PAGES.map((page) => page.slug)).toEqual(linked);
    expect(SYSTEM_PAGES.map((page) => page.slug).sort()).toEqual([...START_SLUGS].sort());
  });

  it("has no page for retired or hidden slugs so the route can call notFound()", () => {
    for (const slug of ["zamowienia-sms", "zapytania-ofertowe", "wyszukiwanie-przetargow", "tresci-sklepu"]) {
      expect(getSystemPage(slug)).toBeUndefined();
    }
  });

  it("index shows only visible cards", () => {
    expect(VISIBLE_CARDS.every((card) => card.visible)).toBe(true);
    expect(VISIBLE_CARDS).toHaveLength(4);
  });

  it("keeps meta title within 60 characters and description within 155", () => {
    for (const page of [...SYSTEM_PAGES, SYSTEMS_INDEX]) {
      expect(page.metaTitle.length).toBeLessThanOrEqual(60);
      expect(page.metaDescription.length).toBeLessThanOrEqual(155);
    }
  });

  it("puts the word system in every H1 or names the panel", () => {
    for (const page of SYSTEM_PAGES) {
      expect(page.h1.toLowerCase()).toContain("system");
    }
  });

  it("gives every page a lead, problem, how-it-works list, effect and FAQ", () => {
    for (const page of SYSTEM_PAGES) {
      expect(page.lead.length).toBeGreaterThan(0);
      expect(page.problem.length).toBeGreaterThan(0);
      expect(page.howItWorks.length).toBeGreaterThanOrEqual(3);
      expect(page.effect.length).toBeGreaterThan(0);
      expect(page.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("has a canonical URL under www.lessmanual.ai/systemy", () => {
    for (const page of SYSTEM_PAGES) {
      expect(page.url).toBe(`https://www.lessmanual.ai/systemy/${page.slug}`);
    }
  });

  it("shows no amount in page FAQs: price is only 'kilkanaście tysięcy zł netto'", () => {
    const text = SYSTEM_PAGES.flatMap((page) => page.faq.map((item) => item.a)).join(" ");
    expect(text.match(/\d[\d ]*\s?zł/g)).toBeNull();
  });

  it("ties every page to the three entry paths from site.ts", () => {
    expect(PATHS.items.map((path) => path.id)).toEqual(["A", "B", "C"]);
  });

  it("does not use banned words", () => {
    const text = JSON.stringify([SYSTEM_PAGES.map((page) => [page.h1, page.lead, page.problem, page.howItWorks, page.effect, page.faq, page.metaTitle, page.metaDescription]), SYSTEMS_INDEX]);
    for (const word of BANNED) {
      expect(text).not.toContain(word);
    }
  });
});
