const { When, Then } = require('@cucumber/cucumber');
const { Wallboard } = require('../page-objects/Wallboard.po');
const wallboard = new Wallboard();
let wallboardTemplateName = '';

When('user access the wallboard menu in {string} window', async (type) => {
  await wallboard.navigateToWallboardMenu(type);
});

Then('user select {string} from list', async (template) => {
  if(template === 'latest'){
    template = wallboardTemplateName;
  }
  await wallboard.selectWallboardTemplate(template);
});

Then('verify section data with following configurations:', async (dataTable) => {
  let campaignDetails = [];
  dataTable.hashes().forEach((element) => {
    campaignDetails.push({
      'callsMade': element.callsMade,
      'answered': element.answered,
      'answeredPercent': element.answeredPercent,
      'TMA': element.TMA,
      'ready': element.ready,
      'talking': element.talking,
      'outcome': element.outcome,
      'break': element.break,
      'campaignType': element.campaignType,
      'waitQueue': element.waitQueue,
      'totalAbandon': element.abandoned,
      'abandonPer': element.abandonPer,
      'transfer': element.transfer
    });
  });

  for(let i=0; i<campaignDetails.length; i++){
    await wallboard.verifyCampaignData(campaignDetails[i]);
  }
});

When('user click on option open in new tab {string}',async(clickTimes)=>{
  for(let i=0; i<clickTimes;i++){
    await wallboard.clickOnNewTabOption();
  }
});

When('user closes {string} opened tab',async(closes)=>{
  await wallboard.closeOpenedTab(closes);
});

Then('verify agent section data with following configurations:', async (dataTable) => {
  let agentCampaignDetails = [];
  dataTable.hashes().forEach((element) => {
    agentCampaignDetails.push({
      'agent_1': element.agent_1,
      'agent_2': element.agent_2,
      'agentCampaignType' : element.campaignType
    });
  });

  for(let i=0; i<agentCampaignDetails.length; i++){
    await wallboard.verifyAgentCampaignData(agentCampaignDetails[i]);
  }
});

Then('user create a new template with following configurations:', async (dataTable) => {
  let templateDetails = '';
  dataTable.hashes().forEach((element) => {
    wallboardTemplateName = element.templateName + new Date().getTime();
    templateDetails = {
      'templateName': wallboardTemplateName,
      'templateType': element.templateType
    };
  });
  await wallboard.addTemplate(templateDetails);
});

Then('verify if user can access to the template with following status in {string} window', async (window, dataTable) => {
  let templateStatus = '';
  dataTable.hashes().forEach((element) => {
    templateStatus = {
      'view': element.view,
      'edit': element.edit,
      'delete': element.delete,
      'editFormName': element.editFormName,
      'editError': element.editError,
      'deleteError': element.deleteError
    };
  });
  await wallboard.verifyTemplateAccess(wallboardTemplateName, templateStatus, window);
});

When('delete the wallboard template',async()=>{
  await wallboard.deleteTemplate(wallboardTemplateName);
});

Then('verify that the values the new tab data is same as original tab', async(campaignData)=>{
 
  let campaignDetails = [];
  campaignData.hashes().forEach((element) => {
    campaignDetails.push({
      'campaignType' : element.campaignType
    });
  });
  for(let i=0; i<campaignDetails.length; i++){
    await wallboard.compareTabData(campaignDetails[i].campaignType);
  }
});

When('user validate if the open tabs are closed succesfully',async()=>{
  await wallboard.validateClosedTab();
});

When('user closes main tab',async()=>{
  await wallboard.closeMainTab();
});

When('validate user is not logged out of main tab',async()=>{
  await wallboard.verifyLog();
});

Then('refresh the tab {int}', async (tabIndex) => {
  await wallboard.reloadPage(tabIndex);
});

Then('verify data in tab {int} with following configurations:', async (tabIndex, dataTable) => {
  let templateData = '';
  dataTable.hashes().forEach((element) => {
    let templateName = (element.template === 'latest')?wallboardTemplateName:element.template;
    templateData = {
      'templateName': templateName,
      'boxTopLeftTitle': element.boxTopLeftTitle
    };
  });
  await wallboard.verifyTemplate(tabIndex, templateData);
});

Then('clear pageList history', async () => {
  await wallboard.clearPageList();
});