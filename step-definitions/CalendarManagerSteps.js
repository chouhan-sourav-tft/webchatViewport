const { When, Then } = require('@cucumber/cucumber');
const { CalendarManager } = require('../page-objects/CalendarManager.po');
const dayjs = require('dayjs');
const calendarManager = new CalendarManager();
let eventName = '';
let calendarName = '';
global.calendarName = '';

When('user access the Calendar manager menu', async () => {
  await calendarManager.navigateToCalendarManagerMenu();
});

Then('user selects the calendar {string} tab', async (tabName) => {
  await calendarManager.selectTab(tabName);
});

Then('user selects add event option', async () => {
  await calendarManager.clickToAddEvent();
});

When('user validates form without filling in the required fields', async () => {
  await calendarManager.validateForm();
});

When(
  'user creates an event with following configurations:',
  async (datatable) => {
    let eventData = '';
    datatable.hashes().forEach((element) => {
      global.eventName = eventName = element.eventName + new Date().getTime();
      eventData = {
        eventName: eventName,
        startTime: element.startTime,
        endTime: element.endTime,
        duration: element.duration,
        concurrent: element.concurrent,
        preEvent: element.preEvent,
        postEvent: element.postEvent,
      };
    });
    await calendarManager.createEvent(eventData);
  }
);

When('user deletes all previous events', async () => {
  await calendarManager.deleteAllPreviousEvents();
});

When('search the created event', async () => {
  await calendarManager.searchEvent(eventName);
});

When('user edit an event with following configurations:', async (datatable) => {
  let eventData = '';
  datatable.hashes().forEach((element) => {
    eventData = {
      eventName: eventName,
      preEvent: element.preEvent,
      postEvent: element.postEvent,
    };
  });
  await calendarManager.editEvent(eventData);
});

When(
  'user creates a calendar with following configurations:',
  async (datatable) => {
    let calendarData = '';
    datatable.hashes().forEach((element) => {
      global.calendarName = calendarName =
        element.calendarName + new Date().getTime();
      if (!element.eventName) {
        element.eventName = eventName;
      }
      calendarData = {
        calendarName: calendarName,
        calendarRef: element.ref,
        startTime: element.startTime,
        endTime: element.endTime,
        eventName: element.eventName,
      };
    });
    await calendarManager.addCalendar(calendarData);
  }
);

Then('user selects add calendar option', async () => {
  await calendarManager.clickToAddCalendar();
});

Then(
  'user validates calendar form without filling in the required fields',
  async () => {
    await calendarManager.validateCalendar();
  }
);

When('user deletes all previous calendars', async () => {
  await calendarManager.deleteAllPreviouscalendar();
});

When('user removes an event', async () => {
  await calendarManager.removeEvent();
});

When('search the created calendar', async () => {
  await calendarManager.searchCalendar(calendarName);
});

When(
  'user edit a calendar with following configurations:',
  async (datatable) => {
    let eventData = '';
    datatable.hashes().forEach((element) => {
      eventData = {
        temporalExclusion: element.temporalExclusion,
        exclusionStartTime: element.exclusionStartTime,
        exclusionEndTime: element.exclusionEndTime,
      };
    });
    await calendarManager.editCalendar(eventData);
  }
);

When('user removes a calendar', async () => {
  await calendarManager.removeCalendar();
});

Then('user should see events', async () => {
  await calendarManager.verifyEventList();
});

When('user access the Calendar monitor menu', async () => {
  await calendarManager.navigateToCalendarMonitorMenu();
});

Then(
  'user search the calendar by using following configurations:',
  async (calendarDetails) => {
    let searchCalendarObject = calendarDetails.rowsHash();
    if (!searchCalendarObject.startDate)
      searchCalendarObject.startDate = dayjs().format('YYYY-MM-DD');
    if (!searchCalendarObject.endDate) {
      searchCalendarObject.endDate = dayjs().format('YYYY-MM-DD');
    }
    await calendarManager.searchCalendarDetails(searchCalendarObject);
  }
);

When(
  'validate that the calendar and the corresponding bookings are displayed correctly:',
  async (dataTable) => {
    const result = dataTable.rowsHash();
    if (!result.calendarName) {
      result.calendarName = calendarName;
    }
    await calendarManager.searchBooking(result.calendarName);
    await calendarManager.validateBookings(result);
  }
);

Then(
  'User select time slot at {string} hours after {int} day and verify error displayed',
  async (hour, days) => {
    await calendarManager.selectSlotAndVerifyError(hour, days);
  }
);

When(
  'user validates scheduled reservation with following information:',
  async (dataTable) => {
    let bookingDetails = [];
    dataTable.hashes().forEach((element) => {
      bookingDetails.push({
        hour: element.hour,
        days: element.days,
        status: element.status,
        preEvent: element.preEvent
      });
    });
    for (let i = 0; i < bookingDetails.length; i++) {
      await calendarManager.searchReservationCalendar(calendarName);
      await calendarManager.validateScheduledReservation(bookingDetails[i]);
    }
  }
);

Then('reset active variables', async () => {
  eventName = '';
  calendarName = '';
  global.calendarName = '';
  global.eventName = '';
});

When('set viewport for calendar', async () => {
  global.page.setViewportSize({ width: 1280, height: 620 });
});

When(
  'user configure the following data on the section Calendar Permissions:',
  async (table) => {
    const calenderPermissions = table.rowsHash();
    await calendarManager.setCalendarPermissions(calenderPermissions);
  }
);

When(
  'user select the reservation previously made at {string}',
  async (time) => {
    await calendarManager.openReservation(time);
  }
);

When(
  'user validates the {string} button is {string}',
  async (button, status) => {
    await calendarManager.checkButtonStatus(button, status);
  }
);

When('select the {string} button while reservation', async (button) => {
  await calendarManager.selectActionOnReservation(button);
});
Then(
  'user validate that reservation following parameter are displayed:',
  async (dataTable) => {
    const result = dataTable.rowsHash();
    if (!result.calendarName) {
      result.calendarName = calendarName;
    }
    if (!result.eventName) {
      result.eventName = eventName;
    }
    await calendarManager.validateReservation(result);
  }
);

Then(
  'user selects the reservation scheduled for next day at {string} hour',
  async (hour) => {
    await calendarManager.selectReservation(hour);
  }
);

Then(
  'user selects contactinfo option in reservation and redirected to crm page',
  async () => {
    await calendarManager.selectContactInfo();
  }
);

Then('validate the current date is active', async () => {
  await calendarManager.validateCurrentDate();
});

When('reset viewport for calendar', async () => {
  global.page.setViewportSize({ width: 1920, height: 1080 });
});

Then('close the edit modal', async () => {
  await calendarManager.closeEditModal();
});

When('close reservation modal', async () => {
  await calendarManager.closeReservationModal();
});

When('user validate description is enabled {string}', async (status) => {
  await calendarManager.descriptionEnabledStatus(status);
});

When('user validate pre-event is editable {string}', async (status) => {
  await calendarManager.preEventEnabledStatus(status);
});

When(
  'user update event in calendar with following information:',
  async (dataTable) => {
    const reservationData = dataTable.rowsHash();
    await calendarManager.updateReservation(reservationData);
  }
);
