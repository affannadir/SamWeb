const { test, expect } = require('@playwright/test');
const { AdminDashboardPage } = require('../pageObjects/AdminDashboardPage');
const { VMS } = require('../pageObjects/VMSPage');
const testData = require('../testData');
require('dotenv').config();

async function setup(page) {
    const dashboard = new AdminDashboardPage(page);
    const vmsPage = new VMS(page);

    await page.goto(`${process.env.BASE_URL}/admin/dashboard`);
    await dashboard.searchDSP(testData.dspName);
    await dashboard.openDSPPanel();

    return { dashboard, vmsPage };
}

test.only('Verify Vehicle Creation', async ({page}) => {

    const { vmsPage } = await setup(page);
    const {regNum } = testData.vehicle;
    await vmsPage.navigateToVMS();
    await vmsPage.addVehicles(regNum);
    await vmsPage.verifyVehicleCreation();
})

test('Verify Vehicle Deletion', async ({page}) => {

    const { vmsPage } = await setup(page);
    await vmsPage.navigateToVMS();
    await vmsPage.deleteVehicle();
    await vmsPage.verifyVehicleDeletion();

})