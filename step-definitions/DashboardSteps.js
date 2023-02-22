const { When, Then } = require('@cucumber/cucumber');
const { Dashboard } = require('../page-objects/Dashboard.po');
const { Homepage } = require('../page-objects/HomePage.po');

const dashboardobj = new Dashboard();
const homepageobj=new Homepage();

When('User navigate to dashboard page', async () => {
  await dashboardobj.navigateToDashboardPage();
});

When('User navigate to dashboard page in {string} window', async (session) => {
  await dashboardobj.navigateToDashboardPage(session);
});

When('User selects choose queue option', async () => {
  await dashboardobj.selectQueueOption();
});

When('User selects the {string} tab', async (tabName) => {
  await dashboardobj.selectTab(tabName);
});

Then('user selects the {string} tab in {string} window', async (tabName, session) => {
  await dashboardobj.selectTab(tabName, session);
});

When('User selects the agent tab', async () => {
  await dashboardobj.selectAgentTab();
});

Then('user selects the agent tab in {string} window', async (session) => {
  await dashboardobj.selectVoiceOutboundAgentTab(session);
});

When('user search for {string} in {string} window', async (name, session) => {
  await dashboardobj.searchName(name, session);
});

Then('verify agent is in {string} state in {string} tab',async (state, tab) => {
  await dashboardobj.verifyAgentStateInTicketTab(state, tab);
});

When('verify agent is in {string} state in voice tab in {string} window',async (state, session) => {
  await dashboardobj.verifyAgentStateInVoiceTab(state, session);
});

Then('User select the action tab in {string} window', async (session) => {
  await dashboardobj.selectActionTab(session);
});

Then('User click on Force Logout', async () => {
  await dashboardobj.forceLogoutAgent('second');
});

Then('verify that agent is succesfully Force logout', async () => {
  await homepageobj.verifyForceLogout();
});

When('validate the notification is displayed {string} in {string} window',async(message,session)=>{
  await dashboardobj.validateNotification(message,session);
});

When('user click on the Agent List icon of the queue {string}',async(inboundQueue)=>{
  await dashboardobj.agentListIcon(inboundQueue);
});

Then('user with in the modal select {string}',async(agent)=>{
  await dashboardobj.selectAgent(agent);
});

Then('user validate group and name modal is not visible',async()=>{
  await dashboardobj.validateModal();
});

When('verify {string} is in the list in voice inbound tab in {string} state in {string} window',async(accessType,state,session)=>{
  await dashboardobj.verifystateInInVoiceTab(accessType,state,session);
});