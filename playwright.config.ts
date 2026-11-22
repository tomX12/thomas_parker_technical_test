import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    timeout: 60_000,

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : 4,

    // Reporter to use
    reporter: 'html',

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'https://www.gov.uk/calculate-your-holiday-entitlement',

        // Collect trace when retrying the failed test.
        trace: 'on-first-retry',
    },
    // Configure projects for major browsers.
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] },
        // }
    ],
});
