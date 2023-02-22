/*global newSubject */
const { When, Then} = require('@cucumber/cucumber');
const { QualityManager } = require('../page-objects/QualityManager.po');
const { Homepage } = require('../page-objects/HomePage.po');
const dayjs = require('dayjs');
let auditedDate = '';

const qualityManager = new QualityManager();
const homepage = new Homepage();

When('Access the Quality Manager menu', async () => {
  await homepage.navigateToQualityManager();
});

When('select call from results list', async () => {
  await qualityManager.selectCall();
});

When('select ticket from results list', async () => {
  await qualityManager.selectTicket();
});

Then('Validate the data referring to the audit are correctly filled as', async (dataTable) => {
  await qualityManager.wait(15);  //added wait to load the page
  const auditData = dataTable.rowsHash();
  await qualityManager.validateAuditData(auditData);
});

Then('Validate the table that all data relating to the audit are correctly filled as', async (dataTable) => {
  const callTableData = dataTable.rowsHash();
  if(callTableData.subject){
    callTableData.subject = newSubject;
  }
  if(callTableData.table === 'ticket')
    await qualityManager.validateTicketTableData(callTableData);
  else 
    await qualityManager.validateCallTableData(callTableData);  
});

When('user select the {string} and assign following points',async(element,table)=>{  
  let inputDetails=table.rowsHash();
  await qualityManager.fillPoints(element,inputDetails);  
});

When('user select script', async () => {
  //added wait to load script
  await qualityManager.wait(10);
  await qualityManager.selectScript(global.scriptNew);
});

Then('user fills in the following search filters:', async (callDetails) => {
  let searchCallObject = callDetails.rowsHash();
  if(!searchCallObject.startLoadDate)
    searchCallObject.startLoadDate =  dayjs().format('YYYY-MM-DD');
  if(!searchCallObject.endLoadDate)  
    searchCallObject.endLoadDate =  dayjs().format('YYYY-MM-DD');
  if(!searchCallObject.agents)
    searchCallObject.agents = global.loggedInAgentName;
  await qualityManager.searchCall(searchCallObject,auditedDate);
});

When('verify that the state of audit is {string}', async (auditType) => {
  await qualityManager.verifyStateOfAudit(auditType);
});

When('user selects {string} option', async (option) => {
  await qualityManager.selectOption(option);
});

When('user fills the script with:', async (scriptDetails) => {
  let fillScriptObject = scriptDetails.rowsHash();
  await qualityManager.fillScript(fillScriptObject);
});

Then('User select {string} of the {string} {string} from list', async (count, scriptType, callType) => {
  await qualityManager.selectMultipleCalls(count,scriptType, callType);
});

Then('select complete audit of multiple selected calls and verify {string}', async (message) => {
  await qualityManager.completeAuditsOfSelectedCalls(message);
});

When('user select script {string}', async (scriptType) => {
  //added wait to load script
  await qualityManager.wait(10);
  if(scriptType === 'qualitymanager_script1'){
    await qualityManager.selectScript(global.scriptOld);
  }
  else{
    await qualityManager.selectScript(global.scriptNew);
  }
});


When('user select ticket from results list',async()=>{
  await qualityManager.selectTicket();
});

When('user search the ticket table by {string}', async (input) => {
  if(input === 'subject'){
    await qualityManager.searchTicketTable(newSubject);
  }
});

When('user get audited date', async () => {
  auditedDate = await qualityManager.getAuditedDate();
});

Then('validate multiple calls are audited as per following configurations:', async (dataTable) => {
  let callTableData = [];
  dataTable.hashes().forEach((element) => {
    callTableData.push({
      'row' : element.row,
      'note': element.note,
      'phone': element.phone,
      'agent': element.agent,
      'fAuditor': element.fAuditor,
      'lAuditor': element.lAuditor,
      'state': element.state
    });
  });
  for (let i = 0; i < callTableData.length; i++) {
    await qualityManager.validateCallTableDetails(callTableData[i]);
  }  
});

When('clear active parameters', async () => {
  auditedDate = '';
  global.ticketID = '';
});
