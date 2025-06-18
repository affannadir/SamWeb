const { test, expect } = require('@playwright/test');
const {AdminDashboardPage} = require('../pageObjects/AdminDashboardPage')
require('dotenv').config(); 

test('Super Admin can login, search and navigate to DSP Panel', async ({ page }) => {
  const dashboard = new AdminDashboardPage(page);

  await page.goto(`${process.env.BASE_URL}/admin/dashboard`);

  await dashboard.searchDSP('Ratnam & Co.');
  await dashboard.openDSPPanel();

  await expect(page).toHaveURL(/.*\/dsp\/dashboard/);
});
