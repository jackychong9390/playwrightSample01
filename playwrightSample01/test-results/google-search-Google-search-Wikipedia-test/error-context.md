# Test info

- Name: Google search Wikipedia test
- Location: C:\Users\User\playwrightSample01\playwrightSample01\tests\google-search.spec.js:5:1

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('h3') to be visible
    - waiting for" https://www.google.com/search?q=Wikipedia&sca_esv=cbe0386980f25f64&source=hp&ei=kVgzaPnwEoyr4-EPhtDRyQ8&iflsig=AOw8s4IAAAAAaDNmoRnNjifEYHsOtn1lKhXTD_hw2soc&ved=0ahUKEwi5_bzRl7-NAxWM1TgGHQZoNPkQ4dUDCA…" navigation to finish...
    - navigated to "https://www.google.com/search?q=Wikipedia&sca_esv=cbe0386980f25f64&source=hp&ei=kVgzaPnwEoyr4-EPhtDRyQ8&iflsig=AOw8s4IAAAAAaDNmoRnNjifEYHsOtn1lKhXTD_hw2soc&ved=0ahUKEwi5_bzRl7-NAxWM1TgGHQZoNPkQ4dUDCA…"
    - waiting for" https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3DWikipedia%26sca_esv%3Dcbe0386980f25f64%26source%3Dhp%26ei%3DkVgzaPnwEoyr4-EPhtDRyQ8%26iflsig%3DAOw8s4IAAAAAaDNmoRnNjifE…" navigation to finish...
    - navigated to "https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3DWikipedia%26sca_esv%3Dcbe0386980f25f64%26source%3Dhp%26ei%3DkVgzaPnwEoyr4-EPhtDRyQ8%26iflsig%3DAOw8s4IAAAAAaDNmoRnNjifE…"

    at GooglePage.clickWikipediaResult (C:\Users\User\playwrightSample01\playwrightSample01\pages\GooglePage:35:21)
    at C:\Users\User\playwrightSample01\playwrightSample01\tests\google-search.spec.js:13:16
```

# Page snapshot

```yaml
- separator
- iframe
- separator
- text: About this page Our systems have detected unusual traffic from your computer network. This page checks to see if it's really you sending the requests, and not a robot.
- link "Why did this happen?":
  - /url: "#"
- text: "IP address: 193.36.237.30 Time: 2025-05-25T17:51:14Z URL: https://www.google.com/search?q=Wikipedia&sca_esv=cbe0386980f25f64&source=hp&ei=kVgzaPnwEoyr4-EPhtDRyQ8&iflsig=AOw8s4IAAAAAaDNmoRnNjifEYHsOtn1lKhXTD_hw2soc&ved=0ahUKEwi5_bzRl7-NAxWM1TgGHQZoNPkQ4dUDCA0&uact=5&oq=Wikipedia&gs_lp=Egdnd3Mtd2l6IglXaWtpcGVkaWFIClAAWABwAHgAkAEAmAEAoAEAqgEAuAEDyAEA-AEBmAIAoAIAmAMAkgcAoAcAsgcAuAcAwgcAyAcA&sclient=gws-wiz&sei=kVgzaMnvMI2s4-EP0qrLsAg"
```

# Test source

```ts
   1 | const locators = require('../locators/GoogleLocators');
   2 | const { log } = require('../utils/logger');
   3 |
   4 | class GooglePage {
   5 |   constructor(page) {
   6 |     this.page = page;
   7 |     this.searchInput = page.locator(locators.searchInput);
   8 |     this.resultLink = page.locator(locators.wikipediaLink, { hasText: 'Wikipedia' });
   9 |     this.acceptCookiesButton = page.locator(locators.acceptCookiesButton);
  10 |   }
  11 |
  12 |   async open() {
  13 |     log('Opening Google homepage...');
  14 |     await this.page.goto('https://www.google.com');
  15 |   }
  16 |
  17 |   async acceptCookies() {
  18 |     log('Checking for cookie consent...');
  19 |     if (await this.acceptCookiesButton.count()) {
  20 |       log('Clicking cookie consent button...');
  21 |       await this.acceptCookiesButton.first().click();
  22 |     } else {
  23 |       log('No cookie consent shown.');
  24 |     }
  25 |   }
  26 |
  27 |   async search(term) {
  28 |     log(`Typing in search term: "${term}" into textarea[name="q"]`);
  29 |     await this.searchInput.fill(term);
  30 |     await this.page.keyboard.press('Enter');
  31 |   }
  32 |
  33 |   async clickWikipediaResult() {
  34 |     log('Waiting for search result <h3> containing Wikipedia...');
> 35 |     await this.page.waitForSelector(locators.wikipediaLink);
     |                     ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  36 |     log('Clicking the Wikipedia result link...');
  37 |     await this.resultLink.first().click();
  38 |   }
  39 | }
  40 |
  41 | module.exports = { GooglePage };
  42 |
```