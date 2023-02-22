/*global context, page*/
const { expect} = require('chai');
const { BaseAction } = require('../setup/baseAction');
const { assert } = require('chai');

let pagePromise;
let newPage;
let pageList = [];

exports.Wallboard = class Wallboard extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    sidePanelExpandMenu: '#left-panel .minifyme',
    realTimeToolsMenu: '//a[@id="menu_0"]',
    wallboardMenu: '//a[@id="menu_15"]',
    wallboardDashboard: '#wallboard-main',
    templateList: '#s2id_template-list',
    inputText: '#select2-drop input',
    totalCalls: '#boxTopRight #totalCalls strong',
    answeredCalls: '#boxTopRight #answeredCalls strong',
    answerPercent: '#boxTopRight #answerPercent strong',
    tma: '#boxTopRight #tma strong',
    clickOnNewTabOptionButton:'#new-tab-button-wallboards',
    newTemplate: '#new-template',
    templateNameInput: '#wallboardNameInput',
    templateType: '#wallboardUserType',
    saveTemplate: '#wallboardNameSave',
    deleteTemplate: '#delete-template',
    confirmDelete: '.confirm-dialog-btn-confirm',
    editTemplateSetting: '#wallboardsSettings',
    editFirstPanel: '#boxSettingsboxTopLeft',
    boxTitleInput: '#boxSettingsModalboxTopLeft #boxTitleInput',
    saveBoxSetting: '#boxSettingsModalboxTopLeft .save-box-settings',
    editErrorPopup: '//div[@id="newContentdiv"]/p[contains(text(),"Cannot change Global Protected Template")]',
    deleteErrorPopup: '//div[@id="newContentdiv"]/p[contains(text(),"Cannot delete Global Protected Template")]',
    dasboardBuilder: '[data-translate="wallboard.dashBuilder"]',
    templateNameNewTab: '#wallboard-newtab-model-title',
    templateBoxTitle: '#boxTopLeft #myBoxTitle strong'
  };

  /**
   * Function to goto wallboard menu
   * @param  {string} type-type of window
   * @return {void} Nothing
   */
  async navigateToWallboardMenu(type='') {
    await this.waitForSelector(this.elements.sidePanelExpandMenu, type);
    await this.click(this.elements.sidePanelExpandMenu, type);
    await this.waitForSelector(this.elements.realTimeToolsMenu, type);
    if(!(await this.isVisible(this.elements.wallboardMenu, type))){
      await this.click(this.elements.realTimeToolsMenu, type);
    }
    await this.waitForSelector(this.elements.wallboardMenu, type);
    await this.click(this.elements.wallboardMenu, type);
    await this.waitForSelector(this.elements.wallboardDashboard, type);
    await this.click(this.elements.sidePanelExpandMenu, type);
  }

  /**
   * Function to select template in wallboard dashboard
   * @param {string} templateName - Template name
   * @return {void} Nothing
   */
  async selectWallboardTemplate(templateName) {
    await this.waitForSelector(this.elements.templateList);
    await this.click(this.elements.templateList);
    await this.type(this.elements.inputText, templateName);
    let selectTemplate = `//div[@id='select2-drop']//ul[@class='select2-results']//li//li[contains(.,'${templateName}')]`;
    await this.waitForSelector(selectTemplate);
    await this.click(selectTemplate);
    await this.wait(2); //wait to load dashboard
  }

  /**
   * function to validate campaign(outbound/inbound) data on wallboard dashboard
   * @param {Object} campaignData - campaign data object
   * @param {string} campaignData.callsMade - calls made count
   * @param {string} campaignData.answered - answered call count
   * @param {string} campaignData.answeredPercent - answered percent
   * @param {string} campaignData.TMA - TMA time
   * @param {string} campaignData.ready - ready users
   * @param {string} campaignData.talking - talking users
   * @param {string} campaignData.outcome - outcomes users
   * @param {string} campaignData.break - users on break
   * @param {string} campaignData.waitQueue -  user in waiting
   * @return {void} Nothing
   */
  async verifyCampaignData(campaignData) {
    //wait for data to update
    await this.wait(5);
    let boxid = '';
    if (campaignData.campaignType === 'Outbound') {
      boxid = '#boxTopRight';
    }
    if (campaignData.campaignType === 'Inbound') {
      boxid = '#boxTopLeft';
    }

    if (campaignData.callsMade) {
      await this.shouldContainText(
        `${boxid} #totalCalls strong`,
        campaignData.callsMade
      );
    }
    if (campaignData.answered) {
      await this.shouldContainText(
        `${boxid} #answeredCalls strong`,
        campaignData.answered
      );
    }
    if (campaignData.answeredPercent) {
      await this.shouldContainText(
        `${boxid} #answerPercent strong`,
        campaignData.answeredPercent
      );
    }
    if (campaignData.TMA) {
      let tmaArray = ['00:00:05','00:00:06','00:00:07','00:00:08','00:00:09','00:00:10','00:00:11','00:00:12','00:00:13','00:00:14','00:00:15'];
      const tmaValue = await this.getTexts(`${boxid} #tma strong`);
      assert.isTrue(tmaArray.includes(tmaValue));
    }
    if (campaignData.ready) {
      await this.shouldContainText(
        `${boxid} #agents-ready-bar .agent-bar-number`,
        campaignData.ready
      );
    }
    if (campaignData.talking) {
      await this.shouldContainText(
        `${boxid} #agents-working-bar .agent-bar-number`,
        campaignData.talking
      );
    }
    if (campaignData.outcome) {
      await this.shouldContainText(
        `${boxid} #agents-outcomes-bar .agent-bar-number`,
        campaignData.outcome
      );
    }
    if (campaignData.break) {
      await this.shouldContainText(
        `${boxid} #agents-paused-bar .agent-bar-number`,
        campaignData.break
      );
    }
    if(campaignData.waitQueue){
      await this.shouldContainText(
        `${boxid}  #inQueue strong`,
        campaignData.waitQueue
      );
    }
    if(campaignData.totalAbandon){
      await this.shouldContainText(
        `${boxid} #totalAbandon strong`,
        campaignData.totalAbandon
      );
    }

    if(campaignData.abandonPer){
      let totalCalls = await this.getText( `${boxid} #totalCalls strong`);
      let abandonPercentage = ((campaignData.totalAbandon)/totalCalls)*100;
      let roundOfAbandon = await this.round(abandonPercentage,2);
      await this.shouldContainText(
        `${boxid} #abandonPercent strong`,
        roundOfAbandon
      );
    }

    if(campaignData.transfer){
      await this.shouldContainText(
        `${boxid} #tme strong`,
        campaignData.transfer
      );
    }
  }

  /**
   * function to validate campaign(outbound/inbound) user data on wallboard dashboard
   * @param {Object} campaignUserData - campaign user data object
   * @param {string} campaignUserData.agent_1 - agent1 name
   * @param {string} campaignUserData.agent_2 - agent2 name
   * @return {void} Nothing
   */
  async verifyAgentCampaignData(campaignUserData) {
    //wait for data to update
    await this.wait(5);
    let boxid = '';
    if (campaignUserData.agentCampaignType === 'Outbound') {
      boxid = '#boxBottomRight';
    }
    if (campaignUserData.agentCampaignType === 'Inbound') {
      boxid = '#boxBottomLeft';
    }
    if (campaignUserData.agent_1) {
      await this.shouldContainText(
        `${boxid} #agentsBox div[data-username="Agent_1"] .agent-names`,
        (campaignUserData.agent_1).trim()
      );
    }
    if (campaignUserData.agent_2) {
      await this.shouldContainText(
        `${boxid} #agentsBox div[data-username="Agent_2"] .agent-names`,
        (campaignUserData.agent_2).trim()
      );
    }
  }

  /**
  * function to create new wallboard template
  * @param {Object} templateDetails - Template Details Object
  * @param {String} templateDetails.templateName - Template Name
  * @param {String} templateDetails.templateType - Template Type
  * @return {void} Nothing
  */  
  async addTemplate(templateDetails) {
    await this.waitForSelector(this.elements.newTemplate);
    await this.click(this.elements.newTemplate);
    await this.waitForSelector(this.elements.templateNameInput);
    await this.type(this.elements.templateNameInput, templateDetails.templateName);
    await this.waitForSelector(this.elements.templateType);
    await this.selectOptionByValue(this.elements.templateType, templateDetails.templateType);
    await this.click(this.elements.saveTemplate);
  }

  /**
  * function to verify if user has access to the template
  * @param {String} templateName - Template Name
  * @param {Object} templateStatus - template access object
  * @param {String} templateStatus.view - template view access
  * @param {String} templateStatus.edit - template edit access
  * @param {String} templateStatus.delete - template delete access
  * @param {String} templateStatus.editFormName - edit template form name
  * @param {String} templateStatus.editError - edit template error status
  * @param {String} templateStatus.deleteError - delete template error status
  * @param {String} window - Type of window session
  * @return {void} Nothing
  */  
  async verifyTemplateAccess(templateName, templateStatus, window) {
    await this.waitForSelector(this.elements.templateList, window);
    await this.click(this.elements.templateList, window);
    await this.type(this.elements.inputText, templateName, window);
    let templateLocator = `//div[@id='select2-drop']//ul[@class='select2-results']//li//li[contains(.,'${templateName}')]`;
    let templateView = await this.isVisible(templateLocator, window);
    let templateDelete = await this.isVisible(this.elements.deleteTemplate, window);
    let templateEdit = await this.isVisible(this.elements.editTemplateSetting, window);
    if(templateStatus.view === 'true'){
      assert.isTrue(templateView);
      await this.click(templateLocator, window);
      await this.wait(2); //wait to load dashboard
    }
    if(templateStatus.edit === 'true'){
      assert.isTrue(templateEdit);
      await this.waitForSelector(this.elements.editFirstPanel, window);
      if(templateStatus.editFormName !== ''){
        await this.click(this.elements.editFirstPanel, window);
        await this.waitForSelector(this.elements.boxTitleInput, window);
        await this.clearField(this.elements.boxTitleInput, window);
        await this.type(this.elements.boxTitleInput, templateStatus.editFormName, window);
        await this.waitForSelector(this.elements.saveBoxSetting, window);
        await this.click(this.elements.saveBoxSetting, window);
        if(templateStatus.editError === 'true'){
          let editErrorStatus = await this.isVisible(this.elements.editErrorPopup, window);
          await assert.isTrue(editErrorStatus);
        }
      }
    }
    if(templateStatus.delete === 'true'){
      assert.isTrue(templateDelete);
      await this.click(this.elements.deleteTemplate, window);
      await this.waitForSelector(this.elements.confirmDelete, window);
      if(templateStatus.deleteError === 'true'){
        await this.click(this.elements.confirmDelete, window);
        let deleteErrorStatus = await this.isVisible(this.elements.deleteErrorPopup, window);
        await assert.isTrue(deleteErrorStatus);
      }
    }
    if(templateStatus.view === 'false' && templateStatus.edit === 'false' && templateStatus.delete === 'false'){
      assert.isFalse(templateView);
    }
  }

  /**
  * function to create new wallboard template
  * @param {String} templateName - Template Name
  * @return {void} Nothing
  */  
  async deleteTemplate(templateName) {
    await this.waitForSelector(this.elements.templateList);
    await this.click(this.elements.templateList);
    await this.type(this.elements.inputText, templateName);
    let selectTemplate = `//div[@id='select2-drop']//ul[@class='select2-results']//li//li[contains(.,'${templateName}')]`;
    await this.waitForSelector(selectTemplate);
    await this.click(selectTemplate);
    await this.wait(2); //wait to load dashboard
    await this.waitForSelector(this.elements.deleteTemplate);
    await this.click(this.elements.deleteTemplate);
    await this.waitForSelector(this.elements.confirmDelete);
    await this.click(this.elements.confirmDelete);
  }

  /**
  * function to compare data between original tab and new tab
  * @param {String} campaignType - campaign type
  * @return {void} Nothing
  */ 
  async compareTabData(campaignType) {
    let boxid = '';
    if (campaignType === 'Outbound') {
      boxid = '#boxTopRight';
    }
    if (campaignType === 'Inbound') {
      boxid = '#boxTopLeft';
    }
    let originalMap = new Map();

    await originalMap.set('totalCalls', await this.getText(`${boxid} #totalCalls strong`));
    await originalMap.set('answeredCalls', await this.getText(`${boxid} #answeredCalls strong`));
    await originalMap.set('answerPercent',await this.getText(`${boxid} #answerPercent strong`));
    await originalMap.set('tma',await this.getText(`${boxid} #tma strong`));
    await originalMap.set('ready', await this.getText(`${boxid} #agents-ready-bar .agent-bar-number`));
    await originalMap.set('talking', await this.getText(`${boxid} #agents-working-bar .agent-bar-number`));
    await originalMap.set('outcomes', await this.getText(`${boxid} #agents-outcomes-bar .agent-bar-number`));
    await originalMap.set('onbreak',await this.getText(`${boxid} #agents-paused-bar .agent-bar-number`));
    await newPage.waitForLoadState();
    //wait for data to load in new tab
    await this.wait(5);
    expect(await newPage.locator(`${boxid} #totalCalls strong`).innerText()).contains(originalMap.get('totalCalls'));
    expect(await newPage.locator(`${boxid} #answeredCalls strong`).innerText()).contains(originalMap.get('answeredCalls'));
    expect(await newPage.locator(`${boxid} #answerPercent strong`).innerText()).contains(originalMap.get('answerPercent'));
    expect(await newPage.locator(`${boxid} #tma strong`).innerText()).contains(originalMap.get('tma'));
    expect(await newPage.locator(`${boxid} #agents-ready-bar .agent-bar-number`).innerText()).contains(originalMap.get('ready'));
    expect(await newPage.locator(`${boxid} #agents-working-bar .agent-bar-number`).innerText()).contains(originalMap.get('talking'));
    expect(await newPage.locator(`${boxid} #agents-outcomes-bar .agent-bar-number`).innerText()).contains(originalMap.get('outcomes'));
    expect(await newPage.locator(`${boxid} #agents-paused-bar .agent-bar-number`).innerText()).contains(originalMap.get('onbreak'));
  }

  /**
  * function to click open new tab option button
  * @return {void} Nothing
  */
  async clickOnNewTabOption() {
    await this.waitForSelector(this.elements.clickOnNewTabOptionButton);
    pagePromise = context.waitForEvent('page');
    await page.click(this.elements.clickOnNewTabOptionButton);
    newPage = await pagePromise;
    pageList.push(newPage);
  }

  /**
  * function to validate if the open Template tabs are closed successfully
  * @return {void} Nothing
  */
  async validateClosedTab(){
    await pageList.forEach((element)=>{
      if( element._closed){
        console.log('Template tab is closed succesfully');
      }
    });
  }

  /**
  * function to close opened new tab
  * @param {String} closes - number of tabs to close
  * @return {void} Nothing
  */  
  async closeOpenedTab(closes){
    for(let i=0; i<closes; i++){
      pageList[i].close();
    }
  }

  /**
  * function to close main tab
  * @return {void} Nothing
  */
  async closeMainTab(){
    global.page.close();
  }

  /**
  * function to validate user is not logged out of main tab
  * @return {void} Nothing
  */
  async verifyLog(){
    await this.waitForSelector(this.elements.dasboardBuilder);
    if(await this.isVisible(this.elements.dasboardBuilder)){
      console.log('user is not logged out of main tab');
    }
  }

  /**
  * function to refresh tab
  * @param {Integer} tabIndex - tab index to refresh
  * @return {void} Nothing
  */
  async reloadPage(tabIndex) {
    await pageList[tabIndex].reload({ waitUntil: 'load' });
  }

  /**
  * function to verify new tab data
  * @param {Integer} tabIndex - tab index to refresh
  * @param {Object} templateData - template data object
  * @param {String} templateData.templateName - template name
  * @param {String} templateData.boxTopLeftTitle - template top-left box title
  * @return {void} Nothing
  */
  async verifyTemplate(tabIndex, templateData) {
    expect(await pageList[tabIndex].locator(this.elements.templateNameNewTab).innerText()).contains(templateData.templateName);
    expect(await pageList[tabIndex].locator(this.elements.templateBoxTitle).innerText()).contains(templateData.boxTopLeftTitle);
  }

  /**
  * function to clear page list array
  * @return {void} Nothing
  */
  async clearPageList() {
    pageList = [];
  }
  
};