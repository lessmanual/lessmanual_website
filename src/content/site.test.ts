import { describe, expect, it } from "vitest";
import { PROOF, opinieLabel } from "./site";

// Pasek dowodów pokazuje liczbę opinii z Map Google; zła odmiana („4 opinii”) psuje zdanie.
describe("opinieLabel", () => {
  it.each([
    [1, "1 opinia"],
    [4, "4 opinie"],
    [5, "5 opinii"],
    [12, "12 opinii"],
    [22, "22 opinie"],
  ])("%i -> %s", (liczba, oczekiwane) => {
    expect(opinieLabel(liczba)).toBe(oczekiwane);
  });
});

// decyzja Bartka 11.11 i 12.11: 6 opinii (Search Console); widok Map bez logowania pokazuje 4.
describe("ocena Google", () => {
  it("ma 6 opinii i 5,0 (decyzja Bartka 12.11, Search Console)", () => {
    expect(PROOF.google?.reviews).toBe(6);
    expect(PROOF.google?.ratingValue).toBe(5);
  });
});
