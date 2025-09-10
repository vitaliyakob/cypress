import { Locator, Page } from "@playwright/test";

export async function scrollUntilVisible(page: Page, locator: Locator, step: number = 200, timeout: number = 10000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    // Якщо елемент уже видно – виходимо
    if (await locator.isVisible()) {
      return;
    }

    // Скролимо вниз на step px
    await page.evaluate((step) => {
      window.scrollBy(0, step);
    }, step);

    // Трохи зачекаємо, щоб DOM встиг оновитися
    await page.waitForTimeout(300);
  }

  throw new Error(`Element ${locator} not visible after ${timeout}ms of scrolling`);
}