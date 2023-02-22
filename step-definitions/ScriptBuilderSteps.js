const { Given, When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/HomePage.po');
const { userAccount } = require('../fixtures/data.json');
const { ScriptBuilder } = require('../page-objects/ScriptBuilder.po');
const { ticketsOnline } = require('../page-objects/TicketsOnline.po');

const login = userAccount;
const homepage = new Homepage();
const scriptBuilder = new ScriptBuilder();
const ticket = new ticketsOnline();
let counter;

let scriptName = 'Script_1';
global.scriptOld = '';
global.scriptNew = '';

//Step-1: Login
Given('User login to the gocontact as {string}', async (role) => {
  await homepage.openBrowserWithURL();
  await homepage.loginProcess(login[role]);
  await homepage.verifyPageDisplayed('dashboard');
});

When('user selects script builder from menu', async () => {
  await scriptBuilder.clickScriptBuilder();
  await scriptBuilder.verifyScriptBuilderPage();
});

When(
  'user navigates to general rules, select rule type {string} ,event {string} and adds rule details:',
  async (ruleType, ruleEvent, form) => {
    await scriptBuilder.clickGeneralRuleTab();
    await scriptBuilder.verifyGeneralRuleTab();
    await scriptBuilder.selectRule(ruleType, ruleEvent);
    await scriptBuilder.verifyRuleNameField();
    const generalRuleDetails = form.rowsHash();
    await scriptBuilder.saveRule(generalRuleDetails);
  }
);

Then('verify general rule {string}', async (ruleName) => {
  await scriptBuilder.verifyListOfGeneralRules(ruleName);
});

When('user navigates to create ticket page', async () => {
  await ticket.elementClick('Create Ticket');
  await ticket.verifyTicketChannelPageDisplayed('createTicketForm');
});

When('user creates a new ticket with following details:', async (datatable) => {
  const element = datatable.rowsHash();
  await ticket.fillCreateTicket(element);
  await ticket.validateForm(element);
});

When(
  'user create and open that ticket {string} in {string}',
  async (email, queue) => {
    await ticket.elementClick('createTicket');
    await ticket.elementClick('Tickets');
    counter = await ticket.fetchCurrentQueueCounter(queue);
    await ticket.clickOnLastButton();
    await ticket.selectUpdatedSort();
    await ticket.openCreatedTicket(email);
  }
);

When(
  'user selects {string} in one response and validate the script',
  async (oneResponseValue) => {
    await scriptBuilder.fillOneResponse(oneResponseValue);
    await scriptBuilder.validateScript();
  }
);

When(
  'user selects {string} in one response, fill text input {string} with value {string} and validate the text and script',
  async (oneResponseValue, textInput, textInputValue) => {
    await scriptBuilder.fillOneResponse(oneResponseValue);
    await scriptBuilder.fillInputText(scriptName, textInputValue, textInput);
    await scriptBuilder.validateForm(scriptName, textInput, textInputValue);
    await scriptBuilder.validateScript();
  }
);

When('user adds rules to oneresponse', async (table) => {
  const ruleDetails = table.rowsHash();
  await scriptBuilder.setOneResponse(ruleDetails);
});

When(
  'user adds {int} elements {string} and {string} to the script',
  async (length, firstElement, secondElement) => {
    await scriptBuilder.addElement(firstElement);
    await scriptBuilder.addElement(secondElement);
    await scriptBuilder.verifyElementsDragged(length);
  }
);

When('user adds rules to textinput', async (table) => {
  const inputDetails = table.rowsHash();
  await scriptBuilder.setTextInput(inputDetails);
});

When(
  'user add {int} element {string} to the script',
  async (length, element) => {
    await scriptBuilder.addElement(element);
    await scriptBuilder.verifyElementsDragged(length);
  }
);

When('user create a new script for {string}', async (scriptType, table) => {
  global.scriptNew = scriptName = await scriptBuilder.getScriptName(scriptType);
  if (scriptType === 'qualitymanager_script1') {
    global.scriptOld = global.scriptNew;
  }
  const newScriptForm = table.rowsHash();
  await scriptBuilder.clickNewScriptButton();
  await scriptBuilder.verifyNewScriptModal();
  await scriptBuilder.fillNewScriptDetails(scriptName, newScriptForm);
  await scriptBuilder.verifySuccessPopup(scriptName);
});

When('user navigates to script and select the script', async () => {
  await scriptBuilder.clickScriptTab();
  await scriptBuilder.selectScript(scriptName);
});

When(
  'user selects {string} in one response ,fills text input and validate the script',
  async (oneResponseValue) => {
    await scriptBuilder.fillOneResponse(oneResponseValue);
    await scriptBuilder.fillInputText(scriptName);
    await scriptBuilder.validateScript();
  }
);

When(
  'user adds {int} {string} elements to the script',
  async (length, textInput, table) => {
    const textInputTitle = table.rows();
    for (let i = 0; i < length; i++) {
      await scriptBuilder.addElement(textInput);
    }
    for (let i = 0; i < length; i++) {
      await scriptBuilder.setTextInput({
        title: textInputTitle[i][0],
        number: i,
      });
    }
    await scriptBuilder.verifyElementsDragged(length);
  }
);

When('user select element and user adds rules', async (table) => {
  const ruleDetails = table.rowsHash();
  await scriptBuilder.setTextInput({ rules: ruleDetails });
});

When(
  'user select element postcode and configure the fields in search in script',
  async (table) => {
    const ruleDetails = table.rowsHash();
    await scriptBuilder.setTextInput({ searchInScript: ruleDetails });
  }
);

Then(
  'user fill text input {string} and click new script through contact info',
  async (countryName) => {
    await scriptBuilder.fillInputText(scriptName, countryName);
    await scriptBuilder.newScriptOnTicketChannel();
    await scriptBuilder.validateContactInfo(countryName);
  }
);

When(
  'user create a new page {string} and add element {string} with title {string}',
  async (secondName, textInput, titleName) => {
    await scriptBuilder.addNewPage(secondName);
    await scriptBuilder.addElement(textInput);
    await scriptBuilder.setTextInput({ title: titleName });
  }
);

When(
  'user select previous page {string} and add element {string}',
  async (page, oneResponse) => {
    await scriptBuilder.selectPage(page);
    await scriptBuilder.addElement(oneResponse);
  }
);

When('user adds rules to textinput as', async (table) => {
  const inputDetails = table.rowsHash();
  await scriptBuilder.setTextInput({ rules: inputDetails });
});

Then(
  'user fill text input and click new script then verify message {string}',
  async (message, table) => {
    const textInputTitle = table.rows();
    for (let i = 0; i < textInputTitle.length; i++) {
      await scriptBuilder.fillInputText(
        scriptName,
        textInputTitle[i][1],
        textInputTitle[i][0]
      );
    }
    await scriptBuilder.newScriptOnTicketChannel();
    await scriptBuilder.verifyPopup(message);
  }
);

Then(
  'user fill text input {string} with {string} and click new script',
  async (titleName, titleValue) => {
    await scriptBuilder.fillInputText(scriptName, titleValue, titleName);
    await scriptBuilder.newScriptOnTicketChannel();
  }
);
When(
  'user selects {string} in one response and click new script',
  async (oneResponseValue) => {
    await scriptBuilder.fillOneResponse(oneResponseValue);
    await scriptBuilder.newScriptOnTicketChannel();
  }
);
When(
  'user fills {string} with {string} and search',
  async (textInput, textInputValue) => {
    await scriptBuilder.fillInputText(scriptName, textInputValue, textInput);
    await scriptBuilder.searchInTextInput();
  }
);

Then('user selects record', async () => {
  await scriptBuilder.selectRecordFromSearchScript();
});

Then('verify error message is displayed {string}', async (message) => {
  await scriptBuilder.verifyPopup(message);
});

Then('textinput fields are empty', async (table) => {
  const textInputTitle = table.rows();
  for (let i = 0; i < textInputTitle.length; i++) {
    await scriptBuilder.validateForm(scriptName, textInputTitle[i][0], '');
  }
});

Then('verify success message is displayed {string}', async (message) => {
  await scriptBuilder.verifyPopup(message);
});

When('user selects {string} in one response', async (oneResponseValue) => {
  await scriptBuilder.fillOneResponse(oneResponseValue);
});

When('verify text input is {string} and validate the script', async (text) => {
  if (text == 'visible') {
    await scriptBuilder.checkVisiblityOfTextInput(true, scriptName);
  } else {
    await scriptBuilder.checkVisiblityOfTextInput(false, scriptName);
  }
  await scriptBuilder.validateScript();
});

When(
  'user fills {string} with {string} for automatic search',
  async (textInput, textInputValue) => {
    await scriptBuilder.fillInputText(
      scriptName,
      textInputValue,
      textInput,
      true
    );
  }
);

Then(
  'verify last script with data is automatically selected',
  async (table) => {
    const textInputTitle = table.rows();
    for (let i = 0; i < textInputTitle.length; i++) {
      await scriptBuilder.validateForm(
        scriptName,
        textInputTitle[i][0],
        textInputTitle[i][1]
      );
    }
  }
);
Then(
  'user fill text input with {string} and verify age {int}',
  async (name, age) => {
    await scriptBuilder.fillInputText(scriptName, 'Label here.', name);
    await scriptBuilder.validateForm(scriptName, 'Label here.', age);
  }
);

Then('user validate the script', async () => {
  await scriptBuilder.validateScript();
});
Then(
  'user fill text input with {string} {string} and verify {string} {string}',
  async (titleName, name, titleAge, age) => {
    await scriptBuilder.fillInputText(scriptName, name, titleName, true);
    await scriptBuilder.clickOnText(name);
    await scriptBuilder.validateForm(scriptName, titleAge, age);
  }
);

Then(
  'verify ticket counter was updated successfully with queue {string}',
  async (queue) => {
    await ticket.clickOnReturnButton();
    const newCounter = await ticket.fetchCurrentQueueCounter(
      queue,
      false,
      true
    );
    await ticket.verifyTextGreaterThan(counter, newCounter);
  }
);

Then('select api query from results', async () => {
  await scriptBuilder.clickQuerySelect();
});

Then(
  'user fill text input {string} with {string} and press enter',
  async (titleName, titleValue) => {
    await scriptBuilder.fillInputText(scriptName, titleValue, titleName, true);
  }
);

Then(
  'verify email received at destination email address from email with subject {string}',
  async (subject) => {
    await ticket.mailVerify('gocontact@getnada.com', subject);
    await ticket.ticketChannelLogout();
    await ticket.elementClick('Tickets');
    await ticket.clickOnLastButton();
    await ticket.selectUpdatedSort();
    await ticket.openCreatedTicket(global.EMAIL);
  }
);

Then(
  'verify email received at destination email address with subject {string}',
  async (subject) => {
    await ticket.mailVerify('gocontact@getnada.com', subject);
  }
);

Then('verify text input values', async (table) => {
  const textInputTitle = table.rows();
  for (let i = 0; i < textInputTitle.length; i++) {
    await scriptBuilder.validateForm(
      scriptName,
      textInputTitle[i][0],
      textInputTitle[i][1]
    );
  }
});

Then(
  'verify the {string} state of ticket {string}',
  async (ticketStatus, email) => {
    await ticket.clickPendingState();
    await ticket.clickOnLastButton();
    await ticket.openCreatedTicket(email);
    await ticket.getTicketStatus(ticketStatus);
  }
);

When(
  'user navigates to script tab in voice channel and select the script',
  async () => {
    await scriptBuilder.clickScriptTabVoiceChannel();
    if (scriptName) {
      await scriptBuilder.selectScriptInVoiceChannel(scriptName);
    }
  }
);

When('select the {string} element', async (element) => {
  await scriptBuilder.selectElement(element);
});

When('configure the items with following configurations:', async (table) => {
  const itemConfigurations = table.rowsHash();
  await scriptBuilder.startAndStopRecordingItems(itemConfigurations);
});

Then('user select {string} button', async (recordingButton) => {
  await scriptBuilder.selectRecordingButton(recordingButton);
});

Then(
  'validate the notification is displayed with {int} recording',
  async (numberOfRecording) => {
    await scriptBuilder.validateRecording(numberOfRecording);
    await scriptBuilder.validateRecordingModal();
  }
);

Then('validate the notification {string}', async (message) => {
  await scriptBuilder.validateNotification(scriptName, message);
});

When(
  'configure the oneresponse items with following configurations:',
  async (table) => {
    const itemConfigurations = table.rowsHash();
    await scriptBuilder.oneResponseItems(itemConfigurations);
  }
);
When(
  'validate {string} element with message {string} and information {string}',
  async (type, message, buttonText) => {
    await scriptBuilder.validateElement(type, message, buttonText);
  }
);

When(
  'user select text input and configure the fields in search in db',
  async (table) => {
    let inputDetails = table.rowsHash();
    inputDetails.tableName = (await global.newtTableName).toString();
    await scriptBuilder.setTextInput({ searchInDb: inputDetails });
  }
);

When(
  'user configure the checks items with following configurations:',
  async (table) => {
    const itemConfigurations = table.rowsHash();
    await scriptBuilder.checksItems(itemConfigurations);
  }
);

Then('user select {string} element', async (elements) => {
  await scriptBuilder.selectElement(elements);
});

Then('mark values as required', async () => {
  await scriptBuilder.markScriptValues();
});

When('user adds rules to callback', async (tableData) => {
  const callBackDetails = tableData.rowsHash();
  callBackDetails.relatedDB = global.newDBName[callBackDetails.dbIndex];
  await scriptBuilder.setCallback(callBackDetails);
});

Then('validate csv contains callback information:', async(csvData) => {
  const csvDetails = csvData.rowsHash();
  let rowIndex = 0;
  if (csvDetails.fileIndex) {
    rowIndex = csvDetails.fileIndex;
  }
  await scriptBuilder.validateCSVData(global.downloadFileName[rowIndex], csvDetails);
});

Then('validate tooltip message {string} is displayed', async(message)=>{
  await scriptBuilder.validateFormError(message);
});

When('configure the items in calendar with following configurations:', async (table) => {
  const itemConfigurations = table.rowsHash();
  if(!itemConfigurations.calendarName){
    itemConfigurations.calendarName = global.calendarName;
  }
  await scriptBuilder.calendarItems(itemConfigurations);
});

Then('user selects calendar element', async () => {
  await scriptBuilder.selectCalendarElement();
});

Then('user book a event in a calendar at {string} with desc as {string} after {int} day', async (hour, desc, days) => {
  await scriptBuilder.bookEvent(hour, desc, days);
});

Then('Validate that calendar shows preparation times and back to page', async () => {
  await scriptBuilder.showPreparationTime();
  await scriptBuilder.backPage();
});


Then('validate tooltip message {string} is displayed', async (message) => {
  await scriptBuilder.validateFormError(message);
});

When('user fills the voice script with:', async (scriptDetails) => {
  let fillScriptObject = scriptDetails.rowsHash();
  await scriptBuilder.fillScript(fillScriptObject);
});

Then('user navigates back to script from calendar page', async()=>{
  await scriptBuilder.backPage();
});

When('user books event in calendar with following information:', async (dataTable) => {
  let bookingDetails = [];
  dataTable.hashes().forEach((element) => {
    bookingDetails.push({
      'hour': element.hour,
      'desc': element.description,
      'days': element.days,
      'concurrent': element.concurrent,
      'error': element.error
    });
  });
  for (let i = 0; i < bookingDetails.length; i++) {
    await scriptBuilder.bookEvent(bookingDetails[i]);
  }
});


When('user select the Back option', async () => {
  await scriptBuilder.backPage();
});

When('user validates the block now button is {string}', async (status) => {
  await scriptBuilder.verifyBlockEventOption(status);
});

Then('user blocks the event', async () => {
  await scriptBuilder.blockEvent();
});

Then('verify the error message displayed', async () => {
  await scriptBuilder.verifyErrorPopup();
});