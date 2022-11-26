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

    // fill invalid value in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("Clear");

    // click clear button
    await page.waitForTimeout(2000);
    await clearButton.click();
    // expect the value is cleared
    await expect(searchBar).toHaveValue("");

    // fill valid value in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("canada");

    // click clear button
    await page.waitForTimeout(2000);
    await clearButton.click();
    // expect the value and dropdown is cleared
    await expect(searchBar).toHaveValue("");
    await expect(sugggestion).toHaveCount(0);

    // fill valid value in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("Qc");

    // click on the first option of dropdown
    await page.waitForTimeout(2000);
    await sugggestion.click();

    // expect the image exist
    await page.waitForTimeout(2000);
    await expect(spaceImage).toHaveCount(1);
  });
});

test.describe("Find all spaces button in homepage", () => {
  test("Verify the find all spaces button", async ({ page }) => {
    const allSpacesButton = page.locator("data-test-id=all-spaces-button");
    const allSpacesTitle = page.locator("data-test-id=all-spaces-title");

    // click ”find All Spaces" button
    await page.waitForTimeout(2000);
    await allSpacesButton.click();

    // expect the title exist
    await page.waitForTimeout(2000);
    await expect(allSpacesTitle).toHaveCount(1);
  });
});
