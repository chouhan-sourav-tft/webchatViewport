const { When, Then } = require('@cucumber/cucumber');
const { Database } = require('../page-objects/DatabaseManager.po');
const { BaseAction } = require('../setup/baseAction');
const { VoiceChannel } = require('../page-objects/VoiceChannel.po');
const dayjs = require('dayjs');

const Data = new Database();
const action = new BaseAction();
const voiceChannel = new VoiceChannel();

global.newtTableName = '';
global.newDBName = [];
global.downloadFileName = [];

Then('Create Database', async (datatable) => {
  let dbName = await action.getRandomString('_database');
  global.newDBName.push(await dbName.toString());
  let databaseDetails = '';
  datatable.hashes().forEach((element) => {
    if (element.campaignIndex) {
      element.databaseCampaign = global.campaignName[element.campaignIndex];
    }
    databaseDetails = {
      'queue': element.queue,
      'browseFile': element.browseFile,
      'numOfColumnsToUpload': element.numOfColumnsToUpload,
      'databaseCampaign': element.databaseCampaign,
      'optionName': element.optionName,
      'optionPhone1': element.optionPhone1,
      'optionEmail': element.optionEmail,
      'optionPostal': element.optionPostal,
      'optionCity': element.optionCity,
      'optionField': element.optionField
    };
  });
  await Data.createDatabase(dbName, databaseDetails);
});

When('Navigate to Database Manager', async () => {
  await Data.databaseManager();
});

Then('Edit the {string} Database', async (databaseNo, datatable) => {
  let dbName = action.getRandomString('_database');
  global.newDBName.push(await dbName);
  let databaseDetails = '';
  datatable.hashes().forEach((element) => {
    databaseDetails = {
      'queue': element.queue,
      'browseFile': element.browseFile,
      'numOfColumnsToUpload': element.numOfColumnsToUpload,
      'databaseCampaign': element.databaseCampaign,
      'optionName': element.optionName,
      'optionPhone1': element.optionPhone1
    };
  });
  await Data.editDatabase((await dbName).toString(), databaseDetails);
});

Then('Download the Database', async (datatable) => {
  let databaseDetails = '';
  datatable.hashes().forEach((element) => {
    if (!element.databaseIndex) {
      element.databaseIndex = 0;
    }
    if (!element.databaseCampaign) {
      element.databaseCampaign = global.campaignName[element.databaseIndex];
    }
    databaseDetails = {
      'queue': element.queue,
      'browseFile': element.browseFile,
      'numOfColumnsToUpload': element.numOfColumnsToUpload,
      'databaseCampaign': element.databaseCampaign,
      'optionName': element.optionName,
      'optionPhone1': element.optionPhone1,
      'databaseName': global.newDBName[element.databaseIndex].toString()
    };
  });
  let fileName = await Data.downloadDatabase(databaseDetails.databaseName, databaseDetails);
  global.downloadFileName.push(fileName);
});

Then('Delete the Database', async (datatable) => {
  let dbName = '';
  let databaseDetails = '';
  datatable.hashes().forEach(async (element) => {
    // waiting here so that database upload here
    await action.wait(2);
    if (element.databaseIndex) {
      dbName = global.newDBName[element.databaseIndex];
    }
    else {
      dbName = action.getRandomString('_database');
      global.newDBName.push(dbName.toString());
    }
    databaseDetails = {
      'queue': element.queue,
      'browseFile': element.browseFile,
      'numOfColumnsToUpload': element.numOfColumnsToUpload,
      'databaseCampaign': element.databaseCampaign,
      'optionName': element.optionName,
      'optionPhone1': element.optionPhone1
    };
  });
  await Data.deleteDatabase((await dbName).toString(), databaseDetails);
});

Then('Switch Tab to Table Manager', async () => {
  await Data.tableManagerTab();
});

Then('Create New Table', async (datatable) => {
  global.newtTableName = action.getRandomString('_table');
  let TableDetails = '';
  datatable.hashes().forEach((element) => {
    TableDetails = {
      'browseFile': element.browseFile,
      'noOfRecord': element.noOfRecord
    };
  });
  await Data.createTable((await global.newtTableName).toString(), TableDetails);
});

Then('search the table with name as {string}', async (tableName, datatable) => {
  if (tableName === 'random') {
    tableName = (await global.newtTableName).toString();
  }
  let TableDetails = '';
  datatable.hashes().forEach((element) => {
    TableDetails = {
      'browseFile': element.browseFile,
      'noOfRecord': element.noOfRecord
    };
  });
  await Data.searchTable(tableName, TableDetails);
});

Then('Select {string} Table and edit', async (tableName, datatable) => {
  let TableDetails = '';
  datatable.hashes().forEach((element) => {
    TableDetails = {
      'browseFile': element.browseFile,
      'noOfRecord': element.noOfRecord
    };
  });
  await Data.editTable(tableName, TableDetails);
});

Then('Download the Table', async () => {
  await Data.downloadTable();
});

Then('verify table active state is {string}', async (state) => {
  await Data.verifyTableState(state);
});

Then('Flush the {string} Table', async (tableName, datatable) => {
  let TableDetails = '';
  datatable.hashes().forEach((element) => {
    TableDetails = {
      'browseFile': element.browseFile,
      'noOfRecord': element.noOfRecord
    };
  });
  await Data.flushTable(tableName, TableDetails);
});

Then('add a new Outcome in campaign:', async (datatable) => {
  let outcomeDetails = '';
  datatable.hashes().forEach((element) => {
    outcomeDetails = {
      'name': element.name,
      'attributes': element.attributes,
      'group': element.group,
      'column': element.table_column,
      'campaign': element.campaignName
    };
  });

  await voiceChannel.addOutcome((await global.newtTableName).toString(), outcomeDetails);
});

