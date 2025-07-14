class DriverCheckinCheckout {
    /**
     * @param {import('webdriverio').Browser<'async'>} driver
     */
    constructor(driver) {
        this.driver = driver;
    }

    get emailField() {
        return this.driver.$('//android.widget.EditText[@text="Enter Email"]');
    }

    get passwordField() {
        return this.driver.$('//android.widget.EditText[@text="Enter Password"]');
    }

    get loginBtn() {
        return this.driver.$('(//android.widget.TextView[@text="Login"])[2]');
    }

    get continueBtn() {
        return this.driver.$('//android.widget.TextView[@text="Continue"]');
    }

    get svgBtn() {
        return this.driver.$('android=new UiSelector().className("com.horcrux.svg.RectView").instance(2)');
    }

    get regInput() {
        return this.driver.$('//android.widget.EditText[@text="Van Registration Number"]');
    }

    get uploadBtn() {
        return this.driver.$('(//android.widget.TextView[@text="Click to upload"])[1]');
    }

    get cameraIcon() {
        return this.driver.$('//com.horcrux.svg.RectView');
    }

    get takePhoto() {
        return this.driver.$('//android.widget.ImageView[@content-desc="Shutter"]');
    }

    get doneBtn() {
        return this.driver.$('//android.widget.ImageButton[@content-desc="Done"]');
    }

    get editBtn() {
        return this.driver.$('//android.widget.TextView[@text="Edit"]');
    }

    get deleteBtn() {
        return this.driver.$('//android.widget.TextView[@text="Delete"]');
    }

    get addImageBtn() {
        return this.driver.$('//android.widget.TextView[@text="Add New Image"]');
    }

    get toggleSwitch() {
        return this.driver.$('android=new UiSelector().className("android.widget.Switch")');
    }

    get commentBox() {
        return this.driver.$('//android.widget.EditText[@text="Write..."]');
    }

    get continueBtn() {
        return this.driver.$('//android.widget.TextView[@text="Continue"]');
    }

    get signaturePad() {
        return this.driver.$('//android.view.View[@resource-id="signature-pad"]/android.view.View/android.widget.Image[3]');
    }

    get previewPdfBtn() {
        return this.driver.$('//android.widget.TextView[@text="Preview PDF"]');
    }

    get regNumberText() {
        return this.driver.$('//android.widget.TextView[@text="Registration Number: OU64XVG"]');
    }

    get svgView0() {
        return this.driver.$('android=new UiSelector().className("com.horcrux.svg.SvgView").instance(0)');
    }

    async verifyNoImagesCheck() {

        const errorMsg1 = await driver.$('//android.widget.TextView[@text=" Front (please upload a picture ) is required! *"]');
        await errorMsg1.waitForDisplayed({ timeout: 5000 });
        await expect(errorMsg1).toBeDisplayed();
    }

    async verifyRegNumCheck() {
        const errorMsg2 = await driver.$('//android.widget.TextView[@text="Registration number is required"]');
        await errorMsg2.waitForDisplayed({ timeout: 5000 });
        await expect(errorMsg2).toBeDisplayed()
    }

    async login(email, password) {
        await this.continueBtn.waitForDisplayed();
        await this.continueBtn.click();
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.loginBtn.click();
    }

    async fillVanRegNumber(regNumber) {
        await this.regInput.waitForDisplayed();
        await this.regInput.setValue(regNumber);
        await this.continueBtn.click();
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
    async drawSignature() {
        const pad = await this.signaturePad;
        await pad.waitForDisplayed({ timeout: 5000 });
        const rect = await pad.getRect();

        await this.driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: rect.x + 10, y: rect.y + 10 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 100, x: rect.x + 30, y: rect.y + 30 },
                    { type: 'pointerMove', duration: 100, x: rect.x + 50, y: rect.y + 10 },
                    { type: 'pointerMove', duration: 100, x: rect.x + 70, y: rect.y + 30 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
    }
}

module.exports = { DriverCheckinCheckout };
