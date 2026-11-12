// Wspólna ścieżka „idź do formularza” (Tak, to u nas, kafle dróg): przewija do #formularz i przenosi fokus na jego
// nagłówek, żeby klawiatura i czytnik ekranu zaczęły w formularzu, a nie tam, gdzie był kliknięty przycisk.
export function przejdzDoFormularza(): void {
  const cel = document.getElementById("formularz");
  if (!cel) return;
  const bezRuchu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Płynne przewijanie o kilka tysięcy pikseli zatrzymywało się w połowie drogi (Chromium, 9000 px), więc daleki skok jest natychmiastowy.
  const daleko = Math.abs(cel.getBoundingClientRect().top) > 2 * window.innerHeight;
  cel.scrollIntoView({ block: "start", behavior: bezRuchu || daleko ? "instant" : "smooth" });
  // preventScroll: samo przewijanie już trwa, fokus nie może go przerwać ani skrócić.
  document.getElementById("formularz-title")?.focus({ preventScroll: true });
}
