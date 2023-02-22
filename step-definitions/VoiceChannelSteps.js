const { When, Then } = require('@cucumber/cucumber');
const { VoiceChannel } = require('../page-objects/VoiceChannel.po');
const { BaseAction } = require('../setup/baseAction');
const { CRM } = require('../page-objects/Crm.po');
const dayjs = require('dayjs');
const { Homepage } = require('../page-objects/HomePage.po');

const voiceChannel = new VoiceChannel();
const baseAction = new BaseAction();
const homepage = new Homepage();
const crm = new CRM();

let randomComment = '';
let queueDID = '';
let targetId = '';
let uuidResponse = [];
let exceptionData;
global.campaignName = [];
global.callBackTime;

When('login to Voice Channel with {string} extension', async (extension) => {
  await voiceChannel.voiceChannelLogin(extension);
});

When('user selects {string} campaign', async (outbound) => {
  if (!outbound.includes('Outbound')) {
    outbound = global.campaignName[outbound];
  }
  await voiceChannel.selectCampaign(outbound);
});

When('user make a call', async () => {
  await voiceChannel.makeACall();
});

When('user dial the number {string} in ready state', async (contactNumber) => {
  await voiceChannel.dialNumberInReadyState(contactNumber);
});

Then(
  'user dial the number {string} in ready state in {string} window',
  async (contactNumber, session) => {
    await voiceChannel.dialNumberInReadyState(contactNumber, session);
  }
);

When('user disconnects the call', async () => {
  await voiceChannel.disconnectACall();
});

When(
  'user submits {string} outcome and select {string} outcome name',
  async (outcomeGroup, outcomeName) => {
    await voiceChannel.submitOutcomes(outcomeGroup, outcomeName);
  }
);

Then('user validate that the outcome of contact is {string}', async (outcome) => {
  await crm.openCall();
  await voiceChannel.validateContactOutcome(outcome);
});

Then('set {string} to {string} sec', async (timeType, timeInSec) => {
  await voiceChannel.campaingTimeAndTries(timeType, timeInSec);
});

Then('user selects the call on {string} button', async (buttonHold) => {
  await voiceChannel.callOnHold(buttonHold);
});

Then(
  'user gets the {string} warning after {string} seconds',
  async (warningType, time) => {
    await voiceChannel.verifyWarning(warningType, time);
  }
);

Then(
  'toggle {string} the {string} Wrap Up Time',
  async (toggleState, timeType) => {
    await voiceChannel.wrapUpToggle(toggleState, timeType);
  }
);

Then('user set {string} Wrap Up Time {string} sec', async (timeType, time) => {
  await voiceChannel.wrapUpTime(timeType, time);
});

Then('user gets the {string} Wrap-Up notification', async (timeType) => {
  await voiceChannel.wrapUpNotification(timeType);
});

Then(
  'user validate {string} {string} Wrap-Up time of {string} sec exceeds with {string} outcome {string}',
  async (outcomeGroup, timeType, time, actionType, outcome) => {
    await voiceChannel.wrapUpAction(
      outcomeGroup,
      timeType,
      time,
      actionType,
      outcome
    );
  }
);

Then('user finish the campaign editing', async () => {
  await voiceChannel.saveCampaign();
});

When('user state should be {string}', async (state) => {
  await voiceChannel.verifyUserState(state);
});

Then('user should get the notification', async () => {
  await voiceChannel.verifyNotification();
});

Then('user edits the campaign {string}', async (outboundCampaign) => {
  await voiceChannel.searchCampaign(outboundCampaign);
  await voiceChannel.editCampaign(outboundCampaign);
});

When('user navigates to voice manager', async () => {
  await voiceChannel.openVoiceManager();
});

When('user navigates to dialer', async () => {
  await voiceChannel.openDialerTab();
});

Then('select the dialer type {string}', async (dialerType) => {
  await voiceChannel.selectDialerType(dialerType);
});

Then('save the changes in edit campaign', async () => {
  await voiceChannel.saveCampaign();
});

Then(
  'verify all the contacts {string} loaded are triggered by the dialer {string}',
  async (phoneNumber, state) => {
    await voiceChannel.verifyUserState(state);
    await voiceChannel.verifyAndClickPhoneNumber(phoneNumber);
  }
);

Then('verify SIP extension warning with message {string}', async (message) => {
  await voiceChannel.sipExtensionWarning(message);
});

When('user click on transfer call button', async () => {
  await voiceChannel.transferCall();
});

