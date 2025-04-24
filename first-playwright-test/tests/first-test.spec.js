import { expect, test } from "@playwright/test";

test('Amazon Website', async ({page}) => {
    //ARRANGE

    // ACT
    await page.goto("https://www.amazon.com/s?k=phone&sprefix=phone");
    await page.getByText("Samsung Galaxy A16 5G A").click();

    // ASSERT 
    await expect(page.getByRole("heading", {name: "About this item"})).toBeVisible()
})