const { Given, When, Then } = require('@cucumber/cucumber');
const { WebchatPlugin } = require('../page-objects/WebchatPlugin.po');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');
const { BaseAction } = require('../setup/baseAction');
const dayjs = require('dayjs');

const Webchat = new WebchatPlugin();
const ticket = new ticketsOnline();
const baseAction = new BaseAction();

let hashString = '';
let hashStringReply = '';
let mailboxSubject = '';

global.triggerName = [];
global.fileName = '';
global.message = '';

Given(
  'user log in to the Webchat plugin and send a message with following configurations:',
  async (datatable) => {
    let loginData = '';
    hashString = 'Test Message' + new Date().getTime();
    hashStringReply = 'Test Reply' + new Date().getTime();
    datatable.hashes().forEach((element) => {
      loginData = {
        contact: element.contact,
        email: element.email,
        message: hashString,
        tabSequence: element.tab,
        window: element.window
      };
    });
    await Webchat.webchatLogin(loginData);
  }
);

When('user opens Duplicate browser tab', async () => {
  await Webchat.webchatDuplicateTab();
});

When('transfers the session to the new tab', async () => {
  await Webchat.webchatTransferChat();
});

Then(
  'verify session in the original browser is successfully terminated',
  async () => {
    await Webchat.webchatSessionCheck();
  }
);

When('user edit {string} channel', async (webchatChannel) => {
  await Webchat.switchToMainTab();
  await Webchat.elementClick('Webchat Manager');
  await Webchat.searchAndEditChannel(webchatChannel);
});

When('setting with following configurations:', async (datatable) => {
  let settingData = '';
  datatable.hashes().forEach((element) => {
    settingData = {
      maxFileSize: element.maxFileSize,
      fileFormat: element.fileFormat,
    };
  });
  await Webchat.elementClick('Webchat Setting');
  await Webchat.updateConfiguration(settingData);
});

When('User logout with current session', async () => {
  await Webchat.logoutSession();
});

When('access the {string}', async (webchatChannel) => {
  await Webchat.elementClick(webchatChannel);
});

When(
  'send {string} file and verify if {string} {string}',
  async (fileName, type, message) => {
    global.fileName = fileName;
    await Webchat.elementClick('Webchat Option');
    await Webchat.uploadFile(fileName);
    await Webchat.verifyUploadMessage(type, message);
  }
);

When(
  'validate message received successfully in {string} tab & {string} status',
  async (tab, status) => {
    await Webchat.verifyMessage(hashString, tab, status, global.fileName, global.message);
  }
);

When('validate uploaded file {string} with {string}', async (type, msg) => {
  await Webchat.checkUpload(hashString, type, msg);
});

When('user reply to received message for {string} client plugin', async (type) => {
  await Webchat.replyOnThread(hashStringReply, type);
});

When('validate message is received in the {string} client plugin', async (type) => {
  await Webchat.validateMessage(hashStringReply, '', type);
});

When(
  'user {string} the {string} conversation with the subject {string}',
  async (status, type, subject) => {
    await Webchat.closeConversation(status, type, subject);
  }
);

When(
  'customer is notified that the agent has {string} the conversation',
  async (status) => {
    await Webchat.validateMessage(hashStringReply, status);
  }
);

When('user change name {string}', async (name) => {
  await Webchat.changeName(name);
});

When('verify if {string}', async (msg) => {
  await Webchat.validateClientMessage(msg);
});

When('user change language {string}', async (language) => {
  await Webchat.changeLanguage(language);
});

When('validate translation {string}', async (translatedText) => {
  await Webchat.validateLanguage(translatedText);
});

When('user reply to received message by selecting Request rating', async () => {
  await Webchat.requestRating(hashStringReply);
});

When('verify {string} with {string} star and {string} message', async (type, rating, message) => {
  await Webchat.verifyRating(rating, message, type);
});

When('setting {string} to {string}', async (settingType, actionType) => {
  await Webchat.elementClick('Webchat Setting');
  await Webchat.updateSetting(settingType, actionType);
});
Then('Validate that Rate chat option available', async () => {
  await Webchat.validateRateChat();
});

Then('client sends {string} with {string} star and {string} message', async (type, rate, message) => {
  global.message = '[COMMENT]' + ' ' + message;
  await Webchat.SendRating(type, rate, message);
});

When('user open a duplicate tab and open Webchat plugin', async () => {
  await Webchat.webchatLogin({ tabSequence: 'second' });
});
Then(
  'verify the plugin Webchat has CSS Background color {string}',
  async (color) => {
    await Webchat.verifyCssproperty(color);
  }
);
When(
  'validate conversation started at {string} side as {string}',
  async (type, name) => {
    await Webchat.verifyConversationStarted(type, name);
  }
);
When('user switch to main tab', async () => {
  await Webchat.switchToMainTab();
});
When('verify if {string} exist', async (mailbox) => {
  await Webchat.checkMailbox(mailbox);
});
When('update webchat setting with:', async (datatable) => {
  await Webchat.elementClick('Webchat Setting');
  let mailboxSetting = '';
  datatable.hashes().forEach((element) => {
    mailboxSubject = element.MailboxName + new Date().getTime();
    mailboxSetting = {
      Mailbox: element.Mailbox,
      Setting: element.Setting,
      MailboxName: element.MailboxName,
    };
  });
  await Webchat.updateMailboxSetting(mailboxSetting, mailboxSubject);
});
When('user select the conversation', async () => {
  await Webchat.selectTheConversation();
});
When('verify the plugin Webchat have Send Chat by Email', async () => {
  await Webchat.sendChatByEmail();
});
When(
  'validate if email is sent to the client on {string} with a copy of conversation',
  async (clientEmail) => {
    await ticket.mailVerify(clientEmail, mailboxSubject);
  }
);

