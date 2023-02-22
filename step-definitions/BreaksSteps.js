const { When, Then } = require('@cucumber/cucumber');
const { Breaks } = require('../page-objects/Breaks.po');

const Break = new Breaks();

let breakName = '';

Then('Access the {string} menu', async (menu) => {
  await Break.elementClick(menu);
});

When('Select {string} group', async (group) => {
  await Break.selectGroup(group);
});

When('Create a new break with following configurations:', async (datatable) => {
  let breakData = '';
  let breakBtn = true;
  datatable.hashes().forEach((element) => {
    breakName = element.breakName + new Date().getTime();
    if(element.breakBtn){
      breakBtn = false;
    }
    breakData = {
      breakName: breakName,
      auth: element.auth,
      startTime: element.startTime,
      endTime: element.endTime,
      maxTime: element.maxTime,
      breakBtn: breakBtn
    };
  });
  await Break.createBreak(breakData);
});

When('Add agent {string} to the group', async (agent) => {
  await Break.addAgent(agent);
});

Then('verify No calls are triggered when campaign {string}',async (CampaignType) => {
  await Break.noCallsTriggered(CampaignType);
});

Then('Database contacts are loaded in interface', async (datatable) => {
  let databaseDetails = '';
  datatable.hashes().forEach((element) => {
    databaseDetails = {
      numOfColumnsToUpload: element.numOfColumnsToUpload,
    };
  });
  await Break.verifyContactsLoadedInVoiceChannel(databaseDetails);
});

Then('Database contacts are loaded in interface in {string} window', async (datatable, session) => {
  let databaseDetails = '';
  datatable.hashes().forEach((element) => {
    databaseDetails = {
      numOfColumnsToUpload: element.numOfColumnsToUpload,
    };
  });
  await Break.verifyContactsLoadedInVoiceChannel(databaseDetails, session);
});

When('request the break with auth {string}', async (auth) => {
  await Break.requestForBreak(breakName, auth);
});

When('admin {string} break request', async (actionTaken) => {
  await Break.actionOnBreakRequest(breakName, actionTaken);
});

Then('agent is notified about break {string} in {string} window', async (actionTaken, session) => {
  await Break.agentNotifyAction(breakName, actionTaken, session);
});

When('Set max user on Break to {string}', async (value) => {
  await Break.setMaxuser(value);
});

When('request the break on max user limit', async () => {
  await Break.requestForBreakOnLimit(breakName);
});

When('validate exceed paused time', async () => {
  await Break.exceedTimeValidate(breakName);
});

When('request the break with auth {string} in {string} window', async (auth, session) => {
  await Break.requestForBreak(breakName, auth, session);
});

When('user deletes all previous breaks', async () => {
  await Break.deleteAllPreviousBreaks();
});

Then('verify error message displayed when daily maximum tries limit reached', async () => {
  await Break.maximumTriesErrorMessage();
});

Then('Access the {string} menu in {string} window', async (menu,type) => {
  await Break.elementClick(menu,type);
});

When('user clicks add break button', async()=>{
  await Break.addBreak();
});

Then('user validates that the number of Max users global are {string} by default', async(maxUsers)=>{
  await Break.verifyMaxUsersGlobal(maxUsers);
});

Then('user checks ignore max global option and selects {string} custom max users', async(maxUsers)=>{
  await Break.checkIgnoreMaxGlobal(maxUsers);
});

Then('user verify that {string} notification is displayed', async(message)=>{
  await Break.verifyNotification(message);
});

Then('verify error message displayed when contact maximum tries limit reached',async () => {
  await Break.maximumTriesErrorMessage();
});