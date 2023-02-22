const { BaseAction } = require('../setup/baseAction');
const { expect, assert } = require('chai');
const dayjs = require('dayjs');

exports.CalendarManager = class CalendarManager extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    calendarMainMenu: '//a[@id="menu_9"]',
    calendarManagerMenu: '//a[@id="menu_40"]',
    calendarTab: '#calendar_btn_tab1',
    addEvent: '.add-event-btn',
    eventName: 'input[data-translate="calendarManager.eventForm.name"]',
    eventStartTime: 'input[data-translate="calendarManager.eventForm.allowedTime.startTime"]',
    eventEndTime: 'input[data-translate="calendarManager.eventForm.allowedTime.endTime"]',
    eventDuration: 'input[name="eventDuration"]',
    eventPreTime: 'input[name="preEventTime"]',
    eventPostTime: 'input[name="postEventTime"]',
    eventSave: '#eventSaveBtn',
    validationError: '//div[@id="newContentdiv"]//p[contains(text(),"Check the fields marked with error.")]',
    eventSaveConfirmation: '#modal-event-save-confirmation',
    saveConfirmButton: '.save-event-confirm-btn',
    successMessage: '.bigBox.animated.fadeIn.fast',
    deleteEventButton: '.event-table-container table tbody tr:first-child .calendar-event-remove-btn',
    totalEventList: '.calendar-event-remove-btn',
    confirmDeleteButton: '.remove-event-confirm-btn',
    inputSearch: '.event-table-container input[data-translate="tbl-search"]',
    editEventButton: '.event-table-container table tbody tr:first-child .calendar-event-edit-btn',
    addCalendarButton: '.add-calendar-btn',
    calendarNameTextBox: 'input[name="calendar_form_name"]',
    calendarRefTextBox: 'input[name="calendar_form_ref"]',
    calendarStartTimeTextBox: 'input[name="calendar_form_start_time"]',
    calendarEndTimeTextBox: 'input[name="calendar_form_end_time"]',
    calendarSaveButton: '#calendar_form_save',
    calendarSaveModal: '#add-calendar-modal > div',
    calendarSaveConfirmButton: '#add-calendar-confirm',
    calendarEventsTextBox: '[data-translate="calendarManager.calendarForm.calendarEvents"] ~div input',
    addCalendarValidationMessage: '.calendar_form_ctn [data-translate*="calendarManager.calendarForm.validationError"]',
    deleteCalendar: '.calendar-btn-remove',
    calendarConfirmDeleteButton: '#remove-calendar-confirm',
    calendarSearchTextBox: '#DataTables_Table_1_filter input[data-translate="tbl-search"]',
    editCalendarButton: 'button.calendar-btn-edit',
    temporalExclusionCheckBox: 'input[name="temporal_exclusions"]',
    mondayExclusionButton: '[name="exclusion_day_monday"]',
    tuesdayExclusionButton: '[name="exclusion_day_tuesday"]',
    exclusionStartTime: '[name="exclusion_start_time"]',
    exclusionEndTime: '[name="exclusion_end_time"]',
    editCalendarConfirmButton: '#edit-calendar-confirm',
    addButton: '.temporal_exclusions_weekly .add-exclusion',
    calendarMonitorMenu: '//a[@id="menu_41"]',
    ticketQueue: '#s2id_tickets_select input',
    searchButton: 'button[type="submit"] span[data-translate="search"]',
    startDate: '[id="start_date"]',
    endDate: '[id="end_date"]',
    calendarSearch: '#calendar-monitor-table_filter input',
    calendarName: '#calendar-monitor-table tbody td:nth-child(1)',
    calendarRef: '#calendar-monitor-table tbody td:nth-child(2)',
    totalBooking: '#calendar-monitor-table tbody td:nth-child(3)',
    bookedHours: '#calendar-monitor-table tbody td:nth-child(4)',
    availableHours: '#calendar-monitor-table tbody td:nth-child(5)',
    percentageOccupied: '#calendar-monitor-table tbody td:nth-child(6)',
    slotErrorPopUp:'//div[@id="newContentdiv"]/p[contains(text(),"Without available events for booking in the chosen schedule.")]',
    calendarSearchVisualization: 'input[name="calendars_filter"]',
    selectDay: '[class="fc-resourceTimeGridDay-button fc-button fc-button-primary"]',
    clickNext: '[aria-label="next"]',
    selectWeek: '.fc-resourceTimeGridWeek-button',
    selectToday: '.fc-today-button',
    campaignSection: '#owners_div #s2id_campaigns_select',
    inputText: '#select2-drop input',
    inboundQueue: '#s2id_queues_select input',
    sidePanelExpandMenu: '#left-panel .minifyme',
    concurrentBooking: 'span[data-translate="calendarManager.eventForm.concurrency.label"]',
    reservationStartDate: '//div[@id="reservation-edit-modal"]//div//label[@data-translate="bookingsClient.editModal.startDate"]/following-sibling::label',
    reservationEndDate: '//div[@id="reservation-edit-modal"]//div//label[@data-translate="bookingsClient.editModal.endDate"]/following-sibling::label',
    reservationCreatedBy: '//div[@id="reservation-editModal-createdBy"]//label[@class="reservation-field-createdBy"]',
    reservationCalendarName: '//div[@id="reservation-edit-modal"]//div//label[@class="reservation-field-calendar"]',
    reservationEventName: '//div[@id="reservation-edit-modal"]//div//label[@class="reservation-field-event"]',
    reservationPreEvent: 'input[name="preEventTimeSupervisor"]',
    reservationPostEvent: 'input[name="postEventTimeSupervisor"]',
    reservationContactInfo: '//div[@id="reservation-edit-modal"]//a[@data-translate="bookingsClient.editModal.contactInfo"]',
    crmPage: '//div[@id="crm-ctn-tabs"]',
    currentDate: '.fc-unthemed td.fc-today',
    reservationDescription: '//div[@id="reservation-edit-modal"]//div//textarea[@name="reservation_description"]',
    reservationDelete: '//button[@id="reservation-delete-step" and not(@disabled)]',
    confirmDelete: '#reservation-delete',
    deleteReservation:'[data-translate="deleteEvents"]',
    editReservation:'[data-translate="editEvents"]',
    closeModal: '#reservation-edit-modal button.close',
    editAndCloseReservation:'[data-translate="editAndCloseEvents"]',
    reservationPreEventStatus: '#agent-row .check-inline.edit-reservation-pre-event',
    reservationPostEventStatus: '#agent-row .check-inline.edit-reservation-post-event',
    closeDescriptionPopUp: '#reservation-edit-modal .close',
    preEventTime: '[name="preEventTime"]',
    postEventTime: '[name="postEventTime"]',
    closeEvent: 'button[data-translate="bookingsClient.showModal.btnClose"]',
    saveEditedReservation: '#reservation-save',
    reservationDescriptionStatus: '//div[@id="reservation-edit-modal"]//div//textarea[@name="reservation_description" and not(@disabled)]',
    preTimeStatus: '//input[@name="isPreEventTimeAgent" and not(@disabled)]',
    postTimeStatus: '//input[@name="isPostEventTimeAgent" and not(@disabled)]'
  };

  /**
   * Function to goto calendar manager menu
   * @return {void} Nothing
   */
  async navigateToCalendarManagerMenu() {
    await this.waitForSelector(this.elements.sidePanelExpandMenu);
    await this.click(this.elements.sidePanelExpandMenu);
    await this.waitForSelector(this.elements.calendarMainMenu);
    if(!(await this.isVisible(this.elements.calendarManagerMenu))){
      await this.click(this.elements.calendarMainMenu);
    }
    await this.waitForSelector(this.elements.calendarManagerMenu);
    await this.click(this.elements.calendarManagerMenu);
    await this.waitForSelector(this.elements.calendarTab);
    await this.click(this.elements.sidePanelExpandMenu);
  }

  /**
   * function to select tabs in calendar manager
   * @param {string} tabName - tab name to select
   * @return {void} Nothing
   */
  async selectTab(tabName) {
    let tabLocator = `span[data-translate='calendarManager.tab.${tabName}']`;
    await this.waitForSelector(tabLocator);
    await this.click(tabLocator);
  }

  /**
   * function to click add event
   * @return {void} Nothing
   */
  async clickToAddEvent() {
    await this.waitForSelector(this.elements.addEvent);
    await this.click(this.elements.addEvent);
    await this.waitForSelector(this.elements.eventName);
  }

  /**
   * function to validate form without filling required field
   * @return {void} Nothing
   */
  async validateForm() {
    await this.waitForSelector(this.elements.eventSave);
    await this.click(this.elements.eventSave);
    await this.waitForSelector(this.elements.validationError);
  }

  /**
   * function to create event
   * @param {object} eventData - data of event
   * @param {string} eventData.eventName - Event name
   * @param {string} eventData.startTime - Event start time
   * @param {string} eventData.endTime - Event end time
   * @param {string} eventData.duration - Event duration
   * @param {string} eventData.concurrent - Event concurrent status
   * @return {void} Nothing
   */
  async createEvent(eventData) {
    if(!eventData.preEvent){
      await this.waitForSelector(this.elements.eventName);
      await this.type(this.elements.eventName, eventData.eventName);
      await this.pressKey('Enter');
      await this.type(this.elements.eventStartTime, eventData.startTime);
      await this.pressKey('Enter');
      await this.type(this.elements.eventEndTime, eventData.endTime);
      await this.pressKey('Enter');
      await this.type(this.elements.eventDuration, eventData.duration);
      await this.pressKey('Enter');
      if(eventData.concurrent === 'true'){
        await this.checkToCheckbox(this.elements.concurrentBooking);
      }
      if(eventData.concurrent === 'false'){
        await this.uncheckToCheckbox(this.elements.concurrentBooking);
      }
      if(eventData.preEvent) {
        await this.type(this.elements.eventPreTime, eventData.preEvent);
        await this.pressKey('Enter');
      }
      if(eventData.postEvent) {
        await this.waitForSelector(this.elements.eventPostTime);
        await this.type(this.elements.eventPostTime, eventData.postEvent);
        await this.pressKey('Enter');
      }
      await this.click(this.elements.eventSave);
      await this.waitForSelector(this.elements.eventSaveConfirmation);
      await this.click(this.elements.saveConfirmButton);
      await this.waitForSelector(this.elements.successMessage);
    }
    else{
      await this.waitForSelector(this.elements.eventName);
      await this.type(this.elements.eventName, eventData.eventName);
      await this.pressKey('Enter');
      await this.type(this.elements.eventStartTime, eventData.startTime);
      await this.pressKey('Enter');
      await this.type(this.elements.eventEndTime, eventData.endTime);
      await this.pressKey('Enter');
      await this.type(this.elements.eventDuration, eventData.duration);
      await this.pressKey('Enter');

      await this.waitForSelector(this.elements.preEventTime);
      await this.clearField(this.elements.preEventTime);
      await this.type(this.elements.preEventTime,eventData.preEvent);

      await this.waitForSelector(this.elements.postEventTime);
      await this.clearField(this.elements.postEventTime);
      await this.type(this.elements.postEventTime,eventData.postEvent);

      await this.click(this.elements.eventSave);
      await this.waitForSelector(this.elements.eventSaveConfirmation);
      await this.click(this.elements.saveConfirmButton);
      await this.waitForSelector(this.elements.successMessage);
    }
  }

  /**
   * Function to delete all existing events
   * @return {void} Nothing
   */
  async deleteAllPreviousEvents() {
    await this.wait(2); //Wait to load all previous events
    if (await this.isVisible(this.elements.deleteEventButton)) {
      const totalEvents = await this.countElement(this.elements.totalEventList);
      for (var i = 0; i < totalEvents; i++) {
        await this.waitForSelector(this.elements.deleteEventButton);
        await this.click(this.elements.deleteEventButton);
        await this.waitForSelector(this.elements.confirmDeleteButton);
        await this.click(this.elements.confirmDeleteButton);
        await this.waitForSelector(this.elements.successMessage);
      }
    }
  }

  /**
   * function to search event
   * @param {string} eventName - Event name
   * @return {void} Nothing
   */
  async searchEvent(eventName) {
    await this.waitForSelector(this.elements.inputSearch);
    await this.type(this.elements.inputSearch, eventName);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.deleteEventButton);
  }

  /**
   * function to edit event
   * @param {object} eventData - data of event
   * @param {string} eventData.eventName - Event name
   * @param {string} eventData.preEvent - Event pre time
   * @param {string} eventData.postEvent - Event post time
   * @return {void} Nothing
   */
  async editEvent(eventData) {
    let editLocator = `button.calendar-event-edit-btn[data-event-name='${eventData.eventName}']`;
    await this.waitForSelector(editLocator);
    await this.click(editLocator);
    await this.waitForSelector(this.elements.eventPreTime);
    await this.type(this.elements.eventPreTime, eventData.preEvent);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.eventPostTime);
    await this.type(this.elements.eventPostTime, eventData.postEvent);
    await this.pressKey('Enter');
    await this.click(this.elements.eventSave);
    await this.waitForSelector(this.elements.eventSaveConfirmation);
    await this.click(this.elements.saveConfirmButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to create calendar
   * @param {object} calendarData - data of Calendar
   * @param {string} calendarData.calendarName - Calendar name
   * @param {string} calendarData.calendarRef - Calendar ref
   * @param {string} calendarData.startTime - Calendar start time
   * @param {string} calendarData.endTime - Calendar end time
   * @param {string} calendarData.eventName - Calendar event name
   * @return {void} Nothing
   */
  async addCalendar(calendarData) {
    await this.waitForSelector(this.elements.calendarNameTextBox);
    await this.type(this.elements.calendarNameTextBox, calendarData.calendarName);
    await this.click(this.elements.calendarRefTextBox);
    await this.type(this.elements.calendarRefTextBox, calendarData.calendarRef);
    await this.click(this.elements.calendarStartTimeTextBox);
    await this.type(this.elements.calendarStartTimeTextBox, calendarData.startTime);
    await this.click(this.elements.calendarEndTimeTextBox);
    await this.type(this.elements.calendarEndTimeTextBox, calendarData.endTime);
    await this.click(this.elements.calendarEventsTextBox);
    await this.type(this.elements.calendarEventsTextBox,calendarData.eventName);
    await this.pressKey('Enter');
    await this.click(this.elements.calendarSaveButton);
    await this.waitForSelector(this.elements.calendarSaveModal);
    await this.click(this.elements.calendarSaveConfirmButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to click add calendar
   * @return {void} Nothing
   */
  async clickToAddCalendar() {
    await this.waitForSelector(this.elements.addCalendarButton);
    await this.click(this.elements.addCalendarButton);
    await this.waitForSelector(this.elements.calendarNameTextBox);
  }

  /**
   * function to edit calendar
   * @param {object} eventData - data of calendar
   * @param {string} eventData.temporalExclusion - calendar name
   * @param {string} eventData.exclusionStartTime - calendar pre time
   * @param {string} eventData.exclusionEndTime - calendar post time
   * @return {void} Nothing
   */
  async editCalendar(eventData) {
    await this.waitForSelector(this.elements.editCalendarButton);
    await this.click(this.elements.editCalendarButton);
    await this.waitForSelector(this.elements.temporalExclusionCheckBox);
    if (eventData.temporalExclusion && !await this.isChecked(this.elements.temporalExclusionCheckBox)) {
      await this.click(this.elements.temporalExclusionCheckBox);
      await this.click(this.elements.mondayExclusionButton);
      await this.click(this.elements.tuesdayExclusionButton);
      await this.type(this.elements.exclusionStartTime, eventData.exclusionStartTime);
      await this.type(this.elements.exclusionEndTime, eventData.exclusionEndTime);
      await this.click(this.elements.addButton);
      await this.click(this.elements.calendarSaveButton);
      await this.click(this.elements.editCalendarConfirmButton);
    }
  }

  /**
   * function to validate form without filling required field
   * @return {void} Nothing
   */
  async validateCalendar() {
    await this.waitForSelector(this.elements.calendarSaveButton);
    await this.click(this.elements.calendarSaveButton);
    await this.countTotalElementsCompare(this.elements.addCalendarValidationMessage, 0);
  }

  /**
   * Function to delete all existing calendar
   * @return {void} Nothing
   */
  async deleteAllPreviouscalendar() {
    await this.wait(2); //Wait to load all previous events
    if (await this.isVisible(this.elements.deleteCalendar)) {
      const totalCalendar = await this.countElement(this.elements.deleteCalendar);
      for (var i = 0; i < totalCalendar; i++) {
        await this.waitForSelector(this.elements.deleteCalendar);
        await this.click(this.elements.deleteCalendar);
        await this.waitForSelector(this.elements.calendarConfirmDeleteButton);
        await this.click(this.elements.calendarConfirmDeleteButton);
        await this.waitForSelector(this.elements.successMessage);
      }
    }
  }

  /**
   * function to remove event
   * @return {void} Nothing
   */
  async removeEvent() {
    await this.waitForSelector(this.elements.deleteEventButton);
    await this.click(this.elements.deleteEventButton);
    await this.waitForSelector(this.elements.confirmDeleteButton);
    await this.click(this.elements.confirmDeleteButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to search calendar
   * @param {string} calendarName - calendar name
   * @return {void} Nothing
   */
  async searchCalendar(calendarName) {
    await this.waitForSelector(this.elements.calendarSearchTextBox);
    await this.type(this.elements.calendarSearchTextBox, calendarName);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.deleteCalendar);
  }

  /**
   * function to remove calendar
   * @return {void} Nothing
   */
  async removeCalendar() {
    await this.waitForSelector(this.elements.deleteCalendar);
    await this.click(this.elements.deleteCalendar);
    await this.waitForSelector(this.elements.calendarConfirmDeleteButton);
    await this.click(this.elements.calendarConfirmDeleteButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to verify event list
   * @return {void} Nothing
   */
  async verifyEventList() {
    await this.waitForSelector(this.elements.totalEventList);
    await assert.isTrue(await this.countTotalElementsCompare(this.elements.totalEventList, 0));
  }

  /**
   * Function to goto calendar monitor menu
   * @return {void} Nothing
   */
  async navigateToCalendarMonitorMenu() {
    await this.mouseOver(this.elements.calendarMainMenu);
    await this.waitForSelector(this.elements.calendarMonitorMenu);
    await this.click(this.elements.calendarMonitorMenu);
  }

  /**
   * function to search calendar bookings
   * @param {object} calendarDetails - search data of bookings
   * @param {string} calendarDetails.endDate - search end data
   * @param {string} calendarDetails.ownerType - owner type
   * @param {string} calendarDetails.ticketQueue - ticket queue name
   * @param {string} calendarDetails.timeInterval - time interval
   * @param {string} calendarDetails.startDate - search end data
   * @param {string} calendarDetails.campaign - outbound campaign
   * @return {void} Nothing
   */
  async searchCalendarDetails(calendarDetails) {
    if (calendarDetails.endDate === 'Tomorrow') {
      calendarDetails.endDate = await dayjs().add(1, 'day').format('YYYY-MM-DD');
    }
    //wait for page to load
    await this.wait(5);
    if (calendarDetails.ownerType) {
      let locator = `//div[@id='owner_radio_div']//span[text()='${calendarDetails.ownerType}']`;
      await this.waitForSelector(locator);
      await this.click(locator);
    }
    if (calendarDetails.inboundQueue) {
      await this.waitForSelector(this.elements.inboundQueue);
      await this.type(
        this.elements.inboundQueue,
        calendarDetails.inboundQueue
      );
      await this.pressKey('Enter');
    }
    if (calendarDetails.ticketQueue) {
      await this.waitForSelector(this.elements.ticketQueue);
      await this.type(
        this.elements.ticketQueue,
        calendarDetails.ticketQueue
      );
      await this.pressKey('Enter');
    }
    if (calendarDetails.campaign) {
      await this.wait(3);//wait to load dropdown
      await this.waitForSelector(this.elements.campaignSection);
      await this.click(this.elements.campaignSection);
      await this.waitForSelector(this.elements.inputText);
      await this.type(
        this.elements.inputText,
        calendarDetails.campaign
      );
      await this.pressKey('Enter');
    }
    if (calendarDetails.timeInterval) {
      let locator = `//div[@id='time_interval_div']//span[text()='${calendarDetails.timeInterval}']`;
      await this.waitForSelector(locator);
      await this.click(locator);
      if (calendarDetails.timeInterval === 'Custom Interval') {
        if (calendarDetails.startDate) {
          await this.type(this.elements.startDate, calendarDetails.startDate);
          await this.pressKey('Enter');
        }
        if (calendarDetails.endDate) {
          await this.type(this.elements.endDate, calendarDetails.endDate);
          await this.pressKey('Enter');
        }
      }
    }


    await this.waitForSelector(this.elements.searchButton);
    await this.forceClick(this.elements.searchButton);
  }

  /**
   * function to search calendar name in search result list
   * @param {string} calendarName - calendar name
   * @return {void} Nothing
   */
  async searchBooking(calendarName) {
    await this.waitForSelector(this.elements.calendarSearch);
    await this.type(this.elements.calendarSearch, calendarName);
    await this.pressKey('Enter');
  }

  /**
   * function to validate calendar bookings
   * @param {object} calendarDetails - booking data
   * @param {string} calendarDetails.calendarName - calendar Name
   * @param {string} calendarDetails.calendarRef - calendar Ref 
   * @param {string} calendarDetails.bookings - total bookings
   * @param {string} calendarDetails.bookedHours - number of booked hours
   * @param {string} calendarDetails.availableHours - number of available hours
   * @param {string} calendarDetails.percentOccupied -percentage occupied
   * @return {void} Nothing
   */
  async validateBookings(calendarDetails) {
    //wait for latest call to load
    await this.wait(2);
    await this.waitForSelector(this.elements.calendarName);
    if (calendarDetails.calendarName) {
      await this.shouldContainText(
        this.elements.calendarName,
        calendarDetails.calendarName
      );
    }
    if (calendarDetails.calendarRef) {
      await this.shouldContainText(
        this.elements.calendarRef,
        calendarDetails.calendarRef
      );
    }
    if (calendarDetails.bookings) {
      await this.shouldContainText(
        this.elements.totalBooking,
        calendarDetails.bookings
      );
    }
    if (calendarDetails.bookedHours) {
      await this.shouldContainText(
        this.elements.bookedHours,
        calendarDetails.bookedHours
      );
    }
    if (calendarDetails.availableHours) {
      if(calendarDetails.availableHours === 'month'){
        calendarDetails.availableHours = dayjs().daysInMonth() * 11 - (calendarDetails.bookings*0.5);
        calendarDetails.availableHours = await this.convertDecimalTime(calendarDetails.availableHours);
      }else if(calendarDetails.availableHours === 'next month'){
        calendarDetails.availableHours = dayjs().add(1, 'month').daysInMonth() * 11 - (calendarDetails.bookings*0.5);
        calendarDetails.availableHours = await this.convertDecimalTime(calendarDetails.availableHours);
      }
      await this.shouldContainText(
        this.elements.availableHours,
        calendarDetails.availableHours
      );
    }
    if (calendarDetails.percentOccupied) {
      if(calendarDetails.percentOccupied === 'month'){
        calendarDetails.percentOccupied = (((calendarDetails.bookings*0.5) /(dayjs().daysInMonth() * 11))*100).toFixed(2);
      }else if(calendarDetails.percentOccupied === 'next month'){
        calendarDetails.percentOccupied =(((calendarDetails.bookings*0.5) /(dayjs().add(1, 'month').daysInMonth() * 11))*100).toFixed(2);
      }
      await this.shouldContainText(
        this.elements.percentageOccupied,
        calendarDetails.percentOccupied
      );
    }
  }

  /**
   * function to select time slot and verify error displayed
   * @param {string} hour - time hour of event
   * @param {string} days - number of days from today
   * @return {void} Nothing
   */
  async selectSlotAndVerifyError(hour,days) {
    await this.click(this.elements.selectDay);
    if (days === 'month') {
      days = dayjs().daysInMonth() + 1;
    }
    for (let i = 1; i <= days; i++) {
      await this.click(this.elements.clickNext);
    }
    await this.click(`[data-time="${hour}:00:00"]`);
    await this.waitForSelector(this.elements.slotErrorPopUp);
    let errorPopUp=await this.isVisible(this.elements.slotErrorPopUp);
    await assert.isTrue(errorPopUp);
  }
  
  /**
   * function to search reservation calendar
   * @param {string} calendarName - calendar name
   * @return {void} Nothing
   */
  async searchReservationCalendar(calendarName) {
    await this.waitForSelector(this.elements.calendarSearchVisualization);
    await this.type(this.elements.calendarSearchVisualization, calendarName);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.selectDay);
  }

  /**
   * function to validate scheduled reservation in calendar visualization
   * @param {Object} reservationData - reservation data object
   * @param {string} reservationData.hour - reservation hour
   * @param {string} reservationData.days - number of days from today
   * @param {string} reservationData.status - status of event
   * @param {string} reservationData.preEvent - status of preEvent
   * @return {void} Nothing
   */
  async validateScheduledReservation(reservationData) {
    await this.click(this.elements.selectDay);
    if(reservationData.days === 'month'){
      reservationData.days = dayjs().daysInMonth() +1;
    }
    if(reservationData.days === 'week'){
      await this.waitForSelector(this.elements.selectWeek);
      await this.click(this.elements.selectWeek);
      reservationData.days = 1;
    }
    for(let i=1; i<=(reservationData.days); i++){
      await this.waitForSelector(this.elements.clickNext);
      await this.click(this.elements.clickNext);
    }
    await this.wait(5);//wait to load element
    let bookingStatus = await this.isVisible(`[class='fc-event-container']>a div[data-start="${reservationData.hour}:00"]`);
    if(reservationData.preEvent){
      bookingStatus = await this.isVisible(`[class='fc-event-container']>a div[data-start="${reservationData.hour}"]`);
    }
    assert.equal(bookingStatus.toString(), reservationData.status);
    await this.click(this.elements.selectToday);
    await this.click(this.elements.selectWeek);
  }

  /**
   * function to validate reservation details
   * @param {string} reservationDetails - reservation details object
   * @param {string} reservationDetails.startDate - next (+number) date from today 
   * @param {string} reservationDetails.endDate - next (+number) date from today
   * @param {string} reservation.CalendarName -reservaation calendar name
   * @param {string} reservationDetails.eventName- reservation event name
   * @param {string} reservationDetails.preEvent- reservation pre event value
   * @param {string} reservationDetails.postEvent- reservation post event value
   * @param {string} reservationDetails.description- reservation description value
   * @return {void} Nothing
   */
  async validateReservation(reservationDetails) {
    let startdate = dayjs().add((reservationDetails.startDate), 'day').format('YYYY-MM-DD');
    let enddate = dayjs().add((reservationDetails.endDate), 'day').format('YYYY-MM-DD');

    await this.waitForSelector(this.elements.reservationStartDate);

    let startDate = await this.getTexts(this.elements.reservationStartDate);
    let currentStartdate = startDate.split(' ')[0];

    assert.equal(startdate, currentStartdate);

    await this.waitForSelector(this.elements.reservationEndDate);

    let endDate = await this.getTexts(this.elements.reservationEndDate);
    let currentEnddate = endDate.split(' ')[0];

    assert.equal(enddate, currentEnddate);

    if (reservationDetails.createdBy) {
      await this.shouldContainText(
        this.elements.reservationCreatedBy,
        reservationDetails.createdBy
      );
    }
    if (reservationDetails.calendarName) {
      await this.shouldContainText(
        this.elements.reservationCalendarName,
        reservationDetails.calendarName);
    }
    if (reservationDetails.eventName) {
      await this.shouldContainText(
        this.elements.reservationEventName,
        reservationDetails.eventName);
    }
    if (reservationDetails.preEvent) {
      const value = await this.getAttributeValue(this.elements.reservationPreEvent, 'aria-valuenow');
      assert.equal(value, reservationDetails.preEvent);
    }
    if (reservationDetails.postEvent) {
      const value = await this.getAttributeValue(this.elements.reservationPostEvent, 'aria-valuenow');
      assert.equal(value, reservationDetails.postEvent);
    }
    if (reservationDetails.description) {
      const expectedDesc = await this.getAttributeValue(this.elements.reservationDescription);
      await this.shouldHasText(expectedDesc, reservationDetails.description);
    }
  }

  /**
   * function to select reservation
   * @param {string} hour - reservation hour
   * @return {void} Nothing
   */
  async selectReservation(hour) {
    await this.isVisible(`[class='fc-event-container']>a div[data-start="${hour}:00"]`);
    await this.click(`[class='fc-event-container']>a div[data-start="${hour}:00"]`);
  }

  /**
   * function to select contact info in reservation
   * @return {void} nothing
   */
  async selectContactInfo() {
    await this.waitForSelector(this.elements.reservationContactInfo);
    await this.click(this.elements.reservationContactInfo);
    await this.isVisible(this.elements.crmPage);
  }

  /**
   * function to validate current date background style
   * @return {void} Nothing
   */
  async validateCurrentDate() {
    await this.click(this.elements.selectDay);
    let styleValue = await this.getBackground(this.elements.currentDate);
    expect(styleValue).contains('rgb(252, 248, 227)');
    await this.click(this.elements.selectWeek);
  }

  /**
   * function to set calendar permissions
   * @param {Object} calenderPermissions - calendar permissions
   * @param {string} calenderPermissions.deleteReservations - DeleteReservations
   * @param {string} calenderPermissions.editReservations - EditReservations
   * @param {string} calenderPermissions.editAndCloseReservations - EditAndCloseReservations
   * @return {void} Nothing
   */
  async setCalendarPermissions(calenderPermissions){

    if(calenderPermissions.deleteReservations === 'false'){
      if(await this.checkCheckbosIsChecked(this.elements.deleteReservation)){
        await this.uncheckToCheckbox(this.elements.deleteReservation);
      }
    } else {
      if(!await this.checkCheckbosIsChecked(this.elements.deleteReservation)){
        await this.checkBox(this.elements.deleteReservation);
      }
    }

    if(calenderPermissions.editReservations === 'false'){
      if(await this.checkCheckbosIsChecked(this.elements.editReservation)){
        await this.uncheckToCheckbox(this.elements.editReservation);
      }
    } else {
      if(!await this.checkCheckbosIsChecked(this.elements.editReservation)){
        await this.checkBox(this.elements.editReservation);
      }
    }

    if(calenderPermissions.editAndCloseReservations === 'false'){
      if(await this.checkCheckbosIsChecked(this.elements.editAndCloseReservation)){
        await this.uncheckToCheckbox(this.elements.editAndCloseReservation);
      }
    } else {
      if(!await this.checkCheckbosIsChecked(this.elements.editAndCloseReservation)){
        await this.checkBox(this.elements.editAndCloseReservation);
      }
    }
  }

  /**
   * function to open reservation
   * @param {string} reservationTime - reservation Time
   * @return {void} Nothing
   */
  async openReservation(reservationTime){
    await this.click(this.elements.selectDay);
    await this.click(this.elements.clickNext);
    await this.isVisible(`[class='fc-event-container']>a div[data-start="${reservationTime}:00"]`);
    await this.click(`[class='fc-event-container']>a div[data-start="${reservationTime}:00"]`);
  }

  /**
   * function to check action button status
   * @param {string} button - action button type
   * @param {string} status - action button status
   * @return {void} Nothing
   */
  async checkButtonStatus(button, status){
    await this.wait(20);//Load status
    if(button === 'Delete'){
      const buttonStatus = await this.isVisible(this.elements.reservationDelete); 
      assert.equal(status, buttonStatus.toString());
    }
  }

  /**
   * function to select action while reservation
   * @param {string} button - action button type
   * @return {void} Nothing
   */
  async selectActionOnReservation(button){
    if(button === 'Delete'){
      await this.click(this.elements.reservationDelete);
      await this.waitForSelector(this.elements.confirmDelete);
      await this.click(this.elements.confirmDelete);
      await this.waitForSelector(this.elements.successMessage);
    }
  }

  /**
   * function to close edit reservation modal
   * @return {void} Nothing
   */
  async closeEditModal(){
    if(await this.isVisible(this.elements.closeModal)){
      await this.click(this.elements.closeModal);
    } 
  }

  /**
 * function to close reservation modal
 * @return {void} Nothing
 */
  async closeReservationModal() {
    await this.click(this.elements.closeEvent);
  }

  /**
   * function to validate description is enable/disable
   * @param {string} status - status type
   * @return {void} Nothing
   */
  async descriptionEnabledStatus(status){
    await this.wait(20);//Load status
    const descriptionStatus = await this.isVisible(this.elements.reservationDescriptionStatus);
    assert.equal(status, descriptionStatus.toString());
  }

  /**
   * function to validate pre event is enabled/disable
   * @param {string} status - status type
   * @return {void} Nothing
   */
  async preEventEnabledStatus(status){
    let pCount = (status === 'true')?1:0;
    const preEventStatus = await this.countElement(this.elements.preTimeStatus); 
    assert.equal(pCount, preEventStatus);
    const postEventStatus = await this.countElement(this.elements.postTimeStatus); 
    assert.equal(pCount, postEventStatus);
  }

  /**
   * function to set calendar permissions
   * @param {Object} reservationData - reservation data
   * @param {string} reservationData.description - description 
   * @param {string} reservationData.preEvent - Pre Event
   * @return {void} Nothing
   */
  async updateReservation(reservationData){
    if(reservationData.description !== ''){
      await this.type(this.elements.reservationDescription, reservationData.description);
    }
    if(reservationData.preEvent){
      if(!await this.checkCheckbosIsChecked(this.elements.reservationPreEventStatus)){
        await this.checkBox(this.elements.reservationPreEventStatus);
      }
    }
    await this.waitForSelector(this.elements.saveEditedReservation);
    await this.click(this.elements.saveEditedReservation);
    await this.waitForSelector(this.elements.successMessage);
  }
};