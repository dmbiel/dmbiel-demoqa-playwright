import { defineConfig, devices } from '@playwright/test';

const sharedUse = {
  baseURL: 'https://demoqa.com',
  headless: true,
  viewport: { width: 1440, height: 900 },
  actionTimeout: 15_000,
  navigationTimeout: 30_000,
  screenshot: 'only-on-failure' as const,
  trace: 'retain-on-failure' as const,
  video: 'retain-on-failure' as const,
};

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [['line'], ['html', { open: 'never' }]],
  expect: {
    timeout: 10_000,
  },
  outputDir: 'test-results',
  use: sharedUse,
  projects: [
    {
      name: 'healthcheck',
      testMatch: /healthcheck\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], ...sharedUse },
    },
    {
      name: 'smoke',
      testMatch: /tests[\\/]+smoke[\\/].*\.spec\.ts/,
      dependencies: ['healthcheck'],
      use: { ...devices['Desktop Chrome'], ...sharedUse },
    },
    {
      name: 'regression',
      testMatch: /tests[\\/]+regression[\\/].*\.spec\.ts/,
      dependencies: ['healthcheck'],
      use: { ...devices['Desktop Chrome'], ...sharedUse },
    },
  ],
});
