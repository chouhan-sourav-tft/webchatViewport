/*global context, page*/
const { expect, assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');

exports.CRM = class Crm extends BaseAction {
  constructor() {
    super();
  }

  elements = {
    crmManager: '[id="menu_5"]',
    crmMenu: '[id="menu_20"]',
    outboundChannel: '[id="channel_out"]~i~span',
    inboundChannel: '[id="channel_in"]~i~span',
    campaign: '[id="section_campaign"] input',
    inboundQueue: '[id="section_inbound_queue"] input',
    database: '[id="section_database"] input',
    lead: '[id="data_type_client"]~i~span',
    calls: '[id="data_type_call"]~i~span',
    agents: '[id="s2id_select_agents"] input',
    outcomes: '[id="s2id_select_outcomes"] input',
    startLoadDate: '[id="startDate"]',
    endLoadDate: '[id="endDate"]',
    searchButton: 'button[type="submit"] span[data-translate="search"]',
    callDateColumn:
      '//table[@id="table_search_result_calls"]//thead/tr//span[contains(., "Call Date")]',
    phoneNumberValue:
      '#table_search_result_calls .odd:nth-child(1) td:nth-child(3)',
    callDateValue: '#table-calls .odd td:nth-child(2)',
    callNumberValue: '#table-calls .odd td:nth-child(3)',
    callLengthValue: '#table-calls .odd td:nth-child(4)',
    callTalktimeValue: '#table-calls .odd td:nth-child(5)',
    callAgentNameValue: '#table-calls .odd td:nth-child(6)',
    callOutcomeValue: '#table-calls .odd td:nth-child(7)',
    callOwnerValue: '#table-calls .odd td:nth-child(8)',
    callTermReasonValue: '#table-calls .odd td:nth-child(9)',
    callSubtypeValue: '#table-calls .odd td:nth-child(10)',
    transferCallActionButton: '.transfer-btn',
    remoteTransferTab: '#remote-transfers-tab',
    assistedTransferTab: '#assisted-transfers-tab',
    transferCallNumberText: '#remote-transfer-history-list div p:nth-child(1)',
    contactInfoContainer: '[id="contact-default-fields"]',
    contactOutcome: '[id="s2id_outcome-selector"]>a>span.select2-chosen',
    callbackTab: '[id="crm-tab"] [data-translate="callbacks"]',
    callbackId: '[data-translate="id"]',
    callbackState:
      '//*[@id="table-callbacks"] /tbody/tr //td[contains(text(),"Deleted")] /../td[contains(text(),"global")][1]>> nth=0',
    scriptTab: '#script-tab',
    recordingButton: '.btn-listen-script-recording',
    recordingListModal: '#lead-manager-edit-space-callplaymodal',
    recordingText:
    '#lead-manager-edit-space-callplaymodal  .select2-choice .select2-chosen',
    contactSearchType: 'span[data-translate="crm.searchType.option.contact"]',
    transferQueue: '#assisted-transfer-history-list div p:nth-child(1)',
    transferAgent: '#assisted-transfer-history-list div p:nth-child(2)',
    transferResult: '#assisted-transfer-history-list div p:nth-child(3)',
    closeTransferHistory: '.crmCallTransfersModal button.btn-primary',
    remoteTransferCallResult:
    '#remote-transfer-history-list div p:nth-child(2)',
    returnButton: '//span[@data-translate="return"]',
    transferContact: 'button[id="crm-create-database"]',
    transferDatabase: 'div[id="s2id_crm-transfer-database-select-database"]',
    transferOutcome: 'div[id="s2id_crm-transfer-database-select-outcome"]',
    newDbTransferOutcome: 'div[id="s2id_crm-create-database-select-outcome"]',
    searchBox: '#select2-drop div input',
    nameDatabase: 'input[id="crm-create-database-name"]',
    transferCampaign: '[id="s2id_crm-create-database-select-owner"]',
    exclusiveDatabase: 'span[data-translate="transferModal.exclusiveDb.label"]',
    transferButton: 'button[id="crm-create-database-ok"]',
    templateField: '[id="menu_43"]',
    newTemplateBtn: '//span[text()="New Template"]',
    templateName: '#contact-fields-form-ctn div.input-group input',
    newFieldText: 'tr.is-last input.input-sm',
    saveTemplateBtn: '//span[text()="Save Template"]',
    saveBtn: '#bot2-Msg1',
    changeOutcomesBtn: '#crm-change-outcomes',
    allContactsCheckBox: '#crm_contacts_selectAll ~span',
    maxPriority: '#directToToHopper i',
    deleteAssociatedCallback: '#deleteAssociateCallbacksSection i',
    recycleCounter: '#keepRecycleCounter i',
    changeToNew: '#outcomes-option-new ~i',
    changeToOthers: '#outcomes-option-others ~i',
    outcomeGroup: '#s2id_outcomes-groups',
    selectOutcome: '#s2id_outcomes-selection',
    deleteCallbacks: '#option-delete-associated-callbacks ~i',
    changeBtn: '#outcomes-manager-action-btn',
    searchTemplate: '#contact-fields-table_filter input.form-control',
    deleteTemplate: '.btn-danger',
    createdOutcomeGroup:
      '//li[contains(@class, "select2-results-dept-0")]/div[text()="Created outcomes"]',
    selectOutcomeGroup:
      '//li[contains(@class, "select2-results-dept-0")]/div[text()="System outcomes"]',
    databaseOption: '.select2-match',
    removeCampaign: '#section_campaign .select2-search-choice-close',
    removeDatabase: '#section_database .select2-search-choice-close',
    removeAgent: '#s2id_select_agents .select2-search-choice-close',
    clientDateColumn:
      '//table[@id="table_search_result_clients"]//thead/tr/th[contains(., "Call Date")]',
    clientPhoneNumberValue:
    '#table_search_result_clients .odd:nth-child(1) td:nth-child(3)',
    transferContactsInfo: 'span[data-translate="create_database_info"]',
    crmResultPhone: '#table_search_result_clients tbody td:nth-child(4)',
    disabletransferButton: 'button[id="crm-create-database"]',
    selectCampaign: '#s2id_contact-fields-owners-campaigns input',
    deleteIcon: '(//button[@data-action="dele"])[1]',
    deleteIcons: '//button[@data-action="dele"]',
    scriptName: '#script-name',
    scriptValue: '.scriptpopulating',
    scriptActions: '//table[@id="script-datatable"]/tbody//td[last()]/a',
    validateBtn: 'button#validate_button',
    popup: '(//div[@id="newContentdiv"])[last()]//p',
  };

  /**
   * Function to open the crm Manager
   * @returns {void} nothing
   */
  async openCrm() {
    //add wait to load crm
    await this.wait(2);
    await this.waitForSelector(this.elements.crmManager);
    await this.mouseOver(this.elements.crmManager);
    await this.click(this.elements.crmMenu);
  }

  /**
   * Function to search the call
   * @param {object} searchCall - object to search a call
   * @param {string} channel - select channel
   * @param {string} campaign - select campaign
   * @param {string} inboundQueue - select inbound queue
   * @param {string} database - select database
   * @param {string} lead - select lead
   * @param {string} calls - select calls
   * @param {string} searchType - select searchType
   * @param {string} agents - select agents
   * @param {string} outcomes - select outcomes
   * @param {string} startLoadDate - select start Load Date
   * @param {string} endLoadDate - select end load Date
   * @returns {void} nothing
   */
  async searchCall(searchCall) {
    if (searchCall.channel === 'Outbound') {
      await this.waitForSelector(this.elements.outboundChannel);
      await this.click(this.elements.outboundChannel);
    }
    if (searchCall.channel === 'Inbound') {
      await this.waitForSelector(this.elements.inboundChannel);
      await this.click(this.elements.inboundChannel);
    }
    if (searchCall.campaigns) {
      if (await this.isVisible(this.elements.removeCampaign)) {
        await this.click(this.elements.removeCampaign);
      }
      const multipleCampaigns = searchCall.campaigns.split(',');
      for (let i = 0; i < multipleCampaigns.length; i++) {
        await this.type(this.elements.campaign, multipleCampaigns[i]);
        await this.pressKey('Enter');
      }
    }
    if (searchCall.inboundQueue) {
      await this.type(this.elements.inboundQueue, searchCall.inboundQueue);
      await this.pressKey('Enter');
    }
    if (searchCall.database) {
      if (await this.isVisible(this.elements.removeDatabase)) {
        await this.click(this.elements.removeDatabase);
      }
      const multipleDatabase = searchCall.database.split(',');
      for (let i = 0; i < multipleDatabase.length; i++) {
        await this.type(this.elements.database, multipleDatabase[i]);
        await this.pressKey('Enter');
      }
    }
    if (searchCall.lead) {
      await this.waitForSelector(this.elements.lead);
      await this.click(this.elements.lead);
    }
    if (searchCall.calls) {
      await this.waitForSelector(this.elements.calls);
      await this.click(this.elements.calls);
    }
    if (searchCall.searchType === 'Contact') {
      await this.waitForSelector(this.elements.contactSearchType);
      await this.click(this.elements.contactSearchType);
    }
    if (searchCall.agents && searchCall.agents !== 'no') {
      if (await this.isVisible(this.elements.removeAgent)) {
        await this.click(this.elements.removeAgent);
      }
      await this.type(this.elements.agents, searchCall.agents);
      await this.pressKey('Enter');
    }
    if (searchCall.outcomes) {
      await this.type(this.elements.outcomes, searchCall.outcomes);
      await this.pressKey('Enter');
    }
    if (searchCall.startLoadDate) {
      await this.type(this.elements.startLoadDate, searchCall.startLoadDate);
      await this.pressKey('Enter');
    }
    if (searchCall.endLoadDate) {
      await this.type(this.elements.endLoadDate, searchCall.endLoadDate);
      await this.pressKey('Enter');
    }
    await this.waitForSelector(this.elements.searchButton);
    await this.forceClick(this.elements.searchButton);
  }

  /**
   * Function to validate the call data from crm
   * @param {object} datatable - object
   * @param {string} datatable.phoneNumber - contact number
   * @param {string} datatable.callDate - date
   * @param {string} datatable.agentName - name of agent
   * @param {string} datatable.callOutcome - outcome from call
   * @param {string} datatable.owner - owner
   * @param {string} datatable.termReason - term reason
   * @param {string} datatable.subtype - call subtype
   * @returns {void} nothing
   */
  async validateCall(datatable) {
    //wait for latest call to load
    await this.wait(2);
    await this.openCall();
    await this.waitForSelector(this.elements.callNumberValue);
    if (datatable.phoneNumber) {
      await this.shouldContainText(
        this.elements.callNumberValue,
        datatable.phoneNumber
      );
    }
    await this.shouldContainText(
      this.elements.callDateValue,
      datatable.callDate
    );
    await this.shouldContainText(
      this.elements.callAgentNameValue,
      datatable.agentName
    );
    await this.shouldContainText(
      this.elements.callOutcomeValue,
      datatable.callOutcome
    );
    await this.shouldContainText(this.elements.callOwnerValue, datatable.owner);
    await this.shouldContainText(
      this.elements.callTermReasonValue,
      datatable.termReason
    );
    if (datatable.subtype) {
      await this.shouldContainText(
        this.elements.callSubtypeValue,
        datatable.subtype
      );
    }
  }

  /**
   * function to open latest call in CRM
   * @return {void} Nothing
   */
  async openCall() {
    const count = await this.countElement(this.elements.callDateColumn);
    if (count > 0) {
      await this.waitForSelector(this.elements.callDateColumn);
      await this.click(this.elements.callDateColumn);
      await this.click(this.elements.callDateColumn);
      await this.wait(3); //added wait to load recent most row
      await this.click(this.elements.phoneNumberValue);
    } else {
      await this.waitForSelector(this.elements.clientDateColumn);
      await this.click(this.elements.clientDateColumn);
      await this.click(this.elements.clientDateColumn);
      await this.wait(3); //added wait to load recent most row
      await this.click(this.elements.clientPhoneNumberValue);
    }
  }

  /**
   * function to open selected call
   * @param {string} number - phone number
   * @return {void} Nothing
   */
  async openSelectedCall(number) {
    await this.waitForSelector(this.elements.callDateColumn);
    await this.click(this.elements.callDateColumn);
    await this.click(this.elements.callDateColumn);
    await this.wait(3); //added wait to load recent most row
    await this.click(
      `//table[@id='table_search_result_calls']//td[contains(text(),'${number}')]`
    );
  }

  /**
   * function to validate multiple calls in CRM
   * @param {object} datatable - call details table
   * @param {string} datatable.row - call row
   * @param {string} datatable.phoneNumber - phone number
   * @param {string} datatable.agentName - agent name
   * @param {string} datatable.callOutcome - call outcome
   * @param {string} datatable.owner - call owner
   * @param {string} datatable.termReason - termination reason
   * @param {string} datatable.subtype - sub type
   * @param {string} datatable.callDate - date of call
   * @return {void} Nothing
   */
  async validateCallDetails(datatable) {
    const selectRow = '#table-calls tr:nth-child(' + datatable.row + ')';
    await this.waitForSelector(selectRow + ' td:nth-child(3)');
    if (datatable.phoneNumber) {
      await this.shouldContainText(
        selectRow + ' td:nth-child(3)',
        datatable.phoneNumber
      );
    }
    if (datatable.callDate) {
      await this.shouldContainText(
        selectRow + ' td:nth-child(2)',
        datatable.callDate
      );
    }
    if (datatable.agentName) {
      await this.shouldContainText(
        selectRow + ' td:nth-child(6)',
        datatable.agentName
      );
    }
    await this.shouldContainText(
      selectRow + ' td:nth-child(7)',
      datatable.callOutcome
    );
    if (datatable.owner) {
      await this.shouldContainText(
        selectRow + ' td:nth-child(8)',
        datatable.owner
      );
    }
    if (datatable.termReason) {
      await this.shouldContainText(
        selectRow + ' td:nth-child(9)',
        datatable.termReason
      );
    }
    if (datatable.subtype) {
      await this.shouldContainText(
        selectRow + ' td:nth-child(10)',
        datatable.subtype
      );
    }
  }

  /**
   * function to validate remote transfer call
   * @param {object} datatable
   * @param {String} datatable.contactNo - the number to verify
   * @param {String} datatable.result - the result to verify
   * @return {void} Nothing
   */
  async verifyRemoteTransferCall(datatable) {
    await this.waitForSelector(this.elements.transferCallActionButton);
    await this.click(this.elements.transferCallActionButton);
    await this.waitForSelector(this.elements.remoteTransferTab);
    await this.click(this.elements.remoteTransferTab);
    await this.shouldContainText(
      this.elements.transferCallNumberText,
      datatable.contactNo
    );
    if (datatable.result) {
      await this.shouldContainText(
        this.elements.remoteTransferCallResult,
        datatable.result
      );
    }
  }

  /**
   * Function to validate the contact info
   * @param {object} contactInfo - object for contactinfo
   * @param {string} contactInfo.contactOutcome - contact outcome
   * @returns {void} nothing
   */
  async validateContactInfo(contactInfo) {
    // waiting here so that contact info page visible
    await this.wait(2);
    await this.waitForSelector(this.elements.contactInfoContainer);
    await this.shouldContainText(
      this.elements.contactOutcome,
      contactInfo.contactOutcome
    );
  }

  /**
   * Function to click callback tab
   * @returns {void} nothing
   */
  async clickCallbackTab() {
    await this.waitForSelector(this.elements.callbackTab);
    await this.click(this.elements.callbackTab);
  }

  /**
   * Function to validate scheduled callback
   * @returns {void} nothing
   */
  async validateScheduledCallback() {
    await this.click(this.elements.callbackId);
    await this.shouldVisible(this.elements.callbackState);
  }

  /**
   * Function to click script tab
   * @returns {void} nothing
   */
  async clickScriptTab() {
    await this.waitForSelector(this.elements.scriptTab);
    await this.click(this.elements.scriptTab);
  }

  /**
   * Function to validate recording available for script
   * @param {string} fileName - recording file name
   * @returns {void} nothing
   */
  async validateRecording(fileName) {
    await this.waitForSelector(this.elements.recordingButton);
    await this.click(this.elements.recordingButton);
    await this.waitForSelector(this.elements.recordingListModal);
    await this.waitForSelector(this.elements.recordingText);
    const recordingFileName = await this.getTexts(this.elements.recordingText);
    assert.equal(recordingFileName, fileName);
  }

  /**
   * Function to validate the call only from crm
   * @param {object} datatable - object
   * @param {string} datatable.phoneNumber - contact number
   * @param {string} datatable.callOutcome - outcome from call
   * @returns {void} nothing
   */
  async validateLead(datatable) {
    let contactOutcome = `//table[@id='table_search_result_clients']//td[contains(.,'${datatable.phoneNumber}')]/following-sibling::td[contains(.,'${datatable.callOutcome}')]`;
    await this.waitForSelector(contactOutcome);
  }

  /**
   * function to validate assisted Transfer
   * @param {object} callData - call details
   * @param {string} callData.row - data row
   * @param {string} callData.destination - destination queue
   * @param {string} callData.agent - agent name
   * @param {string} callData.result - call result
   * @return {void} Nothing
   */
  async validateAssistedTransfer(callData) {
    await this.waitForSelector(
      '#table-calls tr:nth-child(' + callData.row + ') .transfer-btn'
    );
    await this.click(
      '#table-calls tr:nth-child(' + callData.row + ') .transfer-btn'
    );
    await this.waitForSelector(this.elements.assistedTransferTab);
    if (callData.destination) {
      await this.shouldContainText(
        this.elements.transferQueue,
        callData.destination
      );
    }
    if (callData.agent) {
      await this.shouldContainText(this.elements.transferAgent, callData.agent);
    }
    if (callData.result) {
      await this.shouldContainText(
        this.elements.transferResult,
        callData.result
      );
    }
    await this.click(this.elements.closeTransferHistory);
  }

  /**
   * function to return on crm search tab
   * @return {void} Nothing
   */
  async return() {
    await this.click(this.elements.returnButton);
  }

  /**
   * function to validate contact transfer
   * @param {object} contactData - contact details
   * @param {string} contactData.transfer - transfer contact
   * @param {string} contactData.database - select database
   * @param {string} contactData.outcome - contact outcome
   * @param {string} contactData.actions - action on contact
   * @param {string} contactData.name - database name
   * @param {string} contactData.campaign - select campaign
   * @return {void} Nothing
   */
  async transferContacts(contactData) {
    await this.waitForSelector(this.elements.transferContact);
    await this.click(this.elements.transferContact);
    if (contactData.transfer) {
      let transferContact = `//span[contains(text(),'${contactData.transfer}')]`;
      await this.waitForSelector(transferContact);
      await this.click(transferContact);
    }
    if (contactData.name) {
      if (contactData.transfer === 'New database') {
        let randomDbName = await this.getRandomString('_database');
        global.newDBName.push(await randomDbName.toString());
        await this.click(this.elements.nameDatabase);
        await this.type(this.elements.nameDatabase, randomDbName);
        await this.pressKey('Enter');
      }
    }
    if (contactData.campaign) {
      await this.click(this.elements.transferCampaign);
      await this.type(this.elements.searchBox, contactData.campaign);
      await this.pressKey('Enter');
    }
    if (contactData.database) {
      await this.click(this.elements.transferDatabase);
      await this.type(this.elements.searchBox, contactData.database);
      await this.click(this.elements.databaseOption);
    }
    if (contactData.outcome) {
      if (contactData.transfer === 'New database') {
        await this.click(this.elements.newDbTransferOutcome);
      } else {
        await this.click(this.elements.transferOutcome);
      }
      await this.type(this.elements.searchBox, contactData.outcome);
      await this.pressKey('Enter');
    }
    if (contactData.actions) {
      let action;
      if (contactData.transfer === 'New database') {
        action = `//form[@id="form-create-database"]//span[text()='${contactData.actions}']`;
      } else {
        action = `//form[@id="form-transfer-database"]//span[text()='${contactData.actions}']`;
      }
      await this.click(action);
    }
    if (contactData.exclusive === 'false') {
      await this.click(this.elements.exclusiveDatabase);
    }
    await this.waitForSelector(this.elements.transferButton);
    await this.click(this.elements.transferButton);
  }

  /**
   * Function to open the crm submenu Template contact fields
   * @returns {void} nothing
   */
  async openTemplateContactFeild() {
    //add wait to load crm
    await this.wait(2);
    await this.waitForSelector(this.elements.crmManager);
    await this.mouseOver(this.elements.crmManager);
    await this.click(this.elements.templateField);
  }

  /**
   * Function to create new template
   * @param {Object} templateData - template data
   * @param {String} templateData.templateName - name of template
   * @param {String} templateData.fieldName - field name
   * @returns {void} nothing
   */
  async createNewTemplate(templateData) {
    await this.click(this.elements.newTemplateBtn);
    await this.waitForSelector(this.elements.templateName);
    await this.type(this.elements.templateName, templateData.templateName);
    await this.scrollIntoElement(this.elements.newFieldText);
    await this.type(this.elements.newFieldText, templateData.fieldName);
    if (templateData.campaign) {
      await this.waitForSelector(this.elements.selectCampaign);
      await this.type(this.elements.selectCampaign, templateData.campaign);
      await this.pressKey('Enter');
    }
    await this.click(this.elements.saveTemplateBtn);
    await this.click(this.elements.saveBtn);
  }

  /**
   * Function to verify change outcome button is disabled
   * @returns {void} nothing
   */
  async verifyChangeOutcomeDisabled() {
    await this.click(this.elements.searchButton);
    let buttonStatus = await this.getAttributeElement(
      this.elements.changeOutcomesBtn,
      'disabled'
    );
    await assert.equal('disabled', buttonStatus);
  }

  /**
   * Function to select contacts from search result
   * @param {Object} contacts - contacts data
   * @param {String} contacts.contactNames - contacts to select
   * @returns {void} nothing
   */
  async selectContacts(contacts) {
    if (contacts.contactNames === 'all') {
      await this.click(this.elements.allContactsCheckBox);
    } else {
      let contactsList = contacts.contactNames.split(',');
      for (let i = 0; i < contactsList.length; i++) {
        let contactCheckbox = `//table[@id='table_search_result_clients']//td[text()='${contactsList[i]}']/parent::tr//span`;
        await this.click(contactCheckbox);
      }
    }
  }

  /**
   * Function to change contact outcome
   * @param {Object} outcomeSettings - outcome settings
   * @param {String} outcomeSettings.changeTo - change outcome to New/another
   * @param {String} outcomeSettings.outcomeGroup - outcome group
   * @param {String} outcomeSettings.outcome - select outcome
   * @param {String} outcomeSettings.deleteCallbacks - delete callback true/false
   * @returns {void} nothing
   */
  async changeContactOutcome(outcomeSettings) {
    await this.waitForSelector(this.elements.changeOutcomesBtn);
    await this.click(this.elements.changeOutcomesBtn);
    if (outcomeSettings.changeTo === 'New') {
      await this.waitForSelector(this.elements.changeToNew);
      await this.click(this.elements.changeToNew);
      if (outcomeSettings.deleteAssociated === 'true') {
        await this.waitForSelector(this.elements.deleteAssociatedCallback);
        await this.click(this.elements.deleteAssociatedCallback);
      }
      if (outcomeSettings.maxPriority === 'true') {
        await this.waitForSelector(this.elements.maxPriority);
        await this.click(this.elements.maxPriority);
      }
      if (outcomeSettings.keepRecycleCounter === 'true') {
        await this.waitForSelector(this.elements.recycleCounter);
        await this.click(this.elements.recycleCounter);
      }
    } else if (outcomeSettings.changeTo === 'another') {
      await this.waitForSelector(this.elements.changeToOthers);
      await this.click(this.elements.changeToOthers);
      if (outcomeSettings.outcomeGroup) {
        await this.waitForSelector(this.elements.outcomeGroup);
        await this.click(this.elements.outcomeGroup);
        await this.verifyOutcomeGroups();
        await this.click(
          `//li[contains(@class, 'select2-results-dept-1')]/div[text()='${outcomeSettings.outcomeGroup}']`
        );
        await this.click(this.elements.selectOutcome);
        await this.click(
          `//li[contains(@class, 'select2-results-dept-0')]/div[text()='${outcomeSettings.outcome}']`
        );
        if (outcomeSettings.deleteCallbacks === 'true') {
          await this.waitForSelector(this.elements.deleteCallbacks);
          await this.click(this.elements.deleteCallbacks);
        }
      }
    }
    await this.click(this.elements.changeBtn);
  }

  /**
   * Function to verify outcome groups are visible
   * @returns {void} nothing
   */
  async verifyOutcomeGroups() {
    await this.isVisible(this.elements.selectOutcomeGroup);
    await this.isVisible(this.elements.createdOutcomeGroup);
  }

  /**
   * Function to delete template
   * @param {String} templateName - name of template to be deleted
   * @returns {void} nothing
   */
  async deleteTemplate(templateName='') {
    if (templateName) {
      await this.type(this.elements.searchTemplate, templateName);
      await this.click(this.elements.deleteTemplate);
      await this.click(this.elements.saveBtn);
    }else{
      await this.waitForSelector(this.elements.searchTemplate);
      if(await this.isVisible(this.elements.deleteIcon)){
        const totalTemplate = await this.countElement(this.elements.deleteIcons);
        for(var i = 0; i < totalTemplate; i++){
          await this.waitForSelector(this.elements.deleteIcon);
          await this.click(this.elements.deleteIcon);
          await this.waitForSelector(this.elements.saveBtn);
          await this.click(this.elements.saveBtn);
        }
      }
    }
  }

  /**
   * Function to verify CRM data corresponding to database
   * @param {Object} databaseDetails - name of template to be deleted
   * @param {string} databaseDetails.database - expected database names
   * @returns {void} nothing
   */
  async verifyCRM(databaseDetails) {
    //wait for result to load
    await this.wait(2);
    const rowCount = await this.countElement(this.elements.crmResultPhone);
    let phone = [];
    for (let i = 1; i <= rowCount; i++) {
      let loc = `#table_search_result_clients tbody tr:nth-child(${i}) td:nth-child(4)`;
      phone.push(await this.getText(loc));
    }
    if (databaseDetails.database === 'Empty') {
      assert.isTrue(rowCount === 0);
    } else {
      const DB_Name = databaseDetails.database;
      const databases = DB_Name.split(',');
      for (let j = 0; j < databases.length; j++) {
        const dbData = await this.readCsv(`fixtures/${databases[j]}.csv`);
        for (let i = 1; i < dbData.length; i++) {
          const expectedphoneNumber = dbData[i].split(',')[1];
          assert.isTrue(phone.includes(expectedphoneNumber));
        }
      }
    }
  }

  /**
   * Function to verify transfer button is disabled
   * @returns {void} nothing
   */
  async verifyTransferButtonDisabled() {
    //wait for page to load
    await this.wait(2);
    let buttonStatus = await this.getAttributeElement(
      this.elements.disabletransferButton,
      'disabled'
    );
    await assert.equal('disabled', buttonStatus);
  }

  /**
   * Function to verify message for disabled transfer
   * @param {String} message - message
   * @returns {void} nothing
   */
  async verifyTopMessage(message) {
    await this.shouldContainText(this.elements.transferContactsInfo, message);
  }

  async validateScriptCompletion(message, scriptName){
    await this.waitForSelector(this.elements.scriptActions);
    const pagePromise = context.waitForEvent('page');
    await page.click(this.elements.scriptActions);
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await newPage.locator(this.elements.scriptName).isVisible({ timeout: 50000 });
    let locatorText = await newPage.locator(this.elements.scriptName).innerText();
    expect(locatorText).contains(scriptName);
    await newPage.click(this.elements.validateBtn);
    await newPage.locator(this.elements.popup).isVisible({ timeout: 50000 });
    let locatorText2 = await newPage.locator(this.elements.popup).innerText();
    expect(locatorText2).contains(message);
  }
};
