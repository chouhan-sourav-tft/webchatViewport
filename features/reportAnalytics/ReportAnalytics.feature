@reportAnalytics
Feature: Report Analytics

    Background: user is Logged In
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database
        And delete uuid array
        When user navigate to callbacks manager
        And user delete all scheduled callback

    @1313
    Scenario: Report Designer - Agent on Hook Attemps
        When Access the 'Users & Groups' menu
        And user select 'Agent One' from users_table
        Then user update user setting with following configurations
            | agentOnHook | true |
            | break       |      |
        Then I re-login using 'Agent_1' account
        Then login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '80942174119' in ready state
        And user make a call
        And user state should be 'talking'
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user state should be 'ready'
        Then I re-login using 'admin' account
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Agent on Hook Attempts |
            | template | New template           |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | on_hook_attempt            |
            | targetName | Agent One                  |
            | dataType   | All attempts by entry date |
            | dataTypeID | OnHookAttempt              |
        And user downloads report
        Then validate csv contains following information:
            | rows            | 1                  |
            | Agent_Full_Name | Agent One          |
            | Username        | Agent_1            |
            | Phone           | 80942174119        |
            | Extension       | 100                |
            | Owner_Name      | OutboundCampaign_1 |
            | Result          | Answered           |
            | sortBy          | Date_of_try        |
        Then user delete previously added template

    @1301
    Scenario: Report Designer:Inbound Call - All Calls
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '3' seconds
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Queues       |
            | template | New template |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | queue          |
            | targetName | InboundQueue_1 |
            | dataType   | All calls      |
            | dataTypeID | Calls          |
        And user downloads report
        Then validate csv contains following information:
            | rows               | 1                     |
            | Agent_First_Name   | System                |
            | Agent_Last_Name    | Administrator         |
            | Agent_User_Name    | admin                 |
            | Call_Outcome_Group | Customer Hangup       |
            | Call_Outcome_name  | Ok                    |
            | Call_Type          | inbound               |
            | Queue_Name         | InboundQueue_1        |
            | Queue_Position     | 0                     |
            | Phone              | 999888777             |
            | DDI                | 300501602             |
            | Hangup_cause       | NORMAL_CLEARING       |
            | Hold_Time          | 0                     |
            | Owner_ID           | 1                     |
            | Owner_Type         | queue                 |
            | Term_Reason        | AGENT                 |
            | User_group         | System Administrators |
            | sortBy             | Call_end              |
        Then user delete previously added template

    @1331 @dialTests
    Scenario: Report Designer - Quality by Audit date
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user access the Quality Script builder menu
        Then user create a new script for 'ScriptQuality_1'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user adds 2 elements 'oneresponse' and 'textinput' to the script
        And user adds rules to textinput
            | isRequired | true |
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
            | oneresponse | Yes  |
            | checks      |      |
            | textinput   | test |
        And user selects 'Complete' option
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Quality      |
            | template | New template |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | quality               |
            | targetName |                       |
            | dataType   | Quality by Audit date |
            | dataTypeID | Quality               |
        And user downloads report
        Then validate csv contains following information:
            | rows                 | 1                     |
            | Agent_First_Name     | System                |
            | Agent_Last_Name      | Administrator         |
            | Agent_User_Name      | admin                 |
            | Username             | admin                 |
            | Call_Outcome_Group   | Call Again Later      |
            | Call_Outcome_name    | Ok                    |
            | Call_Type            | manual                |
            | Call_Subtype         | manual                |
            | DDI                  | 300501602             |
            | Hangup_cause         | NORMAL_CLEARING       |
            | Contact_Outcome_name | Ok                    |
            | Lead_Status          | closed                |
            | Max_tries_reached    | false                 |
            | Term_Reason          | AGENT                 |
            | User_group           | System Administrators |
            | sortBy               | Call_end              |
        Then user delete previously added template

    @1298 @dialTests
    Scenario: Report Designer - Campaigns - Create Template (All Calls)
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
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the reports designer menu
        Then user enters csv designer details
            | source   | Campaigns    |
            | template | New template |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | campaign           |
            | targetName | OutboundCampaign_1 |
            | dataType   | All calls          |
            | dataTypeID | Calls              |
        And user downloads report
        Then validate csv contains following information:
            | rows               | 1                    |
            | Agent_First_Name   | System               |
            | Agent_Last_Name    | Administrator        |
            | Agent_User_Name    | admin                |
            | Call_Outcome_Group | Call Again Later     |
            | Call_Outcome_name  | Ok                   |
            | Call_Type          | manual               |
            | Campaign_Name      | OutboundCampaign_1   |
            | Phone              | 8929923241           |
            | DDI                | 300501602            |
            | Hangup_cause       | NORMAL_CLEARING      |
            | Hold_Time          | 0                    |
            | Owner_ID           | 1                    |
            | Owner_Type         | campaign             |
            | Term_Reason        | AGENT                |
            | User_group         | System Administrator |
            | sortBy             | Call_end             |
        Then user delete previously added template

    @1316
    Scenario: Report Designer - Assisted Transfers - Create Template (All assisted transfer)
        When user login to the platform with 'Agent_1' account in 'second' window
        When login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_1' queue in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        When login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_2' queue in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '3' seconds
        And user click on transfer call button in 'second' window
        And user select the 'queue' transfer option in 'second' window
        And user mute the call in 'second' window
        And user transfers call to 'InboundQueue_2' queue in 'second' window
        And user makes 'Assisted Transfer' of call in 'second' window
        When let user wait for '2' seconds in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        When let user wait for '2' seconds in 'second' window
        And user disconnects the call in 'third' window
        Then user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Assisted Transfers |
            | template | New template       |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | assisted_transfer      |
            | targetName | InboundQueue_1         |
            | dataType   | All Assisted Transfers |
            | dataTypeID | Assisted               |
        And user downloads report
        Then validate csv contains following information:
            | rows                   | 1              |
            | Call_Start             |                |
            | Destination_Owner_Name | InboundQueue_2 |
            | Destination_Type       | queue          |
            | Destination_Username   | Agent_2        |
            | Original_Owner_Name    | InboundQueue_1 |
            | Term_Reason            | TRANSFER       |
            | sortBy                 | Call_start     |
        Then user delete previously added template

    @1310
    Scenario: Report Designer - Agent Events Log - Create Template
        And I re-login using 'Agent_1' account
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When User access ticket channel
        And I re-login using 'Supervisor_1' account
        When user access the reports designer menu
        Then user enters csv designer details
            | source   | Agents Events Log |
            | template | New template      |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | agents             |
            | targetName | Agent One          |
            | dataType   | All Events by Date |
            | dataTypeID | Agents             |
        And user downloads report
        Then validate csv contains following information:
            | rows            | 1            |
            | Agent_Full_Name | Agent One    |
            | Agent_Group     | Group_1      |
            | Profile_Name    | Agent Access |
            | Username        | Agent_1      |
            | sortBy          | Event_Date   |
        Then user delete previously added template

    @1322 @dialTests
    Scenario:Report Designer :  Callbacks by entry date
        When user navigate to callbacks manager
        And user delete all scheduled callback
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        Then select the dialer type 'power-preview'
        When user navigates to callOutcome
        Then check if outcome 'Callback' exist
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
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Callbacks    |
            | template | New template |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | ownerType  | Campaigns                           |
            | target     | callbacks_outbound_campaigns_select |
            | targetName | OutboundCampaign_1                  |
            | dataType   | Callbacks by entry date             |
            | dataTypeID | Callbacks                           |
        And user downloads report
        Then validate csv contains following information:
            | rows                     | 1                  |
            | Call_Outcome_Group       | Call Again Later   |
            | Active_callback          | f                  |
            | Callback_contact_phone   | 8094217411         |
            | Callback_owner_type      | campaign           |
            | Callback_Type            | global             |
            | Deleted_callback         | t                  |
            | Contact_Outcome_name     | Ok                 |
            | Original_Call_Outcome    | Callback           |
            | Original_Call_Agent      | admin              |
            | Original_Call_Owner_Name | OutboundCampaign_1 |
            | sortBy                   | Call_end           |
        Then user delete previously added template

    @1307
    Scenario:Report Designer - Ticket Agent Times
        When Delete 'MailboxIn_1' mailbox rules
        When User navigate to ticket channel and take count of NEW Tickets
        And Send email with subject as 'random'
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        And Select 'E-mail' option from Ticket actions
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Ticket Agent Times |
            | template | New template       |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | ticket_agent_times |
            | targetName | TicketQueue_1      |
            | dataType   | Ticket Events only |
            | dataTypeID | TicketAgentTimes   |
        And user downloads report
        Then validate csv contains following information:
            | rows                 | 1                    |
            | Actual_Ticket_Status | CLOSED               |
            | Agent_Full_Name      | System Administrator |
            | Username             | admin                |
            | Event_Type           | REPLYING             |
            | Queue_Name           | TicketQueue_1        |
            | sortBy               | Event_Date           |
        Then user delete previously added template

    @1304
    Scenario: Report Designer - Ticket Queue - Create Template (All Tickets by Create Date)
        When Delete 'MailboxIn_1' mailbox rules
        When User navigate to ticket channel and take count of NEW Tickets
        And Send email with subject as 'random'
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Ticket Queue |
            | template | New template |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | ticket                     |
            | targetName | TicketQueue_1              |
            | dataType   | All Tickets by Create Date |
            | dataTypeID | Tickets                    |
        And user downloads report
        Then validate csv contains following information:
            | rows                 | 1                   |
            | Actual_Ticket_Status | NEW                 |
            | Queue_Name           | TicketQueue_1       |
            | Source_Type          | MAILBOX             |
            | Ticket_Episode       | INBOUND             |
            | Visibility           | PUBLIC              |
            | sortBy               | Ticket_Created_Date |
        Then user delete previously added template

    @1328
    Scenario: Report Designer - Webchat Sessions - Create
        When user access the webChat channel
        Then user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                 |
            | second | Sidra   | ajmal.sidra@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user select the received message and reply the conservation
        Then user 'close' the conversation with subject 'WebchatChild_1'
        Then user access the reports designer menu
        And  user enters csv designer details
            | source   | Webchat Sessions |
            | template | New template     |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | webchat_sessions |
            | targetName | WebchatChannel_1 |
            | dataType   | Webchat Sessions |
            | dataTypeID | WebchatSessions  |
        And user downloads report
        Then validate csv contains following information:
            | rows               | 1                              |
            | Agent_Full_Name    | System Administrator           |
            | Chat_Status        | CLOSED                         |
            | Close_Subject      | WebchatParent_1/WebchatChild_1 |
            | Username           | admin                          |
            | Webchat_Name       | WebchatChannel_1               |
            | Webchat_Queue_Name | queue_one                      |
            | sortBy             | Message_Start_Date             |
        Then user delete previously added template

    @1325
    Scenario:Report Designer : Webchat Message
        When user access the webChat channel
        And clear webchat message
        Then user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Surbhi  | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user select the received message and reply the conservation
        Then user 'close' the conversation with subject 'WebchatChild_1'
        Then user access the reports designer menu
        And  user enters csv designer details
            | source   | Webchat Messages |
            | template | New template     |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | webchat              |
            | targetName | WebchatChannel_1     |
            | dataType   | Webchat All Messages |
            | dataTypeID | Webchat              |
        And user downloads report
        Then validate csv contains following information:
            | rows               | 6                    |
            | Agent_Full_Name    | System Administrator |
            | Username           | admin                |
            | Message_Type       | JOIN,MSG,LEAVE       |
            | Webchat_Name       | WebchatChannel_1     |
            | Webchat_Queue_Name | queue_one            |
            | sortBy             | Message_Date         |
        Then user delete previously added template

    @1334
    Scenario: Report Designer - E-Learning - Create Template (Answers by Date)
        When user access the E-Learning Script Builder menu
        And user create a new script for 'ScriptLearn_1'
            | agentName       | Agent One |
            | defaultPageName | 1         |
            | startDate       | Today     |
            | endDate         | Tomorrow  |
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
        When user login to the platform with 'Agent_1' account in 'second' window
        And user access the Agent Quality menu and select 'E-Learn' tab in 'second' window
        Then user select the script in 'second' window
        And user fills E-Learn script with following in 'second' window
            | oneresponse | Yes   |
            | checks      | Kinda |
        Then I re-login using 'Supervisor_1' account
        When user access the reports designer menu
        Then user enters csv designer details
            | source   | E-Learning   |
            | template | New template |
        Then User navigates to 'Script' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | target     | elearning       |
            | targetName |                 |
            | dataType   | Answers by Date |
            | dataTypeID | Elearning       |
        Then user select all the items from previously created script
        And user select add option
        Then user save the template
        And user downloads report
        Then validate csv contains following information:
            | rows              | 1             |
            | Total_Score       | 3             |
            | Agent_Full_Name   | Agent One     |
            | E-Learning_Status | Done          |
            | sortBy            | Response_Date |
        Then user delete previously added template

    @6994
    Scenario: Report Designer - Scripts - Create Template
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the DID '300501602'
        And user edit DID with following configurations:
            | application | Inbound Queue  |
            | destination | InboundQueue_1 |
        Then login to Voice Channel with '100' extension
        When user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        And user dial the number '700000000' in ready state
        And user make a call
        Then user state should be 'talking'
        And let user wait for '2' seconds
        When user navigates to script tab in voice channel and select the script
        And user fills the voice script with:
            | textinput | Outbound test |
        And let user wait for '1' seconds
        And user disconnects the call
        Then user state should be 'outcomes'
        When user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then user state should be 'ready'
        When client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '2' seconds
        When user navigates to script tab in voice channel and select the script
        And user fills the voice script with:
            | textinput | Inbound test |
        And let user wait for '2' seconds
        And client Hangup the '0' call via API
        Then user state should be 'outcomes'
        And let user wait for '2' seconds
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When Delete 'MailboxIn_1' mailbox rules
        When User navigate to ticket channel and take count of NEW Tickets
        And Send email with subject as 'random'
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        And Select 'E-mail' option from Ticket actions
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
            | scriptName   | Script_1          |
            | label        | Tickets test      |
        And 'send' the email response as 'wait'
        Then user access the reports designer menu
        Then user enters csv designer details
            | source   | Scripts      |
            | template | New template |
        Then User navigates to 'System' tab and select 'All'
        And user select add option
        Then User navigates to 'Script' tab and select 'All'
        And user select add option
        Then user save the template
        Then user enters csv designer details
            | scripts    | Script_1                     |
            | dataType   | All owners (voice + tickets) |
            | dataTypeID | Scripts                      |
        And user downloads report
        Then validate csv contains following information in different rows:
            | rows | Agent_First_Name | Agent_Last_Name | Agent_User_Name | Username | Call_Outcome_Group | Call_Outcome_name | Call_Type | Call_Subtype | DDI       | Hangup_cause    | Contact_Outcome_name | Lead_Status | Term_Reason | User_group            | _Label_here   | Owner_Type | sortBy      | Visibility | Actual_Ticket_Status | Owner_Name    | Source_Type |
            | 1    | System           | Administrator   | admin           | admin    | Customer Hangup    |                   | manual    | manual       | 300501602 | NORMAL_CLEARING |                      | closed      |             | System Administrators | Tickets test  | ticket     | Script_Date | PUBLIC     | PENDING              | TicketQueue_1 | MAILBOX     |
            | 2    | System           | Administrator   | admin           | admin    | Customer Hangup    | Ok                | manual    | manual       | 300501602 | NORMAL_CLEARING | Ok                   | closed      | REMOTE      | System Administrators | Inbound test  | queue      | Script_Date |            |                      |               |             |
            | 3    | System           | Administrator   | admin           | admin    | Call Again Later   | Ok                | manual    | manual       | 300501602 | NORMAL_CLEARING | Ok                   | closed      | AGENT       | System Administrators | Outbound test | campaign   | Script_Date |            |                      |               |             |
        Then user enters csv designer details
            | dataType   | Only voice owners |
            | dataTypeID | Scripts           |
        And user downloads report
        Then validate csv contains following information in different rows:
            | rows | Agent_First_Name | Agent_Last_Name | Agent_User_Name | Username | Call_Outcome_Group | Call_Outcome_name | Call_Type | Call_Subtype | DDI       | Hangup_cause    | Contact_Outcome_name | Lead_Status | Term_Reason | User_group            | _Label_here   | Owner_Type | sortBy      |
            | 1    | System           | Administrator   | admin           | admin    | Customer Hangup    | Ok                | manual    | manual       | 300501602 | NORMAL_CLEARING | Ok                   | closed      | REMOTE      | System Administrators | Inbound test  | queue      | Script_Date |
            | 2    | System           | Administrator   | admin           | admin    | Call Again Later   | Ok                | manual    | manual       | 300501602 | NORMAL_CLEARING | Ok                   | closed      | AGENT       | System Administrators | Outbound test | campaign   | Script_Date |
        Then user enters csv designer details
            | dataType   | Only tickets owners |
            | dataTypeID | Scripts             |
        And user downloads report
        Then validate csv contains following information in different rows:
            | rows | Agent_First_Name | Agent_Last_Name | Agent_User_Name | Username | Call_Outcome_Group | Call_Outcome_name | Call_Type | Call_Subtype | DDI       | Hangup_cause    | Contact_Outcome_name | Lead_Status | Term_Reason | User_group            | _Label_here  | Owner_Type | sortBy      | Visibility | Actual_Ticket_Status | Owner_Name    | Source_Type |
            | 1    | System           | Administrator   | admin           | admin    | Customer Hangup    |                   | manual    | manual       | 300501602 | NORMAL_CLEARING |                      | closed      |             | System Administrators | Tickets test | ticket     | Script_Date | PUBLIC     | PENDING              | TicketQueue_1 | MAILBOX     |
        Then user delete previously added template

