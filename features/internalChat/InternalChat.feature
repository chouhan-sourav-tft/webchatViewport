@internalChat
Feature: Internal chat tests

    @858
    Scenario: Agent - No access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'no' chat access
        And user save the settings
        And I re-login using 'Agent_1' account
        And user select messaging option
        Then user should not have chat access

    @859
    Scenario: Agent - Simple access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'simple' chat access
        And user save the settings
        And let user wait for '30' seconds
        Then verify admin is online for agent account

    @860
    Scenario: Agent - Super access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'supervisor' chat access
        And user save the settings
        And let user wait for '30' seconds
        And I re-login using 'Agent_1' account
        Then verify agent is online for another agent account

    @861
    Scenario: Send broadcast message - All
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user enables broadcast messages
        And user save the settings
        And I re-login using 'Agent_1' account
        And user selects send broadcast message option
        And user selects send broadcast message to all agent option
        And user verifies broadcast message is send to agent

    @862
    Scenario: Send broadcast message - Particular Agent
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user enables broadcast messages
        And user save the settings
        And I re-login using 'Agent_1' account
        And user selects send broadcast message option
        And user selects send broadcast message to particular 'admin' agent option
            | subject |  |
            | message |  |
        And user verifies broadcast message is send to agent

    @863
    Scenario: Send private message
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'supervisor' chat access
        And user save the settings
        And user login to the platform with 'Agent_1' account in 'second' window
        And user select messaging option in 'second' window
        And user selects user from users tab in 'second' window
        And user send a message in 'second' window
        Then user should see the sent message
   @6260
    Scenario: Mark all notifications as read - Broadcast (Particular agent message)
        Given User login to the platform as 'admin'
        Then clean active calls
        When user selects send broadcast message option
        Then user login to the platform with 'Agent_1' account in 'second' window
        Then user get the counter of message in 'second' window
        And user selects send broadcast message to particular 'Agent One' agent option
            | subject | Quote of the day                                                                     |
            | message | Learn as if you will live forever, live like you will die tomorrow. — Mahatma Gandhi |
        Then user verify counter is increased in 'second' window
        Then user access the notification in 'second' window
        And user confirm that the top notification is unread in 'second' window
        And user confirm mark all read button is enabled and click it in 'second' window
        Then user confirm that mark all read button is disabled in 'second' window
        And user verify message is visible 'There are no unread notifications' in 'second' window
        Then user confirm that the notifications counter is no longer presented in 'second' window

    @6261
    Scenario: Mark all notifications as read - Broadcast (All agent message)
        Given User login to the platform as 'admin'
        Then clean active calls
        When user selects send broadcast message option
        Then user login to the platform with 'Agent_1' account in 'second' window
        Then user get the counter of message in 'second' window
        And user selects send broadcast message to particular 'All' agent option
            | subject | Quote of the day                                                                     |
            | message | Learn as if you will live forever, live like you will die tomorrow. — Mahatma Gandhi |
        Then user verify counter is increased in 'second' window
        Then user access the notification in 'second' window
        And user confirm that the top notification is unread in 'second' window
        And user confirm mark all read button is enabled and click it in 'second' window
        Then user confirm that mark all read button is disabled in 'second' window
        And user verify message is visible 'There are no unread notifications' in 'second' window
        Then user confirm that the notifications counter is no longer presented in 'second' window

    @6278
    Scenario: Mark all notifications as read - Break authorization
        Given User login to the platform as 'admin'
        Then clean active calls
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user deletes all previous breaks
        Then user get the counter of message
        When Create a new break with following configurations:
            | breakName | auth | startTime | endTime | maxTime |
            | Break_AT  | true | 00:00     | 23:00   | 60      |
        Then Add agent 'Agent One' to the group
        When user login to the platform with 'Agent_1' account in 'second' window
        And request the break with auth 'true' in 'second' window
        Then user verify counter is increased
        Then user access the notification
        And user confirm that the top notification is unread
        And user confirm mark all read button is enabled and click it
        Then user confirm that mark all read button is disabled
        And user verify message is visible 'There are no unread notifications'
        Then user confirm that the notifications counter is no longer presented

    @6280
    Scenario: Mark all notifications as read - Suggestion
        Given User login to the platform as 'Supervisor_1'
        Then clean active calls
        Then user get the counter of message
        When I re-login using 'Agent_1' account
        And Access the 'Agent Quality' menu
        And Select 'Suggestion' tab from agent quality page
        And user make a suggest message
        And I re-login using 'Supervisor_1' account
        Then user verify counter is increased
        When user access the notification
        Then user confirm that the top notification is unread
        And user confirm mark all read button is enabled and click it
        Then user confirm that mark all read button is disabled
        And user verify message is visible 'There are no unread notifications'
        Then user confirm that the notifications counter is no longer presented
        