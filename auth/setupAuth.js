const { chromium } = require('@playwright/test');
require('dotenv').config({ path: '.env.staging' });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(process.env.BASE_URL);
  await page.locator('input[type="email"]').fill(process.env.EMAIL);
  await page.locator('input[type="password"]').fill(process.env.PASSWORD);
  await page.locator('button[type="submit"]').click();

  await page.waitForURL(`${process.env.BASE_URL}/admin/dashboard`);

  await page.context().storageState({ path: 'storage/stagingAuth.json' });

  await browser.close();
})
();
