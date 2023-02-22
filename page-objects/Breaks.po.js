/*global browser, secondContext, secondSession, thirdContext, thirdSession, fourthContext, fourthSession*/

const { assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');

exports.Breaks = class Breaks extends BaseAction {
  constructor() {
    super();
  }
  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    userGroupParentMenu: 'a[id="menu_10"]',
    agentQualityParentMenu: 'a[id="menu_12"]',
    agentQualityMenu: 'a[id="menu_12"] span',
    usersGroup: '#menu_30',
    userPage: '#user-groups-managment-page',
    agentQualityPage: '#topics_tabs',
    searchGroup: '#groups_search_input',
    groupPanel: '#agents_and_groups_container',
    addBreakButton: 'span[data-translate="break_btn_add_break"]',
    breakName: 'input.new-break-name',
    saveBreak: 'button.new-break-save',
    agentFilter: '#users_in_group_table_filter input',
    agentCheckExist: '#users_in_group_table tbody tr td.dataTables_empty',
    addAgentButton: '#show_user_to_group_modal',
    addUserModal: '#add_user_to_group_modal',
    userFilter: '#users_table_filter input',
    selectUserCheckbox: '#users_table tbody tr:first-child td label.checkbox',
    addUserToGroup: 'span[data-translate="user_add_dialog_btn_add_to_group"]',
    closeModal: '#closeUserList',
    authTrue: 'i[data-name="agent_permission"]',
    breaksButton: '#breaks-show-btn',
    breakEndTime: 'input.new-timepick-end',
    breakStartTime: 'input.new-timepick-init',
    breakMaxTime: 'input.new-break-max-time',
    breakManage: '#breaks-manager-btn',
    breakFilter: '#break_table_requested_filter input',
    breakReject: '.break-btn-reject',
    bodyDoc: 'body',
    maxUser: '#max_users_on_break',
    maxUserInput: '.editable-input input',
    maxUserOkButton: '.editable-buttons .editable-submit',
    breakApprove: '.break-btn-approve',
    breaksDropdown: '#dropdown-breaks',
    callInfoTable: '//table[@id="voice-outbound-callinfo-table"]',
    firstContactInVoice: '//button[@id="voice-field-first_phone-btn"]',
    BluePopUp:
      '//div[@id="newContentdiv"]/p[contains(text(),"is currently Locked because it has no more Leads. Its status will be refreshed within a maximum of 5 minutes")]',
    userCounter: '#logo-group',
    deleteBreakButton: '#breaks-table-body > div:nth-child(1)  .delete-break',
    totalBreakList: '.delete-break',
    confirmDeleteButton: '#delete_break_modal_button',
    profilePage: '#menu_11',
    ignoreMaxCheckBox:'.new-ignore-max ~i',
    customMaxUser: '.new-break .custom-max-users input',
    validateBreak: '.toggle-auth.active-icon',
    editBreak: '//button[@data-original-title="Edit"]',
    saveBreakAgain : 'button.break-save',
    errorPopUp:'//div[@id="newContentdiv"]/p[contains(text(),"You can’t call this contact because its daily max. tries limit has been reached")]'

  };
  /**
   * function to click users and groups menu
   * @param {string} menuOption - menu option to select
   * @param  {string} type -  page type
   * @return {void} Nothing
   */
  async elementClick(menuOption,type='') {
    if (menuOption === 'Users & Groups') {
      await this.mouseOver(this.elements.userGroupParentMenu,type);
      await this.click(this.elements.usersGroup,type);
      await this.waitForSelector(this.elements.userPage,type);
    }
    if(menuOption === 'Profile'){
      await this.waitForSelector(this.elements.profilePage,type);
      await this.click(this.elements.profilePage,type);
     
    }
    if (menuOption === 'Agent Quality') {
      await this.mouseOver(this.elements.agentQualityParentMenu);
      await this.click(this.elements.agentQualityMenu);
      await this.waitForSelector(this.elements.agentQualityPage);
    }
  }
  /**
   * function to select group
   * @param {string} group - select group
   * @return {void} Nothing
   */
  async selectGroup(group) {
    await this.type(this.elements.searchGroup, group);
    await this.pressKey('Enter');
    let groupLocator = `#groups_list li[data-name='${group}']`;
    await this.waitForSelector(groupLocator);
    await this.click(groupLocator);
    await this.waitForSelector(this.elements.groupPanel);
  }

  /**
   * function to create break
   * @param {object} breaks -
   * @param {string} breaks.breakName - break name
   * @param {string} breaks.startTime - break start time
   * @param {string} breaks.endTime - break end time
   * @param {string} breaks.auth - break authentication
   * @param {string} breaks.breakBtn - click break btn
   * @return {void} Nothing
   */
  async createBreak(breaks) {
    if(breaks.breakBtn === false){
      await this.waitForSelector(this.elements.breakName);
    }else{
      await this.click(this.elements.addBreakButton);
      await this.waitForSelector(this.elements.breakName);
    }

    await this.type(this.elements.breakName, breaks.breakName);
    await this.pressKey('Enter');
    await this.type(this.elements.breakStartTime, breaks.startTime);
    await this.pressKey('Enter');
    await this.type(this.elements.breakEndTime, breaks.endTime);
    await this.pressKey('Enter');
    await this.type(this.elements.breakMaxTime, breaks.maxTime);
    await this.pressKey('Enter');
    if (breaks.auth === 'true') {
      await this.click(this.elements.authTrue);
    }
    await this.click(this.elements.saveBreak);
  }

  /**
   * function to add agent
   * @param {string} agent - agent
   * @return {void} Nothing
   */
  async addAgent(agent) {
    await this.type(this.elements.agentFilter, agent);
    await this.pressKey('Enter');
    const isExist = await this.isElementExist(this.elements.agentCheckExist);
    if (isExist.length) {
      //Add Agent
      await this.click(this.elements.addAgentButton);
      await this.waitForSelector(this.elements.addUserModal);
      await this.type(this.elements.userFilter, agent);
      await this.pressKey('Enter');
      await this.waitForSelector(this.elements.selectUserCheckbox);
      await this.checkBox(this.elements.selectUserCheckbox);
      await this.click(this.elements.addUserToGroup);
      await this.click(this.elements.closeModal);
    }
  }

  async verifyContactsLoadedInVoiceChannel(databaseDetails, type = '') {
    await this.isVisible(this.elements.callInfoTable, type);
    await this.waitForSelector(this.elements.firstContactInVoice, type);
    for (let i = 1; i <= databaseDetails.numOfColumnsToUpload; i++) {
      let num = await this.getText(
        '//td[contains(text(),"Phone #' + i + '")]/button',
        type
      );
      await console.log(num);
    }
  }

  async noCallsTriggered(CampaignType) {
    let info = await this.isVisible(this.elements.callInfoTable);
    assert.isFalse(info);
    if (CampaignType === 'dialer-preview') {
      await this.waitForSelector(this.elements.BluePopUp);
      let bluePopUp = await this.isVisible(this.elements.BluePopUp);
      await assert.isTrue(bluePopUp);
    }
  }

  /**
   * function to request for break
   * @param {string} breakName - breakname
   * @param {string} auth - verify authentication
   * @return {void} Nothing
   */
  async requestForBreak(breakName, auth, type = '') {
    await this.mouseOver(this.elements.breaksButton, type);
    await this.waitForSelector(this.elements.breaksButton, type);
    await this.click(this.elements.breaksButton, type);
    let locator = `//li[contains(., "${breakName}")]`;
    await this.waitForSelector(locator, type);
    await this.isVisible(locator, type);
    await this.click(locator, type);
    if (!auth) {
      const locatorOnAction = `//a[contains(@class, "break-active bg-color-blueGo") and contains(., "${breakName}")]`;
      await this.isVisible(locatorOnAction, type);
    }
    await this.click(this.elements.bodyDoc, type);
  }

  /**
   * function to perform action in
   * @param {string} breakName - breakname
   * @param {string} actionTaken - action on break
   * @return {void} Nothing
   */

  async actionOnBreakRequest(breakName, actionTaken, type = '') {
    await this.waitForSelector(this.elements.breakManage, type);
    await this.forceClick(this.elements.breakManage, type);
    await this.waitForSelector(this.elements.breakFilter, type);
    await this.type(this.elements.breakFilter, breakName, type);
    await this.pressKey('Enter', type);
    let locator = '//td[contains(., "' + breakName + '")]';
    await this.waitForSelector(locator, type);
    await this.isVisible(locator, type);
    if (actionTaken === 'rejected') {
      await this.click(this.elements.breakReject, type);
    } else if (actionTaken === 'approves') {
      await this.click(this.elements.breakApprove, type);
    }
  }

  /**
   * function to notify action to agent
   * @param {string} breakName - breakname
   * @param {string} actionTaken - action on break
   * @return {void} Nothing
   */

  async agentNotifyAction(breakName, actionTaken, type = '') {
    let locatorOnAction = '';
    await this.switchTab();
    if (!(await this.isVisible(this.elements.breaksDropdown, type))) {
      await this.waitForSelector(this.elements.breaksButton, type);
      await this.mouseOver(this.elements.breaksButton, type);
      await this.waitForSelector(this.elements.breaksButton, type);
      await this.forceClick(this.elements.breaksButton, type);
    }
    const locator = `//li[contains(., '${breakName}')]`;
    await this.waitForSelector(locator, type);
    await this.isVisible(locator, type);
    if (actionTaken === 'rejection') {
      locatorOnAction = `//a[contains(@class, "bg-color-greenGo") and contains(., "${breakName}")]`;
      await this.isVisible(locatorOnAction, type);
    }
    if (actionTaken === 'approval') {
      locatorOnAction = `//a[contains(@class, "bg-color-red break-active") and contains(., "${breakName}")]`;
      await this.isVisible(locatorOnAction, type);
    }
    await this.click(this.elements.bodyDoc, type);
  }

  /**
   * function to open new browser session
   * @return {void} Nothing
   */

  async openNewBrowserSession(session) {
    if (session === 'second') {
      global.secondContext = await browser.newContext();
      global.secondSession = await secondContext.newPage();
      await secondSession.goto(global.BASE_URL);
    } else if (session === 'third') {
      global.thirdContext = await browser.newContext();
      global.thirdSession = await thirdContext.newPage();
      await thirdSession.goto(global.BASE_URL);
    } else if (session === 'fourth') {
      global.fourthContext = await browser.newContext();
      global.fourthSession = await fourthContext.newPage();
      await fourthSession.goto(global.BASE_URL);
    }
  }

  /**
   * function to set max users
   * @param {string} value - value for max users
   * @return {void} Nothing
   */
  async setMaxuser(value) {
    await this.waitForSelector(this.elements.maxUser);
    await this.click(this.elements.maxUser);
    await this.waitForSelector(this.elements.maxUserInput);
    await this.type(this.elements.maxUserInput, value);
    await this.waitForSelector(this.elements.maxUserOkButton);
    await this.click(this.elements.maxUserOkButton);
  }

  /**
   * function to request for break on limit
   * @param {string} breakName - break name
   * @return {void} Nothing
   */

  async requestForBreakOnLimit(breakName) {
    await this.waitForSelector(this.elements.userCounter, 'second');
    await this.waitForSelector(this.elements.breaksButton, 'second');
    await this.wait(2); // wait is needed to load breaks
    await this.mouseOver(this.elements.breaksButton, 'second');
    await this.forceClick(this.elements.breaksButton, 'second');
    await this.waitForSelector(this.elements.breaksDropdown, 'second');
    const locator = `//li[contains(., "${breakName}")]`;
    await this.waitForSelector(locator, 'second');
    await this.isVisible(locator, 'second');
    await this.click(locator, 'second');
    const locatorOnAction =
      '//div[contains(@id, \'newContentdiv\') and contains(., \'max agents on break has been reached\')]';
    await this.isVisible(locatorOnAction, 'second');
    await this.click(this.elements.bodyDoc, 'second');
    await this.click(this.elements.bodyDoc);
    await global.secondSession.close();
    await global.secondContext.close();
  }

  /**
   * function to exceed time validate
   * @param {string} breakName - break name
   * @return {void} Nothing
   */
  async exceedTimeValidate(breakName) {
    await this.wait(3); // wait for page to load
    await this.waitForSelector(this.elements.breaksButton);
    await this.click(this.elements.breaksButton);
    const locator = `//li[contains(., "${breakName}")]`;
    await this.waitForSelector(locator);
    assert.isTrue(await this.isVisible(locator));
    await this.wait(60); // wait for time to exceed
    const locatorOnAction = `//a[contains(@class, "break-active bg-color-red break-without-time") and contains(., "${breakName}")]`;
    assert.isTrue(await this.isVisible(locatorOnAction));
  }

  /**
   * function to exceed time validate
   * @param {string} session - window type
   * @return {void} Nothing
   */
  async closeBrowserSession(session){
    if (session === 'second') {
      await global.secondSession.close();
      await global.secondContext.close();
    } else if (session === 'third') {
      await global.thirdSession.close();
      await global.thirdContext.close();
    }else if (session === 'fourth') {
      await global.fourthSession.close();
      await global.fourthContext.close();
    }
  }

  /**
   * Function to delete all existing breaks
   * @return {void} Nothing
   */
  async deleteAllPreviousBreaks(){
    await this.wait(2); //Wait to load all previous breaks
    if(await this.isVisible(this.elements.deleteBreakButton)){
      const totalBreaks = await this.countElement(this.elements.totalBreakList);
      for(var i = 0; i < totalBreaks; i++){
        await this.waitForSelector(this.elements.deleteBreakButton);
        await this.click(this.elements.deleteBreakButton);
        await this.waitForSelector(this.elements.confirmDeleteButton);
        await this.click(this.elements.confirmDeleteButton);
      }
    }
  }

  /**
   * function to add new break
   * @return {void} Nothing
   */
  async addBreak(){
    await this.click(this.elements.addBreakButton);
  }

  /**
   * function to verify max users global
   * @param {string} maxUsers - max users to be verified
   * @return {void} Nothing
   */
  async verifyMaxUsersGlobal(maxUsers){
    await this.shouldContainText(this.elements.maxUser,maxUsers);
  }

  /**
   * function to check ignore max global and custom max users
   * @param {string} maxUsers - custom max users 
   * @return {void} Nothing
   */
  async checkIgnoreMaxGlobal(maxUsers){
    await this.waitForSelector(this.elements.ignoreMaxCheckBox);
    await this.click(this.elements.ignoreMaxCheckBox);
    await this.waitForSelector(this.elements.customMaxUser);
    await this.type(this.elements.customMaxUser, maxUsers);
  }

  /**
   * function to verify breaks notifications
   * @param {string} message - notification text 
   * @return {void} Nothing
   */
  async verifyNotification(message){
    const locatorOnAction =
    `//div[contains(@id, 'newContentdiv') and contains(., '${message}')]`;
    await this.isVisible(locatorOnAction);
  }

  /**
   * function to verify maximum tries error message
   * @return {void} Nothing
   */
  async maximumTriesErrorMessage() {
    await this.waitForSelector(this.elements.errorPopUp);
    let redpopup = await this.isVisible(this.elements.errorPopUp);
    await assert.isTrue(redpopup);
  }
};
