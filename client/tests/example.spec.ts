import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("homepage and search bar", () => {
  test("homepage has search bar and dropdown", async ({ page }) => {
    const searchBar = page.locator("data-test-id=search-bar");
    const clearButton = page.locator("data-test-id=clear-button");
    const sugggestion = page.locator("data-test-id=sugggestion-0");
    const spaceImage = page.locator("data-test-id=space-image");

    // fill something in the input
    await page.waitForTimeout(3000);
    await searchBar.fill("Clear me");

    // click clear button
    await page.waitForTimeout(3000);
    await clearButton.click();
    // expect the input value is empty
    await expect(searchBar).toHaveValue("");

    // fill key words in the input
    await page.waitForTimeout(3000);
    await searchBar.fill("canada");

    // click the first option of dropdown
    await page.waitForTimeout(3000);
    await sugggestion.click();

    // expect the image exist.
    await page.waitForTimeout(3000);
    await expect(spaceImage).toHaveCount(1);
  });
});