When('user select the {string} transfer option', async (transferType) => {
  await voiceChannel.selectTransferTab(transferType);
});

When('user mute the original call', async () => {
  await voiceChannel.muteOriginalCall();
});

When(
  'user make a remote transfer of call to number {string}',
  async (callNumber) => {
    await voiceChannel.remoteTransferCall(callNumber);
  }
);

When('let user wait for {string} seconds', async (seconds) => {
  await voiceChannel.waitForRinging(seconds);
});

When('let user wait for {string} seconds in {string} window', async (seconds, window) => {
  await voiceChannel.waitForRinging(seconds, window);
});

When('user transfers call to ivr', async () => {
  await voiceChannel.transferCallToIvr();
});

When('call hangup message {string}', async (message) => {
  await voiceChannel.callHangupMessage(message);
});

Then('select the Warning Average Talking Time {string}', async (seconds) => {
  await voiceChannel.setAverageTalkingTime(seconds);
});

Then('voice alert {string} display', async (alert) => {
  await voiceChannel.voiceAlert(alert);
});

When(
  'login to Voice Channel with {string} extension in {string} window',
  async (extension, session) => {
    await voiceChannel.voiceChannelLogin(extension, session);
  }
);

When(
  'user selects {string} campaign in {string} window',
  async (outbound, session) => {
    await voiceChannel.selectCampaign(outbound, session);
  }
);

When(
  'user selects {string} queue in {string} window',
  async (queueName, session) => {
    await voiceChannel.selectQueue(queueName, session);
  }
);

When('user transfers call to {string} queue', async (queueName) => {
  await voiceChannel.transferCallToQueue(queueName);
});

Then('user make a call in {string} window', async (session) => {
  await voiceChannel.makeACall(session);
});

When('user mute the call', async () => {
  await voiceChannel.muteQueueOriginalCall();
});

When('user makes {string} of call', async (transferType) => {
  await voiceChannel.transferACall(transferType);
});

When(
  'user state should be {string} in {string} window',
  async (state, session) => {
    await voiceChannel.verifyUserState(state, session);
  }
);

When('user disconnects the call in {string} window', async (session) => {
  await voiceChannel.disconnectACall(session);
});

When(
  'user submits {string} outcome and select {string} outcome name in {string} window',
  async (outcomeGroup, outcomeName, session) => {
    await voiceChannel.submitOutcomes(outcomeGroup, outcomeName, session);
  }
);

When('select the Personal Callback {string}', async (option) => {
  await voiceChannel.selectPersonalCallback(option);
});

When('user navigates to callOutcome', async () => {
  await voiceChannel.openCallOutcome();
});

When('check if outcome {string} exist', async (outcomeName) => {
  await voiceChannel.checkOutcome(outcomeName);
});

When(
  'user submits outcome with following configurations:',
  async (outcomeDetails) => {
    const callbackOutcomeObject = outcomeDetails.rowsHash();
    randomComment = baseAction.userID_Alpha_Numeric();
    callbackOutcomeObject.randomComment = randomComment;
    await voiceChannel.submitCallbackOutcomes(callbackOutcomeObject);
  }
);

When('user navigate to callbacks manager', async () => {
  await voiceChannel.openCallbackManager();
});

When('user navigate to voice channel', async () => {
  await voiceChannel.openVoiceChannel();
});

When('select the callback tab in {string} window', async (session) => {
  await voiceChannel.openCallbackTab(session);
});

When('validate the scheduled callback in {string} window', async (session) => {
  await voiceChannel.validateCallback(randomComment, session);
});

Then(
  'validate the callback is successfully scheduled for {string} campaign',
  async (campaign) => {
    let searchCallbackObject = new Object();
    searchCallbackObject.startLoadDate = dayjs().format('YYYY-MM-DD');
    searchCallbackObject.endLoadDate = dayjs()
      .add(1, 'day')
      .format('YYYY-MM-DD');
    searchCallbackObject.campaign = campaign;
    searchCallbackObject.comment = randomComment;
    await voiceChannel.verifyCallback(searchCallbackObject);
  }
);

When('user navigates to recycle tab and select', async (dataTable) => {
  await voiceChannel.openRecycleTab();
  const settings = dataTable.rowsHash();
  await voiceChannel.updateRecycleSettings(settings);
});

When('user navigates to dialer control menu', async () => {
  await voiceChannel.openDialerControlMenu();
});

When('user selects {string} campaign in dialer control', async (outbound) => {
  await voiceChannel.selectCampaignInDialerControl(outbound);
});

