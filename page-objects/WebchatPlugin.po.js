/*global page, frames pageNew, document,  getComputedStyle*/
const { assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');
global.frame = '';
global.frames = '';
let delayData = [];
exports.WebchatPlugin = class WebchatPlugin extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    webchatContainer: '#fs_webchat_container',
    webchatContact: '#contact',
    webchatContactChanged: '#off-name',
    webchatEmail: '#email',
    webchatEmailChanged: '#off-email',
    webchatMessage: '#on-message',
    webchatMessageChanged: '#off-message',
    webchatStartchat: '#btn-start-dialog',
    webchatStartchatChanged: '#btn-submit-message',
    webchatResume: '#resume-from-hold',
    webchatOptionList: '#fs-webchat li[data-action="options-list"]',
    webchatManagerMenu: 'a[id="menu_34"]',
    webchatFilter: '#wc-dt-webchat_filter input',
    webchatWidgetForm: '#wc-div-form',
    webchatSetting: '#wc-webchat-form span[data-translate="webchat_settings"]',
    webchatCheckboxSendFile: 'input[name="wc-send-file"]',
    webchatAllowSendFile:
      '#wc-webchat-form span[data-translate="webchat_settings_properties_send_files"]',
    webchatFileSize: '#wc-webchat-form input[name="wc-send-file-limit"]',
    webchatFileExt: '#wc-div-send-file-limit li.select2-search-field input',
    webchatActiveExtension: '#select2-drop li',
    webchatConfigSave: 'span[data-translate="webchat_btn_submit"]',
    mainLogout: '#main-logout > span > a',
    mainLogoutConfirm: '#bot2-Msg1',
    webchatChannel: '#channel-webchat-connection-toggle',
    webchatWorkspace: '#webchat-workspace-ctn',
    webchatSendFile: '.list-options-box.active li[data-action="send-file"]',
    webchatFileError: '.bg-danger',
    webchatMsg: '#webchat-inbox-table-ctn tbody tr:first-child td:nth-child(6)',
    webchatActiveTab: '#webchat-inbox-tabs li.active span',
    webchatStatus:
      '#webchat-inbox-table-ctn tbody tr:first-child td:nth-child(4) span',
    webchatClientMsg: 'li[data-from="CLIENT"] div.the_webchat_message',
    webchatTextDanger:
      'li[data-type="FILESEND"][data-from="CLIENT"] .text-danger',
    webchatReplyButton: '//button[@data-action="join" and not(contains(@class,"disabled"))]',
    webchatAgentJoined: 'li[data-from="AGENT"]',
    webchatReplyAgent: '//div[contains(@class, "active status-OPEN")]//div[contains(@class, "message-area")][not(@disabled)]',
    webchatReplySend: '//div[contains(@class, "active status-OPEN")]//span[@id="send-message" and not(contains(@class,"disabled"))]',
    webchatReceivedMessage:
      'li[data-from="AGENT"]:last-child div div:nth-child(2)',
    webchatLeaveMessage: 'li[data-type="LEAVE"] div div:nth-child(2)',
    webchatCloseButton: 'button[data-action="leave"]',
    webchatSubject: '#s2id_modal-close-subject',
    webchatSubjectInput: '#select2-drop input',
    webchatSubjectSelect:
      '#select2-drop ul.select2-results li ul li:first-child',
    webchatCloseComment: '#modal-close-comments',
    webchatConversationButton: '#modal-close-btn-close',
    webchatChangeName: '.list-options-box.active li[data-action="change-name"]',
    webchatNewName: '#change-name-new',
    webchatSaveName: '#change-name-ok',
    webchatClientMessage:
      '.active.status-NEW.client-status-online.channel-webchat .tab-conversation-ctn li.private .the_webchat_message',
    webchatChangeLanguage:
      '.list-options-box.active li[data-action="change-lang"] select',
    webchatChangeNameLanguage:
      '.list-options-box.active li[data-action="change-name"] span',
    reqRating:
      '.active.status-OPEN.client-status-online.channel-webchat button[data-action="request-rating"]',
    rateinChatBox: 'button[class="btn btn-warning btn-sm btn-request-rate"]',
    starComment: '.comment-box textarea',
    sendRating: '#rate-send',
    webchatFileReady:
      'li[data-type="FILESEND"][data-from="CLIENT"] .text-success',
    webchatFileSuccess: '.text-success span',
    webchatRatingComment: 'li[data-type="COMMENT"] div div:nth-child(2)',
    webchatRatingStart: 'li[data-type="RATING"] div div:nth-child(2) span',
    webchatAllowRating:
      '#wc-webchat-form span[data-translate="webchat_settings_properties_rating_request"]',
    webchatRateChat: '[data-translate="rate_chat"]',
    webchatContainerSetting: '.options-box ul li',
    chatId: '[data-translate="chat_id"]~label',
    webchatAllowSelfChat:
      '#wc-webchat-form span[data-translate="webchat_settings_properties_start_no_msg"]',
    webchatAllowSelfRating:
      '#wc-webchat-form span[data-translate="webchat_settings_properties_self_rating"]',
    webchatMainDialog: '#fs-webchat .main-dialog',
    webchatClientName:
      '#webchat-inbox-table-ctn tbody tr:first-child td:nth-child(5)',
    showChatId: 'span[data-translate="webchat_settings_properties_show_id"]',
    clearWebchatCss: '#webchat_files_custom_css_clear',
    loginForm: '#login-form',
    mailboxFilter: '#wc-dt-mailbox_wrapper input[data-translate="tbl-search"]',
    mailboxAllow: 'input[name="wc-mailbox-integration"] ~span',
    mailboxSelect: '#s2id_wc-select-mailboxes span:nth-child(1)',
    mailboxSubject: 'input[name="wc-mailbox-integration-subject"]',
    mailboxAutoSend:
      'span[data-translate="webchat_settings_properties_mailbox_auto_send"]',
    mailboxContactRequest:
      'span[data-translate="webchat_settings_properties_mailbox_contact_request"]',
    contactRequestRadio: '#wc-custom',
    automaticRadio: '#wc-automatic',
    emailRadio: '#wc-email',
    sendChatEmail: 'span[data-translate="send_chat_email"]',
    clickToToggle: 'button[data-toggle="dropdown"]',
    callAction: '.dropdown-menu li[data-action="call"]',
    callNumberButton: '#voice-field-first_phone-btn',
    successMessage: '.bigBox.animated.fadeIn.fast',
    contactTab: '.tab-contact-info',
    phoneNumber: 'input[name="first_phone"]',
    saveContactInfo: '#btn-save-fields',
    conversationTab: '.tab-conversation',
    topSuccessMessage: '.SmallBox.animated.fadeInRight.fast',
    deleteExceptionButton: '#wc-exceptions-table .btn-delete',
    triggersTab: 'span[data-translate="webchat_triggers"]',
    addTriggerButton: '#wc-trigger-add',
    triggerWhenDropdown: '//select[@id="wc-trigger-event"]',
    triggerActionDropdown: '[name="wc-trigger-action"]',
    triggerDelayInput: '#wc-trigger-delay',
    triggerNameInput: '[name="wc-trigger-name"]',
    triggerAgentNameCheck:
      '//*[@data-translate="webchat_triggers_display_name_check"]/preceding-sibling::i',
    triggerSenderNameInput: '#wc-trigger-display',
    triggerMessageInput: '[name="wc-trigger-message"]',
    triggerSaveButton: '#wc-trigger-save',
    webchatPluginSender:
      '(//*[@data-type="MSG" and @data-from="SYSTEM"])[last()]//span[@class="name"]',
    webChatPluginMesg:
      '(//*[@data-type="MSG" and @data-from="SYSTEM"])[last()]/div/div[last()]',
    filterTrigger: '//*[@id="wc-trigger-datatable_filter"]/div/input',
    returnToInbox: '#return-to-inbox',
    unreadWebchatMsg:
      '#webchat-unread-table-ctn tbody tr:first-child td:nth-child(6)',
    replyUnreadMsg: 'button[data-action="pick"]',
    actionsBtn: '.btn-block .dropdown-toggle',
    closeBtn: '.dropdown-menu li[data-action="close"]',
    unreadTab: 'span[data-translate="inbox_unread"]',
    closeChatModal:
      '#modal-close  .modal-content .modal-header h4[data-translate="close_webchat"]',
    searchButton: '#webchat-inbox-options-search',
    webchatQueueInput: '#s2id_wc-select-webchat-queue input',
    webchatStartDate: '#wc-date-start',
    webchatEndDate: '#wc-date-end',
    searchWebchatButton: '#search_button',
    closeWebchatModalButton: '#close-btn',
    triggerTimerLabel: '#wc-trigger-timer-label',
    triggerDesc: 'textarea[data-translate="webchat_triggers_desc_placeholder"]',
    modalFooter: '#modal-close .modal-dialog .modal-footer',
    asteriskLabel: 'label[data-translate="close_webchat_subject"]',
    warningIcon: '(//i[@class="fa fa-exclamation-triangle warning unregister_warning"])[1]',
    warningToolTip: '//div[contains(@class, "unregister")][1]//span[@class = "tooltiptext1 max-idle-time"]',
    messageContainer: '.unregister',
    searchFilterInput: '#wc-search-datatable_filter input',
    transferConversationbtn: '//button[@class="btn btn-default btn-block conversation-transfer"]'
  };

  /**
   * function to login into webChat
   * @param {object} loginData - logindata object
   * @param {string} loginData.tabSequence - tab to be switched on
   * @param {string} loginData.contact - contact details
   * @param {string} loginData.email - email id
   * @param {string} loginData.message - message
   * @return {void} Nothing
   */
  async webchatLogin(loginData) {
    // open gocontact plugin directly
    if (loginData.tabSequence === 'first') {
      await this.openBrowser(global.WEBCHAT_CLIENT_URL);
      await this.pageEvaluate();
      await this.waitForSelector(this.elements.webchatContainer);
      await this.click(this.elements.webchatContainer);
      if (loginData.contact && loginData.email) {
        global.frame = page.frame({ url: global.WEBCHAT_IFRAME_URL });
        let flag = await global.frame
          .locator(this.elements.webchatContact)
          .first()
          .isVisible({ timeout: 5000 });

        if (flag) {
          await global.frame.fill(
            this.elements.webchatContact,
            loginData.contact
          );
          await global.frame.fill(this.elements.webchatEmail, loginData.email);
          await global.frame.fill(
            this.elements.webchatMessage,
            loginData.message
          );
          await global.frame.click(this.elements.webchatStartchat);
        } else {
          await global.frame.fill(
            this.elements.webchatContactChanged,
            loginData.contact
          );
          await global.frame.fill(
            this.elements.webchatEmailChanged,
            loginData.email
          );
          await global.frame.fill(
            this.elements.webchatMessageChanged,
            loginData.message
          );
          await global.frame.click(this.elements.webchatStartchatChanged);
        }
      }
    }
    // open Gocontact plugin in another new tab
    else if (loginData.tabSequence === 'second') {
      await this.openNewTab(global.WEBCHAT_CLIENT_URL);
      await this.pageEvaluate('newTab');
      await this.wait(10);
      await this.waitForSelector(this.elements.webchatContainer, 'newTab');
      await this.click(this.elements.webchatContainer, 'newTab');
      global.frames = pageNew.frame({ url: global.WEBCHAT_IFRAME_URL });
      if (loginData.contact && loginData.email) {
        let flagSecond = await frames
          .locator(this.elements.webchatContact)
          .first()
          .isVisible({ timeout: 5000 });
        if (flagSecond) {
          await frames.fill(this.elements.webchatContact, loginData.contact);
          await frames.fill(this.elements.webchatEmail, loginData.email);
          if (await frames.isVisible(this.elements.webchatMessage)) {
            await frames.fill(this.elements.webchatMessage, loginData.message);
          }
          await frames.click(this.elements.webchatStartchat);
        } else {
          await frames.fill(
            this.elements.webchatContactChanged,
            loginData.contact
          );
          await frames.fill(this.elements.webchatEmailChanged, loginData.email);
          await frames.fill(
            this.elements.webchatMessageChanged,
            loginData.message
          );
          await frames.click(this.elements.webchatStartchatChanged);
        }
      }
    }
    // open webchat plugin in second/third/more windows
    else if (loginData.window === 'second') {
      await this.openBrowser(global.WEBCHAT_CLIENT_URL, loginData.window);
      await this.pageEvaluate(loginData.window);
      await this.waitForSelector(
        this.elements.webchatContainer,
        loginData.window
      );
      await this.click(this.elements.webchatContainer, loginData.window);
      if (loginData.contact && loginData.email) {
        global.frameWindow = global.secondSession.frame({
          url: global.WEBCHAT_IFRAME_URL,
        });
        let flag = await global.frameWindow
          .locator(this.elements.webchatContact)
          .first()
          .isVisible({ timeout: 5000 });

        if (flag) {
          await global.frameWindow.fill(
            this.elements.webchatContact,
            loginData.contact
          );
          await global.frameWindow.fill(
            this.elements.webchatEmail,
            loginData.email
          );
          await global.frameWindow.fill(
            this.elements.webchatMessage,
            loginData.message
          );
          await global.frameWindow.isVisible(this.elements.webchatStartchat);
          await global.frameWindow.click(this.elements.webchatStartchat);
        } else {
          await global.frameWindow.fill(
            this.elements.webchatContactChanged,
            loginData.contact
          );
          await global.frameWindow.fill(
            this.elements.webchatEmailChanged,
            loginData.email
          );
          await global.frameWindow.fill(
            this.elements.webchatMessageChanged,
            loginData.message
          );
          await global.frameWindow.click(this.elements.webchatStartchatChanged);
        }
      }
    }
    else if (loginData.window === 'third') {
      await this.openBrowser(global.WEBCHAT_CLIENT_URL, loginData.window);
      await this.pageEvaluate(loginData.window);
      await this.waitForSelector(
        this.elements.webchatContainer,
        loginData.window
      );
      await this.click(this.elements.webchatContainer, loginData.window);
      if (loginData.contact && loginData.email) {
        global.frameWindowThird = global.thirdSession.frame({
          url: global.WEBCHAT_IFRAME_URL,
        });
        let flag = await global.frameWindowThird
          .locator(this.elements.webchatContact)
          .first()
          .isVisible({ timeout: 5000 });

        if (flag) {
          await global.frameWindowThird.fill(
            this.elements.webchatContact,
            loginData.contact
          );
          await global.frameWindowThird.fill(
            this.elements.webchatEmail,
            loginData.email
          );
          await global.frameWindowThird.fill(
            this.elements.webchatMessage,
            loginData.message
          );
          await global.frameWindowThird.isVisible(this.elements.webchatStartchat);
          await global.frameWindowThird.click(this.elements.webchatStartchat);
        } else {
          await global.frameWindowThird.fill(
            this.elements.webchatContactChanged,
            loginData.contact
          );
          await global.frameWindowThird.fill(
            this.elements.webchatEmailChanged,
            loginData.email
          );
          await global.frameWindowThird.fill(
            this.elements.webchatMessageChanged,
            loginData.message
          );
          await global.frameWindowThird.click(this.elements.webchatStartchatChanged);
        }
      }
    }
  }

  /**
   * function to start the chat in plugin
   * @param {object} loginData - logindata object
   * @param {string} loginData.tabSequence - tab to be switched on
   * @param {string} loginData.contact - contact details
   * @param {string} loginData.email - email id
   * @param {string} loginData.message - message
   * @return {void} Nothing
   */
  async startChat(loginData) {
    // open goContact plugin directly and start chat
    if (loginData.tabSequence === 'first') {
      await this.switchTab();
      global.frame = page.frame({ url: global.WEBCHAT_IFRAME_URL });
      let flag = await global.frame
        .locator(this.elements.webchatContact)
        .first()
        .isVisible({ timeout: 5000 });

      if (flag) {
        await global.frame.fill(
          this.elements.webchatContact,
          loginData.contact
        );
        await global.frame.fill(this.elements.webchatEmail, loginData.email);
        await global.frame.fill(
          this.elements.webchatMessage,
          loginData.message
        );
        await global.frame.click(this.elements.webchatStartchat);
      } else {
        await global.frame.fill(
          this.elements.webchatContactChanged,
          loginData.contact
        );
        await global.frame.fill(
          this.elements.webchatEmailChanged,
          loginData.email
        );
        await global.frame.fill(
          this.elements.webchatMessageChanged,
          loginData.message
        );
        await global.frame.click(this.elements.webchatStartchatChanged);
      }
    }
    // open gocontac plugin in new tab and start the chat
    if (loginData.tabSequence === 'second') {
      await this.switchTab('newTab');
      global.frames = pageNew.frame({ url: global.WEBCHAT_IFRAME_URL });
      let flagSecond = await frames
        .locator(this.elements.webchatContact)
        .first()
        .isVisible({ timeout: 5000 });
      if (flagSecond) {
        await frames.fill(this.elements.webchatContact, loginData.contact);
        await frames.fill(this.elements.webchatEmail, loginData.email);
        await frames.fill(this.elements.webchatMessage, loginData.message);
        await frames.click(this.elements.webchatStartchat);
      } else {
        await frames.fill(
          this.elements.webchatContactChanged,
          loginData.contact
        );
        await frames.fill(this.elements.webchatEmailChanged, loginData.email);
        await frames.fill(
          this.elements.webchatMessageChanged,
          loginData.message
        );
        await frames.click(this.elements.webchatStartchatChanged);
      }
    }
  }

  /**
   * function to open the webchat plugin over another duplicate tab
   * @return {void} Nothing
   */
  async webchatDuplicateTab() {
    await this.openNewTab(global.WEBCHAT_CLIENT_URL);
    await this.pageEvaluate('newTab');
    await this.waitForSelector(this.elements.webchatContainer, 'newTab');
  }

  /**
   * function to transfered the chat
   * @return {void} Nothing
   */
  async webchatTransferChat() {
    await this.waitForSelector(this.elements.webchatContainer, 'newTab');
    await this.click(this.elements.webchatContainer, 'newTab');
    global.frames = pageNew.frame({ url: global.WEBCHAT_IFRAME_URL });
    await frames.isVisible(this.elements.webchatResume);
    await frames.click(this.elements.webchatResume);
  }

  /**
   * function to check the session over webhcat plugin
   * @return {void} Nothing
   */
  async webchatSessionCheck() {
    await this.switchTab();
    await global.frame.isVisible(this.elements.webchatResume);
  }

  /**
   * function to click the element over menu
   * @param {object} menuOption- different menu option in webchat channel
   * @param {string} menuOption.webchatManager - menuoption webchat Manager
   * @param {string} menuOption.webchatSetting - menuoption webchat setting
   * @param {string} menuOption.webchatChannel - menuoption webchat Manager
   * @param {string} menuOption.webchatOption - menuoption webchat option
   * @param {string} type - page type
   * @return {void} Nothing
   */
  async elementClick(menuOption, type = '') {
    // webchat manager menu option
    if (menuOption === 'Webchat Manager') {
      await this.mouseOver(this.elements.webchatManagerMenu);
      await this.click(this.elements.webchatManagerMenu);
      await this.waitForSelector(this.elements.webchatFilter);
    }
    // webchat setting menu option
    if (menuOption === 'Webchat Setting') {
      await this.click(this.elements.webchatSetting);
    }
    //  webchatchannel menu option
    if (menuOption === 'Webchat Channel') {
      await this.click(this.elements.webchatChannel, type);
      await this.click(this.elements.webchatChannel, type);
      await this.wait(5); // wait to remove loader from webchat page
      if (await this.isVisible(this.elements.webchatWorkspace, type)) {
        await this.waitForSelector(this.elements.webchatWorkspace, type);
      }
    }
    // webchat option menu option
    if (menuOption === 'Webchat Option') {
      await frames.click(this.elements.webchatOptionList);
    }
  }

  /**
   * function to search and edit the channel
   * @param {string} webchatChannel - search and edit webchatChannel
   * @returns {void} nothing
   */
  async searchAndEditChannel(webchatChannel) {
    await this.type(this.elements.webchatFilter, webchatChannel);
    await this.pressKey('Enter');
    let locator = `//td[text()='${webchatChannel}']/following-sibling::td[last()]/button[last()-1]`;
    await this.waitForSelector(locator);
    await this.click(locator);
    await this.waitForSelector(this.elements.webchatWidgetForm);
  }

  /**
   * function to update the configuration
   * @param {object} settingData - update the configuration of setting
   * @param {string} settingData.File_format - format of file
   * @param {string} settingData.Max_file_size - max file size
   * @returns {void} nothing
   */
  async updateConfiguration(settingData) {
    let fileTypes = settingData.fileFormat;
    let fileExt = fileTypes.split(',');
    if (
      !(await this.checkboxIsChecked(this.elements.webchatCheckboxSendFile))
    ) {
      await this.click(this.elements.webchatAllowSendFile);
    }
    await this.type(this.elements.webchatFileSize, settingData.maxFileSize);
    //Clear existing file extensions
    await this.click(this.elements.webchatFileExt);
    await this.pressKey('Backspace');
    await this.pressKey('Backspace');
    await this.pressKey('Backspace');
    await this.pressKey('Backspace');
    //Add new extensions
    for (let j = 0; j < fileExt.length; j++) {
      await this.type(this.elements.webchatFileExt, fileExt[j]);
      await this.click(this.elements.webchatActiveExtension);
    }
    await this.click(this.elements.webchatConfigSave);
    await this.click(this.elements.topSuccessMessage);
  }

  /**
   * function to logoutthe session over plugin
   * @returns {void} nothing
   */
  async logoutSession(type = '') {
    // required to work in staging environment
    await this.wait(2);
    await this.forceClick(this.elements.mainLogout, type);
    await this.waitForSelector(this.elements.mainLogoutConfirm, type);
    await this.click(this.elements.mainLogoutConfirm, type);
    await this.waitForSelector(this.elements.loginForm, type);
  }

  /**
   * function to upload a file
   * @param {string} fileName - upload a file with fileName
   * @returns {void} nothing
   */
  async uploadFile(fileName) {
    const [fileChooser] = await Promise.all([
      pageNew.waitForEvent('filechooser'),
      await frames.locator(this.elements.webchatSendFile).click(),
    ]);
    await fileChooser.setFiles('fixtures/' + fileName);
  }

  /**
   * function to validate the uploaded message
   * @param {string} message - type of message
   * @param {string} type - pagetype
   * @returns {void} nothing
   */
  async verifyUploadMessage(type, message) {
    if (type === 'error') {
      await this.containSubstring(
        await frames.locator(this.elements.webchatFileError).innerText(),
        message
      );
    } else {
      await this.containSubstring(
        await frames.locator(this.elements.webchatFileSuccess).innerText(),
        message
      );
    }
  }

  /**
   * function to validate the message
   * @param {string} hashString - hashstring
   * @param {string} tab - tab details
   * @param {string} status - message status
   * @returns {void} nothing
   */
  async verifyMessage(hashString, tab, status, fileName, message) {
    if(fileName){
      await this.switchTab();
    if (!(await this.isVisible(this.elements.webchatWorkspace))) {
      await this.click(this.elements.webchatChannel);
    }
    // waiting to load text on DOM
    await this.wait(5);
    await this.waitForSelector(this.elements.webchatMsg);
    await this.shouldContainSomeText(this.elements.webchatMsg);
    await this.shouldContainText(this.elements.webchatMsg, fileName);
    await this.shouldContainText(this.elements.webchatActiveTab, tab);
    await this.shouldContainText(this.elements.webchatStatus, status);

  } else if(message === '[COMMENT] Great'){
    await this.switchTab();
  if (!(await this.isVisible(this.elements.webchatWorkspace))) {
    await this.click(this.elements.webchatChannel);
  }
  // waiting to load text on DOM
  await this.wait(5);
  await this.waitForSelector(this.elements.webchatMsg);
  await this.shouldContainSomeText(this.elements.webchatMsg);
  await this.shouldContainText(this.elements.webchatMsg, message);
  await this.shouldContainText(this.elements.webchatActiveTab, tab);
  await this.shouldContainText(this.elements.webchatStatus, status);

} else{
    await this.switchTab();
    if (!(await this.isVisible(this.elements.webchatWorkspace))) {
      await this.click(this.elements.webchatChannel);
    }
    // waiting to load text on DOM
    await this.wait(5);
    await this.waitForSelector(this.elements.webchatMsg);
    await this.shouldContainSomeText(this.elements.webchatMsg);
    await this.shouldContainText(this.elements.webchatMsg, hashString);
    await this.shouldContainText(this.elements.webchatActiveTab, tab);
    await this.shouldContainText(this.elements.webchatStatus, status);
  }
  global.fileName = '';
  global.message = '';
}

  /**
   * function to validate the uploaded
   * @param {string} hashString - hashstring
   * @param {string} type - upload recieved type
   * @param {string} msg - message
   * @returns {void} nothing
   */
  async checkUpload(hashString, type, msg) {
    await this.click(this.elements.webchatStatus);
    await this.waitForSelector(this.elements.webchatClientMsg);
    await this.shouldContainText(this.elements.webchatClientMsg, hashString);
    if (type === 'received') {
      await this.shouldContainText(this.elements.webchatFileReady, msg);
    } else {
      await this.shouldContainText(this.elements.webchatTextDanger, msg);
    }
  }

  /**
   * function to reply on the thread in wehchat ticket
   * @param {string} hashStringReply - random string
   * @param {string} type - pagetype
   * @return {void} Nothing
   */
  async replyOnThread(hashStringReply, type = '') {
    console.log(await this.isVisible(this.elements.webchatReplyButton));
    await this.waitForSelector(this.elements.webchatReplyButton);
    await this.click(this.elements.webchatReplyButton);
    if (type === 'second') {
      await global.frameWindow.isVisible(this.elements.webchatAgentJoined);
    } else if (type === 'third') {
      await global.frameWindowThird.isVisible(this.elements.webchatAgentJoined);
    } else {
      await frames.isVisible(this.elements.webchatAgentJoined);
    }
    await this.click(this.elements.webchatReplyAgent);
    await this.type(this.elements.webchatReplyAgent, hashStringReply);
    await this.click(this.elements.webchatReplySend);
  }

  /**
   * function to validate the message
   * @param {string} hashStringReply - random string
   * @param {string} [status=''] - status of message
   * @param {string} type - pagetype
   * @return {void} Nothing
   */
  async validateMessage(hashStringReply, status = '', type = '') {
    // waiting to load text on DOM
    await this.wait(5);
    let frameType = frames;
    if (type === 'second') {
      frameType = global.frameWindow;
    }
    else if (type === 'third') {
      frameType = global.frameWindowThird;
    }

    if (status) {
      await this.containSubstring(
        await frameType
          .locator(this.elements.webchatLeaveMessage)
          .innerText(),
        status
      );
    } else {
      await this.containSubstring(
        await frameType
          .locator(this.elements.webchatReceivedMessage)
          .innerText(),
        hashStringReply
      );
    }
  }

  /**
   * function to close the conversation with customer
   * @param {string} subject - select subject
   * @param {string} type - conversation type
   * @param {string} [status=''] - status of message
   * @return {void} Nothing
   */
  async closeConversation(status, type, subject) {
    if (type === 'active') {
      await this.switchTab();
      await this.click(this.elements.webchatCloseButton);
    } else if (type === 'unread') {
      await this.click(this.elements.actionsBtn);
      await this.waitForSelector(this.elements.closeBtn);
      await this.click(this.elements.closeBtn);
    }
    await this.click(this.elements.webchatSubject);
    await this.type(this.elements.webchatSubjectInput, subject);
    await this.pressKey('Enter');
    await this.click(this.elements.webchatCloseComment);
    await this.type(this.elements.webchatCloseComment, status);
    await this.click(this.elements.webchatConversationButton);
    await this.isVisible(this.elements.successMessage);
  }

  /**
   * function to change the name of webChat ticket
   * @param {string} name - Change name
   * @return {void} Nothing
   */
  async changeName(name) {
    await frames.click(this.elements.webchatOptionList);
    await frames.click(this.elements.webchatChangeName);
    await frames.fill(this.elements.webchatNewName, name);
    await frames.evaluate(() =>
      (function () {
        document.getElementById('change-name-ok').classList.remove('disabled');
      })(document, 'script')
    );
    await frames.click(this.elements.webchatSaveName);
    await frames.waitForLoadState();
  }

  /**
   * function to validate the client message
   * @param {string} msg- client message
   * @return {void} Nothing
   */
  async validateClientMessage(msg) {
    await this.click(this.elements.webchatStatus);
    await this.waitForSelector(this.elements.webchatClientMessage);
    await this.shouldContainText(this.elements.webchatClientMessage, msg);
  }

  /**
   * function to change the language
   * @param {string} language- select language
   * @return {void} Nothing
   */
  async changeLanguage(language) {
    await frames.click(this.elements.webchatOptionList);
    await frames.click(this.elements.webchatChangeLanguage);
    await frames.selectOption(this.elements.webchatChangeLanguage, language);
  }

  /**
   * function to validate the language
   * @param {string} translatedText- translated text for language
   * @return {void} Nothing
   */
  async validateLanguage(translatedText) {
    await this.containSubstring(
      await frames.locator(this.elements.webchatChangeNameLanguage).innerText(),
      translatedText
    );
  }

  /**
   * function to request rating from customer
   * @param {string} hashStringReply - random string
   * @return {void} Nothing
   */
  async requestRating(hashStringReply) {
    await this.click(this.elements.webchatMsg);
    await this.click(this.elements.webchatReplyButton);
    await this.waitForSelector(this.elements.webchatAgentJoined);
    await this.switchTab('newTab');
    await frames.isVisible(this.elements.webchatAgentJoined);
    await this.switchTab();
    await this.click(this.elements.reqRating);
    await this.click(this.elements.webchatReplyAgent);
    await this.type(this.elements.webchatReplyAgent, hashStringReply);
    await this.click(this.elements.webchatReplySend);
  }

  /**
   * function to validate the rating
   * @param {string} rating - rating given
   * @param {string} message - message string
   * @param {string} type - rating type
   * @returns {void} - nothing
   */
  async verifyRating(rating, message, type) {
    if (type === 'rating') {
      await this.switchTab();
    } else if (type === 'selfrating') {
      await this.click(this.elements.webchatStatus);
    }
    await this.waitForSelector(this.elements.webchatRatingComment);
    await this.shouldContainText(this.elements.webchatRatingComment, message);
    await this.countTotalElements(this.elements.webchatRatingStart, rating);
  }

  /**
   * function to update the setting
   * @param {string} settingType - settings type
   * @param {string} actionType - action type
   * @returns {void} - nothing
   */
  async updateSetting(settingType, actionType) {
    if (settingType === 'AllowRatingRequest' && actionType === 'true')
      await this.checkToCheckbox(this.elements.webchatAllowRating);
    if (settingType === 'StartChatWithoutMessage' && actionType === 'true') {
      await this.checkToCheckbox(this.elements.webchatAllowSelfChat);
    }
    if (settingType === 'AllowSelfRatingRequest' && actionType === 'true')
      await this.checkToCheckbox(this.elements.webchatAllowSelfRating);
    if (settingType === 'StartChatWithoutMessage' && actionType === 'false')
      await this.uncheckToCheckbox(this.elements.webchatAllowSelfChat);
    if (settingType === 'ShowChatIdOnClient' && actionType === 'true')
      await this.checkToCheckbox(this.elements.showChatId);
    if (settingType === 'UploadCustomWebchatCSS' && actionType === 'false')
      await this.click(this.elements.clearWebchatCss);
    await this.click(this.elements.webchatConfigSave);
    await this.click(this.elements.topSuccessMessage);
  }

  /**
   * function to validate the rate chat
   * @return {void} Nothing
   */
  async validateRateChat() {
    await frames.click(this.elements.webchatContainerSetting);
    await frames.isVisible(this.elements.webchatRateChat);
  }

  /**
   * function to validate the send rating
   * @param {string} type - type
   * @param {string} rate - rating
   * @param {string} message - add message
   *  @returns {void} - nothing
   */
  async SendRating(type, rate, message) {
    if (type === 'rating') {
      await this.switchTab('newTab');
      await frames.click(this.elements.rateinChatBox);
    } else if (type === 'selfrating') {
      await frames.click(this.elements.webchatRateChat);
    }
    let rateStars = '.stars-box span:nth-child(' + rate + ')';
    await frames.isVisible(rateStars);
    await frames.click(rateStars);
    await frames.type(this.elements.starComment, message);
    await frames.click(this.elements.sendRating);
  }

  /**
   * function to get Chat Id
   * @return {void} Nothing
   */
  async getChatId() {
    await frames.locator(this.elements.webchatOptionList).click();
    const chatId = await frames.locator(this.elements.chatId).innerText();
    return chatId;
  }

  /**
   * function to validate the CSS property
   * @param {string} color - color
   * @returns {void} nothing
   */
  async verifyCssproperty(color) {
    const rgb2hex = (rgb) =>
      `#${rgb
        .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
        .slice(1)
        .map((n) => parseInt(n, 10).toString(16).padStart(2, '0'))
        .join('')}`;
    await frames.isVisible(this.elements.webchatMainDialog);
    let bgcolor = await frames.$eval(this.elements.webchatMainDialog, (e) =>
      getComputedStyle(e).getPropertyValue('background-color')
    );
    await this.shouldHasText(rgb2hex(bgcolor), color);
  }

  /**
   * function to validate the started conversation
   * @param {string} type - agent type
   * @param {string} name - agent name
   * @returns {void} nothing
   */
  async verifyConversationStarted(type, name) {
    if (type === 'client') {
      await frames.isVisible('//span[text()="' + name + '"][@class="name"]');
      await frames.isVisible(
        '//div[@class="intro"]/following-sibling::div[text()="joined"]'
      );
    }
    if (type === 'agent') {
      await this.switchTab();
      await this.elementClick('Webchat Channel');
      await this.waitForSelector(this.elements.webchatClientName);
      await this.shouldContainText(this.elements.webchatClientName, name);
      await this.shouldContainText(this.elements.webchatActiveTab, 'Active');
      await this.shouldContainText(this.elements.webchatStatus, 'New');
    }
  }

  /**
   * function to switch the main tab
   * @return {void} Nothing
   */
  async switchToMainTab() {
    await this.switchTab();
  }

  /**
   * function to check the mailBox
   * @param {string} mailbox- check mailbox
   * @return {void} Nothing
   */
  async checkMailbox(mailbox) {
    await this.waitForSelector(this.elements.mailboxFilter);
    await this.type(this.elements.mailboxFilter, mailbox);
    await this.pressKey('Enter');
    let locator = `//td[text()='${mailbox}']/following-sibling::td[last()]/button[last()-1]`;
    await this.waitForSelector(locator);
  }

  /**
   * function to validate the updated mail box setting
   * @param {string} mailboxSetting- mailbox settings
   * @param {string} mailboxSubject- mailbox subject
   * @return {void} Nothing
   */
  async updateMailboxSetting(mailboxSetting, mailboxSubject) {
    if (mailboxSetting.Mailbox === 'true') {
      await this.checkToCheckbox(this.elements.mailboxAllow);
      await this.click(this.elements.mailboxSelect);
      await this.type(
        this.elements.webchatSubjectInput,
        mailboxSetting.MailboxName
      );
      await this.pressKey('Enter');
      await this.type(this.elements.mailboxSubject, mailboxSubject);
      await this.checkToCheckbox(this.elements.mailboxContactRequest);

      if (mailboxSetting.Setting === 'AutoSend') {
        await this.click(this.elements.automaticRadio);
      }
      if (mailboxSetting.Setting === 'ContactRequest') {
        await this.click(this.elements.contactRequestRadio);
      }
      await this.click(this.elements.emailRadio);
    } else if (mailboxSetting.Mailbox === 'false') {
      await this.click(this.elements.mailboxAllow);
      await this.uncheckToCheckbox(this.elements.mailboxContactRequest);
    }
    await this.click(this.elements.webchatConfigSave);
  }

  /**
   * function to select the conversation
   * @return {void} Nothing
   */
  async selectTheConversation() {
    await this.waitForSelector(this.elements.webchatMsg);
    await this.click(this.elements.webchatMsg);
  }

  /**
   * function to send chat by email
   * @return {void} Nothing
   */
  async sendChatByEmail() {
    await frames.locator(this.elements.webchatOptionList).click();
    await frames.isVisible(this.elements.sendChatEmail);
    await frames.locator(this.elements.sendChatEmail).click();
  }

  /**
   * function to validate the reply option
   * @return {void} Nothing
   */
  async verifyReplyOption() {
    // waiting to load text on DOM
    await this.wait(3);
    await this.click(this.elements.webchatMsg);
    await this.waitForSelector(this.elements.webchatReplyButton);
    await this.click(this.elements.webchatReplyButton);
    await this.waitForSelector(this.elements.webchatAgentJoined);
    await this.switchTab('newTab');
    await frames.isVisible(this.elements.webchatAgentJoined);
    await this.switchTab();
  }

  /**
   * function to update contact information in webchat ticket
   * @param {string} contactNumber- contact number
   * @returns {void} nothing
   *
   */
  async updateContactNumber(contactNumber) {
    await this.waitForSelector(this.elements.contactTab);
    await this.click(this.elements.contactTab);
    await this.waitForSelector(this.elements.phoneNumber);
    await this.type(this.elements.phoneNumber, contactNumber);
    await this.click(this.elements.saveContactInfo);
    await this.click(this.elements.conversationTab);
  }

  /**
   * function to click on call action
   * @returns {void} nothing
   *
   */
  async clickToCall() {
    await this.click(this.elements.clickToToggle);
    await this.waitForSelector(this.elements.callAction);
    await this.click(this.elements.callAction);
    await this.waitForSelector(this.elements.callNumberButton);
  }

  /**
   * Function to verify call response after hangup
   * @param {object} callData - object to validate a call
   * @param {string} termReason - verify term reason
   * @param {string} campaign - verify campaign
   */
  async verifyWebchatCall(callData) {
    let termLocator = `//div[@class="the_webchat_message"][contains(.,'${callData.termReason}')]`;
    await this.waitForSelector(termLocator);
    let campaignLocator = `//div[@class="the_webchat_message"][contains(.,'${callData.campaign}')]`;
    await this.waitForSelector(campaignLocator);
  }

  /**
   * Function to delete all previous exceptions
   * @returns {void} nothing
   */
  async deleteAllException() {
    await this.wait(2); //Wait to load all previous exceptions
    if (await this.isVisible(this.elements.deleteExceptionButton)) {
      const totalException = await this.countElement(
        this.elements.deleteExceptionButton
      );
      for (var i = 0; i < totalException; i++) {
        await this.waitForSelector(this.elements.deleteExceptionButton);
        await this.click(this.elements.deleteExceptionButton);
      }
      await this.click(this.elements.webchatConfigSave);
    }
  }

  /**
   * function to navigate to triggers tab
   * @returns {void} nothing
   */
  async navigateToTriggersTab() {
    await this.waitForSelector(this.elements.triggersTab);
    await this.click(this.elements.triggersTab);
  }

  /**
   * function to add trigger
   * @returns {void} nothing
   */
  async addTrigger() {
    await this.waitForSelector(this.elements.addTriggerButton);
    await this.click(this.elements.addTriggerButton);
  }

  /**
   * function to add/edit trigger
   * @param {Object} triggerData - trigger data table
   * @param {string} triggerData.triggerName - trigger name
   * @param {string} triggerData.when - trigger when
   * @param {string} triggerData.action- trigger action
   * @param {string} triggerData.delay - trigger delay
   * @param {string} triggerData.displayName - name to be displayed
   * @param {string} triggerData.sender - sender name
   * @param {string} triggerData.message - message displayed
   * @returns {void} nothing
   */
  async triggerDetails(triggerData) {
    await this.waitForSelector(this.elements.triggerNameInput);
    if (triggerData.triggerName) {
      await this.type(this.elements.triggerNameInput, triggerData.triggerName);
    }
    if (triggerData.when) {
      await this.waitForSelector(this.elements.triggerWhenDropdown);
      await this.selectOptionByText(
        this.elements.triggerWhenDropdown,
        triggerData.when
      );
      if (triggerData.when === 'Contact is idle') {
        assert.isTrue(await this.isVisible(this.elements.triggerTimerLabel));
      }
    }
    if (triggerData.action) {
      await this.waitForSelector(this.elements.triggerActionDropdown);
      await this.selectOptionByText(
        this.elements.triggerActionDropdown,
        triggerData.action
      );
    }
    if (triggerData.delay) {
      await this.waitForSelector(this.elements.triggerDelayInput);
      await this.clearField(this.elements.triggerDelayInput);
      delayData.push(this.elements.triggerDelayInput);
      delayData.push(triggerData.delay);
      await this.setInputValue(delayData);
    }
    if (triggerData.displayName) {
      if (
        await this.checkCheckbosIsChecked(this.elements.triggerAgentNameCheck)
      ) {
        await this.waitForSelector(this.elements.triggerAgentNameCheck);
        await this.click(this.elements.triggerAgentNameCheck);
      }
    }
    if (triggerData.sender) {
      await this.waitForSelector(this.elements.triggerSenderNameInput);
      await this.type(this.elements.triggerSenderNameInput, triggerData.sender);
    }
    if (triggerData.message) {
      await this.click(this.elements.triggerMessageInput);
      await this.type(this.elements.triggerMessageInput, triggerData.message);
    }
    if (triggerData.description) {
      await this.click(this.elements.triggerDesc);
      await this.type(this.elements.triggerDesc, triggerData.description);
    }
    await this.click(this.elements.triggerSaveButton);
  }

  /**
   * function to validate sender name and message on plugin
   * @param {string} sender - sender name on plugin
   * @param {string} message - message text on plugin
   * @returns {void}
   */
  async verifyMessageAndSender(sender, message) {
    await this.switchTab('newTab');
    //wait for dom elements in plugin
    await this.wait(5);
    await this.containSubstring(
      await frames.locator(this.elements.webchatPluginSender).innerText(),
      sender
    );
    await this.containSubstring(
      await frames.locator(this.elements.webChatPluginMesg).innerText(),
      message
    );
    await this.switchTab();
  }

  /**
   * function to delete trigger action
   * @param {string} triggerName - deleted trigger
   * @returns {void} nothing
   */
  async deleteTrigger(triggerName) {
    await this.waitForSelector(this.elements.filterTrigger);
    await this.click(this.elements.filterTrigger);
    await this.type(this.elements.filterTrigger, triggerName);
    await this.pressKey('Enter');
    let deleteTriggerButton = `//td[contains(text(),'${triggerName}')]//following-sibling::td[last()]//button[last()]`;
    await this.waitForSelector(deleteTriggerButton);
    await this.click(deleteTriggerButton);
  }

  /**
   * function to click on the edit trigger action
   * @param {string} action - action name
   * @returns {void} nothing
   */
  async clickToEditTriggerAction(action) {
    let actionLocator = `//table[@id="wc-trigger-datatable"]//tbody//tr//td[text()='${action}']/following-sibling::td[last()]/button[@title="Edit Trigger"]`;
    await this.waitForSelector(actionLocator);
    await this.click(actionLocator);
    await this.waitForSelector(this.elements.triggerNameInput);
  }

  /**
   * function to return to the inbox
   * @returns {void} nothing
   */
  async clickReturnToInbox() {
    await this.waitForSelector(this.elements.returnToInbox);
    await this.click(this.elements.returnToInbox);
    await this.waitForSelector(this.elements.webchatWorkspace);
  }

  /**
   * function to open message from unread tab
   * @returns {void} nothing
   */
  async openUnreadMessage() {
    // waiting to load text on DOM
    await this.wait(3);
    await this.click(this.elements.unreadWebchatMsg);
    await this.waitForSelector(this.elements.replyUnreadMsg);
    await this.click(this.elements.replyUnreadMsg);
  }

  /**
   * function to verify that the message is not present in active tab
   * @param {string} msg - msg name
   * @returns {void} nothing
   */
  async webchatMessageInactive(msg) {
    const flag = await this.isVisible(
      `//div[@id="webchat-inbox-table-ctn"]//tbody//tr//td[6][text()='${msg}']`
    );
    assert.isFalse(flag);
  }

  /**
   * function to access tab
   * @param {string} tabName - name of the tab
   * @returns {void} nothing
   */
  async accessMessageTab(tabName) {
    let locator = `span[data-translate='inbox_${tabName}']`;
    await this.click(locator);
  }

  /**
   * function to verify close webchat modal visibility
   * @returns {void} nothing
   */
  async verifyCloseWebchatModal(status) {
    //wait for modal to open
    await this.wait(2);
    let flag = await this.isVisible(this.elements.closeChatModal);
    if (status === 'not') {
      assert.isFalse(flag);
    } else {
      await this.waitForSelector(this.elements.closeChatModal);
      assert.isTrue(flag);
    }
  }

  /**
   * function to assign group
   * @param {Object} webchatSearchData - webchat search data object
   * @param {string} webchatQueue - Webchat Queue
   * @param {string} startDate - Start Date
   * @param {string} endDate - End Date
   * @returns {void} nothing
   */
  async webchatFilter(webchatSearchData) {
    await this.waitForSelector(this.elements.searchButton);
    await this.click(this.elements.searchButton);
    await this.waitForSelector(this.elements.webchatQueueInput);
    if (webchatSearchData.webchatQueue) {
      await this.type(
        this.elements.webchatQueueInput,
        webchatSearchData.webchatQueue
      );
      await this.pressKey('Enter');
    }
    if (webchatSearchData.startDate) {
      await this.type(
        this.elements.webchatStartDate,
        webchatSearchData.startDate
      );
      await this.pressKey('Enter');
    }
    if (webchatSearchData.endDate) {
      await this.type(this.elements.webchatEndDate, webchatSearchData.endDate);
      await this.pressKey('Enter');
    }
    await this.click(this.elements.searchWebchatButton);
  }

  /**
   * function to check if webchat plugin is closed after n-time
   * @param {string} time - time
   * @param {string} pluginWindow - plugin window
   * @returns {void} nothing
   */
  async isPluginClosed(time, pluginWindow) {
    let pages = '';
    let pageRef = '';
    let pluginTabIndex = 0;
    if(pluginWindow === 'first'){
      pages = await global.context.pages();
      pluginTabIndex = 1;
    } else if(pluginWindow === 'second'){
      pages = await global.secondContext.pages();
    } else if(pluginWindow === 'third'){
      pages = await global.thirdContext.pages();
    }

    pageRef = await pages[pluginTabIndex];
    let t = parseInt(time);
    await this.wait(t);
    let isElement = await pageRef.locator(this.elements.webchatContact).isVisible();
    console.log('isElement=', isElement);
    assert.isFalse(isElement);
    pageRef = await pages[0];
  }

  /**
   * function to verify the warning icon displayed
   *  @returns {void} nothing
   */
  async warningIconDisplayed() {
    await this.waitForSelector(this.elements.warningIcon);
  }

  /**
   * function to verify the container border
   * @param {int} msgIndex - msg box index
   * @param {string} borderColor -color of border
   * @returns {void} nothing
   */
  async checkContainerBorder(msgIndex, borderColor) {
    let msgLocator = `//div[contains(@class, 'unregister')][${msgIndex}]`;
    await this.waitForSelector(msgLocator);
    const navBar = await page.locator(msgLocator);
    const color = await navBar.evaluate((element) =>
      // eslint-disable-next-line no-undef
      window.getComputedStyle(element).getPropertyValue('border')
    );
    console.log('color==', color);
    console.log('borderColor==', borderColor);
    if(color!==''){
      console.log('validation of border');
      await this.containSubstring(color, borderColor);
    }
  }

  /**
   * function to verify the tool tip message
   * @param {string} message -message displayed
   * @returns {void} nothing
   */
  async verifyTooltipMessage(message) {
    await this.mouseOver(this.elements.warningIcon);
    await this.waitForSelector(this.elements.warningToolTip);
    let actualMsg = await this.getText(this.elements.warningToolTip);
    console.log('actualMsg=', actualMsg);
    console.log('message=', message);
    assert.equal(actualMsg, message);
  }

  /**
   * function to close webchat conversation modal
   * @returns {void} nothing
   */
  async closeWebchatModal() {
    await this.waitForSelector(this.elements.closeWebchatModalButton);
    await this.click(this.elements.closeWebchatModalButton);
  }

  /**
   * function to verify right alignment of element
   * @param {string} alignment - expected alignment
   * @returns {void} nothing
   */
  async verifyTextAlignment(alignment) {
    if (await this.isVisible(this.elements.modalFooter)) {
      assert.isTrue((await this.getElementAlignment(this.elements.modalFooter)) ===
        alignment);
    } else
      assert.isTrue(false);
  }

  /**
   * function to verify asterisk in close modal
   * @returns {void} nothing
   */
  async verifyAsterik() {
    const asteriskClass =  await this.getAttributeElement(this.elements.asteriskLabel, 'class');
    assert.isTrue(asteriskClass.includes('mark-as-required'));
  }

  /**
   * function to verify icon is visible in close modal
   * @param {string} iconClass - class of icon
   * @returns {void} nothing
   */
  async verifyIconVisible(iconClass) {
    // wait to load
    await this.wait(3);
    const visibility = await this.isVisible(`div#modal-close i.${iconClass}`);
    assert.isTrue(visibility);
  }

  /**
   * function to click close conversation
   * @returns {void} nothing
   */
  async clickCloseConversation() {
    await this.click(this.elements.actionsBtn);
    await this.waitForSelector(this.elements.closeBtn);
    await this.click(this.elements.closeBtn);
  }

  /**
   * function to close a conversation with subject
   * @param {string} subject - subject
   * @param {string} status - status
   * @returns {void} nothing
   */
  async closeConversationWithSub(subject, status) {
    await this.click(this.elements.webchatSubject);
    await this.type(this.elements.webchatSubjectInput, subject);
    await this.pressKey('Enter');
    await this.click(this.elements.webchatCloseComment);
    await this.type(this.elements.webchatCloseComment, status);
    await this.click(this.elements.webchatConversationButton);
    await this.isVisible(this.elements.successMessage);
  }

  /**
   * function to select webchat message by its occurance
   * @param {int} msgIndex - message index
   * @returns {void} nothing
   */
  async selectMessage(msgIndex) {
    let msgLocator = `//div[contains(@class, 'unregister')][${msgIndex}]`;
    await this.click(msgLocator);
  }

  /**
   * function to verify webchat status in search
   * @param {string} messageText - message text at the time of closing
   * @param {int} messageStatus - message status
   * @returns {void} nothing
   */
  async verifyMessageStatus(messageText, messageStatus) {
    await this.waitForSelector(this.elements.searchFilterInput);
    await this.type(this.elements.searchFilterInput, messageText);
    await this.pressKey('Enter');
    let locator = `//table[@id='wc-search-datatable']//tbody//tr[1]//td[text()='${messageStatus}']`;
    assert.isTrue(await this.isVisible(locator));
  }

  /**
   * function to verify transfer conversation button
   * @returns {void} nothing
   */
  async verifytransferConversations() {
    const visibility = await this.isVisible(this.elements.transferConversationbtn);
    assert.isFalse(visibility);
  }

  /**
   * function to verify msg layout
   * @param {string} msgIndex - message index
   * @returns {void} nothing
   */
  async verifyLayout(msgIndex){
    let msgLocator = `//div[contains(@class, 'unregister')][${msgIndex}]`;
    await this.waitForSelector(msgLocator);
    await this.shouldContainSomeText(msgLocator);
    await this.shouldContainText(msgLocator, 'Client Offline');
  }

};
