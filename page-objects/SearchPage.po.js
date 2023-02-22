const { BaseAction } = require('../setup/baseAction');

exports.SearchPage = class SearchPage extends BaseAction {
  constructor() {
    super();
  }
  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    inputSubjectTextBox: 'input[ng-model="form.subject"]',
    filterByDate: '//div[@id="filters-panel-2"]//a',
    startDateInputTextbox: '//input[@id="search-start-date"][last()]',
    endDateInputTextbox: '#search-end-date',
    customFilter:
      '//span[contains(@translate,"search.filters") and text()="Custom Filters"]',
    ticketStatusTextBox:
      '#filters-3 > div > div:nth-child(4) div.ng-valid > ul > li input',
    searchButton: '//span[@translate="search.btn_search"]',
    searchResultRow: '#search-table > tbody > tr:nth-child(1)',
    ticketDateText: '#search-table > tbody > tr:nth-child(1) > td:nth-child(7)',
    ticketSubjectText:
      '#search-table > tbody > tr:nth-child(1) > td:nth-child(6)',
    searchTable: '#search-table',
    searchTableSubject: '#search-table > tbody > tr.odd > td:nth-child(6)',
    searchTableStatus: '#search-table > tbody > tr.odd > td:nth-child(4)',
    filterDate:
      '#search-table > thead > tr:first-child > th[translate="search.table_date"]',
    subject: '#search-table_filter input[data-translate="tbl-search"]'
  };

  /**
   * function to add subject filter
   * @param {string} subject - subject details
   * @return {void} Nothing
   */
  async addSubjectFilter(subject) {
    await this.waitForSelector(this.elements.inputSubjectTextBox);
    await this.click(this.elements.inputSubjectTextBox);
    await this.type(this.elements.inputSubjectTextBox, subject);
  }

  /**
   * function to add all filters
   * @param {string} startDate - start date
   * @param {string} endDate - end date
   * @param {string} status - ticket status
   * @param {string} subject - ticket subject
   * @return {void} Nothing
   */
  async addFilters(startDate, endDate, status, subject) {
    await this.wait(10); //for email to receive on platform -:
    await this.waitForSelector(this.elements.filterByDate);
    await this.click(this.elements.filterByDate);
    await this.waitForSelector(this.elements.startDateInputTextbox);
    await this.type(this.elements.startDateInputTextbox, startDate);
    await this.pressKey('Enter');
    await this.type(this.elements.endDateInputTextbox, endDate);
    await this.pressKey('Enter');

    //Custom filter options
    await this.click(this.elements.customFilter);
    await this.type(this.elements.ticketStatusTextBox, status);
    await this.pressKey('Enter');

    //Primary Filter by Subject
    if (subject) {
      await this.type(this.elements.inputSubjectTextBox, subject);
    }
    
    await this.wait(5); //for email to receive on platform -:
  }

  /**
   * function to search with filters
   * @return {void} Nothing
   */
  async searchTheFilter() {
    await this.wait(10); //for email to receive on platform -:
    await this.click(this.elements.searchButton);
  }

  /**
   * function to search with Subject
   * @param {string} subject -subject
   * @return {void} Nothing
   */
  async searchSubject(subject){
    await this.type(this.elements.subject, subject);
    await this.pressKey('Enter');
  }
  /**
   * function to validate send email results
   * @param {string} subject- ticket subject
   * @param {string} status - ticket status
   * @return {void} Nothing
   */
  async validateDataTableResultData(status, subject) {
    if (await this.isVisible(this.elements.searchResultRow)) {
      await this.searchSubject(subject);
      await this.shouldContainText(
        await this.elements.ticketSubjectText,
        subject
      );
      let locatorText = await this.getText(this.elements.ticketDateText);
      this.containSubstring(locatorText, status);
    }
  }
  /**
   * Validate search result
   * @param {string} subject- ticket subject
   * @param {string} status - ticket status
   * @return {void} Nothing
   */
  async validateSearchResult(status, subject) {
    await this.waitForSelector(this.elements.searchTable);
    await this.waitForSelector(this.elements.filterDate);
    await this.click(this.elements.filterDate);
    await this.wait(2); //wait to load filter
    await this.click(this.elements.filterDate);
    await this.waitForSelector(this.elements.searchTableSubject);
    await this.shouldContainText(
      `${this.elements.searchTableSubject}  >> nth=0`,
      subject
    );
    await this.shouldContainText(
      `${this.elements.searchTableStatus}  >> nth=0`,
      status
    );
  }

  /**
   * function to open email details
   * @return {void} Nothing
   */
  async getEmailDetailOpen() {
    await this.click(this.elements.searchResultRow);
  }
};
