/*global page*/
const { assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');
const dayjs = require('dayjs');


exports.ScriptBuilder = class ScriptBuilder extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    scriptBuilderHeader: '[id="titleHead"]> span:nth-child(3)',
    scriptBuilder: 'a[id="menu_3"]',
    newScript: '#show_new_script_form_modal_btn',
    newScriptModal: '#script_form_new',
    classDropDown: 'css=div[class="select2-result-label"]',
    newScriptModalElements: {
      scriptName: 'input[id="new-script-name-input"]',
      campaign: 'div[id="s2id_new_script_campanha_selector"] ul li input',
      inboundQueues:
        'div[id="s2id_new_script_linha_inbound_selector"] ul li input',
      ticketQueues: 'div[id="s2id_new_script_ticket_queue"] ul li input',
      databases: 'div[id="s2id_new_script_databases"] ul li input',
      warningCloseButton: '[id="closeAlert"]',
      defaultPageName: '[id="new-script-page-name-input"]',
      createButton: '[id="create_new_script_btn"]',
      agent: 'div[id="s2id_new_script_agents_selector"] ul li input',
    },
    Popup: '(//div[@id="newContentdiv"])[last()]//p',
    generalRulesModal: '[id="scriptmanager-general-rules-btn"]>a>span',
    generalRulesModalElements: {
      generalRulesType: '//select[@id="generalrules_rule"]',
      generalRulesEvent: '//select[@id="generalrules_event"]',
      addGeneralRules: '[id="add_new_script_generalrules"]>span',
      ruleName: '[id="generalrules-rulename"]',
      emailTo: 'input[id="generalrules-from"]',
      ticketStatus: '//select[@id="generalrules-ticketstatus"]',
      ticketQueues: '[id="s2id_generalrules-queue-select"]',
      mailbox: '[id="s2id_generalrules-mailbox-select"]',
      sendTicketID: '[id="send-ticket-id"]',
      subject: '[id="generalrules-subject-input"]',
      template: '[id="s2id_generalrules-templates-select"]',
      autoReply: '#form-generalrules-tautoreply > div > div > label > span',
      autoReplyMailbox: '[id="s2id_generalrules-tautoreplymailbox-select"]',
      autoReplyTemplate: '[id="s2id_generalrules-tautoreplytemplates-select"]',
      methodOptionOnAction: '//select[@id="send2external-onaction-method"]',
      Url: '[id="send2external-onaction-url"]',
      authentication: '//select[@id="send2external-onaction-authentication"]',
      linktoExternalService: '[id="generalrules-send2external"]',
      requestBodyField: '//strong[text()="Field"]/..//input',
      requestBodyValue: '//strong[text()="Value"]/..//input',
      saveRule: '[id="save_script_generalrules"]',
      methodOptionOnSave: '//select[@id="generalrules-externalmethod"]',
      bodyType: '//select[@id="generalrules-bodytype"]',
      authUserName: '[id="send2external-onaction-username"]',
      authPassword: '[id="send2external-onaction-password"]',
      addResponseElement:
        '[id="form-generalrules-send2external-onaction-responseBody-add"]',
      responseScriptElement:
        'div.response-fields:nth-child(2) > label > div:nth-child(1) > input',
      responeProperty:
        ' div.response-fields:nth-child(2) > label > div:nth-child(2) > input',
      ivrMenu: '[id="s2id_generalrules-ivr-select"]',
      owner: '[id="s2id_generalrules-owner-select"]',
      outcomeName: '[id="s2id_generalrules-outcome-select"]',
    },
    savedRuleName: '[id="generalrules_table_allrules_list"]>tr>td:nth-child(1)',
    elementsButton: '[id="elements-tab-form-btn"]',
    oneResponse:
      '[class="item form-group radio_class sortable ui-draggable"]>label',
    textInput:
      '[class="item form-group texto_class sortable ui-draggable"]>label',
    dropBoxArea: 'div#controls~div',
    elementsInDropBox: 'div.element',
    selectedOneResponse:
      'div[class="item form-group radio_class sortable ui-draggable element"]',
    selectedTextInput:
      'div[class="item form-group texto_class sortable ui-draggable element"]',
    rules: 'a[data-translate="rules"]',
    searchInScript: 'a[data-translate="scriptManager.searchInScript.title"]',
    rulesEvent: '//select[@id="rule_trigger_select"]',
    rulesEventValue: '//label[text()="Values"]/following-sibling::input',
    ruleType: '//select[@id="regra_select"]',
    rule: '[id="s2id_global_rule_target_select"]',
    target: '[id="s2id_rule_target_select"]',
    goto: '//select[@id="go_to_select"]',
    addRule: '[id="add_rule_button"]',
    scriptTabButton: '#ticket-info > li:nth-child(5) > a',
    selectScript: '//select[@id="ticket-info-scripts-selector"]',
    selectYes:
      '//div[@class="voice-page" and not(contains(@style,"display: none"))] //span[text()="Yes"]',
    selectNo:
      '//div[@class="voice-page" and not(contains(@style,"display: none"))] //span[text()="No"]',
    selectKinda:
      '//div[@class="voice-page" and not(contains(@style,"display: none"))] //span[text()="Kinda"]',
    validateScriptButton:
      '//div[@class="voice-page" and not(contains(@style,"display: none"))] //button[@id="validate"]',
    newScriptConfirmYes: '[class="popover-content"]>p>button:nth-child(2)',
    newScriptTicketChannel: '[id="save-reset"]',
    isRequired:
      '#item_edit_comum > div:nth-child(3) > div > div.checkbox > label > span:nth-child(2)',
    saveEdits: '[id="save_edit"]',
    textInputTitle: '[id="texto_edit"]',
    hidden:
      '#item_edit_comum > div:nth-child(5) > div > div.checkbox > label > span:nth-child(2)',
    addNewPageIcon: '[id="show_new_page_form_modal_btn"]',
    typePageName: '[id="new-page-name-input"]',
    createPageButton: '[id="create_new_page_btn"]',
    pageDropdown: '//select[@id="page_selector"]',
    contactFields: '[id="s2id_update_contact_target_select"]',
    activeSearchScript: '[for="search-script-mode-active-yes"]>span',
    inactiveSearchScript: '[for="search-script-mode-active-no"]>span',
    manualSearchMode:
      '#tabs-5-form-ctn > span > div:nth-child(1) > div > label:nth-child(1) > label > span',
    automaticSearchMode:
      '#tabs-5-form-ctn > span > div:nth-child(1) > div > label:nth-child(2) > label > span',
    tableColumnInScript:
      '[id="s2id_search-script-mode-columns-show"]>ul>li>input',
    filterTag: '//select[@id="search-script-mode-filter-tag"]',
    filterColumn: '//select[@id="search-script-mode-filter-column"]',
    addFilter: '[id="search-script-mode-filter-add"]',
    saveSearchInScript: '[id="save-script-search-btn"]',
    searchedRecord: '#DataTables_Table_0 > tbody>tr>td>button',
    searchInDb: '[id="ui-id-4"]',
    activeSearchDb: '[id="search-mode-active-yes"]~span',
    inactiveSearchDb: '[id="search-mode-active-no"]~span',
    searchModeAutoComplete: '[id="search-mode-type-ac"]~span',
    searchModeDbSearch: '[id="search-mode-type-btn"]~span',
    filterOptionAnd: '[id="search-option-and"]~span',
    groupResults: '[id="group-by-results"]~i',
    dbFilterTag: '//select[@id="search-mode-filter-tag"]',
    dbFilterColumn: '//select[@id="search-mode-filter-column"]',
    dbFilterAdd: '[id="search-mode-filter-add"]',
    tableNameInDb: '//select[@id="search-mode-select-table"]',
    dbUpdateTag: '//select[@id="search-mode-receive-tag"]',
    dbUpdateColumn: '//select[@id="search-mode-receive-column"]',
    dbAddUpdate: '[id="search-mode-receive-add"]',
    saveSearchInDb: '[id="save-search-btn"]',
    contactInfo: '#ticket-info > li:nth-child(4) > a',
    countryInput:
      '#contact-default-fields > div > div:nth-child(1)> div:nth-child(6) > input',
    querySelectButton: '#modal-tree-selector>div>div>div:nth-child(3)>button',
    apiQueryDiv: '#modal-tree-selector>div>div',
    scriptBuilderPageLoadOption: '[id="script-din-left-ctn"]',
    searchModeManualButton:
      '//div[@class="voice-page" and not(contains(@style,"display"))] //i[@class="fa fa-search"] ',
    scriptTabButtonVoiceChannel: '[id="voice-tab-voice-script"]',
    selectScriptVoiceChannel: '//select[@id="voice-script-select"]',
    startRecording: '.label_start_recording',
    stopRecording: '.label_stop_recording',
    startRecordingLeftPanel: '#script-din-left-ctn .start_recording_class',
    startRecordingTitle: '#start_recording_edit',
    startRecordingFilename: '#start_recording_filename_edit',
    successMessage: '.bigBox.animated.fadeIn.fast',
    startRecordingButton:
      '//div[@data-type="start_recording" and not(contains(@style,"display"))]//a[contains(@class,"start_recording_button")]/i',
    startRecordingLabel:
      '//div[@data-type="start_recording" and not(contains(@style,"display"))]//div[contains(@class,"start_recording_button")]',
    stopRecordingButton: '.stop_recording_button',
    stopRecordingYes: '.btn-stop-answer-yes',
    recordingBadge:
      '//div[@data-type="start_recording" and not(contains(@style,"display"))]//span[contains(@class,"badge")]',
    recordingListModal: '.popover.fade.in',
    notifyAgent: '[id="notify_agent"]',
    startRecordingHidden: 'label[for="item_hidden"] span',
    automaticRecording: '#automatically-radio-button',
    oneResponseTitle: '#radio_edit',
    oneResponseTextarea: '#radio_textarea',
    notificationMessage: '#divbigBoxes #newContentdiv p',
    elementReplacedText:
      '//div[@data-type="start_recording" and not(contains(@style,"display"))]//label[@id="label_auto_recording_on_going"]',
    itemTab: 'a[data-translate="item"]',
    oneResponseSelect: '//span[normalize-space()="One response"]',
    checksSelected: '//span[normalize-space()="Checks"]',
    checks:
      '//div[@class="item form-group checkbox_class sortable ui-draggable"]',
    checksTitle: '//input[@id="checkbox_edit"]',
    checksTextarea: '//textarea[@id="checkbox_textarea"]',
    scriptValuesRequired:
      '//div[@class="form-group required_class"]//input[@id="item_required"]',
    scriptValuesRequiredAlways:
      '//div[@class="form-group required_class always_required_class"]//input[@id="item_required_always"]',
    minimalAnswerInput: '#item_req_minimal-answers-input',
    callback:
      '[class="item form-group callback_class sortable ui-draggable"]>label',
    callbackSelect:
      ' #script-din-left-ctn [data-translate="callback.schedule.label"]',
    campaignDropDown: '#s2id_select_callback_campaign_queue_to_another_agent',
    campaignSearch:
      '[class="select2-drop select2-display-none select2-with-searchbox select2-drop-active"] input',
    databaseDropDown: '#s2id_select_callback_database_to_another_agent',
    agentDropDown: '#s2id_select_callback_agent',
    maxDays: '#callback_agent_chooses_date_range_days',
    minHour: '#timepick-start-callback',
    maxHour: '#timepick-end-callback',
    weekDayButtons: '.callback-script-btn',
    calendar: '[class="item form-group scheduler_class sortable ui-draggable"]>label',
    calendarSelect: '//div[@id="script-din-left-ctn"]//span[normalize-space()="Calendars"]',
    calendarTitle: '[id="scheduler_edit"]',
    calendarName: '[id="s2id_scheduler_edit_select"] input',
    requiredBooking: '//select[@id="scheduler_edit_obrigatorio"]',
    calendarElement: '//div[@id="ticket-info-scripts-ctn"]/div[contains(@id,"multi_script") and not (@style ="display: none;")]//div[contains(@class,"current-script-page-div")]//button',
    selectDay: '[class="fc-resourceTimeGridDay-button fc-button fc-button-primary"]',
    clickNext: '[aria-label="next"]',
    eventDescription: '[data-translate="bookingsClient.addModal.description"]~textarea',
    saveEvent: '[data-translate="bookingsClient.addModal.btnSave"]',
    eventPreparationTime: '[class="fc-event-container"]>a',
    backButton: '[id="booking-header-back"]',
    selectWeek: '.fc-resourceTimeGridWeek-button',
    selectToday: '.fc-today-button',
    validation: 'label[data-translate="valid"]',
    scriptText: '#div_javascript_validation textarea',
    validationError: '.formErrorContent',
    startDate: '#new-script-start-date-input',
    endDate: '#new-script-end-date-input',
    textinput: '//div[@id="voice-script-container"]/div[contains(@id,"multi_script") and not (@style ="display: none;")]//div[contains(@class,"current-script-page-div")]//input',
    calendarElementOnVoice: '(//div[@data-type="scheduler"]//button)[last()]',
    selectScriptDropDown: '#voice-script-select',
    selectCalenderEle: '(//form//button[contains(@class,"calendar-btn-link")])[last()]',
    logout: '#main-logout',
    blockEvent: 'span[data-translate="bookingsClient.editModal.blockEvent"]',
    saveEditEvent: '#reservation-save',
    activeEvent: '#bookings-workspace .preparation-times',
    slotErrorPopUp: '//div[@id="newContentdiv"]/p[contains(text(),"Without available events for booking in the chosen schedule.")]',
    clickPrevious: '[aria-label="prev"]',
    addReservationModal: '//div[@id="reservation-add-modal"]//div[@class="modal-content"]',
    errorPopUp: '//div[@id="newContentdiv"]//p[contains(text(),"Correct the marked fields")]'
  };

  /**
   * function to click scriptbuilder from menu
   * @return {void} Nothing
   */
  async clickScriptBuilder() {
    await this.waitForSelector(this.elements.scriptBuilder);
    await this.mouseOver(this.elements.scriptBuilder);
    await this.click(this.elements.scriptBuilder);
  }

  /**
   * function to verify scriptbuilder page
   * @return {void} Nothing
   */
  async verifyScriptBuilderPage() {
    await this.isVisible(this.elements.scriptBuilderHeader);
  }

  /**
   * function to click new script button
   * @return {void} Nothing
   */
  async clickNewScriptButton() {
    await this.waitForSelector(this.elements.newScript);
    // waiting here so that all script loads completely
    await this.wait(5);
    await this.scrollup();
    await this.click(this.elements.newScript);
    await this.wait(3); //added wait to load popup modal
    if (!(await this.isVisible(this.elements.newScriptModal))) {
      await this.click(this.elements.newScript);
    }
  }

  /**
   * function to verify new script modal
   * @return {void} Nothing
   */
  async verifyNewScriptModal() {
    await this.isVisible(this.elements.newScriptModal);
  }

  /**
   * function to fill details for news cript in modal
   * @param {string} scriptName - unique script name
   * @param {object} newScriptForm - new script details
   * @param {string} newScriptForm.campaignName - campagin name
   * @param {string} newScriptForm.inboundQueueName - inbound queue
   * @param {string} newScriptForm.ticketQueueName - ticket queue
   * @param {string} newScriptForm.databaseName - database name
   * @param {string} newScriptForm.defaultPageName - default page name
   * @return {void} Nothing
   */
  async fillNewScriptDetails(scriptName, newScriptForm) {
    await this.waitForSelector(this.elements.newScriptModalElements.scriptName);
    await this.click(this.elements.newScriptModalElements.scriptName);
    await this.type(
      this.elements.newScriptModalElements.scriptName,
      scriptName
    );
    if (newScriptForm.campaignName) {
      await this.type(
        this.elements.newScriptModalElements.campaign,
        newScriptForm.campaignName
      );
      await this.pressKey('Enter');
    }
    if (newScriptForm.inboundQueueName) {
      await this.type(
        this.elements.newScriptModalElements.inboundQueues,
        newScriptForm.inboundQueueName
      );
      await this.pressKey('Enter');
    }
    if (newScriptForm.ticketQueueName) {
      await this.waitForSelector(
        this.elements.newScriptModalElements.ticketQueues
      );
      await this.type(
        this.elements.newScriptModalElements.ticketQueues,
        newScriptForm.ticketQueueName
      );
      await this.pressKey('Enter');
    }
    if (newScriptForm.databaseName) {
      await this.type(
        this.elements.newScriptModalElements.databases,
        newScriptForm.databaseName
      );
      await this.pressKey('Enter');
    }
    if (newScriptForm.agentName) {
      await this.type(
        this.elements.newScriptModalElements.agent,
        newScriptForm.agentName
      );
      await this.pressKey('Enter');
    }
    if (newScriptForm.startDate === 'Today') {
      newScriptForm.startDate = dayjs().format('YYYY-MM-DD');
      await this.type(this.elements.startDate, newScriptForm.startDate);
      await this.pressKey('Enter');
    }
    if (newScriptForm.endDate === 'Tomorrow') {
      newScriptForm.endDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
      await this.type(this.elements.endDate, newScriptForm.endDate);
      await this.pressKey('Enter');
    }
    if (
      !(await this.getAttributeElement(
        this.elements.newScriptModalElements.warningCloseButton,
        'aria-hidden'
      ))
    )
      await this.click(this.elements.newScriptModalElements.warningCloseButton);
    await this.type(
      this.elements.newScriptModalElements.defaultPageName,
      newScriptForm.defaultPageName
    );
    await this.click(this.elements.newScriptModalElements.createButton);
  }

  /**
   * function to verify success popup for script creation
   * @param {string} scriptName - unique script name
   * @return {void} Nothing
   */
  async verifySuccessPopup(scriptName) {
    await this.shouldContainText(
      this.elements.Popup,
      `The script '${scriptName}' was successfully created.`
    );
  }

  /**
   * function to click general rules tab
   * @return {void} Nothing
   */
  async clickGeneralRuleTab() {
    // need this wait bcoz it switch back to element
    await this.wait(2);
    await this.click(this.elements.generalRulesModal);
  }

  /**
   * function to verify general rules tab
   * @return {void} Nothing
   */
  async verifyGeneralRuleTab() {
    await this.isVisible(this.elements.generalRulesModal);
  }

  /**
   * function to select rule
   * @param {string} ruleType - select rule type
   * @param {string} ruleEvent = type of rule event
   * @return {void} Nothing
   */
  async selectRule(ruleType, ruleEvent) {
    await this.dropdownOptionSelect(
      this.elements.generalRulesModalElements.generalRulesType,
      ruleType
    );
    await this.dropdownOptionSelect(
      this.elements.generalRulesModalElements.generalRulesEvent,
      ruleEvent
    );
    await this.click(this.elements.generalRulesModalElements.addGeneralRules);
  }

  /**
   * function toverify rulename feild
   * @return {void} Nothing
   */
  async verifyRuleNameField() {
    await this.isVisible(this.elements.generalRulesModalElements.ruleName);
  }

  /**
   * Function to add rule and save it
   * @param {object} formFields - object with all details
   * @param {string} formFields.ruleName - rule name
   * @param {string} formFields.to - send email to
   * @param {string} formFields.from - send email from
   * @param {string} formFields.ticketStatus - ticket status
   * @param {string} formFields.queue - queue
   * @param {string} formFields.mailbox - mailbox
   * @param {string} [formFields.sendTicketID=false] - send ticket id set to false
   * @param {string} formFields.subject - subject
   * @param {string} formFields.template - template name
   * @param {string} [formFields.autoReply=Yes] - autoreply checkbox
   * @param {string} formFields.externalService - select external service
   * @param {string} formFields.bodyType - request body type
   * @param {string} formFields.URL - url for request
   * @param {string} formFields.field - field values
   * @param {string} formFields.value - value for fields
   * @param {string} formFields.onActionURL - url for onaction
   * @param {string} formFields.method - method type
   * @param {string} formFields.authentication - authentication type
   * @param {string} formFields.username - authentication username
   * @param {string} formFields.password - authentication password
   * @param {string} formFields.scriptElement1 - script element one
   * @param {string} formFields.property1 - script element property one
   * @param {string} formFields.scriptElement2 - script element two
   * @param {string} formFields.property2 - script element property two
   * @param {string} formFields.ivrMenu - script element ivr menu
   * @return {void} Nothing
   */
  async saveRule(formFields = {}) {
    if (formFields.ruleName) {
      await this.type(
        this.elements.generalRulesModalElements.ruleName,
        formFields.ruleName
      );
    }
    if (formFields.to || formFields.from) {
      await this.type(
        this.elements.generalRulesModalElements.emailTo,
        formFields.to || formFields.from
      );
    }
    if (formFields.ticketStatus) {
      await this.dropdownOptionSelect(
        this.elements.generalRulesModalElements.ticketStatus,
        formFields.ticketStatus
      );
    }
    if (formFields.queue) {
      await this.waitForSelector(
        this.elements.generalRulesModalElements.ticketQueues
      );
      await this.click(this.elements.generalRulesModalElements.ticketQueues);
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.queue}'`
      );
    }
    if (formFields.mailbox) {
      await this.click(this.elements.generalRulesModalElements.mailbox);
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.mailbox}'`
      );
    }
    if (formFields.sendTicketID === 'false') {
      await this.click(this.elements.generalRulesModalElements.sendTicketID);
    }
    if (formFields.subject) {
      await this.type(
        this.elements.generalRulesModalElements.subject,
        formFields.subject
      );
    }
    if (formFields.template) {
      await this.click(this.elements.generalRulesModalElements.template);
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.template}'`
      );
    }
    if (formFields.autoReply === 'Yes') {
      await this.waitForSelector(
        this.elements.generalRulesModalElements.autoReply
      );
      await this.click(this.elements.generalRulesModalElements.autoReply, true);
      await this.click(
        this.elements.generalRulesModalElements.autoReplyMailbox
      );
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.autoReplyMailbox}'`
      );
      await this.click(
        this.elements.generalRulesModalElements.autoReplyTemplate
      );
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.autoReplyTemplate}'`
      );
    }
    if (formFields.externalService) {
      await this.waitForSelector(
        this.elements.generalRulesModalElements.methodOptionOnSave
      );
      await this.dropdownOptionSelect(
        this.elements.generalRulesModalElements.methodOptionOnSave,
        formFields.externalService
      );
    }
    if (formFields.bodyType) {
      await this.dropdownOptionSelect(
        this.elements.generalRulesModalElements.bodyType,
        formFields.bodyType
      );
    }
    if (formFields.URL) {
      await this.type(
        this.elements.generalRulesModalElements.linktoExternalService,
        formFields.URL
      );
    }
    if (formFields.field) {
      await this.type(
        this.elements.generalRulesModalElements.requestBodyField,
        formFields.field
      );
    }
    if (formFields.value) {
      await this.type(
        this.elements.generalRulesModalElements.requestBodyValue,
        formFields.value
      );
    }
    if (formFields.onActionURL) {
      await this.waitForSelector(this.elements.generalRulesModalElements.Url);
      await this.type(
        this.elements.generalRulesModalElements.Url,
        formFields.onActionURL
      );
    }
    if (formFields.method) {
      await this.waitForSelector(
        this.elements.generalRulesModalElements.methodOptionOnAction
      );
      await this.dropdownOptionSelect(
        this.elements.generalRulesModalElements.methodOptionOnAction,
        formFields.method
      );
    }
    if (formFields.authentication) {
      await this.waitForSelector(
        this.elements.generalRulesModalElements.authentication
      );
      await this.dropdownOptionSelect(
        this.elements.generalRulesModalElements.authentication,
        formFields.authentication
      );
    }
    if (formFields.username) {
      await this.type(
        this.elements.generalRulesModalElements.authUserName,
        formFields.username
      );
    }
    if (formFields.password) {
      await this.type(
        this.elements.generalRulesModalElements.authPassword,
        formFields.password
      );
    }
    if (formFields.scriptElement1) {
      await this.type(
        this.elements.generalRulesModalElements.responseScriptElement,
        formFields.scriptElement1
      );
    }
    if (formFields.property1) {
      await this.type(
        this.elements.generalRulesModalElements.responeProperty,
        formFields.property1
      );
    }
    if (formFields.scriptElement2) {
      await this.forceClick(
        this.elements.generalRulesModalElements.addResponseElement
      );
      await this.type(
        this.elements.generalRulesModalElements.responseScriptElement.replace(
          '2',
          '3'
        ),
        formFields.scriptElement2
      );
    }
    if (formFields.property2) {
      await this.type(
        this.elements.generalRulesModalElements.responeProperty.replace(
          '2',
          '3'
        ),
        formFields.property2
      );
    }
    if (formFields.ivrMenu) {
      await this.click(this.elements.generalRulesModalElements.ivrMenu);
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.ivrMenu}'`
      );
    }
    if (formFields.owner) {
      await this.click(this.elements.generalRulesModalElements.owner);
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.owner}'`
      );
    }
    if (formFields.outcomeName) {
      // need to add wait here as when we select owner then outcome takes time to load
      await this.wait(3);
      await this.click(this.elements.generalRulesModalElements.outcomeName);
      await this.click(
        `${this.elements.classDropDown} >> text='${formFields.outcomeName}'`
      );
    }
    await this.waitForSelector(
      this.elements.generalRulesModalElements.saveRule
    );
    await this.forceClick(this.elements.generalRulesModalElements.saveRule);
  }

  /**
   * function to verify list of general rules
   * @param {string} ruleName - rule name
   * @return {void} Nothing
   */
  async verifyListOfGeneralRules(ruleName) {
    // need this wait so that general rule tab appears
    await this.wait(5);
    await this.shouldContainText(this.elements.savedRuleName, ruleName);
  }

  /**
   * function to verify total element added
   * @param {number} length - total elements to added
   * @return {void} Nothing
   */
  async verifyElementsDragged(length) {
    // need this wait to count the length
    await this.wait(4);
    const verifyLength = await this.countElement(
      this.elements.elementsInDropBox
    );
    assert.equal(Number(length), verifyLength);
  }

  /**
   * function to add element with drag and drop
   * @param {string} elementName - type of element
   * @param {number} length - total elements to add
   * @return {void} Nothing
   */
  async addElement(elementName, length) {
    await this.click(this.elements.elementsButton);
    // need this wait for drag and drop
    await this.wait(3);
    if (elementName === 'oneresponse') {
      await this.waitForSelector(this.elements.oneResponse);
      await this.dragAndDrop(
        this.elements.oneResponse,
        this.elements.dropBoxArea
      );
      // need this wait for drag and drop
      await this.wait(2);
    }
    if (elementName === 'textinput') {
      if (length > 0) {
        await this.waitForSelector(this.elements.textInput);
        await this.dragAndDrop(
          this.elements.textInput,
          `${this.elements.selectedTextInput}:nth-child(${length})`
        );
      } else {
        // need this wait for drag and drop
        await this.wait(2);
        await this.dragAndDrop(
          this.elements.textInput,
          this.elements.dropBoxArea
        );
      }
    }
    if (elementName === 'startRecording') {
      await this.waitForSelector(this.elements.startRecording);
      await this.dragAndDrop(
        this.elements.startRecording,
        this.elements.dropBoxArea
      );
      // need this wait for drag and drop
      await this.wait(2);
    }
    if (elementName === 'stopRecording') {
      await this.waitForSelector(this.elements.stopRecording);
      await this.dragAndDrop(
        this.elements.stopRecording,
        this.elements.dropBoxArea
      );
      // need this wait for drag and drop
      await this.wait(2);
    }
    if (elementName === 'checks') {
      await this.waitForSelector(this.elements.checks);
      await this.dragAndDrop(this.elements.checks, this.elements.dropBoxArea);
    }
    if (elementName === 'callback') {
      await this.waitForSelector(this.elements.callback);
      await this.dragAndDrop(this.elements.callback, this.elements.dropBoxArea);
    }
    if (elementName === 'calendar') {
      await this.waitForSelector(this.elements.calendar);
      await this.dragAndDrop(this.elements.calendar, this.elements.dropBoxArea);
    }
  }

  /**
   * function to click on script tab
   * @return {void} Nothing
   */
  async clickScriptTab() {
    await this.waitForSelector(this.elements.scriptTabButton);
    await this.click(this.elements.scriptTabButton);
  }

  /**
   * function to select script from dropdown
   * @param {string} scriptName - scriptname
   * @return {void} Nothing
   */
  async selectScript(scriptName) {
    await this.mouseOver(this.elements.selectScript);
    //wait for scrip tab to load
    await this.wait(3);
    if (await this.isVisible(this.elements.selectScript)) {
      await this.waitForSelector(this.elements.selectScript);
      await this.dropdownOptionSelect(this.elements.selectScript, scriptName);
    }
  }

  /**
   * function to click one response values
   * @param {string} option - options for on reponse value
   * @return {void} Nothing
   */
  async fillOneResponse(option) {
    if (option === 'Yes') {
      await this.scrollIntoElement(this.elements.selectYes);
      await this.click(this.elements.selectYes);
    }
    if (option === 'No') {
      await this.waitForSelector(this.elements.selectNo);
      await this.clickLastElement(this.elements.selectNo);
    }
    if (option === 'Kinda') {
      await this.waitForSelector(this.elements.selectKinda);
      await this.clickLastElement(this.elements.selectKinda);
    }
  }

  /**
   * function to fill input text field
   * @param {string} scriptName - name of script
   * @param {string} [titleValue=label] - title value to be filled
   * @param {string} [titleName=Label here.] - label name
   * @param {boolean} [automatic=false] - to enter in automatic mode
   * @return {void} Nothing
   */
  async fillInputText(
    scriptName,
    titleValue = 'label',
    titleName = 'Label here.',
    automatic = false
  ) {
    await this.wait(3); // Need to wait  for popup to disappear
    if (automatic) {
      await this.type(
        `//span[text()="${scriptName}"]  /../../.. /.. /form //label[@data-original="${titleName}"] /.. /div/input`,
        titleValue,
        true
      );
      await this.pressKey('Enter');
      return;
    }
    await this.type(
      `//span[text()="${scriptName}"]  /../../.. /.. /form //label[@data-original="${titleName}"] /.. /div/input`,
      titleValue,
      true
    );
  }

  /**
   * function to click on text
   * @param {string} text - text to be clicked
   * @return {void} Nothing
   */
  async clickOnText(text) {
    await this.click(`text=${text}`);
  }

  /**
   * function to verify popup
   * @param {string} message - text message to verify
   * @return {void} Nothing
   */
  async verifyPopup(message) {
    await this.waitForSelector(this.elements.Popup);
    await this.shouldContainText(this.elements.Popup, message);
  }

  /**
   * function to click on validate script
   * @return {void} Nothing
   */
  async validateScript() {
    await this.waitForSelector(this.elements.validateScriptButton);
    await this.clickLastElement(this.elements.validateScriptButton);
  }

  /**
   * function to click new script button on ticket channel
   * @return {void} Nothing
   */
  async newScriptOnTicketChannel() {
    await this.clickLastElement(this.elements.newScriptTicketChannel, true);
    await this.waitForSelector(this.elements.newScriptConfirmYes);
    await this.clickLastElement(this.elements.newScriptConfirmYes, true);
  }

  /**
   * function to click search button in text input
   * @return {void} Nothing
   */
  async searchInTextInput() {
    await this.waitForSelector(this.elements.searchModeManualButton);
    await this.click(this.elements.searchModeManualButton);
  }

  /**
   * function to select record from search script
   * @return {void} Nothing
   */
  async selectRecordFromSearchScript() {
    await this.forceClick(this.elements.searchedRecord, true);
  }

  /**
   * function to set one response
   * @param {object} ruleDetails - ruledetails object
   * @return {void} Nothing
   */
  async setOneResponse(ruleDetails) {
    if (ruleDetails.status === 'true') {
      await this.waitForSelector(this.elements.selectedOneResponse);
      await this.click(this.elements.selectedOneResponse);
    }
    await this.setRules(ruleDetails);
  }

  /**
   * function to set rules
   * @param {object} ruleDetails - ruledetails object
   * @param {string} ruleDetails.value - value for rule
   * @param {string} ruleDetails.type - type of rule
   * @param {string} ruleDetails.ruleName - rule name
   * @param {string} ruleDetails.target - target type
   * @param {string} ruleDetails.goto - goto
   * @param {string} ruleDetails.contactFields - contact fields
   * @param {string} ruleDetails.notifyAgent - notify agent
   * @return {void} Nothing
   */
  async setRules(ruleDetails) {
    await this.waitForSelector(this.elements.rules);
    await this.click(this.elements.rules);
    await this.waitForSelector(this.elements.rulesEvent);
    await this.dropdownOptionSelect(
      this.elements.rulesEvent,
      ruleDetails.event
    );
    // need to add this wait as dropdown doesn't appears
    await this.wait(2);
    if (ruleDetails.value) {
      await this.click(this.elements.rulesEventValue);
      await this.waitForSelector(
        `//div[@class="select2-result-label" and text()="${ruleDetails.value}"]`
      );
      await this.click(
        `//div[@class="select2-result-label" and text()="${ruleDetails.value}"]`
      );
    }
    if (ruleDetails.type) {
      await this.dropdownOptionSelect(this.elements.ruleType, ruleDetails.type);
    }
    if (ruleDetails.ruleName) {
      await this.waitForSelector(this.elements.rule);
      await this.click(this.elements.rule);
      await this.click(
        `//div[@class="select2-result-label" and text()="${ruleDetails.ruleName}"]`
      );
    }
    if (ruleDetails.target) {
      await this.waitForSelector(this.elements.target);
      await this.click(this.elements.target);
      await this.click(
        `${this.elements.classDropDown} >> text='${ruleDetails.target}'`
      );
    }
    if (ruleDetails.goto) {
      await this.waitForSelector(this.elements.goto);
      await this.dropdownOptionSelect(this.elements.goto, ruleDetails.goto);
    }
    if (ruleDetails.contactField) {
      await this.waitForSelector(this.elements.contactFields);
      await this.click(this.elements.contactFields);
      await this.click(
        `${this.elements.classDropDown} >> text='${ruleDetails.contactField}'`
      );
    }
    if (ruleDetails.notifyAgent === 'False') {
      await this.click(this.elements.notifyAgent);
    }
    await this.waitForSelector(this.elements.addRule);
    await this.click(this.elements.addRule);
  }

  /**
   * function to set textinput
   * @param {object} inputDetails - inputdetails object
   * @param {string} inputDetails.title - value of inputtext
   * @param {string} inputDetails.number - index number
   * @param {object} inputDetails.rules - rule details
   * @param {string} inputDetails.isRequired - if necessary
   * @param {string} inputDetails.isHidden - to hide
   * @param {object} inputDetails.searchInScript - search in script details
   * @param {object} inputDetails.searchInDb - search in data base
   * @return {void} Nothing
   */
  async setTextInput(inputDetails) {
    // need this wait to open the edit section
    await this.wait(1);
    if (inputDetails.title) {
      if (inputDetails.number >= 0) {
        await this.click(
          `//span[@class='badge bg-color-blueLight label_id_item' and text()='${inputDetails.number}']`,
          true
        );
      } else {
        await this.waitForSelector(this.elements.selectedTextInput);
        await this.click(this.elements.selectedTextInput, true);
      }
      await this.waitForSelector(this.elements.textInputTitle, 80000);
      await this.type(this.elements.textInputTitle, inputDetails.title);
    }
    if (inputDetails.rules) {
      if (inputDetails.rules.label) {
        await this.click(
          `//label[@class='label_texto label_geral col-md-4 control-label' and text()='${inputDetails.rules.label}']`,
          true
        );
      } else {
        await this.click(this.elements.selectedTextInput, true);
      }
      await this.setRules(inputDetails.rules);
      return;
    }
    if (inputDetails.isRequired) {
      await this.click(this.elements.selectedTextInput, true);
      await this.scrollIntoElement(this.elements.isRequired);
      await this.waitForSelector(this.elements.isRequired);
      await this.checkBox(this.elements.isRequired);
    }
    if (inputDetails.isHidden) {
      await this.click(this.elements.selectedTextInput, true);
      await this.waitForSelector(this.elements.hidden);
      await this.scrollIntoElement(this.elements.hidden);
      await this.click(this.elements.hidden);
    }
    if (inputDetails.searchInScript) {
      await this.click(this.elements.searchInScript, true);
      await this.searchInScript(inputDetails.searchInScript);
      return;
    }
    if (inputDetails.searchInDb) {
      await this.waitForSelector(this.elements.selectedTextInput);
      await this.click(this.elements.selectedTextInput, true);
      await this.click(this.elements.searchInDb, true);
      await this.searchInDb(inputDetails.searchInDb);
      return;
    }
    if (inputDetails.validation) {
      await this.waitForSelector(this.elements.validation);
      const locator = `//span[text()='${inputDetails.validation}']`;
      await this.click(locator);
    }
    if (inputDetails.script) {
      const scriptData = await this.readCsv(inputDetails.script);
      await this.clearField(this.elements.scriptText);
      await this.type(this.elements.scriptText, scriptData.toString());
    }
    await this.waitForSelector(this.elements.saveEdits);
    await this.click(this.elements.saveEdits);
  }

  /**
   * function to process search in script
   * @param {object} searchInScript - search in script object
   * @param {string} searchInScript.searchInScript - search in script type
   * @param {string} searchInScript.searchMode - search mode
   * @param {string} searchInScript.name - input text name
   * @param {string} searchInScript.city - input text city
   * @param {string} searchInScript.nif - input text nif
   * @param {string} searchInScript.postalCode - input text postal code
   * @param {string} searchInScript.filterTag - add filter tag
   * @param {string} searchInScript.filterColumn - add filter column
   * @return {void} Nothing
   */
  async searchInScript(searchInScript) {
    if (searchInScript.searchInScript === 'Active') {
      await this.forceClick(this.elements.activeSearchScript);
    }
    if (searchInScript.searchInScript === 'Inactive') {
      await this.forceClick(this.elements.inactiveSearchScript);
    }
    if (searchInScript.searchMode === 'Manual') {
      await this.forceClick(this.elements.manualSearchMode);
    }
    if (searchInScript.searchMode === 'Automatic') {
      await this.forceClick(this.elements.automaticSearchMode);
    }
    const a = await this.isVisible(this.elements.tableColumnInScript);
    if (a) {
      await this.type(this.elements.tableColumnInScript, searchInScript.name);
      await this.pressKey('Enter');
      await this.type(this.elements.tableColumnInScript, searchInScript.city);
      await this.pressKey('Enter');
      await this.type(this.elements.tableColumnInScript, searchInScript.nif);
      await this.pressKey('Enter');
      await this.type(
        this.elements.tableColumnInScript,
        searchInScript.postalCode
      );
      await this.pressKey('Enter');
    }
    if (searchInScript.filterTag) {
      await this.dropdownOptionSelect(
        this.elements.filterTag,
        searchInScript.filterTag
      );
    }
    if (searchInScript.filterColumn) {
      await this.dropdownOptionSelect(
        this.elements.filterColumn,
        searchInScript.filterColumn
      );
    }
    if (searchInScript.filterTag && searchInScript.filterColumn) {
      await this.click(this.elements.addFilter, true);
    }
    await this.click(this.elements.saveSearchInScript, true);
  }

  /**
   * function to process search in db
   * @param {object} searchInDb - search in db object
   * @param {string} searchInDb.active - search type
   * @param {string} searchInDb.inactive - search type
   * @param {string} searchInDb.searchMode - search mode
   * @param {string} searchInDb.filterOption - filter options
   * @param {string} searchInDb.groupResults - to group results
   * @param {string} searchInDb.tableName - table name from db
   * @param {string} searchInDb.filterTag -  filter tag
   * @param {string} searchInDb.filterColumn -  filter column
   * @param {string} searchInDb.filterTag1 -  filter tag1
   * @param {string} searchInDb.filterColumn1 -  filter column1
   * @param {string} searchInDb.updateTag - update tag
   * @param {string} searchInDb.updateColumn - update column
   * @param {string} searchInDb.updateTag1 - update tag1
   * @param {string} searchInDb.updateColumn1 - update column1
   * @return {void} Nothing
   */
  async searchInDb(searchInDb) {
    if (searchInDb.active) {
      await this.forceClick(this.elements.activeSearchDb);
    }
    if (searchInDb.inactive) {
      await this.forceClick(this.elements.inactiveSearchDb);
    }
    if (searchInDb.searchMode === 'autoComplete') {
      await this.forceClick(this.elements.searchModeAutoComplete);
    }
    if (searchInDb.searchMode === 'search') {
      await this.forceClick(this.elements.searchModeDbSearch);
    }
    if (searchInDb.filterOption === 'and') {
      await this.forceClick(this.elements.filterOptionAnd);
    }
    if (searchInDb.groupResults) {
      await this.forceClick(this.elements.groupResults);
    }
    if (searchInDb.tableName) {
      await this.dropdownOptionSelect(
        this.elements.tableNameInDb,
        searchInDb.tableName
      );
    }
    await this.waitForSelector(this.elements.dbFilterTag);
    if (searchInDb.filterTag) {
      await this.dropdownOptionSelect(
        this.elements.dbFilterTag,
        searchInDb.filterTag
      );
    }
    if (searchInDb.filterColumn) {
      await this.dropdownOptionSelect(
        this.elements.dbFilterColumn,
        searchInDb.filterColumn
      );
    }
    if (searchInDb.filterTag && searchInDb.filterColumn) {
      await this.forceClick(this.elements.dbFilterAdd);
    }
    if (searchInDb.filterTag1) {
      await this.dropdownOptionSelect(
        this.elements.dbFilterTag,
        searchInDb.filterTag1
      );
    }
    if (searchInDb.filterColumn1) {
      await this.dropdownOptionSelect(
        this.elements.dbFilterColumn,
        searchInDb.filterColumn1
      );
    }
    if (searchInDb.filterTag1 && searchInDb.filterColumn1) {
      await this.forceClick(this.elements.dbFilterAdd);
    }
    if (searchInDb.updateTag) {
      await this.dropdownOptionSelect(
        this.elements.dbUpdateTag,
        searchInDb.updateTag
      );
    }
    if (searchInDb.updateColumn) {
      await this.dropdownOptionSelect(
        this.elements.dbUpdateColumn,
        searchInDb.updateColumn
      );
    }
    if (searchInDb.updateTag && searchInDb.updateColumn) {
      await this.forceClick(this.elements.dbAddUpdate);
    }
    if (searchInDb.updateTag1) {
      await this.dropdownOptionSelect(
        this.elements.dbUpdateTag,
        searchInDb.updateTag1
      );
    }
    if (searchInDb.updateColumn1) {
      await this.dropdownOptionSelect(
        this.elements.dbUpdateColumn,
        searchInDb.updateColumn1
      );
    }
    if (searchInDb.updateTag1 && searchInDb.updateColumn1) {
      await this.forceClick(this.elements.dbAddUpdate);
    }
    await this.waitForSelector(this.elements.saveSearchInDb);
    await this.forceClick(this.elements.saveSearchInDb);
  }

  /**
   * function to add new page
   * @param {string} secondPage - name of second page
   * @return {void} Nothing
   */
  async addNewPage(secondPage) {
    await this.click(this.elements.addNewPageIcon);
    await this.type(this.elements.typePageName, secondPage);
    await this.click(this.elements.createPageButton);
  }

  /**
   * function to select page
   * @return {void} Nothing
   */
  async selectPage(page) {
    await this.dropdownOptionSelect(this.elements.pageDropdown, page);
  }

  /**
   * function to validate fields
   * @param {string} scriptName - scriptname
   * @param {boolean} data - text data to validate
   * @param {string} [titleName=Label here.] - label name of input text
   * @return {void} Nothing
   */
  async validateForm(scriptName, titleName, data) {
    await this.waitForSelector(
      `//span[text()="${scriptName}"]  /../../.. /.. /form //label[@data-original="${titleName}"] /../div/input`
    );
    const textData = await this.getValueFromTextInput(
      `//span[text()="${scriptName}"]  /../../.. /.. /form //label[@data-original="${titleName}"] /../div/input`
    );
    //no need of await we are just comparing strings
    this.containSubstring(data, textData);
  }

  /**
   * function to check visibility of text input in tickets
   * @param {boolean} [visibility=true] - visibility type
   * @param {string} [scriptName] - name of script
   * @param {string} [titleName=Label here.] - label name of input text
   * @return {void} Nothing
   */

  async checkVisiblityOfTextInput(
    visibility = true,
    scriptName,
    titleName = 'Label here.'
  ) {
    if (visibility) {
      await this.verifyVisibility(
        ` //span[text()="${scriptName}"]  /../../.. /.. /form //label[@data-original="${titleName}"] /.. /div/input `,
        visibility
      );
    } else {
      visibility = true;
      await this.verifyelementIsHidden(
        `//span[text()="${scriptName}"]  /../../.. /.. /form //label[@data-original="${titleName}"] /.. /div/input`,
        visibility
      );
    }
  }

  /**
   * function to validate contact info in ticket
   * @param {string} value - country name
   * @return {void} Nothing
   */
  async validateContactInfo(value) {
    await this.waitForSelector(this.elements.contactInfo);
    await this.click(this.elements.contactInfo);
    await this.scrollIntoElement(this.elements.countryInput);
    // need to wait to get text value from updatecontact info tab
    await this.wait(4);
    await this.shouldHasTitleValue(this.elements.countryInput, value);
  }

  /**
   * function to click querry selector for on acttion script
   * @return {void} Nothing
   */
  async clickQuerySelect() {
    await this.isVisible(this.elements.apiQueryDiv);
    // if ((await this.isVisible('text=Error loading the Tree Selector modal.'))) {
    // need to wait for error popup to disappear as this error appears some time and takes time to disappear that's why applied so much wait here
    await this.wait(15);
    // }
    await this.click(this.elements.querySelectButton);
  }

  /**
   * function to get random script name
   * @param {string} scriptType - type of script
   * @return {string} randomstring
   */
  async getScriptName(scriptType) {
    return this.getRandomString(scriptType);
  }

  /**
   * function to click on script tab in voice Channel
   * @return {void} Nothing
   */
  async clickScriptTabVoiceChannel() {
    await this.waitForSelector(this.elements.scriptTabButtonVoiceChannel);
    await this.click(this.elements.scriptTabButtonVoiceChannel);
  }

  /**
   * function to select script from dropdown in voice channel
   * @param {string} scriptName - scriptname
   * @return {void} Nothing
   */
  async selectScriptInVoiceChannel(scriptName) {
    if (await this.isVisible(this.elements.selectScriptVoiceChannel)) {
      await this.mouseOver(this.elements.selectScriptVoiceChannel);
      await this.waitForSelector(this.elements.selectScriptVoiceChannel);
      await this.dropdownOptionSelect(
        this.elements.selectScriptVoiceChannel,
        scriptName
      );
    }
  }

  /**
   * function to select element
   * @param {string} element - element of script
   * @return {void} Nothing
   */
  async selectElement(element) {
    if (element === 'startRecording') {
      await this.waitForSelector(this.elements.startRecordingLeftPanel);
      await this.click(this.elements.startRecordingLeftPanel);
    }
    if (element === 'oneresponse') {
      await this.waitForSelector(this.elements.oneResponseSelect);
      await this.click(this.elements.oneResponseSelect);
    }
    if (element === 'checks') {
      await this.waitForSelector(this.elements.checksSelected);
      await this.click(this.elements.checksSelected);
    }
    if (element === 'callback') {
      await this.waitForSelector(this.elements.callbackSelect);
      await this.click(this.elements.callbackSelect);
    }
    if (element === 'calendar') {
      await this.waitForSelector(this.elements.calendarSelect);
      await this.click(this.elements.calendarSelect);
      if (!(await this.isVisible(this.elements.calendarTitle))) {
        await this.click(this.elements.calendarSelect);
      }
    }
  }

  /**
   * function to set start and stop recording items
   * @param {object} itemConfigurations - item configurations object
   * @param {string} itemConfigurations.title - element title
   * @param {string} itemConfigurations.fileName - element file name
   * @param {string} itemConfigurations.hidden - element hidden true/false
   * @param {string} itemConfigurations.recordingElement - element recording element
   * @return {void} Nothing
   */
  async startAndStopRecordingItems(itemConfigurations) {
    await this.waitForSelector(this.elements.startRecordingTitle);
    await this.clearField(this.elements.startRecordingTitle);
    await this.type(
      this.elements.startRecordingTitle,
      itemConfigurations.title
    );
    await this.clearField(this.elements.startRecordingFilename);
    await this.type(
      this.elements.startRecordingFilename,
      itemConfigurations.fileName
    );
    if (itemConfigurations.hidden === 'true') {
      await this.checkBox(this.elements.startRecordingHidden);
    }
    if (itemConfigurations.recordingElement === 'automatic') {
      await this.click(this.elements.automaticRecording);
    }
    await this.click(this.elements.saveEdits);
    await this.waitForSelector(this.elements.successMessage);
  }
  
  /**
   * function to set calendar items
   * @param {object} itemConfigurations - item configurations object
   * @param {string} itemConfigurations.title - calendar title
   * @param {string} itemConfigurations.calendarName - calendar name
   * @param {string} itemConfigurations.requiredBooking - element calendar booking
   * @return {void} Nothing
   */
  async calendarItems(itemConfigurations) {
    await this.waitForSelector(this.elements.calendarTitle);
    await this.clearField(this.elements.calendarTitle);
    await this.type(this.elements.calendarTitle, itemConfigurations.title);
    await this.clearField(this.elements.calendarName);
    await this.type(this.elements.calendarName, itemConfigurations.calendarName);
    await this.pressKey('Enter');
    await this.selectOptionByText(this.elements.requiredBooking, itemConfigurations.requiredBooking);
    await this.click(this.elements.saveEdits);
  }

  /**
   * function to select recording buttons
   * @param {string} recordingButton - recordingButton
   * @return {void} Nothing
   */
  async selectRecordingButton(recordingButton) {
    if (recordingButton === 'startRecording') {
      await this.waitForSelector(this.elements.startRecordingButton);
      await this.click(this.elements.startRecordingButton);
    }
    if (recordingButton === 'stopRecording') {
      await this.waitForSelector(this.elements.stopRecordingButton);
      await this.click(this.elements.stopRecordingButton);
      await this.waitForSelector(this.elements.stopRecordingYes);
      await this.click(this.elements.stopRecordingYes);
    }
  }

  /**
   * function to validate recording notification
   * @param {number} recordings - number of recording
   * @return {void} Nothing
   */
  async validateRecording(recordings) {
    await this.waitForSelector(this.elements.recordingBadge);
    const noOfRecord = await this.getTexts(this.elements.recordingBadge);
    assert.equal(noOfRecord, recordings);
  }

  /**
   * function to validate recording list on mouseover
   * @return {void} Nothing
   */
  async validateRecordingModal() {
    await this.mouseOver(this.elements.recordingBadge);
    await this.waitForSelector(this.elements.recordingListModal);
  }

  /**
   * function to validate the notification around script
   * @param {string} scriptName - script name
   * @param {string} message - message
   * @return {void} Nothing
   */
  async validateNotification(scriptName, message) {
    await this.waitForSelector(
      `//span[text()="${scriptName}"]  /../../.. /.. /form/div //div[@class = "alert alert-info fade in rules-alert-ctn"] /span`,
      message
    );
    await this.shouldContainText(
      `//span[text()="${scriptName}"]  /../../.. /.. /form/div //div[@class = "alert alert-info fade in rules-alert-ctn"] /span`,
      message
    );
  }

  /**
   * function to set start and stop recording items
   * @param {object} itemConfigurations - item configurations object
   * @param {string} itemConfigurations.title - element title
   * @param {string} itemConfigurations.value - element file name
   * @return {void} Nothing
   */
  async oneResponseItems(itemConfigurations) {
    await this.waitForSelector(this.elements.itemTab);
    await this.click(this.elements.itemTab);
    if (itemConfigurations.title) {
      await this.waitForSelector(this.elements.oneResponseTitle);
      await this.clearField(this.elements.oneResponseTitle);
      await this.type(this.elements.oneResponseTitle, itemConfigurations.title);
    }
    await this.clearField(this.elements.oneResponseTextarea);
    const textareaOptions = itemConfigurations.value.split(',');
    for (let i = 0; i < textareaOptions.length; i++) {
      const existingValue = await page
        .locator(this.elements.oneResponseTextarea)
        .inputValue();
      await this.type(
        this.elements.oneResponseTextarea,
        existingValue + textareaOptions[i]
      );
      if (i === 0) {
        await this.pressKey('Enter');
      }
    }
    await this.click(this.elements.saveEdits);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to validate start & stop recording automatic element
   * @param {string} type - type of recording
   * @param {string} message - notification message
   * @param {string} buttonText - replaced element with text
   * @return {void} Nothing
   */
  async validateElement(type, message, buttonText) {
    if (type === 'Start recording') {
      await this.waitForSelector(this.elements.startRecordingLabel);
      await this.waitForSelector(this.elements.elementReplacedText);
      await this.shouldContainText(
        this.elements.elementReplacedText,
        buttonText
      );
    }
    if (type === 'Stop recording') {
      await this.verifyelementIsHidden(
        this.elements.startRecordingButton,
        true
      );
    }
    await this.waitForSelector(this.elements.notificationMessage);
    await this.shouldContainText(this.elements.notificationMessage, message);
    //added wait to disappear popup
    await this.wait(8);
  }

  /**
   * function to add value to the selected element
   * @param  {Object} itemConfigurations
   * @param  {String} itemConfigurations.title - element title
   * @param  {Object} itemConfigurations.value - element value
   */
  async checksItems(itemConfigurations) {
    await this.waitForSelector(this.elements.itemTab);
    await this.click(this.elements.itemTab);
    if (itemConfigurations.title) {
      await this.waitForSelector(this.elements.checksTitle);
      await this.clearField(this.elements.checksTitle);
      await this.type(this.elements.checksTitle, itemConfigurations.title);
    }
    await this.clearField(this.elements.checksTextarea);
    const textareaOptions = itemConfigurations.value.split(',');
    for (let i = 0; i < textareaOptions.length; i++) {
      const existingValue = await page
        .locator(this.elements.checksTextarea)
        .inputValue();
      await this.type(
        this.elements.checksTextarea,
        existingValue + textareaOptions[i]
      );
      if (i < textareaOptions.length - 1) {
        await this.pressKey('Enter');
      }
    }
    await this.click(this.elements.saveEdits);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * @return {void} Nothing
   */
  async markScriptValues() {
    await this.wait(2); //too quick
    await this.forceClick(this.elements.scriptValuesRequired);
    await this.forceClick(this.elements.scriptValuesRequiredAlways);
    if (await this.isVisible(this.elements.minimalAnswerInput)) {
      await this.type(this.elements.minimalAnswerInput, '1');
    }
  }

  /**
   * function to set call back data
   * @param {object} callbackDetails - callback object
   * @param {string} callbackDetails.callbackType - callback type
   * @param {string} callbackDetails.campaign - campaign name
   * @param {string} callbackDetails.relatedDB - DB
   * @param {string} callbackDetails.agent - agent name
   * @param {string} callbackDetails.maxDays - max number of days
   * @param {string} callbackDetails.weekdays - weekdays to be selected
   * @return {void} Nothing
   */
  async setCallback(callbackDetails) {
    if (callbackDetails.callbackType) {
      await this.waitForSelector(
        `//span[text()="${callbackDetails.callbackType}"]`
      );
      await this.click(`//span[text()="${callbackDetails.callbackType}"]`);
    }
    if (callbackDetails.campaign) {
      await this.waitForSelector(this.elements.campaignDropDown);
      await this.click(this.elements.campaignDropDown);
      await this.click(
        `//div[@class="select2-result-label" and text()="${callbackDetails.campaign}"]`
      );
    }
    if (callbackDetails.relatedDB) {
      await this.waitForSelector(this.elements.databaseDropDown);
      await this.click(this.elements.databaseDropDown);
      await this.click(
        `//div[@class="select2-result-label" and text()="${callbackDetails.relatedDB}"]`
      );
    }
    if (callbackDetails.agent) {
      await this.waitForSelector(this.elements.agentDropDown);
      await this.click(this.elements.agentDropDown);
      await this.click(
        `//div[@class="select2-result-label" and text()="${callbackDetails.agent}"]`
      );
    }
    if (callbackDetails.maxDays) {
      await this.type(this.elements.maxDays, callbackDetails.maxDays);
      await this.type(this.elements.minHour, callbackDetails.startTime);
      await this.pressKey('Enter');
      await this.type(this.elements.maxHour, callbackDetails.endTime);
      await this.pressKey('Enter');
    }
    if (callbackDetails.weekdays) {
      if (callbackDetails.weekdays === 'all') {
        let count = await this.countElement(this.elements.weekDayButtons);
        for (let i = 1; i <= count; i++) {
          await this.click(`.callback-script-btn:nth-child(${i})`);
        }
      }
    }
    await this.click(this.elements.saveEdits);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to verify report csv data
   * @param {object} csvDetails - csv data object
   * @param {string} csvDetails.Callback_schedule - callback schedule
   * @param {string} csvDetails.Agent - agent name
   * @param {string} csvDetails.Comments - comment
   * @param {string} csvName- name of csv
   * @return {void} Nothing
   */
  async validateCSVData(csvName, csvDetails) {
    const csvData = await this.readCsv(csvName);
    let obj = await this.conertCSVDataToJson(csvData);
    let jsonArr = JSON.parse(obj);
    let csvValue = '';
    let flag = false;
    for (let index = 0; index < Object.keys(jsonArr).length; index++) {
      let date = dayjs().format('DD-MM-YYYY') + ' ' + global.callBackTime;
      let callBackDetails = `Callback Date: ${date}|Agent: ${csvDetails.Agent}|Comment: ${csvDetails.Comments}`;
      if (csvDetails.Callback_schedule) {
        csvValue = jsonArr[index]._Callback_schedule;
        if (csvValue.includes('Callback Date')) {
          flag = true;
          assert.isTrue(csvValue.includes(callBackDetails));
          break;
        }
      }
    }
    if (flag === false) {
      assert.isTrue(false);
    }
  }

  /**
   * function to select calendar element
   * @return {void} Nothing
   */
  async selectCalendarElement() {
    if (await this.isVisible(this.elements.calendarElement)) {
      await this.click(this.elements.calendarElement);
    } else {
      await this.wait(5);//load calendar element
      await this.waitForSelector(this.elements.calendarElementOnVoice);
      await this.click(this.elements.calendarElementOnVoice);
    }
  }

  /**
   * function to book a event
   * @param {Object} bookingData - booking data object
   * @param {string} bookingData.hour - time hour of event
   * @param {string} bookingData.desc - description of event
   * @param {string} bookingData.days - number of days from today
   * @param {string} bookingData.concurrent - concurrent events status
   * @param {string} bookingData.error - concurrent events error status
   * @return {void} Nothing
   */
  async bookEvent(bookingData) {
    await this.waitForSelector(this.elements.selectDay);
    await this.click(this.elements.selectDay);
    if (bookingData.days === 'month') {
      bookingData.days = dayjs().daysInMonth() + 1;
    }
    if (bookingData.days === 'week') {
      await this.click(this.elements.selectWeek);
      bookingData.days = 1;
    }
    if (!(bookingData.days).toString().includes('-')) {
      for (let i = 1; i <= (bookingData.days); i++) {
        await this.click(this.elements.clickNext);
      }
      if (bookingData.concurrent === 'true') {
        await this.waitForSelector(this.elements.activeEvent);
        await this.hideElement(this.elements.activeEvent);
      }
      await this.click(`[data-time="${bookingData.hour}:00:00"]`);
      if (bookingData.error === 'true') {
        await this.waitForSelector(this.elements.slotErrorPopUp);
        let errorPopUp = await this.isVisible(this.elements.slotErrorPopUp);
        await assert.isTrue(errorPopUp);
      } else {
        await this.waitForSelector(this.elements.eventDescription);
        await this.clearField(this.elements.eventDescription);
        await this.type(this.elements.eventDescription, bookingData.desc);
        await this.click(this.elements.saveEvent);
      }
      await this.click(this.elements.selectToday);
      await this.click(this.elements.selectWeek);
    }
    else {
      for (let i = 0; i > (bookingData.days); i--) {
        await this.click(this.elements.clickPrevious);
      }
      await this.click(`[data-time="${bookingData.hour}:00:00"]`);
      let modal = await this.isVisible(this.elements.addReservationModal);
      assert.isNotTrue(modal);
    }
  }
  /**
   * function to show preparation time 
   * @return {void} Nothing
   */
  async showPreparationTime() {
    await this.wait(3);//wait to load event
    await this.shouldVisible(this.elements.eventPreparationTime);
  }

  /**
   * function to go to back page
   * @return {void} Nothing
   */
  async backPage() {
    await this.click(this.elements.backButton);
  }

  /** function to validate form error
   * @param {string} message- error message
   * @return {void} Nothing
   */
  async validateFormError(message) {
    await this.waitForSelector(this.elements.validationError);
    await this.shouldContainText(this.elements.validationError, message);
  }

  /** Function to fill the voice script
  * @param {object} fillScriptObject - script values object
  * @param {string} fillScriptObject.textinput - text input
  * @returns {void} nothing
  */
  async fillScript(fillScriptObject) {
    if (fillScriptObject.textinput) {
      await this.type(this.elements.textinput, fillScriptObject.textinput);
    }
  }

  /** Function to verify Block event option
  * @param {string} status - button status
  * @returns {void} nothing
  */
  async verifyBlockEventOption(status) {
    if (status === 'enabled') {
      await this.isVisible(this.elements.blockEvent);
    }
    if (status === 'disabled') {
      let buttonStatus = await this.getAttributeElement(
        this.elements.blockEvent,
        'disabled'
      );
      await assert.equal('disabled', buttonStatus);
    }
  }

  /** Function to block event
  * @returns {void} nothing
  */
  async blockEvent() {
    await this.click(this.elements.blockEvent);
    await this.waitForSelector(this.elements.saveEditEvent);
    await this.click(this.elements.saveEditEvent);
  }

  /**
    * function to verify validate script error message
    * @return {void} Nothing
    */
  async verifyErrorPopup() {
    await this.waitForSelector(this.elements.errorPopUp);
    let popup = await this.isVisible(this.elements.errorPopUp);
    assert.isTrue(popup);
  }
};
