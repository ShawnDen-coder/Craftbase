import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  outputDir: './artifacts/playwright',
  fullyParallel: false,
  workers: 1,
  timeout: 120000,
  use: {
    baseURL: 'http://127.0.0.1:43180',
    viewport: { width: 1440, height: 1000 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command:
      'pnpm build:site && pnpm exec vite preview --host 127.0.0.1 --port 43180 --strictPort',
    url: 'http://127.0.0.1:43180',
    reuseExistingServer: false,
  },
});
