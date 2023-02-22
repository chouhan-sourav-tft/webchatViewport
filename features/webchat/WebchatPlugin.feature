@webchatPlugin
Feature: Webchat Plugin

    # Background: Login
    #     Given User login to the platform as 'Supervisor_2'
    #     Then clean active calls
    #     And clear webchat message
    #     When User deletes all previous exceptions for 'WebchatChannel_1'
    #     When user edit 'WebchatChannel_1' channel
    #     And setting 'StartChatWithoutMessage' to 'false'
    #     When user edit 'WebchatChannel_1' channel
    #     When user navigate to triggers tab
    #     And user edit trigger action 'Client UnRegister and Close Interface'
    #     When User fill the trigger details:
    #         | delay       | 00:30:00         |
    #         | triggerName | clientinactivity |
    #     Then save the changes successfully
    #     Then let user reset the trigger action
    #     And User logout with current session

    @1489
    Scenario: Plugin Webchat - Duplicate browser
        Given user log in to the Webchat plugin and send a message with following configurations:
            | tab   | contact      | email                  |
            | first | Surbhi Gupta | gupta.surbhi@tftus.com |
        When user opens Duplicate browser tab
        And transfers the session to the new tab
        Then verify session in the original browser is successfully terminated

    @1490
    Scenario: Plugin Webchat - Send allowed file
        Given User login to the platform as 'Supervisor_2'
        When user edit 'WebchatChannel_1' channel
        And setting with following configurations:
            | maxFileSize | fileFormat |
            | 5           | jpg        |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        And send 'a.jpg' file and verify if 'success' 'File ready! Click to download.'
        Then validate message received successfully in 'Active' tab & 'New' status
        When validate uploaded file 'received' with 'File Ready!'
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'left' the conversation

    @5508
    Scenario: Plugin Webchat - Send not allowed file
        Given User login to the platform as 'Supervisor_2'
        When user edit 'WebchatChannel_1' channel
        And setting with following configurations:
            | maxFileSize | fileFormat |
            | 5           | jpg        |
        And User logout with current session
        And User login to the platform as 'Agent_1'
        And access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        And send 'test.png' file and verify if 'error' 'File extension not allowed. (jpg)'
        Then validate message received successfully in 'Active' tab & 'New' status
        And validate uploaded file 'not received' with 'File Transfer Failed!'
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'left' the conversation

    @5509
    Scenario: Plugin Webchat - Send allowed file (maximum size exceeded)
        Given User login to the platform as 'Supervisor_2'
        When user edit 'WebchatChannel_1' channel
        And setting with following configurations:
            | maxFileSize | fileFormat  |
            | 2           | jpg,pdf,png |
        And User logout with current session
        And User login to the platform as 'Agent_1'
        And access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        And send 'test.pdf' file and verify if 'error' 'File size exceeds maximum allowed. (2.0 MB)'
        Then validate message received successfully in 'Active' tab & 'New' status
        And validate uploaded file 'not received' with 'File Transfer Failed!'
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'left' the conversation

    @1491
    Scenario: Plugin Webchat - Change Name
        When User login to the platform as 'Agent_1'
        And access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        And user change name 'TestName'
        Then validate message received successfully in 'Active' tab & 'New' status
        And verify if 'Contact Changed Name to "TestName"'
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'left' the conversation
        #change name back to contact name
        When user change name 'Surbhi Gupta'

    @1492
    Scenario: Plugin Webchat - Change Language
        When User login to the platform as 'Agent_1'
        And access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        And user change language 'pt'
        And validate translation 'Alterar Nome'
        Then validate message received successfully in 'Active' tab & 'New' status
        And verify if 'Contact Changed Language to Português'
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'saiu' the conversation

    @1493
    Scenario: Plugin Webchat - Rating
        Given User login to the platform as 'Supervisor_2'
        When user edit 'WebchatChannel_1' channel
        And setting 'AllowRatingRequest' to 'true'
        And User logout with current session
        When User login to the platform as 'Agent_1'
        When access the 'Webchat Channel'
        And user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        When user reply to received message by selecting Request rating
        Then client sends 'rating' with '4' star and 'Nice' message
        And verify 'rating' with '4' star and 'Nice' message
        When user 'close' the 'active' conversation with the subject 'WebchatParent_1'
        Then customer is notified that the agent has 'left' the conversation

    @5662
    Scenario: Plugin Webchat - Chat ID
        Given User login to the platform as 'Supervisor_2'
        Given user access the webChat Manager
        When user access 'WebchatChannel_1' select edit option
        And setting 'ShowChatIdOnClient' to 'true'
        Then user access the webChat channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then verify the plugin Webchat have Chat ID information
        Then validate the Chat ID through Webchat Channel

    @5664
    Scenario: Plugin Webchat - Start Chat without message
        Given User login to the platform as 'Supervisor_2'
        When user edit 'WebchatChannel_1' channel
        And setting 'StartChatWithoutMessage' to 'true'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate conversation started at 'client' side as 'Surbhi Gupta'
        And validate conversation started at 'agent' side as 'Surbhi Gupta'
        #uncheck start chat without message checkbox
        When user edit 'WebchatChannel_1' channel
        And setting 'StartChatWithoutMessage' to 'false'

    @5665
    Scenario: Plugin Webchat - Request Conversation Copy
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        And verify if 'MailboxWebchat_1' exist
        When user edit 'WebchatChannel_1' channel
        And update webchat setting with:
            | Mailbox | Setting        | MailboxName      |
            | true    | ContactRequest | MailboxWebchat_1 |
        When access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                 |
            | second | Surbhi Gupta | gocontact@getnada.com |
        Then verify the plugin Webchat have Send Chat by Email
        And validate if email is sent to the client on 'gocontact@getnada.com' with a copy of conversation
        Then validate message received successfully in 'Active' tab & 'New' status
        #uncheck the checkboxes
        When user edit 'WebchatChannel_1' channel
        And update webchat setting with:
            | Mailbox | Setting        | MailboxName      |
            | false   | ContactRequest | MailboxWebchat_1 |

    @5666
    Scenario: Self Rating
        Given User login to the platform as 'Supervisor_2'
        When user edit 'WebchatChannel_1' channel
        And setting 'AllowSelfRatingRequest' to 'true'
        When access the 'Webchat Channel'
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then Validate that Rate chat option available
        Then client sends 'selfrating' with '4' star and 'Great' message
        Then validate message received successfully in 'Active' tab & 'New' status
        And verify 'selfrating' with '4' star and 'Great' message

    @5667
    Scenario: Plugin Webchat - Automatically Send Conversation Copy
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        And verify if 'MailboxWebchat_1' exist
        When user edit 'WebchatChannel_1' channel
        And update webchat setting with:
            | Mailbox | Setting  | MailboxName      |
            | true    | AutoSend | MailboxWebchat_1 |
        When access the 'Webchat Channel'
        And user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                 |
            | second | Surbhi Gupta | gocontact@getnada.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatChild_1'
        Then customer is notified that the agent has 'left' the conversation
        And validate if email is sent to the client on 'gocontact@getnada.com' with a copy of conversation
        #uncheck the checkboxes
        When user edit 'WebchatChannel_1' channel
        And update webchat setting with:
            | Mailbox | Setting  | MailboxName      |
            | false   | AutoSend | MailboxWebchat_1 |

    @5678
    Scenario: Plugin Webchat - Upload CSS
        Given User login to the platform as 'Supervisor_2'
        Given user access the webChat Manager
        When user access 'WebchatChannel_1' select edit option
        And user upload 'webchat.css' css file
        When user open a duplicate tab and open Webchat plugin
        Then verify the plugin Webchat has CSS Background color '#cdffd8'
        #uncheck UploadCustomWebchatCSS checkbox
        When user switch to main tab
        And user edit 'WebchatChannel_1' channel
        And setting 'UploadCustomWebchatCSS' to 'false'

    @5892
    Scenario: Webchat - Set up goodbye message when agent leaves a webchat - custom sender name
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to triggers tab
        And select add trigger option
        When User fill the trigger details:
            | when        | When the agent leaves the conversation |
            | action      | Send Message to Client                 |
            | delay       | 00:00:05                               |
            | displayName | true                                   |
            | sender      | Agent                                  |
            | message     | Hello World!                           |
        Then save the changes successfully
        When user access the webChat channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact     | email                 |
            | second | Sidra Ajmal | ajmal.sidra@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatChild_1'
        Then customer is notified that the agent has 'left' the conversation
        Then customer verify 'Agent' name and 'Hello World!' message displayed
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        And user deletes the '0' trigger action
        Then save the changes successfully

    @5867
    Scenario: Webchat - Set up goodbye message when agent leaves a webchat
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        Then user navigate to triggers tab
        And select add trigger option
        When User fill the trigger details:
            | when    | When the agent leaves the conversation |
            | action  | Send Message to Client                 |
            | delay   | 00:00:05                               |
            | message | Hello World!                           |
        Then save the changes successfully
        When user access the webChat channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact     | email                 |
            | second | Sidra Ajmal | ajmal.sidra@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user 'close' the 'active' conversation with the subject 'WebchatChild_1'
        Then customer is notified that the agent has 'left' the conversation
        Then customer verify 'Supervisor Two' name and 'Hello World!' message displayed
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        And user deletes the '0' trigger action
        Then save the changes successfully

    @6793
    Scenario: Unread conversation after Unregister event
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        And user access 'WebchatChannel_1' select edit option
        Then user navigate to triggers tab
        And select add trigger option
        When User fill the trigger details:
            | when   | When client send chat message |
            | action | Client UnRegister             |
            | delay  | 00:00:15                      |
        Then save the changes successfully
        When user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact       | email                   |
            | second | Sakshi Sharma | sharma.sakshi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        Then Confirm after '15' seconds since message has been sent the 'first' plugin is closed on the web page
        Then validate received message is not present in active tab
        When user access 'unread' tab
        And user open unread conversation
        Then verify close webchat modal is 'not' displayed
        When user click the close conversation button
        Then verify close webchat modal is '' displayed
        And verify that the close button is 'right' aligned
        And verify an icon 'fa-sign-out' is displayed preceding the modal title
        And verify subject selector label is preceded by asterisk
        When user enter 'WebchatChild_1' subject and 'close' conversation
        And user access 'active' tab
        Then user search webchat message with following configurations:
            | webchatQueue | WebchatChannel_1 - queue_one |
        Then user verify previous message is 'CLOSED' successfully
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        And user deletes the '0' trigger action
        Then save the changes successfully

    @6435
    Scenario: Webchat Contact is idle trigger - Client UnRegister and close interface
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        And user access 'WebchatChannel_1' select edit option
        Then user navigate to triggers tab
        And select add trigger option
        When User fill the trigger details:
            | when        | Contact is idle                    |
            | action      | Client UnRegister                  |
            | timer       | 00:05:00                           |
            | triggerName | Close conversation after 5 minutes |
            | description | xpto                               |
        Then save the changes successfully
        When user access the webChat channel
        When user open a duplicate tab and send a message through Webchat plugin
            | tab    | contact       | email                   |
            | second | Sakshi Sharma | sharma.sakshi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        Then Confirm after '300' seconds since message has been sent the 'first' plugin is closed on the web page
        Then verify close webchat modal is '' displayed
        When user enter 'WebchatChild_1' subject and 'close' conversation
        And I re-login using 'Supervisor_1' account
        Then user access the reports designer menu
        Then user enters csv designer details
            | source     | Webchat Sessions |
            | template   | Template_1       |
            | dataType   | Webchat Sessions |
            | dataTypeID | WebchatSessions  |
        And user downloads report
        Then validate csv contains following information:
            | Chat_Status | Closed |
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        And user deletes the '0' trigger action
        Then save the changes successfully

    @6401
    Scenario: Select the chat outcome when a conversation is ended through the client unregister and close interface trigger - Agent out of the conversation
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        When user navigate to triggers tab
        And user edit trigger action 'Client UnRegister and Close Interface'
        When User fill the trigger details:
            | delay | 00:02:00 |
        Then save the changes successfully
        When user access the webChat channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user clicks Return to Inbox
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'second' client plugin
        Then validate message is received in the 'second' client plugin
        Then Confirm after '98' seconds since message has been sent the 'first' plugin is closed on the web page
        Then Confirm that the 1 conversation container is highlighted with a border 'rgb(177, 129, 29)'
        And Verify that in place of the new messages counter a warning icon is displayed
        Then Verify that on hover over warning icon the title 'Pending action: select a conversation outcome.' is displayed
        When user selects message 1
        Then verify close webchat modal is '' displayed
        And verify that the close button is 'right' aligned
        And verify an icon 'fa-sign-out' is displayed preceding the modal title
        And verify subject selector label is preceded by asterisk
        When user 'close' the '' conversation with the subject 'WebchatChild_1'
        When let user wait for '3' seconds
        When user 'close' the '' conversation with the subject 'WebchatChild_1'
        When user search webchat message with following configurations:
            | webchatQueue | WebchatChannel_1 - queue_one |
        Then user verify previous message is 'CLOSED' successfully

    @6402
    Scenario: Select the chat outcome when a conversation is ended through the client unregister and close interface trigger - Agent out of the conversation
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        When user navigate to triggers tab
        And user edit trigger action 'Client UnRegister and Close Interface'
        When User fill the trigger details:
            | delay | 00:05:00 |
        Then save the changes successfully
        When user access the webChat channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user clicks Return to Inbox
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'second' client plugin
        Then validate message is received in the 'second' client plugin
        When let user wait for '278' seconds
        When user selects message 1
        Then verify close webchat modal is '' displayed
        When user 'close' the '' conversation with the subject 'WebchatChild_1'
        When let user wait for '3' seconds
        When user 'close' the '' conversation with the subject 'WebchatChild_1'
        When user search webchat message with following configurations:
            | webchatQueue | WebchatChannel_1 - queue_one |
        Then user verify previous message is 'CLOSED' successfully

    @6403
    Scenario: Cancels the outcome selection when a conversation is ended through the “client unregister and close interface“ trigger - Agent out of the conversation
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        When user navigate to triggers tab
        And user edit trigger action 'Client UnRegister and Close Interface'
        When User fill the trigger details:
            | delay | 00:02:00 |
        Then save the changes successfully
        When user access the webChat channel
        When set viewport for calendar
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user clicks Return to Inbox
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'second' client plugin
        Then validate message is received in the 'second' client plugin
        Then Confirm after '120' seconds since message has been sent the 'first' plugin is closed on the web page
        When Close the close webchat conversation modal
        Then Confirm that the 1 conversation container is highlighted with a border 'rgb(177, 129, 29)'
        And Verify that in place of the new messages counter a warning icon is displayed
        Then Verify that on hover over warning icon the title 'Pending action: select a conversation outcome.' is displayed
        When user selects message 1
        When Close the close webchat conversation modal
        Then Verify that the button Transfer Conversation is no longer displayed
        Then Confirm that the 1 conversation container is highlighted with a border 'rgb(177, 129, 29)'
        When user selects message 2
        When Close the close webchat conversation modal
        When user selects message 1
        Then verify close webchat modal is '' displayed
        When user 'close' the '' conversation with the subject 'WebchatParent_1'
        When let user wait for '3' seconds
        When user 'close' the '' conversation with the subject 'WebchatParent_1'
        When user search webchat message with following configurations:
            | webchatQueue | WebchatChannel_1 - queue_one |
        Then user verify previous message is 'CLOSED' successfully

    @6404
    Scenario: Cancels the outcome selection when a conversation is ended through the “client unregister and close interface“ trigger - Agent in the conversation
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        When user navigate to triggers tab
        And user edit trigger action 'Client UnRegister and Close Interface'
        When User fill the trigger details:
            | delay | 00:05:00 |
        Then save the changes successfully
        When user access the webChat channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user clicks Return to Inbox
        When user log in to the Webchat plugin and send a message with following configurations:
            | window | contact      | email                  |
            | second | Surbhi Gupta | gupta.surbhi@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'second' client plugin
        Then validate message is received in the 'second' client plugin
        Then Confirm after '300' seconds since message has been sent the 'first' plugin is closed on the web page
        When Close the close webchat conversation modal
        Then Verify that the button Transfer Conversation is no longer displayed
        Then user selects message 2
        When Close the close webchat conversation modal
        Then Confirm that the 1 conversation container is highlighted with a border 'rgb(177, 129, 29)'
        Then user selects message 1
        Then verify close webchat modal is '' displayed
        When user 'close' the '' conversation with the subject 'WebchatParent_1'
        When let user wait for '3' seconds
        When user 'close' the '' conversation with the subject 'WebchatParent_1'
        When user search webchat message with following configurations:
            | webchatQueue | WebchatChannel_1 - queue_one |
        Then user verify previous message is 'CLOSED' successfully

    @6876
    Scenario: Webchat - Conversation is ended through the “client unregister and close interface“ trigger - Multiple active assigned conversations 
        Given User login to the platform as 'Supervisor_2'
        When user access the webChat Manager
        Then user access 'WebchatChannel_1' select edit option
        When user navigate to triggers tab
        And select add trigger option
        When User fill the trigger details:
            | when        | When client send chat message  |
            | action      | Client UnRegister              |
            | delay       | 00:00:30                       |
        Then save the changes successfully
        When user access the webChat channel
        When user log in to the Webchat plugin and send a message with following configurations:
            | tab    | contact        | email        |
            | second | m1             | m1@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'first' client plugin
        Then validate message is received in the 'first' client plugin
        When user clicks Return to Inbox
        When user log in to the Webchat plugin and send a message with following configurations:
            | window  | contact   | email        |
            | second  | m2        | m2@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'second' client plugin
        Then validate message is received in the 'second' client plugin
        When user clicks Return to Inbox
        When user log in to the Webchat plugin and send a message with following configurations:
            | window     | contact | email        |
            | third      | m3      | m3@tftus.com |
        Then validate message received successfully in 'Active' tab & 'New' status
        And user select the conversation
        When user reply to received message for 'third' client plugin
        Then validate message is received in the 'third' client plugin
        Then Confirm after '15' seconds since message has been sent the 'first' plugin is closed on the web page
        Then Confirm after '0' seconds since message has been sent the 'second' plugin is closed on the web page
        Then Confirm after '0' seconds since message has been sent the 'third' plugin is closed on the web page
        When Verify that conversations from message '1' present the layout of closed by trigger
        When Verify that conversations from message '2' present the layout of closed by trigger
        When user 'close' the '' conversation with the subject 'WebchatChild_1'
        Then verify close webchat modal is '' displayed
        And verify that the close button is 'right' aligned
        And verify an icon 'fa-sign-out' is displayed preceding the modal title
        And verify subject selector label is preceded by asterisk
        When user 'close' the '' conversation with the subject 'WebchatChild_1'
        Then verify close webchat modal is '' displayed
        And verify that the close button is 'right' aligned
        And verify an icon 'fa-sign-out' is displayed preceding the modal title
        And verify subject selector label is preceded by asterisk
        When user 'close' the '' conversation with the subject 'WebchatChild_1'
        When user clicks Return to Inbox
        When user search webchat message with following configurations:
            | webchatQueue | WebchatChannel_1 - queue_one |
        Then user verify previous message is 'CLOSED' successfully