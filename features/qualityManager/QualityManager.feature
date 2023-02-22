@qualityManager
Feature: Quality Manager

    Background: Login To the application
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        And delete uuid array
        When user navigate to callbacks manager
        And user delete all scheduled callback
        And clear active parameters

    @6457 @dialTests
    Scenario: Edit Audit - Complete - Outbound
        When user access profile manager menu
        Then user selects 'agent' tab
        And user uncheck masked number checkbox
        And user save the settings
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        Then user create a new script for 'editauditcall'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user logout from Voice Channel
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        Then select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 9899547643           |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |
        Then select call from results list
        When user selects 'Edit' option
        And user fills the script with:
            | oneresponse | No |
            | checks      | No |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 1                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 1                    |
            | phone    | 9899547643           |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |

    @6458
    Scenario: Delete Audit - Complete - Outbound
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        And user create a new script for 'script'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | title | Water with?  |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8929923241' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And User logout with current session
        When User login to the platform as 'admin'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 8929923241           |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |
        Then select call from results list
        And user selects 'Delete' option
        Then verify that the state of audit is 'not audited'
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     |            |
            | phone    | 8929923241 |
            | agent    | Agent One  |
            | fAuditor |            |
            | lAuditor |            |
            | state    |            |

    @6456
    Scenario: Audit Call - 2 auditors - Outbound
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        And user create a new script for 'qualitymanager'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        And user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | title | Water with?  |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      |     |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending   |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent One |
            | note     | 2         |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 2          |
            | phone    | 8094217411 |
            | agent    | Agent One  |
            | fAuditor | Agent One  |
            | lAuditor | Agent One  |
            | state    | pending    |
        And User logout with current session
        When User login to the platform as 'Agent_2'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'pending'
        And user selects 'Edit' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      | No  |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete  |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent Two |
            | note     | 2         |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 2          |
            | phone    | 8094217411 |
            | agent    | Agent One  |
            | fAuditor | Agent One  |
            | lAuditor | Agent Two  |
            | state    | complete   |

    @6497
    Scenario: Audit - Bulk action (with required fields) - Outbound
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        Then Access the Quality Manager menu
        Then user access the Quality Script builder menu
        And user create a new script for 'qualitymanager'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        And mark values as required
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        And mark values as required
        Then user configure the checks items with following configurations:
            | title | Do you like? |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '7823468723' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending   |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent One |
            | note     | 3         |
        When user selects 'Back' option
        When user navigate to voice channel
        When user dial the number '8723648726' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse |     |
            | checks      | Yes |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending   |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent One |
            | note     | 2         |
        When user selects 'Back' option
        Then User select '2' of the 'calls' 'pending' from list
        And select complete audit of multiple selected calls and verify 'error'
        And select call from results list
        When user selects 'Edit' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      |     |
        And user selects 'Pending' option
        When user selects 'Back' option
        And select complete audit of multiple selected calls and verify 'success'
        And select call from results list
        Then verify that the state of audit is 'complete'

    @6447 @dialTests
    Scenario: Audit call - complete
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        And user create a new script for 'scriptQuality_21'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        And  configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        And user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        Then user select 'checks' element
        And user configure the checks items with following configurations:
            | title | water with?  |
            | value | Yes,Kinda,No |
        Then user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | note     | 3                    |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 8094217411           |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |

    @6454 @dialTests
    Scenario: Audit call - pending
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        And user create a new script for 'scriptQuality_21'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        And  configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        And user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        Then user select 'checks' element
        And user configure the checks items with following configurations:
            | title | water with?  |
            | value | Yes,Kinda,No |
        Then user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      |     |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | note     | 2                    |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 2                    |
            | phone    | 8094217411           |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | pending              |

    @6496 @dialTests
    Scenario: Audit - Bulk action (without required fields) - Outbound
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        Then user create a new script for 'bulkaction'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And  user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        Then select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        When user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 9899547643           |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | pending              |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user logout from Voice Channel
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        Then select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        When user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 989954764            |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | pending              |
        Then User select '2' of the 'calls' 'pending' from list
        And select complete audit of multiple selected calls and verify 'success'
        And select call from results list
        Then verify that the state of audit is 'complete'

    @6495 @dialTests
    Scenario: Audit with multiple scripts - Outbound
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user activates 'campaign' call recording to 'Always'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        And user create a new script for 'qualitymanager_script1'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        And user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | title | Water with?  |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And user create a new script for 'qualitymanager_script2'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        And user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | title | Water with?  |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And select call from results list
        When user select script 'qualitymanager_script1'
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        When user select script 'qualitymanager_script2'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | No |
            | checks      | No |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 1                    |
        And user get audited date
        When user selects 'Back' option
        And user fills in the following search filters:
            | outbound  | true                 |
            | campaigns | OutboundCampaign_1   |
            | agents    | System Administrator |
            | audit     | audited              |
            | phone     | 8094217411           |
        Then validate multiple calls are audited as per following configurations:
            | row | note | phone      | agent     | fAuditor             | lAuditor             | state    |
            | 1   | 3    | 8094217411 | Agent One | System Administrator | System Administrator | complete |
            | 2   | 1    | 8094217411 | Agent One | System Administrator | System Administrator | complete |

    @6510
    Scenario: Audit Call - Complete - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        When user access the Quality Script builder menu
        And user create a new script for 'auditComplete'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 999888777            |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |

    @6511
    Scenario: Audit Call - Pending - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        When user access the Quality Script builder menu
        And user create a new script for 'auditPending'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      |     |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 2                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 2                    |
            | phone    | 999888777            |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | pending              |

    @6512
    Scenario: Audit Call - 2 auditors - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        When user access the Quality Script builder menu
        And user create a new script for 'multiAudit'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      |     |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending   |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent One |
            | note     | 2         |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 2         |
            | phone    | 999888777 |
            | agent    | Agent One |
            | fAuditor | Agent One |
            | lAuditor | Agent One |
            | state    | pending   |
        And User logout with current session
        When User login to the platform as 'Agent_2'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'pending'
        And user selects 'Edit' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      | No  |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete  |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent Two |
            | note     | 2         |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 2         |
            | phone    | 999888777 |
            | agent    | Agent One |
            | fAuditor | Agent One |
            | lAuditor | Agent Two |
            | state    | complete  |

    @6513
    Scenario: Edit Audit - Complete - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        When user access the Quality Script builder menu
        And user create a new script for 'editAuditComplete'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 999888777            |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |
        Then select call from results list
        When user selects 'Edit' option
        And user fills the script with:
            | oneresponse | No |
            | checks      | No |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 1                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 1                    |
            | phone    | 999888777            |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |

    @6514
    Scenario: Delete Audit - Complete - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        When user access the Quality Script builder menu
        And user create a new script for 'deleteAuditComplete'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     | 3                    |
            | phone    | 999888777            |
            | agent    | Agent One            |
            | fAuditor | System Administrator |
            | lAuditor | System Administrator |
            | state    | complete             |
        Then select call from results list
        When user selects 'Delete' option
        Then verify that the state of audit is 'not audited'
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | note     |           |
            | phone    | 999888777 |
            | agent    | Agent One |
            | fAuditor |           |
            | lAuditor |           |
            | state    |           |

    @6515
    Scenario: Audit with multiple scripts - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        When user access the Quality Script builder menu
        And user create a new script for 'qualitymanager_script1'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        And user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | title | Water with?  |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And user create a new script for 'qualitymanager_script2'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | title | Are you ok? |
            | value | Yes,No      |
        And user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | title | Water with?  |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 9998887771   | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script 'qualitymanager_script1'
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        When user select script 'qualitymanager_script2'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | No |
            | checks      | No |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 1                    |
        And user get audited date
        When user selects 'Back' option
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
            | audit        | audited        |
            | phone        | 9998887771     |
        Then validate multiple calls are audited as per following configurations:
            | row | note | phone      | agent     | fAuditor             | lAuditor             | state    |
            | 1   | 3    | 9998887771 | Agent One | System Administrator | System Administrator | complete |
            | 2   | 1    | 9998887771 | Agent One | System Administrator | System Administrator | complete |

    @6516
    Scenario: Audit - Bulk action (without required fields) - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        When user access the Quality Script builder menu
        Then user create a new script for 'bulkaction'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And  user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When User logout with current session
        And User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        Then select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        When user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        When User logout with current session
        And User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When User logout with current session
        And User login to the platform as 'admin'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        Then select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        When user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then User select '2' of the 'calls' 'pending' from list
        And select complete audit of multiple selected calls and verify 'success'
        And select call from results list
        Then verify that the state of audit is 'complete'

    @6517
    Scenario: Audit - Bulk action (with required fields) - Inbound
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        Then user activates 'queue' call recording to 'Always'
        Then user finish and save inbound queue settings
        Then Access the Quality Manager menu
        Then user access the Quality Script builder menu
        And user create a new script for 'qualitymanager'
            | inboundQueueName | InboundQueue_1 |
            | defaultPageName  | 1              |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        And mark values as required
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        And mark values as required
        Then user configure the checks items with following configurations:
            | title | Do you like? |
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888772    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending   |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent One |
            | note     | 3         |
        When user selects 'Back' option
        When user navigate to voice channel
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888771    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | inbound      | true           |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And select call from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      |     |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending   |
            | fAuditor | Agent One |
            | date     | today     |
            | lAuditor | Agent One |
            | note     | 2         |
        When user selects 'Back' option
        Then User select '2' of the 'calls' 'pending' from list
        And select complete audit of multiple selected calls and verify 'error'
        And select call from results list
        When user selects 'Edit' option
        And user fills the script with:
            | oneresponse |     |
            | checks      | Yes |
        And user selects 'Pending' option
        When user selects 'Back' option
        And select complete audit of multiple selected calls and verify 'success'
        And select call from results list
        Then verify that the state of audit is 'complete'

    @6502
    Scenario: Edit Audit - Complete - Tickets
        When user access the Quality Script builder menu
        Then user create a new script for 'editauditticket'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true          |
            | queue  | TicketQueue_1 |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | complete             |
        Then select ticket from results list
        When user selects 'Edit' option
        And user fills the script with:
            | oneresponse | No |
            | checks      | No |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 1                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | complete             |

    @6501
    Scenario: Audit Ticket - 2 auditors - Tickets
        When user access the Quality Script builder menu
        Then user create a new script for 'qualitymanager_tickets'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true          |
            | queue  | TicketQueue_1 |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | pending              |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true                 |
            | queue  | TicketQueue_1        |
            | agents | System Administrator |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'pending'
        When user selects 'Edit' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      | No  |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | Agent One            |
            | note     | 2                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | Agent One            |
            | state        | complete             |

    @6498
    Scenario: Audit - Complete - Ticket
        When user access the Quality Script builder menu
        Then user create a new script for 'scriptQuality#1'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |

        Then user navigates to Send Email page
        Then User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | myNewSubject2         |
            | to           | gocontact@getnada.com |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true                 |
            | queue  | TicketQueue_1        |
            | agents | System Administrator |
        And user select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table         | ticket               |
            | lEpisodeAgent | System Administrator |
            | lAuditor      | System Administrator |
            | fAuditor      | System Administrator |
            | state         | complete             |

    @6500
    Scenario: Audit - pending - Ticket
        When user access the Quality Script builder menu
        Then user create a new script for 'scriptQuality#1'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        Then user navigates to Send Email page
        Then User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | myNewSubject2         |
            | to           | gocontact@getnada.com |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        Then Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true                 |
            | queue  | TicketQueue_1        |
            | agents | System Administrator |
        And user select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        When user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table         | ticket               |
            | lEpisodeAgent | System Administrator |
            | lAuditor      | System Administrator |
            | fAuditor      | System Administrator |
            | state         | pending              |

    @6503
    Scenario: Delete Audit - Complete - Tickets
        When user access the Quality Script builder menu
        Then user create a new script for 'ticket'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true          |
            | queue  | TicketQueue_1 |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | complete             |
        Then select ticket from results list
        When user selects 'Delete' option
        Then verify that the state of audit is 'not audited'
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     |                      |
            | lAuditor     |                      |
            | state        |                      |

    @6505
    Scenario: Audit with multiple scripts - Tickets
        When user access the Quality Script builder menu
        Then user create a new script for 'qualitymanager_script1'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        Then user create a new script for 'qualitymanager_script2'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true          |
            | queue  | TicketQueue_1 |
        Then select ticket from results list
        When user select script 'qualitymanager_script1'
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        When user select script 'qualitymanager_script2'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | No |
            | checks      | No |
        And user selects 'Complete' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | complete             |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 1                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | complete             |

    @6506
    Scenario: Audit - Bulk action (without required fields) - Tickets
        When user access the Quality Script builder menu
        Then user create a new script for 'bulkticketaudit'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        And user logout of ticket channel
        And refresh the page
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true          |
            | queue  | TicketQueue_1 |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | pending              |
        When user navigates to Send Email page
        And reset new subject
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true                 |
            | queue  | TicketQueue_1        |
            | agents | System Administrator |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | pending              |
        Then User select '2' of the 'tickets' 'pending' from list
        And select complete audit of multiple selected calls and verify 'success'
        And select ticket from results list
        Then verify that the state of audit is 'complete'

    @6507
    Scenario: Audit - Bulk action (with required fields) - Tickets
        When user access the Quality Script builder menu
        Then user create a new script for 'bulkticketaudit'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        And mark values as required
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        And mark values as required
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        When user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        And user logout of ticket channel
        And refresh the page
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true          |
            | queue  | TicketQueue_1 |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse | Yes   |
            | checks      | Kinda |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 3                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | pending              |
        When user navigates to Send Email page
        And reset new subject
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | sendEmailSubject      |
            | to           | gocontact@getnada.com |
            | cc           |                       |
            | bcc          |                       |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        Then User opens ticket from tickets list
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        When Access the Quality Manager menu
        And user fills in the following search filters:
            | ticket | true                 |
            | queue  | TicketQueue_1        |
            | agents | System Administrator |
        Then select ticket from results list
        When user select script
        Then verify that the state of audit is 'not audited'
        When user selects 'Start' option
        And user fills the script with:
            | oneresponse |     |
            | checks      | Yes |
        And user selects 'Pending' option
        Then Validate the data referring to the audit are correctly filled as
            | state    | pending              |
            | fAuditor | System Administrator |
            | date     | today                |
            | lAuditor | System Administrator |
            | note     | 2                    |
        And user selects 'Back' option
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket               |
            | episodeAgent | System Administrator |
            | fAuditor     | System Administrator |
            | lAuditor     | System Administrator |
            | state        | pending              |
        Then User select '2' of the 'tickets' 'pending' from list
        And select complete audit of multiple selected calls and verify 'error'
        And select ticket from results list
        When user selects 'Edit' option
        And user fills the script with:
            | oneresponse | Yes |
            | checks      |     |
        And user selects 'Pending' option
        When user selects 'Back' option
        And select complete audit of multiple selected calls and verify 'success'
        And select ticket from results list
        Then verify that the state of audit is 'complete'

    @6703
    Scenario: Audit Ticket - Without agent interaction
        When user access the Quality Script builder menu
        Then user create a new script for 'withoutagentinteraction'
            | ticketQueueName | TicketQueue_1 |
            | defaultPageName | 1             |
        When user adds 2 elements 'oneresponse' and 'checks' to the script
        And select the 'oneresponse' element
        Then configure the oneresponse items with following configurations:
            | value | Yes,No |
        When user select the 'oneresponse' and assign following points
            | yes | 2 |
            | no  | 1 |
        And select the 'checks' element
        Then user configure the checks items with following configurations:
            | value | Yes,Kinda,No |
        And user select the 'checks' and assign following points
            | yes   | 2 |
            | kinda | 1 |
            | no    | 0 |
        Then Send email with subject as 'random'
        And Access the Quality Manager menu
        And refresh the page
        When user fills in the following search filters:
            | ticket | true          |
            | queue  | TicketQueue_1 |
            | agents | no            |
        And user search the ticket table by 'subject'
        Then Validate the table that all data relating to the audit are correctly filled as
            | table        | ticket |
            | episodeAgent |        |
            | subject      | true   |
        When select ticket from results list
        Then verify error message is displayed 'You can\'t audit tickets without being worked by an agent.'
