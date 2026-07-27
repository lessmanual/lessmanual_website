import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const constantsSource = readFileSync(
  join(process.cwd(), "src/lib/constants.ts"),
  "utf-8",
);
const faqBlock = constantsSource.slice(
  constantsSource.indexOf("export const FAQ_ITEMS"),
  constantsSource.indexOf("export const PROCESS_STEPS"),
);

describe("FAQ public copy", () => {
  it("uses conditional, verifiable delivery promises", () => {
    expect(faqBlock).toContain("Nie zakładamy tego bez diagnozy.");
    expect(faqBlock).toContain("Konkretny harmonogram dostajesz przed rozpoczęciem prac.");
    expect(faqBlock).toContain("Warunki rozliczenia oraz ewentualnej gwarancji");
    expect(faqBlock).toContain("W procesach o większym ryzyku człowiek zatwierdza wynik");
  });

  it("does not publish absolute compliance or outcome claims", () => {
    for (const phrase of [
      "80% problemów",
      "Gwarancja wyników lub pełny zwrot kosztów",
      "System zgodny z RODO i AI Act",
      "Dane przetwarzane na serwerach w EU",
      "nie wymyśla",
      "—",
    ]) {
      expect(faqBlock).not.toContain(phrase);
    }
  });
});
