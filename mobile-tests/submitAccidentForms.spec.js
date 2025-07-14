require('dotenv').config();
const { remote } = require('webdriverio');
const { DriverCheckinCheckout } = require('../pageObjects/DriverCheckinCheckout');
const { AccidentForms } = require('../pageObjects/AccidentForms')

let driver;
let vanPage;

describe('Accident Form Submission', function () {
    this.timeout(600000);

    before(async () => {
        vanPage = new DriverCheckinCheckout(browser);
        accidentPage = new AccidentForms(browser);
    });

    it('should submit a accident form', async () => {
        await vanPage.login('rabbiekhalid25@gmail.com', 'Qwerty@1122');
        await accidentPage.navigateToAccidentForm();
        await accidentPage.selectTimeAndCondition();
        await vanPage.continueBtn.waitForDisplayed({ timeout: 10000 });
        await vanPage.continueBtn.click();
        await accidentPage.enterRegNum('OU64XVG');
        await accidentPage.enterRouteAndAddress('25');
        await vanPage.continueBtn.click();
        await accidentPage.uploadPhoto();
        await accidentPage.enterAccidentNote('Had an accident')
        await accidentPage.scrollSlightly();
        await accidentPage.enableToggles();
        await accidentPage.scrollSlightly();
        await accidentPage.enableThirdPartyToggle('3', 'Affan', '77443434321', 'LF21XVG', 'No address', 'Call')
        await accidentPage.scrollSlightly();
        await accidentPage.enableToggles();
        await accidentPage.scrollSlightly();
        await accidentPage.enablePoliceToggle('23232');
        await accidentPage.scrollSlightly();
        await accidentPage.enableAmz();
        await accidentPage.enableInjuredToggle('Injury')
        await accidentPage.submitAccidentForm();

    });

    after(async () => {
        if (driver) await driver.deleteSession();
    });
});




