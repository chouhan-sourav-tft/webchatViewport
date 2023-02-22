const { Given, When, Then } = require('@cucumber/cucumber');
const { WebchatPlugin } = require('../page-objects/WebchatPlugin.po');
const { WebchatChannel } = require('../page-objects/WebchatChannel.po');
const { BaseAction } = require('../setup/baseAction');
const { userAccount } = require('../fixtures/data.json');
const { Homepage } = require('../page-objects/HomePage.po');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');

const Webchat = new WebchatPlugin();
const WebchatCl = new WebchatChannel();
const action = new BaseAction();
const login = userAccount;
const homepage = new Homepage();
const ticket = new ticketsOnline();

let counter;
let hashString;
let hashStringReply = '';
let loginData = '';
global.chatId = '';
let ticketId = '';
global.webchatMsg = [];
global.queueName = [];

Given('User login to the GoContact dashboard as {string}', async (role) => {
  await action.openBrowser(global.BASE_URL);
  await homepage.loginProcess(login[role]);
  await homepage.verifyPageDisplayed('dashboard');
});

Given('user access the webChat channel', async () => {
  await Webchat.elementClick('Webchat Channel');
  counter = await WebchatCl.getWebChatCounter(false);
});
When(
  'user open a duplicate tab and send a message through Webchat plugin',
  async (table) => {
    hashString = 'Test Message' + new Date().getTime();
    hashStringReply = 'Test Reply' + new Date().getTime();
    global.webchatMsg.push(hashString);
    table.hashes().forEach((element) => {
      loginData = {
        contact: element.contact,
        email: element.email,
        message: hashString,
        tabSequence: element.tab,
      };
    });
    await Webchat.webchatLogin(loginData);
    await WebchatCl.switchtoOtherTab();
  }
);

When(
  'user open a duplicate tab and send a message through Webchat plugin and ticket is created',
  async (table) => {
    hashString = 'Test Message' + new Date().getTime();
    table.hashes().forEach((element) => {
      loginData = {
        contact: element.contact,
        email: element.email,
        message: hashString,
        tabSequence: element.tab,
      };
    });
    await Webchat.webchatLogin(loginData);
    ticketId = await WebchatCl.getTicketId();
    await WebchatCl.switchtoOtherTab();
  }
);

When(
  'user open previous tab and send a message through Webchat plugin',
  async (table) => {
    hashString = 'Test Message' + new Date().getTime();
    table.hashes().forEach((element) => {
      loginData = {
        contact: element.contact,
        email: element.email,
        message: hashString,
        tabSequence: element.tab,
      };
    });
    await Webchat.startChat(loginData);
  }
);

When('user open webchat plugin {string}', async (tab) => {
  await Webchat.webchatLogin({ tabSequence: tab });
  await WebchatCl.switchtoOtherTab();
});

Then(
  'verify message is received successfully and counter of message is updated successfully',
  async () => {
    await Webchat.elementClick('Webchat Channel');
    await WebchatCl.verifyCounter(Number(counter));
  }
);

Then(
  'validate received message appears in active tab with the status as New',
  async () => {
    await WebchatCl.webchatMessageStatus(hashString);
  }
);

Then('Validate the Unread Messages column', async () => {
  await WebchatCl.webchatUnreadMessage();
});

When(
  'user select the received message and reply the conservation',
  async () => {
    await WebchatCl.clickOnMessage(hashString);
    global.chatId = await WebchatCl.getChatId();
    global.webchatMsg.push(hashStringReply);
    await WebchatCl.replyOnMessage(hashStringReply);
  }
);

Then(
  'user {string} the conversation with subject {string}',
  async (status, subject) => {
    if (subject === 'WebchatChild_1') {
      global.webchatMsg.push('WebchatParent_1/WebchatChild_1');
    } else {
      global.webchatMsg.push(subject);
    }
    global.webchatMsg.push('Esta quase a ser atendido :)');
    global.webchatMsg.push('Client Offline');
    global.webchatMsg.push('UnRegister by Trigger');
    await WebchatCl.closeConversation(status, subject);
  }
);

Given('user access the webChat Manager', async () => {
  await Webchat.elementClick('Webchat Manager');
});

When(
  'user access {string} select edit option and click calendar tab',
  async (channelType) => {
    await WebchatCl.clickEditAction(channelType);
    await WebchatCl.clickCalendarTab();
  }
);

When(
  'user select a time outside the current time in calendar section',
  async () => {
    await WebchatCl.selectTimeOutsideCurrentTime();
  }
);

Then('save the changes successfully', async () => {
  await WebchatCl.clickSavebutton();
});

Then('user configure an exception for today and save changes', async () => {
  await WebchatCl.typeExceptionDate();
  await WebchatCl.selectExceptionWorkingTime();
  await WebchatCl.addExceptionButton();
});
When(
  'user goto settings and in properties configure following',
  async (table) => {
    await WebchatCl.clickSettingsTab();
    const properties = table.rowsHash();
    await WebchatCl.addProperties(properties);
  }
);

