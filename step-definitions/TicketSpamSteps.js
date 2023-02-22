const { SendEmail } = require('../page-objects/SendEmail.po');
const { userData } = require('../fixtures/data.json');
const { BaseAction } = require('../setup/baseAction');
const { When, Then } = require('@cucumber/cucumber');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');

const mail = new SendEmail();
const baseAction = new BaseAction();
const tickets = new ticketsOnline();


Then(
  'fills in the indicated fields with the following configuration:',
  async (datatable) => {
    await mail.checkSendEmailScreenTitle();
    let queue = '';
    let mailbox = '';
    let subject = '';
    let template = '';
    datatable.hashes().forEach((element) => {
      queue = element.queue;
      mailbox = element.mailbox;
      subject = element.subject;
      template = element.template;
    });
    await mail.fillFormFields(queue, subject, mailbox, template, false);
    await mail.browsAttachment(userData.attachment);
    //@click on next button
    await mail.nextButton();
  }
);

When(
  'User fills the destination email as {string} and send email',
  async (d_email) => {
    //@fill email modal & send
    await tickets.emailModalToReply(d_email, false);
    await tickets.emailModalSend();
  }
);

When(
  'Send email with subject as {string}',
  async (subject) => {
    if(subject === 'random') {
      global.newSubject = baseAction.userID_Alpha_Numeric();
    }
    await tickets.sendEmailFromCustomer(global.EMAIL, subject, global.newSubject);
  }
);

When('On ticket search page, search {string}', async (senderEmail) => {
  await tickets.openSearchScreen();
  await baseAction.waitForSelector(tickets.elements.filterEmail);
  await baseAction.type(tickets.elements.filterEmail, senderEmail);
  await baseAction.type(tickets.elements.filterSubject, global.newSubject);
});

Then('Validate that the ticket received is in {string}', async (option) => {
  await tickets.ValidateCloseTicket(option, global.newSubject);
});

Then('select ticket queue {string} from ticket channel', async (queue) => {
  //access ticket channel
  await tickets.elementClick('Tickets');
  //access queue
  await tickets.elementClick('queue', queue);
});

Then('validate that the ticket sent was successfully integrated', async () => {
  await tickets.validateTicket(true);
});

When('user mark this ticket as Spam', async () => {
  await tickets.elementClick('spam');
  await tickets.elementClick('spamYes');
  await tickets.elementClick('search');
});

Then(
  'searches for that ticket by using {string} as ticket status',
  async (status) => {
    await tickets.addSearchFilters(
      baseAction.getCurrentDate(),
      baseAction.getCurrentDate(),
      status
    );
    await tickets.searchTheFilter();
  }
);

Then(
  'User should see the ticket successfully with {string} status',
  async (status) => {
    await tickets.validateDataTableResultData(status);
  }
);
