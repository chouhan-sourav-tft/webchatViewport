const { Given, When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/HomePage.po');
const { SendEmail } = require('../page-objects/SendEmail.po');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');
const { BaseAction } = require('../setup/baseAction');

const { userAccount, userData } = require('../fixtures/data.json');
const { SearchPage } = require('../page-objects/SearchPage.po');

const login = userAccount;
const homepageObj = new Homepage();
const baseAction = new BaseAction();
const sendEmailPage = new SendEmail();
const searchPage = new SearchPage();
const ticket = new ticketsOnline();

let previousQueueCounter = 0;
let newQueueCounter = 0;
let randomEmailSubject = '';
let subjectHash = '';
global.loggedInAgentName = '';
let previousQueueCounterSecondQueue = 0;
let newQueueCounterSecondQueue = 0;
let scriptName = 'Script_1';
let firstTicketID = '';
global.ticketID ='';
global.emailSubject ='';
global.emailSubjectOld ='';
//Step-1: Login
Given('User login to the platform as {string}', async (role) => {
  await homepageObj.openBrowserWithURL();
  await homepageObj.loginProcess(login[role]);
  await homepageObj.verifyPageDisplayed('dashboard');
  await homepageObj.verifyPageDisplayedRoleWise(role);
  global.loggedInAgentName = login[role].name;
  global.emailSubject = randomEmailSubject = baseAction.userID_Alpha_Numeric();
  if(role === 'admin'){
    global.emailSubjectOld = global.emailSubject;
  }
});

When('User selects send email option', async () => {
  await homepageObj.clickNavBarButton();
  await homepageObj.clickSendEmailBtn();
});

When('User inputs data in the following fields', async (datatable) => {
  await sendEmailPage.checkSendEmailScreenTitle();
  const result = datatable.rowsHash();
  await sendEmailPage.fillFormFields(
    result.queue,
    result.subject,
    result.mailbox,
    result.template
  );
  await sendEmailPage.browsAttachment(userData.attachment);
});

Then('User should see send email modal', async () => {
  await sendEmailPage.modalOpen();
});

When('User fills the email details using following data', async (datatable) => {
  const element = datatable.rowsHash();
  await sendEmailPage.emailModalToReply(element);
  await sendEmailPage.sendEmailAs(element.replyType);
});

When('User should {string} the email', async (action) => {
  await sendEmailPage.emailModalSend(action);
});

When('user navigate to send email option', async (table) => {
  const formData = table.rows();
  await ticket.clickNavBarButton();
  await ticket.clickSendEmailBtn();
  await ticket.checkSendEmailScreenTitle('Send e-mail'.toString());
  await ticket.fillFormFields(
    formData[0][0],
    formData[0][1],
    formData[0][2],
    formData[0][3]
  );
  await ticket.browsAttachment('email', userData.attachment);
  await ticket.nextButton();
});

When(
  'User access the ticket channel and search for the {string} ticket with subject {string}',
  async (status, subject) => {
    await homepageObj.navigateToTicketChannel();
    await ticket.ticketChannelAccessed();
    await ticket.openSearchScreen();
    let date = await ticket.getCurrentDate();
    await searchPage.addFilters(date, date, status, subject);
    await searchPage.searchTheFilter();
  }
);

Then(
  'Validate that the previously created ticket is correctly registered and in the {string} state with subject {string}',
  async (status, subject) => {
    await searchPage.validateSearchResult(status, subject);
  }
);

Then('user navigates to Send Email page', async () => {
  await homepageObj.clickNavBarButton();
  await homepageObj.clickSendEmailBtn();
  await sendEmailPage.checkSendEmailScreenTitle();
});

Then('User sends email with following informations', async (dataTable) => {
  //creating dynamic varibale as per datatable heading
  const result = dataTable.rowsHash();

  await ticket.fillFormFields(
    result.queue,
    result.subject,
    result.mailbox, 
    result.template
  );
  await sendEmailPage.browsAttachment(result.filename);
  await sendEmailPage.nextButton();
  await sendEmailPage.emailModalToReply(result, randomEmailSubject);
  await sendEmailPage.sendEmailAs(result.response);
  await sendEmailPage.emailModalSend('send');
  await ticket.verifyEmailSent();
});

Then(
  'user access the email and validate that this should have assigned agent',
  async () => {
    await ticket.openSearchScreen();
    await searchPage.addSubjectFilter(randomEmailSubject);
    await searchPage.searchTheFilter();
    await searchPage.getEmailDetailOpen();
    await ticket.validateAgent(global.loggedInAgentName);
  }
);

Then(
  'user access the email and validate that this should NOT have assigned agent',
  async () => {
    await ticket.openSearchScreen();
    await ticket.searchTicketByTicketID();
  }
);

Then('user validate for attachment is present and downloadable', async () => {
  await baseAction.verifyDownloadableFile(
    'a[download="' + userData.attachment + '"]',
    userData.attachment
  );
});

Then(
  'Set the queue of Ticket as {string} on Ticket Details page',
  async (queue) => {
    await ticket.changeTicketQueue(queue);
  }
);

When('User navigates to select the script and fill outs the email form along with attachments',
  async (dataTable) => {
    const result = dataTable.rowsHash();
    if (result.label) {
      await ticket.replyFormField(result, result.scriptName, result.label);
    } else { await ticket.replyFormField(result, scriptName);}
    await sendEmailPage.browsAttachment(userData.attachment, '(//button[@title="Attach files"])[1]');
    await ticket.emailAction(result.ticketAction);
    if (result.ticketAction == 'forward' || result.ticketAction == 'forward_with_attachments') {
      await sendEmailPage.emailModalToReply(result, randomEmailSubject);
    }
  }
);

Then('{string} the email response as {string}', async (emailAction, status) => {
  if (emailAction.includes('send')) await sendEmailPage.sendEmailAs(status);
  else await sendEmailPage.forwardEmailAs(status);
  await sendEmailPage.emailModalSend('send');
});

Then('Email should be received at the destination email address', async () => {
  await ticket.mailVerify('gocontact@getnada.com', subjectHash);     /// randomEmailSubject
});

When(
  'user searches for his ticket by using {string} as ticket status',
  async (status) => {
    let date = await baseAction.getCurrentDate();
    await searchPage.addFilters(date, date, status);
    await searchPage.searchTheFilter();
  }
);

Then(
  'User should see the ticket successfully with subject and date',
  async () => {
    await searchPage.validateDataTableResultData(
      await baseAction.getCurrentDate(),
      randomEmailSubject
    );
  }
);

When('user returns to search tab', () => {
  ticket.clickOnReturnButton();
});

When('User access ticket channel', async () => {
  await homepageObj.navigateToTicketChannel();
});

When('User access webchat channel', async () => {
  await homepageObj.navigateToWebchatChannel();
});

When(
  'Ticket Queue {string} has a SLA Template {string} Associated',
  async (queue, sla) => {
    await ticket.elementClick('Ticket Manager');
    await ticket.mapSLAQueue(queue, sla);
  }
);

When('{string} must be in Automatic Ticket Delivery hours', async (sla) => {
  await ticket.elementClick('SLA');
  await ticket.updateSLA(sla);
});

When('User navigate to ticket channel and take count of Ticket queue {string}', async (queue) => {
  await homepageObj.navigateToTicketChannel();
  previousQueueCounter = await ticket.fetchCurrentQueueCounter(queue);
});

Then('Validate the ticket is sent and counter is incremented for queue {string}', async (queue) => {
  await homepageObj.navigateToTicketChannel();
  newQueueCounter = await ticket.getUpdatedQueueCounter(queue);
  await ticket.verifyGreaterThan(previousQueueCounter, newQueueCounter);
  previousQueueCounter = newQueueCounter;
});

Then('agent finishes handling a ticket', async () => {
  await ticket.elementClick('Tickets');
  await ticket.validateTickets('subject1');
  await baseAction.wait(5);
  await ticket.validateTickets('subject2');
});

When('validate if Ticket is now available at {string} queue', async (queue) => {
  await homepageObj.navigateToTicketChannel();
  await ticket.openSearchScreen();
  await searchPage.addSubjectFilter(randomEmailSubject);
  await searchPage.searchTheFilter();
  await ticket.validateQueueChanged(queue, randomEmailSubject);
  await ticket.elementClick('return');
});

When('User navigate to ticket channel and take count of Ticket new queue {string}', async (queue) => {
  previousQueueCounterSecondQueue = await ticket.fetchCurrentQueueCounter(queue);
});

Then('Validate the ticket counter is incremented for new queue {string}', async (queue) => {
  newQueueCounterSecondQueue = await ticket.getUpdatedQueueCounter(queue);
  await ticket.verifyTextGreaterThan(previousQueueCounterSecondQueue, newQueueCounterSecondQueue);
});

Then('Validate ticket counter is decremented for queue {string}', async (queue) => {
  await homepageObj.navigateToTicketChannel();
  newQueueCounter = await ticket.getUpdatedQueueCounter(queue);
  await ticket.verifyTextGreaterThan(newQueueCounter, previousQueueCounter);
});

Then(
  'Validate the ticket counter is decremented for queue {string}',
  async (queue) => {
    await homepageObj.navigateToTicketChannel();
    newQueueCounter = await ticket.getUpdatedQueueCounter(queue);
    await ticket.verifyTextGreaterThan(newQueueCounter, previousQueueCounter);
  }
);
Then(
  'Validate that the ticket sent was successfully integrated in queue {string}',
  async (queue) => {
    await ticket.verifyTicket(queue, randomEmailSubject, true);
  }
);
When('validate if attachment is available', async () => {
  await ticket.validateAttachment(userData.attachment);
});
When('click on search tab', async () => {
  await ticket.openSearchScreen();
});
When('user returns to ticket tab', async () => {
  await ticket.elementClick('return');
});
When('user select the Call option and verify established', async () => {
  await ticket.verifyTicketCall();
});
When('user close the ticket with subject {string}', async (subject) => {
  await ticket.closeTicket(subject, randomEmailSubject);
});
Then(
  'Validate that ticket sent was successfully integrated in {string}',
  async (queue) => {
    await ticket.verifyTicket(queue, randomEmailSubject, false);
  });
When('user verify ticket with an information message about the call made:', async (datatable) => {
  let callData = '';
  datatable.hashes().forEach((element) => {
    callData = {
      campaign: element.campaign,
      outcome: element.outcome,
      subject: randomEmailSubject,
      agent: global.loggedInAgentName
    };
  });
  await ticket.verifyCallResponse(callData);
});

Then('fetch ticket id of created ticket',
  async () => {
    firstTicketID = await ticket.fetchTicketId();
  });
  
Then(
  'user navigate to merge ticket modal and search by ticket id',
  async () => {
    await ticket.clickSearchOptionByTicketId(firstTicketID);
    await ticket.addTicket();
  }
);


When('user navigate to the ticket channel and take count of Ticket queue {string}', async (queue) => {
  await homepageObj.navigateToTicketChannel();
  previousQueueCounter = await ticket.fetchCurrentQueueCounter(queue);
  await ticket.moveTicket(previousQueueCounter);
  previousQueueCounter = await ticket.getUpdatedQueueCounter(queue);
});

When('user search for ticket by subject',async()=>{
  await searchPage.addSubjectFilter(randomEmailSubject);
  await searchPage.searchTheFilter();
});

When('assign {string} to {string} agent',async(queue, agent)=>{
  await ticket.assignQueueToAgent(queue, agent);
});

When('user clicks script tab and selects the script', async () => {
  await ticket.openScriptTab(scriptName);
});

Then('email should be searched as {string}', async(status) => {
  await ticket.validateSearchedEmail(status, randomEmailSubject);
});

When('reset new subject',async()=>{
  randomEmailSubject = baseAction.userID_Alpha_Numeric();
  global.emailSubject = randomEmailSubject;
  global.emailSubjectOld = randomEmailSubject;
});

When('user clicks on close ticket', async()=>{
  await ticket.clickCloseTicketBtn();
});