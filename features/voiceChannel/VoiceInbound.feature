@voiceInbound
Feature: Voice Inbound

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        And delete uuid array
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        Then user select the current day of the week and queue 'reset'
        And user navigates to 'Actions' tab
        Then reset queue actions
        And user finish and save inbound queue settings

    @801
    Scenario: Call - No Logged Agents - Action - Voicemail
        When user navigates to voice manager
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Voice Mail       |
            | addActions        | true             |
            | audio             | new-call.wav     |
        Then user finish and save inbound queue settings
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And User logout with current session
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 124124124    | 1        |
        And let user wait for '5' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 124124124    | 1    | 0         |
        And let user wait for '5' seconds
        And client Hangup the '0' call via API
        When User login to the platform as 'admin'
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 124124124          |
            | agentName   | inbound-queue      |
            | callOutcome | Press to Voicemail |
            | owner       | InboundQueue_1     |
            | termReason  | PRESS_TO_VOICEMAIL |
            | subtype     | voicemail          |
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And select voicemail Tab
        And validate voicemail data is as following:
            | number | 124124124      |
            | queue  | InboundQueue_1 |
        And select the voicemail
        And user makes call to voicemail contact
        And user make a call
        And user state should be 'talking'
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        Then validate that the call is registered as per following configurations:
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | subtype     | voicemail          |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Hangup           |
        Then user finish and save inbound queue settings
        Then clear uuid history

    @768
    Scenario: Inbound Call - Hang up at origin - client side
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '3' seconds
        Then user state should be 'talking'
        And client Hangup the '0' call via API
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | REMOTE         |
        Then clear uuid history

    @769
    Scenario: Inbound Call - Hang up  - agent side
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
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
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |

    @773
    Scenario: Call - Transfer to Queues (Blind Transfer)
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And I re-login using 'Agent_1' account
        And login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        And user login to the platform with 'Agent_2' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_2' queue in 'second' window
        And user switch to main tab
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '1' seconds
        And user state should be 'talking'
        And let user wait for '3' seconds
        And user click on transfer call button
        And user select the 'queue' transfer option
        And user transfers call to 'InboundQueue_2' queue
        And user makes 'Blind Transfer' of call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        And user state should be 'talking' in 'second' window
        And let user wait for '3' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | calls        | true           |
            | agents       | Agent One      |
        Then validate multiple calls are registered as per following configurations:
            | row | phoneNumber | agentName | callOutcome | owner          | termReason | subtype |
            | 1   | 999888777   | Agent_1   | Ok          | InboundQueue_1 | TRANSFER   |         |
            | 2   | 999888777   | Agent_2   | Ok          | InboundQueue_2 | AGENT      |         |
        Then validate the Assisted Transfer info:
            | row | destination    | agent | result         |
            | 1   | InboundQueue_2 |       | BLIND TRANSFER |
            | 2   | InboundQueue_2 |       | BLIND TRANSFER |
        And close the 'second' window session

    @771
    Scenario: Call - Transfer to IVR
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999999900    | 1        |
        And let user wait for '5' seconds
        And user click on transfer call button
        And user select the 'ivr' transfer option
        And user transfers call to ivr
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999999900      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | TRANSFER       |

    @772
    Scenario: Call - Transfer to Queues (Assisted Transfer)
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And I re-login using 'Agent_1' account
        And login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        And user login to the platform with 'Agent_2' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_2' queue in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999999900    | 1        |
        And let user wait for '3' seconds
        And user click on transfer call button
        And user select the 'queue' transfer option
        And user mute the call
        And user transfers call to 'InboundQueue_2' queue
        And user makes 'Assisted Transfer' of call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        And user state should be 'talking' in 'second' window
        And let user wait for '3' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel | Inbound   |
            | agents  | Agent One |
        Then validate multiple calls are registered as per following configurations:
            | row | phoneNumber | agentName | callOutcome | owner          | termReason | subtype                       |
            | 1   | 999999900   | Agent_1   | Ok          | InboundQueue_1 | TRANSFER   | assisted-transfer-original    |
            | 2   | 999999900   | Agent_2   | Ok          | InboundQueue_2 | AGENT      | assisted-transfer-destination |
        Then validate the Assisted Transfer info:
            | row | destination    | agent   | result            |
            | 1   | InboundQueue_2 | Agent_2 | ASSISTED TRANSFER |
            | 2   | InboundQueue_2 | Agent_2 | ASSISTED TRANSFER |
        And close the 'second' window session

    @782
    Scenario: Call - Timed Action - Press to Inbound Queue
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        When user adds a new timed action with the following settings:
            | actions      | Press to Inbound Queue |
            | target       | InboundQueue_2         |
            | time         | 5s                     |
            | digit        | 1                      |
            | audioManager | new-call.wav           |
            | repeat       | false                  |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And I re-login using 'Agent_1' account
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        When user dial the number '8929923241' in ready state
        And user login to the platform with 'Agent_2' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_2' queue in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999900    | 1        |
        And let user wait for '10' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 999999900    | 1    | 0         |
        Then user state should be 'talking' in 'second' window
        And cancel the 'manual preview' state in 'same' window
        And I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999900               |
            | agentName   | Inbound-Queue           |
            | callOutcome | Press to Inbound Queue  |
            | owner       | InboundQueue_1          |
            | termReason  | PRESS_TO_QUEUE_TRANSFER |
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user deletes previously added timed action
        And close the 'second' window session

    @781
    Scenario: Call - Timed Action - Press to Voicemail
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        When user adds a new timed action with the following settings:
            | actions      | Press to Voicemail |
            | time         | 5s                 |
            | digit        | 1                  |
            | audioManager | new-call.wav       |
            | repeat       | false              |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        When user dial the number '8929923241' in ready state
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999904    | 1        |
        And let user wait for '13' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 999999904    | 1    | 0         |
        And let user wait for '5' seconds
        And client Hangup the '0' call via API
        And cancel the 'manual preview' state in 'same' window
        And user logout from Voice Channel
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999904          |
            | agentName   | inbound-queue      |
            | callOutcome | Press to Voicemail |
            | owner       | InboundQueue_1     |
            | termReason  | PRESS_TO_VOICEMAIL |
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And select voicemail Tab
        And validate voicemail data is as following:
            | number | 999999904      |
            | queue  | InboundQueue_1 |
        And select the voicemail
        And user makes call to voicemail contact
        And user make a call
        And user state should be 'talking'
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999904          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | subtype     | voicemail          |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user deletes previously added timed action
        Then clear uuid history

    @770
    Scenario: Inbound Call - Transfer call  - Remote
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And save the changes in edit campaign
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user click on transfer call button
        And user select the 'remote' transfer option
        And user mute the original call
        And user make a remote transfer of call to number '8888888888'
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | TRANSFER       |
        Then verify transfer history of call:
            | contactNo | 8888888888 |
            | result    | ANSWER     |

    @799
    Scenario: Inbound call - no agent logged in
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Hangup           |
        And user finish and save inbound queue settings
        And User logout with current session
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '13' seconds
        Then User login to the platform as 'admin'
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777           |
            | agentName   | Inbound-Queue       |
            | callOutcome | No Agents Available |
            | owner       | InboundQueue_1      |
            | termReason  | NO_AGENTS_LOGGED    |

    @787
    Scenario: Call - After Hours - Action - Hangup
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'outofhour'
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours  |
            | actionName        | Hangup       |
            | addActions        | false        |
            | audio             | new-call.wav |
        Then user finish and save inbound queue settings
        When login to Voice Channel with '100' extension in 'first' window
        And user selects 'InboundQueue_1' queue in 'first' window
        Then let user wait for '10' seconds
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 593847934    | 1        |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 593847934       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Out of Schedule |
            | owner       | InboundQueue_1  |
            | termReason  | OUT_OF_SCHEDULE |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'reset'
        Then user finish and save inbound queue settings

    @788
    Scenario: Call - After Hours - Action - Message
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        Then user select the current day of the week and queue 'outofhour'
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours  |
            | actionName        | Message      |
            | addActions        | true         |
            | audio             | new-call.wav |
        Then user finish and save inbound queue settings
        When login to Voice Channel with '100' extension in 'first' window
        And user selects 'InboundQueue_1' queue in 'first' window
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 121212       | 1        |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 121212          |
            | agentName   | Inbound-Queue   |
            | callOutcome | Out of Schedule |
            | owner       | InboundQueue_1  |
            | termReason  | OUT_OF_SCHEDULE |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'reset'
        Then user finish and save inbound queue settings

    @806
    Scenario: Warning - Average Talking Time - Inbound Call
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'GeneralSetting' tab
        And select the Warning Average Talking Time '10'
        And user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '14' seconds
        Then user state should be 'talking'
        Then voice alert 'Average Talk Time exceeded!' display
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        Then user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'GeneralSetting' tab
        And select the Warning Average Talking Time '0'
        And user finish and save inbound queue settings

    @800
    Scenario: Call - No Logged Agents - Action - Message
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Message          |
            | addActions        | true             |
            | audio             | new-call.wav     |
        Then user finish and save inbound queue settings
        And User logout with current session
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999990000    | 1        |
        Then User login to the platform as 'admin'
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999990000           |
            | agentName   | Inbound-Queue       |
            | callOutcome | No Agents Available |
            | owner       | InboundQueue_1      |
            | termReason  | NO_AGENTS_LOGGED    |
        When user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Hangup           |
        Then user finish and save inbound queue settings

    @791
    Scenario: Call - After Hours - Action - IVR
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'outofhour'
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours  |
            | actionName        | IVR          |
            | addActions        | true         |
            | audio             | new-call.wav |
        Then user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 593847935    | 1        |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 593847935       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Press to IVR    |
            | owner       | InboundQueue_1  |
            | termReason  | TRANSFER_TO_IVR |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'reset'
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours |
            | actionName        | Hangup      |
            | addActions        | false       |
            | audio             |             |
        Then user finish and save inbound queue settings

    @797
    Scenario: Call - Max Queue Time - Action - IVR
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '0' minutes to '10' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | IVR            |
            | addActions        | true           |
            | audio             | new-call.wav   |
        Then user finish and save inbound queue settings
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And save the changes in edit campaign
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        When user dial the number '8929923241' in ready state
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999900    | 1        |
        And let user wait for '10' seconds
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999999900       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Press to IVR    |
            | owner       | InboundQueue_1  |
            | termReason  | TRANSFER_TO_IVR |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Hangup         |
            | addActions        | false          |
            | audio             |                |
        Then user finish and save inbound queue settings

    @802
    Scenario: Inbound call - No agent Logged in call forward
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Inbound Queue    |
            | target            | InboundQueue_2   |
        And user finish and save inbound queue settings
        Then I re-login using 'Agent_1' account
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_2' queue in 'same' window
        And user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '3' seconds
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        And let user wait for '1' seconds
        Then I re-login using 'admin' account
        And user navigate to crm
        And user search the call by using following configurations:
            | channel | Inbound   |
            | agents  | Agent One |
        Then validate multiple calls are registered as per following configurations:
            | row | phoneNumber | agentName     | callOutcome         | owner          | termReason       |
            | 1   | 999888777   | Inbound-Queue | No Agents Available | InboundQueue_1 | NO_AGENTS_LOGGED |
            | 2   | 999888777   | Agent_1       | Ok                  | InboundQueue_2 | AGENT            |
        And user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Hangup           |
        And user finish and save inbound queue settings

    @803
    Scenario: Call - No Logged Agents - Action - IVR
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | IVR              |
            | actionTarget      | IVR_1            |
            | addActions        | true             |
            | audio             | new-call.wav     |
        Then user finish and save inbound queue settings
        And User logout with current session
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 467196290    | 1        |
        Then User login to the platform as 'admin'
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 467196290       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Press to IVR    |
            | owner       | InboundQueue_1  |
            | termReason  | TRANSFER_TO_IVR |
        When user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Hangup           |
        Then user finish and save inbound queue settings

    @793
    Scenario: Call - Max Queue Time - Action - Hangup
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '0' minutes to '10' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Hangup         |
            | addActions        | false          |
            | audio             |                |
        Then user finish and save inbound queue settings
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And save the changes in edit campaign
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        When user dial the number '2222222211' in ready state
        And user state should be 'manual-preview'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '10' seconds
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | Inbound-Queue  |
            | callOutcome | Queue Timeout  |
            | owner       | InboundQueue_1 |
            | termReason  | QUEUE_TIMEOUT  |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Hangup         |
            | addActions        | false          |
            | audio             |                |
        Then user finish and save inbound queue settings

    @790
    Scenario: Call - After Hours - Action - Inbound Queue
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        Then user select the current day of the week and queue 'outofhour'
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours    |
            | actionName        | Inbound Queue  |
            | target            | InboundQueue_2 |
        Then user finish and save inbound queue settings
        When user login to the platform with 'Agent_2' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_2' queue in 'second' window
        And let user wait for '5' seconds
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 776655443    | 1        |
        And let user wait for '5' seconds
        And user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And refresh the page
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_2 |
            | agents       | no             |
        Then validate multiple calls are registered as per following configurations:
            | row | phoneNumber | agentName     | callOutcome     | owner          | termReason      | subtype |
            | 1   | 776655443   | Inbound-Queue | Out of Schedule | InboundQueue_1 | OUT_OF_SCHEDULE |         |
            | 2   | 776655443   | Agent_2       | Ok              | InboundQueue_2 | AGENT           |         |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'reset'
        Then user finish and save inbound queue settings
        And close the 'second' window session

    @792
    Scenario: Call - After Hours - Action - Extension
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        Then user select the current day of the week and queue 'outofhour'
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours  |
            | actionName        | Extension    |
            | target            | 101          |
            | addActions        | true         |
            | audio             | new-call.wav |
        Then user finish and save inbound queue settings
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 45454        | 1        |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 45454                 |
            | agentName   | Inbound-Queue         |
            | callOutcome | Press to Extension    |
            | owner       | InboundQueue_1        |
            | termReason  | TRANSFER_TO_EXTENSION |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'reset'
        Then user finish and save inbound queue settings

    @794
    Scenario: Call - Max Queue Time - Action - Message
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '0' minutes to '10' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Message        |
            | addActions        | true           |
            | audio             | new-call.wav   |
        Then user finish and save inbound queue settings
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And save the changes in edit campaign
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        When user dial the number '2222222212' in ready state
        And user state should be 'manual-preview'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '10' seconds
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | Inbound-Queue  |
            | callOutcome | Queue Timeout  |
            | owner       | InboundQueue_1 |
            | termReason  | QUEUE_TIMEOUT  |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Hangup         |
            | addActions        | false          |
            | audio             |                |
        Then user finish and save inbound queue settings

    @795
    Scenario: Call - Max Queue Time - Action - Voicemail
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '0' minutes to '10' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Voice Mail     |
            | addActions        | true           |
            | audio             | new-call.wav   |
        Then user finish and save inbound queue settings
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And save the changes in edit campaign
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        When user dial the number '2021111' in ready state
        And user state should be 'manual-preview'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999907    | 1        |
        And let user wait for '13' seconds
        And client Hangup the '0' call via API
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907          |
            | agentName   | inbound-queue      |
            | callOutcome | Press to Voicemail |
            | owner       | InboundQueue_1     |
            | termReason  | PRESS_TO_VOICEMAIL |
            | subtype     | voicemail          |
        And user clicks on show voice channel
        And cancel the 'manual preview' state in 'same' window
        And select voicemail Tab
        And validate voicemail data is as following:
            | number | 999999907      |
            | queue  | InboundQueue_1 |
        And select the voicemail
        And user makes call to voicemail contact
        And user make a call
        And user state should be 'talking'
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | subtype     | voicemail          |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Hangup         |
            | addActions        | false          |
            | audio             |                |
        Then user finish and save inbound queue settings
        Then clear uuid history

    @807
    Scenario: Warning - Hold On Time - Inbound Call
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'GeneralSetting' tab
        And set 'Warning Hold Time' to '10' sec
        And user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '3' seconds
        Then user state should be 'talking'
        And user selects the call on 'hold' button
        Then user gets the 'hold' warning after '10' seconds
        And user selects the call on 'unhold' button
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        Then user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'GeneralSetting' tab
        And set 'Warning Hold Time' to '0' sec
        And user finish and save inbound queue settings

    @6707
    Scenario: Agent Direct Call
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
            | agentdirect | true           |
            | agent       | Agent Two      |
        Then I re-login using 'Agent_1' account
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And user state should be 'ready'
        Then user login to the platform with 'Agent_2' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        And user state should be 'ready' in 'second' window
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '3' seconds
        And user state should be 'talking' in 'second' window
        Then user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        Then I re-login using 'admin' account
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent Two      |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | Agent_2        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        When user navigates to voice manager
        Then user edits the DID '300501602'
        And user reset the edits of direct agent

    @6711
    Scenario:Force Inbound Queue : Inbound call
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then Access the 'Users & Groups' menu
        And user select 'Agent One' from users_table
        And user update Force Inbound Queues to 'true'
        Then I re-login using 'Agent_1' account
        Then login to Voice Channel with '100' extension
        And user validate that inbound queue 'InboundQueue_1' disable
        And user validate that inbound queue 'InboundQueue_2' disable
        Then user press 'Enter' key
        And user state should be 'ready'
        And let user wait for '3' seconds
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '3' seconds
        Then user state should be 'talking'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501603         | 999888777    | 2        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        And let user wait for '1' seconds
        Then I re-login using 'admin' account
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | Agent One      |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | Agent_1        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        Then user click on return button
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_2 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | Agent_1        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_2 |
            | termReason  | AGENT          |
        Then Access the 'Users & Groups' menu
        And user select 'Agent One' from users_table
        And user update Force Inbound Queues to 'false'

    @776
    Scenario: Inbound Call - Timed Action - Message
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'Actions' tab
        When user adds a new timed action with the following settings:
            | actions      | Message      |
            | time         | 5s           |
            | audioManager | new-call.wav |
            | repeat       | false        |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And   login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        When user dial the number '8094217411' in ready state
        And user state should be 'manual-preview'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 34567890     | 1        |
        And let user wait for '8' seconds
        And client Hangup the '0' call via API
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 34567890       |
            | agentName   | Inbound-Queue  |
            | callOutcome | Queue Abandon  |
            | owner       | InboundQueue_1 |
            | termReason  | ABANDON        |
            | Sub-Type    | queue-callback |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user deletes previously added timed action
        Then clear uuid history

    @5098
    Scenario: Inbound Call - Outcome Block
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user login to the platform with 'Agent_2' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 675434774    | 1        |
        And let user wait for '5' seconds
        And user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Block' outcome name in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 675434774    | 1        |
        And let user wait for '5' seconds
        And user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        When user navigate to crm
        And refresh the page
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then user validate that the outcome of contact is 'Block'

    @804
    Scenario: Call - No Logged Agents - Action - Extension
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Extension        |
            | actionTarget      | 101              |
            | addActions        | true             |
            | audio             | new-call.wav     |
        Then user finish and save inbound queue settings
        And User logout with current session
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 123456789    | 1        |
        Then User login to the platform as 'admin'
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 123456789             |
            | agentName   | Inbound-Queue         |
            | callOutcome | Press to Extension    |
            | owner       | InboundQueue_1        |
            | termReason  | TRANSFER_TO_EXTENSION |
        When user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | No Logged Agents |
            | actionName        | Hangup           |
        Then user finish and save inbound queue settings

    @789 @dialTests
    Scenario: Call - After Hours - Action - Voicemail
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'outofhour'
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours  |
            | actionName        | Voice Mail   |
            | addActions        | true         |
            | audio             | new-call.wav |
        Then user finish and save inbound queue settings
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And save the changes in edit campaign
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999907    | 1        |
        And let user wait for '5' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 999999907    | 1    | 0         |
        And let user wait for '5' seconds
        And client Hangup the '0' call via API
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907          |
            | agentName   | inbound-queue      |
            | callOutcome | Press to Voicemail |
            | owner       | InboundQueue_1     |
            | termReason  | PRESS_TO_VOICEMAIL |
            | subtype     | voicemail          |
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And select voicemail Tab
        And validate voicemail data is as following:
            | number | 999999907      |
            | queue  | InboundQueue_1 |
        And select the voicemail
        And user makes call to voicemail contact
        And user make a call
        And user state should be 'talking'
        Then user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907          |
            | agentName   | admin              |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | subtype     | voicemail          |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'reset'
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | After Hours |
            | actionName        | Hangup      |
            | addActions        | false       |
            | audio             |             |
        Then user finish and save inbound queue settings
        Then clear uuid history

    @796
    Scenario: Call - Max Queue Time - Action - Inbound Queue
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '0' minutes to '10' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Inbound Queue  |
            | target            | InboundQueue_2 |
        Then user finish and save inbound queue settings
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'manual'
        And save the changes in edit campaign
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        When user dial the number '20211199' in ready state
        And user state should be 'manual-preview'
        And user login to the platform with 'Agent_2' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_2' queue in 'second' window
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999907    | 1        |
        And let user wait for '10' seconds
        Then user state should be 'talking' in 'second' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907               |
            | agentName   | Inbound-Queue           |
            | callOutcome | Press to Inbound Queue  |
            | owner       | InboundQueue_1          |
            | termReason  | PRESS_TO_QUEUE_TRANSFER |
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '10' seconds
        And refresh the page
        When user navigate to crm
        When user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_2 |
            | agents       | no             |
        Then validate multiple calls are registered as per following configurations:
            | row | phoneNumber | agentName     | callOutcome            | owner          | termReason              | subtype |
            | 1   | 999999907   | Inbound-Queue | Press to Inbound Queue | InboundQueue_1 | PRESS_TO_QUEUE_TRANSFER |         |
            | 2   | 999999907   | Agent_2       | Ok                     | InboundQueue_2 | AGENT                   |         |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Hangup         |
            | addActions        | false          |
            | audio             |                |
        Then user finish and save inbound queue settings
        And close the 'second' window session

    @798
    Scenario: Call - Max Queue Time - Action - Extension
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '0' minutes to '10' seconds
        Then user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Extension      |
            | actionTarget      | 101            |
            | addActions        | true           |
            | audio             | new-call.wav   |
        Then user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        When user dial the number '20211199' in ready state
        And user state should be 'manual-preview'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999907    | 1        |
        And let user wait for '10' seconds
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907             |
            | agentName   | Inbound-Queue         |
            | callOutcome | Press to Extension    |
            | owner       | InboundQueue_1        |
            | termReason  | TRANSFER_TO_EXTENSION |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        And user navigates to 'Actions' tab
        And user configure in the default section
            | defaultActionType | Max Queue Time |
            | actionName        | Hangup         |
            | addActions        | false          |
            | audio             |                |
        Then user finish and save inbound queue settings

    @810
    Scenario: Inbound Call - Max Wrap-Up
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        And toggle 'on' the 'max' Wrap Up Time in queue
        Then user set 'max' Wrap Up Time '10' sec
        Then user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user gets the 'max' Wrap-Up notification
        Then user validate 'Customer Hangup' 'max' Wrap-Up time of '10' sec exceeds with 'auto' outcome 'any'
        And user state should be 'ready'
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | admin          |
            | callOutcome | Auto Wrap Up   |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        Then user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        And toggle 'off' the 'max' Wrap Up Time in queue
        Then user finish and save inbound queue settings

    @6704
    Scenario: Call - Timed Action - Offer call to agents in another queue
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        And let user wait for '2' seconds
        Then user navigates to 'Actions' tab
        When user adds a new timed action with the following settings:
            | actions | Offer call to agents in another queue |
            | target  | InboundQueue_2                        |
            | time    | 5s                                    |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        When user dial the number '9287429383' in ready state in 'second' window
        And user state should be 'manual-preview' in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_2' queue in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 800900123    | 1        |
        And user state should be 'talking' in 'third' window
        And let user wait for '3' seconds
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'third' window
        Then user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate multiple calls are registered as per following configurations:
            | row | phoneNumber | agentName     | callOutcome        | owner          | termReason         | subtype |
            | 1   | 800900123   | Inbound-Queue | Automatic Overflow | InboundQueue_1 | AUTOMATIC_OVERFLOW |         |
            | 2   | 800900123   | Agent_2       | Ok                 | InboundQueue_2 | AGENT              |         |
        Then user navigate to crm
        And refresh the page
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_2 |
            | agents       | no             |
        Then validate multiple calls are registered as per following configurations:
            | row | phoneNumber | agentName     | callOutcome        | owner          | termReason         | subtype |
            | 1   | 800900123   | Inbound-Queue | Automatic Overflow | InboundQueue_1 | AUTOMATIC_OVERFLOW |         |
            | 2   | 800900123   | Agent_2       | Ok                 | InboundQueue_2 | AGENT              |         |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user deletes previously added timed action

    @784
    Scenario: Call - Timed Action - Press to IVR
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        When user adds a new timed action with the following settings:
            | actions      | Press to IVR |
            | target       | IVR_1        |
            | time         | 5s           |
            | digit        | 1            |
            | audioManager | new-call.wav |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        Then user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And user state should be 'ready'
        When user dial the number '11111' in ready state
        Then user state should be 'manual-preview'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 111444777    | 1        |
        And let user wait for '5' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 111444777    | 1    | 0         |
        And let user wait for '15' seconds
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 111444777       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Press to IVR    |
            | owner       | InboundQueue_1  |
            | termReason  | TRANSFER_TO_IVR |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'Actions' tab
        And user deletes previously added timed action

    @808
    Scenario: Call - Schedule Callback for other Agents (On)
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And set Schedule Callback for other Agents to 'on'
        Then user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999907    | 1        |
        And let user wait for '5' seconds
        Then user state should be 'talking'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Transfer |
            | outcome | Callback      |
            | option  | personal      |
            | agent   | Agent One     |
        Then user state should be 'ready'
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1 |
            | number   | 999999907      |
            | agent    | Agent One      |
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'second' window
        And select the callback tab in 'second' window
        Then validate the scheduled callback in 'second' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907      |
            | agentName   | admin          |
            | callOutcome | Callback       |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And set Schedule Callback for other Agents to 'off'
        Then user finish and save inbound queue settings
        And close the 'second' window session

    @809
    Scenario: Call - Schedule Callback for other Agents (Off)
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And set Schedule Callback for other Agents to 'off'
        Then user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999907    | 1        |
        And let user wait for '5' seconds
        Then user state should be 'talking'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits outcome with following configurations:
            | group   | Call Transfer    |
            | outcome | Callback         |
            | option  | personal         |
            | agent   | Unable To Select |
        Then user state should be 'ready'
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1       |
            | number   | 999999907            |
            | agent    | System Administrator |
        When user navigate to voice channel
        And select the callback tab in 'same' window
        Then validate the scheduled callback in 'same' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999907      |
            | agentName   | admin          |
            | callOutcome | Callback       |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |

    @778
    Scenario: Call - Timed Action - After Hours - Callback
        And user edits the DID '300501602'
        Then user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        Then user select the current day of the week and queue 'outofhour'
        When user navigates to 'Actions' tab
        Then user adds a new timed action with the following settings:
            | actions        | After Hours - Callback |
            | audioManager   | new-call.wav           |
            | options        | 9                      |
            | optionsManager | new-call.wav           |
            | callBack       | true                   |
        When user edits the campaign 'OutboundCampaign_1'
        And user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 888888800    | 1        |
        And let user wait for '5' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf      | callIndex |
            | 300501602         | 888888800    | 888888800 | 0         |
        And let user wait for '15' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 888888800    | 1    | 0         |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1                 |
            | comment  | Generated by Press to Callback |
            | number   | 888888800                      |
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 888888800         |
            | agentName   | Inbound-Queue     |
            | callOutcome | Press to Callback |
            | owner       | InboundQueue_1    |
            | termReason  | PRESS_TO_CALLBACK |
            | subtype     | queue-callback    |
        When I re-login using 'Agent_1' account
        And let user wait for '300' seconds
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        Then Validate that, in call info section, the parameter DTMF has the value '888888800' in 'same' window
        When user make a call
        And let user wait for '3' seconds
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And let user wait for '1' seconds
        When I re-login using 'admin' account
        And user navigate to crm
        Then user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 888888800          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user select the current day of the week and queue 'reset'
        And user navigates to 'Actions' tab
        And user deletes previously added timed action

    @805
    Scenario: Call - Transfer - 3-Way Conference
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And user state should be 'ready'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 888899999    | 1        |
        Then user state should be 'talking'
        And user click on transfer call button
        And user select the 'remote' transfer option
        And user mute the original call
        When user enter destination number '12312312' and make a call
        And user starts conference call
        Then verify both the calls are in conference
        When user stops conference call
        And user ends remote destination call
        And user disconnects the call
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 888899999      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        Then verify transfer history of call:
            | contactNo | 12312312 |
            | result    | ANSWER   |

    @811
    Scenario: Inbound Call - Min Wrap-Up
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        And toggle 'on' the 'min' Wrap Up Time in queue
        Then user set 'min' Wrap Up Time '10' sec
        Then user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        Then user validate 'Customer Hangup' 'min' Wrap-Up time of '10' sec exceeds with 'disabled' outcome 'Ok'
        And user state should be 'ready'
        Then user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777      |
            | agentName   | admin          |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | AGENT          |
        Then user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        And toggle 'off' the 'min' Wrap Up Time in queue
        Then user finish and save inbound queue settings

    @777
    Scenario: Call - Timed Action - Press To Callback
        And user edits the DID '300501602'
        Then user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        Then user adds a new timed action with the following settings:
            | actions        | Press to Callback |
            | time           | 5                 |
            | digit          | 1                 |
            | audioManager   | new-call.wav      |
            | repeat         | false             |
            | options        | 9                 |
            | optionsManager | new-call.wav      |
            | callBack       | true              |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        When user dial the number '999888771' in ready state in 'second' window
        And user state should be 'manual-preview' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '7' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 999888777    | 1    | 0         |
        And let user wait for '2' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf      | callIndex |
            | 300501602         | 999888777    | 999888777 | 0         |
        And let user wait for '15' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 999888777    | 1    | 0         |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1                 |
            | comment  | Generated by Press to Callback |
            | number   | 999888777                      |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999888777         |
            | agentName   | Inbound-Queue     |
            | callOutcome | Press to Callback |
            | owner       | InboundQueue_1    |
            | termReason  | PRESS_TO_CALLBACK |
            | subtype     | queue-callback    |
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When user navigate to voice channel in 'second' window
        And cancel the 'manual preview' state in 'second' window
        Then user state should be 'ready' in 'second' window
        And user logout from Voice Channel in 'second' window
        And let user wait for '300' seconds
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        Then Validate that, in call info section, the parameter DTMF has the value '999888777' in 'second' window
        When user make a call in 'second' window
        And let user wait for '3' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | subType     | queue-callback     |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user deletes previously added timed action
        And close the 'second' window session

    @779
    Scenario: Call - Timed Action - Max Queue Time - Callback
        And user edits the DID '300501602'
        Then user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '0' minutes to '15' seconds
        And user navigates to 'Actions' tab
        Then user adds a new timed action with the following settings:
            | actions        | Max Queue Time - Callback |
            | audioManager   | new-call.wav              |
            | options        | 9                         |
            | optionsManager | new-call.wav              |
            | callBack       | true                      |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        When user dial the number '999888771' in ready state in 'second' window
        And user state should be 'manual-preview' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '18' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf      | callIndex |
            | 300501602         | 999888777    | 999888777 | 0         |
        And let user wait for '15' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 999888777    | 1    | 0         |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1                 |
            | comment  | Generated by Press to Callback |
            | number   | 999888777                      |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999888777         |
            | agentName   | Inbound-Queue     |
            | callOutcome | Press to Callback |
            | owner       | InboundQueue_1    |
            | termReason  | PRESS_TO_CALLBACK |
            | subtype     | queue-callback    |
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When user navigate to voice channel in 'second' window
        And cancel the 'manual preview' state in 'second' window
        Then user state should be 'ready' in 'second' window
        And user logout from Voice Channel in 'second' window
        And let user wait for '300' seconds
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        Then Validate that, in call info section, the parameter DTMF has the value '999888777' in 'second' window
        When user make a call in 'second' window
        And let user wait for '3' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888777          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
            | subType     | queue-callback     |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set max queue time to '1' minutes to '30' seconds
        And user navigates to 'Actions' tab
        And user deletes previously added timed action
        And close the 'second' window session

    @785
    Scenario: Call - Timed Action - Press to Extension
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        When user adds a new timed action with the following settings:
            | actions      | Press to Extension |
            | target       | 101                |
            | time         | 5s                 |
            | digit        | 1                  |
            | audioManager | new-call.wav       |
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        Then user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And user state should be 'ready'
        When user dial the number '11111' in ready state
        Then user state should be 'manual-preview'
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 111444777    | 1        |
        And let user wait for '7' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 111444777    | 1    | 0         |
        And let user wait for '10' seconds
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 111444777             |
            | agentName   | Inbound-Queue         |
            | callOutcome | Press to Extension    |
            | owner       | InboundQueue_1        |
            | termReason  | TRANSFER_TO_EXTENSION |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'Actions' tab
        And user deletes previously added timed action

    @780
    Scenario: Call - Timed Action - No Logged Agents - Callback
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        When user adds a new timed action with the following settings:
            | actions        | No Logged Agents - Callback |
            | audioManager   | new-call.wav                |
            | options        | 9                           |
            | optionsManager | new-call.wav                |
            | callBack       | true                        |
        And user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        Then User logout with current session
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 123123123    | 1        |
        And let user wait for '5' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf      | callIndex |
            | 300501602         | 123123123    | 123123123 | 0         |
        And let user wait for '13' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 123123123    | 1    | 0         |
        When User login to the platform as 'admin'
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1                 |
            | comment  | Generated by Press to Callback |
            | number   | 123123123                      |
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 123123123         |
            | agentName   | Inbound-Queue     |
            | callOutcome | Press to Callback |
            | owner       | InboundQueue_1    |
            | termReason  | PRESS_TO_CALLBACK |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And let user wait for '300' seconds
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And user make a call
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And let user wait for '1' seconds
        And User logout with current session
        When User login to the platform as 'admin'
        When user navigate to crm
        Then user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        Then validate that the call is registered as per following configurations:
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        When user navigates to voice manager
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'Actions' tab
        And user deletes previously added timed action

    @813
    Scenario: Inbound Call - Available Agents to Delivery Queue Callbacks (0)
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        And user set available agents to deliver Queue callbacks attribute to '0'
        When user navigates to 'Actions' tab
        Then user adds a new timed action with the following settings:
            | actions        | No Logged Agents - Callback |
            | audioManager   | new-call.wav                |
            | options        | 9                           |
            | optionsManager | new-call.wav                |
            | callBack       | true                        |
        When user edits the campaign 'OutboundCampaign_1'
        And user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 903434823    | 1        |
        And let user wait for '5' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf      | callIndex |
            | 300501602         | 903434823    | 903434823 | 0         |
        And let user wait for '13' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 903434823    | 1    | 0         |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1                 |
            | comment  | Generated by Press to Callback |
            | number   | 903434823                      |
        When user login to the platform with 'Agent_1' account in 'second' window
        And let user wait for '300' seconds
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        And user state should be 'manual-preview' in 'second' window
        And user make a call in 'second' window
        And user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        Then user navigate to crm
        And refresh the page
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 903434823          |
            | agentName   | Agent_1            |
            | owner       | OutboundCampaign_1 |
            | callOutcome | Ok                 |
            | termReason  | AGENT              |
            | subType     | queue-callback     |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'Actions' tab
        And user deletes previously added timed action
        And close the 'second' window session

    @814
    Scenario: Inbound Call - Available Agents to Delivery Queue Callbacks
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        And user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then user searches and edits 'InboundQueue_1' inbound queue
        Then user navigates to 'General Settings' tab
        And user set available agents to deliver Queue callbacks attribute to '3'
        When user navigates to 'Actions' tab
        Then user adds a new timed action with the following settings:
            | actions        | No Logged Agents - Callback |
            | audioManager   | new-call.wav                |
            | options        | 9                           |
            | optionsManager | new-call.wav                |
            | callBack       | true                        |
        When user edits the campaign 'OutboundCampaign_1'
        And user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 534643431    | 1        |
        And let user wait for '5' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf      | callIndex |
            | 300501602         | 534643431    | 534643431 | 0         |
        And let user wait for '13' seconds
        When client interact with the agent by key press via DTMF Api
            | callerDestination | callerCaller | dtmf | callIndex |
            | 300501602         | 534643431    | 1    | 0         |
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled
            | campaign | InboundQueue_1                 |
            | comment  | Generated by Press to Callback |
            | number   | 534643431                      |
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        And let user wait for '300' seconds
        Then user navigate to crm
        And refresh the page
        Then user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 534643431         |
            | agentName   | Inbound-Queue     |
            | callOutcome | Press to Callback |
            | owner       | InboundQueue_1    |
            | termReason  | PRESS_TO_CALLBACK |
            | subtype     | queue-callback    |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        When user navigates to 'General Settings' tab
        And user set available agents to deliver Queue callbacks attribute to '0'
        And user navigates to 'Actions' tab
        And user deletes previously added timed action
        And close the 'second' window session

    @6708
    Scenario: Inbound Call - Schedule Exception (one queue)
        And user edits the DID '300501602'
        Then user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        And user adds a new Scheduled Exception with the following settings:
            | name   | Today |
            | repeat | false |
            | allDay | true  |
        Then user verifies a new Scheduled Exception is present in Exception List
        When user activates added exception
        Then user verifies Exception is present under Added Exceptions as 'Active'
        Then user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999911    | 1        |
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999911       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Out of Schedule |
            | owner       | InboundQueue_1  |
            | termReason  | OUT_OF_SCHEDULE |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        Then user deletes previously added exception
        And user finish and save inbound queue settings

    @6710
    Scenario: Inbound Call - Schedule Exception (two queues)
        And user edits the DID '300501602'
        Then user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        And user adds a new Scheduled Exception with the following settings:
            | name     | Today          |
            | repeat   | false          |
            | allDay   | true           |
            | addQueue | InboundQueue_2 |
        Then user verifies a new Scheduled Exception is present in Exception List
        When user activates added exception
        Then user verifies Exception is present under Added Exceptions as 'Active'
        Then user finish and save inbound queue settings
        And I re-login using 'Agent_1' account
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999911    | 1        |
        And I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999911       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Out of Schedule |
            | owner       | InboundQueue_1  |
            | termReason  | OUT_OF_SCHEDULE |
        And I re-login using 'Agent_2' account
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_2' queue in 'same' window
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501603         | 999999911    | 2        |
        And I re-login using 'admin' account
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_2 |
            | agents       | no             |
        Then validate that the call is registered as per following configurations:
            | phoneNumber | 999999911       |
            | agentName   | Inbound-Queue   |
            | callOutcome | Out of Schedule |
            | owner       | InboundQueue_2  |
            | termReason  | OUT_OF_SCHEDULE |
        When user navigates to voice manager
        When user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        Then user deletes previously added exception
        And user finish and save inbound queue settings

    @6298
    Scenario: Agent control call after refresh - Inbound call - Hang up button
        When login to Voice Channel with '100' extension in 'first' window
        And user selects 'InboundQueue_1' queue in 'first' window
        Then let user wait for '10' seconds
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 593847934    | 1        |
        And user state should be 'talking'
        And refresh the page
        And let user wait for '5' seconds
        Then user voice channel modal should be visible
        When user click on 'hang up' button
        And call hangup message 'Your session in GoContact was resumed.'
        Then verify profile page is displayed

    @6300
    Scenario: Agent control call after refresh - Inbound call- Resume call / Place on hold button
        When login to Voice Channel with '100' extension in 'first' window
        And user selects 'InboundQueue_1' queue in 'first' window
        Then let user wait for '10' seconds
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 593847934    | 1        |
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