import { defineConfig, devices } from '@playwright/test';

// Set E2E_BASE_URL to test a deployed site instead of the local dev server.
const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e',
  // The dev server compiles each route on its first visit.
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        // CI tests the production build; locally reuse the running dev server.
        command: process.env.CI ? 'pnpm build && pnpm start' : 'pnpm dev',
        url: baseURL,
        reuseExistingServer: true,
        timeout: 180_000,
      },
});
