import { describe, expect, it } from "vitest";
import { generateFaqPageSchema } from "@/lib/schema";
import { HOME_V4 } from "./home-v4";

describe("FAQPage z tekstów v4", () => {
  it("FAQPage ma 7 pytań z tekstów v4 w tej samej kolejności co na stronie", () => {
    const s = generateFaqPageSchema(HOME_V4.faq.pytania);
    expect(s.mainEntity.map((e) => e.name)).toEqual(HOME_V4.faq.pytania.map((p) => p.q));
    expect(s.mainEntity).toHaveLength(7);
  });

  it("odpowiedzi w schemacie są 1:1 z widocznymi na stronie", () => {
    const s = generateFaqPageSchema(HOME_V4.faq.pytania);
    expect(s.mainEntity.map((e) => e.acceptedAnswer.text)).toEqual(HOME_V4.faq.pytania.map((p) => p.a));
  });

  it("identyfikatory pytań są unikalne (kotwice #pytanie-<id>) i zawierają obietnicę", () => {
    const ids = HOME_V4.faq.pytania.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("obietnica");
  });
});