Then('select the preview option', async () => {
  await voiceChannel.clickPreviewButton();
});

When('select the Call Transfer {string}', async (option) => {
  await voiceChannel.callTransfer(option);
});

Then('Set the toggle {string} for redial attribute', async (toggle) => {
  await voiceChannel.setRedialToggle(toggle);
});

Then('verify {string} and click on Redial call button', async (visibility) => {
  await voiceChannel.verifyRedialButton(visibility);
  if (visibility === 'visible') {
    await voiceChannel.redialCall();
  }
});

When('user logout from Voice Channel', async () => {
  await voiceChannel.voiceChannelLogout();
});

Then('validate the callback is successfully deleted or have no data available', async () => {
  let searchCallbackObject = new Object();
  searchCallbackObject.startLoadDate = dayjs().format('YYYY-MM-DD');
  searchCallbackObject.endLoadDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
  searchCallbackObject.noCallback = 'No data available';
  searchCallbackObject.comment = randomComment;
  await voiceChannel.verifyCallback(searchCallbackObject);
});

When(
  'validate call outcome is {string} for phoneNumber {string}',
  async (callType, phoneNumber) => {
    await voiceChannel.validateCallOutcome(callType, phoneNumber);
  }
);

When('validate the {string} origin', async (callOrigin) => {
  await voiceChannel.validateCallOrigin(callOrigin);
});

Then('dtmf icon {string} be visible', async (visibility) => {
  if (visibility === 'should')
    await voiceChannel.verifyDtmfIconVisibility(true);
  else if (visibility === 'should not')
    await voiceChannel.verifyDtmfIconVisibility(false);
});

When('user toggle {string} the allow dtmf button', async (toggleAction) => {
  await voiceChannel.toggleDtmfOption(toggleAction);
});

When('user delete all scheduled callback', async () => {
  await voiceChannel.deleteScheduledCallback();
});

Then('select the Preview Dial Timeout {string}', async (seconds) => {
  await voiceChannel.setPreviewDialTimeout(seconds);
});

Then('call transfer icon {string} be visible', async (visibility) => {
  if (visibility === 'should')
    await voiceChannel.verifyCallTransferIconVisibility(true);
  else if (visibility === 'should not')
    await voiceChannel.verifyCallTransferIconVisibility(false);
});

Then('user navigates to Outcomes', async () => {
  await voiceChannel.openOutcomeTab();
});

Then('user edits the blacklists with {string} column', async (columnValue) => {
  await voiceChannel.validateBlacklist(columnValue);
});

Then(
  'verfiy the general rule outcome {string} is selected and submit the outcome',
  async (outcome) => {
    await voiceChannel.validateOutcome(outcome);
  }
);

Then(
  'user navigates to Outbound and select {string} campaign',
  async (outbound) => {
    await voiceChannel.selectOutboundCampaign(outbound);
  }
);

Then('user validate Voice Channel should be {string}', async (status) => {
  await voiceChannel.verifyVoiceChannelStatus(status);
  await homepage.verifyPageDisplayed('dashboard');
});

Then('change the priority of the dialer to {string}', async (priority) => {
  await voiceChannel.updateDialerPriority(priority);
});

Then('user activates {string} call recording to {string}', async (voiceType, value) => {
  await voiceChannel.activateCallRecording(voiceType, value);
});

Then('user access the Quality Script builder menu', async () => {
  await homepage.navigateToQualityScriptBuliderMenu();
});

Then('user edits the DID {string}', async (searchId) => {
  await voiceChannel.searchDID(searchId);
  await voiceChannel.editDID();
});

Then('user edit DID with following configurations:', async (dataTable) => {
  let details = dataTable.rowsHash();
  await voiceChannel.fillOption(details);
});

When('user fetch the DID number and target ID', async () => {
  queueDID = await voiceChannel.fetchDIDNumber();
  console.log('queueNumber', queueDID);
  targetId = await voiceChannel.fetchTargetID();
  console.log('targetId', targetId);
});

Then('user searches and edits {string} inbound queue', async (inboundQueue) => {
  await voiceChannel.searchQueue(inboundQueue);
  await voiceChannel.editQueue(inboundQueue);
});

Then('user navigates to {string} tab', async (tab) => {
  await voiceChannel.navigateToTab(tab);
});

Then('user finish and save inbound queue settings', async () => {
  await voiceChannel.saveInboundQueue();
});