Then('Validate ticket created successfully', async () => {
  await ticket.elementClick('Tickets');
  await ticket.clickOnLastButton();
  await ticket.selectUpdatedSort();
  await ticket.openLatestTicket();
  ticketId = await ticket.getTicketId();
});

Then('Validate ticket in ticket channel', async () => {
  await ticket.elementClick('Tickets');
  await ticket.clickOnLastButton();
  await ticket.selectUpdatedSort();
  await ticket.openLatestTicket();
  ticketId = await ticket.getTicketId();
  await ticket.verifyTicketId(ticketId);
});

When('user access {string} select edit option', async (channelType) => {
  await WebchatCl.clickEditAction(channelType);
});

Then(
  'user navigate to ticket channel through action and create a ticket',
  async (datatable) => {
    await WebchatCl.clickWebChatActionButton('ticket');
    await ticket.verifyTicketChannelPageDisplayed('createTicketForm');
    const element = datatable.rowsHash();
    await ticket.fillCreateTicket(element);
    await ticket.elementClick('createTicket');
  }
);

Then(
  'user access the webchat channel and validate the webchat conservation for ticket',
  async () => {
    await Webchat.elementClick('Webchat Channel');
    await WebchatCl.verifyTicketIdInWebChatConversation(ticketId);
  }
);

Then('user mark message as {string}', async (action) => {
  await WebchatCl.clickWebChatActionButton(action);
});

When(
  'user navigate to search and search by following attributes',
  async (table) => {
    await WebchatCl.clickSearchTab();
    let searchdata = '';
    table.hashes().forEach((element) => {
      searchdata = {
        email: element.email,
        status: element.status,
        chatId: global.chatId,
      };
    });
    await WebchatCl.searchWebChat(searchdata);
  }
);

Then(
  'validate the conversation is correctly registered and in {string} status',
  async (status, table) => {
    let searchdata = '';
    table.hashes().forEach((element) => {
      searchdata = {
        email: element.email,
        status: status,
        from: element.from,
        chatId: global.chatId,
        clientMessage: hashString,
        select: element.select,
      };
    });
    await WebchatCl.verifyChatResultInSearchTab(searchdata);
  }
);

Then('verify webchat error message {string}', async (message) => {
  await WebchatCl.verifyWebChatOutOfSchedule(message);
});


When('user reply to received message with {string} template', async (tempName) => {
  await WebchatCl.clickOnMessage(hashString);
  await WebchatCl.replyWithTemplate(tempName);
});

When(
  'validate template is received in the client plugin with {string}',
  async (message) => {
    await WebchatCl.validateTemplateAtClient(message);
  }
);

When(
  'the template is successfully answered by customer as {string}',
  async (answer) => {
    await WebchatCl.answerTemplate(answer);
  }
);

When(
  'the template of type select is successfully answered by customer as {string}',
  async (answer) => {
    await WebchatCl.selectOptionTemplate(answer);
  }
);

When(
  'agent is notified the response by customer as {string}',
  async (answer) => {
    await WebchatCl.verifyAnswerTemplate(answer);
  }
);

When(
  'user delete {string} exception and reset settings',
  async (channelType) => {
    await Webchat.elementClick('Webchat Manager');
    await WebchatCl.clickEditAction(channelType);
    await WebchatCl.clickCalendarTab();
    await WebchatCl.deleteException();
    await WebchatCl.clickSettingsTab();
    await WebchatCl.resetProperties();
  }
);

When('user delete {string} exception', async (channelType) => {
  await WebchatCl.switchtoOtherTab();
  await Webchat.elementClick('Webchat Manager');
  await WebchatCl.clickEditAction(channelType);
  await WebchatCl.clickCalendarTab();
  await WebchatCl.deleteException();
});

When('user reset {string} calendar', async (channelType) => {
  await WebchatCl.switchtoOtherTab();
  await Webchat.elementClick('Webchat Manager');
  await WebchatCl.clickEditAction(channelType);
  await WebchatCl.clickCalendarTab();
  await WebchatCl.resetCalendarSchedule();
});

When('user reset {string} settings', async (channelType) => {
  await Webchat.elementClick('Webchat Manager');
  await WebchatCl.clickEditAction(channelType);
  await WebchatCl.clickSettingsTab();
  await WebchatCl.resetProperties();
});

When('select received message', async () => {
  await WebchatCl.clickOnMessage(hashString);
});

When('verify previous conversation', async () => {
  await WebchatCl.clickOnPreviousConversation();
  await WebchatCl.verifyPreviousConversation(hashString);
  await WebchatCl.previewConversation(hashString, hashStringReply);
});

