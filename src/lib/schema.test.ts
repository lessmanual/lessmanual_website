import { describe, expect, it } from "vitest";
import { FAQ, LINKS, META, PROOF } from "@/content/site";
import {
  ORGANIZATION_NODE,
  ORGANIZATION_SCHEMA,
  generateAboutPageSchema,
  generateFaqPageSchema,
  generateServiceSchema,
  serializeJsonLd,
} from "./schema";

const organization = ORGANIZATION_NODE;

describe("ORGANIZATION_SCHEMA", () => {
  it("describes the company with the one sentence chatbots should quote", () => {
    expect(organization.name).toBe("LessManual.ai");
    expect(organization.description).toBe(META.llmsSentence);
    expect(organization.areaServed.name).toBe("Polska");
  });

  it("links the founder profile as sameAs", () => {
    expect(organization.sameAs).toEqual([LINKS.linkedinBartek]);
    expect(organization.founder.name).toBe("Bartłomiej Chudzik");
  });

  // AggregateRating tylko z prawdziwą oceną Google (11.11 publicznie 5,0 i 4 opinie w Mapach Google);
  // PROOF.google = null musi zdjąć pole, bo Google karze za ocenę bez pokrycia.
  it("carries the Google rating from PROOF as aggregateRating, or none when it is null", () => {
    const rating = PROOF.google;
    if (rating === null) {
      expect("aggregateRating" in organization).toBe(false);
      return;
    }
    expect(serializeJsonLd(ORGANIZATION_SCHEMA)).toContain("AggregateRating");
    expect(JSON.stringify(organization)).toContain(`"ratingValue":${rating.ratingValue}`);
    expect(JSON.stringify(organization)).toContain(`"reviewCount":${rating.reviews}`);
  });
});

describe("generateFaqPageSchema", () => {
  it("maps every question and answer 1:1", () => {
    const schema = generateFaqPageSchema(FAQ.items);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(11);
    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: FAQ.items[0]?.q,
      acceptedAnswer: { "@type": "Answer", text: FAQ.items[0]?.a },
    });
  });

  it("returns an empty entity list for no items", () => {
    expect(generateFaqPageSchema([]).mainEntity).toEqual([]);
  });
});

describe("generateServiceSchema", () => {
  it("keeps the signature used by the system pages and points at the organization", () => {
    const schema = generateServiceSchema({
      name: "System, który przepisuje dokumenty z maila do arkusza",
      description: "Opis",
      url: "https://www.lessmanual.ai/systemy/odczyt-dokumentow",
    });
    expect(schema["@type"]).toBe("Service");
    expect(schema.provider["@id"]).toBe("https://www.lessmanual.ai/#organization");
    expect(schema.areaServed.name).toBe("Polska");
  });
});

describe("generateAboutPageSchema", () => {
  it("describes Bartłomiej Chudzik as a person working for LessManual", () => {
    const schema = generateAboutPageSchema({
      name: "Kim jesteśmy",
      description: "Opis",
      url: "https://www.lessmanual.ai/o-nas",
    });
    expect(schema["@type"]).toBe("AboutPage");
    expect(schema.mainEntity["@type"]).toBe("Person");
    expect(schema.mainEntity.worksFor["@id"]).toBe("https://www.lessmanual.ai/#organization");
  });
});

describe("serializeJsonLd", () => {
  it("escapes the opening angle bracket so JSON-LD cannot close the script tag", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("</script>");
  });
});

describe("ORGANIZATION_SCHEMA graph", () => {
  it("contains the organization and the website nodes", () => {
    const types = ORGANIZATION_SCHEMA["@graph"].map((node) => node["@type"]);
    expect(types).toEqual(["Organization", "WebSite"]);
  });
});
