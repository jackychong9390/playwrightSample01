const { chromium } = require('playwright');
const { GooglePage } = require('../pages/GooglePage');
const { log } = require('../utils/logger');

(async () => {
  log('Launching browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const google = new GooglePage(page);

  await google.open();
  await google.acceptCookies();
  await google.search('Wikipedia');
  await google.clickWikipediaResult();

  log('Waiting for Wikipedia page to fully load...');
  await page.waitForLoadState('domcontentloaded');

  log('Test completed, closing browser.');
  await browser.close();
})();
