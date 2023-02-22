const { When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/HomePage.po');
const { ScriptBuilder } = require('../page-objects/ScriptBuilder.po');
const { ReportsAnalytics } = require('../page-objects/ReportsAnalytics.po');
const { BaseAction } = require('../setup/baseAction');

const homepage = new Homepage();
const scriptBuilder = new ScriptBuilder();
const report = new ReportsAnalytics();
const baseAction = new BaseAction();

global.templateName = [];

When('user access the reports designer menu', async () => {
  await homepage.navigateToReportDesigner();
});

Then('user enters csv designer details', async (tableData) => {
  const reportDetails = tableData.rowsHash();
  if (reportDetails.template === 'New template') {
    let randomTemplateName = await baseAction.getRandomString('_Template');
    reportDetails.templateName = await randomTemplateName.toString();
    global.templateName.push(reportDetails.templateName);
  }
  if (reportDetails.targetName === '') {
    reportDetails.targetName = global.scriptNew;
  }
  await report.enterCSVDetails(reportDetails);
});

Then('user downloads report', async () => {
  global.downloadFileName = [];
  let fileName = await report.downloadReport();
  global.downloadFileName.push(fileName);
});

When('user selects script tab and add script to template', async () => {
  await report.openScriptTab();
  await report.selectScript(global.scriptNew);
  await report.saveTemplate();
});

Then('validate csv contains callback information:', async (csvData) => {
  const csvDetails = csvData.rowsHash();
  let rowIndex = 0;
  if (csvDetails.fileIndex) {
    rowIndex = csvDetails.fileIndex;
  }
  await scriptBuilder.validateCSVData(
    global.downloadFileName[rowIndex],
    csvDetails
  );
});

Then('user deletes previously added script from template', async () => {
  await report.removeScriptFromTemplate();
  await report.saveTemplate();
});

Then('user delete previously added template', async () => {
  await report.deleteTemplate();
});

Then(
  'User navigates to {string} tab and select {string}',
  async (tabName, option) => {
    await report.selectTab(tabName, option);
  }
);

Then('user select add option', async () => {
  await report.addOption();
});

Then('user save the template', async () => {
  await report.saveNewTemplate();
});

Then(
  'user update user setting with following configurations',
  async (dataTable) => {
    let data = dataTable.rowsHash();
    await report.selectAgentOnHook(data);
  }
);

Then('user access the E-Learning Script Builder menu', async () => {
  await homepage.navigateToELearningScriptBuliderMenu();
});

Then(
  'user access the Agent Quality menu and select {string} tab in {string} window',
  async (tabName, session) => {
    await report.navigateToAgentQuality(session);
    await report.navigateToAgentQualityTab(tabName, session);
  }
);

When('user select the script in {string} window', async (session) => {
  // added wait to load script
  await report.wait(2);
  await report.selecteLearnScript(global.scriptNew, session);
});

Then(
  'user fills E-Learn script with following in {string} window',
  async (session, scriptDetails) => {
    let fillScriptObject = scriptDetails.rowsHash();
    await report.fillELearnScript(session, fillScriptObject);
  }
);

Then('user select all the items from previously created script', async () => {
  await report.selectAllItems();
});
