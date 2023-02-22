@voiceChannel
Feature: Voice Channel

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        And delete uuid array
        When user navigate to callbacks manager
        And user delete all scheduled callback

    @734 @dialTests
    Scenario: Call - Disconnected at source
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094217411         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @735
    Scenario: Call - Hangup at destination
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000003' in ready state
        And user make a call
        And user state should be 'talking'
        And let user wait for '10' seconds
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000003          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | REMOTE             |

    @736 @dialTests
    Scenario: Remote call transfer
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And select the Call Transfer 'on'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And user click on transfer call button
        And user select the 'remote' transfer option
        And user mute the original call
        And user make a remote transfer of call to number '8888888888'
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | TRANSFER           |
        Then verify transfer history of call:
            | contactNo | 8888888888 |

    @737 @dialTests
    Scenario: Ivr call transfer
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And user click on transfer call button
        And user select the 'ivr' transfer option
        And user transfers call to ivr
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | TRANSFER           |

    @741
    Scenario: Dialer - Power Preview
        And let user reset the database
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
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then verify all the contacts '910261828' loaded are triggered by the dialer 'dialer-preview'
        And user state should be 'talking'
        And let user wait for '3' seconds
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @742
    Scenario: Dialer - Power Dial
        And let user reset the database
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user state should be 'talking'
        And let user wait for '3' seconds
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @743
    Scenario: Dialer - Predictive
        And let user reset the database
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'predictive'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And let user wait for '5' seconds
        And user state should be 'talking'
        And let user wait for '3' seconds
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Delete the Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/database.csv | 1                | 0          | 1            | 0             |

    @746 @dialTests
    Scenario: Warning - Average Talking Time
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And select the Warning Average Talking Time '15'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        And let user wait for '15' seconds
        Then voice alert 'Average Talk Time exceeded!' display
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094217411         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @747
    Scenario: Warning - Hold Time
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then set 'Warning Hold Time' to '15' sec
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094218723' in ready state
        And user make a call
        And user selects the call on 'hold' button
        Then user gets the 'hold' warning after '15' seconds
        And user selects the call on 'unhold' button
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094218723         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @749 @dialTests
    Scenario: Call - Global Callback
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to callOutcome
        Then check if outcome 'Callback' exist
        When user navigates to dialer
        And select the Preview Dial Timeout '0'
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | global           |
            | agent   |                  |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        And let user wait for '360' seconds
        When user navigate to voice channel
        And user state should be 'dialer-preview'
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094217411         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @750 @dialTests
    Scenario: Call - Personal Callback - Allow
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And select the Personal Callback '1'
        When user navigates to callOutcome
        Then check if outcome 'Callback' exist
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | personal         |
            | agent   |                  |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When user navigate to voice channel
        And select the callback tab in 'same' window
        Then validate the scheduled callback in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094217411         |
            | agentName   | admin              |
            | callOutcome | Callback           |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @756 @dialTests
    Scenario: Call - Call Transfer (On)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And select the Call Transfer 'on'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        Then call transfer icon 'should' be visible
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094217411         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @757 @dialTests
    Scenario: Call - Call Transfer (Off)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And select the Call Transfer 'off'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        Then call transfer icon 'should not' be visible
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094217411         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @758 @dialTests
    Scenario: Call - Allow DTMF (On)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user toggle 'on' the allow dtmf button
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        Then dtmf icon 'should' be visible
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @759 @dialTests
    Scenario: Call - Allow DTMF (Off)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user toggle 'off' the allow dtmf button
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        Then dtmf icon 'should not' be visible
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @760 @dialTests
    Scenario: Call - Redial(On)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then Set the toggle 'on' for redial attribute
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then verify 'visible' and click on Redial call button
        And user make a call
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel         | Outbound           |
            | campaigns       | OutboundCampaign_1 |
            | Start Call Date | Call End Data      |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | admin              |
            | Call Length |                    |
            | Talk Time   |                    |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | Sub-Type    | redial             |

    @761 @dialTests
    Scenario: Call - Redial(Off)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then Set the toggle 'off' for redial attribute
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then verify 'not visible' and click on Redial call button
        When user navigate to crm
        And user search the call by using following configurations:
            | channel         | Outbound           |
            | campaigns       | OutboundCampaign_1 |
            | Start Call Date | Call End Data      |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | admin              |
            | Call Length |                    |
            | Talk Time   |                    |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | Sub-Type    | Manual             |

    @762
    Scenario: Call - Max Wrap-Up
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And toggle 'on' the 'max' Wrap Up Time
        Then user set 'max' Wrap Up Time '10' sec
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094212674' in ready state
        And user make a call
        Then user disconnects the call
        And user state should be 'outcomes'
        And user gets the 'max' Wrap-Up notification
        Then user validate 'Call Again Later' 'max' Wrap-Up time of '10' sec exceeds with 'auto' outcome 'any'
        And user state should be 'ready'
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094212674         |
            | agentName   | admin              |
            | callOutcome | Auto Wrap Up       |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And toggle 'off' the 'max' Wrap Up Time
        Then user finish the campaign editing

    @763
    Scenario: Call - Min Wrap-Up
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And toggle 'on' the 'min' Wrap Up Time
        Then user set 'min' Wrap Up Time '10' sec
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094212674' in ready state
        And user make a call
        Then user disconnects the call
        And user state should be 'outcomes'
        Then user validate 'Call Again Later' 'min' Wrap-Up time of '10' sec exceeds with 'disabled' outcome 'Ok'
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8094212674         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And toggle 'off' the 'min' Wrap Up Time
        Then user finish the campaign editing

    @764 @dialTests
    Scenario: Call Recycle
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to callOutcome
        Then check if outcome 'Recycle' exist
        When user navigates to recycle tab and select
            | callOutcome     | Recycle |
            | recycleInterval | 2m      |
            | maxTries        | 10      |
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And change the priority of the dialer to 'recycle'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Recycle' outcome name
        And user logout from Voice Channel
        And let user wait for '340' seconds
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        Then select the preview option
        And validate call outcome is 'recycle' for phoneNumber '9899547643'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And let user wait for '5' seconds
        And validate the 'Recycle' origin
        And user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 9899547643         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @5857
    Scenario: Call - Manual Call to a unallocated number
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '999999999' in ready state
        And user make a call
        Then call hangup message 'An error was found, please try again. (Error Code: -ERR UNALLOCATED_NUMBER'
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999999999          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | CANCEL             |

    @5862
    Scenario: Call - Manual Call and client no answer
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000001' in ready state
        And user make a call
        And let user wait for '5' seconds
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000001          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | REMOTE             |

    @5863
    Scenario: Call - Manual Call and client reject
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000001' in ready state
        And user make a call
        And user state should be 'ringing'
        Then call hangup message 'The dialed number was busy.'
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000001          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | REMOTE             |

    @5864
    Scenario: No Answer by agent
        Given login to Voice Channel with '103' extension
        And user selects 'OutboundCampaign_1' campaign
        And verify SIP extension warning with message "This extension wasn't found on the server."

    @5865
    Scenario: Agent not registered
        Given login to Voice Channel with '102' extension
        And user selects 'OutboundCampaign_1' campaign
        And verify SIP extension warning with message "This extension wasn't found on the server."

    @5866
    Scenario: Agent reject the call
        Given login to Voice Channel with '101' extension
        And user selects 'OutboundCampaign_1' campaign
        And verify SIP extension warning with message "This extension wasn't found on the server."

    @5097 @dialTests
    Scenario: Call Outcome Block
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to callOutcome
        Then check if outcome 'Block' exist
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Block' outcome name
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 9899547643         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        And validate the contact outcome 'Block' appear in contact info

    @6202
    Scenario: Outcome Blacklist - Add contact to Blacklist
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And Create New Table
            | browseFile             | noOfRecord |
            | fixtures/blacklist.csv | 0          |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And user navigates to Outcomes
        Then add a new Outcome in campaign:
            | name        | attributes | group            | table_column | campaignName       |
            | Blacklist#1 | Blacklist  | Call Again Later | phone        | OutboundCampaign_1 |
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '827623423' in ready state
        And user make a call
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Blacklist#1' outcome name
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And search the table with name as 'random'
            | browseFile             | noOfRecord |
            | fixtures/blacklist.csv | 0          |
        And verify table active state is 'disabled'
        Then Download the Table
        And verify the 'random' csv data contains '827623423'

    @6203
    Scenario: Outcome Blacklist - Power Dial Campaign - Contacts in Blacklist
        And let user reset the database
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And Create New Table
            | browseFile             | noOfRecord |
            | fixtures/blacklist.csv | 0          |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power'
        And user navigates to Outcomes
        Then add a new Outcome in campaign:
            | name        | attributes | group            | table_column | campaignName       |
            | Blacklist#1 | Blacklist  | Call Again Later | phone        | OutboundCampaign_1 |
        And save the changes in edit campaign
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And user edits the blacklists with 'phone' column
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '998877445' in ready state
        And user make a call
        And let user wait for '3' seconds
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Blacklist#1' outcome name
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile                       | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/blacklistedDatabase.csv | 0                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile                       | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/blacklistedDatabase.csv | 0                    | 1                | 0          | 1            |
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_1 |
            | searchType | Contact            |
            | database   | 0                  |
            | agents     | no                 |
        And validate that the call is registered:
            | phoneNumber | 998877445   |
            | callOutcome | Blacklisted |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And user edits the blacklists with '0' column
        Then Navigate to Database Manager
        And Delete the Database
            | browseFile                       | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/blacklistedDatabase.csv | 1                | 0          | 1            | 0             |

    @6204
    Scenario: Outcome Blacklist - Power Preview Campaign - Contacts in Blacklist
        And let user reset the database
        When Navigate to Database Manager
        When Switch Tab to Table Manager
        Then Create New Table
            | browseFile             | noOfRecord |
            | fixtures/blacklist.csv | 0          |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And user navigates to Outcomes
        Then add a new Outcome in campaign:
            | name        | attributes | group            | table_column | campaignName       |
            | Blacklist#1 | Blacklist  | Call Again Later | phone        | OutboundCampaign_1 |
        And save the changes in edit campaign
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And user edits the blacklists with 'phone' column
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '998877445' in ready state
        And user make a call
        And let user wait for '3' seconds
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Blacklist#1' outcome name
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile                       | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/blacklistedDatabase.csv | 0                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile                       | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/blacklistedDatabase.csv | 0                    | 1                | 0          | 1            |
        When user navigate to crm
        And user search the call by using following configurations:
            | channel    | Outbound           |
            | campaigns  | OutboundCampaign_1 |
            | searchType | Contact            |
            | database   | 0                  |
            | agents     | no                 |
        And validate that the call is registered:
            | phoneNumber | 998877445   |
            | callOutcome | Blacklisted |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And user edits the blacklists with '0' column
        Then Navigate to Database Manager
        And Delete the Database
            | browseFile                       | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | fixtures/blacklistedDatabase.csv | 1                | 0          | 1            | 0             |

    @6256 @dialTests
    Scenario: Outbound - After Call Action - Logout
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8929923241' in ready state
        And user make a call
        And user state should be 'talking'
        And user navigates to Outbound and select 'None' campaign
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user validate Voice Channel should be 'Offline'
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 8929923241         |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |

    @738 @dialTests
    Scenario: Call - Transfer to Queues (Assisted Transfer)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And select the Call Transfer 'on'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And user login to the platform with 'Agent_2' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_1' queue in 'second' window
        And I re-login using 'Agent_3' account
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And let user wait for '3' seconds
        And user click on transfer call button
        And user select the 'queue' transfer option
        And user mute the call
        And user transfers call to 'InboundQueue_1' queue
        And user makes 'Assisted Transfer' of call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user state should be 'talking' in 'second' window
        And let user wait for '3' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel | Inbound   |
            | agents  | Agent Two |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | Agent_3            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | TRANSFER           |
        And close the 'second' window session

    @739 @dialTests
    Scenario: Call - Transfer to Queues (Blind Transfer)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And user login to the platform with 'Agent_2' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_1' queue in 'second' window
        And I re-login using 'Agent_1' account
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And user click on transfer call button
        And user select the 'queue' transfer option
        And user transfers call to 'InboundQueue_1' queue
        And user makes 'Blind Transfer' of call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user state should be 'talking' in 'second' window
        And let user wait for '3' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel | Inbound   |
            | agents  | Agent Two |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 990000004          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | TRANSFER           |
        And close the 'second' window session

    @6297 @dialTests
    Scenario: Agent control call after refresh - Outbound call - Hang up button
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And refresh the page
        And let user wait for '5' seconds
        Then user voice channel modal should be visible
        When user click on 'hang up' button
        And call hangup message 'Your session in GoContact was resumed.'
        Then verify profile page is displayed

    @6299 @dialTests
    Scenario: Agent control call after refresh - Outbound call- Resume call / Place on hold button
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And user selects the call on 'hold' button
        And refresh the page
        And let user wait for '5' seconds
        Then user voice channel modal should be visible
        When user click on 'resume call' button
        Then user voice channel modal should be visible
        When user click on 'place on hold' button
        When user click on 'hang up' button
        And call hangup message 'Your session in GoContact was resumed.'
        Then verify profile page is displayed

    @2291
    Scenario: Unable to search for closed contacts (lead_status = closed): Power-preview calls
        When user delete the stored database
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user activates suboption 'Ignore closed contacts in search' in the 'Lead Searching' option
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | browseFile                | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database2291.csv | 2                    | 1                | 0          | 1            |
        Then load the database
            | browseFile                | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 | recycle | callback | closed | hopper |
            | fixtures/database2291.csv | 2                    | 1                | 0          | 1            | 0       | 0        | 0      | 0      |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then verify all the contacts '910261828' loaded are triggered by the dialer 'dialer-preview'
        And user state should be 'talking'
        And let user wait for '3' seconds
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user login to the platform with 'Agent_1' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with '' queue in 'second' window
        Then user clicks on search tab in 'second' window
        And search for closed contacts '910261828' in 'second' window
        When user dial the number '8094217411' in ready state in 'second' window
        And user state should be 'manual-preview' in 'second' window
        And validate customer record 'Surbhi Gupta' loaded in 'second' window
        Then user clicks on search tab in 'second' window
        Then user selects 'All contacts' button in 'second' window
        And search for closed contacts '910261828' in 'second' window
        Then user selects 'Similar contacts' button in 'second' window
        And search for closed contacts '910261828' in similar contacts in 'second' window
        And close the 'second' window session