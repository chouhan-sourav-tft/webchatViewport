/*global page*/

const { assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');
const fs = require('fs');
const { SearchPage } = require('../page-objects/SearchPage.po');
const { userData } = require('../fixtures/data.json');
const searchPage = new SearchPage();
let subjectHash = '';
let tikID = [];
let primaryTicketID = '';
let secondaryTicketID = '';
let currentTicketID = '';
let currentTicketSubject = '';

exports.ticketsOnline = class ticketsOnline extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    pageId: '#tickets-workspace',
    searchButton: '//span[@translate=\'main.btn_search\']/..',
    agentTab:
      '//div[@ng-model="openedTicket.agent.id"]//div[@class="limit-characters"]',
    queueCount: 'ul.queues-list li a[title="VTTicketQueue"] span:nth-child(2)',
    emailSuccess: '.SmallBox.animated.fadeInRight.fast',
    lastPage: '#pagination.btn-group .btn[title="Last Page"]',
    emailBtn: 'span[translate="detail.email"]',
    ticketReplyFromDropdown: '#s2id_from-response',
    ticketReplySubjectdropdown: '//div[@id="s2id_subject-response"]',
    ticketReplySubjectDropdownList:
      'ul[id*=\'select2-results\'] ul li:nth-child(1)',
    ticketReplyTemplateDropdown: '#s2id_template-response',
    inputField: '#select2-drop input',
    replyButton: '.response-btns > button:nth-child(1)',
    forwardButton: 'button[ng-click*=forward]',
    returnButton: 'button[ng-click="returnToInbox()"]',
    forwardDropdown: '#forward-button-wrapper button[data-toggle="dropdown"]',
    forwardWithAttach:
      '#forward-button-dropdown-menu a[translate="detail.forward_attach"]',
    ticketStateNew: '[translate="main.status_new"]',
    ticketStateOpen: '[translate="main.status_open"]',
    releaseTicketModal:
      '//label[text()="Do you want to release 1 tickets? Tickets in OPEN or PENDING state will change to NEW state."]',
    releaseTicketBtn: 'button[ng-click="releaseTickets()"]',
    Check_Uncheck: 'a[title="Check/Uncheck All"]',
    customFilterMenu:
      '//span[contains(@translate,"search.filters") and text()="Custom Filters"]',
    customFilterstatus: '//label[@translate="search.filters_status"]/..//input',
    filterEmail: '//input[@placeholder="example@domain.com"]',
    filterSubject: '//label[text()="Subject"]/following-sibling::div/input',
    filterAgent: '//label[@translate="search.filters_agents"]/..//input',
    searchFilterBtn: '//button[@ng-click="submitTicketSearch()"]',
    ticketSearchResults: '(//table[@aria-describedby="search-table_info"]/tbody[@role="alert"]/tr)[1]',
    ticketOptionEmail: 'span[translate="detail.email"]',
    ticketOptionRelease: 'span[translate="detail.release"]',
    editPriorityBtn: 'button[title="Change Priority"]',
    editQueueBtn: 'button[title="Change Queue"]',
    selectQueue: 'div[placeholder="Select a queue..."]',
    queueInputField: 'input[placeholder="Select a queue..."]',
    saveQueueBtn: 'button[title="Save Queue"]',
    selectPriority: 'div[placeholder="Select a priority..."]',
    priorityInputField: 'input[placeholder="Select a priority..."]',
    priorityExistField: 'div[placeholder="Select a priority..."] span',
    savePriorityBtn: 'button[title="Save Priority"]',
    replyToEpisodeBtn: '(//span[@title="Reply to this episode"]/i)[1]',
    replyToEpisodeText:
      'span[ng-bind-html="getReplyingToEpisodeActionDescriptionMessage()"]',
    subjectDropDown:
      '//label[@translate="detail.subject"]/..//span[text()="Select a Subject"]',
    replyMail: 'span[translate="detail.reply"]',
    replyWait: 'span[translate="plugins.send.reply_wait"]',
    sendMailBtn: 'a[translate="plugins.send.send_btn_title"]',
    greenPopUP: '[id*="smallbox"] span',

    messageBtnYES:
      '//div[@class="MessageBoxButtonSection"]/button[text()=" Yes"]',
    messageBoxBtn: '//div[@class="MessageBoxMiddle"]',

    ticketShowBtn: '//i[@data-translate="sendTickets"]',
    singleTicketSendBtn: 'li#btnSingleTicketSend',
    sendEmailScreenTitle: '//div[@id="ticket-manual-send-ws"]//h1//span',
    sendEmailForm: {
      queue: {
        click: '//form//div[@id="s2id_send-email-queue"]',
        input: '//div[@id="select2-drop"]//input',
      },
      mailbox: {
        click: '//form//div[@id="s2id_send-email-mailbox"]//a',
        input: '//div[@id="select2-drop"]//input',
      },
      subject: {
        click: '//form//div[@id="s2id_send-email-subject"]//a',
        input: '#select2-drop .select2-search input',
        keepSubject: '#save-subject-checkbox > label > span',
      },
      template: {
        click: '//form//div[@id="s2id_send-email-template"]//a',
        input: '//div[@id="select2-drop"]//input',
      },
      formButton: {
        next: '#send-email-btn',
        click:
          '#send-ticket-horizontal-form > div > form > div > div > div > span.pull-left.spaced-btn-group > button.btn.btn-icon.btn-default.react-to-pointer-event-on-disabled',
      },
      modalElement: {
        title: {
          text: 'Send e-mail',
          element: '#modal-send > div > div > div.modal-header > h4 > span',
        },
        to: '#modal-send > div > div > div.modal-body > form > fieldset > div:nth-child(2) > div > div > contacts-autocomplete-directive > div input.token-input.ui-autocomplete-input',
        cc: '#modal-send > div > div > div.modal-body > form > fieldset > div:nth-child(3) > div > div > contacts-autocomplete-directive > div input.token-input.ui-autocomplete-input',
        bcc: '#modal-send > div > div > div.modal-body > form > fieldset > div:nth-child(4) > div > div > contacts-autocomplete-directive > div input.token-input.ui-autocomplete-input',
        subject:
          '#modal-send > div > div > div.modal-body > form > fieldset > div:nth-child(5) > div > div > input',
        tag: {
          click: '.select2-container#s2id_modal-send-tag',
          select: '#select2-drop ul li',
        },
        sendButton: '#modal-send .modal-footer .btn.btn-primary',
        reply: {
          reply: 'span[translate="plugins.send.reply"]',
          wait: 'span[translate="plugins.send.reply_wait"]',
          close: 'span[translate=\'plugins.send.reply_close\']',
        },
      },
    },
    ticketChannelButton: {
      channelButton: '#channel-tickets-connection-toggle',
      searchScreenElements: {
        primaryFilter: {},
        dateFilter: {
          titleElement: '#filters-panel-2 a',
          startDateElementInput: '#search-start-date',
          endDateElementInput: '#search-end-date',
        },
        customFilter: {
          titleElement:
            '//span[contains(@translate,"search.filters") and text()="Custom Filters"]',
          status: {
            element: '#filters-3 > div > div:nth-child(4) ul > li input',
          },
        },
      },
      mergeButton: 'span[translate="detail.merge"]',
      toggleButton: '[class="btn btn-default dropdown-toggle"]',
      emailElement: 'a[translate="plugins.merge.email"]',
      inputText:
        '#modal-merge > div > div > div.modal-body > div:nth-child(1) > div:nth-child(2) > div > input',
      searchMergeButton: 'span[translate="plugins.merge.search"]',
      selectTicket: '//div[(contains(@class,"tickets-searched")) and not(contains(@class,"disabled"))][1]//i[@title="Add to merge list"]',
      selectPrimaryTicket: 'input[ng-model="primaryTicket"]',
      mergeAndOpenButton:
        '#modal-merge > div > div > div.modal-footer > button:nth-child(1)',
      commentsButton: '#ticket-info > li:nth-child(2) > a',
      newCommentButton: '[class="pull-right"]>button:nth-child(1)',
      inputComment:
        '[class="ticket-render-comments-form form-horizontal"]>fieldset>div>textarea',
      saveCommentButton: '[class="btn btn-success"]',
      editCommentIcon: 'span[title="Edit Comment"] i',
      deleteCommentIcon: 'span[title="Remove Comment"] i',
      deleteYesButton: '[id="bot2-Msg1"]',
    },
    ticketManagerMenu: '#fs-menu ul li #menu_17',
    mailboxRule: '//span[@data-translate="manager-mailbox-rules"]',
    createNewRule:
      '//span[@data-translate="manager-mailbox-rules-field-newrule"]',
    ruleNameInput: '//input[@id="mailbox-wiz-rules-form-name-input"]',
    ruleFromInput:
      '//input[@id="mailbox-wiz-rules-form-from-input-tokenfield"]',
    ruleSubjectInput:
      '//input[@id="mailbox-wiz-rules-form-ticketstatus-subject-input"]',
    ticketStatus: '//span[text()="Select Ticket Status..."]',
    ticketStatusField: '//div[@id="select2-drop"]//input',
    clickOnOk: '[class="btn btn-success foot-btn add-btn"]',
    saveRule: '//span[@data-translate="manager-mailbox-save"]',
    validateActivateRule: '[class="animated fadeInRight fast"]',
    ruleboxCount: '//tr[contains(@id,"mailbox-rule-line")]',
    ruleboxTable: '#mm-rule > fieldset > div > fieldset > div > table',
    mailboxRuleDelete: '//tr//a[@class="btn btn-xs btn-default remove-btn"][1]',
    clickOnTicketManager:
      '//span[contains(@class,"menu") and text()="Tickets"]/..',
    clickOnMailbox: '//a[@data-translate="manager-main-mailbox"]',
    attachmentFileSizeBox: '[id="spinner-mailbox"]',
    disabledCreateTicketButton: '//button[@ng-class="{disabled: fileUpload.options.maxFileSizeExceed}"]',
    popUp: '(//*[@id="divSmallBoxes"])[1]',
    clickOnInbound:
      '//table[@id="tm-dt-mailbox"]//td[text()="VTMailboxIn"]/..//button[@title="Edit"]',

    filterTicketID: 'input[ng-model="form.ticketId"]',
    newTicketsTabCount:
      '//span[@translate="main.status_new"]/following-sibling::span',

    modalMerge: '#modal-merge',
    primaryTicket:
      '//input[@ng-click="removePrimary()"]//parent::label//parent::div//parent::div/following-sibling::div/following-sibling::div//span[2]',
    secondaryTicket:
      '//input[(contains(@ng-model,"primaryTicket")) and not(contains(@ng-click,"removePrimary()"))]//parent::label//parent::div//parent::div/following-sibling::div/following-sibling::div//span[2]',
    primaryTicketCheck: '.ticket-id span',
    returnTab: '//span[@translate="detail.return"]',
    searchTicketSubject: '.ticket-subject',
    sendEmailMotSubject: '.ticket-subject',
    sendEmailModal:
      '//i[@id="header-modal-icon"]/following-sibling::span[@translate="plugins.send_email.title"]',
    links: {
      createTicketLinkShowBtn: '//div[@id="tickets-show-btn"]',
      createTicketList: 'li#btnSingleTicket',
      ticketChannel: '.ws-link-tickets span#channel-tickets-connection-toggle',
      ticketWorkspace: '#tickets-workspace',
      returnToInbox: '//span[@translate="search.btn_return"]',
      activeQueueLink: '.inbox-menu-lg.queues-list li.active span',
      logoutButton: '[class="logout-btn"]',
    },
    form: {
      createTicketForm: 'div#create-ticket-horizontal-form',
      email_input: '//input[@ng-model="form.email"]',
      phone_input: '//input[@ng-model="form.contact"]',
      queueListClick: 'div#s2id_queue-select',
      queueListValidate: 'div#s2id_queue-select a span.select2-chosen',
      queueInput: 'div#select2-drop input',
      subjectListClick: 'div#s2id_subject-select',
      subjectResponseListClick: 'div#s2id_subject-response',
      subjectListValidate: 'div#s2id_subject-select a span.select2-chosen',
      subjectInput: 'div#select2-drop input',
      subjectSelect: '#select2-drop ul.select2-result-sub li',
      templateInput:
        '[id="summernote-create"]~div>div:nth-child(3)>div:nth-last-child(1)',
      create_ticket_btn: '//button[@ng-click="submit(false)"]',
      destinationEm: '#modal-send .form-group:nth-child(2) input.token-input',
      emailSub: '#modal-send .form-group:nth-child(5) input.form-control',
    },
    search: {
      searchTable: '//table[@id="search-table"]',
      pendingButton: '[translate="main.status_pending"]',
      searchButton: 'span[translate="main.btn_search"]',
      searchEmail: '//*[@id="filters-1"]/div/div[1]/div/input',
      searchPhone: '//input[@ng-model="form.phone"]',
      searchSubject: '//input[@ng-model="form.subject"]',
      searchTableRow: '#search-table tbody tr:nth-child(1)',
      ticketStatusText:
        '#search-table > tbody > tr:nth-child(1) > td:nth-child(4)',
      filterByDate: '#filters-panel-2 a',
      startDateInputTextbox: '#search-start-date',
      endDateInputTextbox: '#search-end-date',
      customFilter:
        '//span[contains(@translate,"search.filters") and text()="Custom Filters"]',
      ticketStatusTextBox: '#filters-3 > div > div:nth-child(4) ul > li input',
      searchSubmit: 'span[translate="search.btn_search"]',
      lastButton: '[id="pagination"]>a[title="Last Page"]',
      updatedSort: '#inbox-table > thead > tr > th.col-last-update',
      clickOnEndDate: '//input[@id="search-end-date"]/..//i',
    },
    button: {
      replyBtn: '//span[@translate="detail.reply"]',
      replyClose: 'span[translate=\'plugins.send.reply_close\']',
      moreOption: 'button span[translate="detail.moreActions"]',
      spamBtn: 'li[ng-click="clickSpam()"]',
      spamYes: '#bot2-Msg1',
    },
    attach: {
      clickToBrowse:
        '#create-ticket-horizontal-form > div > form > div > div > div > span.pull-left.spaced-btn-group > span#attach-title > button',
    },
    ticket: {
      pendingStatus: '//span[text()="PENDING"]',
      ticketId: '[class="ticket-id label"]>span',
    },
    userGroupParentMenu: 'a[data-title="Users"]',
    usersGroup: 'a[data-title="Users & Groups"]',
    users_list: '#user-agents-len-ctn',
    user_filter: '#agents_search_input',
    user_filtered: '.panel-list-item.list-group-item.filtered',
    saveUser: 'button[name="save_user_button"]',
    queuePermission: '#s2id_tickets_queue_permissions li input',
    tickets_link: '#menu_2',
    ticketManager: '#menu_17',
    slaTemp: '#s2id_select-sla',
    slaTempInput: '.select2-drop-active input',
    saveQueue: 'span[data-translate="manager-queue-save"]',
    cancelQueue: '#tm-button-cancel',
    slaTemplate: '#menu_18',
    slaFilter: '#sla-list_filter input',
    autoDeliveryBtn: '#btn-automatic-delivery',
    saveAutoDelivery: 'button[data-translate="slaManager.saveAuto"]',
    saveTemplate: '#sla-template-save',
    queueFilterInput: '#tm-dt-queue_filter input',
    ticketSubject: 'span.ticket-subject',
    showPendingList: 'button[ng-click="showPendingList()"]',
    autoCheck_span: 'span[data-translate="agent-automatic-ticket-delivery"]',
    ticketLabelID: '//span[@class="ticket-id label"]/span',
    ticketLabelSubject: '//span[@class="ticket-subject"]',
    callNumberButton: '#voice-field-first_phone-btn',
    clickSubject: '#s2id_close-subject-select',
    ticketComment: 'textarea[ng-model="modal.closeComment"]',
    ticketCloseSubmit: 'button[translate="modals.close.closeBtn"]',
    messageSuccess: '.SmallBox.animated.fadeInRight.fast',
    contactHistory: '.contact-history-ctn li:first-child',
    ticketCall: 'span[translate="detail.call"]',
    scriptTab: 'a[data-target="#ticket-info-scripts"]',
    scriptLabel: '//div[@id="ticket-info-scripts-ctn"]/div[contains(@id,"multi_script") and not (@style ="display: none;")]//div[contains(@class,"current-script-page-div")]//input',
    selectScript: '//select[@id="ticket-info-scripts-selector"]',
    ticketQueue1: 'a[title="TicketQueue_1"]',
    ticketQueue2: 'a[title="TicketQueue_2"]',
    ticketCheckBox: 'th[class="inbox-table-icon cursor-pointer"]',
    mergeOption: 'a[ng-click="changeQueueMultiple()"]',
    newQueue: '[id="s2id_new-queue-select"]',
    newQueueTextBox: '//div[@id="select2-drop"]//input',
    selectTicketQueue: '.select2-results li:first-child div span:first-child',
    changeOption: 'button[ng-click="setNewQueue()"]',
    selectNoneQueue: '.fscontact-tickets-channel .agent-qct-select-none',
    queueHeader: 'h2[data-translate="manager-main-queue"]',
    channelButton: '#channel-tickets-connection-toggle',
    subjectSelector: '#inbox-table tbody tr:first-child td:nth-child(6)',
    closeBtn: 'span[translate="detail.close"]'
  };

  /**
   * function to switch channel
   * @param {string} channelName - channel name
   * @return {void} Nothing
   */
  async switchChannelToggle(channelName) {
    if (channelName === 'voice') {
      await this.waitForSelector(`#channel-${channelName}-label-text`);
      await this.click(`#channel-${channelName}-label-text`);
    } else {
      await this.waitForSelector(`#channel-${channelName}-connection-toggle`);
      await this.click(`#channel-${channelName}-connection-toggle`);
    }
  }

  /**
   * function to select ticket in active state
   * @param {string} state - state of ticket
   * @return {void} Nothing
   */
  async selectTicketsActiveState(state) {
    await page.waitForLoadState('load');
    await this.wait(5); //need this wait because tickets list fluctuate when page is load
    if (state === 'open') {
      await this.click(this.elements.ticketStateNew);
      await this.scrollIntoElement(this.elements.ticketStateNew);
    } else if (state === 'new') {
      await this.click(this.elements.ticketStateOpen);
      await this.scrollIntoElement(this.elements.ticketStateOpen);
    } else {
      await this.click('[translate="main.status_' + state + '"]');
    }
    await this.wait(2); // need this wait till status update
  }

  /**
   * function to select ticket from ticket list
   * @param {string} count - index
   * @return {void} Nothing
   */
  async selectTicketFromTicketList(count) {
    for (let i = 1; i <= count; i++) {
      await this.forceClick(
        'tr.animated.fast.fadeInRight:nth-child(' + i + ') input.checkbox'
      );

      tikID.push([
        await this.getText(
          'tr.animated.fast.fadeInRight:nth-child(' + i + ') td:nth-child(3)'
        ),
      ]);
    }
  }

  /**
   * function to search ticket by id
   * @return {void} Nothing
   */
  async searchTicketByTicketID() {
    for (let i = 0; i < tikID.length; i++) {
      await this.waitForSelector(this.elements.filterTicketID);
      await this.type(this.elements.filterTicketID, String(tikID[i][0]));
      await searchPage.searchTheFilter();
      await searchPage.getEmailDetailOpen();
      await this.validateAgent('NoAgent');

      await this.click(this.elements.returnTab);
    }

    tikID = [];
    await page.reload({ waitUntil: 'load' });
  }

  /**
   * function to release selected ticket
   * @param {string} option - option
   * @return {void} Nothing
   */
  async releaseSelectedTickets(option) {
    await this.click('a[title="' + option + '"]');
    await this.isVisible(this.elements.releaseTicketModal);
    await this.click(this.elements.releaseTicketBtn);
    await this.waitForSelector(
      '//span[contains(text(),"Release ticket")]/following-sibling::p[contains(text(),"released and changed to NEW state.")]'
    );
    const releaseGreen = await this.isVisible(
      '//span[contains(text(),"Release ticket")]/following-sibling::p[contains(text(),"released and changed to NEW state.")]'
    );
    assert.isTrue(releaseGreen);

    await page
      .locator(
        '//span[contains(text(),"Release ticket")]/following-sibling::p[contains(text(),"released and changed to NEW state.")]'
      )
      .waitFor({ state: 'hidden' });
  }

  /**
   * function to click ticket manager
   * @return {void} Nothing
   */
  async ticketManager() {
    await this.mouseOver(
      '//span[contains(@class,"menu") and text()="Tickets"]/..'
    );
    await this.forceClick(this.elements.ticketManagerMenu);
  }

  async fetchNewTicketsCounter() {
    await this.waitForSelector(this.elements.newTicketsTabCount);
    await this.waitForResponse(
      global.TICKET_COUNTER
    );
    let counterText = await this.getText(this.elements.newTicketsTabCount);
    counterText = await counterText.replace(/[{()}]/g, '');
    counterText = await counterText.trim();
    return counterText;
  }

  /**
   * function to get updated ticket counter after trimmed
   * @return {string} counter
   */
  async getUpdatedNewTicketsCounter() {
    let counterText = await this.getText(this.elements.newTicketsTabCount);
    counterText = await counterText.replace(/[{()}]/g, '');
    counterText = await counterText.trim();
    return counterText;
  }

  /**
   * function to edit ticket manager tab entity
   * @param {string} tab - tab name
   * @param {string} tabEntity - tab entity name
   * @return {void} Nothing
   */
  async editTicketManagerTabEntity(tabEntity, tab) {
    await this.click(
      '//table[@id="tm-dt-' +
      tab +
      '"]//td[text()="' +
      tabEntity +
      '"]/..//button[@title="Edit"]'
    );
  }

  /**
   * function to create rule
   * @param {string} ruleName - rulename
   * @param {string} from - send to
   * @param {string} status - status
   * @param {string} subject - subject string
   * @return {void} Nothing
   */
  async createRule(ruleName, from, status, subject) {
    await this.wait(5); //flacky fast UI
    await this.click(this.elements.mailboxRule);
    await this.click(this.elements.createNewRule);
    await this.type(this.elements.ruleNameInput, ruleName);
    await this.waitForSelector(this.elements.ruleFromInput);
    await this.type(this.elements.ruleFromInput, from);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.ticketStatus);
    await this.click(this.elements.ticketStatus);
    await this.forceClick(this.elements.ticketStatusField);
    await this.waitForSelector(this.elements.ticketStatusField);
    await this.type(this.elements.ticketStatusField, status);
    await this.pressKey('Enter');
    await this.type(this.elements.ruleSubjectInput, subject);
    await this.waitForSelector(this.elements.clickOnOk);
    await this.click(this.elements.clickOnOk);
  }

  /**
   * function to activate rule
   * @param {string} ruleName - rulename
   * @return {void} Nothing
   */
  async activateRule(ruleName) {
    this.waitForSelector(`//td[text()="${ruleName}"]/..//input/../i`);
    await this.click(`//td[text()="${ruleName}"]/..//input/../i`);
    await this.click(this.elements.saveRule);
    await page.locator(this.elements.validateActivateRule, {
      hasText: 'Mailbox successfully edited!',
    });
  }

  /**
   * function to validate close ticket
   * @param {string} option - option
   * @param {string} newSubject - subject string
   * @return {void} Nothing
   */
  async ValidateCloseTicket(option, newSubject) {
    await this.wait(15); //needs this wait because take time to load subject
    await this.waitForSelector(
      `//td[text()='${option}']/following-sibling::td[contains(@title,'${newSubject}')]/..`
    );
    let mail = await page
      .locator(
        `//td[text()='${option}']/following-sibling::td[contains(@title,'${newSubject}')]/..`
      )
      .isVisible();
    assert.isTrue(mail);
  }

  /**
   * function to delete rule
   * @param {string} mailBoxName - name of the mailBox
   * @return {void} Nothing
   */
  async deleteRule(mailBoxName) {
    await this.wait(5);
    await this.mouseOver(this.elements.clickOnTicketManager);
    await this.waitForSelector(this.elements.ticketManagerMenu);
    await this.click(this.elements.ticketManagerMenu);
    await this.wait(5); // added wait to load the page
    try {
      await this.click(this.elements.clickOnMailbox);
    } catch (error) {
      await this.forceClick(this.elements.queueHeader);
      await this.click(this.elements.clickOnMailbox);
    }
    await this.click(`//table[@id="tm-dt-mailbox"]//td[text()="${mailBoxName}"]/..//button[@title="Edit"]`);
    await this.wait(5); //flack fast UI
    await this.click(this.elements.mailboxRule);
    await this.waitForSelector(this.elements.ruleboxTable);
    if (this.isVisible(this.elements.ruleboxCount)) {
      let count = await this.countElement(this.elements.ruleboxCount);
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          await this.wait(1); //waiting to list update if long
          await this.click(this.elements.mailboxRuleDelete);
        }
      }
    }
    await this.wait(1); //waiting for page to be cleared
    await this.waitForSelector(this.elements.saveRule);
    await this.click(this.elements.saveRule);
    await page.locator(this.elements.validateActivateRule, {
      hasText: 'Mailbox successfully edited!',
    });
  }

  /**
   * function to delete rule
   * @param {string} queueName - name of queue
   * @return {void} Nothing
   */
  async selectActiveQueue(queueName) {
    await this.waitForSelector(this.elements.Check_Uncheck);
    await this.click(this.elements.Check_Uncheck);
    await this.waitForSelector('//a[@title="' + queueName + '"]');
    await this.click('//a[@title="' + queueName + '"]');
  }

  /**
   * function to search ticket
   * @param {string} filter - filter string
   * @return {void} Nothing
   */
  async searchTicket(filter) {
    await this.waitForSelector(this.elements.searchButton);
    await this.click(this.elements.searchButton);
    if (filter.includes('ticketEpisode')) {
      await page.locator(this.elements.customFilterMenu).click();
      await page.type(this.elements.customFilterstatus, 'open');
      await this.pressKey('Enter');
      await this.type(this.elements.filterAgent, 'All');
      await this.pressKey('Enter');
    } else {
      await this.type(this.elements.filterEmail, filter);
    }
    await this.waitForSelector(this.elements.searchFilterBtn);
    await this.wait(10);
    await this.click(this.elements.searchFilterBtn);
    await this.waitForSelector(this.elements.ticketSearchResults);
    await this.forceClick(this.elements.ticketSearchResults);
    await this.waitForSelector(this.elements.searchTicketSubject);
  }

  /**
   * function to change ticket priority
   * @param {string} priority - priority of ticket
   * @return {void} Nothing
   */
  async changeTicketPriority(priority) {
    await this.click(this.elements.editPriorityBtn);
    await this.click(this.elements.selectPriority);
    await this.type(this.elements.priorityInputField, priority);
    priority = priority.toLowerCase();
    await this.click('div[translate="detail.priority_' + priority + '"]');
    await this.click(this.elements.savePriorityBtn);
    await page.locator(this.elements.priorityExistField, {
      hasText: 'Priority successfully changed!',
    });
  }

  /**
   * function to change ticket queue
   * @param {string} queue - queue
   * @return {void} Nothing
   */
  async changeTicketQueue(queue) {
    await this.click(this.elements.editQueueBtn);
    await this.click(this.elements.selectQueue);
    await this.type(this.elements.queueInputField, queue);
    await this.click(`div[title='${queue}']`);
    await this.click(this.elements.saveQueueBtn);
  }

  /**
   * function to select ticket option
   * @param {string} option - options
   * @return {void} Nothing
   */
  async ticketOption(option) {
    await this.wait(5); //waiting for the option to be visible
    if (option === 'E-mail') {
      if (await page.locator(this.elements.ticketOptionRelease).isVisible()) {
        await this.click(this.elements.ticketOptionRelease);
        if (await page.locator(this.elements.messageBoxBtn).isVisible()) {
          await this.click(this.elements.messageBtnYES);
        }
        this.waitForSelector(this.elements.greenPopUP);
        await page.locator(this.elements.greenPopUP, { hasText: 'Success' });
      }

      await this.click(this.elements.ticketOptionEmail);
    } else if (option.includes('Release')) {
      if (await page.locator(this.elements.ticketOptionEmail).isVisible()) {
        await this.click(this.elements.ticketOptionEmail);
        this.waitForSelector(this.elements.greenPopUP);
        await page.locator(this.elements.greenPopUP, { hasText: 'Success' });
      }
      await this.click(this.elements.ticketOptionRelease);
      if (await page.locator(this.elements.messageBoxBtn).isVisible()) {
        await this.click(this.elements.messageBtnYES);
      }
    }
    await page.locator(this.elements.greenPopUP, { hasText: 'Success' });

    currentTicketID = await this.getText(this.elements.ticketLabelID);
    currentTicketSubject = await this.getText(this.elements.ticketLabelSubject);
  }

  /**
   * function to reply to episode
   * @param {string} subject - subject name
   * @return {void} Nothing
   */
  async replyToEpisode(subject) {
    await this.waitForSelector(this.elements.replyToEpisodeBtn);
    await this.forceClick(this.elements.replyToEpisodeBtn);

    await page.locator(this.elements.replyToEpisodeText, {
      hasText: 'Replying to episode VTSubjectTree / VTSubjectChild',
    });
    await this.click(this.elements.subjectDropDown);
    await this.forceClick(
      '//ul[@role="listbox"]//div[@title="' + subject + '"]'
    );
    await this.waitForSelector(this.elements.replyMail);
    await this.click(this.elements.replyMail);
    await this.waitForSelector(this.elements.replyMail);
    await this.click(this.elements.replyWait);
    await this.waitForSelector(this.elements.sendMailBtn);
    await this.click(this.elements.sendMailBtn);
    await page.locator(this.elements.greenPopUP, { hasText: 'Success' });
  }

  /**
   * function to click nav bar
   * @return {void} Nothing
   */
  async clickNavBarButton() {
    await this.wait(3); //page loads too fast
    await this.waitForSelector(this.elements.ticketShowBtn);
    await this.click(this.elements.ticketShowBtn);
  }

  /**
   * function to click send email button
   * @return {void} Nothing
   */
  async clickSendEmailBtn() {
    await this.waitForSelector(this.elements.singleTicketSendBtn);
    await this.click(this.elements.singleTicketSendBtn);
  }

  /**
   * function to check send email screen title
   * @param {string} title - title name
   * @return {void} Nothing
   */
  async checkSendEmailScreenTitle(title) {
    await this.waitForSelector(this.elements.sendEmailScreenTitle);
    this.shouldContainText(this.elements.sendEmailScreenTitle, title);
  }

  /**
   * function to fill form fields
   * @param {string} queue - queue
   * @param {string} subject - subject name
   * @param {string} mailbox - mailbox name
   * @param {string} template - template name
   * @return {void} Nothing
   */
  async fillFormFields(queue, subject, mailbox, template) {
    //Queue
    try {
      await this.click(this.elements.sendEmailForm.queue.click);
    } catch (error) {
      await this.click(this.elements.sendEmailForm.queue.click);
    }
    await this.type(this.elements.sendEmailForm.queue.input, queue);
    await this.pressKey('Enter');

    //MailBox
    await this.click(this.elements.sendEmailForm.mailbox.click);
    await this.type(this.elements.sendEmailForm.mailbox.input, mailbox);
    await this.pressKey('Enter');

    //subject
    await this.click(this.elements.sendEmailForm.subject.click);
    await this.type(this.elements.sendEmailForm.subject.input, subject);
    await this.pressKey('ArrowDown');

    await this.pressKey('Enter');
    await this.click(this.elements.sendEmailForm.subject.keepSubject);

    //Template
    await this.waitForSelector(this.elements.sendEmailForm.template.click);
    await this.click(this.elements.sendEmailForm.template.click);
    await this.type(this.elements.sendEmailForm.template.input, template);
    await this.pressKey('Enter');
  }

  /**
   * function to attach file
   * @param {string} page - page type
   * @param {string} filePath - filepath as string
   * @return {void} Nothing
   */
  async browsAttachment(page, filePath) {
    if (page === 'ticket') {
      await this.uploadFile(this.elements.attach.clickToBrowse, filePath);
      await this.wait(1); ///attachment to add
    }
    if (page === 'email') {
      await this.uploadFile(
        this.elements.sendEmailForm.formButton.click,
        filePath
      );
    }
  }

  /**
   * function to click next button
   * @return {void} Nothing
   */
  async nextButton() {
    await this.click(this.elements.sendEmailForm.formButton.next);
    await this.waitForSelector(this.elements.sendEmailModal);
  }

  /**
   * function to open modal
   * @return {void} Nothing
   */
  async modalOpen() {
    if (
      (await this.isVisible(
        this.elements.sendEmailForm.modalElement.title.element
      )) &&
      (await this.shouldContainText(
        this.elements.sendEmailForm.modalElement.title.element,
        this.elements.sendEmailForm.modalElement.title.text
      ))
    ) {
      await this.log('modal open');
    }
  }

  /**
   * function to email model to reply all
   * @param {string} to - send to email
   * @param {string} subject - subject string
   * @param {string} replyType - type of reply
   * @param {string} cc - send cc email
   * @param {string} bcc - send bcc email
   * @return {void} Nothing
   */
  async emailModalToReplyAll(to, subject = '', replyType, cc = '', bcc = '') {
    if (to) {
      const emails = to.split(',');
      for (const email of emails) {
        await this.type(this.elements.sendEmailForm.modalElement.to, email);
        await this.pressKey('Enter');
      }
    }
    if (cc) {
      const CCs = cc.split(',');
      for (const cc of CCs) {
        await this.type(this.elements.sendEmailForm.modalElement.cc, cc);
        await this.pressKey('Enter');
      }
    }
    if (bcc) {
      const BCCs = bcc.split(',');
      for (const bcc of BCCs) {
        await this.type(this.elements.sendEmailForm.modalElement.bcc, bcc);
      }
    }
    if (subject !== '') {
      await this.type(
        this.elements.sendEmailForm.modalElement.subject,
        subject
      );
    }
    //tag
    await this.click(this.elements.sendEmailForm.modalElement.tag.click);
    await this.click(this.elements.sendEmailForm.modalElement.tag.select, true);

    if (replyType === 'reply') {
      await this.waitForSelector(
        this.elements.sendEmailForm.modalElement.reply.reply
      );
      await this.click(
        this.elements.sendEmailForm.modalElement.reply.reply,
        true
      );
    } else if (replyType === 'reply and wait') {
      await this.waitForSelector(
        this.elements.sendEmailForm.modalElement.reply.wait
      );
      await this.click(
        this.elements.sendEmailForm.modalElement.reply.wait,
        true
      );
    } else {
      await this.waitForSelector(
        this.elements.sendEmailForm.modalElement.reply.close
      );
      await this.click(
        this.elements.sendEmailForm.modalElement.reply.close,
        true
      );
    }
  }

  /**
   * function to click email model send
   * @return {void} Nothing
   */
  async emailModalSend() {
    await this.click(this.elements.sendEmailForm.modalElement.sendButton, true);
  }

  /**
   * function to click ticket channel screen
   * @return {void} Nothing
   */
  async ticketChannelScreen() {
    await this.waitForSelector(this.elements.ticketChannelButton.channelButton);
    await this.click(this.elements.ticketChannelButton.channelButton);
  }

  /**
   * function to click comment option
   * @return {void} Nothing
   */
  async clickCommentOption() {
    await this.click(this.elements.ticketChannelButton.commentsButton);
  }

  /**
   * function to click new comment button
   * @return {void} Nothing
   */
  async clickNewCommentButton() {
    await this.click(this.elements.ticketChannelButton.newCommentButton);
  }

  /**
   * function to write comment
   * @return {void} Nothing
   */
  async writeComment(comment) {
    await this.type(this.elements.ticketChannelButton.inputComment, comment);
  }

  /**
   * function to click save comment
   * @return {void} Nothing
   */
  async clickSaveCommentButton() {
    await this.clickFirstElement(
      this.elements.ticketChannelButton.saveCommentButton
    );
  }

  /**
   * function to edit comment
   * @param {string} comment - string as comment
   * @return {void} Nothing
   */
  async editComment(comment) {
    await this.clickFirstElement(
      this.elements.ticketChannelButton.editCommentIcon
    );
    await this.wait(2);
    await this.type(this.elements.ticketChannelButton.inputComment, comment);
    await this.clickFirstElement(
      this.elements.ticketChannelButton.saveCommentButton
    );
  }

  /**
   * function to delete comment
   * @return {void} Nothing
   */
  async deleteComment() {
    await this.clickFirstElement(
      this.elements.ticketChannelButton.deleteCommentIcon
    );
    await this.click(this.elements.ticketChannelButton.deleteYesButton);
  }

  /**
   * function to click search option by email
   * @param {string} - ticket id
   * @return {void} Nothing
   */
  async clickSearchOptionByTicketId(ticketId) {
    await this.type(this.elements.ticketChannelButton.inputText, ticketId);
    await this.pressKey('Enter');
  }

  /**
   * function to add ticket
   * @return {void} Nothing
   */
  async addTicket() {
    await this.clickFirstElement(
      this.elements.ticketChannelButton.selectTicket
    );
  }

  /**
   * function to select primary ticket
   * @return {void} Nothing
   */
  async selectPrimaryTicket() {
    await this.clickFirstElement(
      this.elements.ticketChannelButton.selectPrimaryTicket
    );
    primaryTicketID = await this.getText(this.elements.primaryTicket);
    primaryTicketID = primaryTicketID.trim();
    secondaryTicketID = await this.getText(this.elements.secondaryTicket);
    secondaryTicketID = secondaryTicketID.trim();
  }

  /**
   * function to click merge and open button
   * @return {void} Nothing
   */
  async clickMergeAndOpenButton() {
    await this.click(this.elements.ticketChannelButton.mergeAndOpenButton);
    await this.waitForSelector(this.elements.emailSuccess);
  }

  /**
   * function to verify ticket merged
   * @return {void} Nothing
   */
  async verifyTicketMerged() {
    //Wait to load text on this element
    await this.wait(3);
    await this.shouldContainText(
      this.elements.primaryTicketCheck,
      primaryTicketID
    );
    let secondaryTicketCheck = `//span[text()[contains(.,'${secondaryTicketID}')]]`;
    await this.waitForSelector(secondaryTicketCheck);
  }

  /**
   * function to click merge
   * @return {void} Nothing
   */
  async clickMerge() {
    await this.waitForSelector(this.elements.button.moreOption);
    await this.click(this.elements.button.moreOption);
    await this.waitForSelector(this.elements.ticketChannelButton.mergeButton);
    await this.wait(2); //Waits to load the button
    await this.click(this.elements.ticketChannelButton.mergeButton);
    await this.waitForSelector(this.elements.modalMerge);
  }

  /**
   * Function to check if requested element is displayed on page
   * @param {string} element - element string
   * @returns {void} nothing
   */
  async verifyTicketChannelPageDisplayed(element) {
    if (element === 'createTicketForm') {
      await this.isVisible(this.elements.form.createTicketForm);
    }
    if (element === 'Tickets') {
      await this.isVisible(this.elements.links.ticketWorkspace);
    }
  }

  /**
   * Function to fill Create ticket form & submit
   * @param {object} data - object create ticket
   * @param {string} data.email - email id
   * @param {string} data.phone - phone number
   * @param {string} data.queue - queue name
   * @param {number} data.autodelivery - autodelivery number
   * @returns {void} - nothing
   */
  async fillCreateTicket(data) {
    subjectHash = this.userID_Alpha_Numeric();
    await this.waitForSelector(this.elements.form.email_input);
    if (data.email) await this.type(this.elements.form.email_input, data.email);
    if (data.phone) await this.type(this.elements.form.phone_input, data.phone);
    //check if already queue exist
    await this.waitForSelector(this.elements.form.queueListClick);
    await this.click(this.elements.form.queueListClick);
    await this.type(this.elements.form.queueInput, data.queue);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.form.subjectListClick);
    //check if subject dropdown has value
    await this.click(this.elements.form.subjectListClick);
    if (data.autodelivery) {
      await this.type(
        this.elements.form.subjectInput,
        subjectHash + data.autodelivery
      );
    } else {
      await this.type(this.elements.form.subjectInput, subjectHash);
    }
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.form.templateInput);
    //input template value
    await this.type(this.elements.form.templateInput, data.template);
    await this.pressKey('Enter');
    if (data.autodelivery) {
      if (data.autodelivery === '1') {
        let subjects = {
          subject1: subjectHash + data.autodelivery,
        };
        let datas = JSON.stringify(subjects, null, 2);
        fs.writeFile(userData.autoDelivery, '', function () { });
        fs.writeFile(userData.autoDelivery, datas, function (err) {
          if (err) throw err;
        });
      }
      if (data.autodelivery === '2') {
        fs.readFile(userData.autoDelivery, (err, datap) => {
          let json = JSON.parse(datap);
          json.subject2 = subjectHash + data.autodelivery;
          fs.writeFile(
            userData.autoDelivery,
            JSON.stringify(json),
            function (err) {
              if (err) throw err;
            }
          );
        });
      }
    }
  }

  /**
   * Validate if form fields are filled successfully
   * @param {object} data - object
   * @param {string} data.email - email id
   * @param {string} data.phone - phone number
   * @returns {void} - nothing
   */
  async validateForm(data) {
    await this.containSubstring(
      data.email,
      await this.getValueFromTextInput(this.elements.form.email_input)
    );
    await this.containSubstring(
      data.phone,
      await this.getValueFromTextInput(this.elements.form.phone_input)
    );
    await this.shouldContainSomeText(this.elements.form.queueListValidate);
    await this.shouldContainSomeText(this.elements.form.subjectListValidate);
  }

  /**
   * function to logout from ticket channel
   * @returns {void} - nothing
   */
  async ticketChannelLogout() {
    await this.waitForSelector(this.elements.links.logoutButton);
    await this.forceClick(this.elements.links.logoutButton);
  }

  /**
   * Function to click on requested element
   * @param {string} eleData - different elements
   * @param {string} data - queue name
   * @returns {void} - nothing
   */
  async elementClick(eleData, data = '') {
    await this.wait(5); //page loads too fast
    if (eleData === 'Tickets Newwindow') {
      await this.waitForSelector(
        this.elements.links.ticketChannel,
        'second'
      );
      await this.forceClick(this.elements.links.ticketChannel, 'second');
    }
    if (eleData === 'SLA') {
      await this.waitForSelector(this.elements.tickets_link);
      await this.mouseOver(this.elements.tickets_link);
      await this.forceClick(this.elements.slaTemplate);
    }
    if (eleData === 'Users & Groups') {
      await this.waitForSelector(this.elements.userGroupParentMenu);
      await this.mouseOver(this.elements.userGroupParentMenu);
      await this.click(this.elements.usersGroup);
    }
    if (eleData === 'Ticket Manager') {
      await this.waitForSelector(this.elements.tickets_link);
      await this.mouseOver(this.elements.tickets_link);
      await this.forceClick(this.elements.ticketManager);
    }
    if (eleData === 'Create Ticket') {
      await this.wait(4); // for create ticket link to be visible
      await this.waitForSelector(this.elements.links.createTicketLinkShowBtn);
      await this.forceClick(this.elements.links.createTicketLinkShowBtn);
      await this.waitForSelector(this.elements.links.createTicketList);
      await this.click(this.elements.links.createTicketList);
    }
    if (eleData === 'createTicket') {
      await this.click(this.elements.form.create_ticket_btn);
    }
    if (eleData === 'Tickets') {
      await this.waitForSelector(this.elements.links.ticketChannel, 8000);
      await this.click(this.elements.links.ticketChannel);
    }
    if (eleData === 'search') {
      await this.click(this.elements.search.searchButton);
    }
    if (eleData === 'search-table') {
      await this.click(this.elements.search.searchTableRow);
    }
    if (eleData === 'email') {
      await this.click(this.elements.emailBtn);
    }
    if (eleData === 'return') {
      await this.click(this.elements.links.returnToInbox);
    }
    if (eleData === 'queue') {
      await this.waitForSelector(this.elements.links.activeQueueLink);
      if (await this.isVisible(this.elements.links.activeQueueLink)) {
        const selectQueue = `//li[contains(@ng-class, '{active: isQueueActive(q.uuid)}') and contains(.//span, '${data}')]`;
        await this.click(selectQueue);
      }
    }
    if (eleData === 'spam') {
      await this.click(this.elements.button.moreOption);
      await this.waitForSelector(this.elements.button.spamBtn);
      await this.click(this.elements.button.spamBtn);
    }
    if (eleData === 'spamYes') {
      await this.click(this.elements.button.spamYes);
    }
  }

  /**
   * Function to add filters for search
   * @param {object} data - data object for search filter
   * @param {string} data.startDate - start date
   * @param {string} data.endDate - end date
   * @param {string} data.status - status
   * @param {string} data.email - email
   * @param {string} data.phone - phone number
   * @returns {void} nothing
   */
  async addFilters(data) {
    const search = this.elements.ticketChannelButton.searchScreenElements;
    await this.wait(3);//date filter option
    await this.waitForSelector(search.dateFilter.titleElement);
    await this.click(search.dateFilter.titleElement);
    if (data.startDate) {
      await this.type(search.dateFilter.startDateElementInput, data.startDate);
      await this.pressKey('Enter');
    }
    if (data.endDate) {
      await this.type(search.dateFilter.endDateElementInput, data.endDate);
      await this.pressKey('Enter');
    }
    //Custom filter options
    await this.click(search.customFilter.titleElement);
    if (data.status) {
      await this.type(search.customFilter.status.element, data.status);
      await this.pressKey('Enter');
    }
    if (data.email) {
      await this.type(this.elements.search.searchEmail, data.email);
    }
    if (subjectHash) {
      await this.type(this.elements.search.searchSubject, subjectHash);
    }
    if (data.phone) {
      await this.type(this.elements.search.searchPhone, data.phone);
    }
    await this.waitForSelector(this.elements.search.searchSubmit);
    await this.click(this.elements.search.searchSubmit);
  }

  /**
   * Validate search result
   * {string} status
   * @returns {void} nothing
   */
  async validateSearchResult() {
    const subTitle = `${this.elements.search.searchTable} //tr[1]//td[@title = "${subjectHash}"]`;
    await this.waitForSelector(this.elements.search.searchTable);
    await this.waitForSelector(subTitle);
    await this.shouldVisible(subTitle);
    const newStatus = `${this.elements.search.searchTable} //tr[1]//td[contains(., "NEW")]`;
    await this.shouldVisible(newStatus);
  }

  /**
   * Reply on Ticket
   * @param {string} scriptName - name of the script
   * @returns {void} nothing
   */
  async replyOnTicket(scriptName) {
    await this.waitForSelector(this.elements.form.subjectResponseListClick);
    await this.click(this.elements.form.subjectResponseListClick);
    await this.click(this.elements.form.subjectSelect);
    //Adding this code to add script element in case of available
    if (await this.isVisible(this.elements.scriptTab)) {
      await this.click(this.elements.scriptTab);
      if (await this.isVisible(this.elements.selectScript)) {
        await this.mouseOver(this.elements.selectScript);
        await this.waitForSelector(this.elements.selectScript);
        await this.dropdownOptionSelect(this.elements.selectScript, scriptName);
      }
      if (await this.isVisible(this.elements.scriptLabel)) {
        await this.click(this.elements.scriptLabel);
      }
    }
    await this.waitForSelector(this.elements.button.replyBtn);
    await this.click(this.elements.button.replyBtn);
  }

  /**
   * Function to fill reply modal
   * @param {string} to - email ids to
   * @param {boolean} [replywithclose=true] - reply and close
   * @returns {void} nothing
   */
  async emailModalToReply(to, replywithclose = true) {
    if (to) {
      const emails = to.split(',');
      for (const email of emails) {
        await this.waitForSelector(this.elements.form.destinationEm);
        await this.type(this.elements.form.destinationEm, email);
      }
    }
    await this.type(this.elements.form.emailSub, subjectHash);
    if (replywithclose) {
      await this.click(this.elements.button.replyClose, true);
    }
  }

  async mailVerify(sentToEmail, subject = subjectHash) {
    await this.mailCheck(sentToEmail, subject);
  }

  /**
   * Function to validate attachment
   * @param {string} attachment - verify attached
   * @returns {void} nothing
   */
  async validateAttachment(attachment) {
    const attachedFile = `#ticket-render-episodes .btn-download-single[download="${attachment}"]`;
    await this.waitForSelector(attachedFile);
    await this.shouldVisible(attachedFile);
  }

  /**
   * Function to validate attachment
   * @param {boolean} [isClick=false] - if need to click
   * @returns {void} nothing
   */
  async validateTicket(isClick = false) {
    //wait for elements to load
    await this.wait(5);
    await this.waitForSelector(this.elements.lastPage);
    let last = page.locator(this.elements.lastPage);
    const classAttribute = await last.getAttribute('class');
    if (!classAttribute.includes('disable')) {
      await this.click(this.elements.lastPage);
    }
    const checkSubject = `td[title='${subjectHash}']`;
    //wait for last page to load
    await this.wait(5);
    await this.waitForSelector(checkSubject);
    await this.isVisible(checkSubject);
    await this.waitForSelector(checkSubject);
    if (isClick) {
      await this.click(checkSubject);
    }
  }

  /**
   * Function to validate attachment
   * @param {string} subjectHash - if need to click
   * @returns {void} nothing
   */
  async validateDataTableResultData(status) {
    const checkSubject = `#search-table td[title='${subjectHash}']`;
    await this.waitForSelector(checkSubject);
    await this.shouldVisible(checkSubject);
    await this.shouldContainText(this.elements.search.ticketStatusText, status);
  }

  /**
   * Function to add search filter
   * @param {string} startDate - startdate
   * @param {string} endDate - end date
   * @param {string} status - status
   * @returns {void} nothing
   */
  async addSearchFilters(startDate, endDate, status) {
    await this.wait(3);//date filter option
    await this.click(this.elements.search.filterByDate);
    await this.type(this.elements.search.startDateInputTextbox, startDate);
    await this.type(this.elements.search.endDateInputTextbox, endDate);
    await this.click(this.elements.search.clickOnEndDate);

    //Custom filter options
    await this.click(this.elements.search.customFilter);
    await this.type(this.elements.search.ticketStatusTextBox, status);
    await this.pressKey('Enter');
  }

  /**
   * Function to search the filter
   * @returns {void} nothing
   */
  async searchTheFilter() {
    await this.click(this.elements.search.searchSubmit);
  }

  /**
   * Function to click on last button
   * @returns {void} nothing
   */
  async clickOnLastButton() {
    await this.waitForSelector(this.elements.search.lastButton);
    //wait for notifications to disappear
    await this.wait(4);
    const last = page.locator(this.elements.search.lastButton);
    const classAttribute = await last.getAttribute('class');
    if (!classAttribute.includes('disable')) {
      await this.waitForSelector(this.elements.search.lastButton);
      await this.forceClick(this.elements.search.lastButton);
    }
  }

  /**
   * Function to click on pending state
   * @returns {void} nothing
   */
  async clickPendingState() {
    await this.click(this.elements.search.pendingButton);
  }

  /**
   * Function to select updated sort
   * @returns {void} nothing
   */
  async selectUpdatedSort() {
    await this.scrollIntoElement(this.elements.search.updatedSort);
    await this.click(this.elements.search.updatedSort);
    await this.click(this.elements.search.updatedSort);
    // waiting for results to appear after sort
    await this.wait(3);
  }

  /**
   * Function to open created ticket
   * @param {string} email - emailid
   * @returns {void} nothing
   */
  async openCreatedTicket(email) {
    const ela = `[title="${email}"]`;
    await this.waitForSelector(ela);
    await this.clickFirstElement(ela, true);
  }

  /**
   * Function to open created ticket
   * @param {string} ticketStatus - ticket status
   * @returns {void} nothing
   */
  async getTicketStatus(ticketStatus) {
    await this.shouldContainText(
      this.elements.ticket.pendingStatus,
      ticketStatus
    );
  }

  /**
   * Function to open latest ticket
   * @returns {void} nothing
   */
  async openLatestTicket() {
    await this.click(this.elements.subjectSelector);
  }

  /**
   * Function to verify ticket id
   * @param {string} ticketId - ticket id
   * @returns {void} nothing
   */
  async verifyTicketId(ticketId) {
    await this.containSubstring(ticketId, await this.getTicketId());
  }

  /**
   * Function to get ticket id
   * @returns {string} return ticketid
   */
  async getTicketId() {
    await this.waitForSelector(this.elements.ticket.ticketId);
    const id = await this.getText(this.elements.ticket.ticketId);
    return id;
  }

  /**
   * Function to map sla queue
   * @param {string} queue - queue name
   * @param {string} sla - sla name
   * @returns {void} nothing
   */
  async mapSLAQueue(queue, sla) {
    await this.waitForSelector(this.elements.queueFilterInput);
    await this.type(this.elements.queueFilterInput, queue);
    await this.pressKey('Enter');
    let editQueue =
      '//td[text()="' +
      queue +
      '"]/following-sibling::td[last()]/button[@data-translate="manager-js-btn-edit"]';
    await this.waitForSelector(editQueue);
    await this.click(editQueue);
    let selectorsSLA =
      '//span[contains(text(),"' + sla + '")][@class="select2-chosen"]';
    if (await this.isVisible(selectorsSLA)) {
      await this.click(this.elements.cancelQueue);
    } else {
      await this.click(this.elements.slaTemp);
      await this.type(this.elements.slaTempInput, sla);
      await this.pressKey('Enter');
      await this.waitForSelector(this.elements.saveQueue);
      await this.click(this.elements.saveQueue);
    }
  }

  /**
   * Function to updated sla
   * @param {string} sla - sla name
   * @returns {void} nothing
   */
  async updateSLA(sla) {
    await this.type(this.elements.slaFilter, sla);
    await this.pressKey('Enter');
    let selectorsSLA =
      '//table[@id="sla-list"]//tbody//tr[position()=1]//td[contains(text(),"' +
      sla +
      '")]';
    await this.waitForSelector(selectorsSLA);
    await this.click(selectorsSLA);
    try {
      await this.waitForSelector(this.elements.autoDeliveryBtn);
    } catch (error) {
      await this.click(selectorsSLA);
      await this.waitForSelector(this.elements.autoDeliveryBtn);
    }
    await this.click(this.elements.autoDeliveryBtn);
    await this.waitForSelector(this.elements.saveAutoDelivery);
    await this.click(this.elements.saveAutoDelivery);
    await this.waitForSelector(this.elements.saveTemplate);
    await this.click(this.elements.saveTemplate);
  }

  /**
   * Function to validate tickets
   * @param {string} subject - subject string
   * @returns {void} nothing
   */
  async validateTickets(subject = subjectHash) {
    let json = '';
    fs.readFile(userData.autoDelivery, async function (err, data) {
      json = JSON.parse(data);
    });
    //need this wait to wait for subject to load
    await this.wait(4);
    await this.waitForSelector(this.elements.ticketSubject);
    await this.shouldContainText(
      this.elements.ticketSubject,
      json[subject]
    );
    await this.click(this.elements.button.moreOption);
    await this.waitForSelector(this.elements.button.spamBtn);
    await this.click(this.elements.button.spamBtn);
    await this.click(this.elements.button.spamYes);
    if (await this.isVisible(this.elements.showPendingList)) {
      await this.waitForSelector(this.elements.showPendingList);
    }
  }

  /**
   * Function to verify ticket call
   * @returns {void} nothing
   */
  async verifyTicketCall() {
    await this.click(this.elements.button.moreOption);
    await this.waitForSelector(this.elements.ticketCall);
    await this.click(this.elements.ticketCall);
    await this.waitForSelector(this.elements.callNumberButton);
  }

  /**
   * Function to validate attachment
   * @param {object} formField - formfield object
   * @param {string} formField.from - from email
   * @param {string} formField.subject - subject string
   * @param {string} formField.template - template string
   * @param {string} scriptName - name of the script
   * @param {string} label - text label value
   * @returns {void} nothing
   */
  async replyFormField(formField, scriptName, label = '') {
    //wait required to load form
    await this.wait(3);
    if (formField.from !== '') {
      await this.waitForSelector(this.elements.ticketReplyFromDropdown);
      await this.click(this.elements.ticketReplyFromDropdown);
      await this.type(this.elements.inputField, formField.from);
      await this.pressKey('Enter');
    }
    await this.wait(3); // added wait to load the page
    if (formField.subject !== '') {
      await this.waitForSelector(this.elements.ticketReplySubjectdropdown);
      await this.click(this.elements.ticketReplySubjectdropdown);
      await this.type(this.elements.inputField, formField.subject);
      await this.pressKey('Enter');
      await this.click(this.elements.ticketReplySubjectDropdownList);
    }
    if (formField.template !== '') {
      await this.waitForSelector(this.elements.ticketReplyTemplateDropdown);
      await this.click(this.elements.ticketReplyTemplateDropdown);
      await this.type(this.elements.inputField, formField.template);
      await this.pressKey('Enter');
    }
    //Adding this code to add script element in case of available
    if (await this.isVisible(this.elements.scriptTab)) {
      await this.waitForSelector(this.elements.scriptTab);
      await this.click(this.elements.scriptTab);
      //required for page to load
      await this.wait(2);
      if (await this.isVisible(this.elements.selectScript)) {
        await this.mouseOver(this.elements.selectScript);
        await this.waitForSelector(this.elements.selectScript);
        await this.dropdownOptionSelect(this.elements.selectScript, scriptName);
      }
      if (await this.isVisible(this.elements.scriptLabel)) {
        await this.click(this.elements.scriptLabel);
      }
      if (label !== '') {
        await this.type(this.elements.scriptLabel, label);
      }
    }
  }

  /**
   * Function to click on return button
   * @returns {void} nothing
   */
  async clickOnReturnButton() {
    await this.click(this.elements.returnButton);
  }

  /**
   * Function to click on email action
   * @param {string} btn - btn type
   * @returns {void} nothing
   */
  async emailAction(btn) {
    if (btn === 'reply') {
      await this.click(this.elements.replyButton);
    }
    if (btn === 'forward') {
      await this.click(this.elements.forwardButton);
    }
    if (btn === 'forward_with_attachments') {
      await this.waitForSelector(this.elements.forwardDropdown);
      await this.click(this.elements.forwardDropdown);
      await this.click(this.elements.forwardWithAttach);
    }
  }

  /**
   * Function to verfiy ticket channel was accessed
   * @returns {void} nothing
   */
  async ticketChannelAccessed() {
    await this.waitForSelector(this.elements.searchButton);
    await this.isVisible(this.elements.pageId);
  }

  /**
   * Function to open search screen
   * @returns {void} nothing
   */
  async openSearchScreen() {
    await this.click(this.elements.searchButton);
  }

  /**
   * Function to fetch current queue counter
   * @param {string} queue - queue name
   * @param {boolean} [apiCall=true] - apicall boolean response
   * @param {boolean} [wait=true] - external wait
   * @returns {void} nothing
   */
  async fetchCurrentQueueCounter(queue, apiCall = false, wait = true) {
    let queueCount = '';
    if (queue) {
      // wait for queue
      queueCount =
        'ul.queues-list li a[title="' + queue + '"] span:nth-child(2)';
    } else {
      queueCount = this.elements.queueCount;
    }
    try {
      await this.waitForSelector(queueCount);
    } catch (error) {
      await this.click(this.elements.channelButton);
      await this.waitForSelector(queueCount);
    }
    if (wait) {
      //wait for counter to update
      await this.wait(5);
    }
    if (apiCall) {
      await this.waitForResponse(
        global.TICKET_COUNTER
      );
    }
    let counterText = await this.getText(queueCount);
    counterText = counterText.replace(/[{()}]/g, '');
    counterText = counterText.trim();
    return counterText;
  }
  /**
   * Function to fetch current queue counter
   * @param {string} queue - queue name
   * @returns {void} nothing
   */
  async getUpdatedQueueCounter(queue = '') {
    await this.wait(10); //added wait to get updated counter
    let queueCount = '';
    if (queue) {
      queueCount =
        'ul.queues-list li a[title="' + queue + '"] span:nth-child(2)';
    } else {
      queueCount = this.elements.queueCount;
    }
    let counterText = await this.getText(queueCount);
    counterText = await counterText.replace(/[{()}]/g, '');
    counterText = await counterText.trim();
    return counterText;
  }

  /**
   * Function to check if counter is less than
   * @param {string} newQueueCounter - new queue counter
   * @param {string} previousQueueCounter - old queue counter
   * @returns {void} nothing
   */
  async verifyCounterLessThan(newQueueCounter, previousQueueCounter) {
    await this.verifyLessThan(newQueueCounter, previousQueueCounter);
  }

  /**
   * Validate agent result
   * @param {string} agent - agent name
   * @returns {void} nothing
   */
  async validateAgent(agent) {
    if (agent === 'NoAgent') {
      const agentText = await this.getText(this.elements.agentTab);
      assert.equal(agentText, '');
    } else {
      await this.shouldContainText(this.elements.agentTab, agent);
    }
  }

  /**
   * Function to verify text greater than
   * @param {string} newQueueCounter - new queue counter
   * @param {string} previousQueueCounter - old queue counter
   * @returns {void} nothing
   */
  async verifyTextGreaterThan(previousQueueCounter, newQueueCounter) {
    await this.verifyGreaterThan(previousQueueCounter, newQueueCounter);
  }

  /**
   * Function to verify email sent
   * @returns {void} nothing
   */
  async verifyEmailSent() {
    await this.waitForSelector(this.elements.emailSuccess);
  }

  /**
   * Function to verify ticket
   * @param {string} queue - queue name
   * @param {string} randomEmailSubject - random string
   * @param {boolean} [isClick=false] - need to click
   * @returns {void} nothing
   */
  async verifyTicket(queue, randomEmailSubject, isClick = false) {
    await this.waitForSelector(this.elements.lastPage);
    let last = page.locator(this.elements.lastPage);
    const classAttribute = await last.getAttribute('class');
    if (!classAttribute.includes('disable')) {
      await this.click(this.elements.lastPage);
    }
    const checkSubject = `//td[contains(., '${queue}')]/following-sibling::td[contains(., '${randomEmailSubject}')]`;
    await this.isVisible(checkSubject);
    if (isClick) {
      await this.click(checkSubject);
    }
  }

  /**
   * Function to validate queue changes
   * @param {string} queue - queue name
   * @param {string} randomEmailSubject - randomemail subject
   * @returns {void} nothing
   */
  async validateQueueChanged(queue, randomEmailSubject) {
    const queueLocator = `//table[@id='search-table']//td[contains(., '${queue}')]/following-sibling::td[contains(., '${randomEmailSubject}')]`;
    await this.isVisible(queueLocator);
  }

  async sendEmailFromCustomer(email, subjectType, newSubject) {
    // Wait till mail receive at destination
    await this.wait(10);
    if (subjectType === 'reply') {
      let replySubject =
        'Re: [Ticket #' + currentTicketID + '] ' + currentTicketSubject;
      await this.sendEmail(email, replySubject);
    } else {
      await this.sendEmail(email, newSubject);
    }
  }

  /**
   * Function to close the ticket
   * @param {string} subject - subject at the time of closing
   * @param {string} comment - comment at the time of closing
   * @returns {void} nothing
   */
  async closeTicket(subject, comment) {
    await this.waitForSelector(this.elements.clickSubject);
    await this.click(this.elements.clickSubject);
    await this.type(this.elements.form.subjectInput, subject);
    await this.pressKey('Enter');
    await this.type(this.elements.ticketComment, comment);
    await this.click(this.elements.ticketCloseSubmit);
    await this.waitForSelector(this.elements.messageSuccess);
  }

  /**
   * Function to verify call response after hangup
   * @param {object} callData - object to validate a call
   * @param {string} subject - verify subject
   * @param {string} agent - verify agent name
   * @param {string} campaign - verify campaign
   * @param {string} outcome - verify outcome
   */
  async verifyCallResponse(callData) {
    const rowLocator = `${this.elements.search.searchTable}//td[@title = "${callData.subject}"]`;
    await this.click(rowLocator);
    await this.waitForSelector(this.elements.contactHistory);
    await this.click(this.elements.contactHistory);
    const agentLocator = `//div[@class="popover-content"]//td[contains(text(),"${callData.agent}")]`;
    await this.waitForSelector(agentLocator);
    const campaignLocator = `//div[@class="popover-content"]//td[contains(text(),"${callData.campaign}")]`;
    await this.waitForSelector(campaignLocator);
    const outcomeLocator = `//div[@class="popover-content"]//td[contains(text(),"${callData.outcome}")]`;
    await this.waitForSelector(outcomeLocator);
  }

  /**
   * function to verify ticket merged
   * @return {void} Nothing
   */
  async fetchTicketId() {
    //Wait to load text on this element
    await this.wait(3);
    let ticketId = await this.getText(this.elements.primaryTicketCheck);
    await this.click(this.elements.returnTab);
    return ticketId;
  }

  /**
   * function to move Ticket to another Queue
   * @param {string} previousQueueCounter - previous counter
   * @return {void} Nothing
   */
  async moveTicket(previousQueueCounter) {
    if (previousQueueCounter >= 1) {
      await this.waitForSelector(this.elements.ticketQueue1);
      await this.click(this.elements.ticketQueue1);
      await this.wait(2); //loading too fast
      await this.waitForSelector(this.elements.ticketQueue2);
      await this.click(this.elements.ticketQueue2);
      await this.wait(2); //loading too fast
      await this.click(this.elements.ticketCheckBox);
      await this.click(this.elements.mergeOption);
      await this.click(this.elements.newQueue);
      await this.click(this.elements.newQueueTextBox);
      const queueName = await this.getTexts(this.elements.selectTicketQueue);
      await this.type(this.elements.newQueueTextBox, queueName);
      await this.pressKey('Enter');
      await this.click(this.elements.changeOption);
    }
  }

  /**
   * function to assign queue to agent
   * @param {string} queue - queue name
   * @param {string} agent - agent name
   * @return {void} Nothing
   */
  async assignQueueToAgent(queue, agent) {
    await this.click(this.elements.users_list);
    await this.waitForSelector(this.elements.user_filter);
    await this.type(this.elements.user_filter, agent);
    await this.pressKey('Enter');
    await this.click(this.elements.user_filtered);
    await this.waitForSelector(this.elements.saveUser);
    await this.click(this.elements.selectNoneQueue);
    await this.type(this.elements.queuePermission, queue);
    await this.pressKey('Enter');
    await this.click(this.elements.saveUser);
  }

  /**
 * function to validate searched Email
 * @param {string} status - email status
 * @param {string} subject -Subject
 * @return {void} Nothing
 */
  async validateSearchedEmail(status, subject) {
    const subTitle = `${this.elements.search.searchTable} //tr[1]//td[@title = "${subject}"]`;
    await this.waitForSelector(this.elements.search.searchTable);
    await this.waitForSelector(subTitle);
    await this.shouldVisible(subTitle);
    const newStatus = `${this.elements.search.searchTable} //tr[1]//td[contains(., "${status}")]`;
    await this.shouldVisible(newStatus);
  }

  /**
* function to edit the mailbox
* @param {string} mailBoxName - name of the mailBox
* @param {string} fileSize - size of the file
* @return {void} Nothing
*/
  async editMailbox(mailBoxName, fileSize) {
    await this.click(this.elements.clickOnMailbox);
    await this.click(`//table[@id="tm-dt-mailbox"]//td[text()="${mailBoxName}"]/..//button[@title="Edit"]`);
    // need to add wait here so that page load
    await this.wait(2);
    await this.clearField(this.elements.attachmentFileSizeBox);
    await this.type(this.elements.attachmentFileSizeBox, fileSize);
    await this.click(this.elements.saveRule);
  }

  /**
   * Function to validate create ticket button 
   * @returns {void} nothing
   */
  async validateCreateTicketButton() {
    await this.isVisible(this.elements.disabledCreateTicketButton);
  }

  /**
   * Function to validate the error message of max file 
   * @returns {void} nothing
   */
  async validateErrorMessage() {
    await this.shouldContainText(this.elements.popUp, 'File size bigger than allowed.');
  }
  
  /**
   * Function to open script tab in ticket page and seach for script
   * @param {string} scriptName - script Name
   * @returns {void} nothing
   */
  async openScriptTab(scriptName){
    if (await this.isVisible(this.elements.scriptTab)) {
      await this.click(this.elements.scriptTab);
      if (await this.isVisible(this.elements.selectScript)) {
        await this.mouseOver(this.elements.selectScript);
        await this.waitForSelector(this.elements.selectScript);
        await this.dropdownOptionSelect(this.elements.selectScript, scriptName);
      }
      if (await this.isVisible(this.elements.scriptLabel)) {
        await this.click(this.elements.scriptLabel);
      }
    }
  }
  /**
   * Function to click on close ticket button
   * @returns {void} nothing
   */
  async clickCloseTicketBtn(){
    await this.waitForSelector(this.elements.closeBtn);
    await this.click(this.elements.closeBtn);
  }
};
