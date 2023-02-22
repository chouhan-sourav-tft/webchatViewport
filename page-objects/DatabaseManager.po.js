/*global page*/
const { assert } = require('chai');
const { BaseAction } = require('../setup/baseAction');
exports.Database = class Database extends BaseAction {
  constructor() {
    super();
  }
  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    databaseManagerMenuIcon: '//a[contains(@href,"/database-manager.html")]',
    selectNew: '#new_db_button',
    databaseName: '#new_db_name',
    databaseCampaign: '//select[@id="new_db_campaign_select"]',
    clickBrowse: 'input#db_upload_file',
    uploadDatabase: '#upload_new_db',
    selectContactName: '//select[@id="contact"]',
    selectPhoneField: '//select[@id="first_phone"]',
    selectEmailField: '//select[@id="email"]',
    selectPostalField: '//select[@id="postal_code"]',
    selectCityField: '//select[@id="city"]',
    selectExtraField: '//select[@id="field1"]',
    matchFields: '#apply_matching_button',
    loadDatabase: 'footer [id="load_db_button"]',
    searchDatabase: '(//input[@data-translate="tbl-search"])[1]',
    databaseEdit: '(//span[@data-translate="editselected"])[1]',
    selectDatabaseQueues: '#s2id_queue_assoc',
    selectInbound:
      '//label[@data-translate="selectInboundQueues"]/../following-sibling::section//input',
    databaseDownload: '#download_db_button',
    deleteDatabase: '#delete-db-button',
    confirmDeleteDatabase: '#yesdeleteDB',
    databaseRecordVisible: '[id="new_contacts_label"]',
    clickTableManager: '[data-translate="tablemanager"]',
    searchTableName: '(//input[@data-translate="tbl-search"])[2]',
    clickOnTable: '#tables_table td',
    tableOddName:
      '//table[@id="tables_table"]//tr[contains(@class,"odd")]/td[2]',
    newTableManager: '#new_table_button',
    tableEdit: '#edit_table_button',
    inputTableName: 'input#new_table_name',
    clickTableBrowse: '#upload_table_file',
    tableUpload: '#upload_new_table',
    uploadTable: '#upload_edit_table',
    saveTable: '#create_table',
    updateTable: '#update_table',
    tableRecordVisible: '[id="NumberOfRecords"]',
    tableDownload: '#download_table_button',
    flushTable: '[data-translate="flushtable"]',
    deleteTable: '.btn-xs.confirm-dialog-btn-confirm',
    databaseCreatedPopUp:
      '//div[@id="newContentdiv"]/p[text()="The database was successfully created."]',
    tableCreatedPopUp:
      '//div[@id="newContentdiv"]/p[text()="The table was successfully created."]',
    tableUpdatedPopUp:
      '//div[@id="newContentdiv"]/p[text()="The table has been successfully updated."]',
    popUpMsg: '#newContentdiv',
    dataTable:
      '(//td[contains(@class,"sorting_1")])[1]/following-sibling::td[1]',
    noDataDb: '//table[@id="databases_table"]//td[@class="dataTables_empty"]',
    tableManagerActive: '//table[@id="tables_table"]//i/../input',
    manageAssignment: 'button[id="manage-assignments"]',
    agentSearchInput: '[id="agents_search_input"]',
    assignUser: 'button[id="assign-users-button"]',
    applyAssignmentSwitch: '//section[@id="assignment-switch"]/label',
    databaseActivateToggle:
      '//tr[contains(@class,"odd")]//td[6]//i[@class="databaseSwitch"]',
    databaseExclusiveToggle:
      '#databases_table tbody tr td:nth-child(4) input[name = "checkbox-toggle"]',
    extraFieldTemplate: '//select[@id="new_db_extra_fields_select"]',
    dailyContactMaxTries: '#daily-max-tries',
    contactMaxTries: '#contact-max-tries',
  };
  /**
   * function to create database
   * @param {string} databaseName - database name
   * @param {string} databaseDetails - database details
   * @return {void} Nothing
   */

  async createDatabase(databaseName, databaseDetails) {
    try {
      await this.click(this.elements.selectNew);
      await this.waitForSelector(this.elements.databaseName);
    } catch (error) {
      await page.reload();
      await this.click(this.elements.selectNew);
    }
    await this.click(this.elements.databaseName);
    await this.wait(5); //Require time to load the fields
    await this.type(this.elements.databaseName, databaseName);
    await this.dropdownOptionSelect(
      this.elements.databaseCampaign,
      databaseDetails.databaseCampaign
    );
    if (databaseDetails.optionField) {
      await this.waitForSelector(this.elements.extraFieldTemplate);
      await this.dropdownOptionSelect(
        this.elements.extraFieldTemplate,
        global.templateName[0]
      );
    }
    await this.browseFile(
      this.elements.clickBrowse,
      databaseDetails.browseFile
    );
    await this.click(this.elements.uploadDatabase);
    await this.wait(5); //Require time to load the fields
    if (databaseDetails.optionName) {
      await this.waitForSelector(this.elements.selectContactName);
      await this.dropdownOptionSelect(
        this.elements.selectContactName,
        databaseDetails.optionName
      );
    }
    if (databaseDetails.optionPhone1) {
      await this.wait(2); //Require time to load the dropdown values
      await this.dropdownOptionSelect(
        this.elements.selectPhoneField,
        databaseDetails.optionPhone1
      );
    }
    if (databaseDetails.optionEmail) {
      await this.wait(2); //Require time to load the dropdown values
      await this.dropdownOptionSelect(
        this.elements.selectEmailField,
        databaseDetails.optionEmail
      );
    }
    if (databaseDetails.optionPostal) {
      await this.wait(2); //Require time to load the dropdown values
      await this.dropdownOptionSelect(
        this.elements.selectPostalField,
        databaseDetails.optionPostal
      );
    }
    if (databaseDetails.optionCity) {
      await this.wait(2); //Require time to load the dropdown values
      await this.dropdownOptionSelect(
        this.elements.selectCityField,
        databaseDetails.optionCity
      );
    }
    if (databaseDetails.optionField) {
      await this.wait(2); //Require time to load the dropdown values
      await this.dropdownOptionSelect(
        this.elements.selectExtraField,
        databaseDetails.optionField
      );
    }
    await this.click(this.elements.matchFields);
    await this.wait(6); //Require time to match field.
  }

  /**
   * function to select database manager
   * @return {void} Nothing
   */
  async databaseManager() {
    await this.waitForSelector(this.elements.databaseManagerMenuIcon);
    await this.wait(5); //flackyness in page
    await this.mouseOver(this.elements.databaseManagerMenuIcon);
    await this.forceClick(this.elements.databaseManagerMenuIcon);
    try {
      await this.waitForSelector(this.elements.selectNew);
    } catch (error) {
      await page.reload();
      await this.mouseOver(this.elements.databaseManagerMenuIcon);
      await this.forceClick(this.elements.databaseManagerMenuIcon);
      await this.waitForSelector(this.elements.selectNew);
    }
  }

  /**
   * function to search in DB
   * @param {string} databaseName - database name
   * @param {string} databaseDetails - database details
   * @return {void} Nothing
   */

  async searchDB(databaseName, databaseDetails) {
    await this.wait(3); //Require time to load the fields
    await this.waitForSelector(this.elements.searchDatabase);
    await this.forceClick(this.elements.searchDatabase);
    await this.type(this.elements.searchDatabase, databaseName);
    await this.pressKey('Enter');
    await this.wait(6); //Results take time to get reflected
    const emptyDatabaseList = await this.isVisible(this.elements.noDataDb);
    if (emptyDatabaseList === true) {
      await this.createDatabase(databaseName, databaseDetails);
      await this.loadDatabase(databaseName, databaseDetails);
    }
  }

  /**
   * function to edit in database
   * @param {string} databaseName - database name
   * @param {string} databaseDetails - database details
   * @return {void} Nothing
   */

  async editDatabase(databaseName, databaseDetails) {
    await this.searchDB(databaseName, databaseDetails);
    const db = await this.isVisible(this.elements.databaseEdit);
    if (db === false) {
      await this.click(this.elements.dataTable);
      await this.wait(1);
    }
    const noOfRecord = await this.getTexts(this.elements.databaseRecordVisible);
    await this.click(this.elements.databaseEdit);
    await this.waitForSelector(this.elements.selectDatabaseQueues);

    await this.browseFile(
      this.elements.clickBrowse,
      databaseDetails.browseFile
    );
    await this.click(this.elements.uploadDatabase);
    await this.wait(2); // File upload takes time

    await this.click(this.elements.selectDatabaseQueues);
    await this.waitForSelector(this.elements.selectInbound);
    await this.type(this.elements.selectInbound, databaseDetails.queue);
    await this.pressKey('Enter');
    await this.wait(2);

    await this.dropdownOptionSelect(
      this.elements.selectContactName,
      databaseDetails.optionName
    );
    await this.waitForSelector(this.elements.selectPhoneField);
    await this.dropdownOptionSelect(
      this.elements.selectPhoneField,
      databaseDetails.optionPhone1
    );
    await this.click(this.elements.matchFields);
    //match fields take some time to load from CSV
    await this.wait(8);
    await this.click(this.elements.loadDatabase);
    await this.waitForSelector('//div[@id="newContentdiv"]/p[text()]');
    const success = await this.isVisible(
      `//div[@id="newContentdiv"]/p[text()="${databaseDetails.numOfColumnsToUpload} contacts have been uploaded."]`
    );
    await assert.isTrue(success);
    await this.searchDB(databaseName, databaseDetails);
    await this.click(this.elements.dataTable);
    const NewRecord =
      parseInt(noOfRecord) + parseInt(databaseDetails.numOfColumnsToUpload);
    await this.searchDB(databaseName, databaseDetails);
    await this.waitForSelector(this.elements.databaseEdit);
    const de = await this.isVisible(this.elements.databaseEdit);
    if (de === false) {
      await this.click(this.elements.dataTable);
    }
    await this.wait(5); //updated results will take some time to get reflected on the UI
    const CurrentRecord = await this.getTexts(
      this.elements.databaseRecordVisible
    );
    assert.equal(CurrentRecord, NewRecord);
  }

  /**
   * function to download database
   * @param {string} databaseName - database name
   * @param {string} databaseDetails - database details
   * @return {void} Nothing
   */
  async downloadDatabase(databaseName, databaseDetails) {
    await this.searchDB(databaseName, databaseDetails);
    await this.waitForSelector(this.elements.dataTable);
    await this.click(this.elements.dataTable);
    const de = await this.isVisible(this.elements.databaseEdit);
    if (de === false) {
      await this.click(this.elements.dataTable);
    }
    await this.waitForSelector(this.elements.databaseDownload);
    let fileName = await this.verifyDownload(this.elements.databaseDownload);
    return fileName;
  }

  async deleteDatabase(databaseName, databaseDetails) {
    await this.searchDB(databaseName, databaseDetails);
    await this.waitForSelector(this.elements.dataTable);
    const de = await this.isVisible(this.elements.databaseEdit);
    if (de === false) {
      await this.click(this.elements.dataTable);
    }
    await this.click(this.elements.deleteDatabase);
    await this.click(this.elements.confirmDeleteDatabase);
    const successDelete = await this.getTexts(this.elements.popUpMsg);
    assert.equal(successDelete, 'Database has been deleted successfully.');
  }

  /**
   * function to search in table
   * @param {string} tableName - table name
   * @param {string} TableDetails - table details
   * @return {void} Nothing
   */

  async searchTable(tableName, TableDetails) {
    await this.type(this.elements.searchTableName, tableName);
    await this.pressKey('Backspace');
    //waiting for filter results to be visible
    await this.wait(2);
    if ((await this.countElement(this.elements.tableOddName)) === 0) {
      await this.createTable(tableName, TableDetails);
    } else {
      const tableEntity = `//table[@id="tables_table"]//tr[contains(@class,"odd")]/td[contains(text(),"${tableName}")]`;
      await this.verifyVisibility(tableEntity, true);
    }
  }

  /**
   * function to create table
   * @param {string} tableName - table name
   * @param {string} TableDetails - table details
   * @return {void} Nothing
   */
  async createTable(tableName, TableDetails) {
    await this.click(this.elements.newTableManager);
    await this.click(this.elements.inputTableName);
    await this.type(this.elements.inputTableName, tableName);
    await this.browseFile(
      this.elements.clickTableBrowse,
      TableDetails.browseFile
    );
    await this.forceClick(this.elements.tableUpload);
    await this.click(this.elements.saveTable);
    await this.waitForSelector(this.elements.tableCreatedPopUp);
    const success = await this.isVisible(this.elements.tableCreatedPopUp);
    assert.isTrue(success);
    await this.searchTable(tableName, TableDetails);
    await this.waitForSelector(this.elements.clickOnTable);
    await page.locator(this.elements.clickOnTable).nth('1').click();
    await this.waitForSelector(this.elements.tableRecordVisible);
    //wait for text to load
    await this.wait(2);
    const noOfRecord = await this.getTexts(this.elements.tableRecordVisible);
    assert.equal(noOfRecord, TableDetails.noOfRecord);
  }

  /**
   * function to select table manager
   * @return {void} Nothing
   */

  async tableManagerTab() {
    await this.click(this.elements.clickTableManager);
  }

  /**
   * function to edit table
   * @param {string} tableName - table name
   * @param {string} TableDetails - table details
   * @return {void} Nothing
   */

  async editTable(tableName, TableDetails) {
    await this.searchTable(tableName, TableDetails);

    const tb = await this.isVisible(this.elements.tableEdit);
    if (tb === false) {
      await page.locator(this.elements.clickOnTable).nth('1').click();
    }
    await this.waitForSelector(this.elements.tableRecordVisible);
    await this.wait(1); //flacky count UI
    const POfRecord = await this.getTexts(this.elements.tableRecordVisible);
    await this.click(this.elements.tableEdit);
    await this.browseFile(
      this.elements.clickTableBrowse,
      TableDetails.browseFile
    );
    await this.click(this.elements.uploadTable);
    await this.wait(2); // File upload takes time
    await this.click(this.elements.updateTable);
    await this.waitForSelector(this.elements.tableUpdatedPopUp);
    const success = await this.isVisible(this.elements.tableUpdatedPopUp);
    assert.isTrue(success);
    await this.searchTable(tableName, TableDetails);
    await page.locator(this.elements.clickOnTable).nth('1').click();
    await this.waitForSelector(this.elements.tableRecordVisible);

    const newRecords = parseInt(POfRecord) + parseInt(TableDetails.noOfRecord);
    await this.waitForSelector(
      `//h4[@data-translate="numberrecords"]/following-sibling::p[text()="${newRecords}"]`
    );
    const NOfRecord = await this.getTexts(this.elements.tableRecordVisible);
    assert.equal(
      NOfRecord,
      parseInt(POfRecord) + parseInt(TableDetails.noOfRecord)
    );
  }
  /**
   * function to download table
   * @return {void} Nothing
   */
  async downloadTable() {
    await page.locator(this.elements.clickOnTable).nth('1').click();
    await this.verifyDownload(this.elements.tableDownload);
  }

  /**
   * verify table is active toggle is disabled
   * @param {*} state
   */
  async verifyTableState(state) {
    let active = await this.getAttributeElement(
      this.elements.tableManagerActive,
      'disabled'
    );
    assert.equal(active, state);
    let title = await this.isVisible(
      '//i[@class="databaseSwitch" and contains(@title,"Table used by the outcomes of")]'
    );
    assert.isTrue(title);
  }

  /**
   * function to flush/delete table
   * @param {string} tableName - table name
   * @param {string} TableDetails - table details
   * @return {void} Nothing
   */

  async flushTable(tableName, TableDetails) {
    await page.locator(this.elements.clickOnTable).nth('1').click();
    await this.searchTable(tableName, TableDetails);
    await this.click(this.elements.flushTable);
    await this.click(this.elements.deleteTable);
    await this.wait(3); //updated results take some time to reflect
    const noOfRecord = await this.getTexts(this.elements.tableRecordVisible);
    assert.equal(noOfRecord, 0);
  }

  /**
   * verify blacklist phone number from csv
   * @param {*} csvName
   * @param {*} csvData
   */
  async verifyCsvContains(csvName, csvData) {
    let data = await this.readCsv(csvName + '.csv');
    assert.equal(data[1].split(';')[0].trim(), csvData);
  }

  /**
   * function to load database
   * @param {string} databaseName - database name
   * @param {string} databaseDetails - database details
   * @return {void} Nothing
   */
  async loadDatabase(databaseName, databaseDetails) {
    let loadedDBArray = ['recycle', 'callback', 'closed', 'hopper'];
    await this.wait(3); //page takes time to respond
    await this.waitForSelector(this.elements.loadDatabase);
    await this.click(this.elements.loadDatabase);
    await this.waitForSelector(this.elements.databaseCreatedPopUp);
    const success = await this.isVisible(this.elements.databaseCreatedPopUp);
    assert.isTrue(success);
    await this.searchDB(databaseName, databaseDetails);
    await this.waitForSelector(this.elements.dataTable);
    await this.forceClick(this.elements.dataTable);
    //updated results will take some time to get reflected on the UI
    await this.wait(5);
    const noOfRecord = await this.getTexts(this.elements.databaseRecordVisible);
    assert.equal(noOfRecord, databaseDetails.numOfColumnsToUpload);

    for (let index = 0; index < loadedDBArray.length; index++) {
      if (databaseDetails[loadedDBArray[index]] >= 0) {
        const contactValue = await this.getTexts(
          `(//span[@id='${loadedDBArray[index]}_contacts_label'])[last()]`
        );
        assert.equal(contactValue, databaseDetails[loadedDBArray[index]]);
      }
    }
  }

  /**
   * function to Manage assignments for Database
   * @param {*} assignmentsDetails - Object to provide type and name of assignment
   * @return {void} Nothing
   */
  async manageAssignments(assignmentsDetails) {
    await this.click(this.elements.manageAssignment);
    await this.waitForSelector(`//span[text()='${assignmentsDetails.type}']`);
    await this.click(`//span[text()='${assignmentsDetails.type}']`);
    await this.type(this.elements.agentSearchInput, assignmentsDetails.name);
    await this.click(
      `(//label[contains(@class,"agent-selector")]//span[text()="${assignmentsDetails.name}"])[1]`
    );
    await this.click(this.elements.assignUser);
    await this.waitForSelector(this.elements.applyAssignmentSwitch);
  }

  /**
   * function to Activate the Assignment in database
   * @param {*} assignmentType - type of assignment
   * @return {void} Nothing
   */
  async activateAssignments(assignmentType) {
    await this.click(this.elements.applyAssignmentSwitch);
    await this.click(
      `//input[@name="assignment-mode" and @value="${assignmentType}"]/..//span`
    );
  }

  /**
   * function to search in DB
   * @param {string} databaseName - database name
   * @return {void} Nothing
   */
  async deactivateDatabase(databaseName) {
    await this.wait(2);
    await this.searchDB(databaseName);
    await this.forceClick(this.elements.databaseActivateToggle);
  }

  /**
   * function to verify DB to CSV
   * @param {object} databaseDetails - database object
   * @param {string} databaseDetails.DB_name - downloaded database name
   * @param {string} databaseDetails.DB_name.Expected_DB - uploaded DB name
   * @return {void} Nothing
   */
  async validateDatabaseCsv(databaseDetails) {
    const csvData = await this.readCsv(databaseDetails.DB_name);
    if (databaseDetails.Expected_DB == 'Empty') {
      assert.isTrue(csvData[0] === '');
    } else {
      const Expected_DB_Name = databaseDetails.Expected_DB;
      const databases = Expected_DB_Name.split(',');
      for (let j = 0; j < databases.length; j++) {
        const expectedDBData = await this.readCsv(
          `fixtures/${databases[j]}.csv`
        );
        for (let i = 1; i < expectedDBData.length; i++) {
          const expectedName = expectedDBData[i].split(',')[0];
          const expectedphoneNumber = expectedDBData[i].split(',')[1];
          assert.isTrue(csvData.toString().includes(expectedName));
          assert.isTrue(csvData.toString().includes(expectedphoneNumber));
        }
      }
    }
  }

  /**
   * function to verify csv data
   * @param {object} csvDetails - csv data object
   * @param {string} csvDetails.rows - number of csv rows
   * @param {string} csvDetails.Total_Calls - number of calls
   * @param {string} csvDetails.Total_Recycle - number of recycle
   * @param {string} csvDetails.Is_New - is new
   * @param {string} csvDetails.Is_Closed - is closed
   * @param {string} csvDetails.Is_In_Recycle - is in recycle
   * @param {string} csvDetails.Is_In_Callback - is in callback
   * @param {string} csvDetails.lead_status - lead status
   * @param {string} csvDetails.Lead_Status - lead status
   * @param {string} csvDetails.deleted - deleted
   * @param {string} csvName- name of csv
   * @param {string} rowIndex - row index
   * @return {void} Nothing
   */
  async validateCSVData(csvName, csvDetails, rowIndex = 0) {
    const csvData = await this.readCsv(csvName);
    let obj = await this.conertCSVDataToJson(csvData);
    let jsonArr = JSON.parse(obj);
    if (csvDetails.sortBy) {
      jsonArr = await this.sortArray(jsonArr, csvDetails.sortBy);
    }
    let csvValue = '';
    let messageType = [];
    let messageText = [];
    if (csvDetails.Message_Type) {
      messageType = csvDetails.Message_Type.split(',');
      messageType = messageType.reverse();
    }
    if (csvDetails.Message_Text) {
      messageText = csvDetails.Message_Text.reverse();
    }
    let csvKeyValueArray = [
      'Agent_User_Name',
      'Agent_First_Name',
      'Agent_Last_Name',
      'Agent_Full_Name',
      'Comments',
      'Total_Calls',
      'Total_Recycle',
      'Is_New',
      'Is_Closed',
      'Is_In_Recycle',
      'Is_In_Callback',
      'lead_status',
      'deleted',
      'Call_Outcome_Group',
      'Call_Outcome_name',
      'Call_Type',
      'Campaign_Name',
      'Queue_Name',
      'Queue_Position',
      'Phone',
      'DDI',
      'Hangup_cause',
      'Hold_Time',
      'Owner_ID',
      'Owner_Type',
      'Queue_Time',
      'Ring_time',
      'Term_Reason',
      'User_group',
      'Actual_Ticket_Status',
      'Event_Type',
      'Owner_Name',
      'Extension',
      'Result',
      'Username',
      'TicketID',
      'ChatID',
      'Webchat_Name',
      'Webchat_Queue_Name',
      'Active_callback',
      'Callback_contact_phone',
      'Callback_owner_type',
      'Callback_Type',
      'Deleted_callback',
      'Contact_Outcome_name',
      'Original_Call_Agent',
      'Original_Call_Owner_Name',
      'Call_Subtype',
      'Lead_Status',
      'Max_tries_reached',
      'date',
      'Call_Start',
      'Destination_Owner_Name',
      'Destination_Type',
      'Destination_Username',
      'Original_Owner_Name',
      'Episode_Subject',
      'Source_Type',
      'Subject',
      'Ticket_Episode',
      'Visibility',
      'Agent_Group',
      'Profile_Name',
      'Chat_Status',
      'Script_Name',
      'Total_Score',
      'E_Learning_Status',
      '_Label_here.',
      'Ticket_Episode',
      'Visibility',
    ];
    let csvDateKeyArray = [
      'Event_Date',
      'Date_of_try',
      'Message_Date',
      'Callback_date',
      'Script_Result_Date',
      'Ticket_Created_Date',
      'Message_Start_Date',
      'Response_Date',
      'Ticket_Create_Date',
    ];

    for (let index = rowIndex; index < csvDetails.rows; index++) {
      csvKeyValueArray.forEach(function (key) {
        if (csvDetails[key]) {
          if (key === 'date') {
            csvDateKeyArray.forEach(function (dateKey) {
              csvValue = jsonArr[index][dateKey];
              if (csvValue !== undefined && csvValue !== '') {
                assert.isTrue(csvValue.includes(csvDetails[key]));
              }
            });
          } else {
            csvValue = jsonArr[index][key];
            if (csvValue !== undefined && csvValue !== '') {
              assert.isTrue(csvValue.includes(csvDetails[key]));
            }
          }
        }
      });
      if (messageType.length) {
        csvValue = jsonArr[index]['Message_Type'];
        if (csvValue !== undefined && csvValue !== '') {
          assert.isTrue(messageType.includes(csvValue));
          if (messageText.length && csvValue === 'MSG') {
            csvValue = jsonArr[index]['Message_Text'];
            if (csvValue !== undefined && csvValue !== '') {
              assert.isTrue(messageText.includes(csvValue));
            }
          }
        }
      }
    }
  }

  /**
   * function to check exclusive in DB
   * @param {string} toggleOption - button state
   * @return {void} Nothing
   */
  async checkDBExclusiveToggle(toggleOption) {
    await this.searchDB(global.newDBName[1].toString());
    let checkDatabase = `//td[contains(text(), ${global.newDBName[1].toString()})]/..//td[4]//*[@name = "checkbox-toggle"]/parent::label/i`;    if (
      toggleOption === 'on' &&
      !(await this.getToggleButtonStatus(this.elements.databaseExclusiveToggle))
    ) {
      await this.click(checkDatabase);
    } else if (
      toggleOption === 'off' &&
      (await this.getToggleButtonStatus(this.elements.databaseExclusiveToggle))
    ) {
      await this.click(checkDatabase);
    }
  }

  /**
   * function to remove elements
   * @return {void} Nothing
   */
  async removeStoredElements() {
    global.newDBName = [];
    global.templateName = [];
    global.campaignName = [];
    global.downloadFileName = [];
  }

  /**
   * function to empty database
   * @return {void} Nothing
   */
  async resetDatabase() {
    global.newDBName = [];
  }

  /**
   * function to set contact maximum tries limit
   * @param {string} contactMaxLimit -contact maximum tries limit
   * @return {void} Nothing
   */
  async setContactMaxTriesLimit(contactMaxLimit) {
    if (contactMaxLimit.dailyContactMaxTries) {
      await this.click(this.elements.dailyContactMaxTries);
      await this.clearField(this.elements.dailyContactMaxTries);
      await this.type(
        this.elements.dailyContactMaxTries,
        contactMaxLimit.dailyContactMaxTries
      );
    }
    if (contactMaxLimit.contactMaxTries) {
      await this.click(this.elements.contactMaxTries);
      await this.clearField(this.elements.contactMaxTries);
      await this.type(
        this.elements.contactMaxTries,
        contactMaxLimit.contactMaxTries
      );
    }
  }
  /**
   * function to Validate the data of database
   * @param {string} databaseData - Database data
   * @return {void} Nothing
   */
  async validateDatabase(databaseData) {
    await this.waitForSelector(this.elements.dataTable);
    await this.forceClick(this.elements.dataTable);
    await this.wait(2); // to load the page
    const data = Object.keys(databaseData);
    for (let i = 0; i < data.length; i++) {
      let key = data[i].toString();
      const noOfRecord = await this.getTexts(
        `[id="${data[i]}_contacts_label"]`
      );
      assert.equal(noOfRecord, databaseData[key]);
    }
  }
};
