const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pnmud5',
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
