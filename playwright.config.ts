import { defineConfig, devices } from '@playwright/test';

export const BASE_URL = 'https://dev.hmns.org';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 400000,
  workers: 14,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['blob', { outputFolder: 'blob-report' }]
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'on',
    headless: true,
    viewport: { width: 1920, height: 1080 },
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
