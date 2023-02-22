const { BaseAction } = require('../setup/baseAction');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');
const { Homepage } = require('../page-objects/HomePage.po');
const { When, Then } = require('@cucumber/cucumber');

const baseAction = new BaseAction();
const tickets = new ticketsOnline();
const homepageObj = new Homepage();

let previousQueueCounter = 0;
let newQueueCounter = 0;

Then('Access the {string} Channel', async (channelNAme) => {
  await tickets.switchChannelToggle((await channelNAme).toString());
});

Then('refresh the page', async () => {
  await homepageObj.reloadPage();
});

Then(
  'Switch to {string} Tickets as Active state and select {string} of the tickets',
  async (ticketState, num) => {
    await tickets.selectTicketsActiveState(ticketState);
    await tickets.selectTicketFromTicketList(num);
  }
);

Then('Validate the NEW tickets counter is incremented', async () => {
  await homepageObj.navigateToTicketChannel();
  newQueueCounter = await tickets.getUpdatedNewTicketsCounter();
  await baseAction.verifyGreaterThan(previousQueueCounter, newQueueCounter);
});

When('User navigate to ticket channel and take count of NEW Tickets', async () => {
  await homepageObj.navigateToTicketChannel();
  previousQueueCounter = await tickets.fetchNewTicketsCounter();
});

When(
  'Select {string} from Ticket multi-actions menu to Release selected Tickets',
  async (option) => {
    await tickets.releaseSelectedTickets(option);
  }
);

Then(
  'Switch to {string} Tickets Queue and Search received ticket as {string}',
  async (queueName, filter) => {
    await tickets.selectActiveQueue((await queueName).toString());
    await tickets.searchTicket((await filter).toString());
  }
);

Then(
  'Set the priority of Ticket as {string} on Ticket Details page',
  async (priority) => {
    await tickets.changeTicketPriority((await priority).toString());
  }
);

When('Navigate to Ticket Manager', async () => {
  await tickets.ticketManager();
});

Then('Edit {string} type {string}', async (tabEntity, tab) => {
  await tickets.editTicketManagerTabEntity(tabEntity, tab);
});

Then('Delete {string} mailbox rules', async (mailboxName) => {
  await tickets.deleteRule(mailboxName);
});

Then(
  'Create and Activate the mailbox rule as {string}, {string}, {string}, {string}',
  async (RuleName, From, Status, Subject) => {
    await tickets.createRule(RuleName, From, Status, Subject);
    await tickets.activateRule(RuleName);
  }
);

Then('Select {string} option from Ticket actions', async (option) => {
  await baseAction.wait(10); //wait for the ticket to load
  await baseAction.click(tickets.elements.ticketSearchResults);
  await tickets.ticketOption((await option).toString());
});

When('Reply to the Episode as {string}', async (subject) => {
  await tickets.replyToEpisode((await subject).toString());
});

When('user sends email', async (table) => {
  const emailData = table.rows();
  await tickets.modalOpen();
  await tickets.emailModalToReplyAll(
    emailData[0][0],
    emailData[0][1],
    emailData[0][2],
    emailData[0][3],
    emailData[0][4]
  );
  await tickets.emailModalSend();
});

Then('user navigate to tickets channel and access queues', async () => {
  await tickets.ticketChannelScreen();
  await tickets.ticketChannelAccessed();
  await tickets.clickOnLastButton();
  await tickets.selectUpdatedSort();
});

When('user navigate to comment option of received ticket', async () => {
  await tickets.clickCommentOption();
});

Then(
  'user performs action on comments, write a comment {string}',
  async (comment) => {
    await tickets.clickNewCommentButton();
    await tickets.writeComment(comment);
    await tickets.clickSaveCommentButton();
    await tickets.editComment(comment);
    await tickets.deleteComment();
  }
);

Then('user select main ticket', async () => {
  await tickets.selectPrimaryTicket();
});

Then('user select merge and open', async () => {
  await tickets.clickMergeAndOpenButton();
});

Then(
  'validate two tickets were merged',
  async () => {
    await tickets.verifyTicketMerged();
    await tickets.clickOnReturnButton();
  }
);

When('user navigate to merge option of received ticket', async () => {
  await tickets.clickMerge();
});

When('user logout of ticket channel', async () => {
  await tickets.ticketChannelLogout();
});

Then('Edit the {string} from mailbox and set max file size as {string}', async (mailboxName, fileSize) => {
  await tickets.editMailbox(mailboxName, fileSize);
});

Then('validate the error message of max file size and button is disabled', async () => {
  await tickets.validateErrorMessage();
  await tickets.validateCreateTicketButton();
});