When('user edit the {string} queue', async (queue) => {
  await WebchatCl.searchQueue(queue);
  await WebchatCl.editQueue(queue);
});

When('add new agent {string}', async (agent) => {
  await WebchatCl.addNewAgent(agent);
});

When('user Transfer Conversation to agent {string}', async (agent) => {
  await WebchatCl.transferConversationToNewAgent(agent);
});

When('validate transfer successfully to agent {string}', async (agent) => {
  await WebchatCl.validateTransferConversation(agent);
});

Then(
  'customer is notified that the agent has changed to {string}',
  async (agent) => {
    await WebchatCl.customerNotifyAgentChange(agent);
  }
);


When('user Transfer Conversation to {string} queue', async (queueName) => {
  await WebchatCl.transferConversationToNewQueue(queueName);
});

When(
  'validate transfer successfully to {string} queue with {string} channel',
  async (queueName, channel) => {
    await WebchatCl.validateTransferConversationQueue(
      queueName,
      channel,
      hashString
    );
  }
);

When('agent login the webChat channel', async () => {
  await Webchat.elementClick('Webchat Channel', 'second');
  await WebchatCl.switchtoOtherTab();
});

When('user upload {string} css file', async (fileName) => {
  await Webchat.elementClick('Webchat Setting');
  await WebchatCl.uploadCssFile('fixtures/' + fileName);
});

Then('verify the plugin Webchat have Chat ID information', async () => {
  global.chatId = await Webchat.getChatId();
});

Then('validate the Chat ID through Webchat Channel', async () => {
  await WebchatCl.switchTab();
  await WebchatCl.verifyChatIdFromPlugin(global.chatId);
});

When('user verify reply option', async () => {
  await Webchat.verifyReplyOption();
});

When('update contact info if not added {string}', async (contactNumber) => {
  await Webchat.updateContactNumber(contactNumber);
});

When('user click on Webchat call', async () => {
  await Webchat.clickToCall();
});

When(
  'user verify webchat with an information message about the call made:',
  async (datatable) => {
    let callData = '';
    datatable.hashes().forEach((element) => {
      callData = {
        termReason: element.termReason,
        campaign: element.campaign,
      };
    });
    await Webchat.verifyWebchatCall(callData);
  }
);

When('select received message in {string} window', async (type) => {
  await WebchatCl.clickOnMessage(hashString,type);
});

When('user click on return button of webchat in {string} window',async(type)=>{
  await WebchatCl.returnOnWebchatTab(type);
});

When('User deletes all previous exceptions for {string}', async (channelType) => {
  Webchat.elementClick('Webchat Manager');
  await WebchatCl.clickEditAction(channelType);
  await WebchatCl.clickCalendarTab();
  await Webchat.deleteAllException();
});

When('clear webchat message',async()=>{
  global.webchatMsg = [];
  global.chatId = '';
  global.queueName = [];
  ticketId = '';
});

Then('user assign agents to the group', async(agents) => {
  const agentData = agents.rowsHash();
  await WebchatCl.assignAgent(agentData);
});

Then('user navigate to Queue and search {string}', async(queue) => {
  await WebchatCl.searchQueue(queue);
});

Then('In access agent user set the profile', async() => {
  await WebchatCl.setProfile();
});

Then('user validate manage assignments and {string} {string} queue', async(actionType, queueName) => {
  if(actionType === 'assign'){
    await WebchatCl.assignQueue(queueName);
  }else{
    await WebchatCl.validateQueue(queueName);
  }
});

Then('validate user has access to the group', async(details) => {
  const queueDetails = details.rowsHash();
  await WebchatCl.validateChannel(queueDetails);
});

Then('user delete the assigned queue {string}', async(queueName) => {
  await WebchatCl.deleteAssignedQueue(queueName);
});

When('user create a new queue', async(dataTable) => {
  const queueData = dataTable.rowsHash();
  let randomQueueName = await action.getRandomString('_queue');
  queueData.queueName = await randomQueueName.toString();
  global.queueName.push(queueData.queueName);
  let randomName = await action.getRandomString('_path');
  queueData.pathName = await randomName.toString();
  await WebchatCl.createQueue(queueData);
});

Then('validate {string} queue is successfully created', async(queueIndex) => {
  await WebchatCl.searchQueue(global.queueName[queueIndex]);
});

Then('delete the {string} queue', async(queueIndex) => {
  await WebchatCl.deleteQueue(global.queueName[queueIndex]);
});

Then('user search and edit {string} queue', async(queueIndex) => {
  await WebchatCl.searchQueue(global.queueName[queueIndex]);
  await WebchatCl.editQueue(global.queueName[queueIndex]);
});

Then('validate webchat channel {string} with queue {string} is not configured for the user', async(channel, queue) => {
  await WebchatCl.validateChannelQueueVisibility(channel, queue);
});
