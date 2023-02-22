const { When, Then } = require('@cucumber/cucumber');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');
const { userData } = require('../fixtures/data.json');
const dayjs = require('dayjs');

const data = userData;
const ticket = new ticketsOnline();
let loggedInAgentName = '';
let scriptName = 'Script_1';
global.ticketID = '';

When('user navigates to Create Ticket page', async () => {
  //@user select the 'Create Ticket' option from the main page
  await ticket.elementClick('Create Ticket');
  //@user see create ticket form open
  await ticket.verifyTicketChannelPageDisplayed('createTicketForm');
});

Then('User creates a new ticket with following details:', async (datatable) => {
  let ticketData = '';
  let multiFile = [];
  datatable.hashes().forEach((element) => {
    multiFile.push(element.fileName ?? data.attachment);
    ticketData = {
      'email': element.email,
      'phone': element.phone,
      'queue': element.queue,
      'template': element.template,
    };
  });
  //@user start filling form fields
  await ticket.fillCreateTicket(ticketData);
  //@browser attachment
  await ticket.browsAttachment('ticket', multiFile);
  //@validate that fields are filled successfully
  await ticket.validateForm(ticketData);
});

Then('Ticket should be created successfully', async () => {
  //@user click the 'Create Ticket' button to submit
  await ticket.elementClick('createTicket');
  //@user access the 'Ticket' channel
  await ticket.elementClick('Tickets');
  //@verify that ticket channel is successfully accessed
  await ticket.verifyTicketChannelPageDisplayed('Tickets');
  //Validate ticket created
  await ticket.validateTicket(false);
});

When('User navigates to search ticket page', async () => {
  //@click on search button
  await ticket.elementClick('search');
});

Then('Searches for tickets using following criteria:', async (datatable) => {
  let searchData = '';
  datatable.hashes().forEach((element) => {
    searchData = {
      'email': element.email,
      'phone': element.phone,
      'startDate': dayjs().format('DD-MM-YYYY'),
      'endDate': dayjs().format('DD-MM-YYYY'),
    };
  });
  //@fillform filters
  await ticket.addFilters(searchData);
});

Then('Ticket should be searched', async () => {
  await ticket.validateSearchResult();
});

//Step-4: Validate Agent
When('User opens ticket from tickets list', async () => {
  await ticket.elementClick('search-table');
  global.ticketID = await ticket.getTicketId();
});

Then('chooses to Email on the ticket', async () => {
  await ticket.elementClick('email');
});

Then('validate that the ticket has been associated with the logged-in agent', async () => {
  await ticket.validateAgent(loggedInAgentName);
});

Then('validate that the attachments were successfully added', async () => {
  await ticket.validateAttachment(data.attachmentName);
});

//Step-5: Reply
When('User replies and navigate to select the script', async () => {
  await ticket.replyOnTicket(scriptName);
});

Then('user replies with following details:', async (datatable) => {
  let replyData = '';
  let d_email = '';
  datatable.hashes().forEach((element) => {
    replyData = {
      'destination_email': element.destination_email,
      'response_option': element.response_option
    };
    d_email = element.destination_email;
  });
  console.log(replyData);
  await ticket.emailModalToReply(d_email);
  await ticket.emailModalSend();
  await ticket.mailVerify(d_email);
});

Then('User creates a new ticket with following ticket details:', async (datatable) => {
  let ticketData = [];
  let autodelivery = false;
  datatable.hashes().forEach(async (element) => {
    for (let propName in element) {
      if (propName === 'autoDelivery') {
        autodelivery = element.autoDelivery;
      }
    }
    ticketData.push({
      'email': element.email,
      'phone': element.phone,
      'queue': element.queue,
      'template': element.template,
      'autodelivery': autodelivery
    });
  });
  for (let i = 0; i < ticketData.length; i++) {
    await ticket.elementClick('Create Ticket');
    await ticket.verifyTicketChannelPageDisplayed('createTicketForm');
    await ticket.fillCreateTicket(ticketData[i]);
    await ticket.validateForm(ticketData[i]);
    await ticket.elementClick('createTicket');
  }
});