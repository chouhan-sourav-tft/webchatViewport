/* global page*/
const { BaseAction } = require('../setup/baseAction');
const dayjs = require('dayjs');
const { assert } = require('chai');
exports.QualityManager = class QualityManager extends BaseAction {
  constructor() {
    super();
  }

  elements = {
    callDateColumn:
      '//table[@id="table_search_result_calls"]//thead/tr/th[contains(., "Date")]',
    phoneNumberValue:
      '#table_search_result_calls .odd:nth-child(1) td:nth-child(5)',
    qualityScript: '#quality-script-actions',

    auditDetails: '[id="script-label"]',
    auditState: '//span[@id="quality-audit-state"]/following-sibling::span',
    auditNote: '//span[@id="quality-audit-note"]/following-sibling::span',
    auditLastAuditor:
      '//span[@id="quality-audit-last-auditor"]/following-sibling::span',
    auditDate: '//span[@id="quality-audit-date"]/following-sibling::span',
    auditFirstAuditor:
      '//span[@id="quality-audit-first-auditor"]/following-sibling::span',
    backBtn: '[id="quality-page-top-back-btn"]',

    auditCallTable: {
      table: '//table[@id="table_search_result_calls"]/tbody',
      note: '//table[@id="table_search_result_calls"]/tbody/tr[1]//td[2]',
      phone: '//table[@id="table_search_result_calls"]/tbody/tr[1]//td[5]',
      agent: '//table[@id="table_search_result_calls"]/tbody/tr[1]//td[6]',
      fAuditor: '//table[@id="table_search_result_calls"]/tbody/tr[1]//td[9]',
      lauditor: '//table[@id="table_search_result_calls"]/tbody/tr[1]//td[10]',
      state: '//table[@id="table_search_result_calls"]/tbody/tr[1]//td[11]',
    },
    pointOption: 'a[data-translate="points"]',
    yesOptionPoint: '//label[text()="Yes"]//parent::div//input',
    noOptionPoint: '//label[text()="No"]//parent::div//input',
    kindaOptionPoint: '//label[text()="Kinda"]//parent::div//input',
    errorMessage: '#new-script-modal-error-ctn',
    savePoints: '//button[@id="save-answer-points-btn"]',
    script: '[id="s2id_quality-audit-script-selector"]',
    checkState:
      '//div[@id="quality-script-actions"]/following-sibling::div[1]//span[2]',
    startButton: '[id="quality-audit-start-btn"]',
    completeButton: '[id="quality-script-page-close-btn"]',
    pendingButton: '[id="quality-script-page-save-btn"]',
    outboundChannel: '#changel-search-input-ctn .fscontact-outbound-channel',
    inboundChannel: '#changel-search-input-ctn .fscontact-inbound-channel',
    selectCampaign: '#s2id_select_campaign',
    selectQueue: '#s2id_select_queue',
    selectInput: '#select2-drop input',
    selectAgent: '#s2id_select_agents',
    startLoadDate: '[id="startDate"]',
    endLoadDate: '[id="endDate"]',
    searchButton: 'button[type="submit"] span[data-translate="search"]',
    confirmButton: 'button[data-bb-handler="confirm"]',
    deleteButton: '[id="quality-audit-delete-btn"]',
    populatedElement:
      '#script_div input[class="checkbox scriptpopulating"] ~span',
    completeAudit:
      '//*[contains(@id,"ToolTables_table_search_result")]/*[text()="Complete audits"]',
    selectedTicketsCount:
      '//*[contains(@id,"ToolTables_table_search_result")]/w[1]',
    completeAuditPopUp:
      '//h4[contains(text(),"Complete audit")]/parent::div/following-sibling::div/div',
    mandatoryElementMissing:
      '//span[text()="Warning:"]/parent::div/span[@class="next_schedule_exception_note"]',
    closeCompleteAuditModal: '//button[@class="bootbox-close-button close"]',

    ticketChannel: '#changel-search-input-ctn .fscontact-tickets-channel i',
    queueName: '//div[@id="s2id_select_queue"]',
    ticketDateColumn:
      '//table[@id="table_search_result_ticket"]//thead/tr/th[contains(.,"Episode date")]',

    auditTicketTable: {
      table: '//table[@id="table_search_result_ticket"]/tbody',
      fAuditor:
        '#table_search_result_ticket  .odd:nth-child(1) td:nth-child(7)',
      lauditor:
        '#table_search_result_ticket  .odd:nth-child(1) td:nth-child(8)',
      state: '#table_search_result_ticket  .odd:nth-child(1) td:nth-child(9)',
      ticketID:
        '#table_search_result_ticket  .odd:nth-child(1) td:nth-child(3)',
      episodeAgent:
        '#table_search_result_ticket  .odd:nth-child(1) td:nth-child(4)',
      subject: '#table_search_result_ticket  .odd:nth-child(1) td:nth-child(5)',
    },
    searchTicketTable: '#table_search_result_ticket_filter input',
    inboundQueue: '#s2id_select_inbound_queue',
    auditSelect: '#select_audit_filter',
    phoneNumber: '#input_phone',
    callIDSortingDesc:
      '//table[@id="table_search_result_calls"]/thead/tr/th[3][@class="sorting_desc"]',
    noteSortingDesc: '//table[@id="table_search_result_calls"]/thead/tr/th[2][@class="sorting_desc"]',
    outcomeType: '#s2id_select-outcomes',
    sortByNote: '#table_search_result_calls thead tr th:nth-child(2)',
    selectOutcome: '#s2id_select-outcomes',
    auditedDate: '#q-a-audio-play-date-ctn',
    searchInput: '#table_search_result_calls_filter input',
    textinput: '//div[@id="script_div"] //div[@data-type="texto"] //input',
    topSuccessMessage: '.SmallBox.animated.fadeInRight.fast',
  };

  /**
   * Function to select the call from search result table
   * @returns {void} nothing
   */
  async selectCall() {
    await this.wait(15); //added wait to load the data table
    await this.waitForSelector(this.elements.callDateColumn);
    await this.click(this.elements.callDateColumn);
    await this.click(this.elements.callDateColumn);
    await this.wait(10); //added wait to load recent most row
    await this.click(this.elements.phoneNumberValue);
    await this.wait(15); //added wait to load script element
    await this.waitForSelector(this.elements.qualityScript);
  }

  /**
   * Validate specific call Audit data
   * @param {object} auditData
   * @param {String} auditData.state - state of the call audit data
   * @param {String} auditData.fAuditor - name of the auditor
   * @param {String} auditData.date - date of audit
   * @param {String} auditData.lAuditor - name of the auditor
   * @param {String} auditData.note - points value
   * @returns {void} nothing
   */
  async validateAuditData(auditData) {
    await this.wait(20); //wait required for frame to load
    await page
      .locator('(//span[@data-translate="quality.audit.loading"])[1]')
      .waitFor({ state: 'hidden' });
    await this.waitForSelector(this.elements.auditDetails);
    // adding wait for audit status to get updated
    await this.wait(10);
    await this.shouldContainText(this.elements.auditState, auditData.state);
    await this.waitForSelector(this.elements.auditFirstAuditor);
    await this.shouldContainText(
      this.elements.auditFirstAuditor,
      auditData.fAuditor
    );
    if (auditData.date === 'today') {
      await this.shouldContainText(
        this.elements.auditDate,
        dayjs().format('YYYY-MM-DD')
      );
    }
    await this.shouldContainText(
      this.elements.auditLastAuditor,
      auditData.lAuditor
    );
    await this.shouldContainText(this.elements.auditNote, auditData.note);
  }

  /**
   * Validate audit data from call table search results
   * @param {object} tableData
   * @param {String} tableData.state - state of the call audit data
   * @param {String} tableData.fAuditor - name of the auditor
   * @param {String} tableData.date - date of audit
   * @param {String} tableData.lAuditor - name of the auditor
   * @param {String} tableData.note - points value
   * @param {String} tableData.agent - agent name
   * @returns {void} nothing
   */
  async validateCallTableData(tableData) {
    await this.waitForSelector(this.elements.auditCallTable.table);
    await this.shouldContainText(
      this.elements.auditCallTable.note,
      tableData.note
    );
    await this.shouldContainText(
      this.elements.auditCallTable.phone,
      tableData.phone
    );
    await this.shouldContainText(
      this.elements.auditCallTable.fAuditor,
      tableData.fAuditor
    );
    await this.shouldContainText(
      this.elements.auditCallTable.lauditor,
      tableData.lAuditor
    );
    await this.shouldContainText(
      this.elements.auditCallTable.state,
      tableData.state
    );
  }

  /**
   * Validate audit data from ticket table search results
   * @param {object} tableData
   * @param {String} tableData.state - state of the ticket audit data
   * @param {String} tableData.fAuditor - name of the auditor
   * @param {String} tableData.lAuditor - name of the auditor
   * @param {String} tableData.episodeAgent - episode agent name
   * @param {String} tableData.subject - ticket subject
   * @returns {void} nothing
   */
  async validateTicketTableData(tableData) {
    await this.waitForSelector(this.elements.auditTicketTable.table);
    if (tableData.fAuditor) {
      await this.shouldContainText(
        this.elements.auditTicketTable.fAuditor,
        tableData.fAuditor
      );
    }
    if (tableData.lAuditor) {
      await this.shouldContainText(
        this.elements.auditTicketTable.lauditor,
        tableData.lAuditor
      );
    }
    if (tableData.state) {
      await this.shouldContainText(
        this.elements.auditTicketTable.state,
        tableData.state
      );
    }
    if (global.ticketID != '') {
      await this.shouldContainText(
        this.elements.auditTicketTable.ticketID,
        global.ticketID
      );
    }
    if (tableData.episodeAgent) {
      await this.shouldContainText(
        this.elements.auditTicketTable.episodeAgent,
        tableData.episodeAgent
      );
    }
    if (tableData.subject) {
      await this.shouldContainText(
        this.elements.auditTicketTable.subject,
        tableData.subject
      );
    } else if (global.emailSubject != '') {
      if (global.emailSubjectOld != '') {
        await this.shouldContainText(
          this.elements.auditTicketTable.subject,
          global.emailSubjectOld
        );
      } else {
        await this.shouldContainText(
          this.elements.auditTicketTable.subject,
          global.emailSubject
        );
      }
    }
  }

  /**
   * function to configure points to the elements of script
   * @param  {String} element - name of element to add points
   * @param  {String} inputDetails - point value to be added
   */
  async fillPoints(element, inputDetails) {
    await this.waitForSelector(this.elements.pointOption);
    await this.click(this.elements.pointOption);
    if (element === 'oneresponse') {
      if (inputDetails.yes) {
        await this.waitForSelector(this.elements.yesOptionPoint);
        await this.click(this.elements.yesOptionPoint);
        await this.clearField(this.elements.yesOptionPoint);
        await this.type(this.elements.yesOptionPoint, inputDetails.yes);
      }
      if (inputDetails.no) {
        await this.waitForSelector(this.elements.noOptionPoint);
        await this.click(this.elements.noOptionPoint);
        await this.clearField(this.elements.noOptionPoint);
        await this.type(this.elements.noOptionPoint, inputDetails.no);
      }
    }
    if (element === 'checks') {
      if (inputDetails.yes) {
        await this.waitForSelector(this.elements.yesOptionPoint);
        await this.click(this.elements.yesOptionPoint);
        await this.clearField(this.elements.yesOptionPoint);
        await this.type(this.elements.yesOptionPoint, inputDetails.yes);
      }
      if (inputDetails.kinda) {
        await this.waitForSelector(this.elements.kindaOptionPoint);
        await this.click(this.elements.kindaOptionPoint);
        await this.clearField(this.elements.kindaOptionPoint);
        await this.type(this.elements.kindaOptionPoint, inputDetails.kinda);
      }
      if (inputDetails.no) {
        await this.waitForSelector(this.elements.noOptionPoint);
        await this.click(this.elements.noOptionPoint);
        await this.clearField(this.elements.noOptionPoint);
        await this.type(this.elements.noOptionPoint, inputDetails.no);
      }
    }
    await this.click(this.elements.savePoints);
  }

  /**
   * Function to select Script
   * @param {string} scriptName - script to be added
   * @returns {void} nothing
   */
  async selectScript(scriptName) {
    await this.wait(15); //added wait to load the page
    await this.waitForSelector(this.elements.qualityScript);
    await this.waitForSelector(this.elements.script);
    await this.click(this.elements.script);
    let selectOption = `//div[@id="select2-drop"]//ul//li[contains(., '${scriptName}')]`;
    await this.click(selectOption);
  }

  /**
   * Function to verify state of Audit
   * @param {string} auditType - type of audit
   * @returns {void} nothing
   */
  async verifyStateOfAudit(auditType) {
    await this.wait(20); //script load takes time when status is changed from search results
    if (auditType === 'not audited') {
      await this.shouldContainText(this.elements.checkState, auditType);
    } else {
      await this.shouldContainText(this.elements.auditState, auditType);
    }
  }

  /**
   * Function to search the call
   * @param {object} searchCall - object to search a call
   * @param {string} outbound - select outbound
   * @param {string} inbound - select inbound
   * @param {string} campaign - select campaign
   * @param {string} agents - select agents
   * @param {string} startLoadDate - select start Load Date
   * @param {string} endLoadDate - select end load Date
   * @param {string} inboundQueue - inbound queue name
   * @param {string} audit - select audit type
   * @param {string} phone - enter phone number
   * @param {string} auditedDate - audit date
   * @returns {void} nothing
   */
  async searchCall(searchCall, auditedDate = '') {
    //wait for ticket to appear after sending mail
    await this.wait(10);
    if (searchCall.outbound) {
      await this.click(this.elements.outboundChannel);
    }
    if (searchCall.inbound) {
      await this.click(this.elements.inboundChannel);
    }
    if (searchCall.ticket) {
      await this.click(this.elements.ticketChannel);
    }
    if (searchCall.campaigns) {
      await this.click(this.elements.selectCampaign);
      await this.type(this.elements.selectInput, searchCall.campaigns);
      await this.pressKey('Enter');
    }
    if (searchCall.agents && searchCall.agents !== 'no') {
      await this.click(this.elements.selectAgent);
      await this.type(this.elements.selectInput, searchCall.agents);
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
    if (searchCall.queue) {
      await this.click(this.elements.queueName);
      await this.type(this.elements.selectInput, searchCall.queue);
      await this.pressKey('Enter');
    }
    if (searchCall.inboundQueue) {
      await this.click(this.elements.inboundQueue);
      await this.type(this.elements.selectInput, searchCall.inboundQueue);
      await this.pressKey('Enter');
    }
    if (searchCall.audit) {
      await this.selectOptionByValue(
        this.elements.auditSelect,
        searchCall.audit
      );
    }
    if (searchCall.phone) {
      await this.type(this.elements.phoneNumber, searchCall.phone);
    }
    await this.click(this.elements.searchButton);
    if (auditedDate) {
      await this.waitForSelector(this.elements.searchInput);
      await this.type(this.elements.searchInput, auditedDate);
      await this.pressKey('Enter');
      await this.wait(2);//wait to load filter applied
    }
  }

  /**
   * Function to select option
   * @param {string} option - select option
   * @returns {void} nothing
   */
  async selectOption(option) {
    await this.wait(7); //added wait to load the script fields
    if (option === 'Start' || option === 'Edit') {
      await this.waitForSelector(this.elements.startButton);
      await this.click(this.elements.startButton);
    } else if (option === 'Delete') {
      await this.waitForSelector(this.elements.deleteButton);
      await this.click(this.elements.deleteButton);
      await this.waitForSelector(this.elements.confirmButton);
      await this.click(this.elements.confirmButton);
    } else if (option === 'Pending') {
      await this.waitForSelector(this.elements.pendingButton);
      await this.click(this.elements.pendingButton);
    } else if (option === 'Complete') {
      await this.waitForSelector(this.elements.completeButton);
      await this.click(this.elements.completeButton);
      await this.waitForSelector(this.elements.confirmButton);
      await this.click(this.elements.confirmButton);
    } else if (option === 'Back') {
      await this.click(this.elements.backBtn);
    }
  }

  /**
   * Function to fill the script
   * @param {object} fillScriptObject - script values object
   * @param {string} fillScriptObject.oneresponse - select oneresponse
   * @param {string} fillScriptObject.checks - select checks
   * @returns {void} nothing
   */
  async fillScript(fillScriptObject) {
    //added wait to load script options
    await this.wait(3);
    if (fillScriptObject.oneresponse) {
      let valueLocator = `#script_div input[type='radio'][value='${fillScriptObject.oneresponse}']~span`;
      await this.click(valueLocator);
    }
    if (fillScriptObject.checks) {
      if (await this.isVisible(this.elements.populatedElement)) {
        await this.click(this.elements.populatedElement);
      }
      let valueLocator = `#script_div input[type='checkbox'][value='${fillScriptObject.checks}']~span`;
      await this.click(valueLocator);
    }
    if (fillScriptObject.textinput) {
      await this.type(this.elements.textinput, fillScriptObject.textinput);
    }
  }

  /**
   * Select multiple calls entries from the search results
   * @param {string} count
   * @param {string} callsType - pending or complete
   * @param {string} scriptType - calls or ticket
   * @returns {void} nothing
   */
  async selectMultipleCalls(count, scriptType, callsType) {
    //wait for table to load
    await this.wait(5);
    if (scriptType === 'calls') {
      await this.waitForSelector(this.elements.callDateColumn);
    }
    if (scriptType === 'tickets') {
      await this.waitForSelector(this.elements.auditTicketTable.table);
    }
    for (let i = 1; i <= count; i++) {
      await this.forceClick(
        '(//td[text()="' +
        callsType +
        '"]/parent::tr//input[@type="checkbox"])[' +
        i +
        ']'
      );
    }
    let selectedCount = await this.getText(this.elements.selectedTicketsCount);
    await assert.equal(selectedCount, 'Selected ' + count + ' ' + scriptType);
  }

  /**
   * Complete Audits Of Selected Calls
   * @returns {void} nothing
   */
  async completeAuditsOfSelectedCalls(message) {
    await this.wait(10); //wait for loading
    await this.click(this.elements.completeAudit);
    await this.waitForSelector(this.elements.confirmButton);
    if (message === 'error') {
      await this.wait(2); //error to visible
      let warning = await this.isVisible(this.elements.mandatoryElementMissing);
      assert.isTrue(warning);
      await this.click(this.elements.closeCompleteAuditModal);
    } else {
      let pendingStatus = 'pending';
      await this.wait(2);//wait to load button status
      await this.waitForSelector(this.elements.completeAuditPopUp);
      await this.shouldContainText(
        this.elements.completeAuditPopUp,
        ` selected audits that are in the '${pendingStatus}' state?`
      );
      await this.click(this.elements.confirmButton);
      await this.waitForSelector(this.elements.topSuccessMessage);
      await this.wait(2);//wait to load button status
    }
  }

  /**
   * Function to select the ticket from search result table
   * @returns {void} nothing
   */
  async selectTicket() {
    await this.wait(5); //added wait to load the data table
    await this.waitForSelector(this.elements.ticketDateColumn);
    await this.click(this.elements.ticketDateColumn);
    await this.click(this.elements.ticketDateColumn);
    await this.wait(10); //added wait to load recent most row
    await this.click(this.elements.auditTicketTable.ticketID);
  }

  /**
   * Function to search the ticket in search ticketTable
   * @param {string} input - search input
   * @returns {void} nothing
   */
  async searchTicketTable(input) {
    await this.wait(15); //added wait to load the data table
    await this.waitForSelector(this.elements.searchTicketTable);
    await this.click(this.elements.searchTicketTable);
    await this.type(this.elements.searchTicketTable, input);
    await this.pressKey('Enter');
  }

  /**
   * Validate audit data from call table for multiple rows
   * @param {object} tableData
   * @param {String} tableData.state - state of the call audit data
   * @param {String} tableData.fAuditor - name of the auditor
   * @param {String} tableData.date - date of audit
   * @param {String} tableData.lAuditor - name of the auditor
   * @param {String} tableData.note - points value
   * @param {String} tableData.agent - agent name
   * @param {String} tableData.phone - phone number
   * @returns {void} nothing
   */
  async validateCallTableDetails(tableData) {
    await this.waitForSelector(this.elements.sortByNote);
    await this.click(this.elements.sortByNote);
    await this.wait(2);//wait to load sorting
    await this.click(this.elements.sortByNote);
    await this.waitForSelector(this.elements.noteSortingDesc);
    const selectRow =
      '//table[@id="table_search_result_calls"]/tbody/tr[' +
      tableData.row +
      ']';
    await this.waitForSelector(selectRow);
    await this.shouldContainText(selectRow + '//td[2]', tableData.note);
    await this.shouldContainText(selectRow + '//td[5]', tableData.phone);
    await this.shouldContainText(selectRow + '//td[6]', tableData.agent);
    await this.shouldContainText(selectRow + '//td[9]', tableData.fAuditor);
    await this.shouldContainText(selectRow + '//td[10]', tableData.lAuditor);
    await this.shouldContainText(selectRow + '//td[11]', tableData.state);
  }
  /**
     * function to get audited date text
     * @return {String} Date String
     */
  async getAuditedDate() {
    const auditDate = await this.getTexts(this.elements.auditedDate);
    return auditDate;
  }
};