When('User logout with current session in {string} window', async (session) => {
  await Webchat.logoutSession(session);
});

Then('user navigate to triggers tab', async () => {
  await Webchat.navigateToTriggersTab();
});

Then('select add trigger option', async () => {
  await Webchat.addTrigger();
});

When('User fill the trigger details:', async (dataTable) => {
  const triggerData = dataTable.rowsHash();
  if (!triggerData.triggerName) {
    let randomAgentName = await baseAction.getRandomString('_Agent');
    triggerData.triggerName = await randomAgentName.toString();
    global.triggerName.push(triggerData.triggerName);
  } else
    global.triggerName.push(triggerData.triggerName);
  if (triggerData.timer) {
    triggerData.delay = triggerData.timer;
  }
  await Webchat.triggerDetails(triggerData);
});

Then('customer verify {string} name and {string} message displayed', async (sender, message) => {
  await Webchat.verifyMessageAndSender(sender, message);
});

Then('user deletes the {string} trigger action', async (triggerIndex) => {
  await Webchat.navigateToTriggersTab();
  await Webchat.deleteTrigger(global.triggerName[triggerIndex]);
});

Then('let user reset the trigger action', async () => {
  global.triggerName = [];
});

Then('validate received message is not present in active tab', async () => {
  await Webchat.webchatMessageInactive(hashString);
});

Then('user access {string} tab', async (tabName) => {
  await Webchat.accessMessageTab(tabName);
});

Then('verify close webchat modal is {string} displayed', async (status) => {
  await Webchat.verifyCloseWebchatModal(status);
});

When('user open unread conversation', async () => {
  await Webchat.openUnreadMessage();
});

Then('user edit trigger action {string}', async (action) => {
  await Webchat.clickToEditTriggerAction(action);
});

Then('user clicks Return to Inbox', async () => {
  await Webchat.clickReturnToInbox();
});

When('user search webchat message with following configurations:', async (dataTable) => {
  const webchatSearchData = dataTable.rowsHash();
  webchatSearchData.startDate = dayjs().format('DD-MM-YYYY');
  webchatSearchData.endDate = dayjs().format('DD-MM-YYYY');
  await Webchat.webchatFilter(webchatSearchData);
});

Then('Confirm after {string} seconds since message has been sent the {string} plugin is closed on the web page', async (time, pluginWindow) => {
  await Webchat.isPluginClosed(time, pluginWindow);
});

Then('Confirm that the {int} conversation container is highlighted with a border {string}', async (msgIndex, color) => {
  await Webchat.checkContainerBorder(msgIndex, color);
});

Then('Verify that in place of the new messages counter a warning icon is displayed', async () => {
  await Webchat.warningIconDisplayed();
});

Then('Verify that on hover over warning icon the title {string} is displayed', async (message) => {
  await Webchat.verifyTooltipMessage(message);
});

Then('Close the close webchat conversation modal', async () => {
  await Webchat.closeWebchatModal();
});

Then('verify that the close button is {string} aligned', async (alignment) => {
  await Webchat.verifyTextAlignment(alignment);
});

Then('verify subject selector label is preceded by asterisk', async () => {
  await Webchat.verifyAsterik();
});

Then('verify an icon {string} is displayed preceding the modal title', async (iconClass) => {
  await Webchat.verifyIconVisible(iconClass);
});

When('user click the close conversation button', async () => {
  await Webchat.clickCloseConversation();
});

When('user enter {string} subject and {string} conversation', async (subject, status) => {
  await Webchat.closeConversationWithSub(subject, status);
});

When('user selects message {int}', async (msgIndex) => {
  await Webchat.selectMessage(msgIndex);
});

When('user verify previous message is {string} successfully', async (messageStatus) => {
  let randomStringMessage = hashString;
  if (global.webchatMsg[0]) {
    randomStringMessage = global.webchatMsg[0];
  }
  await Webchat.verifyMessageStatus(randomStringMessage, messageStatus);
});

When('Verify that the button Transfer Conversation is no longer displayed', async () => {
  await Webchat.verifytransferConversations();
});

When('Verify that conversations from message {string} present the layout of closed by trigger', async (msgIndex) => {
  await Webchat.verifyLayout(msgIndex);
});

When('set viewport for webchatPlugin', async () => {
  global.secondContext = await global.browser.newContext({ viewport: null, launchOptions: {args: ["--start-maximized"]} });
  global.secondSession = await global.secondContext.newPage();
});