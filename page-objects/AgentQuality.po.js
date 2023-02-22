const { BaseAction } = require('../setup/baseAction');
let randomSubjectMessage;
let randomMessage;

exports.AgentQuality = class AgentQuality extends BaseAction {
  constructor() {
    super();
    randomSubjectMessage = this.generateRandomMessage();
    randomMessage = this.generateRandomMessage();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    suggestionTab: '#suggestions_tab_button',
    suggestButton: 'button[data-target="#suggestion_modal"]',
    suggestionTextBox: '#suggestion_subject',
    suggestionBodyTextBox: '#suggestion_body',
    sendSuggestionButton: '#send_suggestion'
  };

  /**
   * function to click tab on agent quality page
   * @param {string} tabName - tab name to select
   * @return {void} Nothing
   */
  async clickTab(tabName) {
    if(tabName === 'Suggestion'){
      // waiting for suggestion tab to appear
      await this.wait(2);  
      await this.waitForSelector(this.elements.suggestionTab);
      await this.click(this.elements.suggestionTab);
    }
  }

  /**
   * function to make a suggestion
   * @return {void} Nothing
   */
  async makeASuggestion() {
    await this.waitForSelector(this.elements.suggestButton);
    await this.click(this.elements.suggestButton);
    await this.type(this.elements.suggestionTextBox, randomSubjectMessage);
    await this.type(this.elements.suggestionBodyTextBox, randomMessage);
    await this.click(this.elements.sendSuggestionButton);
  }
};