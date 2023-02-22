const { When, Then } = require('@cucumber/cucumber');
const { CRM } = require('../page-objects/Crm.po');
const dayjs = require('dayjs');
const { BaseAction } = require('../setup/baseAction');

const crm = new CRM();
const baseAction = new BaseAction();

global.templateName = [];

When('user navigate to crm', async() => {
  await crm.openCrm();
}); 

Then('user search the call by using following configurations:', async(callDetails) => {
  let searchCallObject = callDetails.rowsHash();
  if(!searchCallObject.startLoadDate)
    searchCallObject.startLoadDate =  dayjs().format('YYYY-MM-DD');
  if(!searchCallObject.endLoadDate)  
    searchCallObject.endLoadDate =  dayjs().format('YYYY-MM-DD');
  if(!searchCallObject.agents)
    searchCallObject.agents = global.loggedInAgentName;
  if(searchCallObject.campaignType === 'Global'){
    const indexes = searchCallObject.campaigns.split(',');
    let temp ='';
    for (let i = 0; i < indexes.length; i++) {
      temp = temp + global.campaignName[indexes[i]];
      if(indexes.length!== (i+1)){
        temp = temp+ ',';
      }
    }
    searchCallObject.campaigns = temp;
  }
  if(searchCallObject.database){
    const indexes = searchCallObject.database.split(',');
    let temp = '';
    for (let i = 0; i < indexes.length; i++) {
      temp = temp + global.newDBName[indexes[i]].toString();
      if(indexes.length!== (i+1)){
        temp = temp + ',';
      }
    }
    searchCallObject.database = temp;
  } 
  await crm.searchCall(searchCallObject);
});

When('validate that the call is registered as per following configurations:', async(dataTable) => {
  const result = dataTable.rowsHash();
  result.callDate = dayjs().format('YYYY-MM-DD');
  await crm.validateCall(result);
});

When('validate different calls are registered as per following configurations:', async(dataTable) => {
  let databaseDetails = [];
  dataTable.hashes().forEach((element) => {
    databaseDetails.push({
      'row': 1,
      'phoneNumber': element.phoneNumber,
      'callOutcome': element.callOutcome,
      'termReason': element.termReason,
      'callDate': dayjs().format('YYYY-MM-DD')
    });
  });
  for(let i=0; i<databaseDetails.length; i++){
    await crm.openSelectedCall(databaseDetails[i].phoneNumber);
    await crm.validateCallDetails(databaseDetails[i]);
    await crm.return();
  }
});

When('validate multiple calls are registered as per following configurations:', async(dataTable) => {
  let databaseDetails = '';
  dataTable.hashes().forEach((element) => {
    databaseDetails = {
      'row' : element.row,
      'phoneNumber': element.phoneNumber,
      'agentName': element.agentName,
      'callOutcome': element.callOutcome,
      'owner': element.owner,
      'termReason': element.termReason,
      'subtype': element.subtype,
      'callDate': dayjs().format('YYYY-MM-DD')
    };
  });
  await crm.openCall();
  await crm.validateCallDetails(databaseDetails);
});

When('verify transfer history of call:', async(datatable) => {
  let details = datatable.rowsHash();
  await crm.verifyRemoteTransferCall(details);
});

When('validate the contact outcome {string} appear in contact info', async(outcome) => {
  await crm.validateContactInfo({contactOutcome: outcome});
});

When('select the callback tab and validate the scheduled callback is in the deleted state', async() => {
  await crm.clickCallbackTab();
  await crm.validateScheduledCallback();
});

When('select the script tab and validate the recording made through the script {string} are available', async(fileName) => {
  await crm.clickScriptTab();
  await crm.validateRecording(fileName);
});

When('validate that the call is registered:', async(dataTable) => {
  const result = dataTable.rowsHash();
  await crm.validateLead(result);
});

Then('validate the Assisted Transfer info:', async(dataTable) => {
  let databaseDetails = [];
  dataTable.hashes().forEach((element) => {
    databaseDetails.push({
      'row' : element.row,
      'destination': element.destination,
      'agent': element.agent,
      'result': element.result
    });
  });
  for (let i = 0; i < databaseDetails.length; i++) {
    await crm.validateAssistedTransfer(databaseDetails[i]);
  }
});

Then('user click on return button', async() => {
  await crm.return();
});

When('user click on transfer contacts button and fill the outcome', async(contactData) => {
  let contactDetails = contactData.rowsHash();
  contactDetails.database =  (await global.newDBName[contactDetails.database]);
  if (contactDetails.campaign) {
    contactDetails.campaign = global.campaignName[contactDetails.campaign];
  }
  await crm.transferContacts(contactDetails);
});

When('user navigates to Template Contact Fields submenu', async() => {
  await crm.openTemplateContactFeild();
});

When('user creates new template with following steps:', async(table) => {
  const templateData = table.rowsHash();
  let randomName = await baseAction.getRandomString('_Template');
  templateData.templateName =  await randomName.toString();
  global.templateName.push(templateData.templateName);
  await crm.createNewTemplate(templateData);
});

Then('user verify that the button Change outcome is disabled', async() =>{
  await crm.verifyChangeOutcomeDisabled();
});

When('user select few conatcts from the list:', async(table) =>{
  const contactList= table.rowsHash();
  await crm.selectAllContacts(contactList);
});

When('user clicks on change contacts outcome and enters details:', async(table) =>{
  const outcomeSettings = table.rowsHash();
  await crm.changeContactOutcome(outcomeSettings);
});

When('user select following contacts from the result:', async(table) =>{
  const contacts = table.rowsHash();
  await crm.selectContacts(contacts);
});

Then('user deletes the {string} template', async(templateIndex)=>{
  if(templateIndex==='all')
    await crm.deleteTemplate();
  else
    await crm.deleteTemplate(global.templateName[templateIndex]);
});

Then('verify the CRM search results against DB', async(table)=>{
  const dbDetails= table.rowsHash();
  await crm.verifyCRM(dbDetails);
});

Then('verify that the button Transfer contacts is disabled', async()=>{
  await crm.verifyTransferButtonDisabled();
});

Then('verify that on top of the table a information popover is presented, {string}', async(message)=>{
  await crm.verifyTopMessage(message);
});

Then('select the script tab and validate the script is completed with {string}', async(message) =>{
  await crm.clickScriptTab();
  await crm.validateScriptCompletion(message, global.scriptNew);
});