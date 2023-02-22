const { BaseAction } = require('../setup/baseAction');

exports.Dashboard = class Dashboard extends BaseAction {
  constructor() {
    super();
  }
  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    sidePanelExpandMenu: '#left-panel .minifyme',
    realStatsMenu: '//span[@data-translate="mainMenu.realTimeStats"]/..',
    dashboardButton: '#menu_14 .fa-dashboard',
    selectQueueButton: '#wallboard-totals-choose-mailboxes',
    deselectQueuesButton: '#modal-choose-tickets-none',
    queueCheckbox: '#choose-tickets-list label:nth-child(3)',
    saveButton: '#modal-choose-tickets-save',
    ticketTabButton: '#tickets-tab',
    webchatTabButton: '#webchat-tab',
    voiceTabButton: '//span[@data-translate=\'voiceOutbound\']',
    agentTabButton: '#agents-tab',
    statsTabButton: '#stats-tab',
    agentStateTicketTab: '#tickets-agents tbody tr:nth-child(1) td:nth-child(2)',
    agentStateWebchatTab: '#webchat-agents tbody tr:nth-child(1) td:nth-child(2)',
    voiceSearchOption: '//input[@id=\'search-agents\']',
    dashboardWall: '#wallboard-inbound3',
    webchatStateFilter: '#webchat-agents th:nth-child(2)',
    ticketStateFilter: '#tickets-agents th:nth-child(2)',
    webchatAgentTable: '#webchat-agents',
    voiceChatAgentTable: '#dashboard-widget-body',
    voiceChatStateFilter: '#voice-outbound-agents tbody > tr:not([style="display: none;"]) td:nth-child(2)',
    actionTabMenu: '//td[normalize-space()=\'OutboundCampaign#1\']',
    clickAction: '#actions-modal-tab a',
    sipExtension: '#sip-listen-exten',
    clickLogout: '#logout-agent-btn',
    approveLogoutButton: '#logout-agent-btn-approve',
    availableAgentList:'//span[@data-translate="dashboard.inbound.realTimeTable.availableAgents"]',
    saveAgent: '//div[@id="queue-popover"]//a[contains(text(),"Save")]',
    modal: '//div[@class="popover-content"]',
    notifiactionDisplay: '//div[@id="newContentdiv"] //p',
    voiceInBoundTabButton: '//span[@data-translate="voiceInbound"]',
    inVoiceChatStateFilter: '#voice-inbound-agents tbody >  tr:not([style="display: none;"]) td:nth-child(2)',
    inVoiceChatAccessType: '#voice-inbound-agents tbody >  tr:not([style="display: none;"]) td:nth-child(1)',
   
  };

  /**
   * function to navigate to dashboard
   * @param  {string} type-type of window
   * @return {void} Nothing
   */
  async navigateToDashboardPage(type='') {
    await this.waitForSelector(this.elements.realStatsMenu, type);
    await this.click(this.elements.realStatsMenu,type);
    await this.click(this.elements.dashboardButton,type);
  }
 
  /**
   * function to select queue
   * @return {void} Nothing
   */
  async selectQueueOption() {
    await this.click(this.elements.selectQueueButton);
    await this.click(this.elements.deselectQueuesButton);
    await this.click(this.elements.queueCheckbox);
    await this.click(this.elements.saveButton);
  }

  /**
   * function to select tab
   * @param {string} tabName - tab name to select
   * @param  {string} type-type of window
   * @return {void} Nothing
   */
  async selectTab(tabName,type='') {
    if (tabName === 'ticket') {
      await this.waitForSelector(this.elements.ticketTabButton,type);
      await this.click(this.elements.ticketTabButton,type);
    }
    if (tabName === 'webchat') {
      await this.waitForSelector(this.elements.webchatTabButton,type);
      await this.click(this.elements.webchatTabButton,type);
    }
    if(tabName==='voice Outbound'){      
      await this.waitForSelector(this.elements.voiceTabButton,type);
      await this.click(this.elements.voiceTabButton,type);      
    }  
    if (tabName === 'Voice Inbound') {
      await this.waitForSelector(this.elements.voiceInBoundTabButton,type);
      await this.click(this.elements.voiceInBoundTabButton,type);
    }    
  }

  /**
   * function to select agent tab
   * @return {void} Nothing
   */
  async selectAgentTab() {
    await this.waitForSelector(this.elements.dashboardWall);
    await this.click(this.elements.agentTabButton);
    await this.click(this.elements.statsTabButton);
    await this.waitForSelector(this.elements.dashboardWall);
    await this.click(this.elements.agentTabButton);
  }

  /**
   * function to select agent tab in voice outbound page
   * @param  {string} type-type of window
   * @return {void} Nothing
   */
  async selectVoiceOutboundAgentTab(type='') {    
    await this.waitForSelector(this.elements.agentTabButton,type);
    await this.click(this.elements.agentTabButton,type);   
  }
  
  /**
   * function to verify agent state in ticket tab
   * @param {string} tab - tab name to select
   * @param {string} state - state of agent
   * @return {void} Nothing
   */
  async verifyAgentStateInTicketTab(state, tab) {
    if (tab === 'ticket') {
      await this.click(this.elements.ticketStateFilter);
      await this.click(this.elements.ticketStateFilter);
      await this.shouldContainText(this.elements.agentStateTicketTab, state);
    }
    if (tab === 'webchat') {
      await this.waitForSelector(this.elements.webchatAgentTable);
      await this.click(this.elements.webchatStateFilter);
      await this.click(this.elements.webchatStateFilter);
      await this.shouldContainText(this.elements.agentStateWebchatTab, state);
    }
    
  }

  /**
   * verifying agent state in voice outbound tab
   * @param  {string} state-user state to verify
   * @param  {string} type-type of window
   * @return {void} Nothing
   */
  async verifyAgentStateInVoiceTab(state,type=''){    
    await this.waitForSelector(this.elements.voiceChatStateFilter,type);
    await this.shouldContainText(this.elements.voiceChatStateFilter, state,type);
    await this.click(this.elements.voiceChatStateFilter,type);      
  }

  
  /**
   * search agent name in voice outbound tab
   * @param  {string} name-agent name to search
   * @param  {string} type-type of window
   * @return {void} Nothing
   */  
  async searchName(name,type='') {
    await this.type(this.elements.voiceSearchOption, name,type);
    await this.pressKey('Enter');    
  }

  /**
   * click on action tab in voice outbound tab
   * @param  {string} type-type of window
   * @return {void} Nothing
   */  
  async selectActionTab(type='') {    
    await this.click(this.elements.clickAction,type);    
  }  

  /**
   * click on force logout button
   * @param  {string} extension-sip extension
   * @param  {string} type-type of window
   * @return {void} Nothing
   */
  async forceLogoutAgent(type='') {
    await this.click(this.elements.clickLogout,type);
    await this.waitForSelector(this.elements.approveLogoutButton,type);
    await this.click(this.elements.approveLogoutButton,type);    
  }  

  
  /**
   * function to click on action list icon in dashboard
   * @param  {string} inboundQueue - inbound queue name
   * @return {void} Nothing
   */
  async agentListIcon(inboundQueue){
    await this.waitForSelector(this.elements.availableAgentList);
    let actionLocator = `//table[@id="wallboard-queue-calls"]//tbody//tr//td[text()='${inboundQueue}']/following-sibling::td[last()]/i[1]`;
    await this.click(actionLocator);
  }

  /**
   * function to select agent in group and agent modal
   * @param  {string} agent - agent name
   * @return {void} Nothing
   */
  async selectAgent(agent){
    let agentName = `//input[@data-agentname="${agent}"]`;
    await this.waitForSelector(agentName);
    await this.click(agentName);
    await this.click(this.elements.saveAgent);
  }

  /**
   * function to validate to agent and group modal is visible or not
   * @return {void} Nothing
   */
  async validateModal(){
    if(!await this.isVisible(this.elements.modal)){
      return;
    }
  }
  
  /**
   * function to validate notification of dashboard add agent to queue
   * @param  {string} message - message of notification
   * @param  {string} session - session
   * @return {void} Nothing
   */
  async validateNotification(message,session){
    await this.waitForSelector(this.elements.notifiactionDisplay,session);
    await this.isElementExist(this.elements.notifiactionDisplay,session);
    await this.shouldContainText(this.elements.notifiactionDisplay,message,session);
  }

  /**
   * function to verify agent state in voice outbound tab
   * @param  {string} accessType- type of user
   * @param  {string} state-user state to verify
   * @param  {string} type-type of window
   * @return {void} Nothing
   */
  async verifystateInInVoiceTab(accessType,state,type){
    await this.waitForSelector(this.elements.inVoiceChatAccessType,type);
    await this.shouldContainText(this.elements.inVoiceChatAccessType,accessType,type);
    await this.waitForSelector(this.elements.inVoiceChatStateFilter,type);
    await this.shouldContainText(this.elements.inVoiceChatStateFilter, state,type);
    await this.click(this.elements.inVoiceChatStateFilter,type);
  }
};
