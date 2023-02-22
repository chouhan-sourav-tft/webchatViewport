@breaks
Feature: Breaks

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user deletes all previous breaks

    @867
    Scenario: Request break - Without authorization
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 60      |
        Then Add agent 'Agent One' to the group
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And request the break with auth 'false'

    @870
    Scenario: Request break - With authorization - Approved
        When Create a new break with following configurations:
            | breakName | auth | startTime | endTime | maxTime |
            | Break_AT  | true | 00:00     | 23:00   | 60      |
        Then Add agent 'Agent One' to the group
        When user login to the platform with 'Agent_2' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        And request the break with auth 'true' in 'second' window
        And admin 'approves' break request
        Then agent is notified about break 'approval' in 'second' window
        Then User logout with current session in 'second' window

    @871
    Scenario: Request break - With authorization - Denied
        When Create a new break with following configurations:
            | breakName | auth | startTime | endTime | maxTime |
            | Break_AT  | true | 00:00     | 23:00   | 60      |
        Then Add agent 'Agent One' to the group
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        And request the break with auth 'true' in 'second' window
        And admin 'rejected' break request
        Then agent is notified about break 'rejection' in 'second' window
        Then User logout with current session in 'second' window

    @872
    Scenario: Max users on Break
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 60      |
        And Set max user on Break to '1'
        Then Add agent 'Agent One' to the group
        And Add agent 'Agent Two' to the group
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And request the break with auth 'false'
        And user login to the platform with 'Agent_2' account in 'second' window
        And request the break on max user limit
        Then I re-login using 'admin' account
        And Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And Set max user on Break to '10'

    @876
    Scenario: Expired break time
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 1       |
        Then Add agent 'Agent Two' to the group
        And User logout with current session
        When User login to the platform as 'Agent_2'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And request the break with auth 'false'
        Then validate exceed paused time

    @873
    Scenario: Request break during a call
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 60      |
        Then Add agent 'Agent One' to the group
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user dial the number '990000004' in ready state
        And user make a call
        And user state should be 'talking'
        And request the break with auth 'false'
        Then user should get the notification
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then user state should be 'break'

    @6347
    Scenario: Break configuration - Select "Ignore max users global"
        When user assign agents to the group
            | agent | Agent One, Agent Two, Agent Three, Agent Four |
        And user clicks add break button
        Then user validates that the number of Max users global are '10' by default
        And user checks ignore max global option and selects '3' custom max users
        And Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime | breakBtn |
            | Break_1   | false | 09:00     | 18:00   | 02      | false    |
        Then user verify that 'ignore the global maximum limit of' notification is displayed
        Then User logout with current session
        When User login to the platform as 'Agent_1'
        And request the break with auth 'false'
        When user login to the platform with 'Agent_2' account in 'second' window
        And request the break with auth 'false' in 'second' window
        When user login to the platform with 'Agent_3' account in 'third' window
        And request the break with auth 'false' in 'third' window
        When user login to the platform with 'Agent_4' account in 'fourth' window
        And request the break with auth 'false' in 'fourth' window
        Then user verify that 'max agents on break has been reached' notification is displayed

