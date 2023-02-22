@crm

Feature: CRM tests
    Background: Login to the application
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database

    @6706
    Scenario: Transfer Contacts - Existing database - Move
        When user navigates to Template Contact Fields submenu
        And user creates new template with following steps:
            | fieldName | Field_1 |
        Then user navigates to voice manager
        When user creates new campaign:
            | dialerType       | power-preview |
            | ddi              | 300501602     |
            | outcomeName      | newOutcome    |
            | outcomeAttribute | humananswer   |
            | recycle          | delete        |
            | agentName        | Agent One     |
            | template         | 0             |
        Then verify '0' campaign is successfully created and displayed in the list of campaigns
        When Navigate to Database Manager
        And Create Database
            | browseFile              | optionName | optionPhone1 | campaignIndex |
            | fixtures/database_1.csv | 0          | 1            | 0             |
        Then load the database
            | browseFile              | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 2                    | 0          | 1            | 0             | 0             |
        And Create Database
            | browseFile              | optionName | optionPhone1 | campaignIndex |
            | fixtures/database_2.csv | 0          | 1            | 0             |
        Then load the database
            | browseFile              | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_2.csv | 2                    | 0          | 1            | 0             | 1             |
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then user click on transfer contacts button and fill the outcome
            | database | 1    |
            | actions  | Move |
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | Empty |
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 1        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | database_1,database_2 |
        When Navigate to Database Manager
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_2.csv | 0          | 1            | 0             | 1             |
        Then Validate database csv data
            | Expected_DB           | Actual_DB |
            | database_1,database_2 | 0         |
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 0          | 1            | 1             | 0             |
        Then Validate database csv data
            | Expected_DB | Actual_DB |
            | Empty       | 1         |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_1.csv | 1                | 0          | 1            | 0             |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_2.csv | 2                | 0          | 1            | 1             |
        Then user navigates to voice manager
        Then user deletes '0' campaign
        Then user navigates to Template Contact Fields submenu
        Then user deletes the '0' template

    @6709
    Scenario: Transfer Contacts - Existing database - Duplicate
        When user navigates to Template Contact Fields submenu
        Then user creates new template with following steps:
            | fieldName | Fields_1 |
        When user navigates to voice manager
        When user creates new campaign:
            | template         | 0             |
            | dialerType       | power-preview |
            | ddi              | 300501602     |
            | outcomeName      | createNew     |
            | outcomeAttribute | humananswer   |
            | recycle          | delete        |
            | agentName        | Agent One     |
        Then verify '0' campaign is successfully created and displayed in the list of campaigns
        When Navigate to Database Manager
        And Create Database
            | browseFile              | optionName | optionPhone1 | campaignIndex |
            | fixtures/database_1.csv | 0          | 1            | 0             |
        Then load the database
            | browseFile              | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 2                    | 0          | 1            | 0             | 0             |
        And Create Database
            | browseFile              | optionName | optionPhone1 | campaignIndex |
            | fixtures/database_2.csv | 0          | 1            | 0             |
        Then load the database
            | browseFile              | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_2.csv | 2                    | 0          | 1            | 0             | 1             |
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then user click on transfer contacts button and fill the outcome
            | database | 1         |
            | actions  | Duplicate |
        Then user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | database_1 |
        Then user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 1        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | database_2 |
        When Navigate to Database Manager
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_2.csv | 0          | 1            | 0             | 1             |
        Then Validate database csv data
            | Expected_DB | Actual_DB |
            | database_2  | 0         |
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 0          | 1            | 1             | 0             |
        Then Validate database csv data
            | Expected_DB | Actual_DB |
            | database_1  | 1         |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_1.csv | 1                | 0          | 1            | 0             |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_2.csv | 2                | 0          | 1            | 1             |
        When user navigates to voice manager
        Then user deletes '0' campaign
        Then user navigates to Template Contact Fields submenu
        Then user deletes the '0' template

    @6713
    Scenario: Transfer Contacts - New Database - Duplicate
        When user navigates to Template Contact Fields submenu
        Then user creates new template with following steps:
            | fieldName | Fields_1 |
        When user navigates to voice manager
        When user creates new campaign:
            | template         | 0             |
            | dialerType       | power-preview |
            | ddi              | 300501602     |
            | outcomeName      | createNew     |
            | outcomeAttribute | humananswer   |
            | recycle          | delete        |
            | agentName        | Agent One     |
        Then verify '0' campaign is successfully created and displayed in the list of campaigns
        When Navigate to Database Manager
        And Create Database
            | browseFile              | optionName | optionPhone1 | campaignIndex |
            | fixtures/database_1.csv | 0          | 1            | 0             |
        Then load the database
            | browseFile              | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 2                    | 0          | 1            | 0             | 0             |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then user click on transfer contacts button and fill the outcome
            | transfer  | New database |
            | name      | database     |
            | campaign  | 0            |
            | outcome   | NEW          |
            | exclusive | true         |
            | actions   | Duplicate    |
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | database_1 |
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 1        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | database_1 |
        When Navigate to Database Manager
        Then Verify exclusive is set to 'on'
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 0          | 1            | 0             | 1             |
        Then Validate database csv data
            | Expected_DB | Actual_DB |
            | database_1  | 0         |
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 0          | 1            | 1             | 0             |
        Then Validate database csv data
            | Expected_DB | Actual_DB |
            | database_1  | 1         |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_1.csv | 1                | 0          | 1            | 0             |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_1.csv | 2                | 0          | 1            | 1             |
        When user navigates to voice manager
        Then user deletes '0' campaign
        Then user navigates to Template Contact Fields submenu
        Then user deletes the '0' template

    @6716
    Scenario: Transfer Contacts - New Database - Move
        When user navigates to Template Contact Fields submenu
        Then user creates new template with following steps:
            | fieldName | Fields_1 |
        When user navigates to voice manager
        When user creates new campaign:
            | template         | 0             |
            | dialerType       | power-preview |
            | ddi              | 300501602     |
            | outcomeName      | createNew     |
            | outcomeAttribute | humananswer   |
            | recycle          | delete        |
            | agentName        | Agent One     |
        Then verify '0' campaign is successfully created and displayed in the list of campaigns
        When Navigate to Database Manager
        And Create Database
            | browseFile              | optionName | optionPhone1 | campaignIndex |
            | fixtures/database_1.csv | 0          | 1            | 0             |
        Then load the database
            | browseFile              | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 2                    | 0          | 1            | 0             | 0             |
        When user navigate to crm
        And let user wait for '3' seconds
        Then user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then user click on transfer contacts button and fill the outcome
            | transfer  | New database |
            | name      | database     |
            | campaign  | 0            |
            | outcome   | NEW          |
            | exclusive | false        |
            | actions   | Move         |
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 0        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | Empty |
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0        |
            | searchType   | Contact  |
            | database     | 1        |
            | agents       | no       |
        Then verify the CRM search results against DB
            | database | database_1 |
        When Navigate to Database Manager
        Then Verify exclusive is set to 'off'
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 0          | 1            | 0             | 1             |
        Then Validate database csv data
            | Expected_DB | Actual_DB |
            | database_1  | 0         |
        Then Download the Database
            | browseFile              | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database_1.csv | 0          | 1            | 1             | 0             |
        Then Validate database csv data
            | Expected_DB | Actual_DB |
            | Empty       | 1         |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_1.csv | 1                | 0          | 1            | 0             |
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_1.csv | 2                | 0          | 1            | 1             |
        When user navigates to voice manager
        Then user deletes '0' campaign
        Then user navigates to Template Contact Fields submenu
        Then user deletes the '0' template

    @6719
    Scenario: Change outcome - Change to NEW - Delete associated callbacks
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        When user navigates to callOutcome
        Then user add new outcomes to campaign:
            | outcomeName      | Callback,Outcome_1  |
            | outcomeAttribute | calback,humananswer |
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_2' queue in 'same' window
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Agent One        |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | no                 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Callback           |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_1 |
            | searchType | Contact            |
            | database   | 0                  |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | all |
        Then user clicks on change contacts outcome and enters details:
            | changeTo         | New  |
            | deleteAssociated | true |
        When user navigate to callbacks manager
        Then validate the callback is successfully deleted or have no data available
        When Navigate to Database Manager
        And Download the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1     |
            | Total_Calls    | 0     |
            | Total_Recycle  | 0     |
            | Is_New         | true  |
            | Is_Closed      | false |
            | Is_In_Recycle  | false |
            | Is_In_Callback | false |
            | lead_status    | new   |
            | deleted        | false |
        And let user wait for '3' seconds
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_2' queue in 'same' window
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Outcome_1' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Outcome_1          |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @6720
    Scenario: Change outcome - Change to NEW - Without any option
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        When user navigates to callOutcome
        Then user add new outcomes to campaign:
            | outcomeName      | Callback,Outcome_1  |
            | outcomeAttribute | calback,humananswer |
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_2' queue in 'same' window
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Agent One        |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | no                 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Callback           |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_1 |
            | searchType | Contact            |
            | database   | 0                  |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | all |
        Then user clicks on change contacts outcome and enters details:
            | changeTo | New |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When Navigate to Database Manager
        And Download the Database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1     |
            | Total_Calls    | 0     |
            | Total_Recycle  | 0     |
            | Is_New         | true  |
            | Is_Closed      | false |
            | Is_In_Recycle  | false |
            | Is_In_Callback | false |
            | lead_status    | new   |
            | deleted        | false |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_2' queue in 'same' window
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Outcome_1' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Outcome_1          |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When Navigate to Database Manager
        And Download the Database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1        |
            | Total_Calls    | 1        |
            | Total_Recycle  | 0        |
            | Is_New         | false    |
            | Is_Closed      | false    |
            | Is_In_Recycle  | false    |
            | Is_In_Callback | true     |
            | lead_status    | callback |
            | deleted        | false    |
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @6724
    Scenario: Change outcome - Change to NEW - Set maximum priority on the Hopper
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_2'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        Then user finish the campaign editing
        When Navigate to Database Manager
        And Create Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database_1.csv | 2                | 0          | 1            |
        Then load the database
            | browseFile              | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database_1.csv | 2                    | 2                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_2' campaign
        Then verify all contacts loaded in the database are triggered by the dialer
            | number       | 808888888,909999999 |
            | outcomeGroup | Call Again Later    |
            | outcomeName  | Ok                  |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_2 |
            | database  | 0                  |
        Then validate different calls are registered as per following configurations:
            | phoneNumber | callOutcome | termReason |
            | 808888888   | Ok          | AGENT      |
            | 909999999   | Ok          | AGENT      |
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_2 |
            | searchType | Contact            |
            | database   | 0                  |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | Contact_1 |
        Then user clicks on change contacts outcome and enters details:
            | changeTo | New |
        When user select following contacts from the result:
            | contactNames | Contact_2 |
        Then user clicks on change contacts outcome and enters details:
            | changeTo    | New  |
            | maxPriority | true |
        When Navigate to Database Manager
        Then Download the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database_1.csv | 2                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 2     |
            | Total_Calls    | 0     |
            | Total_Recycle  | 0     |
            | Is_New         | true  |
            | Is_Closed      | false |
            | Is_In_Recycle  | false |
            | Is_In_Callback | false |
            | lead_status    | new   |
            | deleted        | false |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_2' campaign
        Then verify all contacts loaded in the database are triggered by the dialer
            | number       | 909999999        |
            | outcomeGroup | Call Again Later |
            | outcomeName  | Ok               |
        Then verify all contacts loaded in the database are triggered by the dialer
            | number       | 808888888        |
            | outcomeGroup | Call Again Later |
            | outcomeName  | Ok               |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_2 |
            | database  | 0                  |
        Then validate different calls are registered as per following configurations:
            | phoneNumber | callOutcome | termReason |
            | 909999999   | Ok          | AGENT      |
            | 808888888   | Ok          | AGENT      |
            | 909999999   | Ok          | AGENT      |
            | 808888888   | Ok          | AGENT      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile              | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database_1.csv | 1                | 0          | 1            | 0             |

    @6725
    Scenario: Change outcome - Change to NEW - Keep counters
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_2'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 2                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_2' campaign
        Then verify all contacts loaded in the database are triggered by the dialer
            | number       | 910261828        |
            | outcomeGroup | Call Again Later |
            | outcomeName  | Ok               |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_2 |
            | database  | 0                  |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_2 |
            | termReason  | AGENT              |
        When user click on return button
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_2 |
            | searchType | Contact            |
            | database   | 0                  |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | all |
        Then user clicks on change contacts outcome and enters details:
            | changeTo           | New  |
            | keepRecycleCounter | true |
        When Navigate to Database Manager
        Then Download the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1     |
            | Total_Calls    | 1     |
            | Total_Recycle  | 0     |
            | Is_New         | true  |
            | Is_Closed      | false |
            | Is_In_Recycle  | false |
            | Is_In_Callback | false |
            | lead_status    | new   |
            | deleted        | false |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_2' campaign
        Then verify all contacts loaded in the database are triggered by the dialer
            | number       | 910261828        |
            | outcomeGroup | Call Again Later |
            | outcomeName  | Ok               |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_2 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_2 |
            | termReason  | AGENT              |
        When Navigate to Database Manager
        Then Download the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1      |
            | fileIndex      | 1      |
            | Total_Calls    | 2      |
            | Total_Recycle  | 0      |
            | Is_New         | false  |
            | Is_Closed      | true   |
            | Is_In_Recycle  | false  |
            | Is_In_Callback | false  |
            | lead_status    | closed |
            | deleted        | false  |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @6726
    Scenario: Change outcome - Choose another outcome - Same owners without deleting callbacks
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_2'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        When user navigates to callOutcome
        Then user add new outcomes to campaign:
            | outcomeName      | Callback,Outcome_1  |
            | outcomeAttribute | calback,humananswer |
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 2                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_2' campaign
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Agent One        |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_2 |
            | agents    | no                 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Callback           |
            | owner       | OutboundCampaign_2 |
            | termReason  | AGENT              |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_2' campaign
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_2 |
            | searchType | Contact            |
            | database   | 0                  |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | all |
        Then user clicks on change contacts outcome and enters details:
            | changeTo        | another          |
            | outcomeGroup    | Call Again Later |
            | outcome         | Outcome_1        |
            | deleteCallbacks | false            |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_2' campaign
        When Navigate to Database Manager
        And Download the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1        |
            | Total_Calls    | 1        |
            | Total_Recycle  | 0        |
            | Is_New         | false    |
            | Is_Closed      | false    |
            | Is_In_Recycle  | false    |
            | Is_In_Callback | true     |
            | lead_status    | callback |
            | deleted        | false    |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @6727
    Scenario: Change outcome - Choose another outcome - Same owners with the option for deleting callbacks
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_2'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        When user navigates to callOutcome
        Then user add new outcomes to campaign:
            | outcomeName      | Callback,Outcome_1  |
            | outcomeAttribute | calback,humananswer |
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 2                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_2' campaign with '' queue in 'same' window
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Agent One        |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_2 |
            | agents    | no                 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Callback           |
            | owner       | OutboundCampaign_2 |
            | termReason  | AGENT              |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_2' campaign
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_2 |
            | searchType | Contact            |
            | database   | 0                  |
        Then verify the CRM search results against DB
            | database | database |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | all |
        Then user clicks on change contacts outcome and enters details:
            | changeTo        | another          |
            | outcomeGroup    | Call Again Later |
            | outcome         | Outcome_1        |
            | deleteCallbacks | true             |
        When user navigate to callbacks manager
        Then validate the callback is successfully deleted or have no data available
        When Navigate to Database Manager
        And Download the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1      |
            | Total_Calls    | 1      |
            | Total_Recycle  | 0      |
            | Is_New         | false  |
            | Is_Closed      | true   |
            | Is_In_Recycle  | false  |
            | Is_In_Callback | false  |
            | lead_status    | closed |
            | deleted        | false  |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @6728
    Scenario: Change outcome - Choose another outcome - Different owners with the option for deleting callbacks
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        When user navigates to callOutcome
        Then user add new outcomes to campaign:
            | outcomeName      | Callback,Outcome_1  |
            | outcomeAttribute | calback,humananswer |
        And save the changes in edit campaign
        And user edits the campaign 'OutboundCampaign_2'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 2                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_2' queue in 'same' window
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Agent One        |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | no                 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Callback           |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound                              |
            | campaigns  | OutboundCampaign_1,OutboundCampaign_2 |
            | searchType | Contact                               |
            | database   | 0,1                                   |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | all |
        Then user clicks on change contacts outcome and enters details:
            | changeTo        | another         |
            | outcomeGroup    | System outcomes |
            | outcome         | Cancel          |
            | deleteCallbacks | true            |
        When user navigate to callbacks manager
        Then validate the callback is successfully deleted or have no data available
        When Navigate to Database Manager
        And Download the Database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1      |
            | Total_Calls    | 1      |
            | Total_Recycle  | 0      |
            | Is_New         | false  |
            | Is_Closed      | true   |
            | Is_In_Recycle  | false  |
            | Is_In_Callback | false  |
            | lead_status    | closed |
            | deleted        | false  |
        And Download the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1      |
            | Total_Calls    | 1      |
            | Total_Recycle  | 0      |
            | Is_New         | false  |
            | Is_Closed      | true   |
            | Is_In_Recycle  | false  |
            | Is_In_Callback | false  |
            | lead_status    | closed |
            | deleted        | false  |
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 2                | 0          | 1            | 1             |

    @6729
    Scenario: Change outcome - Choose another outcome - Different owners without deleting callbacks
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        When user navigates to callOutcome
        Then user add new outcomes to campaign:
            | outcomeName      | Callback,Outcome_1  |
            | outcomeAttribute | calback,humananswer |
        And save the changes in edit campaign
        And user edits the campaign 'OutboundCampaign_2'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 2                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_2' queue in 'same' window
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Agent One        |
        Then user logout from Voice Channel in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | no                 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Callback           |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound                              |
            | campaigns  | OutboundCampaign_1,OutboundCampaign_2 |
            | searchType | Contact                               |
            | database   | 0,1                                   |
        Then user verify that the button Change outcome is disabled
        When user select following contacts from the result:
            | contactNames | all |
        Then user clicks on change contacts outcome and enters details:
            | changeTo        | another         |
            | outcomeGroup    | System outcomes |
            | outcome         | Cancel          |
            | deleteCallbacks | false           |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When Navigate to Database Manager
        And Download the Database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1        |
            | Total_Calls    | 1        |
            | Total_Recycle  | 0        |
            | Is_New         | false    |
            | Is_Closed      | false    |
            | Is_In_Recycle  | false    |
            | Is_In_Callback | true     |
            | lead_status    | callback |
            | deleted        | false    |
        And Download the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 2                | 0          | 1            |
        Then validate csv contains following information:
            | rows           | 1        |
            | Total_Calls    | 1        |
            | Total_Recycle  | 0        |
            | Is_New         | false    |
            | Is_Closed      | false    |
            | Is_In_Recycle  | false    |
            | Is_In_Callback | true     |
            | lead_status    | callback |
            | deleted        | false    |
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 2                | 0          | 1            | 1             |

    @6730
    Scenario: Transfer Contacts - Different Templates
        When user navigates to Template Contact Fields submenu
        And user creates new template with following steps:
            | fieldName | Field_1 |
        And user creates new template with following steps:
            | fieldName | Field_2 |
        Then user navigates to voice manager
        When user creates new campaign:
            | template         | 0             |
            | dialerType       | power-preview |
            | ddi              | 300501602     |
            | outcomeName      | newOutcome    |
            | outcomeAttribute | humananswer   |
            | recycle          | delete        |
            | agentName        | Agent One     |
        When user creates new campaign:
            | template         | 1             |
            | dialerType       | power-preview |
            | ddi              | 300501602     |
            | outcomeName      | newOutcome    |
            | outcomeAttribute | humananswer   |
            | recycle          | delete        |
            | agentName        | Agent One     |
        When Navigate to Database Manager
        And Create Database
            | browseFile            | optionName | optionPhone1 | campaignIndex |
            | fixtures/database.csv | 0          | 1            | 0             |
        Then load the database
            | browseFile            | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database.csv | 1                    | 0          | 1            | 0             | 0             |
        And Create Database
            | browseFile            | optionName | optionPhone1 | campaignIndex |
            | fixtures/database.csv | 0          | 1            | 1             |
        Then load the database
            | browseFile            | numOfColumnsToUpload | optionName | optionPhone1 | campaignIndex | databaseIndex |
            | fixtures/database.csv | 1                    | 0          | 1            | 1             | 1             |
        When I re-login using 'Agent_1' account
        And login to Voice Channel with '100' extension
        And user selects '1' campaign
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'newOutcome' outcome name
        Then call hangup message 'Its status will be refreshed within a maximum of 5 minutes'
        Then user select the Outbound cloud button in the interface and select campaign:
            | index | 0 |
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'newOutcome' outcome name
        Then call hangup message 'Its status will be refreshed within a maximum of 5 minutes'
        When I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Outbound |
            | campaignType | Global   |
            | campaigns    | 0,1      |
            | searchType   | Contact  |
            | database     | 0,1      |
            | agents       | no       |
        Then verify that the button Transfer contacts is disabled
        And verify that on top of the table a information popover is presented, 'You can not create a new database because you have results with multiple Extra Fields templates.'
        Then user navigates to voice manager
        Then user deletes '0' campaign
        Then user deletes '1' campaign
        Then user navigates to Template Contact Fields submenu
        Then user deletes the '0' template