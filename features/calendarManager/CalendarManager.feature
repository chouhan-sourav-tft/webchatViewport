@calendarManager
Feature: Calendar Manager

    Background: Login To the application
        When set viewport for calendar
        Given User login to the platform as 'Supervisor_2'
        Then clean active calls
        And reset active variables
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars

    @1339
    Scenario: Calendar Manager - Events - Create Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |

    @1340
    Scenario: Calendar Manager - Events - Edit Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        And search the created event
        Then user edit an event with following configurations:
            | preEvent | postEvent |
            | 15       | 15        |

    @1342
    Scenario: Calendar Manager - Calendars - Create Calendar
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref  |
            | GOCalendar   | 09:00     | 09:30   | test |

    @1341
    Scenario: Calendar Manager - Events - Delete Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        And search the created event
        Then user removes an event

    @1344
    Scenario: Calendar Manager - Calendars - Edit Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref  |
            | GOCalendar   | 09:00     | 09:30   | test |
        And search the created calendar
        Then user edit a calendar with following configurations:
            | temporalExclusion | exclusionStartTime | exclusionEndTime |
            | true              | 08:00              | 10:00            |

    @1345
    Scenario: Calendar Manager - Calendars - Delete Calendar
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref  |
            | GOCalendar   | 09:00     | 09:30   | test |
        And search the created calendar
        And user removes a calendar
        When user selects the calendar 'events' tab
        And search the created event
        Then user removes an event

    @7045
    Scenario: Calendar Monitor - Outbound Campaign - Custom Interval
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarMonitor'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description                      | days | concurrent | error |
            | 10   | Booking Event in Custom Interval | 1    | false      | false |
        Then Validate that calendar shows preparation times and back to page
        And user validate the script
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
        When user access the Calendar monitor menu
        Then user search the calendar by using following configurations:
            | ownerType    | OutBound Campaigns |
            | campaign     | OutboundCampaign_1 |
            | timeInterval | Custom Interval    |
            | endDate      | Tomorrow           |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | 21:30:00      |
            | percentOccupied | 2.27%         |

    @1351
    Scenario: Calendar - Create reservation with out-of-hours events - Voice Online
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 12:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 15:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarManager'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then User select time slot at '16' hours after 1 day and verify error displayed
        Then user navigates back to script from calendar page
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name

    @1352
    Scenario: Calendar - Concurrent Events - Voice Online
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration | concurrent |
            | GOEvent   | 09:00     | 18:00   | 30       | true       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarManager'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | First       | 1    | false      | false |
            | 12   | Second      | 1    | true       | false |
        Then user navigates back to script from calendar page
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name

    @7046
    Scenario: Calendar Monitor - Outbound Campaign - This Week
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarMonitor'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description                          | days | concurrent | error |
            | 10   | Booking Event for tomorrow           | 1    | false      | false |
            | 10   | Booking Event for day after tomorrow | 2    | false      | false |
            | 10   | Booking Event for next week          | week | false      | false |
        Then user navigates back to script from calendar page
        And user validate the script
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
            | 10   | 2    | true   |
            | 10   | week | true   |
        When user access the Calendar monitor menu
        Then user search the calendar by using following configurations:
            | ownerType    | OutBound Campaigns |
            | campaign     | OutboundCampaign_1 |
            | timeInterval | This Week          |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 2             |
            | bookedHours     | 01:00:00      |
            | availableHours  | 76:00:00      |
            | percentOccupied | 1.3%          |

    @7054
    Scenario: Calendar Monitor - Tickets Queues - Custom Interval
        When Delete 'MailboxIn_1' mailbox rules
        When User navigate to ticket channel and take count of NEW Tickets
        And Send email with subject as 'random'
        Then user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'Custom Interval'
            | ticketQueueName | TicketQueue_1        |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        When User opens ticket from tickets list
        And user navigates to script and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description     | days | concurrent | error |
            | 12   | Custom Interval | 1    | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        When user clicks on close ticket
        And user close the ticket with subject 'SubjectChild_1'
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Tickets Queues  |
            | ticketQueue  | TicketQueue_1   |
            | timeInterval | Custom Interval |
            | endDate      | Tomorrow        |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | 21:30:00      |
            | percentOccupied | 2.27          |

    @7055
    Scenario: Calendar Monitor - Ticket Queues - This Week
        When Delete 'MailboxIn_1' mailbox rules
        When User navigate to ticket channel and take count of NEW Tickets
        And Send email with subject as 'random'
        Then user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for ' this week'
            | ticketQueueName | TicketQueue_1        |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        When User opens ticket from tickets list
        And user navigates to script and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | tomorrow    | 1    | false      | false |
            | 12   | day after   | 2    | false      | false |
            | 12   | next week   | week | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        When user clicks on close ticket
        And user close the ticket with subject 'SubjectChild_1'
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
            | 12   | 2    | true   |
            | 12   | week | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Tickets Queues |
            | ticketQueue  | TicketQueue_1  |
            | timeInterval | This Week      |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 2             |
            | bookedHours     | 01:00:00      |
            | availableHours  | 76:00:00      |
            | percentOccupied | 1.3           |

    @7050
    Scenario: Calendar Monitor - Inbound Queues - Custom Interval
        When user access the Calendar manager menu
        And  user selects the calendar 'events' tab
        And user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'Inbound Custom Interval'
            | inboundQueueName | InboundQueue_1      |
            | databaseName     | New Leads Inbound 1 |
            | defaultPageName  | Homepage            |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        And toggle 'off' the 'max' Wrap Up Time in queue
        And user set max queue time to '1' minutes to '30' seconds
        Then user select the current day of the week and queue 'reset'
        And user navigates to 'Actions' tab
        Then reset queue actions
        And user finish and save inbound queue settings
        When login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description     | days | concurrent | error |
            | 12   | Custom Interval | 1    | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Inbound Queues  |
            | inboundQueue | InboundQueue_1  |
            | timeInterval | Custom Interval |
            | endDate      | Tomorrow        |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | 21:30:00      |
            | percentOccupied | 2.27          |

    @7051
    Scenario: Calendar Monitor - Inbound Queues - This Week
        When user access the Calendar manager menu
        And  user selects the calendar 'events' tab
        And user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'Inbound this week'
            | inboundQueueName | InboundQueue_1      |
            | databaseName     | New Leads Inbound 1 |
            | defaultPageName  | Homepage            |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When user navigates to voice manager
        And user searches and edits 'InboundQueue_1' inbound queue
        And user navigates to 'General Settings' tab
        And toggle 'off' the 'max' Wrap Up Time in queue
        And user set max queue time to '1' minutes to '30' seconds
        Then user select the current day of the week and queue 'reset'
        And user navigates to 'Actions' tab
        Then reset queue actions
        And user finish and save inbound queue settings
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | tomorrow    | 1    | false      | false |
            | 12   | day after   | 2    | false      | false |
            | 12   | next week   | week | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
            | 12   | 2    | true   |
            | 12   | week | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Inbound Queues |
            | inboundQueue | InboundQueue_1 |
            | timeInterval | This Week      |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 2             |
            | bookedHours     | 01:00:00      |
            | availableHours  | 76:00:00      |
            | percentOccupied | 1.3           |

    @7052
    Scenario: Calendar Monitor - Inbound Queues - This Month
        When user access the Calendar manager menu
        And  user selects the calendar 'events' tab
        And user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'Inbound this month'
            | inboundQueueName | InboundQueue_1      |
            | databaseName     | New Leads Inbound 1 |
            | defaultPageName  | Homepage            |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | tomorrow    | 1    | false      | false |
            | 12   | day after   | 2    | false      | false |
            | 12   | next week   | week | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
            | 12   | 2    | true   |
            | 12   | week | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Inbound Queues |
            | inboundQueue | InboundQueue_1 |
            | timeInterval | This Month     |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 3             |
            | bookedHours     | 01:30:00      |
            | availableHours  | month         |
            | percentOccupied | month         |

    @7053
    Scenario: Calendar Monitor - Inbound Queues - Next Month
        When user access the Calendar manager menu
        And  user selects the calendar 'events' tab
        And user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'Inbound this month'
            | inboundQueueName | InboundQueue_1      |
            | databaseName     | New Leads Inbound 1 |
            | defaultPageName  | Homepage            |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        Then login to Voice Channel with '100' extension
        And user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        Then user state should be 'ready'
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501602         | 999888777    | 1        |
        Then user state should be 'talking'
        And let user wait for '3' seconds
        And user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days  | concurrent | error |
            | 12   | tomorrow    | 1     | false      | false |
            | 12   | day after   | 2     | false      | false |
            | 12   | next month  | month | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days  | status |
            | 12   | 1     | true   |
            | 12   | 2     | true   |
            | 12   | month | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Inbound Queues |
            | inboundQueue | InboundQueue_1 |
            | timeInterval | Next Month     |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | next month    |
            | percentOccupied | next month    |

    @7056
    Scenario: Calendar Monitor - Ticket Queues - This Month
        When Delete 'MailboxIn_1' mailbox rules
        When User navigate to ticket channel and take count of NEW Tickets
        And Send email with subject as 'random'
        Then user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for ' this month'
            | ticketQueueName | TicketQueue_1        |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        When User opens ticket from tickets list
        And user navigates to script and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | tomorrow    | 1    | false      | false |
            | 12   | day after   | 2    | false      | false |
            | 12   | after week  | week | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        When user clicks on close ticket
        And user close the ticket with subject 'SubjectChild_1'
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
            | 12   | 2    | true   |
            | 12   | week | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Tickets Queues |
            | ticketQueue  | TicketQueue_1  |
            | timeInterval | This Month     |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 3             |
            | bookedHours     | 01:30:00      |
            | availableHours  | month         |
            | percentOccupied | month         |

    @7057
    Scenario: Calendar Monitor - Ticket Queues - Next Month
        When Delete 'MailboxIn_1' mailbox rules
        When User navigate to ticket channel and take count of NEW Tickets
        And Send email with subject as 'random'
        Then user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for ' next month'
            | ticketQueueName | TicketQueue_1        |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And user select 'calendar' element
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        Then select ticket queue 'TicketQueue_1' from ticket channel
        When On ticket search page, search 'automation.user01@outlook.com'
        Then user searches for his ticket by using 'new' as ticket status
        When User opens ticket from tickets list
        And user navigates to script and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description   | days  | concurrent | error |
            | 12   | tomorrow      | 1     | false      | false |
            | 12   | day afte      | 2     | false      | false |
            | 12   | after 1 month | month | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        When user clicks on close ticket
        And user close the ticket with subject 'SubjectChild_1'
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days  | status |
            | 12   | 1     | true   |
            | 12   | 2     | true   |
            | 12   | month | true   |
        When user access the Calendar monitor menu
        And user search the calendar by using following configurations:
            | ownerType    | Tickets Queues |
            | ticketQueue  | TicketQueue_1  |
            | timeInterval | Next Month     |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | next month    |
            | percentOccupied | next month    |

    @7048
    Scenario: Calendar Monitor - Outbound Campaign - This Month
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarMonitor'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description                          | days | concurrent | error |
            | 10   | Booking Event for tomorrow           | 1    | false      | false |
            | 10   | Booking Event for day after tomorrow | 2    | false      | false |
            | 10   | Booking Event for next week          | week | false      | false |
        Then user navigates back to script from calendar page
        And user validate the script
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
            | 10   | 2    | true   |
            | 10   | week | true   |
        When user access the Calendar monitor menu
        Then user search the calendar by using following configurations:
            | ownerType    | OutBound Campaigns |
            | campaign     | OutboundCampaign_1 |
            | timeInterval | This Month         |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 3             |
            | bookedHours     | 01:30:00      |
            | availableHours  | month         |
            | percentOccupied | month         |

    @7049
    Scenario: Calendar Monitor - Outbound Campaign - Next Month
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarMonitor'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description                          | days  | concurrent | error |
            | 10   | Booking Event for tomorrow           | 1     | false      | false |
            | 10   | Booking Event for day after tomorrow | 2     | false      | false |
            | 10   | Booking Event for next month         | month | false      | false |
        Then user navigates back to script from calendar page
        And user validate the script
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days  | status |
            | 10   | 1     | true   |
            | 10   | 2     | true   |
            | 10   | month | true   |
        When user access the Calendar monitor menu
        Then user search the calendar by using following configurations:
            | ownerType    | OutBound Campaigns |
            | campaign     | OutboundCampaign_1 |
            | timeInterval | Next Month         |
        And validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | next month    |
            | percentOccupied | next month    |

    @1353
    Scenario: Calendar - Non-concurrent Events - Voice Online
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration | concurrent |
            | GOEvent   | 09:00     | 18:00   | 30       | false      |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarManager'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | First       | 1    | false      | false |
            | 12   | Second      | 1    | true       | true  |
        Then user navigates back to script from calendar page
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name

    @1349
    Scenario: Calendar - Required Bookings - Voice Online
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 12:30   | 15       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 08:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarManager'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        And validate the current date is active
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 11   | test        | -1   | false      | false |
        Then user navigates back to script from calendar page
        And user validate the script
        Then verify the error message displayed
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name

    @1350
    Scenario: Calendar - Create reservation with scheduled events - Voice Online
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarManager'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'same' window
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | test        | 1    | false      | false |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
        Then user selects the reservation scheduled for next day at '12' hour
        Then user validate that reservation following parameter are displayed:
            | createdBy   | System Administrator |
            | preEvent    | 0                    |
            | postEvent   | 0                    |
            | startDate   | 1                    |
            | endDate     | 1                    |
            | description | test                 |
        Then user selects contactinfo option in reservation and redirected to crm page

    @1354
    Scenario: Calendar - Preparation Times - Voice Online
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration | concurrent | preEvent | postEvent |
            | GOEvent   | 09:00     | 18:00   | 30       | false      | 10       | 10        |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'calendarManager'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days | concurrent | error |
            | 12   | First       | 1    | false      | false |
        Then user navigates back to script from calendar page
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name

    @7058
    Scenario: Calendar Permissions - Delete Reservations
        When I re-login using 'Supervisor_1' account
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | true  |
            | editReservations         | false |
            | editAndCloseReservations | false |
        And user save the settings
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'delete permissions'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 0        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days |
            | 10   | First       | 1    |
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
        When user select the reservation previously made at '10'
        And user validates the 'Delete' button is 'true'
        Then select the 'Delete' button while reservation
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | false  |
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | false |
            | editReservations         | false |
            | editAndCloseReservations | false |
        And user save the settings
        When I re-login using 'Supervisor_1' account
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days |
            | 10   | Second      | 1    |
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
        When user select the reservation previously made at '10'
        And user validates the 'Delete' button is 'false'
        And close the edit modal
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |

    @7060
    Scenario: Calendar Permissions - Edit and Close Reservations
        When I re-login using 'Supervisor_1' account
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | true |
            | editReservations         | true |
            | editAndCloseReservations | true |
        And user save the settings
        When I re-login using 'Supervisor_1' account
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | false |
            | editReservations         | false |
            | editAndCloseReservations | true  |
        And user save the settings
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'edit permissions'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description                | days |
            | 10   | Booking Event for tomorrow | 1    |
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
        When user select the reservation previously made at '10'
        And user validates the 'Block' button is 'true'
        Then user blocks the event
        Then verify success message is displayed 'Reservation successfully edited.'
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
        When user select the reservation previously made at '10'
        And user validates the 'Block' button is 'false'
        Then close reservation modal
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | false |
            | editReservations         | false |
            | editAndCloseReservations | false |
        And user save the settings
        When I re-login using 'Supervisor_1' account
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description                | days |
            | 12   | Booking Event for tomorrow | 1    |
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |

    @7059
    Scenario: Calendar Permissions - Edit Reservations
        When I re-login using 'Supervisor_1' account
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | true |
            | editReservations         | true |
            | editAndCloseReservations | true |
        And user save the settings
        When I re-login using 'Supervisor_1' account
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | false |
            | editReservations         | true  |
            | editAndCloseReservations | false |
        And user save the settings
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        Then user selects add event option
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration | preEvent | postEvent |
            | Event#1   | 09:00     | 18:00   | 30       | 5        | 5         |
        Then user selects the calendar 'calendars' tab
        Then user selects add calendar option
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref           |
            | GOCalendar   | 09:00     | 20:00   | CalendarRef_1 |
        When user selects script builder from menu
        And user create a new script for 'edit permissions'
            | campaignName    | OutboundCampaign_1   |
            | databaseName    | New Leads Outbound 1 |
            | defaultPageName | Homepage             |
        When user add 1 element 'calendar' to the script
        And select the 'calendar' element
        When configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days |
            | 10   | First       | 1    |
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 10   | 1    | true   |
        When user select the reservation previously made at '10'
        And user validate description is enabled 'true'
        And user validate pre-event is editable 'true'
        Then user update event in calendar with following information:
            | description | Edit |
            | preEvent    | true |
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour  | days | status | preEvent |
            | 09:55 | 1    | true   | true     |
        When user access profile manager menu
        And user selects 'Full Access' tab
        When user configure the following data on the section Calendar Permissions:
            | deleteReservations       | false |
            | editReservations         | false |
            | editAndCloseReservations | false |
        And user save the settings
        When I re-login using 'Supervisor_1' account
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8094217411' in ready state
        And user make a call
        And user state should be 'talking'
        When user navigates to script tab in voice channel and select the script
        And user selects calendar element
        Then user books event in calendar with following information:
            | hour | description | days |
            | 12   | Second      | 1    |
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |
        When user select the reservation previously made at '12'
        And user validate description is enabled 'false'
        And user validate pre-event is editable 'false'
        And close the edit modal
        When user navigates back to script from calendar page
        And user validate the script
        Then verify success message is displayed 'Is Valid'
        And user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        And user selects the calendar 'visualization' tab
        Then user validates scheduled reservation with following information:
            | hour | days | status |
            | 12   | 1    | true   |