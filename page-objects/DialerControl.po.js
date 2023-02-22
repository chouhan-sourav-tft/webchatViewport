const { BaseAction } = require('../setup/baseAction');

exports.DialerControl = class DialerControl extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    applyFilterButton: '#dialer-control-filter-save',
    applyFilterModal: '#modal-dialer-control-filters',
    applyFilterWarning: '//div[@id="modal-dialer-control-filters"]//label[@data-translate="filtersModal.warning"][text()="this action will clear the current Hopper."]',
    submtFilter: '#dialer-control-submit-filters',
    successMessage: '.SmallBox.animated.fadeInRight.fast',
    createFilterButton: '//button[contains(.,"Create filter")]',
    filterView: '.dialer-control-filter',
    dbToggleButton: '(//button[contains(@class,"dialer-control-filter-dbs-btn")])[last()]',
    dbDeselectAll: '(//ul[contains(@class,"dialer-control-filter-dbs-dropdown")])[last()]//li[1]',
    fieldToggleButton: '(//div[contains(@class,"select2-container dialer-control-filter-fields")])[last()]',
    activeInput: '#select2-drop input',
    startTime: '.filter-hour-interval-container:not(.hidden) .dialer-control-filter-hour-1',
    endTime: '.filter-hour-interval-container:not(.hidden) .dialer-control-filter-hour-2',
    addFilterButton: '(//button[contains(.,"Add filter")])[last()]',
    filterType: '(//div[contains(@class,"select2-container dialer-control-filter-type")])[last()]',
    filterData: '(//input[contains(@class,"dialer-control-filter-string")])[last()][not(@disabled)]',
    closeButton: 'button[data-translate="close"]',
    previewButton: '#dialer-control-filter-preview',
    hopperPreviewModal: '#dialer-control-modal-hopper-preview',
    deleteFilter: '#dialer-control-filter-group-0 .dialer-control-filter:last-child .dialer-control-filter-delete',
    deleteIcon: '.dialer-control-filter-delete',
    clearHopper: '#dialer-control-clear-hopper',
    confirmButton: '.confirm-dialog-btn-confirm',
    fieldOrder: '#dialer-control-order-field',
    orderDirection: '#dialer-control-order-direction',
    addedGroupOr: '//div[@class="dialer-control-filter-logic-or"][1]',
    addGroup: '//button[contains(.,"Add group")]'
  };

  /**
   * function to click to create filter
   * @return {void} Nothing
   */
  async clickCreateFilter(){
    if(await this.isVisible(this.elements.createFilterButton)){
      await this.waitForSelector(this.elements.createFilterButton);
      await this.click(this.elements.createFilterButton);
      await this.wait(3); //wait to load view
      if(!(await this.isVisible(this.elements.filterView))){
        await this.click(this.elements.createFilterButton);
        await this.isVisible(this.elements.filterView);
      }
    }
  }

  /**
   * function to click to add filter
   * @return {void} Nothing
   */
  async addFilter(){
    await this.waitForSelector(this.elements.addFilterButton);
    await this.click(this.elements.addFilterButton);
  }

  /**
   * function to create filter
   * @param {object} datatable - object to create filters
   * @param {string} datatable.database - select database name
   * @param {string} datatable.field - select field type
   * @param {string} datatable.group - validate group
   * @param {string} datatable.filterType - select filter type
   * @param {string} datatable.startTime - select start time
   * @param {string} datatable.endTime - select end time
   * @param {string} datatable.filterData - select filter data
   * @return {void} Nothing
   */
  async createFilter(datatable){
    if(datatable.database){
      await this.waitForSelector(this.elements.dbToggleButton);
      await this.wait(2); //wait to pause, because speed is so quick
      await this.click(this.elements.dbToggleButton);
      await this.waitForSelector(this.elements.dbDeselectAll);
      await this.click(this.elements.dbDeselectAll);
      let dbSelector = `(//ul[contains(@class,'dialer-control-filter-dbs-dropdown')])[last()]//li//span[contains(text(),'${datatable.database}')]`;
      await this.waitForSelector(dbSelector);
      await this.click(dbSelector);
      await this.click(this.elements.dbToggleButton);
    }

    if(datatable.field){
      await this.waitForSelector(this.elements.fieldToggleButton);
      await this.click(this.elements.fieldToggleButton);
      await this.type(this.elements.activeInput, datatable.field);
      if(datatable.group){
        let groupTitle = `//div[@id='select2-drop']//ul//li[contains(@class,'select2-result-with-children')]//div[contains(.,'${datatable.group}')]`;
        await this.shouldVisible(groupTitle);
      }
      let fieldSelector = `//div[@id='select2-drop']//ul//li[contains(@class,'select2-result-with-children')]//ul//li[contains(.,'${datatable.field}')]`;
      await this.waitForSelector(fieldSelector);
      await this.click(fieldSelector);
    }

    if(datatable.startTime){
      await this.waitForSelector(this.elements.startTime);
      await this.type(this.elements.startTime, datatable.startTime);
      await this.pressKey('Enter');
    }
    
    if(datatable.endTime){
      await this.waitForSelector(this.elements.endTime);
      await this.type(this.elements.endTime, datatable.endTime);
      await this.pressKey('Enter');
    }
    
    if(datatable.filterType){
      await this.waitForSelector(this.elements.filterType);
      await this.click(this.elements.filterType);
      await this.wait(2); //wait to pause, because speed is so quick
      await this.waitForSelector(this.elements.activeInput);
      await this.type(this.elements.activeInput, datatable.filterType);
      let filterTypeSelector = `//div[@id='select2-drop']//ul//li[contains(@class,'select2-result-with-children')]//ul//li[contains(.,'${datatable.filterType}')]`;
      await this.waitForSelector(filterTypeSelector);
      await this.click(filterTypeSelector);
    }

    if(datatable.filterData){
      await this.waitForSelector(this.elements.filterData);
      await this.type(this.elements.filterData, datatable.filterData);
      await this.pressKey('Enter');
    }
  }

  /**
   * function to click to apply filter
   * @return {void} Nothing
   */
  async applyFilter() {
    await this.waitForSelector(this.elements.applyFilterButton);
    await this.click(this.elements.applyFilterButton);
    await this.waitForSelector(this.elements.applyFilterModal);
    await this.shouldVisible(this.elements.applyFilterWarning);
    await this.click(this.elements.submtFilter);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to click to preview button
   * @return {void} Nothing
   */
  async clickToPreview(){
    await this.waitForSelector(this.elements.previewButton);
    await this.click(this.elements.previewButton);
    await this.waitForSelector(this.elements.hopperPreviewModal);
  }

  /**
   * function to validate hopper preview data
   * @param {object} datatable - object of hopper data
   * @param {string} datatable.name - validate person name
   * @param {string} datatable.phone - validate person phone
   * @param {string} datatable.email - validate person email
   * @param {string} datatable.postalCode - validate person postal code
   * @param {string} datatable.city - validate person city
   * @param {string} index - index of row
   * @return {void} Nothing
   */
  async validateHopperData(datatable, index){
    const selectRow = '#dialer-control-hopper-preview-table tbody tr:nth-child('+(index+1)+')';
    if(datatable.name){
      await this.waitForSelector(selectRow +' td:nth-child(3)');
      await this.shouldContainText(
        selectRow +' td:nth-child(3)',
        datatable.name
      );
    }

    if(datatable.phone){
      await this.waitForSelector(selectRow +' td:nth-child(4)');
      await this.shouldContainText(
        selectRow +' td:nth-child(4)',
        datatable.phone
      );
    }

    if(datatable.email){
      await this.waitForSelector(selectRow +' td:nth-child(5)');
      await this.shouldContainText(
        selectRow +' td:nth-child(5)',
        datatable.email
      );
    }
    
    if(datatable.postalCode){
      await this.waitForSelector(selectRow +' td:nth-child(7)');
      await this.shouldContainText(
        selectRow +' td:nth-child(7)',
        datatable.postalCode
      );
    }
    
    if(datatable.city){
      await this.waitForSelector(selectRow +' td:nth-child(8)');
      await this.shouldContainText(
        selectRow +' td:nth-child(8)',
        datatable.city
      );
    }
  }

  /**
   * function to click to close button
   * @return {void} Nothing
   */
  async clickToClose(){
    await this.waitForSelector(this.elements.closeButton);
    await this.click(this.elements.closeButton);
  }

  /**
   * function to clear active filters of campaign
   * @return {void} Nothing
   */
  async clearFilters(){
    if(await this.isVisible(this.elements.deleteFilter)){
      const totalFilter = await this.countElement(this.elements.deleteIcon);
      for(var i = 0; i < totalFilter; i++){
        await this.waitForSelector(this.elements.deleteFilter);
        await this.wait(2); //wait needed to visible element
        await this.click(this.elements.deleteFilter);
      }
      await this.wait(2); //wait to delete all filter
      await this.applyFilter();
    }
  }

  /**
   * function to clear hopper data
   * @return {void} Nothing
   */
  async clearHopperData(){
    if(await this.isVisible(this.elements.clearHopper)){
      await this.waitForSelector(this.elements.clearHopper);
      await this.click(this.elements.clearHopper);
      await this.waitForSelector(this.elements.confirmButton);
      await this.click(this.elements.confirmButton);
    }
  }

  /**
   * function to update basic configurations of dialer
   * @param {string} fieldOrder - order of field
   * @param {string} direction - direction of order
   * @return {void} Nothing
   */
  async updateConfiguration(fieldOrder, direction){
    await this.waitForSelector(this.elements.fieldOrder);
    await this.selectOptionByValue(this.elements.fieldOrder, fieldOrder);
    await this.waitForSelector(this.elements.orderDirection);
    await this.selectOptionByValue(this.elements.orderDirection, direction);
    await this.wait(2); //wait to apply configurations
  }

  /**
   * function to add new group
   * @return {void} Nothing
   */
  async addGroup(){
    await this.waitForSelector(this.elements.addGroup);
    await this.click(this.elements.addGroup);
    await this.waitForSelector(this.elements.addedGroupOr);
  }
};
