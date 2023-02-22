const { Given, When, Then } = require('@cucumber/cucumber');
const { Homepage } = require('../page-objects/HomePage.po');
const { SendEmail } = require('../page-objects/SendEmail.po');

const homepageObj = new Homepage();
const mail = new SendEmail();

Given('queue {string} should exist', async (queue) => {
  //@check queue exist in list
  await mail.wait(4); //too quick to respond
  await mail.checkQueueExist(queue);
});

When('user navigates to the Send Email page', async () => {
  //@user select the 'Send Email' option from the main page
  await homepageObj.clickNavBarButton();
  await homepageObj.clickSendEmailBtn();
});

Then('Confirm that only the {string} option is available', async (option) => {
  await mail.verifySendButton({ btn1: option });
});

When('user closes send email modal', async () => {
  //@click to close form
  await mail.elementClick('closeForm');
  //@reset form
  await mail.elementClick('resetForm');
});

Then(
  'Confirm that the {string} and {string} options are available',
  async (btn1, btn2) => {
    await mail.verifySendButton({ btn1: btn1, btn2: btn2 });
  }
);
