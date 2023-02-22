const { When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/HomePage.po');
const { InternalChat } = require('../page-objects/InternalChat.po');
const loginData = require('../fixtures/data.json');
const { Breaks } = require('../page-objects/Breaks.po');
const { AgentQuality } = require('../page-objects/AgentQuality.po');

const login = loginData.userAccount;
const homepageObj = new Homepage();
const internalChat = new InternalChat();
const breaks = new Breaks();
const agentQuality = new AgentQuality();

let previousCounter = 0;
let newCounter = 0;

When('user access profile manager menu', async () => {
  await internalChat.navigateToProfileManagerPage();
});

When('user selects {string} tab', async (userType) => {
  await internalChat.selectAgentTab(userType);
});

When('user selects {string} chat access', async (accessType) => {
  await internalChat.selectChatAccess(accessType);
});

When('user save the settings', async () => {
  await internalChat.saveSetting();
});

When('I re-login using {string} account', async (userType) => {
  await homepageObj.logout();
  await homepageObj.loginProcess(login[userType]);
  await homepageObj.verifyPageDisplayed();
  await homepageObj.verifyPageDisplayedRoleWise(userType);
  await homepageObj.deleteRedisCall('same');
});

When('user select messaging option', async () => {
  await homepageObj.clickOnMessagingOption();
});

Then('user should not have chat access', async () => {
  await homepageObj.verifyChatAccess();
});

Then('user should see active user list', async () => {
  await homepageObj.verifyActiveUserList();
});

When('user enables broadcast messages', async () => {
  await internalChat.selectBroadcastMessageCheckbox();
});

When('user selects send broadcast message option', async () => {
  await homepageObj.clickOnBroadcastMessageOption();
});

When('user selects send broadcast message to all agent option', async () => {
  await homepageObj.sendBroadcastMessageToAllAgent();
});

When(
  'user selects send broadcast message to particular {string} agent option',
  async (agent,dataTable) => {
    let data= dataTable.rowsHash();
    await homepageObj.sendBroadcastMessageToParticularAgent(agent,data);
  }
);

Then('user verifies broadcast message is send', async () => {
  await homepageObj.verifyBroadcastMessageIsSent();
});

Then('user verifies broadcast message is send to agent', async () => {
  await homepageObj.logout();
  await homepageObj.loginProcess(login['admin']);
  await homepageObj.verifyPageDisplayed('dashboard');
  await homepageObj.verifyPageDisplayedRoleWise('admin');
  await homepageObj.verifyMessageIsRecieved();
});

When('user selects user from users tab', async () => {
  await homepageObj.selectUserFromUsersTab(login['admin']);
});

When('user send a message', async () => {
  await homepageObj.sendMessageToSelectedUser();
});

Then('user should see the sent message', async () => {
  await homepageObj.navigateToHomePage();
  await homepageObj.verifyMessageIsRecieved();
});

When('verify admin is online for agent account', async () => {
  await homepageObj.openNewBrowserSessionAndVerifyUser(
    login['Agent_1'],
    login['admin'].name
  );
});

When('verify agent is online for another agent account', async () => {
  await homepageObj.openNewBrowserSessionAndVerifyUser(
    login['Agent_2'],
    login['Agent_1'].name
  );
});

When('user login to the platform with {string} account in {string} window', async (userType, session) => {
  await breaks.openNewBrowserSession(session);
  await homepageObj.loginProcess(login[userType], session);
  await homepageObj.verifyPageDisplayed('dashboard', session);
  await homepageObj.verifyPageDisplayedRoleWise(userType, session);
  await homepageObj.wait(5);//wait for page to load
  await homepageObj.deleteRedisCall(session);
});

When('user send a message in {string} window', async (session) => {
  await homepageObj.sendMessageToSelectedUser(session);
});

When('user switch the tab',async () => {
  await homepageObj.switchTab();
});

When('user select messaging option in {string} window', async (session) => {
  await homepageObj.clickOnMessagingOption(session);
});

When('user selects user from users tab in {string} window', async (session) => {
  await homepageObj.selectUserFromUsersTab(login['admin'], session);
});

When('close the {string} window session', async (session) => {
  await breaks.closeBrowserSession(session);
});

When('user navigate to homepage', async() => {
  await homepageObj.navigateToHomePage();
});

When('user get the counter of message in {string} window',async(type)=>{
  previousCounter= await internalChat.getCounter(type);
});

When('user get the counter of message',async()=>{
  previousCounter= await internalChat.getCounter();
});

When('user verify counter is increased in {string} window',async(type)=>{
  await internalChat.wait(2);//wait for counter to be loaded
  newCounter = await internalChat.getCounter(type);
  await internalChat.verifyGreaterThan(previousCounter,newCounter);
});

When('user verify counter is increased',async()=>{
  await internalChat.wait(2);//wait for counter to be updated
  newCounter = await internalChat.getCounter();
  await internalChat.verifyGreaterThan(previousCounter,newCounter);
});

Then('user access the notification in {string} window',async(type) =>{
  await homepageObj.clickOnMessagingOption(type);
  await homepageObj.notificationTab(type);
});

Then('user access the notification',async() =>{
  await homepageObj.clickOnMessagingOption();
  await homepageObj.notificationTab();
});

Then('user confirm that the top notification is unread in {string} window',async(type) => {
  await internalChat.verifyUnreadNotification(type);
});

Then('user confirm that the top notification is unread',async() => {
  await internalChat.verifyUnreadNotification();
});

Then('user confirm mark all read button is enabled and click it in {string} window',async(type) => {
  await internalChat.markAllReadEnable(type);
});

Then('user confirm mark all read button is enabled and click it',async() => {
  await internalChat.markAllReadEnable();
});

Then('user confirm that mark all read button is disabled in {string} window',async(type) => {
  await internalChat.markAllReadDisabled(type);
});

Then('user confirm that mark all read button is disabled',async() => {
  await internalChat.markAllReadDisabled();
});

Then('user verify message is visible {string} in {string} window',async(text,type)=>{
  await internalChat.verifyUnreadNotificationText(text,type);
});

Then('user verify message is visible {string}',async(text)=>{
  await internalChat.verifyUnreadNotificationText(text);
});

Then('user confirm that the notifications counter is no longer presented in {string} window',async(type)=>{
  await homepageObj.verifyNoCounter(type);
});

Then('user confirm that the notifications counter is no longer presented',async()=>{
  await homepageObj.verifyNoCounter();
});

When('Select {string} tab from agent quality page',async(tabName)=>{
  await agentQuality.clickTab(tabName);
});

When('user make a suggest message',async()=>{
  await agentQuality.makeASuggestion();
});

When('user verify and select mask number checkbox', async()=>{
  await internalChat.verifyAndSelectMaskNumber();
});

When('user uncheck masked number checkbox', async()=>{
  await internalChat.uncheckMaskNumber();
});
