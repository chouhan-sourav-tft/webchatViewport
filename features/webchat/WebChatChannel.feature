@webchatChannel
Feature: Webchat Channel

    Background: Login
        Given User login to the GoContact dashboard as 'admin'
        Then clean active calls
        And clear webchat message
        When User deletes all previous exceptions for 'WebchatChannel_1'
        Then user reset 'WebchatChannel_1' calendar
        Then save the changes successfully
        Then user reset 'WebchatChannel_1' calendar
        Then save the changes successfully

    @6254
    Scenario: Webchat Online - Rates conversation after being closed
        Given user access the webChat Manager
        When user access 'WebchatChannel_1' select edit option
        And setting 'AllowRatingRequest' to 'true'
        When access the 'Webchat Channel'
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact       | email                   |
            | second | Sakshi Sharma | sharma.sakshi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        When user reply to received message by selecting Request rating
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'left' the conversation
        Then client sends 'rating' with '4' star and 'Nice' message
        When user switch to main tab
        When user navigate to search and search by following attributes
            | status | email                   |
            | CLOSED | sharma.sakshi@tftus.com |
        Then validate the conversation is correctly registered and in 'CLOSED' status
            | status | from          | email                   | select |
            | CLOSED | Sakshi Sharma | sharma.sakshi@tftus.com | true   |
        And verify 'rate' with '4' star and 'Nice' message

    @844
    Scenario: Webchat - Receive Message
        Given user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        Then Validate the Unread Messages column

    @845
    Scenario: Webchat - Reply message
        Given user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user select the received message and reply the conservation
        Then user 'close' the conversation with subject 'WebchatChild_1'

    @846
    Scenario: Webchat - Send message Out of Schedule without Tickets integration
        Given user access the webChat Manager
        When user open webchat plugin 'second'
        When user access 'WebchatChannel_1' select edit option and click calendar tab
        When user select a time outside the current time in calendar section
        Then save the changes successfully
        When user open previous tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify webchat error message 'Webchat is out of schedule.'
        # need to reset calender schedule so that other test do not fail
        When user reset 'WebchatChannel_1' calendar
        Then save the changes successfully

    @847
    Scenario: Webchat - Send message Exception Date with Tickets integration
        Given user access the webChat Manager
        When user access 'WebchatChannel_1' select edit option and click calendar tab
        Then user configure an exception for today and save changes
        When user goto settings and in properties configure following
            | ticketIntegration | True          |
            | chatOffline       | True          |
            | ticketQueue       | TicketQueue_1 |
        Then save the changes successfully
        When user open a duplicate tab and send a message through Webchat plugin and ticket is created
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then Validate ticket in ticket channel
        # need to delete the added exception so that other tests do not fail
        When user delete 'WebchatChannel_1' exception and reset settings
        Then save the changes successfully

    @848
    Scenario: Webchat - Message - Send as Ticket
        Given user access the webChat Manager
        When user access 'WebchatChannel_1' select edit option
        When user goto settings and in properties configure following
            | ticketIntegration | True |
        And user edit the 'queue_one' queue
        And add new agent 'Agent One'
        Then save the changes successfully
        When user access the webChat channel
        And user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user select the received message and reply the conservation
        Then user navigate to ticket channel through action and create a ticket
            | queue    | TicketQueue_1     |
            | subject  | SubjectTree_1     |
            | template | TicketsTemplate_1 |
        Then Validate ticket created successfully
        Then user access the webchat channel and validate the webchat conservation for ticket
        # need to reset settings so that other test do not fail
        When user reset 'WebchatChannel_1' settings
        Then save the changes successfully

    @849
    Scenario: Webchat - Message - Mark as SPAM
        Given user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user select the received message and reply the conservation
        Then user mark message as 'spam'
        When user navigate to search and search by following attributes
            | status | email                  |
            | spam   | arora.Ankush@tftus.com |
        Then validate the conversation is correctly registered and in 'SPAM' status
            | status | from   | email                  |
            | SPAM   | Ankush | arora.Ankush@tftus.com |

    @850
    Scenario: Webchat - Template - Type Radio Button
        Given user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user reply to received message with 'WebchatTemplateRadio_1' template
        Then validate template is received in the client plugin with 'Do you prefer?'
        And the template is successfully answered by customer as 'rain'
        And agent is notified the response by customer as 'Option Selected - rain'

    @855
    Scenario: Webchat - See previous conversations
        Given user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user select the received message and reply the conservation
        And verify previous conversation

    @852
    Scenario: Webchat - Transfer conversation between Agents
        Given user access the webChat Manager
        When user access 'WebchatChannel_1' select edit option
        And user edit the 'queue_one' queue
        And add new agent 'Agent Three'
        Then save the changes successfully
        And user login to the platform with 'Agent_3' account in 'second' window
        And agent login the webChat channel
        When user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        And select received message
        When user Transfer Conversation to agent 'Agent Three'
        And validate transfer successfully to agent 'Agent Three'
        Then customer is notified that the agent has changed to 'Agent Three'

    @853
    Scenario: Webchat - Transfer conversation between Queues
        Given user access the webChat Manager
        When user access 'WebchatChannel_1' select edit option
        Then user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        And select received message
        When user Transfer Conversation to 'queue_two' queue
        And validate transfer successfully to 'queue_two' queue with 'WebchatChannel_1' channel

    @851
    Scenario: Webchat - Template - Type Select
        Given user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify message is received successfully and counter of message is updated successfully
        Then validate received message appears in active tab with the status as New
        When user reply to received message with 'WebchatTemplateSelect_1' template
        Then validate template is received in the client plugin with 'Do you prefer?'
        And the template of type select is successfully answered by customer as 'rain'
        And agent is notified the response by customer as 'Option Selected - rain'

    @854
    Scenario: Webchat - Make Call
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user verify reply option
        And update contact info if not added '8094217411'
        When user click on Webchat call
        And user make a call
        Then user state should be 'talking'
        When user disconnects the call
        Then user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user verify webchat with an information message about the call made:
            | termReason | campaign           |
            | AGENT      | OutboundCampaign_1 |

    @5555
    Scenario: Webchat - Send message Exception Date without Tickets integration
        Given user access the webChat Manager
        When user open webchat plugin 'second'
        When user access 'WebchatChannel_1' select edit option and click calendar tab
        Then user configure an exception for today and save changes
        Then save the changes successfully
        When user open previous tab and send a message through Webchat plugin
            | tab    | contact | email                  |
            | second | Ankush  | arora.Ankush@tftus.com |
        Then verify webchat error message 'Webchat is out of schedule.'
        # need to delete the added exception so that other tests do not fail
        When user delete 'WebchatChannel_1' exception
        Then save the changes successfully

    @6210
    Scenario: Manage assignments - Webchat channel association
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        Then user assign agents to the group
            | agent | Agent Five |
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to Queue and search 'queue_one'
        Then save the changes successfully
        When user access profile manager menu
        And In access agent user set the profile
        When I re-login using 'Agent_5' account
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user validate manage assignments and 'assign' 'queue_one' queue
        When user access the webChat channel
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one        |
        When I re-login using 'Agent_4' account
        When user access the webChat channel
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one        |
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user delete the assigned queue 'all'

    @6211
    Scenario: Manage assignments - No association of webchat channels
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user delete the assigned queue 'all'
        Then user assign agents to the group
            | agent | Agent Five |
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to Queue and search 'queue_one'
        Then save the changes successfully
        When user access profile manager menu
        And In access agent user set the profile
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user validate manage assignments and 'assign' 'queue_one' queue
        When I re-login using 'Agent_5' account
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user validate manage assignments and 'validate' 'queue_one' queue
        And user delete the assigned queue 'queue_one'
        When user access the webChat channel
        Then validate webchat channel 'WebchatChannel_1' with queue 'queue_one' is not configured for the user
        When I re-login using 'Agent_4' account
        When user access the webChat channel
        Then validate webchat channel 'WebchatChannel_1' with queue 'queue_one' is not configured for the user

    @6212
    Scenario: Manage assignments - Webchat channel associations to different Webchat-queues
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        Then user assign agents to the group
            | agent | Agent One,Agent Two |
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to Queue and search 'queue_one'
        When user create a new queue
            | path | path1 |
        And validate '0' queue is successfully created
        When user create a new queue
            | path | path2 |
        And validate '1' queue is successfully created
        Then save the changes successfully
        When user access profile manager menu
        And In access agent user set the profile
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user validate manage assignments and 'assign' 'queue_one' queue
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        When user search and edit '0' queue
        And add new agent 'Agent One'
        When user search and edit '1' queue
        And add new agent 'Agent Two'
        Then save the changes successfully
        When I re-login using 'Agent_1' account
        When user access the webChat channel
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one,0      |
        When I re-login using 'Agent_2' account
        When user access the webChat channel
        Then validate user has access to the group
            | channel | WebchatChannel_1 |
            | queue   | queue_one,1      |
        When I re-login using 'admin' account
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        And delete the '0' queue
        And delete the '1' queue
        Then save the changes successfully
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user delete the assigned queue 'all'
