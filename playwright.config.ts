import { defineConfig, devices } from "@playwright/test";
import { realpathSync } from "node:fs";

const configDirectory = realpathSync(process.cwd());

export default defineConfig({
  testDir: "./src/features",
  testMatch: "**/browser/*.spec.ts",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3010",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --webpack --hostname 127.0.0.1 --port 3010",
    cwd: configDirectory,
    url: "http://127.0.0.1:3010",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } },
    },
  ],
});
