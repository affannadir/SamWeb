const { th } = require('@faker-js/faker');

class AccidentForms {
    /**
     * @param {import('webdriverio').Browser<'async'>} driver
     */
    constructor(driver) {
        this.driver = driver;
    }

    get formBtn() {
        return this.driver.$('//android.widget.TextView[@text="Accident Form"]');
    }

    get selectAccidentTime() {
        return this.driver.$('//android.widget.TextView[@text="Select Time"]')
    }

    get confirmTimeBtn() {
        return this.driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
    }

    get selectCondition() {
        return this.driver.$('//android.widget.TextView[@text= "Sunny"]')
    }


    get enterRouteNumber() {
        return this.driver.$('//android.widget.EditText[@text="Route Number"]');
    }

    get incidentAddress() {

        return this.driver.$('//android.widget.EditText[@text="Address"]')
    }

    get selectAddress() {

        return this.driver.$('(//android.widget.TextView[@text="North Bay"])[1]')
    }

    get accidentNotes() {
        return this.driver.$('//android.widget.EditText[@text="Notes..."]')
    }

    get enableToggle() {
        return this.driver.$('//android.widget.ScrollView/android.view.ViewGroup/android.widget.Switch[1]')
    }

    get enableToggle1() {
        return this.driver.$('//android.widget.ScrollView/android.view.ViewGroup/android.widget.Switch[2]')
    }

    get enableToggle2() {
        return this.driver.$('//android.widget.ScrollView/android.view.ViewGroup/android.widget.Switch[3]')
    }

    get enterThirdPartyPassengers() {
        return this.driver.$('//android.widget.EditText[@text="No of Passengers"]');
    }

    get thirdPartyDriverName() {
        return this.driver.$('//android.widget.EditText[@text="3rd Party Driver Name"]');
    }

    get thirdPartyPhoneNumber() {
        return this.driver.$('//android.widget.EditText[@text="3rd Party Phone Number"]');
    }

    get thirdPartyPlateNumber() {
        return this.driver.$('//android.widget.EditText[@text="3rd Party Licence Plate Number"]');
    }

    get thirdPartyAddress() {
        return this.driver.$('//android.widget.EditText[@text="3rd Party Address"]');
    }

    get crimeNumber() {
        return this.driver.$('//android.widget.EditText[@text="Crime Number (If Police Called)"]')
    }

    get injuryDetails() {
        return this.driver.$('//android.widget.EditText[@text="Details..."]');
    }

    get submitBtn() {
        return this.driver.$('//android.widget.TextView[@text="Submit"]')
    }

    get regInput() {
        return this.driver.$('//android.widget.EditText[@text="Vehicle Registration Number"]');
    }

    get uploadBtn() {
        return this.driver.$('(//android.widget.TextView[@text="Click to upload"])');
    }

    get submitBtn() {
        return this.driver.$('(//android.widget.TextView[@text="Submit"])');
    }

    get cameraIcon() {
        return this.driver.$('//android.view.ViewGroup[@content-desc="Camera"]/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.RectView');
    }

    get takePhoto() {
        return this.driver.$('//android.widget.ImageView[@content-desc="Shutter"]');
    }

    get doneBtn() {
        return this.driver.$('//android.widget.ImageButton[@content-desc="Done"]');
    }

    async uploadPhoto() {
        await this.uploadBtn.waitForDisplayed();
        await this.uploadBtn.click();
        await this.cameraIcon.click();
        await this.takePhoto.click();
        await this.doneBtn.click();
    }

    async scrollSlightly() {
        await this.driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 500, y: 1600 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 300 },
                    { type: 'pointerMove', duration: 500, x: 500, y: 1000 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await this.driver.releaseActions();
    }

    async navigateToAccidentForm() {
        await this.formBtn.waitForDisplayed();
        await this.formBtn.click();
    }

    async enterRegNum(vanNumber) {
        await this.regInput.waitForDisplayed();
        await this.regInput.setValue(vanNumber)
    }

    async selectTimeAndCondition() {
        await this.selectAccidentTime.waitForDisplayed();
        await this.selectAccidentTime.click();
        await this.confirmTimeBtn.waitForDisplayed();
        await this.confirmTimeBtn.click();

        await this.selectCondition.waitForDisplayed();
        await this.selectCondition.click();
    }

    async enterRouteAndAddress(routeNum) {

        await this.enterRouteNumber.waitForDisplayed();
        await this.enterRouteNumber.setValue(routeNum);

        await this.incidentAddress.waitForDisplayed();
        await this.incidentAddress.click();
        await driver.pause(500);

        await driver.pressKeyCode(42); // N
        await driver.pause(300);
        await driver.pressKeyCode(43); // o
        await driver.pause(300);
        await driver.pressKeyCode(46); // r
        await driver.pause(300);
        await driver.pressKeyCode(48); // t
        await driver.pause(300);
        await driver.pressKeyCode(36); // h
        await driver.pause(300);
        await driver.pressKeyCode(62); // space
        await driver.pause(300);
        await driver.pressKeyCode(30); // B
        await driver.pause(300);
        await driver.pressKeyCode(29); // a
        await driver.pause(300);
        await driver.pressKeyCode(53); // y
        await driver.pause(500);

        await this.selectAddress.waitForDisplayed();
        await this.selectAddress.click();
    }

    async enterAccidentNote(accidentNotes) {

        await this.accidentNotes.waitForDisplayed();
        await this.accidentNotes.setValue(accidentNotes);
    }

    async enableToggles() {

        await this.enableToggle.waitForDisplayed();
        await this.enableToggle.click()
    }

    async enableThirdPartyToggle(passengers, driverName, phoneNumber, plateNumber, address, accidentNotes) {

        await this.enterThirdPartyPassengers.waitForDisplayed();
        await this.enterThirdPartyPassengers.setValue(passengers);
        await this.thirdPartyDriverName.waitForDisplayed();
        await this.thirdPartyDriverName.setValue(driverName);
        await this.scrollSlightly();
        await this.thirdPartyPhoneNumber.waitForDisplayed();
        await this.thirdPartyPhoneNumber.setValue(phoneNumber);
        await this.thirdPartyPlateNumber.waitForDisplayed();
        await this.thirdPartyPlateNumber.setValue(plateNumber);
        await this.scrollSlightly();
        await this.thirdPartyAddress.waitForDisplayed();
        await this.thirdPartyAddress.setValue(address);
        await this.accidentNotes.waitForDisplayed();
        await this.accidentNotes.setValue(accidentNotes);
        await this.scrollSlightly();


    }

    async enablePoliceToggle(crimeNum) {

        await this.crimeNumber.waitForDisplayed();
        await this.crimeNumber.setValue(crimeNum);
    }

    async enableAmz() {
        await this.enableToggle1.waitForDisplayed();
        await this.enableToggle1.click()
    }

    async enableInjuredToggle(injuriesDetails) {

        await this.enableToggle2.waitForDisplayed();
        await this.enableToggle2.click()
        await this.scrollSlightly();
        await this.injuryDetails.waitForDisplayed();
        await this.injuryDetails.setValue(injuriesDetails);
    }

    async submitAccidentForm(){

        await this.submitBtn.waitForDisplayed();
        await this.submitBtn.click();
    }


}

module.exports = { AccidentForms };
