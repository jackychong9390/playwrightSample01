const { test, expect } = require('@playwright/test');
const { GooglePage } = require('../pages/GooglePage');
const { log } = require('../utils/logger');

test('Google search Wikipedia test', async ({ page }) => {
  log('Test started');

  const google = new GooglePage(page);

  await google.open();
  await google.acceptCookies();
  await google.search('Wikipedia');
  await google.clickWikipediaResult();

  log('Waiting for Wikipedia page to fully load...');
  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL(/wikipedia\.org/);

  log('Test completed');
});
