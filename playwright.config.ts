/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2: 0,
  workers: isCI ? 1 : 2,

  expect: {
    timeout: isCI ? 10000: 5000,
  },

  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});