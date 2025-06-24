const { test, expect } = require('@playwright/test');

class VMS{


    /**
  * @param {import('@playwright/test').Page} page
  */

    constructor (page){

        this.page = page;
        this.VMSMoudle = page.locator("//div[@aria-label='Vehicle Management']");
        this.addVehicle = page.locator("//button[starts-with(normalize-space(), 'Add Vehicle')]");
        this.enterRegNumber = page.locator('input[placeholder="OU64XVG"]'); 
        this.fetchVehicleInfo = page.locator("//button[normalize-space()='Fetch Info']");
        this.createVehicle = page.locator("//button[contains(text(),'Add Vehicle')]");
        this.vehicleCreationSuccess = page.locator("//div[contains(text(),'Vehicle added successfully')]")
        this.vehicleDeletionSuccess = page.locator("//div[contains(text(),'Vehicle deleted successfully')]")
        this.actionButtonforAddedVehicle = page.locator("//p[normalize-space()='LF21FMR']/ancestor::div[contains(@role, 'row')]/div[contains(@data-field, 'actions')]");
        this.deleteVehicleBtn = page.locator("//li[normalize-space()='Delete']");
    }

    async navigateToVMS(){

        await this.VMSMoudle.click();
    }

    async addVehicles(regNumber){

        await this.addVehicle.click();
        await this.enterRegNumber.fill(regNumber);
        await this.fetchVehicleInfo.click();
        await this.createVehicle.click();
    }

    async verifyVehicleCreation(){

        await expect(this.vehicleCreationSuccess).toBeVisible();
    }

    async deleteVehicle(){
        await this.actionButtonforAddedVehicle.click();
        await this.deleteVehicleBtn.click();
    }

    async verifyVehicleDeletion(){

        await expect(this.vehicleDeletionSuccess).toBeVisible();
    }
}

module.exports = { VMS };