import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer/index.js';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      config.env.OCR_API_KEY = process.env.OCR_API_KEY;
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  }
});
