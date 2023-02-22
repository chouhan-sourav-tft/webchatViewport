const { When, Then } = require('@cucumber/cucumber');
const { DialerControl } = require('../page-objects/DialerControl.po');

const dialerControl = new DialerControl();

When(
  'user creates the filter with following information:',
  async (datatable) => {
    await dialerControl.clickCreateFilter();
    let filterData = [];
    datatable.hashes().forEach(async (element) => {
      filterData.push({
        database: (global.newDBName[0]).toString(),
        field: element.field,
        group: element.group,
        filterType: element.filterType,
        startTime: element.startTime,
        endTime: element.endTime,
        filterData: element.filterData,
      });
    });
    for (let i = 0; i < filterData.length; i++) {
      if(i > 0){
        await dialerControl.addFilter();
      }
      await dialerControl.createFilter(filterData[i]);
    }
  }
);

Then('user selects the Apply button', async () => {
  await dialerControl.applyFilter();
});

When(
  'verify the hopper table preview with following information:',
  async (datatable) => {
    await dialerControl.clickToPreview();
    let hopperData = [];
    datatable.hashes().forEach(async (element) => {
      hopperData.push({
        name: element.name,
        phone: element.phone,
        email: element.email,
        postalCode: element.postalCode,
        city: element.city,
        Field_1: element.Field_1
      });
    });
    for (let i = 0; i < hopperData.length; i++) {
      await dialerControl.validateHopperData(hopperData[i], i);
    }
    await dialerControl.clickToClose();
  }
);

Then('clear all active filters', async () => {
  await dialerControl.clearFilters();
});

Then('clear all hopper preview data', async () => {
  await dialerControl.clearHopperData();
});

Then('update field to order by {string} with direction {string}', async (fieldOrder, direction) => {
  await dialerControl.updateConfiguration(fieldOrder, direction);
});

Then('user add new group', async () => {
  await dialerControl.addGroup();
});