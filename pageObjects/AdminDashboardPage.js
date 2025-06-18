class AdminDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[type="text"]');
  }

  async searchDSP(dspName) {
    await this.searchInput.fill(dspName);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000); 
  }

  async openDSPPanel() {
    const menuButton = this.page.locator('[data-testid="dsp-menu-button"]').first();
    await menuButton.click();

    const dspPanelButton = this.page.getByRole('button', { name: 'DSP PANEL' });
    await dspPanelButton.click();
  }
}

module.exports = { AdminDashboardPage };
