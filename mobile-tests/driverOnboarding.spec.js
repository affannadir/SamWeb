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
            "appium:deviceName": "Pixel 5",
            "appium:app": "/home/affan/Downloads/com.samonboard-v58(2.0.5)-release-osmVANCHECK.apk",
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
        await continueBtn5.waitForDisplayed({ timeout: 100000 });
        await continueBtn5.click();

        const consentBtn = await driver.$('//android.widget.TextView[contains(@text, "I Consent")]');
        await consentBtn.waitForDisplayed({ timeout: 10000 });
        await consentBtn.click();

        const consentBtn1 = await driver.$('//android.widget.TextView[contains(@text, "I Consent")]');
        await consentBtn1.waitForDisplayed({ timeout: 10000 });
        await consentBtn1.click();

        await driver.$('//android.widget.TextView[@text="DD/MM/YYYY"]').click();
        await driver.$('//android.widget.Button[@resource-id="android:id/button1"]').click();

        await driver.$('//android.widget.TextView[@text="Select nationality"]').click();
        await driver.$('//android.widget.TextView[@text="Algeria"]').click();

        const insuranceField = await driver.$('//android.widget.EditText[@text="Ab12231435c"]');
        await insuranceField.setValue('Ac654321a');

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 500, y: 1800 },  // start near bottom
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 300 },
                    { type: 'pointerMove', duration: 500, x: 500, y: 300 },  // move to top
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        await driver.releaseActions();




        // Postal code input
        const postalField = await driver.$('//android.widget.EditText[@text="Postal Code"]');
        await postalField.click(); // focus the field
        await driver.pause(500);

        // Type "54000" using keycodes
        await driver.pressKeyCode(12); // 5
        await driver.pause(300);
        await driver.pressKeyCode(11); // 4
        await driver.pause(300);
        await driver.pressKeyCode(7);  // 0
        await driver.pause(300);
        await driver.pressKeyCode(7);  // 0
        await driver.pause(300);
        await driver.pressKeyCode(7);  // 0
        await driver.pause(1000); // wait for dropdown to appear

        // Now try clicking the dropdown suggestion
        const suggestion = await driver.$('(//android.widget.TextView[@text="54000"])[1]');
        if (await suggestion.isDisplayed()) {
            await suggestion.click();
        } else {
            throw new Error("Dropdown suggestion '54000' did not appear.");
        }


        // Street address dropdown
        await driver.$('//android.widget.TextView[@text="Street Address"]').click();
        await driver.$('//android.widget.TextView[@text="Flat 2, Bolonia"]').click();

        await driver.pause(20000);


        // await driver.$('//android.widget.TextView[@text="Select Date"]').click();
        // const maxAttempts = 12;
        // let yearFound = false;

        // // Locate the year SeekBar
        // const yearPicker = await driver.$('//android.widget.SeekBar');
        // const elementId = yearPicker.elementId;
        // const rect = await driver.getElementRect(elementId);

        // // Calculate swipe coordinates
        // const startX = rect.x + rect.width / 2;
        // const startY = rect.y + rect.height * 0.8;
        // const endY = rect.y + rect.height * 0.2;

        // for (let i = 0; i < maxAttempts; i++) {
        //     console.log(`Swipe #${i + 1}: from (${startX}, ${startY}) to (${startX}, ${endY})`);

        //     await driver.performActions([
        //         {
        //             type: 'pointer',
        //             id: 'finger1',
        //             parameters: { pointerType: 'touch' },
        //             actions: [
        //                 { type: 'pointerMove', duration: 0, x: startX, y: startY },
        //                 { type: 'pointerDown', button: 0 },
        //                 { type: 'pause', duration: 300 },
        //                 { type: 'pointerMove', duration: 500, x: startX, y: endY },
        //                 { type: 'pointerUp', button: 0 }
        //             ]
        //         }
        //     ]);
        //     await driver.releaseActions();
        //     await driver.pause(1000);

        //     const year2017 = await driver.$('//android.widget.TextView[@text="2017"]');
        //     if (await year2017.isDisplayed().catch(() => false)) {
        //         await year2017.click();
        //         console.log("✅ Found and clicked 2017");
        //         yearFound = true;
        //         break;
        //     }
        // }

        // if (!yearFound) {
        //     throw new Error("❌ Year 2017 not found after multiple swipes.");
        // }


        // await driver.$('//android.widget.Button[@resource-id="android:id/button1"]').click();


        // Continue button
        await driver.$('//android.widget.TextView[contains(@text, "Continue")]').click();

        // Select license options
        await driver.$('//android.view.ViewGroup[@content-desc="Driving Licence, The standard UK driving licence, allowing you to drive category B vehicles."]').click();
        await driver.$('//android.view.ViewGroup[@content-desc="Irish, The standard Irish driving licence, allowing you to drive category B vehicles."]/com.horcrux.svg.SvgView[2]/com.horcrux.svg.GroupView/com.horcrux.svg.RectView[2]').click();

        // Submit
        await driver.$('//android.widget.TextView[@text="Submit"]').click();

        // Pause to allow camera to open
        await driver.pause(5000);

        // Take picture
        // If the camera interface is inside the app and "Continue" triggers the capture:
        const cameraContinueBtn = await driver.$('//android.widget.TextView[contains(@text, "Continue")]');
        await cameraContinueBtn.waitForDisplayed({ timeout: 10000 });
        await cameraContinueBtn.click();

        //   await driver.pause(50000);


        console.log("✅ License photo captured successfully");


        const cameraContinueBtn2 = await driver.$('//android.widget.TextView[contains(@text, "Continue")]');
        await cameraContinueBtn2.waitForDisplayed({ timeout: 70000 });
        await cameraContinueBtn2.click();


        const cameraContinueBtn34 = await driver.$('//android.widget.TextView[contains(@text, "Continue")]');
        await cameraContinueBtn34.waitForDisplayed({ timeout: 70000 });
        await cameraContinueBtn34.click();

        //   await driver.pause(50000);


        const input1 = await driver.$('//android.widget.EditText[@text="ABC123XYZ"]');
        await input1.waitForDisplayed({ timeout: 70000 }); // waits up to 10 seconds
        await input1.setValue('CDA654RED');

        const input2 = await driver.$('//android.widget.EditText[@text="0"]');
        await input2.setValue('20');

        const continue1 = await driver.$('//android.widget.TextView[contains(@text, "Continue")]');
        await continue1.waitForDisplayed({ timeout: 10000 });
        await continue1.click();

        // await driver.pause(50000);


        const rtwBtn = await driver.$('//android.view.ViewGroup[@content-desc="Right To Work, The legal documentation confirming your eligibility to work in the UK."]');
        await rtwBtn.waitForDisplayed({ timeout: 1000000 });
        await rtwBtn.click();

        const euCitizenBtn = await driver.$('//android.view.ViewGroup[@content-desc="EU/EEA / Swiss citizen"]');
        await euCitizenBtn.click();

        const dateEntry = await driver.$('//android.widget.TextView[@text="Date Entry"]');
        await dateEntry.click();

        const okBtn = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
        await okBtn.click();

        const settledStatusBtn = await driver.$('//android.view.ViewGroup[@content-desc="Settled status with biometric evidence"]');
        await settledStatusBtn.click();

        const continue12 = await driver.$('//android.widget.TextView[contains(@text, "Continue")]');
        await continue12.waitForDisplayed({ timeout: 10000 });
        await continue12.click();

        //await driver.pause(90000);


        const cameraContinueBtn222 = await driver.$('//android.widget.TextView[contains(@text, "Continue")]');
        await cameraContinueBtn222.waitForDisplayed({ timeout: 10000 });
        await cameraContinueBtn222.click();

        const cameraContinueBtn22 = await driver.$('//android.widget.TextView[contains(@text, "Continue")]');
        await cameraContinueBtn22.waitForDisplayed({ timeout: 100000 });
        await cameraContinueBtn22.click();


        const farmeField = await driver.$('//android.widget.EditText[@text="FARME100165AB5EO"]');
        await farmeField.waitForDisplayed({ timeout: 100000 });
        await farmeField.setValue('FARME100165AB5EO');

        await driver.pause(15000); // pause 15 secs

        const clickToUpload1 = await driver.$('//android.widget.TextView[@text="Click to upload"]');
        await clickToUpload1.click();

        const cameraOption1 = await driver.$('//android.widget.TextView[@text="Camera"]');
        await cameraOption1.click();

        const takePhoto1 = await driver.$('//android.widget.ImageButton[@content-desc="Take photo"]');
        await takePhoto1.click();

        const donePhoto1 = await driver.$('//android.widget.ImageButton[@content-desc="Done"]');
        await donePhoto1.click();

        // Scroll
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: 500, y: 1800 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 300 },
                    { type: 'pointerMove', duration: 500, x: 500, y: 300 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();

        const clickToUpload2 = await driver.$('//android.widget.TextView[@text="Click to upload"]');
        await clickToUpload2.click();

        const cameraOption2 = await driver.$('//android.widget.TextView[@text="Camera"]');
        await cameraOption2.click();

        const takePhoto2 = await driver.$('//android.widget.ImageButton[@content-desc="Take photo"]');
        await takePhoto2.click();

        const donePhoto2 = await driver.$('//android.widget.ImageButton[@content-desc="Done"]');
        await donePhoto2.click();

        await driver.pause(10000); // pause 10 secs

        const shareCode = await driver.$('//android.widget.EditText[@text="Share Code"]');
        await shareCode.setValue('CDA345TRE');

        const saveBtn = await driver.$('//android.widget.TextView[@text="Save"]');
        await saveBtn.click();

        //await driver.pause(50000);


        const submitBtn = await driver.$('//android.widget.TextView[@text="Submit"]');
        await submitBtn.waitForDisplayed({ timeout: 100000 });
        await submitBtn.click();

        const refreshBtn = await driver.$('//android.widget.TextView[@text="Refresh"]');
        await refreshBtn.waitForDisplayed({ timeout: 10000 });
        await refreshBtn.click();

        console.log("✅ Flow completed!");

    } catch (err) {
        console.error("❌ Error during Appium flow:", err);
    } finally {
        await driver.deleteSession();
    }
})();
