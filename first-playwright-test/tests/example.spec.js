// @ts-check
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("test demo DOM", async ({page}) => {
  await page.goto('https://www.google.com/');
  const locator1 = page.locator("#L2AGLb");
  await locator1.click();
  const locator = page.getByRole('combobox', {name: "Rech."});
  await locator.fill("Test");
})
