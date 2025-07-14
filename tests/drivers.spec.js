const { test, expect } = require('@playwright/test');
const { AdminDashboardPage } = require('../pageObjects/AdminDashboardPage');
const { DriversPage } = require('../pageObjects/DriversPage');
const testData = require('../testData');
const fs = require('fs');
const { execSync } = require('child_process');
const util = require('util');
//const execAsync = util.promisify(exec);
require('dotenv').config();

async function setup(page) {
    const dashboard = new AdminDashboardPage(page);
    const driversPage = new DriversPage(page);

    await page.goto(`${process.env.BASE_URL}/admin/dashboard`);
    await dashboard.searchDSP(testData.dspName);
    await dashboard.openDSPPanel();

    return { dashboard, driversPage };
}

test('Switch between drivers tabs', async ({ page }) => {
    const { driversPage } = await setup(page);

    await driversPage.gotoDriversModule();

    await driversPage.switchToActiveDrivers();
    await expect(page.locator("//p[normalize-space()='Active Drivers']")).toBeVisible();

    await driversPage.switchToOnboardingDrivers();
    await expect(page.locator("//p[normalize-space()='Onboarding Drivers']")).toBeVisible();

    await driversPage.switchToInactiveDrivers();
    await expect(page.locator("(//p[normalize-space()='Inactive Drivers'])[1]")).toBeVisible();
});

test('Verify the Customer Name filter in Active Drivers', async ({ page }) => {
    const { driversPage } = await setup(page);

    await driversPage.gotoDriversModule();
    await driversPage.filterByCustomer(testData.filters.customer);
    await driversPage.verifyFilterApplied(
        testData.filters.expectedResult,
        testData.filters.customerFilterText
    );
});

test('Verify the driver search', async ({ page }) => {
    const { driversPage } = await setup(page);

    await driversPage.gotoDriversModule();
    await driversPage.driverSearch(testData.driver.searchKeyword);
    await driversPage.verifyDriverSearch(testData.driver.searchKeyword);
});

test.only('Verify Add Driver functionality', async ({ page }) => {
    test.setTimeout(90_000)
    const { driversPage } = await setup(page);

    await driversPage.gotoDriversModule();

    const { email, firstName, lastName, phone } = testData.driver;
    await driversPage.createDriver(email, firstName, lastName, phone);
    await driversPage.verifyDriverAdded();

    await driversPage.navigateToCreatedDriverProfile(email);

    const otp = await driversPage.getOtpFromDriverProfile();
    console.log("Driver Email:", email);
    console.log("OTP:", otp);



    fs.writeFileSync('tempDriverData.json', JSON.stringify({ email, otp }));

    try {
        const output = execSync('node mobile-tests/driverOnboarding.spec.js', { stdio: 'inherit' });
        console.log(`📱 Appium script completed successfully`);
    } catch (err) {
        console.error(`❌ Appium script failed:\n${err.message}`);
    }

    await page.reload();

    await driversPage.approveDocs();

    try {
        const emailFromTemp = JSON.parse(fs.readFileSync('tempDriverData.json', 'utf-8')).email;
        process.env.LOGIN_EMAIL = emailFromTemp;
        process.env.LOGIN_PASSWORD = '12345678A';

        execSync('node mobile-tests/driverLogin.spec.js', { stdio: 'inherit', env: process.env });
        console.log(`✅ Second Appium login script completed successfully`);
    } catch (err) {
        console.error(`❌ Second Appium login script failed:\n${err.message}`);
        throw err;
    }

});
