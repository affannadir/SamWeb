const { test, expect } = require('@playwright/test');

class PaymentsPage {

    /**
  * @param {import('@playwright/test').Page} page
  */

    constructor(page) {

        this.page = page;
        this.paymentModule = page.locator("(//div[@role='button'])[4]");
        this.paymentAndInvoicesDD = page.locator("//button[normalize-space()='Payment & Invoices']");
        this.addInvoiceBtn = page.locator("//button[normalize-space()='Add Invoice']");
        this.dateField = page.locator("//button[@aria-label='Choose date']//*[name()='svg']");
        this.openAmzExpress = page.locator("(//button[@type='button'][normalize-space()='Open'])[3]");
        this.confirmWeek = page.locator("//button[normalize-space()='Confirm']");
        this.userField = page.locator('input[role="combobox"]');
        this.nineHourDaysField = page.locator('input[name="nineHrRouteDays"]');
        this.nineHourRoutePay = page.locator('input[name="nineHrRoutePay"]');
        this.eightHourDaysField = page.locator('input[name="eightHrRouteDays"]');
        this.eightHourRoutePay = page.locator('input[name="eightHrRoutePay"]');
        this.additionalPay = page.locator('input[name="additionalPay"]');
        this.BYODField = page.locator('input[name="byod"]');
        this.seasonalIncentive = page.locator('input[name="seasonalIncentive"]');
        this.bonus = page.locator('input[name="bonus"]');
        this.rescue = page.locator('input[name="rescue"]');
        this.otherPay = page.locator('input[name="otherPay"]');
        this.otherDeduction = page.locator('input[name="otherDeduction"]');
        this.gross = page.locator('input[name="gross"]');
        this.vat = page.locator('input[name="vat"]');
        this.adminFees = page.locator('input[name="adminFees"]');
        this.adminFeesRefund = page.locator('input[name="adminFeesRefund"]');
        this.net = page.locator('input[name="net"]');
        this.status = page.locator("//div[@id='mui-component-select-status']");
        this.statusScheduled = page.locator("//li[normalize-space()='Scheduled']");
        this.addInvoiceSubmitBtn = page.locator("//button[@type='submit']");
        this.addInvoiceSuccessMessage = page.locator("//div[contains(text(),'Invoice added successfully.')]");
        this.getCurrentPayDay = page.locator("//button[starts-with(normalize-space(), 'Pay Day:')]");
        this.openDaysDropdown = page.locator("//button[starts-with(normalize-space(), 'Pay Day:')]");
        // this.selectRandomDay = page.locator(`li[role="menuitem"] >> text=${newDay}`)

    }

    getSelectDayLocator(day) {
        return this.page.locator(`li[role="menuitem"] >> text=${day}`);
    }

    async gotoPaymentsModule() {

        await this.paymentModule.click();
    }

    async openAmzExpressDepot() {

        await this.openAmzExpress.click();
        await this.confirmWeek.click();

    }

    async verifyInvoceIsAdded() {

        await this.addInvoiceSuccessMessage.isVisible();
    }

    async clickPaymentsAndInvociesDD() {

        await this.paymentAndInvoicesDD.click();
    }

    async addInvoice(userName, nineHourDays, nineHourRoutePay, eightHourDays, eightHourPay, additionalPay, BYOD, incentive, bonus, rescue, otherPay, deduction, grossAmt, vatAmt, adminFeeAmt, refundAmt, netAmt) {
        await this.addInvoiceBtn.click();
        await this.dateField.click();
        await this.page.keyboard.press('Enter');
        await this.userField.fill(userName);
        await this.page.waitForTimeout(5000);
        await this.page.keyboard.press('Enter');

        await this.nineHourDaysField.fill(nineHourDays);
        await this.nineHourRoutePay.fill(nineHourRoutePay);
        await this.eightHourDaysField.fill(eightHourDays);
        await this.eightHourRoutePay.fill(eightHourPay);
        await this.additionalPay.fill(additionalPay);
        await this.BYODField.fill(BYOD);
        await this.seasonalIncentive.fill(incentive);
        await this.bonus.fill(bonus);
        await this.rescue.fill(rescue);
        await this.otherPay.fill(otherPay);
        await this.otherDeduction.fill(deduction);
        await this.gross.fill(grossAmt);
        await this.vat.fill(vatAmt);
        await this.adminFees.fill(adminFeeAmt);
        await this.adminFeesRefund.fill(refundAmt);
        await this.net.fill(netAmt);
        await this.status.click();
        await this.statusScheduled.click();
        await this.addInvoiceSubmitBtn.click();



        // const today = new Date();
        // const day = today.getDate();

        // await this.page.getByRole('dialog', { name: `${day}` }).click();
    }

    async payDaySelection() {

        const currentText = await this.getCurrentPayDay.textContent();
        await this.page.waitForTimeout(1000);
        const currentDay = currentText.split(':')[1].trim().toLowerCase();
        await this.page.waitForTimeout(1000);

        const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const newDay = allDays.find(day => day !== currentDay);
        await this.page.waitForTimeout(1000);

        await this.openDaysDropdown.click();
        await this.page.waitForTimeout(1000);
        await this.getSelectDayLocator(newDay).click();

        await expect(this.getCurrentPayDay).toHaveText(`Pay Day: ${newDay.charAt(0).toLowerCase() + newDay.slice(1)}`);


    }


}
module.exports = { PaymentsPage };