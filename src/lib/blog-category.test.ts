import { describe, expect, it } from "vitest";
import { categoryLabel } from "./blog-category";

describe("categoryLabel", () => {
  it("mapuje znane slugi na polskie etykiety bez nazw starych produktów", () => {
    expect(categoryLabel("pipeline-machine")).toBe("Sprzedaż B2B");
    expect(categoryLabel("content-machine")).toBe("Treści i SEO");
  });

  it("dla nieznanego sluga zamienia myślniki na spacje i dodaje wielką literę", () => {
    expect(categoryLabel("nowy-temat")).toBe("Nowy temat");
  });
});
