@dialerControl
Feature: Dialer Control

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        And let user reset the database
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to 'General Settings' tab
        Then user configure Global Max tries with value '0'
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And clear all active filters
        And clear all hopper preview data
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'

    @6251
    Scenario: Database with associated Agent/Group - Exclusive Mode - Agent Available
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'exclusive'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And user state should be 'talking' in 'second' window
        And let user wait for '5' seconds
        When user disconnects the call in 'second' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'second' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound         |
            | campaigns | outboundCampaign |
            | agents    | Agent One        |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @6250
    Scenario: Database with associated Agent/Group - Preferred Mode - Agent Unavailable
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user dial the number '9287429383' in ready state in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        And Navigate to Database Manager
        Then Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'preferred'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        And user state should be 'talking' in 'third' window
        And let user wait for '5' seconds
        When user disconnects the call in 'third' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'third' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound         |
            | campaigns | outboundCampaign |
            | agents    | Agent Two        |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Agent_2            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @6249
    Scenario: Database with associated Agent/Group - Preferred Mode - Agent Available
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'preferred'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And let user wait for '5' seconds
        And user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'second' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound         |
            | campaigns | outboundCampaign |
            | agents    | Agent One        |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @6252
    Scenario: Database with associated Agent/Group - Exclusive Mode - Agent Unavailable
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user dial the number '9287429383' in ready state in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        And Navigate to Database Manager
        Then Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'exclusive'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'third' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound         |
            | campaigns | outboundCampaign |
            | agents    | no               |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Dialer             |
            | callOutcome | Drop               |
            | owner       | OutboundCampaign_1 |
            | termReason  | DIALER             |
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @6564
    Scenario: Filter by Time of day
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue | browseFile              | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            |       | fixtures/DB_GO-6564.csv | 10                   | 1                | 0          | 1            | 2           | 3            | 4          |
        And let user wait for '3' seconds
        Then load the database
            | queue | browseFile              | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            |       | fixtures/DB_GO-6564.csv | 10                   | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And update field to order by 'contact' with direction 'desc'
        When user creates the filter with following information:
            | field       | group         | filterType | startTime | endTime | filterData |
            | Time of day | System fields |            | 00:00     | 23:59   |            |
            | City        | System fields | Equal to   |           |         | Lisboa     |
            | 1st phone   | System fields | Started by |           |         | 1          |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name    | phone  | email         | postalCode | city   |
            | Liliana | 193111 | l@gocontat.pt | 3333       | Lisboa |
            | Ana 1   | 191112 | a@gocontat.pt | 9999       | Lisboa |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name    | phone  | email         | postal | city   | outcomeGroup     | outcome |
            | Liliana | 193111 | l@gocontat.pt | 3333   | Lisboa | Call Again Later | Ok      |
            | Ana 1   | 191112 | a@gocontat.pt | 9999   | Lisboa | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile              | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GO-6564.csv | 10                   | 1                | 0          | 1            | 2           | 3            | 4          |

    @6364
    Scenario: Negational operators - text/expressions not started by
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6364.csv | 1                | 0          | 1            | 2           | 3            | 4          |
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6364.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        When user creates the filter with following information:
            | field     | group | filterType     | startTime | endTime | filterData |
            | 1st phone |       | Not started by |           |         | 1          |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name | phone | email         | postalCode | city   |
            | Rita | 92111 | r@gocontat.pt | 2222       | Aveiro |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name | phone | email         | postal | city   | outcomeGroup     | outcome |
            | Rita | 92111 | r@gocontat.pt | 2222   | Aveiro | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6364.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |

    @6386
    Scenario: Negational operators - text/expressions different from
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6386.csv | 1                | 0          | 1            | 2           | 3            | 4          |
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6386.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        When user creates the filter with following information:
            | field     | group | filterType     | startTime | endTime | filterData |
            | 1st phone |       | Different from |           |         | 193111     |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name | phone | email         | postalCode | city   |
            | Rita | 92111 | r@gocontat.pt | 2222       | Aveiro |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name | phone | email         | postal | city   | outcomeGroup     | outcome |
            | Rita | 92111 | r@gocontat.pt | 2222   | Aveiro | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6386.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |

    @6387
    Scenario: Negational operators - text/expressions not containing
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6387.csv | 1                | 0          | 1            | 2           | 3            | 4          |
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6387.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        When user creates the filter with following information:
            | field     | group | filterType     | startTime | endTime | filterData |
            | 1st phone |       | Not containing |           |         | 2          |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name    | phone  | email         | postalCode | city   |
            | Liliana | 193111 | l@gocontat.pt | 3333       | Lisboa |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name    | phone  | email         | postal | city   | outcomeGroup     | outcome |
            | Liliana | 193111 | l@gocontat.pt | 3333   | Lisboa | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6387.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |

    @6629
    Scenario: Calls out of defined time of the day
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue | browseFile              | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            |       | fixtures/DB_GO-6629.csv | 3                    | 1                | 0          | 1            | 2           | 3            | 4          |
        And let user wait for '3' seconds
        Then load the database
            | queue | browseFile              | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            |       | fixtures/DB_GO-6629.csv | 3                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And update field to order by 'contact' with direction 'desc'
        When user creates the filter with following information:
            | field       | group         | filterType | startTime | endTime | filterData |
            | City        | System fields | Equal to   |           |         | Lisboa     |
            | Time of day | System fields |            | 00:00     | 00:01   |            |
        And user add new group
        When user creates the filter with following information:
            | field | group         | filterType     | startTime | endTime | filterData |
            | City  | System fields | Different from |           |         | Lisboa     |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name | phone | email         | postalCode | city   |
            | Rita | 92111 | r@gocontat.pt | 2222       | Aveiro |
            | Ana  | 91111 | a@gocontat.pt | 1111       | Guarda |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name | phone | email         | postal | city   | outcomeGroup     | outcome |
            | Rita | 92111 | r@gocontat.pt | 2222   | Aveiro | Call Again Later | Ok      |
            | Ana  | 91111 | a@gocontat.pt | 1111   | Guarda | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile              | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GO-6629.csv | 3                    | 1                | 0          | 1            | 2           | 3            | 4          |

    @6388
    Scenario: Negational operators - text/expressions not ended by
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6388.csv | 1                | 0          | 1            | 2           | 3            | 4          |
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6388.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        When user creates the filter with following information:
            | field     | group | filterType   | startTime | endTime | filterData |
            | 1st phone |       | Not ended by |           |         | 2          |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name    | phone  | email         | postalCode | city   |
            | Liliana | 193111 | l@gocontat.pt | 3333       | Lisboa |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name    | phone  | email         | postal | city   | outcomeGroup     | outcome |
            | Liliana | 193111 | l@gocontat.pt | 3333   | Lisboa | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6388.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |

    @6389
    Scenario: Negational operators - text/expressions Before
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6389.csv | 1                | 0          | 1            | 2           | 3            | 4          |
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6389.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        When user creates the filter with following information:
            | field        | group | filterType | startTime | endTime | filterData |
            | Contact Name |       | Before     |           |         | Rita       |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name   | phone | email         | postalCode | city   |
            | 01Rita | 92112 | r@gocontat.pt | 2222       | Aveiro |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name   | phone | email         | postal | city   | outcomeGroup     | outcome |
            | 01Rita | 92112 | r@gocontat.pt | 2222   | Aveiro | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6389.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |

    @6390
    Scenario: Negational operators - text/expressions After
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6390.csv | 1                | 0          | 1            | 2           | 3            | 4          |
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6390.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And update field to order by 'contact' with direction 'asc'
        When user creates the filter with following information:
            | field        | group | filterType | startTime | endTime | filterData |
            | Contact Name |       | After      |           |         | 01         |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name   | phone  | email         | postalCode | city   |
            | 01Rita | 92112  | r@gocontat.pt | 2222       | Aveiro |
            | Rita   | 193111 | l@gocontat.pt | 3333       | Lisboa |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name   | phone  | email         | postal | city   | outcomeGroup     | outcome |
            | 01Rita | 92112  | r@gocontat.pt | 2222   | Aveiro | Call Again Later | Ok      |
            | Rita   | 193111 | l@gocontat.pt | 3333   | Lisboa | Call Again Later | Ok      |
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity |
            | fixtures/DB_GOTEST-6390.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          |

    @6341
    Scenario: Filters type operators - Greater than filter operator
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When user navigates to Template Contact Fields submenu
        Then user deletes the 'all' template
        And user creates new template with following steps:
            | fieldName | Field_1            |
            | campaign  | OutboundCampaign_1 |
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity | optionField |
            | fixtures/DB_GOTEST-6341.csv | 1                | 0          | 1            | 2           | 3            | 4          | 5           |
        And let user wait for '3' seconds
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity | optionField |
            | fixtures/DB_GOTEST-6341.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          | 5           |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And update field to order by 'contact' with direction 'desc'
        When user creates the filter with following information:
            | field   | group                 | filterType   | startTime | endTime | filterData |
            | Field_1 | Extra template fields | Greater than |           |         | 200        |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name  | phone | email         | postalCode | city   | Field_1 |
            | Rita1 | 92112 | r@gocontat.pt | 2222       | Aveiro | 500     |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name  | phone | email         | postal | city   | outcomeGroup     | outcome | Field_1 |
            | Rita1 | 92112 | r@gocontat.pt | 2222   | Aveiro | Call Again Later | Ok      | 500     |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And clear all active filters
        And clear all hopper preview data
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity | optionField |
            | fixtures/DB_GOTEST-6341.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          | 5           |

    @6351
    Scenario: Filters type operators - Less than filter operator
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When user navigates to Template Contact Fields submenu
        Then user deletes the 'all' template
        And user creates new template with following steps:
            | fieldName | Field_1            |
            | campaign  | OutboundCampaign_1 |
        When Navigate to Database Manager
        And Create Database
            | browseFile                  | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity | optionField |
            | fixtures/DB_GOTEST-6351.csv | 1                | 0          | 1            | 2           | 3            | 4          | 5           |
        And let user wait for '3' seconds
        Then load the database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity | optionField |
            | fixtures/DB_GOTEST-6351.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          | 5           |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And update field to order by 'contact' with direction 'desc'
        When user creates the filter with following information:
            | field   | group                 | filterType | startTime | endTime | filterData |
            | Field_1 | Extra template fields | Less than  |           |         | 200        |
        Then user selects the Apply button
        When verify the hopper table preview with following information:
            | name  | phone  | email         | postalCode | city   | Field_1 |
            | Rita2 | 193111 | l@gocontat.pt | 3333       | Lisboa | 100     |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then validate triggered contact with following information:
            | name  | phone  | email         | postal | city   | outcomeGroup     | outcome | Field_1 |
            | Rita2 | 193111 | l@gocontat.pt | 3333   | Lisboa | Call Again Later | Ok      | 100     |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And clear all active filters
        And clear all hopper preview data
        When Navigate to Database Manager
        And Delete the Database
            | browseFile                  | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | optionEmail | optionPostal | optionCity | optionField |
            | fixtures/DB_GOTEST-6351.csv | 2                    | 1                | 0          | 1            | 2           | 3            | 4          | 5           |