const { BaseAction } = require('../setup/baseAction');

exports.AgentManagement = class AgentManagement extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    agentManagementButton: 'a[id="menu_31"]',
    agentSearchBox: '[id="agent_list_filter"] input',
    queueSearchBox: '[id="queue_list_filter"] input',
    associateAgentQueueButton: 'button[id="btn-associate"]',
    Popup: '[id="newContentdiv"]>p',
    usersName: '#user-agents-len-ctn',
    searchAgent:'#agents_search_input',
    forceInboundCheckbox: '.agent-page #agent-force-inbound',
    forceInbound: '[data-translate="agent-force-inbound-queues"]',
    saveChange: '[name="save_user_button"]',
    dessociateAgentQueueButton: 'button[id="btn-dessociate"]',
    permanentCheckbox: '[data-translate="persistent"]',
    userGroupParentMenu: 'a[id="menu_10"]',
    user_filtered: '.panel-list-item.list-group-item.filtered'

  };

  /**
   * function to click agentManagement from menu
   * @return {void} Nothing
   */
  async clickAgentManagement() {
    await this.mouseOver(this.elements.userGroupParentMenu);
    await this.click(this.elements.agentManagementButton);
  }

  /**
   * function to select the agent
   * @param {string} agentName - type of element
   * @return {void} Nothing
   */
  async selectAgent(agentName) {
    await this.type(this.elements.agentSearchBox, agentName);
    await this.pressKey('Enter');
    await this.click(`//td[text()="${agentName}"]`);
  }

  /**
   * function to select the Queue
   * @param {string} queueName - type of element
   * @return {void} Nothing
   */
  async selectQueue(queueName) {
    await this.type(this.elements.queueSearchBox, queueName);
    await this.click(`//td[text()="${queueName}"]`);
  }

  /**
   * function to click AssociateAgentQueueButton
   * @return {void} Nothing
   */
  async clickAssociateAgentQueueButton() {
    await this.click(this.elements.associateAgentQueueButton);
  }

  /**
   * function to click DessociateAgentQueueButton
   * @return {void} Nothing
   */
  async clickDessociateAgentQueueButton() {
    await this.click(this.elements.dessociateAgentQueueButton);
  }

  /**
   * function to click PermanentButton
   * @return {void} Nothing
   */
  async clickPermanentButton() {
    await this.checkBox(this.elements.permanentCheckbox);
  }


  /**
   * function to verify success popup for 
   * @param {string} successMessage - success message popup
   * @return {void} Nothing
   */
  async verifySuccessPopup(successMessage) {
    await this.shouldContainText(this.elements.Popup,successMessage);
  }

  /**
   * function to activate force inbound queue option
   *  @returns {void} nothing
   */
  async activateForceInbound(){
    //waiting for state to load
    await this.wait(2);
    if(!await this.isChecked(this.elements.forceInboundCheckbox)){
      await this.waitForSelector(this.elements.forceInbound); 
      await this.click(this.elements.forceInbound); 
      await this.click(this.elements.saveChange);}
  }

  /**
   * function to deactivate force inbound queue option
   *  @returns {void} nothing
   */
  async deactivateForceInbound(){
    await this.waitForSelector(this.elements.forceInbound); 
    await this.click(this.elements.forceInbound); 
    await this.click(this.elements.saveChange);
  }
  
  /**
   * function to select the agent
   * @param {string} userName - type of user
   * @return {void} Nothing
   */
  async selectUser(userName) {
    await this.waitForSelector(this.elements.usersName);
    await this.click(this.elements.usersName);
    await this.waitForSelector(this.elements.searchAgent);
    await this.type(this.elements.searchAgent, userName);
    await this.pressKey('Enter');
    await this.click(this.elements.user_filtered);
    await this.waitForSelector(this.elements.saveChange);
  }
};
