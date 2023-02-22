@dashboard
Feature: Dashboard tests

    @1062
    Scenario: Dashboard - Tickets - Agents
        Given User login to the platform as 'admin'
        Then clean active calls
        When User access ticket channel
        And let user wait for '1' seconds
        And User navigate to dashboard page
        And User selects the agent tab
        And User selects the 'ticket' tab
        Then verify agent is in 'Idle' state in 'ticket' tab

    @1063
    Scenario: Dashboard - webchat - Agents
        Given User login to the platform as 'admin'
        Then clean active calls
        When User access webchat channel
        And User navigate to dashboard page
        And User selects the agent tab
        And User selects the 'webchat' tab
        Then verify agent is in 'IDLE' state in 'webchat' tab

    @1064
    Scenario: Dashboard - Force Logout
        Given User login to the platform as 'Agent_1'
        Then clean active calls
        And   login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user dial the number '123456789' in ready state
        And user make a call
        And user state should be 'talking'
        Then user login to the platform with 'Supervisor_1' account in 'second' window
        And User navigate to dashboard page in 'second' window
        And user selects the 'voice Outbound' tab in 'second' window
        And user selects the agent tab in 'second' window
        Then user search for 'Agent One' in 'second' window
        And verify agent is in 'talking' state in voice tab in 'second' window
        And User select the action tab in 'second' window
        And User click on Force Logout
        Then verify that agent is succesfully Force logout
        Then close the 'second' window session

    @6721
    Scenario:Dashboard - Add an agent to a queue
        When User login to the platform as 'admin'
        Then clean active calls
        And User navigate to dashboard page
        Then user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'second' window
        And user state should be 'ready' in 'second' window
        Then user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'No' campaign with 'InboundQueue_2' queue in 'third' window
        And user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'second' window
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        And user with in the modal select 'Agent_2'
        Then validate the notification is displayed 'You were added to "InboundQueue_1".' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'third' window
        And let user wait for '3' seconds
        And user disconnects the call in 'third' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And user state should be 'ready' in 'third' window
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
        And user disconnects the call in 'second' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        Then close the 'second' window session
        Then close the 'third' window session

    @6722
    Scenario:Dashboard - Add and remove an agent to a queue
        When User login to the platform as 'admin'
        Then clean active calls
        And User navigate to dashboard page
        Then user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'second' window
        And user state should be 'ready' in 'second' window
        Then user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'No' campaign with 'InboundQueue_2' queue in 'third' window
        And user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'second' window
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        And user with in the modal select 'Agent_2'
        Then validate the notification is displayed 'You were added to "InboundQueue_1".' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking' in 'third' window
        And let user wait for '3' seconds
        And user disconnects the call in 'third' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And user state should be 'ready' in 'third' window
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
        And user disconnects the call in 'second' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        Then User navigate to dashboard page
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        And user with in the modal select 'Agent_2'
        Then validate the notification is displayed 'You were removed from "InboundQueue_1"' in 'third' window
        Then close the 'second' window session
        Then close the 'third' window session

    @6723
    Scenario:Dashboard - No agent login to queue
        When User login to the platform as 'admin'
        Then clean active calls
        And User navigate to dashboard page
        Then user login to the platform with 'Agent_1' account in 'second' window
        Then user login to the platform with 'Agent_2' account in 'third' window
        Then user click on the Agent List icon of the queue 'InboundQueue_1'
        Then user validate group and name modal is not visible
        Then close the 'second' window session
        Then close the 'third' window session

    @6340
    Scenario:Dashboard Agents Webchat-Break
        Given User login to the platform as 'Supervisor_1'
        And Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user deletes all previous breaks
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 60      |
        When user login to the platform with 'Agent_1' account in 'second' window
        Then agent login the webChat channel
        And request the break with auth 'false' in 'second' window
        Then user click on return button of webchat in 'second' window
        And User navigate to dashboard page
        And User selects the agent tab
        And User selects the 'webchat' tab
        Then verify agent is in 'Break' state in 'webchat' tab
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact       | email                   |
            | second | Sakshi Sharma | sharma.sakshi@tftus.com |
        And select received message in 'second' window
        Then verify agent is in 'Break' state in 'webchat' tab
        Then Access the 'Profile' menu in 'second' window
        Then verify agent is in 'Break' state in 'webchat' tab
        And request the break with auth 'false' in 'second' window
        And let user wait for '5' seconds in 'second' window
        Then verify agent is in 'IDLE' state in 'webchat' tab