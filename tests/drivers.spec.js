const { test, expect } = require('@playwright/test');
const { AdminDashboardPage } = require('../pageObjects/AdminDashboardPage');
const { DriversPage } = require('../pageObjects/DriversPage');
const testData = require('../testData');
require('dotenv').config();

async function setup(page) {
    const dashboard = new AdminDashboardPage(page);
    const driversPage = new DriversPage(page);

    await page.goto(`${process.env.BASE_URL}/admin/dashboard`);
    await dashboard.searchDSP(testData.dspName);
    await dashboard.openDSPPanel();

    return { dashboard, driversPage };
}

// test('Switch between drivers tabs', async ({ page }) => {
//     const { driversPage } = await setup(page);

//     await driversPage.gotoDriversModule();

//     await driversPage.switchToActiveDrivers();
//     await expect(page.locator("//p[normalize-space()='Active Drivers']")).toBeVisible();

//     await driversPage.switchToOnboardingDrivers();
//     await expect(page.locator("//p[normalize-space()='Onboarding Drivers']")).toBeVisible();

//     await driversPage.switchToInactiveDrivers();
//     await expect(page.locator("(//p[normalize-space()='Inactive Drivers'])[1]")).toBeVisible();
// });

// test('Verify the Customer Name filter in Active Drivers', async ({ page }) => {
//     const { driversPage } = await setup(page);

//     await driversPage.gotoDriversModule();
//     await driversPage.filterByCustomer(testData.filters.customer);
//     await driversPage.verifyFilterApplied(
//         testData.filters.expectedResult,
//         testData.filters.customerFilterText
//     );
// });

test('Verify the driver search', async ({ page }) => {
    const { driversPage } = await setup(page);

    await driversPage.gotoDriversModule();
    await driversPage.driverSearch(testData.driver.searchKeyword);
    await driversPage.verifyDriverSearch(testData.driver.searchKeyword);
});

test('Verify Add Driver functionality', async ({ page }) => {
    const { driversPage } = await setup(page);

    await driversPage.gotoDriversModule();

    const { email, firstName, lastName, phone } = testData.driver;
    await driversPage.createDriver(email, firstName, lastName, phone);
    await driversPage.verifyDriverAdded();
});
