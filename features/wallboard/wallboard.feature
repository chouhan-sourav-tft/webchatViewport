@wallboard
Feature: Wallboard

    Background: Login To the application
        Given User login to the platform as 'Supervisor_1'
        Then clean active calls
        Then clear uuid history
        Then clear pageList history
        When user navigate to callbacks manager
        And user delete all scheduled callback

    @7095
    Scenario: Wallboard - Outbound Call(s)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        When user dial the number '8094217411' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '10' seconds
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | callsMade | answered | answeredPercent | TMA  | campaignType |
            | 1         | 1        | 100%            | 5-15 | Outbound     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        When user dial the number '8094217412' in ready state in 'third' window
        When user make a call in 'third' window
        Then user state should be 'talking' in 'third' window
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '300' seconds
        And refresh the page
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | callsMade | answered | answeredPercent | TMA  | campaignType |
            | 2         | 2        | 100%            | 5-15 | Outbound     |
        Then close the 'second' window session
        Then close the 'third' window session

    @7106
    Scenario: Wallboard - Inbound Call(s)
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501604         | 8094217411   | 1        |
        And let user wait for '5' seconds
        Then user state should be 'talking' in 'second' window
        And client Hangup the '0' call via API
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '300' seconds
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | callsMade | answered | answeredPercent | TMA  | campaignType |
            | 1         | 1        | 100%            | 5-15 | Inbound      |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_4' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501605         | 8094217411   | 1        |
        And let user wait for '5' seconds
        Then user state should be 'talking' in 'third' window
        And client Hangup the '1' call via API
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '310' seconds
        And refresh the page
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | callsMade | answered | answeredPercent | TMA  | campaignType |
            | 2         | 2        | 100%            | 5-15 | Inbound      |
        Then close the 'second' window session
        Then close the 'third' window session

    @7109
    Scenario: Wallboard - Inbound - Abandoned
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with 'InboundQueue_4' queue in 'second' window
        When user dial the number '999888700' in ready state in 'second' window
        And user state should be 'manual-preview' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501605         | 999888777    | 4        |
        And let user wait for '5' seconds
        And client Hangup the '0' call via API
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        And let user wait for '300' seconds
        Then verify section data with following configurations:
            | abandoned | abandonPer | campaignType |
            | 1         | dynamic    | Inbound      |
        Then close the 'second' window session

    @7121
    Scenario: Wallboard - New tab - Force Logout
        When login to Voice Channel with '100' extension
        When user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        When user access the wallboard menu in 'first' window
        When user select 'Template_1' from list
        When user click on option open in new tab '2'
        When user login to the platform with 'Supervisor_2' account in 'second' window
        When User navigate to dashboard page in 'second' window
        When user selects the 'Voice Inbound' tab in 'second' window
        When user selects the agent tab in 'second' window
        When verify 'Supervisor One' is in the list in voice inbound tab in 'ready' state in 'second' window
        When User select the action tab in 'second' window
        When User click on Force Logout
        When verify that agent is succesfully Force logout

    @7098
    Scenario: Wallboard - Outbound - Agents (Talking)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        When user dial the number '6801111111' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 1       | 0       | 0     | Outbound     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        When user dial the number '6801111112' in ready state in 'third' window
        When user make a call in 'third' window
        Then user state should be 'talking' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 2       | 0       | 0     | Outbound     |
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 1       | 0       | 0     | Outbound     |
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Outbound     |
        Then close the 'third' window session

    @7099
    Scenario: Wallboard - Outbound - Agents (Outcomes)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        When user dial the number '6801111111' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 1       | 0     | Outbound     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        When user dial the number '6801111112' in ready state in 'third' window
        When user make a call in 'third' window
        Then user state should be 'talking' in 'third' window
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 2       | 0     | Outbound     |
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 0       | 1       | 0     | Outbound     |
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Outbound     |
        Then close the 'third' window session

    @7100
    Scenario: Wallboard - Outbound - Agents (Breaks)
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user deletes all previous breaks
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 60      |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        And request the break with auth 'false' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 0       | 1     | Outbound     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        And request the break with auth 'false' in 'third' window
        And let user wait for '10' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 0       | 2     | Outbound     |
        And request the break with auth 'false' in 'second' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 0       | 0       | 1     | Outbound     |
        And request the break with auth 'false' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Outbound     |
        Then close the 'third' window session

    @7111
    Scenario: Wallboard - Inbound - Agents (Ready)
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects '' campaign with 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 0       | 0       | 0     | Inbound      |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects '' campaign with 'InboundQueue_4' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Inbound      |
        Then close the 'third' window session

    @7122
    Scenario: Wallboard - New tab - Logout
        When user access the wallboard menu in 'first' window
        When user select 'Template_1' from list
        When user click on option open in new tab '2'
        When User logout with current session
        When user validate if the open tabs are closed succesfully

    @7112
    Scenario: Wallboard - Inbound - Agents (Talking)
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects '' campaign with 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501604         | 999888777    | 3        |
        Then user state should be 'talking' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 1       | 0       | 0     | Inbound      |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects '' campaign with 'InboundQueue_4' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501605         | 999888776    | 4        |
        Then user state should be 'talking' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 2       | 0       | 0     | Inbound      |
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 1       | 0       | 0     | Inbound      |
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Inbound      |
        Then close the 'third' window session

    @7113
    Scenario: Wallboard - Inbound - Agents (Outcomes)
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects '' campaign with 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501604         | 999888777    | 3        |
        Then user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 1       | 0     | Inbound      |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects '' campaign with 'InboundQueue_4' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501605         | 999888776    | 4        |
        Then user state should be 'talking' in 'third' window
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 2       | 0     | Inbound      |
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 0       | 1       | 0     | Inbound      |
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Inbound      |
        Then close the 'third' window session

    @7115
    Scenario: Wallboard - Inbound - Agents (Breaks)
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user deletes all previous breaks
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 60      |
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects '' campaign with 'InboundQueue_3' queue in 'second' window
        And request the break with auth 'false' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 0       | 1     | Inbound      |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects '' campaign with 'InboundQueue_4' queue in 'third' window
        And request the break with auth 'false' in 'third' window
        And let user wait for '10' seconds
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 0     | 0       | 0       | 2     | Inbound      |
        And request the break with auth 'false' in 'second' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 0       | 0       | 1     | Inbound      |
        And request the break with auth 'false' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Inbound      |
        Then close the 'third' window session

    @7097
    Scenario: Wallboard - Outbound - Agents (Ready)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 0       | 0       | 0     | Outbound     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 2     | 0       | 0       | 0     | Outbound     |
        Then close the 'second' window session
        Then close the 'third' window session

    @7103
    Scenario: Wallboard - Outbound - Agents
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify agent section data with following configurations:
            | agent_1   | agent_2 | campaignType |
            | Agent One |         | Outbound     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        Then verify agent section data with following configurations:
            | agent_1   | agent_2   | campaignType |
            | Agent One | Agent Two | Outbound     |
        Then User logout with current session in 'second' window
        Then verify agent section data with following configurations:
            | agent_1 | agent_2   | campaignType |
            |         | Agent Two | Outbound     |
        Then User logout with current session in 'third' window
        Then verify agent section data with following configurations:
            | agent_1 | agent_2 | campaignType |
            |         |         | Outbound     |
        Then close the 'second' window session
        Then close the 'third' window session

    @7117
    Scenario: Wallboard - Template - Global
        When user access the wallboard menu in 'first' window
        And user create a new template with following configurations:
            | templateName    | templateType |
            | Template_Global | Global       |
        When user login to the platform with 'Supervisor_2' account in 'second' window
        And user access the wallboard menu in 'second' window
        Then verify if user can access to the template with following status in 'second' window
            | view | edit | delete | editFormName | editError | deleteError |
            | true | true | true   |              | false     | false       |
        And delete the wallboard template
        Then close the 'second' window session

    @7118
    Scenario: Wallboard - Template - User
        When user access the wallboard menu in 'first' window
        And user create a new template with following configurations:
            | templateName  | templateType |
            | Template_User | User         |
        When user login to the platform with 'Supervisor_2' account in 'second' window
        And user access the wallboard menu in 'second' window
        Then verify if user can access to the template with following status in 'second' window
            | view  | edit  | delete | editFormName | editError | deleteError |
            | false | false | false  |              | false     | false       |
        And delete the wallboard template
        Then close the 'second' window session

    @7119
    Scenario: Wallboard - Template - Global Protected
        When user access the wallboard menu in 'first' window
        And user create a new template with following configurations:
            | templateName       | templateType     |
            | Template_Protected | Global Protected |
        When user login to the platform with 'Supervisor_2' account in 'second' window
        And user access the wallboard menu in 'second' window
        Then verify if user can access to the template with following status in 'second' window
            | view | edit | delete | editFormName | editError | deleteError |
            | true | true | true   | Test_1       | true      | true        |
        And delete the wallboard template
        Then close the 'second' window session

    @7116
    Scenario: Wallboard - Inbound - Agents
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects '' campaign with 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify agent section data with following configurations:
            | agent_1   | agent_2 | campaignType |
            | Agent One |         | Inbound      |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects '' campaign with 'InboundQueue_4' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        Then verify agent section data with following configurations:
            | agent_1   | agent_2   | campaignType |
            | Agent One | Agent Two | Inbound      |
        Then User logout with current session in 'second' window
        Then verify agent section data with following configurations:
            | agent_1 | agent_2   | campaignType |
            |         | Agent Two | Inbound      |
        Then User logout with current session in 'third' window
        Then verify agent section data with following configurations:
            | agent_1 | agent_2 | campaignType |
            |         |         | Inbound      |
        Then close the 'second' window session
        Then close the 'third' window session

    @7120
    Scenario: Wallboard - New tab - Update values
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        When user dial the number '122222222' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        And let user wait for '2' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        Then user state should be 'ready' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501604         | 999888776    | 3        |
        And let user wait for '5' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        When user click on option open in new tab '1'
        Then verify that the values the new tab data is same as original tab
            | campaignType |
            | Outbound     |
            | Inbound      |
        When user dial the number '122222222' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        And let user wait for '2' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        Then user state should be 'ready' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501604         | 999888776    | 3        |
        Then user state should be 'talking' in 'second' window
        And let user wait for '5' seconds
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | ready | talking | outcome | break | campaignType |
            | 1     | 0       | 0       | 0     | Outbound     |
            | 1     | 0       | 0       | 0     | Inbound      |
        Then verify agent section data with following configurations:
            | agent_1   | agent_2 | campaignType |
            | Agent One |         | Outbound     |
            | Agent One |         | Inbound      |
        Then verify that the values the new tab data is same as original tab
            | campaignType |
            | Outbound     |
            | Inbound      |
        Then close the 'second' window session

    @7110
    Scenario:Wallboard - Inbound - Wait Queue
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with 'InboundQueue_3' queue in 'second' window
        When user dial the number '999888700' in ready state in 'second' window
        And user state should be 'manual-preview' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501604         | 999888777    | 3        |
        And let user wait for '4' seconds
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify section data with following configurations:
            | waitQueue | campaignType |
            | 1         | Inbound      |
        And client Hangup the '0' call via API
        Then verify section data with following configurations:
            | waitQueue | campaignType |
            | 0         | Inbound      |
        Then close the 'second' window session

    @7123
    Scenario: New tab - Close Main Tab
        When user access the wallboard menu in 'first' window
        When user select 'Template_1' from list
        When user click on option open in new tab '2'
        When user closes '1' opened tab
        And let user wait for '30' seconds
        When validate user is not logged out of main tab
        When user closes main tab
        And let user wait for '30' seconds
        When user validate if the open tabs are closed succesfully

    @7107
    Scenario: Wallboard - Inbound - Transfer
        When user navigates to voice manager
        When user edits the DID '300501604'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_3 |
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'No' campaign with 'InboundQueue_3' queue in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'No' campaign with 'InboundQueue_4' queue in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501604         | 8094217411   | 3        |
        And user click on transfer call button in 'second' window
        And user select the 'queue' transfer option in 'second' window
        And user transfers call to 'InboundQueue_4' queue in 'second' window
        And user makes 'Blind Transfer' of call in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user state should be 'talking' in 'third' window
        And client Hangup the '0' call via API
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '300' seconds
        When user access the wallboard menu in 'first' window
        When user select 'Template_1' from list
        Then verify section data with following configurations:
            | transfer | campaignType |
            | 1        | Inbound      |
        Then close the 'second' window session
        Then close the 'third' window session

    @7124
    Scenario: Wallboard - New Tab - Delete Template
        When user access the wallboard menu in 'first' window
        And user create a new template with following configurations:
            | templateName    | templateType |
            | Template_Delete | Global       |
        When user select 'latest' from list
        When user click on option open in new tab '1'
        And delete the wallboard template
        And refresh the tab 0
        Then verify data in tab 0 with following configurations:
            | template | boxTopLeftTitle |
            | latest   |                 |

    @7125
    Scenario: Wallboard - New Tab - Edit Template
        When user access the wallboard menu in 'first' window
        And user create a new template with following configurations:
            | templateName  | templateType |
            | Template_Edit | Global       |
        When user select 'latest' from list
        When user click on option open in new tab '1'
        Then verify if user can access to the template with following status in 'first' window
            | view | edit | delete | editFormName | editError | deleteError |
            | true | true |        | Test_1       |           |             |
        And refresh the tab 0
        Then verify data in tab 0 with following configurations:
            | template | boxTopLeftTitle |
            | latest   | Test_1          |