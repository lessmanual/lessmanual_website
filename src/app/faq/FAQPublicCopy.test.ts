import { describe, expect, it } from "vitest";
import { FAQ } from "@/content/site";
import { generateFaqPageSchema } from "@/lib/schema";

// Stare nazwy produktów i ceny z poprzedniej oferty nie mogą wracać do FAQ (strona v3, 11.11.2026).
const FORBIDDEN = [
  "Pipeline Machine",
  "Content Machine",
  "Hot Lead Catcher",
  "STARTER",
  "GROWTH",
  "Claude Code",
  "agentic workflows",
  "transformacja",
  "rewolucja",
  "innowacyjn",
  "—",
];

describe("FAQ public copy", () => {
  it("has the eleven questions from TEKSTY v3", () => {
    expect(FAQ.items).toHaveLength(11);
  });

  it("exposes every question and answer in the FAQPage schema", () => {
    const schema = generateFaqPageSchema(FAQ.items);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(FAQ.items.length);
    FAQ.items.forEach((item, index) => {
      expect(schema.mainEntity[index]?.name).toBe(item.q);
      expect(schema.mainEntity[index]?.acceptedAnswer.text).toBe(item.a);
    });
  });

  it("does not mention old products, banned words or em-dash", () => {
    const text = FAQ.items.map((item) => `${item.q} ${item.a}`).join("\n");
    for (const phrase of FORBIDDEN) {
      expect(text).not.toContain(phrase);
    }
  });

  it("keeps the single price the site allows: Mapa AI firmy 6 900 zł netto", () => {
    const text = FAQ.items.map((item) => item.a).join("\n");
    const amounts = text.match(/\d[\d ]*\s?zł/g) ?? [];
    expect(amounts.every((amount) => amount.replace(/\s/g, "").includes("6900"))).toBe(true);
  });
});
