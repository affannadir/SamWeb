const fs = require('fs');
const { remote } = require('webdriverio');

(async () => {
    const { email, otp } = JSON.parse(fs.readFileSync('tempDriverData.json', 'utf-8'));

    const driver = await remote({
        port: 4723,
        path: '/',
        capabilities: {
            platformName: "Android",
            "appium:automationName": "UiAutomator2",
            "appium:deviceName": "emulator-5554",
            "appium:app": "/home/affan/Downloads/com.samonboard-v58(2.0.5)-release.apk",
            "appium:autoGrantPermissions": true,
        }
    });

    try {
        console.log(`🚀 Using Email: ${email} and OTP: ${otp}`);
        await driver.pause(5000); // Let the app load completely

        console.log('📋 Dumping initial page source...');
        const source = await driver.getPageSource();
        console.log(source); // Help confirm you're seeing what you expect

        // Step 1: Click Continue
        const continueBtn1 = await driver.$('//android.widget.TextView[@text="Continue"]');
        await continueBtn1.waitForDisplayed({ timeout: 10000 });
        await continueBtn1.click();
        console.log('✅ Clicked first Continue');

        // Step 2: Click "Onboard yourself"
        const onboardBtn = await driver.$('//android.widget.TextView[@text="Onboard yourself"]');
        await onboardBtn.waitForDisplayed({ timeout: 10000 });
        await onboardBtn.click();
        console.log('✅ Clicked Onboard Yourself');

        // Step 3: Enter email
        const emailField = await driver.$('//android.widget.EditText[@text="Enter Email"]');
        await emailField.waitForDisplayed({ timeout: 10000 });
        await emailField.setValue(email);
        console.log('✅ Email entered');

        const continueBtn3 = await driver.$('//android.widget.TextView[@text="Continue"]');
        await continueBtn3.waitForDisplayed({ timeout: 10000 });
        await continueBtn3.click();

        // Step 4: Enter OTP
        const otpField = await driver.$('(//android.widget.EditText[@resource-id="textInput"])[1]');
        await otpField.waitForDisplayed({ timeout: 10000 });
        await otpField.setValue(otp);
        console.log('✅ OTP entered');

        // Step 5: Tap "Continue" again
        const continueBtn2 = await driver.$('//android.widget.TextView[@text="Continue"]');
        await continueBtn2.waitForDisplayed({ timeout: 10000 });
        await continueBtn2.click();
        console.log('✅ Clicked final Continue');

        const createPassField = await driver.$('//android.widget.EditText[@text="Create Password"]');
        await createPassField.waitForDisplayed({ timeout: 10000 });
        await createPassField.setValue('12345678A');


        const confirmPassField1 = await driver.$('//android.widget.EditText[@text="Confirm Password"]');
        await confirmPassField1.waitForDisplayed({ timeout: 10000 });
        await confirmPassField1.setValue('12345678A');

        const continueBtn4 = await driver.$('//android.widget.TextView[@text="Continue"]');
        await continueBtn4.waitForDisplayed({ timeout: 10000 });
        await continueBtn4.click();

        const checkboxLabels = [
            "I agree to the Terms & Conditions.",
            "Please note  that any Face ID registered on this device will have access to SAM app.",
            "I confirm that I understand English Language and can read documents written in English."
        ];

        for (const desc of checkboxLabels) {
            const checkbox = await driver.$(`//android.view.ViewGroup[@content-desc="${desc}"]/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.RectView[2]`);
            await checkbox.waitForDisplayed({ timeout: 10000 });
            await checkbox.click();
            console.log(`☑️ Clicked checkbox: ${desc}`);
        }

        const continueBtn5 = await driver.$('//android.widget.TextView[@text="Next"]');
        await continueBtn5.waitForDisplayed({ timeout: 10000 });
        await continueBtn5.click();

        const consentBtn = await driver.$('//android.widget.TextView[contains(@text, "I Consent")]');
        await consentBtn.waitForDisplayed({ timeout: 10000 });
        await consentBtn.click();


        await driver.pause(90000);

    } catch (err) {
        console.error("❌ Error during Appium flow:", err);
    } finally {
        await driver.deleteSession();
    }
})();