When(
  'user selects {string} campaign with {string} queue in {string} window',
  async (outboundCampaign, inboundQueue, session) => {
    await voiceChannel.selectCampaignAndQueue(
      outboundCampaign,
      inboundQueue,
      session
    );
  }
);

When('user selects {string} campaign with {string} queue', async (outboundCampaign, inboundQueue) => {
  await voiceChannel.selectCampaignAndQueue(outboundCampaign, inboundQueue);
});

When(
  'user adds a new timed action with the following settings:',
  async (actionDataTable) => {
    let actionData = actionDataTable.rowsHash();
    await voiceChannel.addNewTimedAction(actionData);
  }
);

Then('user deletes previously added timed action', async () => {
  await voiceChannel.deleteNewTimedAction();
});

When(
  'cancel the {string} state in {string} window',
  async (callState, session) => {
    await voiceChannel.cancelState(callState, session);
  }
);

Then(
  'Validate that, in call info section, the parameter DTMF has the value {string} in {string} window',
  async (number, session) => {
    await voiceChannel.validateInfoSection(number, session);
  }
);

Then(
  'validate the callback is successfully scheduled',
  async (callBackTable) => {
    let callbackData = callBackTable.rowsHash();
    callbackData.startLoadDate = dayjs().format('YYYY-MM-DD');
    callbackData.endLoadDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
    if (!callbackData.comment) {
      callbackData.comment = randomComment;
    }
    await voiceChannel.validateInboundCallbackGroup(callbackData);
  }
);

Then('client makes a call via API with following configurations:', async (callDetails) => {
  let data = '';
  callDetails.hashes().forEach((element) => {
    data = {
      'callerDestination': element.callerDestination,
      'callerCaller': element.callerCaller,
      'did_data': element.did_Data,
      'domain_name': global.DOMAIN
    };
  });
  const uuid = await voiceChannel.inboundGroupCallAPI(data);
  uuidResponse.push(uuid);
});

Then('client Hangup the {string} call via API', async (callIndex) => {
  let data = {
    'uuid': uuidResponse[callIndex],
  };
  await voiceChannel.hangupCallAPI(data);
});

Then('clear uuid history', async () => {
  uuidResponse = [];
});

Then('select voicemail Tab', async () => {
  await voiceChannel.openVoicemailTab();
});

Then('validate voicemail data is as following:', async (data) => {
  let voicemailData = data.rowsHash();
  await voiceChannel.validateLatestVoiceMail(voicemailData);
});

When('select the voicemail', async () => {
  await voiceChannel.selectVoicemail();
});

Then('user makes call to voicemail contact', async () => {
  await voiceChannel.makeVoicemailCall();
});

When('client interact with the agent by key press via DTMF Api', async (dtmfDetails) => {
  let data = '';
  dtmfDetails.hashes().forEach((element) => {
    data = {
      'uuid': uuidResponse[element.callIndex],
      'callerDestination': element.callerDestination,
      'callerCaller': element.callerCaller,
      'dtmf': element.dtmf
    };
  });
  await voiceChannel.dtmfCallAPI(data);
});

Then(
  'user in default action configure {string} to {string}',
  async (name, option) => {
    await voiceChannel.defaultActionSettings(name, option);
  }
);

Then(
  'user select the current day of the week and queue {string}',
  async (input) => {
    await voiceChannel.setQueueOutOfHours(input);
  }
);

Then('user configure in the default section', async (dataTable) => {
  let sectionDetails = dataTable.rowsHash();
  await voiceChannel.setDefaultActions(sectionDetails);
});

When(
  'user set max queue time to {string} minutes to {string} seconds',
  async (min, sec) => {
    await voiceChannel.setMaxQueueTime(min, sec);
  }
);

Then('user clicks on show voice channel', async () => {
  await voiceChannel.showVoiceChannel();
});
Then('set Schedule Callback for other Agents to {string}', async (option) => {
  await voiceChannel.setScheduleCallback(option);
});

Then(
  'user validate that inbound queue {string} disable',
  async (inboundQueue) => {
    await voiceChannel.validateInboundQueueDisable(inboundQueue);
  }
);

Then('user reset the edits of direct agent', async () => {
  await voiceChannel.resetEdits();
});

Then('user press {string} key', async (key) => {
  await voiceChannel.keyPress(key);
});

Then('user validate the waiting call and queue {string} in voice channel in {string} window', async (queueName, window) => {
  await voiceChannel.clickVoiceChannel(window);
  await voiceChannel.validateWaitingCall(window);
  await voiceChannel.validateWaitingCallQueue(queueName, window);
});

