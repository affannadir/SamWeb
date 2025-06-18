const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    storageState: 'storage/stagingAuth.json',
    headless: true,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'], 
    },
  },
  testDir: './tests',
  retries: 0,
  reporter: [['html', { open: 'never' }]],
});
