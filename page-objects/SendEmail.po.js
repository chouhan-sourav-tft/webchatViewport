/*global page*/
const { BaseAction } = require('../setup/baseAction');

exports.SendEmail = class SendEmail extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators for home page.
   */
  elements = {
    titleElement: '//div[@id="ticket-manual-send-ws"]//h1//span',
    queueClickButton: '//form//div[@id="s2id_send-email-queue"]',
    queueInputTextbox: '//div[@id="select2-drop"]//input',
    mailboxClickButton: '//form//div[@id="s2id_send-email-mailbox"]//a',
    mailboxInputTextbox: '//div[@id="select2-drop"]//input',
    subjectClickButton: '//form//div[@id="s2id_send-email-subject"]//a',
    subjectInputTextbox: '#select2-drop .select2-search input',
    selectSubjectList:
      '#select2-drop ul.select2-results li.select2-results-dept-0 ul li',
    keepSubjectCheckbox: '#save-subject-checkbox > label > span',
    templateClickButton: '//form//div[@id="s2id_send-email-template"]//a',
    templateInputTextbox: '//div[@id="select2-drop"]//input',
    nextButton: 'span[translate="plugins.send_email.form_send"]',
    toTextBox: '#modal-send .form-group:nth-child(2) .token-input',
    ccTextBox: '#modal-send .form-group:nth-child(3) .token-input',
    bccTextBox: '#modal-send .form-group:nth-child(4) .token-input',
    subjectTextBox:
      '#modal-send input[ng-model="responseData.subjectText"]',
    clickTagButton: '.select2-container#s2id_modal-send-tag',
    selectTagList: '#select2-drop li',
    responseCloseRadioButton: 'span[translate="plugins.send.reply_close"]',
    responseWaitRadioButton: 'span[translate="plugins.send.reply_wait"]',
    responseReplyRadioButton: 'span[translate="plugins.send.reply"]',
    forwardCloseRadioButton: 'span[translate="plugins.send.forward_close"]',
    forwardWaitRadioButton: 'span[translate="plugins.send.forward_wait"]',
    forwardRadioButton: 'span[translate="plugins.send.forward"]',
    sendAndOpenEmailButton: '#modal-send .modal-footer .btn.btn-default',
    sendEmailButton: '[translate="plugins.send.send_btn_title"]',
    sendAndOpenButton: '[translate="plugins.send_email.form_send_and_open"]',
    attachmentClickButton: '(//button[@title="Attach files"])[1]',
    closeButton: '#modal-send .close',
    resetButton: 'button[ng-click="close()"]',
    ticketChannel: '#channel-tickets-connection-toggle',
    ticketManagerMenu: '#fs-menu ul li #menu_17',
    sendEmailModal: '//i[@id="header-modal-icon"]/following-sibling::span[@translate="plugins.send_email.title"]',
    ticketsMenu: '//span[contains(@class,"menu") and text()="Tickets"]/..'
  };

  elementVerificationTexts = {
    sendEmailModalText: 'Send e-mail',
    pageTitle: 'Send e-mail',
  };

  /**
   * function to validate email title
   * @return {void} Nothing
   */
  async checkSendEmailScreenTitle() {
    this.shouldContainText(
      this.elements.titleElement,
      this.elementVerificationTexts.pageTitle
    );
  }


  /**
   * function to fill form fields
   * @param {string} queue - ticket queue
   * @param {string} subject - subject details 
   * @param {string} mailbox - mailbox 
   * @param {string} template - template name
   * @param {boolean} [isSubjectOnSend=true] - should send subject or not 
   * @return {void} Nothing
   */
  async fillFormFields(
    queue,
    subject,
    mailbox,
    template,
    isSubjectOnSend = true
  ) {
    console.log(isSubjectOnSend);
    //Queue
    await this.click(this.elements.queueClickButton);
    await this.type(this.elements.queueInputTextbox, queue);
    await this.pressKey('Enter');
    //MailBox
    await this.click(this.elements.mailboxClickButton);
    await this.type(this.elements.mailboxInputTextbox, mailbox);
    await this.pressKey('Enter');

    //subject
    await this.click(this.elements.subjectClickButton);
    await this.type(this.elements.subjectInputTextbox, subject);
    await this.click(this.elements.selectSubjectList, true);
    await this.click(this.elements.keepSubjectCheckbox);
    //Template
    await this.click(this.elements.templateClickButton);
    await this.type(this.elements.templateInputTextbox, template);
    await this.pressKey('Enter');
  }

  /**
   * function to click next buttom
   * @return {void} Nothing
   */
  async nextButton() {
    await this.forceClick(this.elements.nextButton);
  }

  /**
   * function to open modal
   * @return {void} Nothing
   */
  async modalOpen() {
    if (
      (await this.isVisible(this.elements.sendEmailModal)) &&
      (await this.shouldContainText(
        this.elements.sendEmailModal,
        this.elementVerificationTexts.sendEmailModalText
      ))
    ) {
      await this.log('modal open');
    }
  }

  /**
   * function to add details to email modal reply
   * @param {string} [subjectHash=''] - random subject string
   * @param {object} emailData - emaildata to be filled
   * @param {string} emailData.to - email to be sent to 
   * @param {string} emailData.cc - email to be sent to as carbon copy 
   * @param {string} emailData.bcc - email to be sent to as blind carbon copy
   * @param {string} emailData.subject - email subject
   * @return {void} Nothing
   */
  async emailModalToReply(emailData, subjectHash = '') {
    if (emailData.to) {
      const emails = emailData.to.split(',');
      for (const email of emails) {
        try {
          await this.type(this.elements.toTextBox, email);
        } catch (error) {
          await this.nextButton;
          await this.type(this.elements.toTextBox, email);
        }
        await this.pressKey('Enter');
      }
    }
    if (emailData.cc) {
      const CCs = emailData.cc.split(',');
      for (const cc of CCs) {
        await this.type(this.elements.ccTextBox, cc);
        await this.pressKey('Enter');
      }
    }
    if (emailData.bcc) {
      const BCCs = emailData.bcc.split(',');
      for (const bcc of BCCs) {
        await this.type(this.elements.bccTextBox, bcc);
        await this.pressKey('Enter');
      }
    }
    if (emailData.subject && subjectHash === '') {
      await this.type(this.elements.subjectTextBox, emailData.emailsubject.toString());
    } else if (subjectHash) {
      await this.type(this.elements.subjectTextBox, subjectHash);
    }
    //tag
    if (!emailData.to.includes('forward')) {
      await this.click(this.elements.clickTagButton);
      await this.click(this.elements.selectTagList, true);
    }
  }

  /**
   * function to send email as
   * @param {string} responseOption - type of response
   * @return {void} Nothing
   */
  async sendEmailAs(responseOption = '') {
    let responseOpted = '';
    if (responseOption === 'wait') {
      responseOpted = this.elements.responseWaitRadioButton;
    }
    if (responseOption === 'close') {
      responseOpted = this.elements.responseCloseRadioButton;
    }
    if (responseOption === 'reply') {
      responseOpted = this.elements.responseReplyRadioButton;
    }
    await this.click(responseOpted);
  }

  /**
   * function to forward email as
   * @param {string} responseOption - type of response
   * @return {void} Nothing
   */
  async forwardEmailAs(responseOption = '') {
    let responseOpted = '';
    if (responseOption === 'wait') {
      responseOpted = this.elements.forwardWaitRadioButton;
    }
    if (responseOption === 'close') {
      responseOpted = this.elements.forwardCloseRadioButton;
    }
    if (responseOption === 'forward') {
      responseOpted = this.elements.forwardRadioButton;
    }
    await this.click(responseOpted);
  }

  /**
   * function to send email modal as
   * @param {string} btn - type of button
   * @return {void} Nothing
   */
  async emailModalSend(btn) {
    await this.wait(3);
    if (btn === 'open') {
      await this.click(this.elements.sendAndOpenEmailButton);
    }
    if (btn === 'send') {
      await this.click(this.elements.sendEmailButton);
    }
  }

  /**
   * function to check if queue exists
   * @param {string} queue - queue details
   * @return {void} Nothing
   */
  async checkQueueExist(queue) {
    //open Ticket Manager
    await this.waitForSelector(this.elements.ticketsMenu);
    await this.mouseOver(this.elements.ticketsMenu);
    await this.forceClick(this.elements.ticketManagerMenu);
    try{
      await this.waitForSelector(`//table[@id="tm-dt-queue"]//td[text()="${queue}"]`);
    } catch (error){
      await page.reload();
      await this.waitForSelector(`//table[@id="tm-dt-queue"]//td[text()="${queue}"]`);
    }
    await this.shouldVisible(
      `//table[@id="tm-dt-queue"]//td[text()="${queue}"]`
    );
  }

  /**
   * Function to click on requested element
   * @param {string} eleData - element data
   * @return {void} Nothing
   */
  async elementClick(eleData) {
    if (eleData === 'closeForm') {
      await this.waitForSelector(this.elements.closeButton);
      await this.click(this.elements.closeButton);
    }
    if (eleData === 'resetForm') {
      await this.waitForSelector(this.elements.resetButton);
      await this.click(this.elements.resetButton);
    }
    if (eleData === 'Tickets') {
      await this.waitForSelector(this.elements.ticketChannel);
      await this.click(this.elements.ticketChannel);
    }
  }

  /**
   * Function to verify send buttom
   * @param {object} buttons - button
   * @param {string} buttons.btn1 - type of button
   * @param {string} buttons.btn2 - type of button
   * @return {void} Nothing
   */
  async verifySendButton(buttons) {
    if (buttons.btn1) {
      await this.waitForSelector(this.elements.sendEmailButton);
      await this.shouldVisible(this.elements.sendEmailButton);
    }
    if (buttons.btn2) {
      await this.waitForSelector(this.elements.sendAndOpenButton);
      await this.shouldVisible(this.elements.sendAndOpenButton);
    }
  }

  /**
   * Function to attach files
   * @param {string} filePath - file path
   * @param {string} [attachmentLocator=''] - explicit locator 
   * @return {void} Nothing
   */
  async browsAttachment(filePath, attachmentLocator = '') {
    let attachLocator = this.elements.attachmentClickButton;
    if (attachmentLocator) {
      attachLocator = attachmentLocator;
    }
    await this.waitForSelector(attachLocator);
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator(attachLocator).click()
    ]);
    await fileChooser.setFiles(filePath);
    await this.wait(4); //file to upload
  }
};
