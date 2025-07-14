require('dotenv').config();
const { remote } = require('webdriverio');
const { DriverCheckinCheckout } = require('../pageObjects/DriverCheckinCheckout');

let driver;
let vanPage;

describe('Van Registration Flow', function () {
    this.timeout(600000);

   before(async () => {
        vanPage = new DriverCheckinCheckout(browser);
    });

   it('should complete the van registration flow', async () => {
    await vanPage.login('rabbiekhalid25@gmail.com', 'Qwerty@1122');

    await vanPage.svgBtn.waitForDisplayed({ timeout: 10000 });
    await vanPage.svgBtn.click();

    await vanPage.continueBtn.waitForDisplayed({ timeout: 10000 });
    await vanPage.continueBtn.click();

    await vanPage.continueBtn.waitForDisplayed({ timeout: 10000 });
    await vanPage.continueBtn.click();

    await vanPage.fillVanRegNumber('OU64XVG');
    
    await vanPage.continueBtn.waitForDisplayed({ timeout: 10000 });
    await vanPage.continueBtn.click();

    await vanPage.continueBtn.waitForDisplayed({ timeout: 10000 });
    await vanPage.continueBtn.click();

    await vanPage.uploadPhoto();
    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();

    await vanPage.scrollSlightly();
        await vanPage.scrollSlightly();


    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();
    await vanPage.scrollSlightly();
    await vanPage.scrollSlightly();


    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();
    await vanPage.scrollSlightly();

    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();
    await vanPage.scrollSlightly();


    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();
    await vanPage.scrollSlightly();


    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();
    await vanPage.scrollSlightly();


    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();
    await vanPage.scrollSlightly();



    await vanPage.editBtn.waitForDisplayed({ timeout: 5000 });
    await vanPage.editBtn.click();

    await vanPage.deleteBtn.waitForDisplayed({ timeout: 5000 });
    await vanPage.deleteBtn.click();

    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();

    await vanPage.addImageBtn.waitForDisplayed({ timeout: 5000 });
    await vanPage.addImageBtn.click();
    await vanPage.scrollUpSlightly();

    await vanPage.uploadPhoto();
    await vanPage.scrollSlightly();

    await vanPage.toggleSwitch.waitForDisplayed({ timeout: 5000 });
    await vanPage.toggleSwitch.click();
    await vanPage.scrollSlightly();

    await vanPage.commentBox.waitForDisplayed({ timeout: 5000 });
    await vanPage.commentBox.setValue('Testing this section');

    await vanPage.continueBtn.waitForDisplayed({ timeout: 5000 });
    await vanPage.continueBtn.click();

    await vanPage.drawSignature();

    await vanPage.previewPdfBtn.waitForDisplayed({ timeout: 5000 });
    await vanPage.previewPdfBtn.click();

    await vanPage.regNumberText.waitForDisplayed({ timeout: 5000 });
    console.log('✅ Registration number is visible in the PDF preview.');

    await vanPage.svgView0.waitForDisplayed({ timeout: 5000 });
    await vanPage.svgView0.click();

});


    after(async () => {
        if (driver) await driver.deleteSession();
    });
});




// const fs = require('fs');
// const { remote } = require('webdriverio');
// const driver = await remote();

// (async () => {
//     const email = 'rabbiekhalid25@gmail.com'
//     const password = 'Qwerty@1122';

  

//     try {
//         console.log(`🔐 Logging in with: ${email} / ${password}`);
//         await driver.pause(3000);

//         const continueBtn = await driver.$('//android.widget.TextView[@text="Continue"]');
//         await continueBtn.waitForDisplayed({ timeout: 10000 });
//         await continueBtn.click();

//         const emailField = await driver.$('//android.widget.EditText[@text="Enter Email"]');
//         await emailField.waitForDisplayed({ timeout: 10000 });
//         await emailField.setValue(email);

//         const passwordField = await driver.$('//android.widget.EditText[@text="Enter Password"]');
//         await passwordField.waitForDisplayed({ timeout: 10000 });
//         await passwordField.setValue(password);

//         const loginBtn = await driver.$('(//android.widget.TextView[@text="Login"])[2]')
//         await loginBtn.waitForDisplayed({ timeout: 10000 })
//         await loginBtn.click();

//         const svg = await driver.$('android=new UiSelector().className("com.horcrux.svg.RectView").instance(2)');
//         await svg.waitForDisplayed({ timeout: 50000 })
//         await svg.click();

//         const continue1 = await driver.$('//android.widget.TextView[@text="Continue"]');
//         await continue1.waitForDisplayed({ timeout: 5000 });
//         await continue1.click();

//         const continue2 = await driver.$('//android.widget.TextView[@text="Continue"]');
//         await continue2.waitForDisplayed({ timeout: 5000 });
//         await continue2.click();

//         const errorMsg = await driver.$('//android.widget.TextView[@text="Registration number is required"]');
//         await errorMsg.waitForDisplayed({ timeout: 5000 });

//         const regInput = await driver.$('//android.widget.EditText[@text="Van Registration Number"]');
//         await regInput.waitForDisplayed({ timeout: 5000 });
//         await regInput.setValue('OU64XVG');

//         const continue3 = await driver.$('//android.widget.TextView[@text="Continue"]');
//         await continue3.waitForDisplayed({ timeout: 5000 });
//         await continue3.click();


//         const continue5 = await driver.$('//android.widget.TextView[@text="Continue"]');
//         await continue5.waitForDisplayed({ timeout: 5000 });
//         await continue5.click();

