
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
require('dotenv').config();

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3333',
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      config.env.OCR_API_KEY = process.env.OCR_API_KEY;
      return config;
    },
    video: false,
    screenshotOnRunFailure: false,
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
};
