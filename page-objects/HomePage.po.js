/*global browser, page*/
const { BaseAction } = require('../setup/baseAction');
const { apiHelper } = require('../setup/apiHelper');
let randomStringMessage;
const api = new apiHelper();

exports.Homepage = class Homepage extends BaseAction {
  constructor() {
    super();
    randomStringMessage = this.generateRandomMessage();
  }

  /**
   * Creating elements object for initializing required locators for home page.
   */
  elements = {
    usernameInput: '#container-signin input[name="email"]',
    passwordInput: '#container-signin input[name="password"]',
    signInButton: '#btn-login',
    profileDashboard: '#profile-page-slideshow',
    profileRole: '#profile-role',
    ticketShowButton: '//div[@id="tickets-show-btn"]',
    singleTicketSendButton: 'li#btnSingleTicketSend',
    channelButton: '#channel-tickets-connection-toggle',
    webchatButton: '#channel-webchat-connection-toggle',
    logoutButton: '#main-logout a',
    confirmLogoutButton: '#bot2-Msg1',
    messagingButton: '#header-notify',
    globalNotification: '#global-notifications',
    chatNoAccessMessage: '#global-notifications p',
    activeUserList: '#notify-list li.filtered',
    broadcastMessageIcon: '#broadcastButton',
    broadcastMessageToDropdown: '#s2id_broadcastSelect',
    broadcastMessageSubjectTextbox: '#broadcastSubject',
    broadcastMessaegBodyTextbox: '#broadcastBody',
    sendBroadcastMessage: '#sendBroadcast',
    broadcastConfirmationMessage: '#BigboxID3',
    userFromUserTab: '#notify-list > li.filtered',
    sendMessageTextbox: 'textarea[data-translate="internalChat.newMessage"]',
    userCounter: '#logo-group',
    recievedMessage:
      '#profile-latest-messages-content .message:nth-child(1) .message-text',
    sendMessageSearchBox: '.friend-notifications-search',
    backgroundImage: '.item-image',
    broadcastMessageToTextbox: '#s2id_broadcastSelect input',
    showProfileButton: '#showprofile',
    qualityMenu: 'a[data-title="Quality"]',
    qualityManagerMenu:
      '//a[@data-title="Quality"]/following-sibling::ul//a[@data-title="Manager"]',
    qualityManagerPage: '#quality-welcome-well',
    qualityScriptBuilderPage: '#script-manager',
    notificationTabSelector: '#notify-status-link',
    noCounter: '#header-notify .badge.bg-color-blueGo',

    // Breaks :

    userGroupParentMenu: 'a[id="menu_10"]',
    usersGroup: '#menu_30',
    mainLogout: '#main-logout a', //wechtplgn
    voiceChannelLogin: '#channel-voice-label-text', //voicechnl
    breakManage: '#breaks-manager-btn',
    breaksButton: '#breaks-show-btn',

    // Dashboard

    sidePanelExpandMenu: '#left-panel .minifyme', //
    realStatsMenu: '//span[@data-translate="realtimestats"]/..', //
    dashboardButton: '#menu_14 .fa-dashboard', // 3 in one Dashboard

    //Database Manager

    clickOnline: '.online',
    clickVoiceManager: '//span[@data-translate="voice"]/..',
    databaseManagerMenuIcon: '//a[contains(@href,"/database-manager.html")]',
    clickDatabaseManager: '//span[@data-translate="dbmanager"]/..',

    // Internal chat

    adminToolsMenu: '#menu_13',
    profileManagerButton: '#menu_32',

    // Scriptbuilder

    scriptBuilder: 'a[id="menu_3"]',
    createTicketLinkShowBtn: '#tickets-show-btn',

    // ticketonline

    ticketsMenu: '//span[contains(@class,"menu") and text()="Tickets"]/..',
    ticketShowBtn: '//i[@data-translate="sendTickets"]',
    singleTicketSendBtn: 'li#btnSingleTicketSend',
    ticketManagerMenu: '#fs-menu ul li #menu_17',
    tickets_link: '#menu_2',
    ticketManager: '#menu_17',
    voiceManager: '[id="menu_1"]',

    // webchat channel

    webchatChannel: '#channel-webchat-connection-toggle', // homepage-26
    webchatManagerMenu: 'a[id="menu_34"]',
    ticketChannel: '.ws-link-tickets span#channel-tickets-connection-toggle', //homepage - 25
    // webchat plugin
    forceLogoutWarningMessage:
      '//span[@data-translate=\'warningMessage.forceLogout.title\']',
    qualityScriptBuilderMenu:
      '//span[normalize-space()="Quality script builder"]',
    activeCallModal: '//div[@id="modal-login-while-call"]',
    voiceChannelModal: '#login-while-on-call-body',
    placeOnHoldButton: '#modal-login-while-call-hold',
    hangupButton: '#modal-login-while-call-hangup',
    resumeCall: '#modal-login-while-call-resume',
    //reports Analytics
    reportsAnalyticsMenu: 'a[data-title="Reports & Analytics"]',
    reportsDesigner: '//span[normalize-space()="Report designer"]',
    reportsDesignerPage:
      '//div[@id="default-workspace"]//span[normalize-space()="Report Designer"]',
    eLearningMenu: 'a[data-title="E-learning"]',
    eLearningScriptBuilderMenu:
      '//span[normalize-space()="E-learning script builder"]',
    eLearningScriptBuilderPage: '#script-manager',
    logo: '#logo-gocontact-header-container'
  };

  validationText = {
    emailSentNotification: 'Success',
    chatNoAccessMessage: 'No online users available.',
  };

  /**
   * Function to open home page
   * @return {void} Nothing
   */
  async openBrowserWithURL() {
    await this.openBrowser(global.BASE_URL);
  }

  /**
   * function to login on go contact
   * @param {object} loginData - logindata
   * @param {string} loginData.username - username
   * @param {string} loginData.password - password
   * @param {string} type - page type
   * @return {void} Nothing
   */
  async loginProcess(loginData, type = '') {
    await this.type(
      this.elements.usernameInput,
      loginData.username + '@' + global.DOMAIN,
      type
    );
    await this.type(this.elements.passwordInput, loginData.password, type);
    await this.click(this.elements.signInButton, type);
  }

  async reloadPage() {
    await page.reload({ waitUntil: 'load' });
    await this.wait(30); // added wait to load the complete page
    await this.waitForSelector(this.elements.logo);
  }

  /**
   * Function to check if requested element is displayed on page.
   * @param {string} element - element to be displayed
   * @param {string} type - page type
   * @return {void} Nothing
   */
  async verifyPageDisplayed(element, type = '') {
    try {
      await this.waitForSelector(this.elements.profileDashboard, type);
    } catch (error) {
      console.log(error);
      await page.reload();
      await this.wait(20);
      await this.waitForSelector(this.elements.profileDashboard, type);
    }
    if (element === 'dashboard') {
      await this.shouldVisible(this.elements.profileDashboard, type);
    }
  }

  /**
   * Function to check if dashboard displayed role wise.
   * @param {string} role - agent role
   * @param {string} type - page type
   * @return {void} Nothing
   */
  async verifyPageDisplayedRoleWise(role, type = '') {
    try {
      await this.waitForSelector(this.elements.profileRole, type);
    } catch (error) {
      console.log(error);
      await page.reload();
      await this.waitForSelector(this.elements.profileRole, type);
    }
    let text = await this.getText(this.elements.profileRole, type);
    console.log(text + ' ' + role);
  }

  /**
   * Function to click nav bar button
   * @return {void} Nothing
   */
  async clickNavBarButton() {
    await this.waitForSelector(this.elements.ticketShowButton);
    await this.click(this.elements.ticketShowButton);
  }

  /**
   * Function to click send email button
   * @return {void} Nothing
   */
  async clickSendEmailBtn() {
    await this.click(this.elements.singleTicketSendButton);
  }

  /**
   * Function to goto ticket channel
   * @return {void} Nothing
   */
  async navigateToTicketChannel() {
    await this.waitForSelector(this.elements.channelButton);
    await this.click(this.elements.channelButton);
  }

  /**
   * Function to goto webchat channel
   * @param  {string} type -  page type
   * @return {void} Nothing
   */
  async navigateToWebchatChannel(type = '') {
    await this.click(this.elements.webchatButton, type);
  }

  /**
   * Function to verify gg contact homepage
   * @return {void} Nothing
   */

  goContactHome() {
    this.shouldVisible(this.elements.goContactHome);
  }

  /**
   * Function to logout
   * @return {void} Nothing
   */

  async logout() {
    await this.click(this.elements.logoutButton);
    await this.waitForSelector(this.elements.confirmLogoutButton);
    await this.click(this.elements.confirmLogoutButton);
  }

  /**
   * Function to click send email button
   * @param {string} type  - page type
   * @return {void} Nothing
   */
  async clickOnMessagingOption(type = '') {
    if (await this.isVisible(this.elements.backgroundImage, type)) {
      await this.waitForSelector(this.elements.backgroundImage, type);
    }
    await this.waitForSelector(this.elements.userCounter, type);
    // waiting for messaging button to appear
    await this.wait(2);
    await this.forceClick(this.elements.messagingButton, type);
    await this.waitForSelector(this.elements.globalNotification, type);
  }

  /**
   * Function to verify chat access
   * @return {void} Nothing
   */
  async verifyChatAccess() {
    this.shouldHasText(
      await this.getText(this.elements.chatNoAccessMessage),
      this.validationText.chatNoAccessMessage
    );
  }

  /**
   * Function to verify active user list
   * @return {void} Nothing
   */

  async verifyActiveUserList() {
    await this.wait(2); //added wait to load search result
    await this.waitForSelector(this.elements.activeUserList);
    await this.shouldVisible(this.elements.activeUserList);
  }

  /**
   * Function to click on broadcast message
   * @return {void} Nothing
   */

  async clickOnBroadcastMessageOption() {
    await this.waitForSelector(this.elements.broadcastMessageIcon);
    await this.click(this.elements.broadcastMessageIcon);
    await this.waitForSelector(this.elements.broadcastMessageToDropdown);
  }

  /**
   * Function to send broadcast message
   * @return {void} Nothing
   */

  async sendBroadcastMessageToAllAgent() {
    await this.click(this.elements.broadcastMessageToDropdown);
    await this.pressKey('Enter');
    await this.type(
      this.elements.broadcastMessageSubjectTextbox,
      'This is a test subject'
    );
    await this.type(
      this.elements.broadcastMessaegBodyTextbox,
      randomStringMessage
    );
    await this.click(this.elements.sendBroadcastMessage);
  }

  /**
   * Function to send broadcast message to agent
   * @param {string} loginData - agent info
   * @param {object} data message object
   * @param {string} data.subject message subject
   * @param {string} data.message message text
   * @return {void} Nothing
   */

  async sendBroadcastMessageToParticularAgent(loginData, data) {
    await this.click(this.elements.broadcastMessageToDropdown);
    await this.type(this.elements.broadcastMessageToTextbox, loginData);
    await this.pressKey('Enter');
    if (data.subject && data.subject !== '') {
      await this.type(
        this.elements.broadcastMessageSubjectTextbox,
        data.subject
      );
    } else {
      await this.type(
        this.elements.broadcastMessageSubjectTextbox,
        'This is a test subject'
      );
    }
    if (data.message && data.message !== '') {
      await this.type(this.elements.broadcastMessaegBodyTextbox, data.message);
    } else {
      await this.type(
        this.elements.broadcastMessaegBodyTextbox,
        randomStringMessage
      );
    }
    await this.click(this.elements.sendBroadcastMessage);
  }

  /**
   * Function to verify broadcast message in sent
   * @return {void} Nothing
   */

  async verifyBroadcastMessageIsSent() {
    await this.isVisible(this.elements.broadcastConfirmationMessage);
  }

  /**
   * Function to send broadcast message to agent
   * @param {object} loginData - agent info
   * @param {string} loginData.name - agent name
   * @param {string} type - page type
   * @return {void} Nothing
   */
  async selectUserFromUsersTab(loginData, type) {
    await this.searchMessagingOption(loginData.name, type);
    await this.waitForSelector(this.elements.userFromUserTab, type);
    await this.click(this.elements.userFromUserTab, type);
  }

  /**
   * Function to send message
   * @param {string} type - page type
   * @return {void} Nothing
   */

  async sendMessageToSelectedUser(type) {
    await this.waitForSelector(this.elements.sendMessageTextbox, type);
    await this.type(
      this.elements.sendMessageTextbox,
      randomStringMessage,
      type
    );
    await this.pressKey('Enter', type);
  }

  /**
   * Function to verify message is sent
   * @return {void} Nothing
   */
  async verifyMessageIsSend() {
    await this.shouldContainText(
      this.elements.messageTextFromMe,
      randomStringMessage
    );
  }

  /**
   * Function to verify message is recieved
   * @return {void} Nothing
   */
  async verifyMessageIsRecieved() {
    await this.waitForSelector(this.elements.recievedMessage);
    await this.shouldContainText(
      this.elements.recievedMessage,
      randomStringMessage
    );
  }

  /**
   * Function to open new browser session
   * @param {string} loginData.username - username
   * @param {string} loginData.password - password
   * @param {string} name - agent name
   * @return {void} Nothing
   */

  async openNewBrowserSessionAndVerifyUser(loginData, name) {
    // Create a new incognito browser context
    const context = await browser.newContext();
    // Create a new page inside context.
    global.page = await context.newPage();
    await page.goto(global.BASE_URL);
    await this.loginProcess(loginData);
    await this.waitForPageNavigation();
    await this.clickOnMessagingOption();
    await this.searchMessagingOption(name);
    await this.verifyActiveUserList();
  }

  /**
   * Function to search message
   * @param {string} name - username
   * @param {string} type - page type
   * @return {void} Nothing
   */

  async searchMessagingOption(name, type) {
    await this.waitForSelector(this.elements.sendMessageSearchBox, type);
    await this.type(this.elements.sendMessageSearchBox, name, type);
    await this.pressKey('Enter', type);
  }

  /**
   * verifying force logout
   * @return {void} Nothing
   */
  async verifyForceLogout() {
    await this.waitForSelector(this.elements.usernameInput);
    await this.isVisible(this.elements.usernameInput);
    await this.waitForSelector(this.elements.forceLogoutWarningMessage);
    await this.shouldContainText(
      this.elements.forceLogoutWarningMessage,
      'Force logout'
    );
  }

  /**
   * Function to wait for page navigation
   * @return {void} Nothing
   */
  async waitForPageNavigation() {
    await this.waitForNavigation();
  }

  /**
   * Function to navigate to homepage
   * @return {void} Nothing
   */
  async navigateToHomePage() {
    await this.click(this.elements.showProfileButton);
  }

  /**
   * Function to goto Quality Manager menu
   * @return {void} Nothing
   */
  async navigateToQualityManager() {
    await this.waitForSelector(this.elements.sidePanelExpandMenu);
    await this.click(this.elements.sidePanelExpandMenu);
    await this.waitForSelector(this.elements.qualityMenu);
    if(!(await this.isVisible(this.elements.qualityManagerMenu))){
      await this.click(this.elements.qualityMenu);
    }
    await this.waitForSelector(this.elements.qualityManagerMenu);
    await this.click(this.elements.qualityManagerMenu);
    await this.waitForSelector(this.elements.qualityManagerPage);
    await this.click(this.elements.sidePanelExpandMenu);
  }

  /**
   * Function to goto quality script builder menu
   * @return {void} Nothing
   */
  async navigateToQualityScriptBuliderMenu() {
    await this.mouseOver(this.elements.qualityMenu);
    await this.waitForSelector(this.elements.qualityScriptBuilderMenu);
    await this.click(this.elements.qualityScriptBuilderMenu);
    await this.waitForSelector(this.elements.qualityScriptBuilderPage);
  }

  /**
   * Function to open or close expanded menu
   * @return {void} Nothing
   */
  async toggleLeftExpandMenu() {
    await this.waitForSelector(this.elements.sidePanelExpandMenu);
    await this.click(this.elements.sidePanelExpandMenu);
  }

  /**
   * function to call api to delete redis call
   * @param {json} session - user session
   * @returns {void} nothing
   */
  async deleteRedisCall(session) {
    // waiting for active call popup to appear
    let body = '';
    body = {
      domain_name: global.DOMAIN,
    };
    let headers = '';
    headers = {
      'qa-api-key': global.QA_API_KEY,
    };
    await this.wait(5); //wait for element to load
    let check = await this.isVisible(this.elements.activeCallModal, session);
    if (check) {
      let value = await this.getAttributeElement(
        this.elements.activeCallModal,
        'style',
        session
      );
      if (value === 'display: block;') {
        await api.goContactDelete('/poll/qa/redis/call', body, headers);
      }
    }
  }

  /* Function to verify voice call modal on home page
   * @return {void} Nothing
   */
  async verifyVoiceModal() {
    await this.waitForSelector(this.elements.voiceChannelModal);
  }

  /**
   * Function to click button on voice modal
   * @param {string} action - action name
   * @return {void} Nothing
   */
  async clickButton(action) {
    if (action === 'hang up') {
      await this.click(this.elements.hangupButton);
    }
    if (action === 'resume call') {
      await this.click(this.elements.resumeCall);
    }
    if (action === 'place on hold') {
      await this.click(this.elements.placeOnHoldButton);
    }
  }

  /**
   * Function to navigate to report Designer
   * @return {void} Nothing
   */
  async navigateToReportDesigner() {
    await this.mouseOver(this.elements.reportsAnalyticsMenu);
    await this.waitForSelector(this.elements.reportsDesigner);
    await this.click(this.elements.reportsDesigner);
    await this.waitForSelector(this.elements.reportsDesignerPage);
  }

  /** function to access notification tab
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async notificationTab(type = '') {
    await this.waitForSelector(this.elements.notificationTabSelector, type);
    await this.click(this.elements.notificationTabSelector, type);
  }

  /**
   * function to verify no counter visible
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async verifyNoCounter(type = '') {
    if (await this.isVisible(this.elements.noCounter, type)) {
      return;
    }
  }

  /**
   * Function to access e-Learning script builder menu
   * @return {void} Nothing
   */
  async navigateToELearningScriptBuliderMenu() {
    await this.mouseOver(this.elements.eLearningMenu);
    await this.waitForSelector(this.elements.eLearningScriptBuilderMenu);
    await this.click(this.elements.eLearningScriptBuilderMenu);
    await this.waitForSelector(this.elements.eLearningScriptBuilderPage);
  }
};
