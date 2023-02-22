@scriptBuilder
Feature: Script Builder

    Background: user is Logged In
        Given User login to the platform as 'admin'
        Then clean active calls
        And user delete the stored database

    @1032
    Scenario: Verify user can create new script and validate its rules
        When user selects script builder from menu
        And user create a new script for 'validate script'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user navigates to general rules, select rule type 'validatescript' ,event 'onsave' and adds rule details:
            | ruleName | ruleTest1 |
        Then verify general rule 'ruleTest1'
        When user adds 2 elements 'oneresponse' and 'textinput' to the script
        And user adds rules to oneresponse
            | event    | value_select |
            | value    | Yes          |
            | type     | generalrules |
            | ruleName | ruleTest1    |
            | status   | true         |
        And user adds rules to textinput
            | isRequired | true |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        And user selects 'Yes' in one response and validate the script
        Then verify error message is displayed 'Correct the marked fields'

    @1033
    Scenario: Verify user can create new script ,add rules and send emails
        When user selects script builder from menu
        And user create a new script for 'send email'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user navigates to general rules, select rule type 'sendemail' ,event 'onsave' and adds rule details:
            | ruleName     | ruleTest1             |
            | to           | gocontact@getnada.com |
            | ticketstatus | NEW                   |
            | queue        | TicketQueue_1         |
            | mailbox      | MailboxOut_1          |
            | sendTicketID | false                 |
            | subject      | SubjectChild_1        |
            | template     | TicketsTemplate_1     |
        Then verify general rule 'ruleTest1'
        When user add 1 element 'oneresponse' to the script
        And user adds rules to oneresponse
            | event    | value_select |
            | value    | Yes          |
            | type     | generalrules |
            | ruleName | ruleTest1    |
            | status   | true         |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        And user selects 'Yes' in one response and click new script
        Then verify success message is displayed 'The Script succeeded to save'
        Then verify email received at destination email address from email with subject 'SubjectChild_1'


    @1034
    Scenario: Verify user can create new script ,tickets and add rules
        When user selects script builder from menu
        And user create a new script for 'create ticket'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user navigates to general rules, select rule type 'maketicket' ,event 'onsave' and adds rule details:
            | ruleName          | ruleTest1             |
            | from              | gocontact@getnada.com |
            | ticketStatus      | pending               |
            | queue             | TicketQueue_1         |
            | subject           | SubjectChild_1        |
            | template          | TicketsTemplate_1     |
            | autoReply         | Yes                   |
            | autoReplyMailbox  | MailboxOut_1          |
            | autoReplyTemplate | TicketsTemplate_1     |
        Then verify general rule 'ruleTest1'
        When user add 1 element 'oneresponse' to the script
        And user adds rules to oneresponse
            | event    | value_select |
            | value    | Yes          |
            | type     | generalrules |
            | ruleName | ruleTest1    |
            | status   | true         |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | gocontact@getnada.com |
            | phone    | 8901264184            |
            | queue    | TicketQueue_1         |
            | subject  | SubjectChild_1        |
            | template | TicketsTemplate_1     |
        And user create and open that ticket 'gocontact@getnada.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        And user selects 'Yes' in one response and click new script
        Then verify success message is displayed 'The Script succeeded to save'
        Then verify ticket counter was updated successfully with queue 'TicketQueue_1'
        Then verify the 'PENDING' state of ticket 'gocontact@getnada.com'
        Then verify email received at destination email address with subject 'SubjectChild_1'

    @1035
    Scenario: Verify user can add rules of external service with on save
        When user selects script builder from menu
        When user create a new script for 'external service save'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user navigates to general rules, select rule type 'externalservice' ,event 'onsave' and adds rule details:
            | ruleName        | ruleTest1                                |
            | externalService | post                                     |
            | bodyType        | json                                     |
            | URL             | https://testesqa.free.beeceptor.com/post |
            | field           | code                                     |
            | value           | 123                                      |
        Then verify general rule 'ruleTest1'
        When user add 1 element 'oneresponse' to the script
        And user adds rules to oneresponse
            | event    | value_select |
            | value    | Yes          |
            | type     | generalrules |
            | ruleName | ruleTest1    |
            | status   | true         |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        And user selects 'Yes' in one response and click new script
        Then verify success message is displayed 'The Script succeeded to save'

    @1036
    Scenario: Verify user can add rules of external service with on action
        When user selects script builder from menu
        And user create a new script for 'external service action'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 3 'textinput' elements to the script
            | title       |
            | First Phone |
            | Name        |
            | Email       |
        When user navigates to general rules, select rule type 'externalservice' ,event 'onaction' and adds rule details:
            | ruleName       | ruleTest1                                         |
            | method         | get                                               |
            | onActionURL    | https://testesqa.free.beeceptor.com/arrayOfArrays |
            | authentication | basic                                             |
            | username       | user                                              |
            | password       | pass                                              |
            | scriptElement1 | @1@                                               |
            | property1      | 1                                                 |
            | scriptElement2 | @2@                                               |
            | property2      | 4                                                 |
        Then verify general rule 'ruleTest1'
        When user select element and user adds rules
            | label    | First Phone  |
            | event    | answer       |
            | type     | generalrules |
            | ruleName | ruleTest1    |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input 'First Phone' with '2345675542' and press enter
        Then select api query from results
        Then verify success message is displayed 'Data received successfully'
        Then verify text input values
            | labelName | labelValue            |
            | Name      | Phineas Kempe         |
            | Email     | pkempe0@homestead.com |

    @1039
    Scenario: Verify user can add rules to show element
        When user selects script builder from menu
        And user create a new script for 'show element'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 2 elements 'oneresponse' and 'textinput' to the script
        And user adds rules to oneresponse
            | event  | value_select         |
            | value  | Yes                  |
            | type   | show                 |
            | target | 1#Text → Label here. |
            | status | true                 |
        And user adds rules to textinput
            | isHidden | true |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        And user selects 'Yes' in one response
        And verify text input is 'visible' and validate the script
        Then verify success message is displayed 'Is Valid'

    @1040
    Scenario: Verify user can add rules to hide element
        When user selects script builder from menu
        And user create a new script for 'hide element'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 2 elements 'oneresponse' and 'textinput' to the script
        And user adds rules to oneresponse
            | event  | value_select         |
            | value  | Yes                  |
            | type   | hide                 |
            | target | 1#Text → Label here. |
            | status | true                 |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        And user selects 'Yes' in one response
        And verify text input is 'not visible' and validate the script
        Then verify success message is displayed 'Is Valid'

    @1041
    Scenario: Verify user can add rules to go to page
        When user selects script builder from menu
        And user create a new script for 'go to page'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user create a new page 'second page' and add element 'textinput' with title 'second'
        And user select previous page 'Homepage' and add element 'oneresponse'
        And user adds rules to oneresponse
            | event  | value_select |
            | value  | Yes          |
            | type   | goto         |
            | goto   | second page  |
            | status | true         |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        And  user selects 'Yes' in one response, fill text input 'second' with value 'second page' and validate the text and script
        Then verify success message is displayed 'Is Valid'

    @1042
    Scenario: Verify user can add rules to update contact info
        When user selects script builder from menu
        And user create a new script for 'update contact info'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user add 1 element 'textinput' to the script
        And user adds rules to textinput as
            | event        | answer         |
            | type         | update_contact |
            | contactField | Country        |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input 'India' and click new script through contact info

    @5093
    Scenario: Verify user can search in script with search mode automatic with single results
        When user selects script builder from menu
        And user create a new script for 'search in script automatic with single results'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 5 "textinput" elements to the script
            | title       |
            | Name        |
            | City        |
            | NIF         |
            | Postal Code |
            | Search      |
        When user select element postcode and configure the fields in search in script
            | searchInScript | Active    |
            | searchMode     | Automatic |
            | filterTag      | 4         |
            | filterColumn   | 3         |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input and click new script then verify message 'The Script succeeded to save'
            | labelName   | labelValue   |
            | Name        | Alberto José |
            | City        | Aveiro       |
            | NIF         | 123456789    |
            | Postal Code | 3810         |
        When user fills 'Search' with '3810' for automatic search
        Then verify last script with data is automatically selected
            | labelName   | labelValue   |
            | Name        | Alberto José |
            | City        | Aveiro       |
            | NIF         | 123456789    |
            | Postal Code | 3810         |

    @5094
    Scenario: Verify user can search in script with search mode automatic with multiple results
        When user selects script builder from menu
        And user create a new script for 'search in script automatic with multiple results'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 5 'textinput' elements to the script
            | title       |
            | Name        |
            | City        |
            | NIF         |
            | Postal Code |
            | Search      |
        When user select element postcode and configure the fields in search in script
            | searchInScript | Active    |
            | searchMode     | Automatic |
            | filterTag      | 4         |
            | filterColumn   | 3         |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input and click new script then verify message 'The Script succeeded to save'
            | labelName   | labelValue   |
            | Name        | Alberto José |
            | City        | Aveiro       |
            | NIF         | 123456789    |
            | Postal Code | 3810         |
        Then user fill text input and click new script then verify message 'The Script succeeded to save'
            | labelName   | labelValue    |
            | Name        | Matilde Lopes |
            | City        | Ilhavo        |
            | NIF         | 987654321     |
            | Postal Code | 3810          |
        When user fills 'Search' with '3810' for automatic search
        Then verify last script with data is automatically selected
            | labelName   | labelValue    |
            | Name        | Matilde Lopes |
            | City        | Ilhavo        |
            | NIF         | 987654321     |
            | Postal Code | 3810          |

    @5095
    Scenario: Verify user can search in script with search mode automatic without results
        When user selects script builder from menu
        And user create a new script for "search in script automatic without results"
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 5 "textinput" elements to the script
            | title       |
            | Name        |
            | City        |
            | NIF         |
            | Postal Code |
            | Search      |
        When user select element postcode and configure the fields in search in script
            | searchInScript | Active    |
            | searchMode     | Automatic |
            | filterTag      | 4         |
            | filterColumn   | 3         |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input and click new script then verify message 'The Script succeeded to save'
            | labelName   | labelValue   |
            | Name        | Alberto José |
            | City        | Aveiro       |
            | NIF         | 123456789    |
            | Postal Code | 3810         |
            | Search      |              |
        When user fills 'Search' with '9999' for automatic search
        Then verify error message is displayed 'No matching results were found in the script.'
        And textinput fields are empty
            | labelName   |
            | Name        |
            | City        |
            | NIF         |
            | Postal Code |

    @1045
    Scenario: Script Builder - Search In DB
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And Create New Table
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |
        When user selects script builder from menu
        And user create a new script for 'search in DB'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 2 'textinput' elements to the script
            | title |
            | Name  |
            | Age   |
        When user select text input and configure the fields in search in db
            | active        | true         |
            | searchMode    | autoComplete |
            | filterOption  | and          |
            | groupResults  | true         |
            | filterTag     | 0            |
            | filterColumn  | name         |
            | updateTag     | 0            |
            | updateColumn  | name         |
            | updateTag1    | 1            |
            | updateColumn1 | age          |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input with 'Name' 'Joana Silva' and verify 'Age' '29'
        And user validate the script
        Then verify success message is displayed 'Is Valid'

    @1037 @dialTests
    Scenario: Script Builder - General Rule - Close all contact callbacks
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to callOutcome
        Then check if outcome 'Callback' exist
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
        And user submits outcome with following configurations:
            | group   | Call Again Later |
            | outcome | Callback         |
            | option  | global           |
            | agent   |                  |
        And user logout from Voice Channel
        When user navigate to callbacks manager
        Then validate the callback is successfully scheduled for 'OutboundCampaign_1' campaign
        When user selects script builder from menu
        And user create a new script for 'close all contact'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user navigates to general rules, select rule type 'closeallcontactcallbacks' ,event 'onsave' and adds rule details:
            | ruleName | ruleTest1 |
        Then verify general rule 'ruleTest1'
        When user add 1 element 'oneresponse' to the script
        And user adds rules to oneresponse
            | event    | value_select |
            | value    | Yes          |
            | type     | generalrules |
            | ruleName | ruleTest1    |
            | status   | true         |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        When user navigates to script tab in voice channel and select the script
        And user selects 'Yes' in one response and validate the script
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user navigate to callbacks manager
        Then validate the callback is successfully deleted or have no data available
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
        And select the callback tab and validate the scheduled callback is in the deleted state

    @1038
    Scenario: Script Builder - General Rule - Automatic transfer to IVR
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user selects script builder from menu
        And user create a new script for 'automaticTransferToIVR'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user navigates to general rules, select rule type 'automaticTransferToIVR' ,event 'onCallEnd' and adds rule details:
            | ruleName | ruleTest1 |
            | ivrMenu  | IVR_1     |
        Then verify general rule 'ruleTest1'
        When user add 1 element 'oneresponse' to the script
        And user adds rules to oneresponse
            | event       | value_select |
            | value       | Yes          |
            | type        | generalrules |
            | ruleName    | ruleTest1    |
            | notifyAgent | true         |
            | status      | true         |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        When user navigates to script tab in voice channel and select the script
        And user selects 'Yes' in one response
        And validate the notification 'after hanging up, the call will be automatically transferred to an IVR.'
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
            | termReason  | TRANSFER           |

    @1044 @dialTests
    Scenario: Script Builder - Recording call (manual control)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user selects script builder from menu
        And user create a new script for 'callRecordingManualControl'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 2 elements 'startRecording' and 'stopRecording' to the script
        And select the 'startRecording' element
        And configure the items with following configurations:
            | title            | Start recording |
            | fileName         | script_write    |
            | hidden           |                 |
            | recordingElement |                 |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        Then user select 'startRecording' button
        And user select 'stopRecording' button
        And validate the notification is displayed with 1 recording
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
        And select the script tab and validate the recording made through the script 'script_write.mp3' are available

    @1043
    Scenario: Script Builder - Rule - Stop auto-wrap up
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And toggle 'on' the 'max' Wrap Up Time
        Then user set 'max' Wrap Up Time '10' sec
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user selects script builder from menu
        And user create a new script for 'stopAutoWrapUp'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user add 1 element 'oneresponse' to the script
        And user adds rules to oneresponse
            | event  | value_select      |
            | value  | Yes               |
            | type   | stop_auto_wrap_up |
            | status | true              |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        When user navigates to script tab in voice channel and select the script
        And user selects 'Yes' in one response and validate the script
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
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And toggle 'off' the 'max' Wrap Up Time
        Then user finish the campaign editing

    @6255
    Scenario: Script Builder - General Rule - Pre-Select outcomes
        When user selects script builder from menu
        And user create a new script for 'preSelect Outcome'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user navigates to general rules, select rule type 'preselectoutcome' ,event 'onAction' and adds rule details:
            | ruleName    | ruleTest1          |
            | owner       | OutboundCampaign_1 |
            | outcomeName | Ok                 |
        Then verify general rule "ruleTest1"
        When user add 1 element "oneresponse" to the script
        And user adds rules to oneresponse
            | event    | value_select |
            | value    | Yes          |
            | type     | generalrules |
            | ruleName | ruleTest1    |
            | status   | true         |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        When user navigates to script tab in voice channel and select the script
        And user selects 'Yes' in one response and validate the script
        When user disconnects the call
        And user state should be 'outcomes'
        Then verfiy the general rule outcome 'Ok' is selected and submit the outcome
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

    @5096 @dialTests
    Scenario: Script Builder - Call Recording (Element visibility)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user selects script builder from menu
        And user create a new script for 'callRecordingAutomatic'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 2 elements 'startRecording' and 'oneresponse' to the script
        And select the 'startRecording' element
        And configure the items with following configurations:
            | title            | Start recording |
            | fileName         | script_write    |
            | hidden           | true            |
            | recordingElement | automatic       |
        And user adds rules to oneresponse
            | event  | value_select               |
            | value  | Yes                        |
            | type   | show                       |
            | target | 0#Start Recording Button → |
            | status | true                       |
        And user adds rules to oneresponse
            | event  | value_select               |
            | value  | No                         |
            | type   | hide                       |
            | target | 0#Start Recording Button → |
            | status | false                      |
        And configure the oneresponse items with following configurations:
            | title | Do you want this call to be recorded? |
            | value | Yes,No                                |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects 'Yes' in one response
        And validate 'Start recording' element with message 'The call recording script_write started automatically' and information 'The call recording script_write is ongoing'
        And let user wait for '5' seconds
        And user selects 'No' in one response
        And validate 'Stop recording' element with message 'The recording of the call "script_write" is muted' and information ''
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
        And select the script tab and validate the recording made through the script 'script_write.mp3' are available

    @5092
    Scenario: Verify user can search in script with search mode manual without results
        When user selects script builder from menu
        And user create a new script for 'search in script manual without results'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 4 'textinput' elements to the script
            | title       |
            | Name        |
            | City        |
            | NIF         |
            | Postal Code |
        When user select element postcode and configure the fields in search in script
            | searchInScript | Active      |
            | searchMode     | Manual      |
            | name           | Name        |
            | city           | City        |
            | nif            | NIF         |
            | postalCode     | postal code |
            | filterTag      | 3           |
            | filterColumn   | 3           |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input and click new script then verify message 'The Script succeeded to save'
            | labelName   | labelValue   |
            | Name        | Alberto José |
            | City        | Aveiro       |
            | NIF         | 123456789    |
            | Postal Code | 3810         |
        When user fills 'Postal Code' with '6980' and search
        Then verify error message is displayed 'No matching results were found in the script.'

    @1046
    Scenario: Verify user can search in script with search mode manual along with results
        When user selects script builder from menu
        And user create a new script for 'search in script manual with results'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | ticketQueueName  | TicketQueue_1        |
            | databaseName     | New Leads Outbound 1 |
            | hiddenFiles      | true                 |
            | defaultPageName  | Homepage             |
        When user adds 4 'textinput' elements to the script
            | title       |
            | Name        |
            | City        |
            | NIF         |
            | Postal Code |
        When user select element postcode and configure the fields in search in script
            | searchInScript | Active      |
            | searchMode     | Manual      |
            | name           | Name        |
            | city           | City        |
            | nif            | NIF         |
            | postalCode     | postal code |
            | filterTag      | 3           |
            | filterColumn   | 3           |
        When user navigates to create ticket page
        And user creates a new ticket with following details:
            | email    | arora.ankush@tftus.com |
            | phone    | 8901264184             |
            | queue    | TicketQueue_1          |
            | subject  | SubjectChild_1         |
            | template | TicketsTemplate_1      |
        And user create and open that ticket 'arora.ankush@tftus.com' in 'TicketQueue_1'
        When user navigates to script and select the script
        Then user fill text input and click new script then verify message 'The Script succeeded to save'
            | labelName   | labelValue   |
            | Name        | Alberto José |
            | City        | Aveiro       |
            | NIF         | 123456789    |
            | Postal Code | 3810         |
        When user fills 'Postal Code' with '3810' and search
        Then user selects record
        Then verify last script with data is automatically selected
            | labelName   | labelValue   |
            | Name        | Alberto José |
            | City        | Aveiro       |
            | NIF         | 123456789    |
            | Postal Code | 3810         |

    @6661 @dialTests
    Scenario: Schedule callback for other agents in script
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'power'
        Then user finish the campaign editing
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 2                | 0          | 1            |
        When user selects script builder from menu
        And user create a new script for 'schedule callback for other agents in script'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user add 1 element 'callback' to the script
        And select the 'callback' element
        And user adds rules to callback
            | callbackType | To another agent   |
            | campaign     | OutboundCampaign_1 |
            | dbIndex      | 0                  |
            | agent        | Agent Two          |
            | maxDays      | 4                  |
            | startTime    | 00:00              |
            | endTime      | 23:00              |
            | weekdays     | all                |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects time and enters comment 'To another agent' in callback schedule element
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And let user wait for '300' seconds
        And I re-login using 'Agent_2' account
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then user state should be 'dialer-preview'
        And user make a call
        And user state should be 'talking'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user dial the number '910261828' in ready state
        Then user state should be 'manual-preview'
        When user click on history tab
        And user validate that in the call section comment 'To another agent' is correctly filled
        And cancel the 'manual preview' state in 'same' window
        And I re-login using 'admin' account
        When user access the reports designer menu
        Then user enters csv designer details
            | source   | Campaigns         |
            | template | Template#1        |
            | dataType | Calls with Script |
        When user selects script tab and add script to template
        And user downloads report
        Then validate csv contains callback information:
            | Callback_schedule | Today            |
            | Agent             | Agent_2          |
            | Comments          | To another agent |
            | rows              | 1                |
        Then user deletes previously added script from template

    @6660 @dialTests
    Scenario: Schedule callback for other agents in script
        When user navigates to voice manager
        And user edits the campaign 'OutboundCampaign_1'
        Then user navigates to dialer
        And select the dialer type 'power-preview'
        Then user finish the campaign editing
        When Navigate to Database Manager
        And Create Database
            | browseFile            | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                | 0          | 1            |
        Then load the database
            | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | fixtures/database.csv | 1                    | 2                | 0          | 1            |
        When user selects script builder from menu
        And user create a new script for 'schedule personal callback in script'
            | campaignName    | OutboundCampaign_1 |
            | defaultPageName | 1                  |
        When user add 1 element 'callback' to the script
        And select the 'callback' element
        And user adds rules to callback
            | callbackType | Personal |
            | maxDays      | 4        |
            | startTime    | 00:00    |
            | endTime      | 23:00    |
            | weekdays     | all      |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then user state should be 'dialer-preview'
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects time and enters comment 'Personal Callback' in callback schedule element
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user state should be 'ready'
        And let user wait for '300' seconds
        Then user state should be 'dialer-preview'
        And user make a call
        And user state should be 'talking'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user dial the number '910261828' in ready state
        Then user state should be 'manual-preview'
        When user click on history tab
        And user validate that in the call section comment 'Personal Callback' is correctly filled
        And cancel the 'manual preview' state in 'same' window
        When user access the reports designer menu
        Then user enters csv designer details
            | source   | Campaigns         |
            | template | Template#1        |
            | dataType | Calls with Script |
        When user selects script tab and add script to template
        And user downloads report
        Then validate csv contains callback information:
            | Callback_schedule | Today             |
            | Agent             | admin             |
            | Comments          | Personal Callback |
            | rows              | 1                 |
        Then user deletes previously added script from template

    @612 @dialTests
    Scenario: Validation by Javascript - Filling the element with invalid value
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user selects script builder from menu
        And user create a new script for 'javascript invalid value'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        And user add 1 element 'textinput' to the script
        And user adds rules to textinput
            | title      | CPE                    |
            | validation | Validate by JavaScript |
            | script     | fixtures/Script1.txt   |
        Then verify success message is displayed 'The element "CPE" was successfully saved.'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user fills the voice script with:
            | textinput | PZ0002123456789123AN |
        And user validate the script
        Then verify success message is displayed 'Correct the marked fields'
        Then validate tooltip message 'Invalid value provided' is displayed
        And user disconnects the call
        Then user state should be 'outcomes'
        When user submits 'Call Again Later' outcome and select 'Ok' outcome name

    @613 @dialTests
    Scenario: Validation by Javascript - Completing the element with a valid value
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user selects script builder from menu
        And user create a new script for 'javascript valid value'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        And user add 1 element 'textinput' to the script
        And user adds rules to textinput
            | title      | CPE                    |
            | validation | Validate by JavaScript |
            | script     | fixtures/Script2.txt   |
        Then verify success message is displayed 'The element "CPE" was successfully saved.'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user fills the voice script with:
            | textinput | PT0002123456789123AN |
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        Then user state should be 'outcomes'
        When user submits 'Call Again Later' outcome and select 'Ok' outcome name
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
        Then select the script tab and validate the script is completed with 'The page is validated'