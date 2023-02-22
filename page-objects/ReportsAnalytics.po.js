const { BaseAction } = require('../setup/baseAction');

exports.ReportsAnalytics = class ReportsAnalytics extends BaseAction {
  constructor() {
    super();
  }
  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    reportSource: '//select[@id="dataSource"]',
    templateDropDown: '#s2id_selectTemplate .select2-arrow',
    startDateField: '#startDate',
    sameDate:
      '//div[contains(@class,"xdsoft_datetimepicker") and contains(@style,"display: block;")]//td[contains(@class,"xdsoft_today")]',
    endDateField: '#endDate',
    downloadReportBtn: '#downloadreportloader',
    dataType: '//select[@id="dataTypeCalls"]',
    scriptTab: '#myTab1 a[data-translate="script"]',
    addBtn: '.addItems',
    saveTemplateBtn: '#editDesign',
    deleteScript:
      '//label[contains(text(),"Callback schedule")]/following-sibling::div//a',
    template: '#templateOpts',
    templateName: '#templateTitle',
    createNewTemplate: '#newTemplate',
    addAllOption: '//div[contains(@class,"active")]//span[text()="All"]',
    addButton: 'span[data-translate="add"]',
    saveTemplateButton: '#editDesign',
    templateSettingBtn: '[id="templateOpts"]',
    deleteTemplate: '[id="del"]>span',
    confirmDeleteTemplate: '#delTemplate',
    agentOnHook: '//span[@data-translate="agent-agent-hook"]',
    agentOnHookCheckbox: '.agent-page #agent-on-hook',
    agentOnHookBreak: '#agent-on-hook-break',
    saveChange: '[name="save_user_button"]',
    removeCamp: 'div#s2id_campaign a.select2-search-choice-close',
    ownerDataType: '//div[@id="s2id_callbacks_owner_types"]',
    ownerDataTypeInput: '//div[@id="select2-drop"]  //div //input',
    scriptInput: '#s2id_scripts .select2-search-field input',
    scriptValue: '#s2id_scripts .select2-search-choice',
    removeScript: '#divscripts .select2-search-choice-close',
    agentQualityMenu: 'a[data-title="Agent Quality"]',
    finishELearnScriptbtn: '#finish_elearn_button',
    addNoneOption: '//div[contains(@class,"active")]//span[text()="None"]',
    bodyDoc: 'body',
  };

  /**
   * function to enter csv data
   * @param {object} reportDetails - report details object
   * @param {string} reportDetails.source - report source
   * @param {string} reportDetails.template - report template
   * @param {string} reportDetails.dataType - type of data
   * @return {void} Nothing
   */
  async enterCSVDetails(reportDetails) {
    let removeExist = `(//div[@id="s2id_${reportDetails.target}"]//a[@class="select2-search-choice-close"])[last()]`;
    let removeName = `div#s2id_${reportDetails.target} a.select2-search-choice-close`;
    let inputName = `#s2id_${reportDetails.target} input`;
    if (reportDetails.source) {
      await this.waitForSelector(this.elements.reportSource);
      await this.dropdownOptionSelect(
        this.elements.reportSource,
        reportDetails.source
      );
    }
    if (reportDetails.ownerType) {
      await this.waitForSelector(this.elements.ownerDataType);
      await this.click(this.elements.ownerDataType);
      await this.type(
        this.elements.ownerDataTypeInput,
        reportDetails.ownerType
      );
      await this.pressKey('Enter');
    }
    if (reportDetails.template && reportDetails.template !== 'New template') {
      await this.wait(2); //wait for page to load
      await this.forceClick(this.elements.templateDropDown);
      await this.waitForSelector(
        `//div[@class="select2-result-label" and text()="${reportDetails.template}"]`
      );
      await this.click(
        `//div[@class="select2-result-label" and text()="${reportDetails.template}"]`
      );
    }
    if (reportDetails.template === 'New template') {
      await this.waitForSelector(this.elements.template);
      await this.click(this.elements.template);
      await this.waitForSelector(
        `//span[contains(text(),'${reportDetails.template}')]`
      );
      await this.click(`//span[contains(text(),'${reportDetails.template}')]`);
      await this.waitForSelector(this.elements.templateName);
      await this.click(this.elements.templateName);
      await this.type(this.elements.templateName, reportDetails.templateName);
      await this.waitForSelector(this.elements.createNewTemplate);
      await this.click(this.elements.createNewTemplate);
    }
    if (reportDetails.template === 'New template') {
      await this.waitForSelector(this.elements.template);
      await this.click(this.elements.template);
      await this.waitForSelector(`//span[contains(text(),'${reportDetails.template}')]`);
      await this.click(`//span[contains(text(),'${reportDetails.template}')]`);
      await this.waitForSelector(this.elements.templateName);
      await this.click(this.elements.templateName);
      await this.type(this.elements.templateName, reportDetails.templateName);
      await this.waitForSelector(this.elements.createNewTemplate);
      await this.click(this.elements.createNewTemplate);
    }
    await this.click(this.elements.startDateField);
    await this.waitForSelector(this.elements.sameDate);
    await this.scrollIntoElement(this.elements.sameDate);
    await this.click(this.elements.sameDate);
    await this.click(this.elements.endDateField);
    await this.click(this.elements.sameDate);
    if (reportDetails.dataType) {
      await this.dropdownOptionSelect(
        `//select[@id="dataType${reportDetails.dataTypeID}"]`,
        reportDetails.dataType
      );
    }
    if (reportDetails.targetName) {
      if (await this.isVisible(removeExist)) {
        const totalAssignedCamp = await this.countElement(removeName);
        for (var i = 0; i < totalAssignedCamp; i++) {
          await this.waitForSelector(removeExist);
          await this.click(removeExist);
        }
      }
      await this.type(inputName, reportDetails.targetName);
      await this.pressKey('Enter');
      await this.click(this.elements.bodyDoc);
    }
    if (reportDetails.scripts) {
      if (await this.isVisible(this.elements.scriptValue)) {
        await this.click(this.elements.scriptInput);
        await this.pressKey('Backspace');
        await this.pressKey('Backspace');
        await this.type(this.elements.scriptInput, reportDetails.scripts);
        await this.pressKey('Enter');
      }
    }
  }

  /**
   * function to download report
   * @return {fileName} downloaded file name
   */
  async downloadReport() {
    await this.scrollIntoElement(this.elements.downloadReportBtn);
    let fileName = await this.verifyDownload(this.elements.downloadReportBtn);
    return fileName;
  }

  /**
   * function to open script tab on report page
   * @return {void} nothing
   */
  async openScriptTab() {
    await this.waitForSelector(this.elements.scriptTab);
    await this.click(this.elements.scriptTab);
  }

  /**
   * function to select script
   * @param {string} scriptName - name of the script
   * @return {void} nothing
   */
  async selectScript(scriptName) {
    await this.scrollIntoElement(
      `//h5[text()="${scriptName}"]/../../following-sibling::div[1]//span`
    );
    await this.click(
      `//h5[text()="${scriptName}"]/../../following-sibling::div[1]//span`
    );
    await this.click(this.elements.addBtn);
  }

  /**
   * function to save report template
   * @return {void} nothing
   */
  async saveTemplate() {
    await this.click(this.elements.saveTemplateBtn);
  }

  /**
   * function to remove script from report template
   * @return {void} nothing
   */
  async removeScriptFromTemplate() {
    await this.click(this.elements.deleteScript);
  }

  /**
   * function to select tab
   * @param {string} tabName - name of the tab
   * @param {string} option - option type
   * @return {void} nothing
   */
  async selectTab(tabName, option) {
    await this.waitForSelector(`//a[contains(text(),'${tabName}')]`);
    await this.click(`//a[contains(text(),'${tabName}')]`);
    // wait for page to load
    await this.wait(2);
    if (option === 'All') {
      await this.waitForSelector(this.elements.addAllOption);
      await this.click(this.elements.addAllOption);
    } else if (option === 'None') {
      await this.waitForSelector(this.elements.addNoneOption);
      await this.click(this.elements.addNoneOption);
    }
  }

  /**
   * function to add option
   * @return {void} nothing
   */
  async addOption() {
    await this.waitForSelector(this.elements.addButton);
    await this.click(this.elements.addButton);
  }

  /**
   * function to save template
   * @return {void} nothing
   */
  async saveNewTemplate() {
    await this.waitForSelector(this.elements.saveTemplateButton);
    await this.click(this.elements.saveTemplateButton);
  }

  /**
   * function to delete a template
   * @return {void} nothing
   */
  async deleteTemplate() {
    await this.waitForSelector(this.elements.templateSettingBtn);
    await this.click(this.elements.templateSettingBtn);
    await this.wait(2); //execution is too quick
    await this.waitForSelector(this.elements.deleteTemplate);
    await this.click(this.elements.deleteTemplate);
    await this.wait(1); //execution is too quick
    await this.waitForSelector(this.elements.confirmDeleteTemplate);
    await this.click(this.elements.confirmDeleteTemplate);
  }

  /**
   * function to activate agent on hook option
   * @param  {object} data - data to fill
   * @param  {string} data.agentOnHook - value of agent on hook
   * @param  {string} data.break - break name
   * @return {void} nothing
   */
  async selectAgentOnHook(data) {
    if (data.agentOnHook) {
      if (!await this.isChecked(this.elements.agentOnHookCheckbox)) {
        await this.waitForSelector(this.elements.agentOnHook);
        await this.click(this.elements.agentOnHook);
      }
    }
    await this.click(this.elements.saveChange);
  }

  /**
   * function to access agent quality menu
   * @param {string} type- type of window
   * @return {void} nothing
   */
  async navigateToAgentQuality(type = '') {
    await this.click(this.elements.agentQualityMenu, type);
  }

  /**
   * function to navigate to tab in Agent quality menu
   * @param {string} tabName- name of the tab
   * @param {string} type- type of window 
   * @return {void} nothing
   */
  async navigateToAgentQualityTab(tabName, type = '') {
    await this.wait(3); //required wait to select tab
    const tab = `//ul[@id='topics_tabs']//span[text()='${tabName}']`;
    await this.click(tab, type);
  }

  /**
   * function to select E-learn Script
   * @param {string} scriptName- name of the script 
   * @param {string} type- type of window 
   * @return {void} nothing
   */
  async selecteLearnScript(scriptName, type = '') {
    let script = `//div[@id="available_elearns_table_wrapper"]//td[text()="${scriptName}"]`;
    await this.waitForSelector(script, type);
    await this.click(script, type);
  }

  /**
   * function to fill E-learn script
   * @param {object} fillScriptObject - script values object
   * @param {string} fillScriptObject.oneresponse - select oneresponse
   * @param {string} fillScriptObject.checks - select checks
   * @param {string} type- type of window
   * @return {void} nothing
   */
  async fillELearnScript(type = '', fillScriptObject) {
    await this.wait(3); //added wait to load script options
    if (fillScriptObject.oneresponse !== '') {
      let valueLocator = `#script_div input[type='radio'][value='${fillScriptObject.oneresponse}']~span`;
      await this.click(valueLocator, type);
    }
    if (fillScriptObject.checks !== '') {
      if (await this.isVisible(this.elements.populatedElement)) {
        await this.click(this.elements.populatedElement, type);
      }
      let valueLocator = `#script_div input[type='checkbox'][value='${fillScriptObject.checks}']~span`;
      await this.click(valueLocator, type);
    }
    await this.click(this.elements.finishELearnScriptbtn, type);
  }

  /**
   * function to select all items from previously created script
   * @return {void} nothing
   */
  async selectAllItems() {
    await this.wait(3); // added wait to load the script items
    await this.waitForSelector(this.elements.addAllOption);
    await this.click(this.elements.addAllOption);
  }
};