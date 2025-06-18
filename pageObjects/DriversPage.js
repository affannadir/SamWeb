const { test, expect } = require('@playwright/test');

class DriversPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.driverModuleLink = page.locator('div[aria-label="My Drivers"]');
    this.activeTab = page.locator("//p[normalize-space()='Active Drivers']");
    this.onboardingTab = page.locator("//p[normalize-space()='Onboarding Drivers']");
    this.inactiveTab = page.locator("(//p[normalize-space()='Inactive Drivers'])[1]");
    this.filterButton = page.locator("//button[normalize-space()='Filters']");
    this.customerDropdown = page.locator("(//div[@role='combobox'])[1]");
    this.driverCountText = page.locator("text=17 Drivers");
    this.customerFilterLabel = page.locator("//span[normalize-space()='Customer Name: Amazon']");
    this.driverSearchField = page.locator('input[placeholder="Search name or email"]');
    this.firstCell = page.locator('(//div[@role="cell"])[1]');
    this.addNewDriver = page.locator("//button[normalize-space()='Add new Driver']");
    this.driverEmail = page.locator("input[placeholder='email@example.com']");
    this.driverFName = page.locator("input[placeholder='First Name']");
    this.driverLName = page.locator("input[placeholder$='Last Name']");
    this.driverContact = page.locator("input[placeholder$='Contact No.']");
    this.customerAmazaon = page.locator("//div[@role='button'][normalize-space()='Amazon']");
    this.depotDropDown = page.locator("//div[@id='mui-component-select-depotId']");
    this.selectDepot = page.locator("//li[normalize-space()='Amazon Express Depot']");
    this.roleDD = page.locator("//div[@id='mui-component-select-roleId']"); // after this press enter button then click anywhere outside to close the DD
    this.inviteUserBtn = page.locator('button[type="submit"]');
    this.verifyDriverCreation = page.locator("(//div[contains(text(),'New user added successfully.')])[1]");


  }

  getCustomerOption(optionText) {
    return this.page.locator(`//li[@role='option' and text()='${optionText}']`);
  }

  async createDriver(email, fName, lName, contactNumber) {

    await this.addNewDriver.click();
    await this.driverEmail.fill(email);
    await this.driverFName.fill(fName);
    await this.driverLName.fill(lName);
    await this.driverContact.fill(contactNumber);
    await this.customerAmazaon.click();
    await this.depotDropDown.click();
    await this.selectDepot.click();
    await this.roleDD.click();
    await this.page.keyboard.press('Enter');
    await this.page.keyboard.press('Escape');
    await this.inviteUserBtn.click();

  }

  async verifyDriverAdded(){

    await expect(this.verifyDriverCreation).toBeVisible();
  }

  async verifyDriverSearch(driverName) {

    await expect(this.firstCell).toContainText(driverName);
  }

  async driverSearch(driverName) {

    await this.driverSearchField.fill(driverName);
  }

  async gotoDriversModule() {
    await this.driverModuleLink.click();
  }

  async switchToActiveDrivers() {
    await this.activeTab.click();
  }

  async switchToOnboardingDrivers() {
    await this.onboardingTab.click();
  }

  async switchToInactiveDrivers() {
    await this.inactiveTab.click();
  }

  async filterByCustomer(customerName) {
    await this.filterButton.click();
    await this.customerDropdown.click();
    await this.getCustomerOption(customerName).click();
    await this.page.keyboard.press('Escape');
  }

  async verifyFilterApplied(expectedText, expectedTag) {
    await this.page.waitForSelector(`text=${expectedText}`);
    await this.page.waitForSelector(`//span[normalize-space()='${expectedTag}']`);
  }
}

module.exports = { DriversPage };
