import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  chromeWebSecurity: false,
  experimentalStudio: true,
  defaultCommandTimeout: 10000, // 4000 Default
  pageLoadTimeout: 60000, // 60000 Default
  viewportHeight: 1080, // 600 Default
  viewportWidth: 1920, // 1000 Default

  // save video even if it passes the test
  // video: true,
  // videoCompression: false,
  // trashAssetsBeforeRuns: false,

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    video: true, 
    screenshotOnRunFailure: true,
    
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--lang=en-US");
        }
        return launchOptions;
      });

      return config;
    },
  },
});