//         const errorMsg1 = await driver.$('//android.widget.TextView[@text=" Front (please upload a picture ) is required! *"]');
//         await errorMsg1.waitForDisplayed({ timeout: 5000 });

//         async function uploadPhoto() {
//             const uploadBtn = await driver.$('(//android.widget.TextView[@text="Click to upload"])[1]');
//             await uploadBtn.waitForDisplayed({ timeout: 5000 });
//             await uploadBtn.click();

//             const cameraIcon = await driver.$('//com.horcrux.svg.RectView');
//             await cameraIcon.waitForDisplayed({ timeout: 5000 });
//             await cameraIcon.click();

//             const takePhoto = await driver.$('//android.widget.ImageButton[@content-desc="Take photo"]');
//             await takePhoto.waitForDisplayed({ timeout: 5000 });
//             await takePhoto.click();

//             const doneBtn = await driver.$('//android.widget.ImageButton[@content-desc="Done"]');
//             await doneBtn.waitForDisplayed({ timeout: 5000 });
//             await doneBtn.click();
//         }

//         await uploadPhoto();
//         await uploadPhoto();

//         await driver.performActions([
//             {
//                 type: 'pointer',
//                 id: 'finger1',
//                 parameters: { pointerType: 'touch' },
//                 actions: [
//                     { type: 'pointerMove', duration: 0, x: 500, y: 1800 },
//                     { type: 'pointerDown', button: 0 },
//                     { type: 'pause', duration: 300 },
//                     { type: 'pointerMove', duration: 500, x: 500, y: 300 },
//                     { type: 'pointerUp', button: 0 }
//                 ]
//             }
//         ]);
//         await driver.releaseActions();

//         async function scrollUpSlightly() {
//             await driver.performActions([
//                 {
//                     type: 'pointer',
//                     id: 'finger1',
//                     parameters: { pointerType: 'touch' },
//                     actions: [
//                         { type: 'pointerMove', duration: 0, x: 500, y: 1800 },
//                         { type: 'pointerDown', button: 0 },
//                         { type: 'pause', duration: 300 },
//                         { type: 'pointerMove', duration: 500, x: 500, y: 1000 },
//                         { type: 'pointerUp', button: 0 }
//                     ]
//                 }
//             ]);
//             await driver.releaseActions();
//         }
//         for (let i = 0; i < 6; i++) {
//             await uploadPhoto();
//             await scrollUpSlightly();

//         }

//         const editBtn = await driver.$('//android.widget.TextView[@text="Edit"]');
//         await editBtn.waitForDisplayed({ timeout: 5000 });
//         await editBtn.click();

//         // Click on "Delete"
//         const deleteBtn = await driver.$('//android.widget.TextView[@text="Delete"]');
//         await deleteBtn.waitForDisplayed({ timeout: 5000 });
//         await deleteBtn.click();


//         await uploadPhoto();
//         await scrollUpSlightly();

//         const addImageBtn = await driver.$('//android.widget.TextView[@text="Add New Image"]');
//         await addImageBtn.waitForDisplayed({ timeout: 5000 });
//         await addImageBtn.click();
//         await scrollUpSlightly();

//         await uploadPhoto();
//         await scrollUpSlightly();

//         const toggleSwitch = await driver.$('android=new UiSelector().className("android.widget.Switch")');
//         await toggleSwitch.waitForDisplayed({ timeout: 5000 });
//         await toggleSwitch.click();
//         await scrollUpSlightly();


//         const commentBox = await driver.$('//android.widget.EditText[@text="Write..."]');
//         await commentBox.waitForDisplayed({ timeout: 5000 });
//         await commentBox.setValue('Testing this section');

//         const continue4 = await driver.$('//android.widget.TextView[@text="Continue"]');
//         await continue4.waitForDisplayed({ timeout: 5000 })
//         await continue4.click();

//         const signaturePad = await driver.$('//android.view.View[@resource-id="signature-pad"]/android.view.View/android.widget.Image[3]');
//         await signaturePad.waitForDisplayed({ timeout: 5000 });

//         const rect = await signaturePad.getRect();

//         // Simulate a small zig-zag signature within the pad bounds
//         await driver.performActions([{
//             type: 'pointer',
//             id: 'finger1',
//             parameters: { pointerType: 'touch' },
//             actions: [
//                 { type: 'pointerMove', duration: 0, x: rect.x + 10, y: rect.y + 10 },
//                 { type: 'pointerDown', button: 0 },
//                 { type: 'pointerMove', duration: 100, x: rect.x + 30, y: rect.y + 30 },
//                 { type: 'pointerMove', duration: 100, x: rect.x + 50, y: rect.y + 10 },
//                 { type: 'pointerMove', duration: 100, x: rect.x + 70, y: rect.y + 30 },
//                 { type: 'pointerUp', button: 0 }
//             ]
//         }]);

//         const previewPdfBtn = await driver.$('//android.widget.TextView[@text="Preview PDF"]');
//         await previewPdfBtn.waitForDisplayed({ timeout: 5000 });
//         await previewPdfBtn.click();

//         const regNumberText = await driver.$('//android.widget.TextView[@text="Registration Number: OU64XVG"]');
//         await regNumberText.waitForDisplayed({ timeout: 5000 });
//         console.log("✅ Registration number is visible in the PDF preview.");

//         const svgView0 = await driver.$('android=new UiSelector().className("com.horcrux.svg.SvgView").instance(0)');
//         await svgView0.waitForDisplayed({ timeout: 5000 });
//         await svgView0.click();


//         await driver.releaseActions();

//     } catch (err) {
//         console.error("❌ Error during login:", err);
//     } finally {
//         await driver.deleteSession();
//     }
// })();
