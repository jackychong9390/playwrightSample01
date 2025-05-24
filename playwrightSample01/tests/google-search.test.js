const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Google
  await page.goto('https://www.google.com');

  // Accept cookies if the consent page appears (common in Europe)
  const consentButton = page.locator('button:has-text("I agree"), button:has-text("Accept all")');
  if (await consentButton.count()) {
    await consentButton.first().click();
  }

  // Search for Wikipedia
  await page.fill('input[name="q"]', 'Wikipedia');
  await page.keyboard.press('Enter');

  // Wait for results and click on Wikipedia link
  await page.waitForSelector('h3');
  const wikipediaLink = page.locator('h3', { hasText: 'Wikipedia' });
  await wikipediaLink.first().click();

  // Wait for Wikipedia to load
  await page.waitForLoadState('domcontentloaded');

  // Close browser
  await browser.close();
})();
