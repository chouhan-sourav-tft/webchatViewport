/*global page*/

const { assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');
const { apiHelper } = require('../setup/apiHelper');

let currentTabNo = '';
let allStep = {
  GeneralSetting: 1,
  Actions: 2,
  AgentsACDManagement: 3,
  outcomes: 4,
  sounds: 5,
};
const api = new apiHelper();
exports.VoiceChannel = class VoiceChannel extends BaseAction {
  constructor() {
    super();
  }

  elements = {
    voiceCallButton: '#voiceControls-manual',
    contactNumberTextbox: '#voice-manual-call-number',
    callDisconnectButton: '#voiceControls-close i',
    callNumberLabel: '.contact-info-label-fifth_phone i',
    callNumberButton: '#voice-field-first_phone-btn',
    callAgainButton: '#voice-outcomes button',
    submitVoiceOutcomeButton: '#voice-outcomes-submit',
    userStatus: '#voice-user-state',
    voiceControl: '#voiceControls-volume.btn',
    breakNotification:
      '#newContentdiv p[data-translate="break_afterCall_action"]',
    outcomesHeader: '//header/span[@data-translate="voiceBody.outcomesTab"]',
    outcomeSubmit: '//span[@data-translate="outcomes.submit"]',
    voiceChannelLogin: '#channel-voice-label-text',
    voiceChannelLogout: '[id="channel-voice-logout"]',
    voiceForm: '#voice-login-extension',
    voiceSubmit: '#voice-login-submit',
    queueList: '[id="login-modal-queues"] [class="checkbox"]',
    outboundSelectClick: '#s2id_login-modal-outbound-selector',
    outboundSelect: '#select2-drop input',
    selectCamp: '#voice-owner-selector-save',
    voiceManager: '[id="menu_1"]',
    outboundSearchBox: '[id="campaignList_filter"] input',
    dialerTab: '[data-translate="dialer"]',
    saveCampaign: '[data-translate="btnFinishCampaign"]',
    submitButton: '[id="bot2-Msg1"]',
    dialerType: '//span[@data-translate="dialertype"]/../following-sibling::label/select',
    phoneNumberButton: '[id="voice-field-first_phone-btn"]',
    voiceLoginMessage: '//em[@id="login-modal-sip-message"]',
    voiceLoginCallingMessage:
      '//div[@id="voice-login-msg" and contains(text(),"Calling your Sip Phone extension...")]',
    transferCallButton: '#voiceControls-transfer',
    originalVoiceCallMuteButton: '.voice-transfer-remote-original-mute-btn',
    voiceTransferDialButton: '#voice-transfer-remote-dial',
    voiceTransferDialTextbox: '#voice-transfer-remote-dial-number',
    ringTransferCallButton: '.voice-transfer-remote-destination-call-btn',
    transferVoiceCallButton:
      '#voice-transfer-remote-tab .voice-transfer-submit-btn',
    ivrToggleButton: '.voice-transfer-window-toggle',
    ivrList: '#chat-users li:nth-child(1)',
    ivrVoiceTransferButton:
      '#voice-transfer-ivr-tab .voice-transfer-submit-btn',
    popupMessage: '#newContentdiv',
    averageTalkingTime: '#average-talk-time-warning',
    voiceAlert: '#voice-above-att',
    muteCallQueueButton: '.voice-transfer-queue-original-mute-btn',
    transferAssistedCallButton: '#voice-assisted-transfer-btn-submit-transfer',
    personalCallback: '#allow-personal-callback',
    callOutcomeTab: '[data-translate="calloutcomes"]',
    addOutcome: 'span[data-translate="addoutcome"]',
    enterOutcome: '.table-outcomes input[data-tanslate="placeinsertout"]',
    outcomeAttribute:
      '.table-outcomes tbody tr.new .inline-group label:nth-child(1)',
    outcomeGroup: '.table-outcomes tbody tr.new .outcome-groups',
    callbackDate: '#voice-outcomes-callback-date',
    callbackManager: 'a[data-title="Callbacks Manager"]',
    voiceChannelShow: '#channel-voice-show',
    callbackTab: '[id="voice-tab-voice-callbacks"]',
    voiceChannelComment: '#voice-outcomes-callback-comments',
    callbackTableRow:
      '//table[@id="callbacks_table"]//tbody/tr/td[text()="Callback"]',
    startLoadDate: '[id="search-start-date"]',
    endLoadDate: '[id="search-end-date"]',
    searchButton:
      'button[type="button"] span[translate="callbacks.search.btn_search"]',
    callbackSearchInput: '#inbox-callback_filter input',
    recycleTab: '//div[@id="widCampaign"]//span[@data-translate="recycle"]',
    recycleTabCallOutcome:
      '.table-recycles [class="new new-recycle-row"] td:nth-child(1)',
    recycleInterval:
      '.table-recycles [class="new new-recycle-row"] td:nth-child(2)',
    recycleMaxTries: '[class="input state-success"] [type="number"]',
    realTimeStatsMenu: '[id="menu_0"]',
    dialerControlMenu: '[id="menu_16"]',
    outboundCampaignDialerControl: '[dialer-control-active-campaign-select]',
    previewOptionDialerControl: '[data-translate="preview"]',
    dialerControlOutboundCampaign:
      '//select[@id="dialer-control-active-campaign-select"]',
    dialerControlPreviewButton: '[id="dialer-control-filter-preview"]',
    recycleSetting: '[data-translate="recycleSettings"]',
    addRecycle: 'button [data-translate="recycle"]',
    ratio: '[data-ratio="1"]',
    warningHoldTime: '//input[@id="hold-time-warning"]',
    holdButton: '#voiceControls-hold',
    unholdButton: '//button[@id="voiceControls-resume"]',
    callHoldWarning: '//label[@id="hold-talk-time"]',
    maxWrapUpNotification: '//label[@id="voice-wrap-up-label"]',
    minWrapUpNotification: '//span[@data-translate="outcomes.minwrapup"]',
    outcomeGroupFirst: '[id="voice-outcomes"] button:nth-child(1)',
    minWrapToggleOFF:
      '//div[@id="min-wrap-up-container" and @class="hidden"]/parent::fieldset//i',
    maxWrapToggleOFF:
      '//div[@id="max-wrap-up-container" and @class="hidden"]/parent::fieldset//i',
    minWrapToggleON: '//div[@id="min-wrap-up-container"]/parent::fieldset//i',
    maxWrapToggleON: '//div[@id="max-wrap-up-container"]/parent::fieldset//i',
    redialToggle: '//input[@name="redials"]/../i',
    redialButton: '//span[@data-translate="redials"]/../i',
    callRedial: '//button[@id="voiceControls-redial"]',
    noCallback: '[id="inbox-callback"] tbody tr td',
    callType:
      '#dialer-control-hopper-preview-table>tbody>tr>td.vertical-align-middle>span',
    phoneNumber:
      '#dialer-control-hopper-preview-table>tbody>tr>td:nth-child(4)',
    closePreview: '[data-translate="close"]',
    origin: '[id="voice-header-info-outbound-origin"]',
    ContactInfoCall: '#voice-field-first_phone-btn',
    dtmfIcon: '#voiceControls-dtmf',
    dtmfToggleOption: 'input[name = "allow-dtmf"]',
    dtmfToggleLink: '//*[@name = "allow-dtmf"]/parent::label/i',
    callbackSameDate:
      '.xdsoft_datetimepicker:last-child td.xdsoft_today.xdsoft_current',
    callbackNextTime:
      'div[style*="display: block"] .xdsoft_timepicker:last-child div.xdsoft_time.xdsoft_current +div',
    callbackParent: '#callback-cb-parent span',
    callbackSingle: '.callback-checkbox span',
    callbackDelete: 'a.access-level-del',
    topSuccessMessage: '.SmallBox.animated.fadeInRight.fast',
    previewDialTimeout: '#preview-dial-timeout',
    callTransferToggle: 'input[name = "call-transfers"]',
    callTransferToggleLink: '//*[@name = "call-transfers"]/parent::label/i',
    callTransferButton: '#voiceControls-transfer',
    outcomesTab: 'span[data-translate="calloutcomes"]',
    addOutcomeBtn: 'span[data-translate="addoutcome"]',
    outcomeNameInput: '.outcome-table tr:nth-child(1) .outcome-edit',
    outcomeGroupSelect:
      '//tr[@class="new"]//input[@placeholder="Insert new outcome..."]/../parent::td/following-sibling::td//select[@name="outcome-group"]',
    outcomeBlacklistTable:
      '//tr[@class="new"]//input[@placeholder="Insert new outcome..."]/../parent::td/following-sibling::td//span[text()="Select table"]',
    outcomeBlacklistInput:
      '//span[@role="status"]/following-sibling::div//input',
    outcomeSelectColumn:
      '//tr[@class="new"]//input[@placeholder="Insert new outcome..."]/../parent::td/following-sibling::td//span[text()="Select column"]',
    humanAttributeOutcome:
      '//tr[@class="new"]//input[@placeholder="Insert new outcome..."]/../parent::td/following-sibling::td/div//span[text()="Human Answer"]',
    blacklistWarning: '//span[@id="blacklisSelectedtWarning"]',
    voiceLoginInvalidMessage: '#login-modal-sip-message.invalid',
    voiceCallbackFilter: '#callbacks_table_wrapper input',
    breaksDropdown: '#dropdown-breaks',
    outboundButton: 'span[data-translate="outbound"]',
    newCampaign: '//span[@data-translate="addoutboundcamp"]',
    outboundDDI: '//div[@id="s2id_ddis"]//ul[@class="select2-choices"]',
    nexttabButton: '//button[@class="btn btn-sm btn-default btn-next"]',
    outcomeName: '//input[@placeholder="Insert new outcome..."]',
    searchAgentName: '//input[@aria-controls="users-list"]',
    addUser: '//a[@id="add-users"]',
    inValidMessage: 'input.invalid',
    deleteOutcomeButton: '.outcome-table tr:nth-child(1) .delete-outcome',
    outboundCampaignClick: '[id="s2id_voice-outbound-inbound-selector-select"]',
    outboundLogoutLabel:
      '//span[@id="voice-after-call-action-text"][contains(text(),"Outbound Logout")]',
    voiceOfflineButton: '[id="channel-voice-label-text"] b',
    callRecording: '//select[@id="call-recording"]',
    didSearchBox: '[id="didList_filter"] input',
    inboundDestination: 'div[id="s2id_ddiDestination"]',
    searchInboundQueue: '//label[text()="Destination"]/following-sibling::input[contains(@id,"_search")]',
    inboundApplication: '//select[@id="ddiApplication"]',
    saveInboundChanges: 'button[id="saveDdi"]',
    confirmButton:
      'button[class="btn btn-primary btn-xs confirm-dialog-btn-confirm"]',
    didNumber: '#didList tbody tr:first-child td:nth-child(1)',
    targetID: '#didList tbody tr:first-child td:nth-child(4)',
    inboundSearchBox: '[id="inboundList_filter"] input',
    activeTabNumber: '.steps li.active span.badge',
    previousTabButton:
      '//button[@class="btn btn-sm btn-default btn-prev btn-font-size prev-margin"]',
    addTimedAction: '#add-new-timed-action',
    deleteTimedAction: '#delete-new-timed-action',
    timedActionsTable: '#timed-actions-table',
    actionsDropdown:
      '//tbody[@id="timed-actions-table"]/tr[1]//select[contains(@class,"timed-action-select")]',
    audioManagerButton:
      '#timed-actions-table button[class *="audio-manager-show"]',
    searchResult: '.highlighted-by-filtering',
    searchBox: '.tree-search',
    audioMangerSave: '#audio-manager-save',
    noOfDigits: '#totalDigits',
    optionsButton: '#timed-actions-table button[class *= "optionButton"]',
    audioManagerOptions:
      '#audioSelectWrapper button[class *="audio-manager-show"]',
    callbackToggle: '#callBackCheckBox ~i',
    saveOptions: '#save-extraOptions-button',
    finish: '#finish-queue',
    actionCheckBox: '#timed-actions-table .timed-action-delete ~i',
    manualStateCancel: '#voiceControls-manualCancel',
    dtmfNumber: '#voice-header-info-outbound-dtmf-collection',
    dtmf: '#dtmf-header',
    editInboundId: '#didList tbody tr:first-child td:nth-child(6) button',
    queueSelect:
      '//tbody[@id="timed-actions-table"]/tr[1]//select[contains(@class,"queue-select")]',
    timeSelect:
      '//tbody[@id="timed-actions-table"]/tr[1]//select[contains(@class,"timed-action-seconds-select")]',
    digitSelect:
      '//tbody[@id="timed-actions-table"]/tr[1]//select[contains(@class,"timed-action-digit-select")]',
    repeatCheckBox:
      'tbody[id="timed-actions-table"] tr:nth-child(1) input[class="timed-action-repeat"] ~i',
    queueScheduledTimeDropDown: '//select[@class="hour form-control"]',
    queueScheduledTimeDropDownConfirmBtn:
      '//button[contains(@class,"editable-submit")]/i',
    voicemailTab: '#voice-tab-voice-voicemails',
    voicemailTableNumber: '#voice-voicemails-table tbody tr:nth-child(1) td:nth-child(2)',
    voicemailTableQueue: '#voice-voicemails-table tbody tr:nth-child(1) td:nth-child(3)',
    sortByDate: '#voice-voicemails-table thead th:nth-child(1)',
    voicemailCall: '#voice-voicemails-call',
    maxQueueMinutes: '#max-queue-time-minutes',
    maxQueueSeconds: '#max-queue-time-seconds',
    defaultSectionExtension: '//input[@placeholder="Enter extension..."]',
    showVoiceChannel: '#channel-voice-show',
    agentDirect: '//span[normalize-space()="Agent Direct"]',
    selectDirectAgent: '[id="s2id_agent-direct-agent-list"]',
    searchDirectAgent: '//div[@id="select2-drop"]//input',
    queueScheduledMinuteDropDown: '//select[@class="minute form-control"]',
    waitingCall: '[id="channel-voice-queues"]',
    scheduleCallbackToggle: 'input[name = "callback-agent"]',
    scheduleCallbackToggleLink: '//*[@name = "callback-agent"]/parent::label/i',
    agentDropdown: '#s2id_select-callback-agents',
    ivrTargetSelect:
      '//tbody[@id="timed-actions-table"]/tr[1]//select[contains(@class,"ivr-select")]',
    manageException: '.manage-schedule-exceptions-btn',
    exceptionName: '#schedule-exception-form input[name="name"]',
    exceptionDate: '#schedule-exception-form input[name="date"]',
    repeatException: '#schedule-exception-form input[name="isRecurrent"]',
    allDayCheckBox: '#schedule-exception-form input[name="isAllDay"] ~span',
    createException: '.schedule-exceptions-manager-create-btn',
    tableExceptionSearch: '.schedule-exceptions-table-container .dataTables_filter input',
    tableExceptionName: '.schedule-exceptions-table-container tbody tr:nth-child(1) td:nth-child(3)',
    exceptionSelectBox: '.schedule-exceptions-table-container tbody tr:nth-child(1) td:nth-child(2)',
    tableExceptionDate: '.schedule-exceptions-table-container tbody tr:nth-child(1) td:nth-child(4)',
    exceptionAddBtn: '.schedule-exceptions-manager-add-btn',
    activeExceeptionSearch: '.inbound-queue-schedule-exceptions-table-container .dataTables_filter input',
    activeExceptionName: '.inbound-queue-schedule-exceptions-table-container tbody tr:nth-child(1) td:nth-child(1)',
    activeExceptionDate: '.inbound-queue-schedule-exceptions-table-container tbody tr:nth-child(1) td:nth-child(2)',
    activeExceeptionState: '.inbound-queue-schedule-exceptions-table-container tbody tr:nth-child(1) td:nth-child(5)',
    exceptioRemove: '.schedule-exception-remove-btn',
    exceptionDeleteBtn: '.confirm-dialog-btn-confirm',
    exceptionCloseBtn: '#modal-schedule-exceptions-manager button[class="close"]',
    addToQueueToggle: 'input[name="isToAddToCurrentQueue"] ~i',
    selectQueueToAdd: '.anotherQueuesToAddWrapper .select2-search-field input',
    remoteCallBtn: '.voice-transfer-remote-destination-call-btn',
    startConferenceBtn: '.voice-start-conference',
    stopConferenceBtn: '.voice-stop-conference',
    remoteCallHangupBtn: '.voice-transfer-remote-destination-hangup-btn',
    cancelTransferBtn: '#voice-transfer-remote-tab .voice-transfer-cancel-btn',
    extensionBox: 'input[class="form-control timed-action-press-extension"]',
    agentForGlobalCallback: '#inbound-min-callback-input',
    template: '#s2id_extra-fields-template',
    templateSearch: '#select2-drop input',
    deleteRecycle: '.table-recycles .selectable-recycle',
    deleteCampaign: '#campaignList .btn-danger',
    campaignConfirm: 'div[class="bootbox modal fade bootbox-confirm in"] button[class="btn btn-primary"]',
    queueCallRecording: '//select[@id="queue-call-recording"]',
    contactOutcome: '//label[text()="Contact outcome"]/following-sibling::div[@id="s2id_outcome-selector"]//span[@id]',
    outboundCloud: '.voice-active-outbound-campaign',
    outboundCloudCampaignClick: '#s2id_voice-outbound-inbound-selector-select',
    outboundCloudSubmit: '#voice-owner-selector-save',
    mainOnlineBanner: '#channel-main-label-text [data-translate="online"]',
    closeVoiceCampaignModal: '[id="voice-login-modal"]>div>div>div>a',
    emptyException: '.inbound-queue-schedule-exceptions-table-container .dataTables_empty',
    cancelManualCall: '[id="voiceControls-manualCancel"] i',
    deleteException: 'button[data-original-title="Delete exception"]',
    phoneId: '[id="voice-field-first_phone-btn"]',
    cityName: '[id="voice-field-city"]',
    postalCode: '[id="voice-field-postal_code"]',
    email: '[id="voice-field-email"]',
    contactName: '[id="voice-field-contact"]',
    activeCallModal: '//div[@id="modal-login-while-call"]',
    extraFieldName: 'input[name="field1"]',
    scriptCallbackDate: '//div[@id="voice-script-container"]/div[not (contains(@style,"display: none"))]//input',
    callbackComment: '//div[@id="voice-script-container"]/div[not (contains(@style,"display: none"))]//textarea',
    historyComment: '#voice-history-list li:nth-child(2) .smart-timeline-content div p:nth-child(6)',
    historyTab: '#voice-tab-voice-history',
    callbackScriptNextTime: '//div[@class="xdsoft_time xdsoft_disabled xdsoft_disabled"][last()]/following-sibling::div[1]',
    comment:'//ul[@id="voice-history-list"]/li[last()]//div[contains(@class,"well ")]/p[last()]',
    nextMonthButton: '//div[contains(@class,"xdsoft_datetimepicker")][last()]//div[contains(@class,"xdsoft_datepicker active")]//button[contains(@class,"xdsoft_next")]',
    globalMaxTries: '#global-max-tries',
    inboundCallHeader: '#wid-id-2 header',
    searchContact: '#voice-contact-search-datatable_filter input',
    emptyTable: '#voice-contact-search-datatable .dataTables_empty',
    contactTable: '#voice-contact-search-datatable_wrapper',
    searchLocator: '#voice-tab-voice-search',
    inboundCallNumberText: '#voice-header-info-inbound-phone',
    outboundCallNumberText: '#voice-header-info-outbound-phone',
    sidePanelExpandMenu: '#left-panel .minifyme'
  };

  /**
   * Function to make a call when user is not in ready state
   * @param  {string} type -type of window
   * @return {void} Nothing
   */
  async makeACall(type = '') {
    // waiting to enable call button
    await this.wait(4);
    await this.waitForSelector(this.elements.callNumberButton, type);
    await this.click(this.elements.callNumberButton, type);
    // waiting for call to connect
    await this.wait(3);
  }

  /**
   * Function used to make a call when user is in ready state
   * @param  {string} number - calling number
   * @param  {string} type -type of window
   * @return {void} Nothing
   */
  async dialNumberInReadyState(number, type = '') {
    await this.waitForSelector(this.elements.voiceCallButton, type);
    await this.click(this.elements.voiceCallButton, type);
    await this.waitForSelector(this.elements.contactNumberTextbox, type);
    await this.type(this.elements.contactNumberTextbox, number, type);
    await this.pressKey('Enter', type);
  }

  /**
   * set campaign TimeAndTries
   * @param {string} timeType min OR max
   * @param {string} timeInSec warning time in sec
   * @return {void} Nothing
   */
  async campaingTimeAndTries(timeType, timeInSec) {
    if (timeType === 'Warning Hold Time') {
      await this.click(this.elements.warningHoldTime);
      await this.type(this.elements.warningHoldTime, timeInSec);
    }
  }

  /**
   * put call on hold
   * @param {string} button call function button
   * @return {void} Nothing
   */
  async callOnHold(button) {
    if (button === 'hold') {
      await this.click(this.elements.holdButton);
    } else if (button === 'unhold') {
      await this.click(this.elements.unholdButton);
      await this.wait(3); //wait for call resume
    }
  }

  /**
   * verify call warning
   * @param {string} warningType call on warning
   * @param {string} time warning time
   * @return {void} Nothing
   */
  async verifyWarning(warningType, time) {
    await this.wait(time); // wait till warning appear
    if (warningType === 'hold') {
      await this.waitForSelector(this.elements.callHoldWarning);
      let warning = await this.isVisible(this.elements.callHoldWarning);
      await assert.isTrue(warning);
    }
  }

  /**
   * switch toggle wrapUp time
   * @param {string} toggleState ON/OFF
   * @param {string} timeType min OR max
   * @return {void} Nothing
   */
  async wrapUpToggle(toggleState, timeType) {
    await this.waitForSelector(
      '//span[@data-translate="' + timeType + 'wrapuptime"]'
    );
    let maxToggleState = await this.isVisible(this.elements.maxWrapToggleOFF);
    let minToggleState = await this.isVisible(this.elements.minWrapToggleOFF);

    if (maxToggleState === false) {
      await this.click(this.elements.maxWrapToggleON);
    }
    if (minToggleState === false) {
      await this.click(this.elements.minWrapToggleON);
    }
    //wait for tab to maximize
    await this.wait(3);
    let currentStateOfToggleOff = await this.isVisible(
      '//div[@id="' +
      timeType +
      '-wrap-up-container" and @class="hidden"]/parent::fieldset//i'
    );

    if (currentStateOfToggleOff === true && toggleState === 'on') {
      await this.click(
        '//div[@id="' +
        timeType +
        '-wrap-up-container" and @class="hidden"]/parent::fieldset//i'
      );
    }
  }

  /**
   * set wrapUp time
   * @param {string} timeType min OR max
   * @param {string} time
   * @return {void} Nothing
   */
  async wrapUpTime(timeType, time) {
    await this.click('//input[@id="' + timeType + '-wrap-up-time-seconds"]');
    await this.type(
      '//input[@id="' + timeType + '-wrap-up-time-seconds"]',
      time
    );
  }

  /**
   * validate the wrapUp notification
   * @param {string} timeType min OR max
   * @return {void} Nothing
   */
  async wrapUpNotification(timeType) {
    if (timeType === 'max') {
      let notifiaction = await this.isVisible(
        this.elements.maxWrapUpNotification
      );
      await assert.isTrue(notifiaction);
    } else if (timeType === 'min') {
      let notifiaction = await this.isVisible(
        this.elements.minWrapUpNotification
      );
      await assert.isTrue(notifiaction);
    }
  }

  /**
   * Function to perform action based on WrapUp type
   * @param {string} timeType min OR max
   * @param {string} time wrapUp Time
   * @param {string} actionType autoOutcome OR disabled till min time exceeds
   * @param {string} outcome outcome
   * @return {void} Nothing
   */
  async wrapUpAction(outcomeGroup, timeType, time, actionType, outcome) {
    let outcomeGroupSelector = `//*[contains(text(),'${outcomeGroup}')]`;
    if (timeType === 'max' && actionType === 'auto') {
      await this.wait(time);
    }
    if (timeType === 'min' && actionType === 'disabled') {
      await this.waitForSelector(outcomeGroupSelector);
      await this.click(outcomeGroupSelector);
      let outcomeNameSelector = `(//input[@name="voice-outcomes-items"]/../../label[text()='${outcome}'])`;
      await this.click(outcomeNameSelector);
      let buttonStatus = await this.getAttributeElement(
        this.elements.submitVoiceOutcomeButton,
        'disabled'
      );
      await this.wrapUpNotification(timeType);
      await assert.equal('disabled', buttonStatus);
      await this.wait(time);
      await this.click(this.elements.submitVoiceOutcomeButton);
    }
  }

  /**
   * Function to disconnect a voice call
   * @param  {string} type type of window
   * @return {void} Nothing
   */
  async disconnectACall(type = '') {
    await this.wait(5); // wait for call to be connected
    if (await this.isVisible(this.elements.breaksDropdown, type))
      await this.click(this.elements.callNumberLabel, type);
    await this.click(this.elements.callDisconnectButton, type);
  }

  /**
   * Function to submit outcomes
   * @param  {String} outcomeGroup - Name of outcome group
   * @param  {String} outcomeName - Outcome name
   * @param  {string} type type of window
   * @return {void} Nothing
   */
  async submitOutcomes(outcomeGroup, outcomeName, type = '') {
    let outcomeGroupSelector = `//*[contains(text(),'${outcomeGroup}')]`;
    await this.waitForSelector(outcomeGroupSelector, type);
    if(!await this.isVisible(outcomeGroupSelector,type)){
      await this.click(this.elements.outcomesTab);
    }
    await this.click(outcomeGroupSelector, type);
    let outcomeNameSelector =
      '//input[@name="voice-outcomes-items"]/../input[@data-outcome-name="' +
      outcomeName +
      '"]/..';
    await this.click(outcomeNameSelector, type);
    if (outcomeName.includes('Blacklist#1')) {
      let warn = await this.isVisible(this.elements.blacklistWarning);
      assert.isTrue(warn);
    }
    await this.click(this.elements.submitVoiceOutcomeButton, type);
  }

  /**
   * Function to verify user state
   * @param  {String} userState - expected user state
   * @param  {string} type type of window
   * @return {void} Nothing
   */
  async verifyUserState(userState, type = '') {
    //added wait to load state
    await this.wait(4);
    if (userState === 'talking') {
      await this.waitForSelector(this.elements.voiceControl, type);
    }
    const locator = `span[data-value='${userState}']`;
    try {
      await this.waitForSelector(locator, type);
      let state = await this.isVisible(locator, type);
      await assert.isTrue(state);
    } catch (error) {
      if (await this.isVisible(this.elements.cancelManualCall)) {
        while (await this.isVisible(this.elements.cancelManualCall)) {
          await this.click(this.elements.cancelManualCall);
          return;
        }
        await this.waitForSelector(locator, type);
        let state = await this.isVisible(locator, type);
        await assert.isTrue(state);
      }
    }
  }

  /**
   * Function to verify notification is visible
   * @return {void} Nothing
   */
  async verifyNotification() {
    await this.waitForSelector(this.elements.breakNotification);
    await this.shouldVisible(this.elements.breakNotification);
  }

  /**
   * function to login voice channel
   * @param {string} extension - extension to login
   * @param  {String} type - window where operation has to be performed
   * @return {void} Nothing
   */
  async voiceChannelLogin(extension, type = '') {
    await this.waitForSelector(this.elements.voiceChannelLogin, type);
    await this.click(this.elements.voiceChannelLogin, type);
    await this.waitForSelector(this.elements.voiceForm, type);
    await this.type(this.elements.voiceForm, extension, type);
  }

  /**
   * Select campaign after logging to voice channel
   * @param  {String} outbound - campaign name
   * @param  {String} type - window where operation has to be performed
   * @return {void} Nothing
   */
  async selectCampaign(outbound, type = '') {
    await this.click(this.elements.outboundSelectClick, type);
    await this.type(this.elements.outboundSelect, outbound, type);
    await this.pressKey('Enter', type);
    await this.click(this.elements.voiceSubmit, type);
  }

  /**
   * Function to open the voice Manager
   * @returns {void} nothing
   */
  async openVoiceManager() {
    await this.waitForSelector(this.elements.mainOnlineBanner);
    await this.waitForSelector(this.elements.voiceManager);
    await this.mouseOver(this.elements.voiceManager);
    await this.click(this.elements.voiceManager);
    await this.click(this.elements.inboundCallHeader);
  }

  /**
   * Function to search the campaign
   * @param {string} outboundCampaign - outbound campaign name
   * @returns {void} nothing
   */
  async searchCampaign(outboundCampaign) {
    await this.waitForSelector(this.elements.outboundSearchBox);
    await this.click(this.elements.outboundSearchBox);
    await this.type(this.elements.outboundSearchBox, outboundCampaign);
    await this.pressKey('Enter');
  }

  /**
   * Function to edit the campaign
   * @returns {void} nothing
   */
  async editCampaign(outboundCampaign) {
    let editOutboundCampaign =
      '//td[text()="' +
      outboundCampaign +
      '"]/following-sibling::td[last()]/button[last()-1]';
    await this.waitForSelector(editOutboundCampaign);
    await this.click(editOutboundCampaign);
    // waiting here so that edit campaign load
    await this.wait(3);
  }

  /**
   * Function to open the dialer tab
   * @returns {void} nothing
   */
  async openDialerTab() {
    await this.wait(6);
    await this.waitForSelector(this.elements.dialerTab);
    await this.click(this.elements.dialerTab);
  }

  /**
   * Function to select the dialer type
   * @returns {void} nothing
   */
  async selectDialerType(dialerType) {
    await this.waitForSelector(this.elements.dialerType);
    await this.selectOptionByValue(this.elements.dialerType, dialerType);
  }

  /**
   * Function to save the campaign
   * @returns {void} nothing
   */
  async saveCampaign() {
    await this.waitForSelector(this.elements.saveCampaign);
    await this.click(this.elements.saveCampaign);
    await this.waitForSelector(this.elements.submitButton);
    await this.click(this.elements.submitButton);
    // adding wait here so that campaign updated successfully
    await this.wait(5);
  }

  /**
   * Function to verify and click the phone number
   * @param {string} phoneNumber user phone number
   * @param {string} type type of window
   * @returns {void} nothing
   */
  async verifyAndClickPhoneNumber(phoneNumber, type = '') {
    await this.waitForSelector(this.elements.phoneNumberButton, type);
    await this.shouldVisible(this.elements.phoneNumberButton, type);
    await this.shouldContainText(
      this.elements.phoneNumberButton,
      phoneNumber,
      type
    );
    await this.click(this.elements.phoneNumberButton, type);
  }

  /**
   * Function to verify sip extension
   * @param {string} message message warning
   * @returns {void} nothing
   */
  async sipExtensionWarning(message) {
    await page
      .locator(this.elements.voiceLoginCallingMessage)
      .waitFor({ state: 'hidden' });
    await this.waitForSelector(this.elements.voiceLoginInvalidMessage);
    let expectedMessage = await this.getText(this.elements.voiceLoginMessage);
    assert.equal(message, expectedMessage.trim());
  }

  /**
   * Function to click on transfer call button
   * @param  {string} type type of window
   * @return {void} Nothing
   */
  async transferCall(type='') {
    await this.waitForSelector(this.elements.transferCallButton,type);
    await this.click(this.elements.transferCallButton,type);
  }

  /**
   * Function to select the transfer type tab
   * @param  {String} transferType - type of transfer to select
   * @param  {string} type type of window
   * @return {void} Nothing
   */
  async selectTransferTab(transferType,type='') {
    const locator = `#voice-transfer-widget-div ul.nav li[data-active-tab="${transferType}"]`;
    await this.waitForSelector(locator,type);
    await this.click(locator,type);
  }

  /**
   * Function to mute the original call
   * @return {void} Nothing
   */
  async muteOriginalCall() {
    await this.waitForSelector(this.elements.originalVoiceCallMuteButton);
    await this.click(this.elements.originalVoiceCallMuteButton);
  }

  /**
   * Function to make a remote transfer of call
   * @param  {stirng} callNumber - destination call number to transfer call
   * @return {void} Nothing
   */
  async remoteTransferCall(callNumber) {
    await this.wait(1);
    if (!(await this.isVisible(this.elements.voiceTransferDialTextbox))) {
      await this.click(this.elements.voiceTransferDialButton);
    }
    await this.type(this.elements.voiceTransferDialTextbox, callNumber);
    await this.pressKey('Enter');
    await this.click(this.elements.ringTransferCallButton);
    await this.scrollIntoElement(this.elements.transferVoiceCallButton);
    await this.click(this.elements.transferVoiceCallButton);
  }

  /** Function to wait for ringing
   * @param {number} seconds seconds to wait
   * @returns {void} nothing
   */
  async waitForRinging(seconds) {
    await this.wait(seconds);
  }

  /**
   * Function to transfer call to ivr
   * @returns {void} nothing
   */
  async transferCallToIvr() {
    await this.waitForSelector(this.elements.ivrToggleButton);
    await this.click(this.elements.ivrToggleButton);
    await this.click(this.elements.ivrList);
    await this.click(this.elements.ivrVoiceTransferButton);
  }

  /**
   * Function to verify hangup message
   * @param {string} message hangup message
   * @returns {void} nothing
   */
  async callHangupMessage(message) {
    await this.waitForSelector(this.elements.popupMessage);
    await this.shouldContainText(this.elements.popupMessage, message);
  }

  /**
   * Function to set warning average talking time
   * @param {string} seconds - talking time in seconds
   * @returns {void} nothing
   */
  async setAverageTalkingTime(seconds) {
    await this.waitForSelector(this.elements.averageTalkingTime);
    await this.click(this.elements.averageTalkingTime);
    await this.pressKey('Backspace');
    await this.type(this.elements.averageTalkingTime, seconds);
  }

  /**
   * Function to verify voice alert message
   * @param {string} alert - alert message
   * @returns {void} nothing
   */
  async voiceAlert(alert) {
    //wait for popup
    await this.wait(2);
    await this.waitForSelector(this.elements.voiceAlert);
    await this.shouldContainText(this.elements.voiceAlert, alert);
    //validating warning message displayed 
    let value = await this.getAttributeElement(this.elements.voiceAlert, 'style');
    await this.shouldHasText(value, 'top: -4px;');

  }

  /**
   * Function to select queue after logging to voice channel
   * @param  {} queueName - name of queue to be selected
   * @param  {} type - name of window
   */
  async selectQueue(queueName, type = '') {
    if ((await this.countElement(this.elements.queueList, type)) > 1) {
      const locator = `//span[text()='${queueName}']`;
      await this.waitForSelector(locator, type);
      await this.click(locator, type);
      await this.click(this.elements.voiceSubmit, type);
    }
    else {
      await this.pressKey('Enter', type);
    }
  }

  /**
   * Function to transfer call to queue
   * @param {string} queueName - queue name to be selected
   * @param  {} type - name of window
   * @returns {void} nothing
   */
  async transferCallToQueue(queueName,type='') {
    await this.click(this.elements.ivrToggleButton, type);
    const locator = `span[title="${queueName}"]`;
    await this.waitForSelector(locator, type);
    //wait for list to load
    await this.wait(5);
    await this.click(locator, type);
  }

  /**
   * Function to mute the original call when transfer to queue
   * @param  {} type - type of window
   * @return {void} Nothing
   */
  async muteQueueOriginalCall(type='') {
    await this.waitForSelector(this.elements.muteCallQueueButton,type);
    await this.click(this.elements.muteCallQueueButton,type);
  }

  /**
   * Function to transfer a call
   * @param  {string} transferType - type of transfer to be made
   * @param  {} type - type of window
   */
  async transferACall(transferType, type='') {
    const locator = `//button[text() = '${transferType}']`;
    await this.click(locator, type);
    if (transferType === 'Assisted Transfer')
      await this.click(this.elements.transferAssistedCallButton, type);
  }

  /**
   * Function to update personal callback
   * @param {string} option - callback option
   * @returns {void} nothing
   */
  async selectPersonalCallback(option) {
    await this.selectOptionByValue(this.elements.personalCallback, option);
  }

  /**
   * Function to open the call outcome tab
   * @returns {void} nothing
   */
  async openCallOutcome() {
    // waiting for call outcome tab to be visible
    await this.wait(2);
    await this.waitForSelector(this.elements.callOutcomeTab);
    await this.click(this.elements.callOutcomeTab);
  }

  /**
   * Function to search the call
   * @param {string} outcomeName - outcome name
   * @returns {boolean} status- true or false
   */
  async checkOutcome(outcomeName) {
    let outcome = `input[value='${outcomeName}']`;
    let status = await this.isVisible(outcome);
    return status;
  }

  /**
   * Function to submit callback outcomes
   * @param {object} callbackOutcomeObject - object to submit callback outcome
   * @param {string} callbackOutcomeObject.group - Name of outcome group
   * @param {string} callbackOutcomeObject.outcome - Outcome name
   * @param {string} callbackOutcomeObject.option - Outcome option
   * @param {string} callbackOutcomeObject.randomComment - Outcome comments
   * @param {string} callbackOutcomeObject.agent - Agent Name
   * @return {void} Nothing
   */
  async submitCallbackOutcomes(callbackOutcomeObject) {
    let outcomeGroupSelector = `//*[contains(text(),'${callbackOutcomeObject.group}')]`;
    await this.waitForSelector(outcomeGroupSelector);
    await this.click(outcomeGroupSelector);
    let outcomeNameSelector = `(//input[@name="voice-outcomes-items"]/../../label[text()='${callbackOutcomeObject.outcome}'])`;
    await this.click(outcomeNameSelector);
    await this.waitForSelector(this.elements.callbackDate);
    await this.click(this.elements.callbackDate);
    if (callbackOutcomeObject.option === 'global') {
      await this.waitForSelector(this.elements.callbackSameDate);
      await this.click(this.elements.callbackSameDate);
      await this.waitForSelector(this.elements.callbackNextTime);
      await this.click(this.elements.callbackNextTime);
    } else {
      let tomorrowDate = await this.getTomorrowDate();
      let tomorrowMonth = await this.getTomorrowMonth();
      let callbackNextDate = `//div[@class="xdsoft_datetimepicker xdsoft_noselect xdsoft_"][starts-with(@style,"display: block;")]//table/tbody/tr/td[@data-date="${tomorrowDate}"][@data-month="${tomorrowMonth}"]`;
      if (!(await this.isVisible(callbackNextDate))) {
        await this.click(this.elements.nextMonthButton);
        await this.wait(2);//wait to load calendar
      }
      await this.waitForSelector(callbackNextDate);
      await this.click(callbackNextDate);
    }
    await this.click(this.elements.voiceChannelComment);
    let callbackOption = `.voice-outcomes-callback-selects span[data-translate='${callbackOutcomeObject.option}']`;
    await this.waitForSelector(callbackOption);
    await this.click(callbackOption);
    await this.type(
      this.elements.voiceChannelComment,
      callbackOutcomeObject.randomComment
    );
    if (callbackOutcomeObject.agent !== '' && callbackOutcomeObject.agent !== 'Unable To Select') {
      await this.click(this.elements.agentDropdown);
      await this.type(this.elements.searchDirectAgent, callbackOutcomeObject.agent);
      await this.pressKey('Enter');
    } else {
      if (callbackOutcomeObject.option !== 'personal') {
        await this.verifyelementIsHidden(this.elements.agentDropdown, true);
      }
    }
    await this.click(this.elements.submitVoiceOutcomeButton);
    // need to add wait here as state need time to change
    await this.wait(5);
  }

  /**
   * Function to open the callback manager
   * @returns {void} nothing
   */
  async openCallbackManager() {
    await this.waitForSelector(this.elements.sidePanelExpandMenu);
    await this.click(this.elements.sidePanelExpandMenu);
    await this.waitForSelector(this.elements.callbackManager);
    await this.click(this.elements.callbackManager);
    await this.wait(3); // wait for page to load
    await this.waitForSelector(this.elements.callbackSearchInput);
    await this.click(this.elements.sidePanelExpandMenu);
  }

  /**
   * function to open voice channel
   * @param  {String} type - window session
   * @return {void} Nothing
   */
  async openVoiceChannel(type = '') {
    await this.click(this.elements.voiceChannelLogin, type);
    await this.click(this.elements.voiceChannelShow, type);
  }

  /**
   * function to open callback tab
   * @param  {String} type - window session
   * @return {void} Nothing
   */
  async openCallbackTab(type = '') {
    await this.click(this.elements.callbackTab, type);
  }

  /**
   * function to validate scheduled callback
   * @param  {String} comment - Callback comments
   * @param  {String} type - window session
   * @return {void} Nothing
   */
  async validateCallback(comment, type = '') {
    await this.waitForSelector(this.elements.voiceCallbackFilter, type);
    await this.type(this.elements.voiceCallbackFilter, comment, type);
    await this.pressKey('Enter', type);
    await this.waitForSelector(this.elements.callbackTableRow, type);
  }

  /**
   * Function to search the callback
   * @param {object} validateCall - object to search a call
   * @param {string} validateCall.startLoadDate - select start Load Date
   * @param {string} validateCall.endLoadDate - select end load Date
   * @param {string} validateCall.comment - enter comment
   * @param {string} validateCall.campaign - verify campaign
   * @returns {void} nothing
   */
  async verifyCallback(validateCall) {
    if (validateCall.startLoadDate) {
      await this.waitForSelector(this.elements.startLoadDate);
      await this.type(this.elements.startLoadDate, validateCall.startLoadDate);
      await this.pressKey('Enter');
    }
    if (validateCall.endLoadDate) {
      await this.type(this.elements.endLoadDate, validateCall.endLoadDate);
      await this.pressKey('Enter');
    }
    await this.click(this.elements.searchButton);
    await this.waitForSelector(this.elements.callbackSearchInput);
    if (validateCall.comment) {
      await this.type(this.elements.callbackSearchInput, validateCall.comment);
      await this.pressKey('Enter');
    }
    let callbackTableResult = '//table[@id="inbox-callback"]//tbody/tr';
    if (validateCall.campaign) {
      await this.waitForSelector(
        `${callbackTableResult}/td[text()='${validateCall.campaign}']`
      );
    }
    if (validateCall.noCallback) {
      await this.wait(3); //take time to load the latest row
      await this.waitForSelector(this.elements.noCallback);
      await this.shouldContainText(
        this.elements.noCallback,
        validateCall.noCallback
      );
    }
  }

  /**
   * function to select transfer call options
   * @param  {String} toggleOption - Transfer call on
   * @return {void} Nothing
   */
  async callTransfer(toggleOption) {
    if (
      toggleOption === 'on' &&
      !(await this.getToggleButtonStatus(this.elements.callTransferToggle))
    ) {
      await this.click(this.elements.callTransferToggleLink);
    } else if (
      toggleOption === 'off' &&
      (await this.getToggleButtonStatus(this.elements.callTransferToggle))
    ) {
      await this.click(this.elements.callTransferToggleLink);
    }
  }

  /* * function to logout voice channel
   * @param {string} type - type for tab or window
   * @return {void} Nothing
   */
  async voiceChannelLogout(type = '') {
    // need to wait for login button to perform click event
    await this.wait(2);
    await this.click(this.elements.voiceChannelLogin, type);
    await this.click(this.elements.voiceChannelLogout, type);
  }

  /**
   * Function to open the recyle tab
   * @returns {void} nothing
   */
  async openRecycleTab() {
    // waiting here so that outbound campaign appears here
    await this.wait(3);
    await this.click(this.elements.recycleTab);
  }

  /**
   * Function to update recycle settings
   * @param {object} - settings
   * @param {string} - settings.callOutcome - outcome
   * @param {string} - settings.recycleInterval - time interval
   * @param {string} - settings.maxRetries - max retries
   * @returns {void} nothing
   */
  async updateRecycleSettings(settings) {
    if (
      !(await this.isVisible(
        '[data-translate="recycleSettings"] ~ div table td:nth-child(1)'
      ))
    ) {
      await this.forceClick(this.elements.addRecycle);
      await this.waitForSelector(this.elements.recycleSetting);
      await this.forceClick(this.elements.recycleTabCallOutcome);
      await this.forceClick(this.elements.recycleSetting);
      await this.selectOptionByValue(
        `${this.elements.recycleTabCallOutcome} select`,
        settings.callOutcome
      );
      await this.forceClick(this.elements.recycleInterval);
      await this.type(
        `${this.elements.recycleInterval} input`,
        settings.recycleInterval
      );
      await this.type(this.elements.recycleMaxTries, settings.maxTries);
    }
  }

  /**
   * Function to open dialer control menu
   * @returns {void} nothing
   */
  async openDialerControlMenu() {
    await this.mouseOver(this.elements.realTimeStatsMenu);
    await this.waitForSelector(this.elements.dialerControlMenu);
    await this.click(this.elements.dialerControlMenu);
  }

  /**
   * Function to select campaign
   * @param {string} outbound - outbound campaigns
   * @returns {void} nothing
   */
  async selectCampaignInDialerControl(outbound) {
    // need to wait to option to load
    await this.wait(5);
    await this.dropdownOptionSelect(
      this.elements.dialerControlOutboundCampaign,
      outbound
    );
    if (await this.isVisible(this.elements.ratio)) {
      await this.click(this.elements.ratio);
    }
  }

  /**
   * function to click preview option
   * @return {void} Nothing
   */
  async clickPreviewButton() {
    // wait for options to load
    await this.wait(2);
    await this.click(this.elements.dialerControlPreviewButton);
  }

  /**
   * function to validate the call outcome
   * @param {string} callType - type of call
   * @param {string} phoneNumber - user number
   * @return {void} Nothing
   */
  async validateCallOutcome(callType, phoneNumber) {
    await this.shouldContainText(this.elements.callType, callType);
    await this.shouldContainText(this.elements.phoneNumber, phoneNumber);
    await this.click(this.elements.closePreview);
  }

  /**
   * function to validate the origin
   * @param {string} origin- call origin
   * @return {void} Nothing
   */
  async validateCallOrigin(origin) {
    await this.shouldContainText(this.elements.origin, origin);
  }

  /**
   * Function to assert visibility of dtmf icon
   * * @return {void} Nothing
   */
  async verifyDtmfIconVisibility(visibilty = true) {
    await this.verifyVisibility(this.elements.dtmfIcon, visibilty);
  }

  /**
   * Function to toggle on/off allow dtmf button
   * @param  {String} toggleOption - on/off option to perform
   * @return {void} Nothing
   */
  async toggleDtmfOption(toggleOption) {
    if (
      toggleOption === 'on' &&
      !(await this.getToggleButtonStatus(this.elements.dtmfToggleOption))
    ) {
      await this.click(this.elements.dtmfToggleLink);
    } else if (
      toggleOption === 'off' &&
      (await this.getToggleButtonStatus(this.elements.dtmfToggleOption))
    ) {
      await this.click(this.elements.dtmfToggleLink);
    }
  }

  /** Redial toggle switch
   * @param {*} toggle
   */
  async setRedialToggle(toggle) {
    let currentState = await this.isChecked(this.elements.redialToggle);

    if (toggle === 'on') {
      if (currentState === false) {
        await this.click(this.elements.redialButton);
      }
    }
    if (toggle === 'off') {
      if (currentState === true) {
        await this.click(this.elements.redialButton);
      }
    }
  }

  async redialCall() {
    await this.click(this.elements.callRedial);
  }

  async contactInfoCall() {
    await this.click(this.elements.ContactInfoCall);
  }

  /**
   * verify if after call end button is visible
   * @param {*} state
   */
  async verifyRedialButton(state) {
    if (state === 'visible') {
      await this.waitForSelector(this.elements.callRedial);
      let redialAgainBtnStatus = await this.isVisible(this.elements.callRedial);
      assert.isTrue(redialAgainBtnStatus);
    } else if (state === 'not visible') {
      let redialAgainBtnStatus = await this.isVisible(this.elements.callRedial);
      assert.isFalse(redialAgainBtnStatus);
    }
  }

  /**
   * function to delete all scheduled callbacks
   * @return {void} Nothing
   */
  async deleteScheduledCallback() {
    //added wait to load callbacks
    await this.wait(2);
    if ((await this.countElement(this.elements.callbackSingle)) > 1) {
      await this.waitForSelector(this.elements.callbackParent);
      await this.click(this.elements.callbackParent);
      await this.waitForSelector(this.elements.callbackDelete);
      await this.click(this.elements.callbackDelete);
      await this.waitForSelector(this.elements.submitButton);
      await this.click(this.elements.submitButton);
      await this.waitForSelector(this.elements.topSuccessMessage);
    }
    if ((await this.countElement(this.elements.callbackSingle)) === 1) {
      await this.waitForSelector(this.elements.callbackSingle);
      await this.click(this.elements.callbackSingle);
      await this.waitForSelector(this.elements.callbackDelete);
      await this.click(this.elements.callbackDelete);
      await this.waitForSelector(this.elements.submitButton);
      await this.click(this.elements.submitButton);
      await this.waitForSelector(this.elements.topSuccessMessage);
    }
    //added wait to load deleted callback table
    await this.wait(2);
  }

  /**
   * Function to set preview dial timeout
   * @param {string} seconds - preview dial timeout in seconds
   * @returns {void} nothing
   */
  async setPreviewDialTimeout(seconds) {
    await this.waitForSelector(this.elements.previewDialTimeout);
    await this.click(this.elements.previewDialTimeout);
    await this.pressKey('Backspace');
    await this.type(this.elements.previewDialTimeout, seconds);
  }

  /**
   * Function to assert visibility of call transfer icon
   * * @return {void} Nothing
   */
  async verifyCallTransferIconVisibility(visibilty = true) {
    await this.verifyVisibility(this.elements.callTransferButton, visibilty);
  }

  /**
   * Function to switch to Outcome tab in campaign edit
   */
  async openOutcomeTab() {
    // waiting here so that outbound campaign appears here
    await this.wait(3);
    await this.click(this.elements.outcomesTab);
  }

  /**
   *
   * * Function to add outcome
   * @param {object} outcomeDetails
   * @param {string} outcomeDetails.name
   * @param {string} outcomeDetails.attributes
   * @param {string} outcomeDetails.group
   * @param {string} outcomeDetails.column
   * @param {string} outcomeDetails.campaign
   * @returns {void} nothing
   */
  async addOutcome(outcomeTable, outcomeDetails) {
    let outcomeAlreadyExists = await this.isVisible(
      '//input[@value="' + outcomeDetails.name + '"]'
    );

    if (outcomeAlreadyExists) {
      await this.wait(2); //outcomes to load
      await this.click(
        '//input[@value="' +
        outcomeDetails.name +
        '"]/../../parent::tr//label[@title="Delete Outcome"]'
      );
      await this.saveCampaign();
      await this.searchCampaign(outcomeDetails.campaign);
      await this.editCampaign(outcomeDetails.campaign);
      await this.openOutcomeTab();
    }
    this.waitForSelector(this.elements.addOutcomeBtn);
    this.click(this.elements.addOutcomeBtn);

    await this.waitForSelector(this.elements.outcomeNameInput);
    await this.type(this.elements.outcomeNameInput, outcomeDetails.name);
    await this.click(this.elements.humanAttributeOutcome);
    let checked = await this.isChecked(
      '//tr[@class="new"]//input[@placeholder="Insert new outcome..."]/../parent::td/following-sibling::td/div//span[text()="' +
      outcomeDetails.attributes +
      '"]'
    );
    if (!checked) {
      await this.click(
        '//tr[@class="new"]//input[@placeholder="Insert new outcome..."]/../parent::td/following-sibling::td/div//span[text()="' +
        outcomeDetails.attributes +
        '"]'
      );
    }
    await this.dropdownOptionSelect(
      this.elements.outcomeGroupSelect,
      outcomeDetails.group
    );
    await this.click(this.elements.outcomeBlacklistTable);
    await this.waitForSelector(this.elements.outcomeBlacklistInput);
    await this.type(this.elements.outcomeBlacklistInput, outcomeTable);
    await this.pressKey('Backspace');
    await this.pressKey('Enter');
    await this.wait(5); //loads cloumn option
    await this.click(this.elements.outcomeSelectColumn);
    await this.waitForSelector(
      '//div[@role="option" and text()="' + outcomeDetails.column + '"]'
    );
    await this.click(
      '//div[@role="option" and text()="' + outcomeDetails.column + '"]'
    );
  }

  /**
   * function to validate blacklist section
   * @param {string} columnValue - Value of option needs to be selected
   * @return {void} Nothing
   */
  async validateBlacklist(columnValue) {
    const newTable = (await global.newtTableName).toString();
    await this.wait(10);
    await this.waitForSelector(`//*[text()="${newTable}"]/../span`);
    if (columnValue === '0') {
      await this.uncheckToCheckbox(`//*[text()="${newTable}"]/../span`);
    } else {
      await this.checkToCheckbox(`//*[text()="${newTable}"]/../span`);
    }
    await this.selectOptionByValue(
      `//*[text()="${newTable}"]/../../.. /.. /div[2] //select`,
      columnValue
    );
  }

  /**
   * Function to validate the selected outcome
   * * @return {void} Nothing
   */
  async validateOutcome(outcome) {
    const outcomeValue = await this.checkCheckbosIsChecked(
      `[data-outcome-name="${outcome}"]`
    );
    assert.equal(outcomeValue, true);
    await this.click(this.elements.submitVoiceOutcomeButton);
  }

  /**
   * Select campaign after connecting a call
   * @param  {String} outbound - campaign name
   * @param  {String} type - window where operation has to be performed
   * @return {void} Nothing
   */
  async selectOutboundCampaign(outbound, type = '') {
    await this.waitForSelector(this.elements.outboundButton);
    await this.click(this.elements.outboundButton);
    await this.click(this.elements.outboundCampaignClick, type);
    await this.type(this.elements.outboundSelect, outbound, type);
    await this.pressKey('Enter', type);
    await this.click(this.elements.selectCamp, type);
    let outboundLogout = await this.isVisible(
      this.elements.outboundLogoutLabel
    );
    await assert.isTrue(outboundLogout);
  }

  /**
   * Function to fill DDI
   *  @param {String} ddiName - DDI name
   *  @return {void} Nothing
   */
  async selectDDI(ddiName) {
    await this.type(this.elements.outboundDDI, ddiName);
    await this.pressKey('Enter');
  }

  /**
   * Function to click on next tab
   *  @return {void} Nothing
   */
  async nexttab() {
    await this.click(this.elements.nexttabButton);
    if (await this.isVisible(this.elements.inValidMessage)) {
      await this.click(this.elements.deleteOutcomeButton);
      await this.click(this.elements.nexttabButton);
    }
  }

  /**
   * Function to create outcome
   * @param  {string} outcome-call outcome
   * @param  {string} attribute-call outcome attribute
   * @return {void} Nothing
   */
  async createOutcome(outcome, attribute, isNewCampaign = false) {
    if(isNewCampaign === false){
      await this.click(this.elements.addOutcomeBtn);
    }
    await this.waitForSelector(this.elements.outcomeNameInput);
    await this.type(this.elements.outcomeNameInput, outcome);
    let selectAttribute = `//tbody[@class='outcome-table']//span[@data-translate='${attribute}']`;
    if (!(attribute === 'humananswer')) {
      await this.click(selectAttribute);
    }
  }

  /**
   * Function to search and add agent
   * @param  {string} agent-agent name
   * @return {void} Nothing
   */
  async searchAgent(agent) {
    let selectAgent = `//td[normalize-space()='${agent}']`;
    await this.waitForSelector(this.elements.searchAgentName);
    await this.type(this.elements.searchAgentName, agent);
    await this.pressKey('Enter');
    await this.waitForSelector(selectAgent);
    await this.click(selectAgent);
    await this.click(this.elements.addUser);
  }

  /**
   * Function to add recycle settings
   * @param {object} - settings
   * @param {string} - settings.callOutcome - outcome
   * @param {string} - settings.recycleInterval - time interval
   * @param {string} - settings.maxRetries - max retries
   * @returns {void} nothing
   */
  async fillRecycleOption(settings) {
    await this.waitForSelector(this.elements.recycleSetting);
    await this.forceClick(this.elements.recycleTabCallOutcome);
    await this.forceClick(this.elements.recycleSetting);
    await this.selectOptionByValue(
      `${this.elements.recycleTabCallOutcome} select`,
      settings.callOutcome
    );
    await this.forceClick(this.elements.recycleInterval);
    await this.type(
      `${this.elements.recycleInterval} input`,
      settings.recycleInterval
    );
    await this.type(this.elements.recycleMaxTries, settings.maxTries);
  }

  /**
   * Function to verify if the campaign is created sucessfully
   * @param {string} campaignName - name of campaign
   * @returns {void} nothing
   */
  async checkCampaignCreated(campaignName) {
    await this.searchCampaign(campaignName);
    let editOutboundCampaign =
      '//td[text()="' +
      campaignName +
      '"]/following-sibling::td[last()]/button[last()-1]';
    return this.isVisible(editOutboundCampaign);
  }

  /**
   * Function to create a new campaign if doesn't exist
   * @param  {object} settings - campaign configurations
   * @param  {String} settings.campaignName - name of campaign
   * @param  {String} settings.template - template name
   * @param  {String} settings.dialerType - Dialer Type
   * @param  {String} settings.ddi - DDI number
   * @param  {String} settings.recycle - recycle details
   * @param  {String} settings.agentName- agent name
   * @returns {void} nothing
   */
  async createCampaign(settings) {
    let check = await this.checkCampaignCreated(settings.campaignName);
    if (!check) {
      await this.click('//span[@data-translate="addoutboundcamp"]');
      await this.type('//input[@id="campaign-name"]', settings.campaignName);

      // waiting here so that edit campaign load
      await this.wait(3);
      if (settings.template) {
        await this.click(this.elements.template);
        await this.type(this.elements.templateSearch, settings.template);
        await this.keyPress('Enter');
      }
      await this.nexttab();
      if (settings.dialerType) {
        await this.selectDialerType(settings.dialerType);
      }
      if (settings.ddi) {
        await this.selectDDI(settings.ddi);
      }
      await this.nexttab();
      if (settings.outcomeName) {
        let callOutcome = settings.outcomeName.split(',');
        let callOutcomeAttribute = settings.outcomeAttribute.split(',');
        for (let i = 0; i < callOutcome.length; i++) {
          await this.createOutcome(callOutcome[i], callOutcomeAttribute[i], true);
        }
      }
      await this.nexttab();
      if (settings.recycle === 'delete') {
        await this.click(this.elements.deleteRecycle);
      } else {
        await this.fillRecycleOption(settings);
      }
      await this.nexttab();
      if (settings.agentName) {
        let agent = settings.agentName.split(',');
        for (let i = 0; i < agent.length; i++) {
          await this.searchAgent(agent[i]);
        }
      }
      await this.saveCampaign();
    }
  }

  /**
   * Function to verify Voice Channel status
   * @param {string} status - status of Voice Channel
   * @returns {void} nothing
   */
  async verifyVoiceChannelStatus(status) {
    let expectedStatus = await this.getText(this.elements.voiceOfflineButton);
    assert.equal(status, expectedStatus.trim());
  }

  /**
   * Function to update dialer priority
   * @param {string} priority - dialer priority
   * @returns {void} nothing
   */
  async updateDialerPriority(priority) {
    const dialerContactStates = await this.isVisible(
      `div[data-priority="1"] input[value='${priority}']`
    );
    if (dialerContactStates === false) {
      await this.click(
        `//input[@value='${priority}']//parent::label/preceding-sibling::i[@title="Increase Priority"]`
      );
    }
  }

  /**
   * function to activate call recording outbound campaign or inbound queue
   * @param {string} voiceType - campaign or queue
   * @param {string} value - recording type value
   * @returns {void} nothing
   */
  async activateCallRecording(voiceType, value) {
    let voiceCallRecording;
    if (voiceType === 'campaign') {
      voiceCallRecording = this.elements.callRecording;
    } else {
      voiceCallRecording = this.elements.queueCallRecording;
    }
    await this.waitForSelector(voiceCallRecording);
    await this.selectOptionByText(`${voiceCallRecording}`, value);
    await this.wait(5); // page respond too fast
  }

  /**
   * Function to search the DID
   * @param {string} searchId - Id to be searched
   * @returns {void} nothing
   */
  async searchDID(searchId) {
    try {
      await this.click(this.elements.didSearchBox);
    } catch (error) {
      await this.click(this.elements.didSearchBox);
    }

    await this.type(this.elements.didSearchBox, searchId);
    await this.pressKey('Enter');
  }

  /**
   * Function to edit the DID
   * @returns {void} nothing
   */
  async editDID() {
    await this.waitForSelector(this.elements.editInboundId);
    await this.click(this.elements.editInboundId);
  }

  /**
   * Function to fill the DID
   * @param {string} application - application option
   * @param {string} destination - destination option
   * @returns {void} nothing
   */
  async fillOption(details) {
    await this.wait(5); //page responds too fast
    await this.dropdownOptionSelect(
      this.elements.inboundApplication,
      details.application
    );
    await this.wait(2); //page responds too fast
    await this.click(this.elements.inboundDestination);
    await this.click(this.elements.searchInboundQueue);
    await this.type(this.elements.searchInboundQueue, details.destination);
    await this.pressKey('Enter');
    if (details.agentdirect) {
      await this.click(this.elements.agentDirect);
      await this.waitForSelector(this.elements.selectDirectAgent);
      await this.click(this.elements.selectDirectAgent);
      await this.type(this.elements.searchDirectAgent, details.agent);
      await this.pressKey('Enter');
    }
    await this.waitForSelector(this.elements.saveInboundChanges);
    await this.click(this.elements.saveInboundChanges);
    await this.waitForSelector(this.elements.confirmButton);
    await this.click(this.elements.confirmButton);
  }

  /**
   * Function to fetch DID number
   * @returns {void} nothing
   */
  async fetchDIDNumber() {
    return await this.getText(this.elements.didNumber);
  }

  /**
   * Function to fetch target ID
   * @returns {void} nothing
   */
  async fetchTargetID() {
    return await this.getText(this.elements.targetID);
  }

  /**
   * function to search inbound queue
   * @param  {String} inboundQueue - inbound queue name
   * @returns {void} nothing
   */
  async searchQueue(inboundQueue) {
    await this.waitForSelector(this.elements.inboundSearchBox);
    await this.click(this.elements.inboundSearchBox);
    await this.type(this.elements.inboundSearchBox, inboundQueue);
    await this.pressKey('Enter');
  }

  /**
   * function to edit inbound queue
   * @param  {String} inboundQueue - inbound queue name
   * @returns {void} nothing
   */
  async editQueue(inboundQueue) {
    let editInboundQueue =
      '//td[text()="' +
      inboundQueue +
      '"]/following-sibling::td[last()]/button[last()-1]';
    await this.waitForSelector(editInboundQueue);
    await this.click(editInboundQueue);
    // waiting here so that edit queue load
    await this.wait(3);
  }

  /**
   * function to navigates tab in inbound queue edit
   * @param  {String} tab - tab name
   * @returns {void} nothing
   */
  async navigateToTab(tab) {
    currentTabNo = await this.getText(this.elements.activeTabNumber);
    let clickCount = allStep[tab] - currentTabNo;
    if (clickCount > 0) {
      for (let i = 0; i < Math.abs(clickCount); i++) {
        await this.click(this.elements.nexttabButton);
      }
    } else if (clickCount < 0) {
      for (let i = 0; i < Math.abs(clickCount); i++) {
        await this.click(this.elements.previousTabButton);
      }
    }
  }

  /**
   * function to save inbound queue edits
   * @returns {void} nothing
   **/
  async saveInboundQueue() {
    currentTabNo = await this.getText(this.elements.activeTabNumber);
    if (currentTabNo < 5) {
      for (let i = currentTabNo; i < 5; i++) {
        await this.click(this.elements.nexttabButton);
      }
    }
    await this.click(this.elements.nexttabButton);
    await this.waitForSelector(this.elements.submitButton);
    await this.click(this.elements.submitButton);

  }

  /** Select outbound campaign & inbound queue while logging to voice channel
   * @param  {String} outboundCampaign - outbound campaign
   * @param  {String} inboundQueue - inbound queue
   * @param  {String} type - window where operation has to be performed
   * @return {void} Nothing
   **/
  async selectCampaignAndQueue(outboundCampaign, inboundQueue, type = '') {
    if (outboundCampaign !== 'No') {
      await this.click(this.elements.outboundSelectClick, type);
      await this.type(this.elements.outboundSelect, outboundCampaign, type);
      await this.pressKey('Enter', type);
    }
    if (inboundQueue !== 'No') {
      const inboundQueueSelector = `//div[@id='login-modal-queues']//span[contains(text(),'${inboundQueue}')]`;
      await this.click(inboundQueueSelector, type);
    }
    await this.click(this.elements.voiceSubmit, type);
    //wait for agent to be ready
    await this.wait(5);
  }

  /**
   * Function to add New Actions
   * @param {object} - actionData
   * @param {string} - actionData.actions - action
   * @param {string} - actionData.target - target queue
   * @param {string} - actionData.time - number of seconds
   * @param {string} - actionData.digit - number of digits
   * @param {string} - actionData.repeat - repeat true or false
   * @param {string} - actionData.audioManger - action audio
   * @param {string} - actionData.options - option settings
   * @param {string} - actionData.callback - callback true or false
   * @returns {void} nothing
   */
  async addNewTimedAction(actionData) {
    await this.click(this.elements.addTimedAction);
    await this.dropdownOptionSelect(
      this.elements.actionsDropdown,
      actionData.actions
    );
    if (actionData.target) {
      if (actionData.actions === 'Press to IVR') {
        await this.dropdownOptionSelect(this.elements.ivrTargetSelect, actionData.target);
      }
      else if (actionData.actions === 'Press to Extension') {
        await this.click(this.elements.extensionBox);
        await this.type(this.elements.extensionBox, actionData.target);
        await this.pressKey('Enter');
      }
      else {
        await this.dropdownOptionSelect(
          this.elements.queueSelect,
          actionData.target
        );
      }
    }
    if (actionData.time) {
      await this.dropdownOptionSelect(
        this.elements.timeSelect,
        actionData.time
      );
    }
    if (actionData.digit) {
      await this.dropdownOptionSelect(
        this.elements.digitSelect,
        actionData.digit
      );
    }
    if (actionData.repeat) {
      await this.click(this.elements.repeatCheckBox);
    }
    if (actionData.audioManager) {
      await this.wait(3); //wait to load audio files
      await this.waitForSelector(this.elements.audioManagerButton);
      await this.click(this.elements.audioManagerButton);
      await this.waitForSelector(this.elements.searchBox);
      await this.type(this.elements.searchBox, actionData.audioManager);
      await this.pressKey('Enter');
      await this.wait(2); //wait to load audio files
      await this.waitForSelector(this.elements.searchResult);
      await this.click(this.elements.searchResult);
      await this.click(this.elements.audioMangerSave);
    }
    if (actionData.options) {
      await this.click(this.elements.optionsButton);
      await this.type(this.elements.noOfDigits, actionData.options);
      await this.click(this.elements.audioManagerOptions);
      await this.type(this.elements.searchBox, actionData.optionsManager);
      await this.pressKey('Enter');
      await this.click(this.elements.searchResult);
      await this.click(this.elements.audioMangerSave);
      if (actionData.callBack) {
        await this.click(this.elements.callbackToggle);
      }
      await this.click(this.elements.saveOptions);
    }

    await this.navigateToTab('sounds');
    await this.click(this.elements.finish);
    await this.click(this.elements.submitButton);
  }

  /**
   * Function to delete actions
   * @returns {void} nothing
   */
  async deleteNewTimedAction() {
    await this.click(this.elements.actionCheckBox);
    await this.click(this.elements.deleteTimedAction);
    await this.navigateToTab('sounds');
    await this.click(this.elements.finish);
    await this.click(this.elements.submitButton);
  }
  /**
   * Function to cancel call
   * @param {string} callstate - call state to cancel
   * @param {string} type - session number
   * @returns {void} nothing
   */
  async cancelState(callState, type = '') {
    if (callState === 'manual preview') {
      await this.click(this.elements.manualStateCancel, type);
    }
  }

  /**
   * Function to validate DTMF number
   * @param {string} number - dtmf
   * @param {string} type - session number
   * @returns {void} nothing
   */
  async validateInfoSection(number, type = '') {
    await this.waitForSelector(this.elements.dtmf, type);
    await this.shouldContainText(this.elements.dtmfNumber, number, type);
  }

  /**
   * Function to validate Inbound queue callback
   * @param {object} callbackData
   * @param {string} callbackData.startLoadDate - start date
   * @param {string} callbackData.endLoadDate - end date
   * @param {string} callbackData.number - callback call number
   * @param {string} callbackData.comment - callback call comment
   * @param {string} callbackData.agent - callback agent name
   * @returns {void} nothing
   */
  async validateInboundCallbackGroup(callbackData) {
    if (callbackData.state) {
      await this.click(`input[value='${callbackData.state}']`);
    }
    if (callbackData.startLoadDate) {
      await this.type(this.elements.startLoadDate, callbackData.startLoadDate);
      await this.pressKey('Enter');
    }
    if (callbackData.endLoadDate) {
      await this.type(this.elements.endLoadDate, callbackData.endLoadDate);
      await this.pressKey('Enter');
    }
    await this.click(this.elements.searchButton);
    await this.waitForSelector(this.elements.callbackSearchInput);
    if (callbackData.number) {
      await this.type(this.elements.callbackSearchInput, callbackData.number);
      await this.pressKey('Enter');
    }
    let callbackTableResult = '//table[@id="inbox-callback"]//tbody/tr[1]';
    await this.waitForSelector(
      `${callbackTableResult}/td[text()='${callbackData.campaign}']`
    );
    if (callbackData.comment) {
      await this.shouldContainText(`${callbackTableResult}/td[8]/span`, callbackData.comment);
    }
    if (callbackData.campaign) {
      await this.shouldContainText(`${callbackTableResult}/td[5]`, callbackData.campaign);
    }
    if (callbackData.agent) {
      await this.shouldContainText(`${callbackTableResult}/td[6]`, callbackData.agent);
    }
  }

  /**
   * Api method to initiate inbound call
   * @param {json} body - inbound call request body
   * @returns
   */
  async inboundGroupCallAPI(body) {
    const request = await api.goContactPOST('inbound/queue', body);
    return request;
  }

  /**
  * method to validate latest voicemail
  * @param {object} voicemailData - voicemail data object
  * @param {string} voicemailData.number - phone number
  * @param {string} voicemailData.queue - queue name
  * @returns
  */
  async validateLatestVoiceMail(voicemailData) {
    await this.waitForSelector(this.elements.sortByDate);
    await this.click(this.elements.sortByDate);
    await this.click(this.elements.sortByDate);
    await this.shouldContainText(this.elements.voicemailTableNumber, voicemailData.number);
    await this.shouldContainText(this.elements.voicemailTableQueue, voicemailData.queue);

  }

  /**
   * Function to select voicemail
   * @returns {void} nothing
   */
  async selectVoicemail() {
    await this.click(this.elements.voicemailTableNumber);
  }

  /**
   * Function to open voicemail tab
   * @returns {void} nothing
   */
  async openVoicemailTab() {
    await this.click(this.elements.voicemailTab);
  }

  /**
   * Function to make voicemail call
   * @returns {void} nothing
   */
  async makeVoicemailCall() {
    await this.waitForSelector(this.elements.voicemailCall);
    await this.click(this.elements.voicemailCall);
  }

  /**
   * Api method to initiate call hangup from client
   * @param {json} body : hangup call request body
   */
  async hangupCallAPI(body) {
    await api.goContactPOST('hangup', body);
  }

  /**
   * Api method to interact with agent
   * @param {json} body : dtmf call request body
   */
  async dtmfCallAPI(body) {
    const keys = body.dtmf.split('');

    for (let ch in keys) {
      body.dtmf = keys[ch];
      await api.goContactPOST('dtmf', body);
    }
  }

  /**
   * Set current day calling Hours
   * @param {string} endTime - call out of hours end time
   * @return {void} Nothing
   */
  async setQueueOutOfHours(input) {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const d = new Date();

    let day = weekday[d.getDay()];
    let hour = '00';
    let minute = '00';
    if (input === 'outofhour') {
      hour = (d.getHours() + 1).toString();
      minute = (d.getMinutes()).toString();
    }
    const curentdaytime = `//h1[text()="Queue Schedule"]/following-sibling::fieldset//td[text()="${day}"]/following-sibling::td[1]/a`;
    await this.forceClick(curentdaytime);
    await this.dropdownOptionSelect(
      this.elements.queueScheduledTimeDropDown,
      hour
    );
    await this.dropdownOptionSelect(
      this.elements.queueScheduledMinuteDropDown,
      minute
    );
    await this.click(this.elements.queueScheduledTimeDropDownConfirmBtn);
  }

  /**
   * Set default actions in Inbound groups
   * @param {object} sectionDetails 
   * @param {string} sectionDetails.defaultActionType - Action Type
   * @param {string} sectionDetails.actionName - Action to configure
   * @param {string} sectionDetails.addActions - Action to add boolean condition
   * @param {string} sectionDetails.audio - audio to set
   * @return {void} Nothing
   */
  async setDefaultActions(sectionDetails) {
    let actionType = '';
    if (sectionDetails.defaultActionType === 'After Hours') {
      actionType = 'after-hours-action';
    }
    else if (sectionDetails.defaultActionType === 'No Logged Agents') {
      actionType = 'no-agents-action';
    }
    else if (sectionDetails.defaultActionType === 'Max Queue Time') {
      actionType = 'max-queue-time-action';
    }
    await this.click(`//select[@id='${actionType}']`);
    await this.dropdownOptionSelect(
      `//select[@id='${actionType}']`,
      sectionDetails.actionName
    );
    if (sectionDetails.addActions === 'true') {
      await this.click(`//select[@id='${actionType}']/ancestor::div[contains(@class,'input-group')]//button`);
      await this.wait(2);
      await this.type(this.elements.searchBox, sectionDetails.audio);
      await this.wait(3); //flacky UI
      await this.forceClick(
        `//li[@data-name='${sectionDetails.audio}']//span[@class='item-filename']`
      );
      await this.click(this.elements.audioMangerSave);
    }
    let actionName = '';
    if (sectionDetails.defaultActionType === 'After Hours') {
      actionName = 'action-after-hours';
    }
    else if (sectionDetails.defaultActionType === 'No Logged Agents') {
      actionName = 'action-no-agents';
    }
    else if (sectionDetails.defaultActionType === 'Max Queue Time') {
      actionName = 'action-max-queue';
    }
    if (sectionDetails.target) {
      if (sectionDetails.actionName === 'Extension') {
        await this.forceClick(this.elements.defaultSectionExtension);
        await this.type(this.elements.defaultSectionExtension, sectionDetails.target);
      }
      else {
        const selector = `//span[@id='${actionName}']//select`;
        await this.waitForSelector(selector);
        await this.dropdownOptionSelect(selector, sectionDetails.target);
      }
    }
  }

  /**
   * function to set max queue time
   * @param  {String} min - number of minutes
   * @param  {String} sec - number of seconds 
   * @returns {void} nothing
   */
  async setMaxQueueTime(min, sec) {
    await this.clearField(this.elements.maxQueueMinutes);
    await this.type(this.elements.maxQueueMinutes, min);
    await this.clearField(this.elements.maxQueueSeconds);
    await this.type(this.elements.maxQueueSeconds, sec);
  }

  /**
   * function to show already logged in voice channel
   * @param  {String} type - session
   * @returns {void} nothing
   */
  async showVoiceChannel(type = '') {
    await this.waitForSelector(this.elements.voiceChannelLogin, type);
    await this.click(this.elements.voiceChannelLogin, type);
    await this.waitForSelector(this.elements.showVoiceChannel);
    await this.click(this.elements.showVoiceChannel);
  }

  /**
   * switch toggle schedule callback
   * @param {string} toggleState on/off
   * @return {void} Nothing
   */
  async setScheduleCallback(toggleState) {
    if (
      toggleState === 'on' &&
      !(await this.getToggleButtonStatus(this.elements.scheduleCallbackToggle))
    ) {
      await this.click(this.elements.scheduleCallbackToggleLink);
    } else if (
      toggleState === 'off' &&
      (await this.getToggleButtonStatus(this.elements.scheduleCallbackToggle))
    ) {
      await this.click(this.elements.scheduleCallbackToggleLink);
    }
  }

  /** function to confirm inbound queue option disabled
   *  @param  {string} inboundQueue - Inbound Queue Name
   *  @returns {void} nothing
   */
  async validateInboundQueueDisable(inboundQueue) {
    let dataId = {
      InboundQueue_1: 1,
      InboundQueue_2: 2,
      InboundQueue_3: 3,
      InboundQueue_4: 4,
      InboundQueue_5: 5,
    };
    let selector = `[data-id="${dataId[inboundQueue]}"]`;
    let check = await this.getAttributeElement(selector, 'disabled');
    await this.shouldHasText(check, 'disabled');
  }

  /**
   * function to reset edit of DID 
   *  @returns {void} nothing
   */
  async resetEdits() {
    await this.click(this.elements.agentDirect);
    //waiting for ui to render
    await this.wait(2);
    await this.waitForSelector(this.elements.saveInboundChanges);
    await this.click(this.elements.saveInboundChanges);
    await this.waitForSelector(this.elements.confirmButton);
    await this.click(this.elements.confirmButton);
  }

  /**
   * function to click on enter for login into voice channel
   *  @returns {void} nothing
   */
  async keyPress(key) {
    await this.pressKey(key);
  }

  /**
   * function to validate the waiting call into voice channel
   * @param {string} window- session
   * @returns {void} nothing
   */
  async validateWaitingCall(window = '') {
    await this.waitForSelector(this.elements.waitingCall, window);
    await this.shouldVisible(this.elements.waitingCall, window);
  }

  /**
   * function to validate the no waiting call into voice channel
   * @param {string} window- session
   * @returns {void} nothing
   */
  async validateNoWaitingCall(window = '') {
    await this.verifyelementIsHidden(this.elements.waitingCall, true, window);
  }

  /**
   * function to validate the waiting call Queue into voice channel
   * @param {string} queueName - name of queue
   * @param {string} window- session
   * @returns {void} nothing
   */
  async validateWaitingCallQueue(queueName, window = '') {
    await this.shouldVisible(`[title=${queueName}]`, window);
  }

  /**
   * function to click the voice channel
   * @param {string} window- session
   * @returns {void} nothing
   */
  async clickVoiceChannel(window = '') {
    await this.waitForSelector(this.elements.voiceChannelLogin, window);
    await this.click(this.elements.voiceChannelLogin, window);
  }

  /**
   * Function to add New Scheduled Exception
   * @param {object} - exceptionData
   * @param {string} - exceptionData.name - name of Exception
   * @param {string} - exceptionData.date - date of Exception
   * @param {string} - exceptionData.repeat - repeat true or false
   * @param {string} - exceptionData.allDay - all day exception
   * @param {string} - exceptionData.addQueue - queue to add
   * @returns {void} nothing
   */
  async addScheduledException(exceptionData) {
    await this.waitForSelector(this.elements.manageException);
    await this.click(this.elements.manageException);
    await this.waitForSelector(this.elements.exceptionCloseBtn);
    //Delete Exception fo rToday if Already Exist
    if (await this.isVisible(this.elements.deleteException)) {
      await this.click(this.elements.deleteException);
      await this.waitForSelector(this.elements.exceptionDeleteBtn);
      await this.click(this.elements.exceptionDeleteBtn);
    }
    if (exceptionData.name) {
      await this.type(this.elements.exceptionName, exceptionData.name);
    }
    if (exceptionData.date) {
      await this.type(this.elements.exceptionDate, exceptionData.date);
    }
    if (exceptionData.repeat === 'true') {
      await this.click(this.elements.repeatException);
    }
    if (exceptionData.allDay === 'true') {
      await this.click(this.elements.allDayCheckBox);
    }
    if (exceptionData.addQueue) {
      await this.click(this.elements.addToQueueToggle);
      await this.type(this.elements.selectQueueToAdd, exceptionData.addQueue);
      await this.keyPress('Enter');
    }
    await this.click(this.elements.createException);
  }

  /**
   * Function to verify New Actions is added in Exceptionlist
   * @param {object} - exceptionData
   * @param {string} - exceptionData.name - name of Exception
   * @param {string} - exceptionData.date - date of Exception
   * @returns {void} nothing
   */
  async verifyExceptionCreation(exceptionData) {
    await this.type(this.elements.tableExceptionSearch, exceptionData.date);
    await this.shouldContainText(this.elements.tableExceptionName, exceptionData.name);
  }

  /**
   * Function to activate new excption
   * @returns {void} nothing
   */
  async activateException() {
    await this.click(this.elements.exceptionSelectBox);
    await this.click(this.elements.exceptionAddBtn);
  }

  /**
   * Function to verify activaiton of new exception
   * @param {object} - exceptionData
   * @param {string} - exceptionData.name - name of Exception
   * @param {string} - exceptionData.date - date of Exception
   * @param {string} - state - state of exception 
   * @returns {void} nothing
   */
  async verifyExceptionActivation(exceptionData, state) {
    await this.type(this.elements.activeExceeptionSearch, exceptionData.date);
    await this.shouldContainText(this.elements.activeExceptionName, exceptionData.name);
    await this.shouldContainText(this.elements.activeExceeptionState, state);
  }
  /**
   * Function to delete previously added exception
   * @param {string} - exceptionDate - date of Exception
   * @returns {void} nothing
   */
  async deleteException(exceptionDate) {
    let visible = await this.isVisible(this.elements.emptyException);
    if (!visible) {
      await this.waitForSelector(this.elements.manageException);
      await this.click(this.elements.manageException);
      await this.type(this.elements.tableExceptionSearch, exceptionDate);
      await this.click(this.elements.exceptioRemove);
      await this.click(this.elements.exceptionDeleteBtn);
      await this.click(this.elements.exceptionCloseBtn);
    }
  }

  /**
   * function to add max or min wrap time in Inbound Queue edit
   * @param  {string} toggleType - toggle type
   * @param  {string} timeType - time type
   * @returns {void} nothing
   */
  async queueWrapUpToggle(toggleType, timeType) {
    let queueWrapUpToggleOn = `//div[@id="${timeType}-wrap-up-container"]/parent::section//i`;
    let queueWrapToggleOff = `//div[@id="${timeType}-wrap-up-container" and @class="hidden"]/parent::section//i`;
    await this.waitForSelector(
      '//span[@data-translate="' + timeType + 'wrapuptime"]'
    );
    let maxToggleState = await this.isVisible(queueWrapToggleOff);
    let minToggleState = await this.isVisible(queueWrapToggleOff);
    if (maxToggleState === false && timeType === 'max') {
      await this.click(queueWrapUpToggleOn);
    }
    if (minToggleState === false && timeType === 'min') {
      await this.click(queueWrapUpToggleOn);
    }
    //wait for tab to maximize
    await this.wait(3);
    let currentStateOfToggleOff = await this.isVisible(queueWrapToggleOff);
    if (currentStateOfToggleOff === true && toggleType === 'on') {
      await this.click(
        '//div[@id="' +
        timeType +
        '-wrap-up-container" and @class="hidden"]/parent::section//i'
      );
    }
  }

  /**
   * Function to make remote call to destination
   * @param {string} - number - date of Exception
   * @returns {void} nothing
   */
  async remoteCallDial(number) {
    await this.type(this.elements.voiceTransferDialTextbox, number);
    await this.pressKey('Enter');
    await this.click(this.elements.remoteCallBtn);
  }

  /**
   * Function to start 3 way conference bwtween origin and destinaiton call
   * @returns {void} nothing
   */
  async startConferenceCall() {
    await this.isVisible(this.elements.startConferenceBtn);
    await this.click(this.elements.startConferenceBtn);
  }

  /**
   * Function to verify conference call is successful
   * @returns {void} nothing
   */
  async verifyCallConference() {
    await this.isVisible(this.elements.stopConferenceBtn);
  }

  /**
   * Function to end conference call
   * @returns {void} nothing
   */
  async endConferenceCall() {
    await this.click(this.elements.stopConferenceBtn);
  }
  /**
   * Function to end destintion call
   * @returns {void} nothing
   */
  async endDestinationCall() {
    await this.click(this.elements.remoteCallHangupBtn);
  }
  /**
   * Function to navigate back to origin call
   * @returns {void} nothing
   */
  async navigateBackFromtransfer() {
    await this.click(this.elements.cancelTransferBtn);
  }

  /**
   * function to set delivery queue callback time
   * @param  {String} seconds - number of seconds
   * @returns {void} nothing
   */
  async setAvailableAgentCallbackTime(seconds) {
    await this.waitForSelector(this.elements.agentForGlobalCallback);
    await this.click(this.elements.agentForGlobalCallback);
    await this.pressKey('Backspace');
    await this.type(this.elements.agentForGlobalCallback, seconds);
  }

  /**
   * function to delete campaign
   * @param  {String} campaignName - campaign to be deleted
   * @returns {void} nothing
   */
  async deletCampaign(campaignName) {
    await this.searchCampaign(campaignName);
    await this.click(this.elements.deleteCampaign);
    await this.click(this.elements.campaignConfirm);
  }


  /**
   * funtion to validate outcome of contact
   * @param {string} outcome Outcome to verify
   * @return {void} Nothing
   */
  async validateContactOutcome(outcome) {
    const actualOutcome = await this.getText(this.elements.contactOutcome);
    assert.equal(actualOutcome, outcome);
  }

  /**
   * funtion to fetch phone number as a text
   * @return {String} displayNumber - Phone number string
   */
  async getPhoneNumber() {
    await this.waitForSelector(this.elements.phoneNumberButton);
    await this.shouldVisible(this.elements.phoneNumberButton);
    const displayNumber = await this.getText(this.elements.phoneNumberButton);
    return displayNumber;
  }

  /**
   * funtion to add outcome in campaign
   * @param {Object} outcomeDetails outcome details to add
   * @param {String} outcomeDetails.outcomeName outcome name
   * @param {String} outcomeDetails.outcomeAttribute outcome attribute
   * @return {void} Nothing
   */
  async addCampignOutcome(outcomeDetails) {
    let callOutcome = outcomeDetails.outcomeName.split(',');
    let callOutcomeAttribute = outcomeDetails.outcomeAttribute.split(',');
    for (let i = 0; i < callOutcome.length; i++) {
      if (!await this.checkOutcome(callOutcome[i])) {
        await this.createOutcome(callOutcome[i], callOutcomeAttribute[i]);
      }
    }
  }

  /**
   * Function to connect to campaign from cloud 
   * @param {Object} campaignDetails - campaign object
   * @param {String} campaignDetails.index - campaign index
   * @param {String} type - window session
   * @returns {void} nothing
   */
  async connectCloudCampaign(campaignDetails, type = '') {
    await this.click(this.elements.outboundCloud);
    let campaignName = '';
    if (campaignDetails.index) {
      campaignName = global.campaignName[campaignDetails.index];
    }
    await this.click(this.elements.outboundCloudCampaignClick, type);
    await this.type(this.elements.outboundSelect, campaignName, type);
    await this.pressKey('Enter', type);
    await this.click(this.elements.outboundCloudSubmit, type);
  }
  /**
   * funtion to validate the queue access
   * @param {string} outcome Outcome to verify
   * @return {void} Nothing
   */
  async validateQueueAccess(queueName, window = '') {
    const locator = `//span[text()='${queueName}']`;
    await this.shouldVisible(locator, window);
    await this.click(this.elements.closeVoiceCampaignModal, window);
  }

  /**
   * funtion to validate the no queue access
   * @param {string} outcome Outcome to verify
   * @return {void} Nothing
   */
  async validateNoQueueAccess(queueName, window = '') {
    const locator = `//span[text()='${queueName}']`;
    await this.verifyelementIsHidden(locator, true, window);
    await this.click(this.elements.closeVoiceCampaignModal, window);
  }

  /**
   * function to call api to delete redis call
   * @param {json} body - delete call request body
   * @returns {void} nothing 
   */
  async deleteRedisCall(body) {
    let headers = '';
    headers = {
      'qa-api-key': global.QA_API_KEY,
    };
    // waiting for active call popup to appear
    await this.wait(5);
    let check = await this.isVisible(this.elements.activeCallModal);
    if (check) {
      let value = await this.getAttributeElement(this.elements.activeCallModal, 'style');
      if (value === 'display: block;') {
        await api.goContactDelete('/poll/qa/redis/call', body, headers);
      }
    }
  }

  /**
   * function to reset actions added to inbound queue
   * @returns {void} nothing 
   */
  async resetTimedActions() {
    let actions = await this.countElement(this.elements.actionCheckBox);
    if (actions > 0) {
      for (let i = 0; i < actions; i++) {
        await this.click(this.elements.actionCheckBox);
        await this.click(this.elements.deleteTimedAction);
      }
    }
    let sectionDetails = {};
    sectionDetails.defaultActionType = 'After Hours';
    sectionDetails.actionName = 'Hangup';
    await this.setDefaultActions(sectionDetails);
    sectionDetails.defaultActionType = 'No Logged Agents';
    await this.setDefaultActions(sectionDetails);
    sectionDetails.defaultActionType = 'Max Queue Time';
    await this.setDefaultActions(sectionDetails);
  }

  /**
   * Function to validate the phone
   * @param {string} value - phone no
   * @returns {void} nothing
   */
  async validatePhone(value) {
    let phoneNumber = await this.getText(this.elements.phoneId);
    phoneNumber = phoneNumber.replace(/'/g, '').trim();
    await this.shouldHasText(phoneNumber, value);
  }

  /**
   * Function to validate the city
   * @param {string} value - city name
   * @returns {void} nothing
   */
  async validateCity(value) {
    const expectedCity = await this.getAttributeValue(this.elements.cityName, 'value');
    await this.shouldHasText(expectedCity, value);
  }

  /**
   * Function to validate the postal code
   * @param {string} value - postal
   * @returns {void} nothing
   */
  async validatePostalCode(value) {
    const expectedPostal = await this.getAttributeValue(this.elements.postalCode);
    await this.shouldHasText(expectedPostal, value);
  }

  /**
   * Function to validate the email
   * @param {string} value - email
   * @returns {void} nothing
   */
  async validateEmail(value) {
    const expectedEmail = await this.getAttributeValue(this.elements.email);
    await this.shouldHasText(expectedEmail, value);
  }

  /**
   * Function to validate the contact name
   * @param {string} value - name
   * @returns {void} nothing
   */
  async validateName(value) {
    await this.waitForSelector(this.elements.contactName);
    const expectedName = await this.getAttributeValue(this.elements.contactName);
    await this.shouldHasText(expectedName, value);
  }

  /**
   * Function to validate the extra field
   * @param {string} value - field value
   * @returns {void} nothing
   */
  async validateExtraField(value) {
    await this.waitForSelector(this.elements.extraFieldName);
    const expectedName = await this.getAttributeValue(this.elements.extraFieldName);
    await this.shouldHasText(expectedName, value);
  }

  /**
   * function to add details to callback element in script
   * @param {string} comment - callback comment
   * @returns {string} - callBack time 
   */
  async enterCallbackDetails(comment) {
    await this.waitForSelector(this.elements.scriptCallbackDate);
    await this.click(this.elements.scriptCallbackDate);
    await this.waitForSelector(this.elements.callbackSameDate);
    await this.click(this.elements.callbackSameDate);
    await this.waitForSelector(this.elements.callbackScriptNextTime);
    let callBackTime = this.getText(this.elements.callbackScriptNextTime);
    await this.clickLastElement(this.elements.callbackScriptNextTime);
    await this.waitForSelector(this.elements.callbackComment);
    await this.type(this.elements.callbackComment, comment);
    return callBackTime;
  }

  /**
   * function to open history tab
   * @returns {void} nothing 
   */
  async openHistoryTab() {
    await this.waitForSelector(this.elements.historyTab);
    await this.click(this.elements.historyTab);
  }

  /**
   * function to validate call history
   * @param {string} comment - callback comment
   * @param {string} scriptName
   * @returns {void} nothing 
   */
  async validateCallHistory(scriptName, comment) {
    let wholeComment = `From the callback script element "Callback schedule" in the script "${scriptName}": ${comment}`;
    await this.shouldContainText(this.elements.comment, wholeComment);
  }
  /**
   * function to set the global Maximum tries limit
   * @param {string} triesLimit - tries limit
   * @returns {void} nothing 
   */
  async setGlobalMaxTries(triesLimit) {
    await this.click(this.elements.globalMaxTries);
    await this.clearField(this.elements.globalMaxTries);
    await this.type(this.elements.globalMaxTries, triesLimit);
  }

  /**
   * function to activate outbound campaign lead search option
   * @param {string} subOption - child option
   * @param {string} mainOption - parent option
   * @returns {void} nothing 
   */
  async activateLeadSearchOption(subOption, mainOption){
    let leadSearchOption = `//span[contains(.,'${mainOption}')]/parent::label/following-sibling::div[@id='lead-search-settings-container']//span[contains(.,'${subOption}')]`;
    if(await this.isVisible(leadSearchOption)){
      await this.checkToCheckbox(leadSearchOption);
    }
  }

  /**
   * function to click on search tabs after login voice channel
   * @param {string} type - Window session
   * @returns {void} nothing 
   */
  async clickSearchTab(type = ''){
    await this.wait(4);//wait to load panel
    await this.waitForSelector(this.elements.searchLocator, type);
    await this.click(this.elements.searchLocator, type);
    await this.waitForSelector(this.elements.contactTable, type);
  }

  /**
   * function to click on outbound campaign tabs after login voice channel
   * @param {string} tabName - Tab Name
   * @param {string} type - Window session
   * @returns {void} nothing 
   */
  async searchClosedContact(contact, type){
    await this.waitForSelector(this.elements.searchContact, type);
    await this.type(this.elements.searchContact, contact, type);
    await this.pressKey('Enter', type);
    await this.wait(2);//wait to load result
    await this.waitForSelector(this.elements.emptyTable, type);
  }

  /**
   * function to validate customer record
   * @param {string} name - Name of customer
   * @param {string} dbName - Name of database
   * @param {string} type - Window session
   * @returns {void} nothing 
   */
  async validateCustomerRecord(name, dbName, type){
    await this.waitForSelector(this.elements.contactName, type);
    const expectedName = await this.getAttributeValue(this.elements.contactName, type);
    await this.shouldHasText(expectedName, name);
    let dbLocator = `//td[@id='voice-header-info-outbound-database'][contains(.,'${dbName}')]`;
    await this.shouldVisible(dbLocator, type);
  }

  /**
   * function to click on outbound campaign search tabs/buttons after login voice channel
   * @param {string} buttonName - button Name
   * @param {string} type - Window session
   * @returns {void} nothing 
   */
  async clickContactButtons(buttonName, type){
    let tabLocator = `//div[@id='tab-voice-search']//span[contains(.,'${buttonName}')]`;
    await this.waitForSelector(tabLocator, type);
    await this.click(tabLocator, type);
    await this.waitForSelector(this.elements.contactTable, type);
  }

  /**
   * function to check contact not available in similar contacts tab
   * @param {string} contact - contact number
   * @param {string} type - Window session
   * @returns {void} nothing 
   */
  async searchClosedContactInSimilarContact(contact, type){
    await this.waitForSelector(this.elements.contactTable, type);
    let closedContact = `(//table[@id='voice-contact-search-datatable']/tbody/tr/td[contains(.,'${contact}')])[last()]`;
    await this.verifyVisibility(closedContact, false);
  }

  /** function to validate masked number
   * @param {string} callType - call type
   * @returns {void} nothing 
   */
  async validateMaskedNumber(callType){
    // waiting for call number to appear
    await this.wait(2);
    if(callType === 'inbound'){
      await this.waitForSelector(this.elements.inboundCallNumberText);
      await this.shouldContainText(this.elements.inboundCallNumberText, '***');
    }else if (callType === 'outbound'){
      await this.waitForSelector(this.elements.outboundCallNumberText);
      await this.shouldContainText(this.elements.outboundCallNumberText, '***');
    }
  }
};
