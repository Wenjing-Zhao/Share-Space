import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

// ----------
// Search bar
// ----------
test.describe("Search bar in homepage", () => {
  test("Search bar and dropdown", async ({ page }) => {
    const searchBar = page.locator("data-test-id=search-bar");
    const clearButton = page.locator("data-test-id=clear-button");
    const sugggestion = page.locator("data-test-id=sugggestion-0");
    const spaceImage = page.locator("data-test-id=space-image");

    // click on search bar and focus input box
    await page.waitForTimeout(2000);
    await searchBar.click();

    // fill invalid value in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("Clear");

    // click clear button
    await page.waitForTimeout(2000);
    await clearButton.click();
    // expect the value is cleared
    await expect(searchBar).toHaveValue("");

    // click on search bar and focus input box
    await page.waitForTimeout(2000);
    await searchBar.click();

    // fill valid value in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("canada");

    // click clear button
    await page.waitForTimeout(2000);
    await clearButton.click();
    // expect the value and dropdown is cleared
    await expect(searchBar).toHaveValue("");
    await expect(sugggestion).toHaveCount(0);

    // click on search bar and focus input box
    await page.waitForTimeout(2000);
    await searchBar.click();

    // fill valid value in the input
    await page.waitForTimeout(2000);
    await searchBar.fill("Qc");

    // click on the first option of dropdown
    await page.waitForTimeout(2000);
    await sugggestion.click();
    // expect to the first space of dropdown and image exist
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(
      "http://localhost:3000/spaces/f798a433-967f-4f39-bca5-4273bd68db5f"
    );
    await expect(spaceImage).toHaveCount(1);
  });
});

// ----------------
// All space button
// ----------------
test.describe("Find all spaces button in homepage", () => {
  test("Verify the find all spaces button", async ({ page }) => {
    const allSpacesButton = page.locator("data-test-id=all-spaces-button");
    const allSpacesTitle = page.locator("data-test-id=all-spaces-title");

    // click "find All Spaces" button
    await page.waitForTimeout(2000);
    await allSpacesButton.click();
    // expect to the all spaces page and title exist
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("http://localhost:3000/spaces");
    await expect(allSpacesTitle).toHaveCount(1);
  });
});

// ------------
// User sign in
// ------------
test.describe("User sign in", () => {
  test("User sign in on the homepage", async ({ page }) => {
    // click on link to sign in
    await page.waitForTimeout(2000);
    await page.getByRole("link", { name: "Sign in" }).click();

    // fill valid email and password
    await page.waitForTimeout(2000);
    await page.getByLabel("Email address").click();
    await page.getByLabel("Email address").fill("celia1218@yeah.net");

    await page.waitForTimeout(2000);
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("Syl-881213");

    // click continue button
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "Continue" }).click();
    // expect to the homepage
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("User sign in on space page", async ({ page }) => {
    const allSpacesButton = page.locator("data-test-id=all-spaces-button");

    // click "find All Spaces" button
    await page.waitForTimeout(2000);
    await allSpacesButton.click();
    // expect to the spaces page
    await expect(page).toHaveURL("http://localhost:3000/spaces");

    // click on the first space iamge
    await page.waitForTimeout(2000);
    await page.locator(".sc-cjibBx").first().click();
    // expect to the first space page
    await expect(page).toHaveURL(
      "http://localhost:3000/spaces/f798a433-967f-4f39-bca5-4273bd68db5f"
    );

    // click on the link to sign in page on the space page
    await page.waitForTimeout(2000);
    await page
      .locator('p:has-text("Contact the host now? You can Sign in.")')
      .getByRole("link", { name: "Sign in" })
      .click();

    // fill valid email and password
    await page.waitForTimeout(2000);
    await page.getByLabel("Email address").click();
    await page.getByLabel("Email address").fill("celia1218@yeah.net");

    await page.waitForTimeout(2000);
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("Syl-881213");

    // click continue button
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "Continue" }).click();
    // expect to the homepage
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
