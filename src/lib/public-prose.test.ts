import { describe, expect, it } from "vitest";
import { normalizePublicProse } from "./public-prose";

describe("public prose normalization", () => {
  it("removes em dashes from published copy", () => {
    expect(normalizePublicProse("Problem — rozwiązanie")).toBe(
      "Problem - rozwiązanie",
    );
    expect(normalizePublicProse("<p>Problem—rozwiązanie</p>")).toBe(
      "<p>Problem - rozwiązanie</p>",
    );
  });
});
