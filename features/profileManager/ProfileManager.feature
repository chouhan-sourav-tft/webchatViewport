@profileManager
Feature: Profile Manager

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        And delete uuid array
        When user navigate to callbacks manager
        And user delete all scheduled callback

    @2943 @dialTests
    Scenario: Profile with the restriction 'Mask phone numbers of contacts' - inbound call
        And user access profile manager menu
        And user selects 'agent' tab
        And user verify and select mask number checkbox
        And user save the settings
        And I re-login using 'Agent_1' account
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999999911    | 1        |
        And let user wait for '3' seconds
        Then verify call has been made to a masked number for 'inbound' call
        And client Hangup the '0' call via API
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then user state should be 'ready'
        And I re-login using 'admin' account
        And user access profile manager menu
        And user selects 'agent' tab
        And user uncheck masked number checkbox
        And user save the settings

    @2950 @dialTests
    Scenario: Profile with the restriction 'Mask phone numbers of contacts' - outbound call
        And user access profile manager menu
        And user selects 'agent' tab
        And user verify and select mask number checkbox
        And user save the settings
        And I re-login using 'Agent_1' account
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And let user wait for '3' seconds
        Then verify call has been made to a masked number for 'outbound' call
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then user state should be 'ready'
        And I re-login using 'admin' account
        And user access profile manager menu
        And user selects 'agent' tab
        And user uncheck masked number checkbox
        And user save the settings