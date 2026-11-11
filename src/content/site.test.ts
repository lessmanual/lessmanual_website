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

// 11.11 publicznie 4 opinie (stan Map Google); dane dla Google muszą zgadzać się z wizytówką.
describe("ocena Google", () => {
  it("ma 4 opinie i 5,0, jak wizytówka w Mapach Google 11.11", () => {
    expect(PROOF.google?.reviews).toBe(4);
    expect(PROOF.google?.ratingValue).toBe(5);
  });
});
