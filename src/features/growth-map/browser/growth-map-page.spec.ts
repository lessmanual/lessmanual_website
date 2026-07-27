import { expect, test } from "@playwright/test";

test.describe("Growth Map public page", () => {
  test("prepares a manual email without calling the automation endpoint", async ({ page }) => {
    const automationRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/api/lead-magnet/growth-map")) {
        automationRequests.push(request.url());
      }
    });

    await page.goto("/ai-growth-opportunity-map");

    await page.getByLabel("E-mail").fill("bartek@example.com");
    await page.getByLabel("Firma").fill("Example SA");
    await page.getByLabel("Strona firmy").fill("example.com");
    await page.getByRole("button", { name: "Dalej" }).click();

    await page.getByLabel("Na jakich systemach pracuje dziś firma?").fill("ClickUp, Google Sheets");
    await page.getByLabel("Co dziś najbardziej blokuje pracę lub wzrost?").fill(
      "Ręczne przepisywanie zapytań zajmuje zespołowi zbyt dużo czasu.",
    );
    await page.getByLabel("Ile razy w tygodniu ten proces się powtarza?").fill("125");
    await page.getByLabel("Ile minut zajmuje jeden przypadek?").fill("12");
    await page.getByLabel(/Zgadzam się na kontakt/).check();
    await page.getByLabel(/Zgadzam się na sprawdzenie strony firmy/).check();
    await page.getByRole("button", { name: "Przygotuj wiadomość e-mail" }).click();

    await expect(page.getByRole("heading", { name: "Zgłoszenie gotowe do wysłania" })).toBeVisible();
    const emailLink = page.getByRole("link", { name: "Otwórz gotową wiadomość e-mail" });
    await expect(emailLink).toHaveAttribute("href", /^mailto:kontakt@lessmanual\.ai\?/);
    await expect(emailLink).toHaveAttribute("href", /Mapa%20pierwszego%20procesu%20AI%3A%20Example%20SA/);
    expect(automationRequests).toEqual([]);
  });
});