Then('verify the {string} csv data contains {string}', async (csvName, csvData) => {
  if (csvName === 'random') {
    csvName = (await global.newtTableName).toString();
  }
  await Data.verifyCsvContains(csvName, csvData);
});

Then('load the database', async (datatable) => {
  let databaseDetails = '';
  datatable.hashes().forEach((element) => {
    if (element.campaignIndex) {
      element.databaseCampaign = global.campaignName[element.campaignIndex];
    }
    if (!element.databaseIndex) {
      element.databaseIndex = 0;
    }
    databaseDetails = {
      'queue': element.queue,
      'browseFile': element.browseFile,
      'numOfColumnsToUpload': element.numOfColumnsToUpload,
      'databaseCampaign': element.databaseCampaign,
      'optionName': element.optionName,
      'optionPhone1': element.optionPhone1,
      'dbName': global.newDBName[element.databaseIndex].toString(),
      'databaseDetailsLoaded': element,
      'optionEmail': element.optionEmail,
      'optionPostal': element.optionPostal,
      'optionCity': element.optionCity,
      'optionField': element.optionField,
    };
  });
  await Data.loadDatabase(databaseDetails.dbName, databaseDetails);
  await Data.searchDB(databaseDetails.dbName);
});

Then('manage assignments in database manager', async (datatable) => {
  let assignmentsDetails = '';
  datatable.hashes().forEach((element) => {
    assignmentsDetails = {
      'type': element.type,
      'name': element.name
    };
  });
  await Data.manageAssignments(assignmentsDetails);
});

Then('activate the assignment as {string}', async (assignmentType) => {
  await Data.activateAssignments(assignmentType);
});

Then('Deactivate the {string} database', async (index) => {
  let dbName = await global.newDBName[index].toString();
  await Data.deactivateDatabase(dbName);
});

Then('verify the {string} csv data from DB contains {string}', async (csvName, csvData) => {
  if (csvName === 'random') {
    csvName = (await global.newtDBName).toString();
  }
  await Data.verifyCsvContains(csvName, csvData);
});

When('Validate database csv data', async (dataTable) => {
  let databaseDetails = '';
  dataTable.hashes().forEach((element) => {
    databaseDetails = {
      'Expected_DB': element.Expected_DB,
      'DB_name': global.downloadFileName[element.Actual_DB]
    };
  });
  await Data.validateDatabaseCsv(databaseDetails);
});

Then('validate csv contains following information:', async (csvData) => {
  const csvDetails = csvData.rowsHash();
  let rowIndex = 0;
  if (csvDetails.fileIndex) {
    rowIndex = csvDetails.fileIndex;
  }
  csvDetails.date = dayjs().format('YYYY-MM-DD');
  csvDetails.TicketID = global.ticketID;
  csvDetails.chatID = global.chatID;
  csvDetails.Script_Name = global.scriptNew;
  csvDetails.Message_Text = global.webchatMsg;
  await Data.validateCSVData(global.downloadFileName[rowIndex], csvDetails);
});

Then('Verify exclusive is set to {string}', async (toggleOption) => {
  await Data.checkDBExclusiveToggle((global.newDBName[1]).toString(), toggleOption);
});

Then('user delete the stored database', async () => {
  await Data.removeStoredElements();
});

Then('let user reset the database', async () => {
  await Data.resetDatabase();
});

Then('user set the contact maximum tries limit', async (contactLimit) => {
  let contactMaxLimit = '';
  contactLimit.hashes().forEach((element) => {
    contactMaxLimit = {
      'dailyContactMaxTries': element.dailyContactMaxTries,
      'contactMaxTries': element.contactMaxTries,
    };
  });
  await Data.setContactMaxTriesLimit(contactMaxLimit);
});

Then('user search and select the {string} database', async (index) => {
  let dbName = await global.newDBName[index].toString();
  await Data.searchDB(dbName);
});

Then('Validate that the Database has:', async (dataTable) => {
  let databaseData = [];
  databaseData = dataTable.rowsHash();
  await Data.validateDatabase(databaseData);
});

Then('validate csv contains following information in different rows:', async (dataTable) => {
  let csvData = [];
  dataTable.hashes().forEach((element) => {
    csvData.push({
      'rows' : element.rows,
      'Agent_First_Name': element.Agent_First_Name,
      'Agent_Last_Name': element.Agent_Last_Name,
      'Agent_User_Name': element.Agent_User_Name,
      'Username': element.Username,
      'Call_Outcome_Group': element.Call_Outcome_Group,
      'Call_Outcome_name': element.Call_Outcome_name,
      'Call_Type': element.Call_Type,
      'Call_Subtype': element.Call_Subtype,
      'DDI': element.DDI,
      'Hangup_cause': element.Hangup_cause,
      'Contact_Outcome_name': element.Contact_Outcome_name,
      'Lead_Status': element.Lead_Status,
      'Term_Reason': element.Term_Reason,
      'User_group': element.User_group,
      '_Label_here.': element._Label_here,
      'Owner_Type': element.Owner_Type,
      'sortBy' : element.sortBy,
      'Ticket_Episode': element.Ticket_Episode,
      'Visibility': element.Visibility,
      'Actual_Ticket_Status': element.Actual_Ticket_Status,
      'Owner_Name': element.Owner_Name,
      'Source_Type': element.Source_Type
    });
  });
  let rowIndex = 0;
  for (let i = 0; i < csvData.length; i++) {
    if(csvData[i].fileIndex){
      rowIndex = csvData[i].fileIndex;
    }
    await Data.validateCSVData(global.downloadFileName[rowIndex],csvData[i],i);
  }
});