Then('user validate the no waiting call in voice channel in {string} window', async (window) => {
  await voiceChannel.clickVoiceChannel(window);
  await voiceChannel.validateNoWaitingCall(window);
}
);

When('user adds a new Scheduled Exception with the following settings:', async (exceptionDatatable) => {
  exceptionData = exceptionDatatable.rowsHash();
  exceptionData.date = dayjs().format('YYYY-MM-DD');
  await voiceChannel.addScheduledException(exceptionData);
});

Then(
  'user verifies a new Scheduled Exception is present in Exception List',
  async () => {
    await voiceChannel.verifyExceptionCreation(exceptionData);
  }
);

Then(
  'user verifies Exception is present under Added Exceptions as {string}',
  async (state) => {
    await voiceChannel.verifyExceptionActivation(exceptionData, state);
  }
);

When('user activates added exception', async () => {
  await voiceChannel.activateException();
});

Then('user deletes previously added exception', async () => {
  await voiceChannel.deleteException(exceptionData.date);
});

Then(
  'toggle {string} the {string} Wrap Up Time in queue',
  async (toggleType, timeType) => {
    await voiceChannel.queueWrapUpToggle(toggleType, timeType);
  }
);

When('user navigate to voice channel in {string} window', async (session) => {
  await voiceChannel.openVoiceChannel(session);
});

When(
  'user enter destination number {string} and make a call',
  async (callNumber) => {
    await voiceChannel.remoteCallDial(callNumber);
  }
);

Then('user starts conference call', async () => {
  await voiceChannel.startConferenceCall();
});

Then('verify both the calls are in conference', async () => {
  await voiceChannel.verifyCallConference();
});

When('user stops conference call', async () => {
  await voiceChannel.endConferenceCall();
});

When('user ends remote destination call', async () => {
  await voiceChannel.endDestinationCall();
  await voiceChannel.navigateBackFromtransfer();
});

Then(
  'user set available agents to deliver Queue callbacks attribute to {string}',
  async (seconds) => {
    await voiceChannel.setAvailableAgentCallbackTime(seconds);
  }
);

When('user creates new campaign:', async (table) => {
  const campaignData = table.rowsHash();
  let randomName = await baseAction.getRandomString('_OutboundCampaign');
  campaignData.campaignName = await randomName.toString();
  global.campaignName.push(campaignData.campaignName);
  campaignData.template = global.templateName[campaignData.template];
  await voiceChannel.createCampaign(campaignData);
});

Then(
  'verify {string} campaign is successfully created and displayed in the list of campaigns',
  async (campaignIndex) => {
    await voiceChannel.checkCampaignCreated(global.campaignName[campaignIndex]);
  }
);

When('user logout from Voice Channel in {string} window', async (session) => {
  await voiceChannel.voiceChannelLogout(session);
});

Then('user deletes {string} campaign', async (campaignIndex) => {
  await voiceChannel.deletCampaign(global.campaignName[campaignIndex]);
});

Then(
  'verify all contacts loaded in the database are triggered by the dialer',
  async (callData) => {
    let databaseDetails = callData.rowsHash();
    const phoneList = databaseDetails.number.split(',');
    for (let i = 0; i < phoneList.length; i++) {
      let phoneNumber = await (
        await voiceChannel.getPhoneNumber()
      ).replace(/\s+/g, '');
      await voiceChannel.containSubstring(databaseDetails.number, phoneNumber);
      await voiceChannel.verifyAndClickPhoneNumber(phoneNumber);
      await voiceChannel.wait(2);
      await voiceChannel.disconnectACall();
      await voiceChannel.wait(2);
      await voiceChannel.submitOutcomes(
        databaseDetails.outcomeGroup,
        databaseDetails.outcomeName);
    }
  });

When('user add new outcomes to campaign:', async (outcomeData) => {
  let outcomeDetails = outcomeData.rowsHash();
  await voiceChannel.addCampignOutcome(outcomeDetails);
});

Then('validate the Agent_5 keeps access to {string} in {string} window', async (queue, window) => {
  await voiceChannel.validateQueueAccess(queue, window);

});

Then('validate the Agent_5 should not have access to {string} in {string} window', async (queue, window) => {
  await voiceChannel.validateNoQueueAccess(queue, window);

});

Then(
  'verify all the contacts {string} loaded are triggered by the dialer {string} in {string} window',
  async (phoneNumber, state, session) => {
    await voiceChannel.verifyUserState(state, session);
    await voiceChannel.verifyAndClickPhoneNumber(phoneNumber, session);
  }
);

