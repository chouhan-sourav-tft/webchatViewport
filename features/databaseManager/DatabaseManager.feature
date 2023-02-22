@databaseManager
Feature: Database Manager

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And let user reset the database

    @1012
    Scenario: Database Create
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then user state should be 'ready'
        And verify No calls are triggered when campaign 'dialer-preview'
        Then User logout with current session
        When User login to the platform as 'admin'
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @1014
    Scenario: Database Download
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then Download the Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And Deactivate the '0' database

    @1015
    Scenario: Database Delete
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then user state should be 'ready'
        And verify No calls are triggered when campaign 'dialer-preview'

    @1018
    Scenario: Table Manager Create
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And Create New Table
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |

    @1019
    Scenario: Table Manager Edit
        When Navigate to Database Manager
        When Switch Tab to Table Manager
        Then Select 'test_table' Table and edit
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |

    @1020
    Scenario: Table Manager Download
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And search the table with name as 'test_table'
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |
        Then Download the Table

    @1021
    Scenario: Table Manager Flush Table
        When Navigate to Database Manager
        When Switch Tab to Table Manager
        Then Flush the 'test_table' Table
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |

    @1013
    Scenario: Database Edit
        When Navigate to Database Manager
        And Edit the 'random' Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And Deactivate the '0' database

    @6761
    Scenario: Cannot make manual call when reaching daily max tries per contact
        When clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab
        Then user configure Global Max tries with value '0'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then user set the contact maximum tries limit
            | dailyContactMaxTries |
            | 1                    |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then verify 'visible' and click on Redial call button
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        And user make a call
        And verify error message displayed when daily maximum tries limit reached
        Then Navigate to Database Manager
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |


    @6774
    Scenario: Power-Preview- Daily max. tries per contact
        When clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab
        Then user configure Global Max tries with value '0'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then user set the contact maximum tries limit
            | dailyContactMaxTries |
            | 1                    |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When Navigate to Database Manager
        When user search and select the '0' database
        Then Validate that the Database has:
            | new      | 0 |
            | recycle  | 0 |
            | callback | 0 |
            | closed   | 1 |
            | hopper   | 0 |
        When user navigate to voice channel
        Then verify 'visible' and click on Redial call button
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        And user make a call
        And verify error message displayed when daily maximum tries limit reached
        Then Navigate to Database Manager
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |


    @6771
    Scenario: Power-Dial- Daily max. tries per contact
        When clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab
        Then user configure Global Max tries with value '0'
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then user set the contact maximum tries limit
            | dailyContactMaxTries |
            | 1                    |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user state should be 'talking'
        And let user wait for '3' seconds
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When Navigate to Database Manager
        When user search and select the '0' database
        Then Validate that the Database has:
            | new      | 0 |
            | recycle  | 0 |
            | callback | 0 |
            | closed   | 1 |
            | hopper   | 0 |
        When user navigate to voice channel
        Then verify 'visible' and click on Redial call button
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        And user make a call
        And verify error message displayed when daily maximum tries limit reached
        Then Navigate to Database Manager
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |


    @6769
    Scenario: Power-Preview-Global Max Tries for campaign and Database + Daily max. tries per contact +Recycle
        When clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab
        Then user configure Global Max tries with value '1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        When user navigates to recycle tab and select
            | callOutcome     | Recycle |
            | recycleInterval | 2m      |
            | maxTries        | 3       |
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then user set the contact maximum tries limit
            | dailyContactMaxTries | contactMaxTries |
            | 2                    | 3               |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Recycle' outcome name
        And user logout from Voice Channel
        When Navigate to Database Manager
        When user search and select the '0' database
        Then Validate that the Database has:
            | new      | 0 |
            | recycle  | 1 |
            | callback | 0 |
            | closed   | 0 |
            | hopper   | 0 |
        And let user wait for '300' seconds
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Recycle' outcome name
        Then verify 'visible' and click on Redial call button
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        And user make a call
        And verify error message displayed when daily maximum tries limit reached
        Then Navigate to Database Manager
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |

    @6770
    Scenario: Power-Dial - Global Max Tries for Database + Daily max. tries per contact
        When clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab
        Then user configure Global Max tries with value '0'
        When user navigates to dialer
        Then select the dialer type 'power'
        When user navigates to recycle tab and select
            | callOutcome     | Recycle |
            | recycleInterval | 2m      |
            | maxTries        | 3       |
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then user set the contact maximum tries limit
            | dailyContactMaxTries | contactMaxTries |
            | 2                    | 3               |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user state should be 'talking'
        And let user wait for '3' seconds
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Recycle' outcome name
        And user logout from Voice Channel
        When Navigate to Database Manager
        When user search and select the '0' database
        Then Validate that the Database has:
            | new      | 0 |
            | recycle  | 1 |
            | callback | 0 |
            | closed   | 0 |
            | hopper   | 0 |
        And let user wait for '180' seconds
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user state should be 'talking'
        When user disconnects the call
        And let user wait for '3' seconds
        And user submits 'Call Again Later' outcome and select 'Recycle' outcome name
        Then verify 'visible' and click on Redial call button
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        And user make a call
        And verify error message displayed when daily maximum tries limit reached
        Then Navigate to Database Manager
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |


    @6767
    Scenario: Predictive - Global Max Tries for campaign and Database + Daily max. tries per contact +Recycle
        When clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab
        Then user configure Global Max tries with value '1'
        When user navigates to dialer
        Then select the dialer type 'predictive'
        When user navigates to recycle tab and select
            | callOutcome     | Recycle |
            | recycleInterval | 2m      |
            | maxTries        | 3       |
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then user set the contact maximum tries limit
            | dailyContactMaxTries | contactMaxTries |
            | 2                    | 3               |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user state should be 'talking'
        And let user wait for '3' seconds
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Recycle' outcome name
        And user logout from Voice Channel
        When Navigate to Database Manager
        When user search and select the '0' database
        Then Validate that the Database has:
            | new      | 0 |
            | recycle  | 1 |
            | callback | 0 |
            | closed   | 0 |
            | hopper   | 0 |
        And let user wait for '180' seconds
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user state should be 'talking'
        When user disconnects the call
        And let user wait for '3' seconds
        And user submits 'Call Again Later' outcome and select 'Recycle' outcome name
        Then verify 'visible' and click on Redial call button
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        And user make a call
        And verify error message displayed when daily maximum tries limit reached
        Then Navigate to Database Manager
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |

