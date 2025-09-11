import { defineConfig, devices } from '@playwright/test';

export const BASE_URL = 'https://dev.hmns.org';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 400000,
  workers: 5,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    viewport: { width: 1380, height: 720 },
    launchOptions: {
      args: ['--window-size=1920,1080'],
    },
    actionTimeout: 120000,
    navigationTimeout: 120000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});

