@ticketsOnline
Feature: Tickets Online

    Background: Login
    Given User login to the platform as 'admin'
    Then clean active calls

    @838
    Scenario: Reply Ticket Episode
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
        And 'send' the email response as 'wait'
        Then Send email with subject as 'reply'
        And refresh the page
        When Access the 'tickets' Channel
        And On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        And Select 'E-mail' option from Ticket actions
        Then Reply to the Episode as 'SubjectChild_1'

    @6419
    Scenario: Search an email that was send through the option 'Send email'
        When I re-login using 'Agent_1' account
        When user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1      |
            | subject      | SubjectChild_1     |
            | mailbox      | MailboxOut_1       |
            | template     | TicketsTemplate_1  |
            | emailsubject | sendEmailSubject   |
            | to           | testemail@test.com |
            | cc           |                    |
            | bcc          |                    |
            | response     | close              |
            | filename     | fixtures/a.jpg     |
        Then User access ticket channel
        And User navigates to search ticket page
        And user search for ticket by subject
        And Searches for tickets using following criteria:
            | email              |
            | testemail@test.com |
        Then email should be searched as 'CLOSED'

    @841
    Scenario: Mail Box Rule
        When Delete 'MailboxIn_1' mailbox rules
        Then Edit 'MailboxIn_1' type 'mailbox'
        Then Create and Activate the mailbox rule as 'Rule#1', 'automation.user01@outlook.com', 'CLOSED', 'Close by Rule'
        When Send email with subject as 'random'
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        When user searches for his ticket by using 'close' as ticket status
        Then Validate that the ticket received is in 'CLOSED'
        And Delete 'MailboxIn_1' mailbox rules

    @839
    Scenario: Ticket - Agent in Auto-Delivery
        When Access the 'Users & Groups' menu
        Then assign 'TicketQueue_3' to 'Agent_4' agent
        And Ticket Queue 'TicketQueue_3' has a SLA Template 'SLATemplate' Associated
        And 'SLATemplate' must be in Automatic Ticket Delivery hours
        When user navigate to the ticket channel and take count of Ticket queue 'TicketQueue_3'
        And User creates a new ticket with following ticket details:
            | email                 | phone      | queue         | template | autoDelivery |
            | gocontact@getnada.com | 8094217411 | TicketQueue_3 | test     | 1            |
            | gocontact@getnada.com | 8094217411 | TicketQueue_3 | test     | 2            |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_3'
        And User logout with current session
        When User login to the platform as 'Agent_4'
        And agent finishes handling a ticket

    @817
    Scenario: Create a new Ticket
        Then queue 'TicketQueue_1' should exist
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        When user navigates to Create Ticket page
        And User creates a new ticket with following details:
            | email                 | phone      | queue         | template |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     |
        Then Ticket should be created successfully
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        When User navigates to search ticket page
        And Searches for tickets using following criteria:
            | email                 | phone      |
            | gocontact@getnada.com | 8094217411 |
        Then Ticket should be searched
        When User opens ticket from tickets list
        And chooses to Email on the ticket
        Then validate that the ticket has been associated with the logged-in agent
        And validate that the attachments were successfully added
        When User replies and navigate to select the script
        Then user replies with following details:
            | destination_email     | response_option |
            | gocontact@getnada.com | Reply & Close   |
        And refresh the page
        When Access the 'tickets' Channel
        And Validate ticket counter is decremented for queue 'TicketQueue_1'

    @818
    Scenario: Send Email - Reply & Close
        When user navigate to send email option
            | queue         | subject        | mailbox      | template          |
            | TicketQueue_1 | SubjectChild_1 | MailboxOut_1 | TicketsTemplate_1 |
        Then User should see send email modal
        When User fills the email details using following data
            | to        | gocontact@getnada.com |
            | replyType | close                 |
        And User should 'send' the email
        Then Email should be received at the destination email address
        And User access the ticket channel and search for the 'closed' ticket with subject 'SubjectChild_1'
        Then Validate that the previously created ticket is correctly registered and in the 'CLOSED' state with subject 'SubjectTree_1 / SubjectChild_1'

    @819
    Scenario: Send Email - Reply & wait
        When user navigate to send email option
            | queue         | subject        | mailbox      | template          |
            | TicketQueue_1 | SubjectChild_1 | MailboxOut_1 | TicketsTemplate_1 |
        Then User should see send email modal
        When User fills the email details using following data
            | to        | gocontact@getnada.com |
            | replyType | wait                  |
        And User should 'send' the email
        Then Email should be received at the destination email address
        And User access the ticket channel and search for the 'pending' ticket with subject 'SubjectChild_1'
        Then Validate that the previously created ticket is correctly registered and in the 'PENDING' state with subject 'SubjectTree_1 / SubjectChild_1'

    @820
    Scenario: Send Email - Reply
        When user navigate to send email option
            | queue         | subject        | mailbox      | template          |
            | TicketQueue_1 | SubjectChild_1 | MailboxOut_1 | TicketsTemplate_1 |
        Then User should see send email modal
        When User fills the email details using following data
            | to        | gocontact@getnada.com |
            | replyType | reply                 |
        And User should 'send' the email
        Then Email should be received at the destination email address
        And User access the ticket channel and search for the 'open' ticket with subject 'SubjectTree_1 / SubjectChild_1'
        Then Validate that the previously created ticket is correctly registered and in the 'OPEN' state with subject 'SubjectTree_1 / SubjectChild_1'

    @821
    Scenario: Send Email - Send & Open
        When queue 'TicketQueue_1' should exist
        When user navigates to the Send Email page
        And fills in the indicated fields with the following configuration:
            | queue         | subject        | mailbox      | template          |
            | TicketQueue_1 | SubjectChild_1 | MailboxOut_1 | TicketsTemplate_1 |
        Then Confirm that only the 'Send' option is available
        When user closes send email modal
        And Access the 'tickets' Channel
        Then user navigates to Send Email page
        And fills in the indicated fields with the following configuration:
            | queue         | subject        | mailbox      | template          |
            | TicketQueue_1 | SubjectChild_1 | MailboxOut_1 | TicketsTemplate_1 |
        And Confirm that the 'Send' and 'Send and Open' options are available

    @823
    Scenario: Ticket - Reply & Wait
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | myNewSubject2         |
            | to           | gocontact@getnada.com |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And user access the email and validate that this should have assigned agent
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'wait'
        Then Email should be received at the destination email address
        When user searches for his ticket by using 'wait' as ticket status
        Then User should see the ticket successfully with subject and date

    @822
    Scenario: Ticket - Reply & Close
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | myNewSubject2         |
            | to           | gocontact@getnada.com |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        Then Email should be received at the destination email address
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And user access the email and validate that this should have assigned agent
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'close'
        Then Email should be received at the destination email address
        When user searches for his ticket by using 'close' as ticket status
        Then User should see the ticket successfully with subject and date

    @824
    Scenario: Ticket - Reply
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1         |
            | subject      | SubjectChild_1        |
            | mailbox      | MailboxOut_1          |
            | template     | TicketsTemplate_1     |
            | emailsubject | myNewSubject2         |
            | to           | gocontact@getnada.com |
            | response     | reply                 |
            | filename     | fixtures/a.jpg        |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And user access the email and validate that this should have assigned agent
        When User navigates to select the script and fill outs the email form along with attachments
            | from         |                   |
            | subject      | SubjectChild_1    |
            | template     | TicketsTemplate_1 |
            | ticketAction | reply             |
        And 'send' the email response as 'reply'
        Then Email should be received at the destination email address
        When user returns to search tab
        When user searches for his ticket by using 'open' as ticket status
        Then User should see the ticket successfully with subject and date

    @825
    Scenario: Ticket - Forward And Close
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And user access the email and validate that this should have assigned agent
        When User navigates to select the script and fill outs the email form along with attachments
            | to           | gocontact@getnada.com |
            | from         |                       |
            | subject      | SubjectChild_1        |
            | template     | TicketsTemplate_1     |
            | ticketAction | forward               |
        And 'forward' the email response as 'close'
        Then Email should be received at the destination email address
        When user searches for his ticket by using 'close' as ticket status
        Then User should see the ticket successfully with subject and date

    @826
    Scenario: Ticket - Forward And Wait
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And user access the email and validate that this should have assigned agent
        When User navigates to select the script and fill outs the email form along with attachments
            | to           | gocontact@getnada.com |
            | from         |                       |
            | subject      | SubjectChild_1        |
            | template     | TicketsTemplate_1     |
            | ticketAction | forward               |
        And 'forward' the email response as 'wait'
        Then Email should be received at the destination email address
        When user searches for his ticket by using 'wait' as ticket status
        Then User should see the ticket successfully with subject and date

    @827
    Scenario: Ticket - Forward
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And user access the email and validate that this should have assigned agent
        When User navigates to select the script and fill outs the email form along with attachments
            | to           | gocontact@getnada.com |
            | from         |                       |
            | subject      | SubjectChild_1        |
            | template     | TicketsTemplate_1     |
            | ticketAction | forward               |
        And 'forward' the email response as 'forward'
        Then Email should be received at the destination email address
        When user returns to search tab
        When user searches for his ticket by using 'Open' as ticket status
        Then User should see the ticket successfully with subject and date

    @828
    Scenario: Ticket - Mark as Spam
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And Validate that the ticket sent was successfully integrated in queue 'TicketQueue_1'
        When user mark this ticket as Spam
        When user searches for his ticket by using 'spam' as ticket status
        Then User should see the ticket successfully with subject and date
        And user returns to ticket tab
        And Validate the ticket counter is decremented for queue 'TicketQueue_1'

    @833
    Scenario: Verify that user can merge the tickets
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And Validate that the ticket sent was successfully integrated in queue 'TicketQueue_1'
        And fetch ticket id of created ticket
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        When user navigates to Create Ticket page
        And User creates a new ticket with following details:
            | email                 | phone      | queue         | template |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     |
        Then Ticket should be created successfully
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        When User navigates to search ticket page
        And Searches for tickets using following criteria:
            | email                 | phone      |
            | gocontact@getnada.com | 8094217411 |
        Then Ticket should be searched
        When User opens ticket from tickets list
        When user navigate to merge option of received ticket
        And user navigate to merge ticket modal and search by ticket id
        And user select main ticket
        And user select merge and open
        Then validate two tickets were merged
        And refresh the page
        When Access the 'tickets' Channel
        And Validate ticket counter is decremented for queue 'TicketQueue_1'

    @834
    Scenario: Verify that user can comment on Tickets
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And Validate that the ticket sent was successfully integrated in queue 'TicketQueue_1'
        When user navigate to comment option of received ticket
        And user performs action on comments, write a comment 'this is a comment'

    @835
    Scenario: Ticket - Change Ticket Queue
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        When User navigate to ticket channel and take count of Ticket new queue 'TicketQueue_2'
        And Validate that the ticket sent was successfully integrated in queue 'TicketQueue_1'
        And Set the queue of Ticket as 'TicketQueue_2' on Ticket Details page
        And validate if Ticket is now available at 'TicketQueue_2' queue
        And Validate the ticket counter is incremented for new queue 'TicketQueue_2'
        And Validate the ticket counter is decremented for queue 'TicketQueue_1'

    @837
    Scenario: Change Priority
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        When user navigates to Create Ticket page
        And User creates a new ticket with following details:
            | email                 | phone      | queue         | template |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     |
        Then Ticket should be created successfully
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        When Access the 'tickets' Channel
        When Switch to 'TicketQueue_1' Tickets Queue and Search received ticket as 'gocontact@getnada.com'
        Then Set the priority of Ticket as 'LOW' on Ticket Details page

    @5109
    Scenario: Release Tickets
        When User navigate to ticket channel and take count of NEW Tickets
        Then Switch to 'open' Tickets as Active state and select '2' of the tickets
        And Select 'Release tickets' from Ticket multi-actions menu to Release selected Tickets
        Then Validate the NEW tickets counter is incremented
        And user access the email and validate that this should NOT have assigned agent
        When User navigate to ticket channel and take count of NEW Tickets
        Then Switch to 'pending' Tickets as Active state and select '1' of the tickets
        And Select 'Release tickets' from Ticket multi-actions menu to Release selected Tickets
        Then Validate the NEW tickets counter is incremented
        And user access the email and validate that this should NOT have assigned agent

    @829
    Scenario: Ticket - Call
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        And user navigates to Send Email page
        And User sends email with following informations
            | queue        | TicketQueue_1          |
            | subject      | SubjectChild_1         |
            | mailbox      | MailboxOut_1           |
            | template     | TicketsTemplate_1      |
            | emailsubject | sendEmailSubject       |
            | to           | gocontact@getnada.com  |
            | cc           | gupta.surbhi@tftus.com |
            | bcc          |                        |
            | response     | reply                  |
            | filename     | fixtures/a.jpg         |
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        And Validate that ticket sent was successfully integrated in 'TicketQueue_1'
        And user access the email and validate that this should have assigned agent
        When user select the Call option and verify established
        And user make a call
        Then user state should be 'talking'
        When user disconnects the call
        Then user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        And user close the ticket with subject 'SubjectChild_1'
        When user searches for his ticket by using 'close' as ticket status
        Then User should see the ticket successfully with subject and date
        And user verify ticket with an information message about the call made:
            | campaign           | outcome |
            | OutboundCampaign_1 | Ok      |

    @897
    Scenario: Create Ticket - Multiple attachments with a sum greater than the maximum allowed size
        When Navigate to Ticket Manager
        Then Edit the 'MailboxOut_1' from mailbox and set max file size as '5'
        When user navigates to Create Ticket page
        And User creates a new ticket with following details:
            | email                 | phone      | queue         | template | fileName       |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     | fixtures/b.jpg |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     | fixtures/a.jpg |
        Then validate the error message of max file size and button is disabled


    @898
    Scenario: Create Ticket - Multiple attachments with sum less than maximum allowed size
        When Navigate to Ticket Manager
        Then Edit the 'MailboxOut_1' from mailbox and set max file size as '5'
        Then queue 'TicketQueue_1' should exist
        When User navigate to ticket channel and take count of Ticket queue 'TicketQueue_1'
        When user navigates to Create Ticket page
        And User creates a new ticket with following details:
            | email                 | phone      | queue         | template | fileName       |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     | fixtures/c.jpg |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     | fixtures/a.jpg |

        Then Ticket should be created successfully
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        When User navigates to search ticket page
        And Searches for tickets using following criteria:
            | email                 | phone      |
            | gocontact@getnada.com | 8094217411 |
        Then Ticket should be searched

    @895
    Scenario:Create Ticket - Attachment greater than the maximum size allowed
        When Navigate to Ticket Manager
        Then Edit the 'MailboxOut_1' from mailbox and set max file size as '5'
        When user navigates to Create Ticket page
        And User creates a new ticket with following details:
            | email                 | phone      | queue         | template | fileName       |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     | fixtures/b.jpg |
        Then validate the error message of max file size and button is disabled

    @896
    Scenario: Create Ticket - Attachment less than the maximum size allowed
        When Navigate to Ticket Manager
        Then Edit the 'MailboxOut_1' from mailbox and set max file size as '5'
        When user navigates to Create Ticket page
        And User creates a new ticket with following details:
            | email                 | phone      | queue         | template | fileName       |
            | gocontact@getnada.com | 8094217411 | TicketQueue_1 | test     | fixtures/a.jpg |
        Then Ticket should be created successfully
        And Validate the ticket is sent and counter is incremented for queue 'TicketQueue_1'
        When User navigates to search ticket page
        And Searches for tickets using following criteria:
            | email                 | phone      |
            | gocontact@getnada.com | 8094217411 |
        Then Ticket should be searched
        When User opens ticket from tickets list
        And validate that the attachments were successfully added