@agentManagement
Feature: Agent Management

    Background: user is Logged In
        Given User login to the gocontact as 'Supervisor_1'
        Then clean active calls
        And delete uuid array
        When user navigate to callbacks manager
        And user delete all scheduled callback

    @6714
    Scenario: Associate agents and queues
        And user login to the platform with 'Agent_1' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_1' queue in 'second' window
        When user login to the platform with 'Agent_5' account in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_2' queue in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user state should be 'talking' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888779    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user validate the waiting call and queue 'InboundQueue_1' in voice channel in 'second' window
        When as supervisor navigate to Agent Management sub-menu
        Then user select 'Agent Five' from agents_table
        And user select 'InboundQueue_1' from queue table
        And click on Associate Agents & Queues button
        And verify the notification 'The agents are now associated to the chosen queues.'
        When let user wait for '5' seconds in 'third' window
        Then user state should be 'talking' in 'third' window
        And client Hangup the '1' call via API
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888779      |
            | agentName   | Agent_5        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | REMOTE         |
        Then user validate the no waiting call in voice channel in 'second' window
        And client Hangup the '0' call via API
        When let user wait for '5' seconds in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And close the 'second' window session
        And close the 'third' window session
        Then clear uuid history


    @6717
    Scenario: Disassociate agents and queues
        And user login to the platform with 'Agent_1' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_1' queue in 'second' window
        When user login to the platform with 'Agent_5' account in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_2' queue in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        When let user wait for '5' seconds in 'second' window
        Then user state should be 'talking' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888778    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user validate the waiting call and queue 'InboundQueue_1' in voice channel in 'second' window
        When as supervisor navigate to Agent Management sub-menu
        Then user select 'Agent Five' from agents_table
        And user select 'InboundQueue_1' from queue table
        And click on Associate Agents & Queues button
        And verify the notification 'The agents are now associated to the chosen queues.'
        When let user wait for '3' seconds in 'third' window
        Then user state should be 'talking' in 'third' window
        And client Hangup the '1' call via API
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        Then user validate the no waiting call in voice channel in 'second' window
        And client Hangup the '0' call via API
        When let user wait for '5' seconds in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        Then clear uuid history
        When as supervisor navigate to Agent Management sub-menu
        And click on Dessociate Agents & Queues button
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user state should be 'talking' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888778    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user validate the no waiting call in voice channel in 'third' window
        And client Hangup the '0' call via API
        When let user wait for '5' seconds in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        When let user wait for '5' seconds in 'second' window
        Then user state should be 'talking' in 'second' window
        And client Hangup the '1' call via API
        When let user wait for '5' seconds in 'second' window
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And close the 'second' window session
        And close the 'third' window session
        Then clear uuid history


    @6715
    Scenario: Keep the association permanently
        And user login to the platform with 'Agent_1' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_1' queue in 'second' window
        When user login to the platform with 'Agent_5' account in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_2' queue in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user state should be 'talking' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888778    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user validate the waiting call and queue 'InboundQueue_1' in voice channel in 'second' window
        When as supervisor navigate to Agent Management sub-menu
        Then user select 'Agent Five' from agents_table
        And user select 'InboundQueue_1' from queue table
        And user select the permanent option
        And click on Associate Agents & Queues button
        And verify the notification 'The agents are now associated to the chosen queues.'
        When let user wait for '3' seconds in 'third' window
        Then user state should be 'talking' in 'third' window
        And client Hangup the '1' call via API
        When let user wait for '3' seconds in 'third' window
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888778      |
            | agentName   | Agent_5        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | REMOTE         |
        Then user validate the no waiting call in voice channel in 'second' window
        And client Hangup the '0' call via API
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And user logout from Voice Channel in 'third' window
        When let user wait for '3' seconds in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        Then validate the Agent_5 keeps access to 'InboundQueue_1' in 'third' window
        And close the 'second' window session
        And close the 'third' window session
        Then clear uuid history


    @6718
    Scenario: Remove permanent option
        And user login to the platform with 'Agent_1' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_1' queue in 'second' window
        When user login to the platform with 'Agent_5' account in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_2' queue in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user state should be 'talking' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888778    | 1        |
        When let user wait for '3' seconds in 'second' window
        Then user validate the waiting call and queue 'InboundQueue_1' in voice channel in 'second' window
        When as supervisor navigate to Agent Management sub-menu
        Then user select 'Agent Five' from agents_table
        And user select 'InboundQueue_1' from queue table
        And user select the permanent option
        And click on Associate Agents & Queues button
        And verify the notification 'The agents are now associated to the chosen queues.'
        When let user wait for '3' seconds in 'third' window
        Then user state should be 'talking' in 'third' window
        And client Hangup the '1' call via API
        When let user wait for '3' seconds in 'third' window
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel      | Inbound        |
            | inboundQueue | InboundQueue_1 |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 999888778      |
            | agentName   | Agent_5        |
            | callOutcome | Ok             |
            | owner       | InboundQueue_1 |
            | termReason  | REMOTE         |
        Then user validate the no waiting call in voice channel in 'second' window
        And client Hangup the '0' call via API
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        And user logout from Voice Channel in 'third' window
        When let user wait for '3' seconds in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        Then validate the Agent_5 keeps access to 'InboundQueue_1' in 'third' window
        When as supervisor navigate to Agent Management sub-menu
        Then user select 'Agent Five' from agents_table
        And user select 'InboundQueue_1' from queue table
        And user select the permanent option
        And click on Dessociate Agents & Queues button
        When let user wait for '3' seconds in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        Then validate the Agent_5 should not have access to 'InboundQueue_1' in 'third' window
        And close the 'second' window session
        And close the 'third' window session
        Then clear uuid history