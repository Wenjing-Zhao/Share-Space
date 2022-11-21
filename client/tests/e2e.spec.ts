import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Search bar in homepage", () => {
  test("Search bar and dropdown", async ({ page }) => {
    const searchBar = page.locator("data-test-id=search-bar");
    const clearButton = page.locator("data-test-id=clear-button");
    const sugggestion = page.locator("data-test-id=sugggestion-0");
    const spaceImage = page.locator("data-test-id=space-image");

    // fill something in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("Clear me");

    // click clear button
    await page.waitForTimeout(2000);
    await clearButton.click();
    // expect the input value is empty
    await expect(searchBar).toHaveValue("");

    // fill key words in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("canada");

    // click the first option of dropdown
    await page.waitForTimeout(2000);
    await sugggestion.click();

    // expect the image exist.
    await page.waitForTimeout(2000);
    await expect(spaceImage).toHaveCount(1);
  });
});

test.describe("Find all spaces button in homepage", () => {
  test("Verify the find all spaces button", async ({ page }) => {
    const allSpacesButton = page.locator("data-test-id=all-spaces-button");
    const allSpacesTitle = page.locator("data-test-id=all-spaces-title");

    // click find all spaces button
    await page.waitForTimeout(2000);
    await allSpacesButton.click();

    // expect the title exist
    await page.waitForTimeout(2000);
    await expect(allSpacesTitle).toHaveCount(1);
  });
});