When('user select the Outbound cloud button in the interface and select campaign:', async (campaignData) => {
  const campaignDetails = campaignData.rowsHash();
  await voiceChannel.connectCloudCampaign(campaignDetails);
});

When('clean active calls', async () => {
  let data = '';
  data = {
    'domain_name': global.DOMAIN
  };
  await voiceChannel.deleteRedisCall(data);
});

Then('reset queue actions', async () => {
  await voiceChannel.resetTimedActions();
});

Then('delete uuid array', async () => {
  uuidResponse = [];
});

Then('validate triggered contact with following information:', async (datatable) => {
  let contactData = [];
  datatable.hashes().forEach(async (element) => {
    contactData.push({
      name: element.name,
      phone: element.phone,
      email: element.email,
      postal: element.postal,
      city: element.city,
      outcome: element.outcome,
      outcomeGroup: element.outcomeGroup,
      Field_1: element.Field_1
    });
  });
  for (let i = 0; i < contactData.length; i++) {
    await voiceChannel.validateName(contactData[i].name);
    await voiceChannel.validatePhone(contactData[i].phone);
    await voiceChannel.validateEmail(contactData[i].email);
    await voiceChannel.validatePostalCode(contactData[i].postal);
    await voiceChannel.validateCity(contactData[i].city);
    if(contactData[i].Field_1){
      await voiceChannel.validateExtraField(contactData[i].Field_1);
    }
    await voiceChannel.makeACall();
    await baseAction.wait(2); //wait before disconnect
    await voiceChannel.verifyUserState('talking');
    await voiceChannel.disconnectACall();
    await voiceChannel.verifyUserState('outcomes');
    await voiceChannel.submitOutcomes(contactData[i].outcomeGroup, contactData[i].outcome);
    // wait before next value pop up
    await baseAction.wait(5); 
  }
});
  
Then('user voice channel modal should be visible', async() =>{
  await homepage.verifyVoiceModal();
});

When('user click on {string} button', async(action) =>{
  await homepage.clickButton(action);
});

Then('verify profile page is displayed', async() =>{
  await homepage.verifyPageDisplayed('dashboard');
});

When('user selects time and enters comment {string} in callback schedule element', async(comment)=>{
  global.callBackTime =  await voiceChannel.enterCallbackDetails(comment);
});

Then('user click on history tab', async()=>{
  await voiceChannel.openHistoryTab();
});

Then('user validate that in the call section comment {string} is correctly filled', async(comment) =>{
  await voiceChannel.validateCallHistory(global.scriptNew, comment);
});

When(
  'user click on transfer call button in {string} window',
  async (session) => {
    await voiceChannel.transferCall(session);
  }
);

When(
  'user select the {string} transfer option in {string} window',
  async (transferType, session) => {
    await voiceChannel.selectTransferTab(transferType, session);
  }
);

When('user mute the call in {string} window', async (session) => {
  await voiceChannel.muteQueueOriginalCall(session);
});

When(
  'user transfers call to {string} queue in {string} window',
  async (queueName, session) => {
    await voiceChannel.transferCallToQueue(queueName, session);
  }
);

When(
  'user makes {string} of call in {string} window',
  async (transferType, session) => {
    await voiceChannel.transferACall(transferType, session);
  }
);

Then('user configure Global Max tries with value {string}', async (triesLimit) => {
  await voiceChannel.setGlobalMaxTries(triesLimit);
});

Then('user activates suboption {string} in the {string} option', async (subOption, mainOption) => {
  await voiceChannel.activateLeadSearchOption(subOption, mainOption);
});

Then('user clicks on search tab in {string} window', async (window) => {
  await voiceChannel.clickSearchTab(window);
});

Then('search for closed contacts {string} in {string} window', async (contact, window) => {
  await voiceChannel.searchClosedContact(contact, window);
});

Then('validate customer record {string} loaded in {string} window', async (name, window) => {
  await voiceChannel.validateCustomerRecord(name, global.newDBName[0].toString(), window);
});

Then('user selects {string} button in {string} window', async (buttonName, window) => {
  await voiceChannel.clickContactButtons(buttonName, window);
});

Then('search for closed contacts {string} in similar contacts in {string} window', async (contact, window) => {
  await voiceChannel.searchClosedContactInSimilarContact(contact, window);
});

Then('verify call has been made to a masked number for {string} call', async(callType) => {
  await voiceChannel.validateMaskedNumber(callType);
});
