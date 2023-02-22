let reporter = require('cucumber-html-reporter');

let options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  brandTitle: 'GoContact -Test Automation Report',
  metadata: {
    'App Version': '0.0.1',
    'Test Environment': 'STAGING',
    Browser: 'Chrome',
    Platform: 'Windows',
    Parallel: 'Scenarios',
    Executed: 'Remote',
  },
};

reporter.generate(options);
