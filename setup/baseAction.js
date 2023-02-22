/*global page, secondSession, document, pageNew, promisify, context,window, thirdSession,fourthSession*/
const { expect, assert } = require('chai');
const dayjs = require('dayjs');
const nodemailer = require('nodemailer');
const { request } = require('playwright');
const fs = require('fs');

let defaultTimeout = 50000;

exports.BaseAction = class BaseAction {
  /**
   * function to type
   * @param {string} locator - locator of element
   * @param {string} value - text to type
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async type(locator, value, type = '') {
    if (type === 'second') {
      await secondSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      await this.wait(2); //wait for locator to be stable
      await secondSession.fill(locator, value);
    } else if (type === 'third') {
      await thirdSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      await this.wait(2); //wait for locator to be stable
      await thirdSession.fill(locator, value);
    } else if (type === 'fourth') {
      await fourthSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      await this.wait(2); //wait for locator to be stable
      await fourthSession.fill(locator, value);
    } else {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      await this.wait(2); //wait for locator to be stable
      await page.fill(locator, value);
    }
    console.log(value);
  }
  /**
   * function to click on element
   * @param {string} locator - locator of element
   * @param {string} [pageType=''] - type of page
   * @returns {void} nothing
   */
  async click(locator, pageType = '') {
    if (pageType === 'newTab') {
      await global.pageNew.click(locator, { timeOut: defaultTimeout });
    } else if (pageType == 'second') {
      await global.secondSession.click(locator, { timeOut: defaultTimeout });
    } else if (pageType === 'third') {
      await global.thirdSession.click(locator, { timeOut: defaultTimeout });
    } else if (pageType === 'fourth') {
      await global.fourthSession.click(locator, { timeOut: defaultTimeout });
    } else {
      await page.click(locator, { timeout: defaultTimeout });
    }
  }

  /**
   * function to click on element forcefully
   * @param {string} locator - locator of element
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async forceClick(locator, type = '') {
    if (type === 'second') {
      await global.secondSession.evaluate((locator) => {
        let marketSelektor = document.querySelector(locator);
        if (marketSelektor != null) {
          marketSelektor.click({ force: true });
        }
      }, locator);
    } else if (type === 'third') {
      await global.thirdSession.evaluate((locator) => {
        let marketSelektor = document.querySelector(locator);
        if (marketSelektor != null) {
          marketSelektor.click({ force: true });
        }
      }, locator);
    }
    if (type === 'fourth') {
      await global.fourthSession.evaluate((locator) => {
        let marketSelektor = document.querySelector(locator);
        if (marketSelektor != null) {
          marketSelektor.click({ force: true });
        }
      }, locator);
    } else {
      await page.locator(locator).click({ force: true });
    }
  }

  /**
   * function to generate alpha numeric string
   * @returns {string} - returns random string
   */
  userID_Alpha_Numeric() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  /**
   * function to select from dropdown with text
   * @param {string} locator - locator of element
   * @param {string} option - option to select
   * @returns {void} nothing
   */
  async dropdownOptionSelect(locator, option) {
    // Required to visible & take a count of dropdown
    await this.wait(4);
    let con =
      (await page
        .locator(locator + '//option[text()="' + option + '"]')
        .count()) > 0;
    if (con === true) {
      let attr = await page.getAttribute(
        locator + '//option[text()="' + option + '"]',
        'value'
      );
      if (attr != option) {
        option = attr;
      }
    }
    await page.locator(locator).selectOption(option);
  }

  /**
   * function to match two strings
   * @param {string} locator - locator of element
   * @param {string} text1 - text to assert
   * @param {string} text2 - text to assert
   * @returns {void} nothing
   */
  async containSubstring(text1, text2) {
    await expect(text1).contains(text2);
  }

  /**
   * function to validate element title contains that value
   * @param {string} locator - locator of element
   * @param {string} value - text
   * @returns {void} nothing
   */
  async shouldHasTitleValue(locator, value) {
    let element = await page.$(locator);
    let locatorValue = await element.getAttribute('title');
    expect(value).contains(locatorValue);
  }

  /**
   * function to check checkbox
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async checkboxIsChecked(locator) {
    return await page.isChecked(locator);
  }

  /**
   * function to verify element contains some text
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async shouldContainSomeText(locator) {
    await page.locator(locator).isVisible({ timeout: defaultTimeout });
    await page.locator(locator).innerText();
  }

  /**
   * function to get text from element
   * @param {string} locator - locator of element
   * @param {string} pageType - type of page
   * @returns {string} return text inside element
   */
  async getText(locator, pageType = '') {
    if (pageType == 'second') {
      await global.secondSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      let textString = await global.secondSession
        .locator(locator)
        .innerText({ timeout: defaultTimeout });
      return textString;
    } else if (pageType === 'third') {
      await global.thirdSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      let textString = await global.thirdSession
        .locator(locator)
        .innerText({ timeout: defaultTimeout });
      return textString;
    } else if (pageType === 'fourth') {
      await global.fourthSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      let textString = await global.fourthSession
        .locator(locator)
        .innerText({ timeout: defaultTimeout });
      return textString;
    } else {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      let textString = await page
        .locator(locator)
        .innerText({ timeout: defaultTimeout });
      return textString;
    }
  }

  /**
   * function to wait for response
   * @param {string} request - request url
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async waitForResponse(request, type = '') {
    if (type === 'second') {
      await global.secondSession.waitForResponse(request, {
        timeout: defaultTimeout,
      });
    } else if (type === 'third') {
      await global.thirdSession.waitForResponse(request, {
        timeout: defaultTimeout,
      });
    } else if (type === 'fourth') {
      await global.fourthSession.waitForResponse(request, {
        timeout: defaultTimeout,
      });
    } else {
      await page.waitForResponse(request, { timeout: defaultTimeout });
    }
  }

  /**
   * function to get current date
   * @returns {string} returns date
   */
  async getCurrentDate() {
    return dayjs().format('DD-MM-YYYY');
  }

  /**
   * function to click first element of similar locators
   * @param {string} locator - locator of element
   * @param {boolean} [isForce=false] - forcefully
   * @returns {void} nothing
   */
  async clickFirstElement(locator, isForce = false) {
    await page.locator(locator).first().click({ force: isForce });
  }

  /**
   * function to click last element of similar locators
   * @param {string} locator - locator of element
   * @param {string} [isForce=false] - forcefullt
   * @returns {void} nothing
   */
  async clickLastElement(locator, isForce = false) {
    await page.locator(locator).last().click({ force: isForce });
  }

  /**
   * function to send logs
   * @param {string} data - text
   * @returns {string} text data
   */
  async log(data) {
    await console.log(data);
    return true;
  }

  /**
   * function to scroll into element
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async scrollIntoElement(locator) {
    await page.locator(locator).scrollIntoViewIfNeeded();
  }

  /**
   * function to vaidate and then check checkbox
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async checkToCheckbox(locator) {
    await page.waitForSelector(locator);
    await page.locator(locator).isVisible({ timeOut: defaultTimeout });
    const flag = await page.isChecked(locator);
    if (!flag) {
      await page.check(locator);
    }
  }

  /**
   * function to validate and then uncheck checkbox
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async uncheckToCheckbox(locator) {
    await page.waitForSelector(locator);
    await page.locator(locator).isVisible({ timeOut: defaultTimeout });
    const flag = await page.isChecked(locator);
    if (flag) {
      await page.uncheck(locator);
    }
  }

  /**
   * function to get value of input text
   * @param {string} locator - locator of element
   * @returns {string} text value
   */
  async getValueFromTextInput(locator) {
    let element;
    element = await page.$eval(locator, (el) => el.value);
    return element;
  }

  /**
   * function to verify text in element
   * @param {string} locator - locator of element
   * @param {string} text - text
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async shouldContainText(locator, text, type = '') {
    if (type === 'second') {
      await secondSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      let locatorText = await secondSession.locator(locator).innerText();
      if (locatorText) {
        expect(locatorText).contains(text);
      }
    } else if (type === 'third') {
      await thirdSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      let locatorText = await thirdSession.locator(locator).innerText();
      if (locatorText) {
        expect(locatorText).contains(text);
      }
    } else if (type === 'fourth') {
      await fourthSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      let locatorText = await fourthSession.locator(locator).innerText();
      if (locatorText) {
        expect(locatorText).contains(text);
      }
    } else {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      let locatorText = await page.locator(locator).innerText();
      expect(locatorText).contains(text);
    }
  }

  /**
   * function to verify hidden and visiblity of new window
   * @param {string} locator - locator of element
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async shouldVisible(locator, type = '') {
    if (type === 'second') {
      let frame = await global.secondSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      assert.isTrue(frame);
    } else if (type === 'third') {
      let frame = await global.thirdSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      assert.isTrue(frame);
    } else if (type === 'fourth') {
      let frame = await global.fourthSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      assert.isTrue(frame);
    } else {
      let frame = await page
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      assert.isTrue(frame);
    }
  }
  /**
   * function to verify hidden and visiblity
   * @param {string} locator - locator of element
   * @param {boolean} visibility - visible or hidden
   * @returns {void} nothing
   */
  async verifyelementIsHidden(locator, visibility, type = '') {
    if (type === 'second') {
      let visible = await global.secondSession
        .locator(locator)
        .isHidden({ timeout: defaultTimeout });
      await expect(visible).to.equal(visibility);
    }
    if (type === 'third') {
      let visible = await global.thirdSession
        .locator(locator)
        .isHidden({ timeout: defaultTimeout });
      await expect(visible).to.equal(visibility);
    }
    if (type === 'fourth') {
      let visible = await global.fourthSession
        .locator(locator)
        .isHidden({ timeout: defaultTimeout });
      await expect(visible).to.equal(visibility);
    } else {
      let visible = await page
        .locator(locator)
        .isHidden({ timeout: defaultTimeout });
      await expect(visible).to.equal(visibility);
    }
  }
  /**
   * function to check visibility of element in new and current window
   * @param {string} locator - locator of element
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async isVisible(locator, type = '') {
    let Is = '';
    if (type === 'second') {
      Is = await secondSession
        .locator(locator)
        .first()
        .isVisible({ timeout: defaultTimeout });
    } else if (type === 'third') {
      Is = await thirdSession
        .locator(locator)
        .first()
        .isVisible({ timeout: defaultTimeout });
    } else if (type === 'fourth') {
      Is = await fourthSession
        .locator(locator)
        .first()
        .isVisible({ timeout: defaultTimeout });
    } else {
      Is = await page
        .locator(locator)
        .first()
        .isVisible({ timeout: defaultTimeout });
    }
    return Is;
  }

  /**
   * function to open browser
   * @param {string} url - url endpoint
   * @param {string} type - user session
   * @returns {void} nothing
   */
  async openBrowser(url, type = '') {
    if (type === 'second') {
      global.secondContext = await global.browser.newContext({ viewport: null, launchOptions: { args: ["--start-maximized"] } });
      global.secondSession = await global.secondContext.newPage();
      await global.secondSession.goto(url, { timeout: 50000 });
      await global.secondSession.waitForLoadState();
    }
    else if (type === 'third') {
      global.thirdContext = await global.browser.newContext({ viewport: null, launchOptions: { args: ["--start-maximized"] } });
      global.thirdSession = await global.thirdContext.newPage();
      await global.thirdSession.goto(url, { timeout: 50000 });
      await global.thirdSession.waitForLoadState();
    }
    else {
      await page.goto(url, { timeout: 50000 });
      await page.waitForLoadState();
    }
  }

  /**
   * function to wait for seconds
   * @param {string} time - time in seconds to wait
   * @returns {void} nothing
   */
  async wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time * 1000);
    });
  }

  /**
   * function to verify control exsits in element
   * @param {string} locator - locator of element
   * @returns {boolean} - boolean value for control
   */
  async isControlExist(locator) {
    try {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      const lengthOfElement = await promisify(page.then(($el) => $el.length));
      return lengthOfElement !== 0;
    } catch (e) {
      return false;
    }
  }

  /**
   * function to get attributes of element
   * @param {string} locator - locator of element
   * @param {string} attributeName - attribute of element
   * @param {string} type - user session
   * @returns {string} - attribute of element
   */
  async getAttributeElement(locator, attributeName, type = '') {
    let attributeOfElement = '';
    if (type === 'second') {
      await secondSession.locator(locator).isVisible({ timeout: defaultTimeout });
      attributeOfElement = await secondSession
        .locator(locator)
        .getAttribute(attributeName);
    } else if (type === 'third') {
      await thirdSession.locator(locator).isVisible({ timeout: defaultTimeout });
      attributeOfElement = await thirdSession
        .locator(locator)
        .getAttribute(attributeName);
    } else {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      attributeOfElement = await page
        .locator(locator)
        .getAttribute(attributeName);
    }
    return attributeOfElement.toString();
  }

  /**
   * function to count elements
   * @param {string} locator - locator of element
   * @returns {number} length
   */
  async countElement(locator, pageType = '') {
    let lengthOfElement;
    if (pageType === 'newTab') {
      lengthOfElement = await global.pageNew.locator(locator).count();
    } else if (pageType == 'second') {
      lengthOfElement = await global.secondSession.locator(locator).count();
    } else if (pageType === 'third') {
      lengthOfElement = await global.thirdSession.locator(locator).count();
    } else if (pageType === 'fourth') {
      lengthOfElement = await global.fourthSession.locator(locator).count();
    } else {
      lengthOfElement = await page.locator(locator).count();
    }
    return lengthOfElement;
  }

  /**
   * function to get random string
   * @param {string} string - string to concat
   * @returns {string} random string
   */
  async getRandomString(string) {
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return (result += string);
  }

  /**
   * function to trigger mouse over element
   * @param {string} locator - locator of element
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async mouseOver(locator, type = '') {
    if (type === 'second') {
      await secondSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      await secondSession.locator(locator).hover();
    } else if (type === 'third') {
      await thirdSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      await thirdSession.locator(locator).hover();
    } else if (type === 'fourth') {
      await fourthSession
        .locator(locator)
        .isVisible({ timeout: defaultTimeout });
      await fourthSession.locator(locator).hover();
    } else {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      await page.locator(locator).hover();
    }
  }

  /**
   * function to press keyboard key
   * @param {string} key - key name to press
   * @param {string} [type=''] - type of page
   * @returns {void} nothing
   */
  async pressKey(key, type = '') {
    if (type === 'second') {
      await secondSession.keyboard.press(key);
    } else if (type === 'third') {
      await thirdSession.keyboard.press(key);
    } else if (type === 'fourth') {
      await fourthSession.keyboard.press(key);
    } else {
      await page.keyboard.press(key);
    }
  }


  /**
   * function to upload file
   * @param {string} locator - locator of element
   * @param {string} filePath - filepath as string
   * @returns {void} nothing
   */
  async uploadFile(locator, filePath) {
    await page.waitForSelector(locator);
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.waitForSelector(locator),
      page.locator(locator).click(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  /**
   * function to browse file and upload
   * @param {string} locator - locator of element
   * @param {string} fileName - filename as string
   * @param {string} [newTab=''] - type of page
   * @returns {void} nothing
   */
  async browseFile(locator, fileName, newTab = '') {
    if (newTab === 'newTab') {
      await pageNew.setInputFiles(locator, fileName);
    } else {
      await page.setInputFiles(locator, fileName);
    }
  }

  /**
   * function to type in hidden text box
   * @param {string} locator - locator of element
   * @param {string} value - text to type
   * @returns {void} nothing
   */
  async typeInHiddenTextBox(locator, value) {
    await page.locator(locator).last().type(value);
  }

  /**
   * function to drag and drop elements
   * @param {string} sourceLocator - locator to be dragged
   * @param {string} targetLocator - locator of element where to drag
   * @returns {void} nothing
   */
  async dragAndDrop(sourceLocator, targetLocator) {
    const originElement = await page.waitForSelector(sourceLocator);
    const destinationElement = await page.waitForSelector(targetLocator);
    await originElement.hover();
    await page.mouse.down();
    const box = await destinationElement.boundingBox();
    await page.mouse.move(box.x + box.width, box.y + 5);
    await destinationElement.hover();
    await page.mouse.up();
  }

  /**
   * function to verify file has downloaded
   * @param {string} locator - locator of element
   * @param {string} fileName - filename as string
   * @returns {void} nothing
   */
  async verifyDownloadableFile(locator, fileName) {
    await page.locator(locator).isVisible({ timeout: defaultTimeout });
    await page.invoke('attr', 'href').then((href) => {
      page.downloadFile(href, 'downloads', fileName);
    });
    return true;
  }

  /**
   * function to open new tab
   * @param {string} url - url to open in new tab
   * @returns {void} nothing
   */
  async openNewTab(url) {
    global.pageNew = await context.newPage();
    await pageNew.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * function to open webchat pluggin in new tab and new window
   * @param {string} pageType - type of page
   * @returns {void} nothing
   */
  async pageEvaluate(pageType = '') {
    const domain = global.WEBCHAT_DOMAIN;
    const server = global.WEBCHAT_SERVER;
    if (pageType === 'newTab') {
      await pageNew.evaluate(
        ({ domain, server }) =>
          window.FSWebChat ||
          (function (d, s) {
            // eslint-disable-next-line no-undef
            let fs = (FSWebChat = function () { });
            fs._s = d.createElement(s);
            fs._h = d.getElementsByTagName(s)[0];
            fs._domain = domain;
            fs._hashkey = '838032635fe111386299e4d18eb2db06b4556838';
            fs._subfolder = '';
            fs._server = server;
            fs._service = '/new-webchat-service';
            fs._timestamp = +new Date();
            fs._s.setAttribute('charset', 'utf-8');
            fs._s.src =
              fs._server +
              fs._service +
              '/startup/' +
              fs._domain +
              '/' +
              fs._hashkey;
            fs._s.type = 'text/javascript';
            fs._s.async = true;
            fs._h.parentNode.insertBefore(fs._s, fs._h);
          })(document, 'script'),
        { domain, server }
      );
    } else if (pageType === 'second') {
      await secondSession.evaluate(
        ({ domain, server }) =>
          window.FSWebChat ||
          (function (d, s) {
            // eslint-disable-next-line no-undef
            let fs = (FSWebChat = function () { });
            fs._s = d.createElement(s);
            fs._h = d.getElementsByTagName(s)[0];
            fs._domain = domain;
            fs._hashkey = '838032635fe111386299e4d18eb2db06b4556838';
            fs._subfolder = '';
            fs._server = server;
            fs._service = '/new-webchat-service';
            fs._timestamp = +new Date();
            fs._s.setAttribute('charset', 'utf-8');
            fs._s.src =
              fs._server +
              fs._service +
              '/startup/' +
              fs._domain +
              '/' +
              fs._hashkey;
            fs._s.type = 'text/javascript';
            fs._s.async = true;
            fs._h.parentNode.insertBefore(fs._s, fs._h);
          })(document, 'script'),
        { domain, server }
      );
    } else if (pageType === 'third') {
      await thirdSession.evaluate(
        ({ domain, server }) =>
          window.FSWebChat ||
          (function (d, s) {
            // eslint-disable-next-line no-undef
            let fs = (FSWebChat = function () { });
            fs._s = d.createElement(s);
            fs._h = d.getElementsByTagName(s)[0];
            fs._domain = domain;
            fs._hashkey = '838032635fe111386299e4d18eb2db06b4556838';
            fs._subfolder = '';
            fs._server = server;
            fs._service = '/new-webchat-service';
            fs._timestamp = +new Date();
            fs._s.setAttribute('charset', 'utf-8');
            fs._s.src =
              fs._server +
              fs._service +
              '/startup/' +
              fs._domain +
              '/' +
              fs._hashkey;
            fs._s.type = 'text/javascript';
            fs._s.async = true;
            fs._h.parentNode.insertBefore(fs._s, fs._h);
          })(document, 'script'),
        { domain, server }
      );
    }
    else {
      await page.evaluate(
        ({ domain, server }) =>
          window.FSWebChat ||
          (function (d, s) {
            // eslint-disable-next-line no-undef
            let fs = (FSWebChat = function () { });
            fs._s = d.createElement(s);
            fs._h = d.getElementsByTagName(s)[0];
            fs._domain = domain;
            fs._hashkey = '838032635fe111386299e4d18eb2db06b4556838';
            fs._subfolder = '';
            fs._server = server;
            fs._service = '/new-webchat-service';
            fs._timestamp = +new Date();
            fs._s.setAttribute('charset', 'utf-8');
            fs._s.src =
              fs._server +
              fs._service +
              '/startup/' +
              fs._domain +
              '/' +
              fs._hashkey;
            fs._s.type = 'text/javascript';
            fs._s.async = true;
            fs._h.parentNode.insertBefore(fs._s, fs._h);
          })(document, 'script'),
        { domain, server }
      );
    }
  }

  // /**
  //  * function to open webchat pluggin in new tab and new window
  //  * @param {string} pageType - type of page
  //  * @returns {void} nothing
  //  */
  // async pageEvaluate(pageType = '') {
  //   const domain = global.WEBCHAT_DOMAIN;
  //   const server = global.WEBCHAT_SERVER;
  //   let webchatInjection = ` window.FSWebChat ||
  //     (function (d, s) {
  //       // eslint-disable-next-line no-undef
  //       let fs = FSWebChat = function() {};
  //       fs._s = d.createElement(s);
  //       fs._h = d.getElementsByTagName(s)[0];
  //       fs._domain = '${domain.toString()}';
  //       fs._hashkey = '838032635fe111386299e4d18eb2db06b4556838';
  //       fs._subfolder = '';
  //       fs._server = '${server.toString()}';
  //       fs._service = '/new-webchat-service';
  //       fs._timestamp = +new Date;
  //       fs._s.setAttribute('charset', 'utf-8');
  //       fs._s.src = fs._server + fs._service + '/startup/' + fs._domain + '/' + fs._hashkey;
  //       fs._s.type = 'text/javascript';
  //       fs._s.async = true;
  //       fs._h.parentNode.insertBefore(fs._s, fs._h);
  //     })(document, 'script')`;
  //   if (pageType === 'newTab') {
  //     await pageNew.evaluate(webchatInjection);
  //   } else if (pageType === 'second') {
  //     await secondSession.evaluate(webchatInjection);
  //   } else if (pageType === 'third') {
  //     await thirdSession.evaluate(webchatInjection);
  //   } else {
  //     await page.evaluate(webchatInjection);
  //   }
  // }

  /**
   * function to wait for selector to apppear
   * @param {string} selector - selector of element
   * @param {number} timeOut - time to wait
   * @param {string} [pageType=''] - type of page
   * @returns {void} nothing
   */
  async waitForSelector(selector, pageType = '', timeOut = defaultTimeout) {
    if (pageType === 'newTab') {
      await global.pageNew.waitForSelector(selector, {
        state: 'visible',
        timeout: timeOut,
      });
    } else if (pageType === 'second') {
      await global.secondSession.waitForSelector(selector, {
        state: 'visible',
        timeout: timeOut,
      });
    } else if (pageType === 'third') {
      await global.thirdSession.waitForSelector(selector, {
        state: 'visible',
        timeout: timeOut,
      });
    } else if (pageType === 'fourth') {
      await global.fourthSession.waitForSelector(selector, {
        state: 'visible',
        timeout: timeOut,
      });
    } else {
      await page.waitForSelector(selector, {
        state: 'visible',
        timeout: timeOut,
      });
    }
  }

  /**
   * function to verify element exists in dom
   * @param {string} locator - locator of element
   * @returns {boolean} true if element exist and vice versa
   */
  async isElementExist(locator) {
    return await page.$$(locator);
  }

  /**
   * function to clear text input
   * @param {string} locator - locator of element
   * @param {string} [pageType=''] - type of page
   * @returns {void} nothing
   */
  async clearField(locator, pageType = '') {
    if (pageType === 'second') {
      await global.secondSession.locator(locator).isVisible({ timeout: defaultTimeout });
      await global.secondSession.fill(locator, '');
    } else {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      await page.fill(locator, '');
    }
  }

  /**
   * function to count total element
   * @param {string} locator - locator of element
   * @param {number} countShouldBe - length
   * @returns {boolean} return assertion
   */
  async countTotalElementsCompare(locator, countShouldBe) {
    let countEle = await page.locator(locator).count();
    if (countEle >= countShouldBe) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * function to switch between tab
   * @param {string} [pageType=''] - type of page
   * @returns {void} nothing
   */
  async switchTab(pageType = '') {
    if (pageType === 'newTab') {
      global.pageNew.bringToFront();
    } else {
      page.bringToFront();
    }
  }

  /**
   * function to verify counters increment
   * @param {string} Pcounter - previous counter value
   * @param {string} Ncounter - new counter value
   * @returns {void} nothing
   */
  async verifyGreaterThan(Pcounter, Ncounter) {
    await assert.isTrue(Pcounter < Ncounter);
  }

  /**
   * function to verify counter less than
   * @param {string} Pcounter - previous counter
   * @param {string} Ncounter - new counter
   * @returns {void} nothing
   */
  async verifyLessThan(Pcounter, Ncounter) {
    await assert.isTrue(Pcounter > Ncounter);
  }

  /**
   * function to check checkbox
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async checkBox(locator) {
    await page.check(locator);
  }

  /**
   * function to verify mail recieved
   * @param {string} sentToEmail - email id
   * @param {string} subject - subject text
   * @returns {void} nothing
   */
  async mailCheck(sentToEmail, subject) {
    console.log('sentToEmail=', sentToEmail);
    console.log('subject=', subject);
    // Access mail using api-key
    const Getnada = await request.newContext({
      baseURL: 'https://getnada.com/api/v1/',
    });
    // Required to wait till mail received at destination
    await this.wait(50);
    let response = Getnada.get('inboxes/' + sentToEmail + '');

    (await response).json().then((data) => {
      console.log('###########  :-  ' + data.msgs[0]);
      let subjectData = data.msgs[0].s.includes(subject);
      assert.isTrue(subjectData);
      console.log(data.msgs[0].fe);
      console.log(data.msgs[0].rf);
    });
  }

  /**
   * function to verify download event was triggered
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async verifyDownload(locator) {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click(locator),
    ]);

    const path = await download.path();
    await this.containSubstring(download.suggestedFilename(), '.csv');
    await download.saveAs(download.suggestedFilename());

    try {
      if (fs.existsSync(path)) {
        //file exists
        const newFile = await fs.readFileSync(path);
        console.log(newFile);
      }
    } catch (err) {
      console.error(err);
    }
    return download.suggestedFilename();
  }

  /**
   * read csv and return data in array
   * @param {*} csvName
   * @returns
   */
  async readCsv(csvName) {
    // Reads the CSV file and saves it
    let dataInCSV = [];
    const csvPath = process.cwd() + '/' + csvName;

    let data = fs
      .readFileSync(csvPath)
      .toString() // convert Buffer to string
      .split('\n') // split string to lines
      .map((e) => e.trim()); // remove white spaces for each line

    // Start of for loop, to loop through csv file
    for (const entry of data) {
      // First csv file item sent to console
      console.log(entry);
      //   // Do whatever else you need
      dataInCSV.push(entry);
    }
    return dataInCSV;
  }

  /**
   * function to send email with subject
   * @param {string} receiverEmail - email id
   * @param {string} subject - text
   * @returns {void} nothing
   */
  async sendEmail(receiverEmail, subject) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: 'automation.user01@outlook.com',
        pass: 'Gocontact@123',
      },
      port: '995',
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'QaAutomation <automation.user01@outlook.com>', // sender address
      to: receiverEmail, // list of receivers   receiverEmail
      subject: subject, // Subject line
      text: 'Hello? This is a Test Email', // plain text body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  /**
   * function to check checkbox
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async checkCheckbosIsChecked(locator) {
    return await page.isChecked(locator);
  }

  /**
   * function to select options
   * @param {string} locator - locator of element
   * @param {string} indexValue - index in dropdown
   * @returns {void} nothing
   */
  async selectOption(locator, indexValue) {
    const dropdown = await page.$(locator);
    await dropdown.selectOption({ index: indexValue });
  }

  /**
   * function to assert two strings
   * @param {string} text1 - text
   * @param {string} text2 - text
   * @returns {void} nothing
   */
  async shouldHasText(text1, text2) {
    assert.equal(text1, text2);
  }

  /**
   * function to wait for redirections
   */
  async waitForNavigation() {
    await page.setDefaultTimeout(defaultTimeout);
    await page.waitForNavigation('networkidle', { timeout: defaultTimeout });
  }

  /**
   * function to generate random string
   * @returns {string} returns random string
   */
  generateRandomMessage() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return 'This is a test message ' + text;
  }

  /**
   * function to select option by value
   * @param {string} locator - locator of element
   * @param {string} value - select value
   * @returns {void} nothing
   */
  async selectOptionByValue(locator, value) {
    await page.locator(locator).selectOption(value);
  }

  /**
   * function to check if checkbox is checked
   * @param {string} locator - locator of element
   * @returns {boolean} return value if checked
   */
  async isChecked(locator) {
    const checked = await page.locator(locator).isChecked();
    return checked;
  }

  /**
   * function to count total elements with same selectors
   * @param {string} locator - locator of element
   * @param {string} countShouldBe - length
   * @returns {boolean} assertion value
   */
  async countTotalElements(locator, countShouldBe) {
    let countEle = await page.locator(locator).count();
    if (countEle === countShouldBe) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * function to slide element
   * @param {string} sourceLocator - locator of element
   * @param {string} targetLocator - locator of target element
   * @param {string} target - target type
   * @param {string} timeout - time to wait
   * @returns {void} nothing
   */
  async slider(sourceLocator, targetLocator, target, timeout = 2) {
    const d = new Date();
    let hour = d.getHours();
    const originElement = await page.waitForSelector(sourceLocator);
    const destinationElement = await page.waitForSelector(targetLocator);
    await originElement.hover();
    await page.mouse.down();
    await this.wait(timeout);
    const box = await destinationElement.boundingBox();
    if (target === 'outOfSchedule') {
      if (hour < 12) {
        await page.mouse.move(box.x + box.width - 50, box.y + box.height);
      } else {
        await page.mouse.move(box.x + box.width + 50, box.y + box.height);
      }
    }
    if (target === 'exception') {
      hour = hour - 6;
      await page.mouse.move(box.x + box.width + hour * 20, box.y + box.height);
    }
    if (target === 'reset') {
      if (hour < 12) {
        await page.mouse.move(box.x, box.y + box.height);
      } else {
        await page.mouse.move(box.x + 20, box.y + box.height);
      }
    }
    await page.mouse.up();
  }

  /**
   * function to get inner text of element
   * @param {string} locator - locator of element
   * @returns {string} element text
   */
  async getTexts(locator) {
    await page.locator(locator).isVisible({ timeout: defaultTimeout });
    const textString = await page.locator(locator).innerText();
    return textString;
  }

  /**
   * function to select option by text
   * @param {string} locator - locator of element
   * @param {string} text - text
   * @returns {void} nothing
   */
  async selectOptionByText(locator, text) {
    await page.selectOption(locator, { label: `${text}` });
  }

  /**
   * function to get the checked status of toggle button
   * @param  {string} locator - locator of element
   * @returns {boolean} status of toggle button
   */
  async getToggleButtonStatus(locator) {
    const result = await page.evaluate(
      (locator) => document.querySelector(locator).checked,
      locator
    );
    return result;
  }

  /**
   * function to convertCSVDataToJson
   * @param  {array} arr - csv array
   * @returns {object} json object
   */
  async conertCSVDataToJson(arr) {
    var jsonObj = [];
    var headers = arr[0].split(';');
    for (var i = 1; i < arr.length; i++) {
      var data = arr[i].split(';');
      var obj = {};
      for (var j = 0; j < data.length; j++) {
        obj[headers[j].replace(/["]/g, '').replace(/ /g, '_').replace(/[0-9]/g, '').replace(/-/g, '').trim()] = data[j].replace(/["]/g, '').trim();
      }
      jsonObj.push(obj);
    }
    return JSON.stringify(jsonObj);
  }

  /**
   * function to get nextday date from current date
   * @returns {string} returns date
   */
  async getTomorrowDate() {
    return dayjs().add(1, 'day').format('D');
  }

  /**
   * function to get nextday month from current month
   * @returns {string} returns month
   */
  async getTomorrowMonth() {
    //get current month
    let month = dayjs().month();
    //if I add 1 day to the current day and it's 1 (it's a new month)
    if (dayjs().add(1, 'day').format('D') == 1) {
      month = month + 1;
      if (month == 12) {
        month = 0;
      }
    }
    return month;
  }

  /**
   * function to get attributes value
   * @param {string} locator - locator of element
   * @returns {string} - attribute value
   */
  async getAttributeValue(locator, type) {
    let attributeValue = '';
    if (type === 'second') {
      await global.secondSession.locator(locator).isVisible({ timeout: defaultTimeout });
      attributeValue = await global.secondSession.locator(locator).inputValue();
    } else {
      await page.locator(locator).isVisible({ timeout: defaultTimeout });
      attributeValue = await page.locator(locator).inputValue();
    }
    return attributeValue.toString();
  }
  /**
   * function to sort array
   * @param  {array} data - object array
   * @param  {array} key - sort by key
   * @returns {object} sorted object array in decending
   */
  async sortArray(data, key) {
    data.sort(function (objA, objB) {
      return new Date(objB[key]) - new Date(objA[key]);
    });
    return data;
  }

  /**
   * function to scroll up
   * @returns {voic} nothing
   */
  async scrollup() {
    await page.evaluate(() => window.scrollTo(document.body.scrollHeight, 0));
  }

  /**
   * function to covert decimal time to hh:mm:ss
   * @param  {string} decimalTime - time in decimal
   * @returns {string} formatted time
   */
  async convertDecimalTime(decimalTime) {
    decimalTime = parseFloat(decimalTime);
    decimalTime = decimalTime * 60 * 60;
    var hours = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes = Math.floor((decimalTime / 60));
    decimalTime = decimalTime - (minutes * 60);
    var seconds = Math.round(decimalTime);
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return ('' + hours + ':' + minutes + ':' + seconds);
  }

  /**
   * Function to return round of decimal number
   * @param {string} value - number to be round of
   * @param {string} decimals - number of digits after decimal
   * @returns 
   */
  async round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  /**
   * function to verify hidden and visiblity
   * @param {string} locator - locator of element
   * @param {boolean} visibility - visible or hidden
   * @returns {void} nothing
   */
  async verifyVisibility(locator, visibility) {
    let visible = await page
      .locator(locator)
      .isVisible({ timeout: defaultTimeout });
    await expect(visible).to.equal(visibility);
  }

  /**
   * function to set input value
   * @param {Array} data - array of locator & value
   * @returns {void} nothing
   */
  async setInputValue(data) {
    await page.evaluate((datas) => {
      let n = datas.length;
      document.querySelector(datas[n - 2]).value = datas[n - 1];
    }, data);
  }

  /**
   * function to get alignment of element
   * @returns {void} nothing
   */
  async getElementAlignment(element) {
    const ele = await page.$(element);
    const textAlignment = await page.evaluate(el => window.getComputedStyle(el).textAlign, ele);
    return textAlignment;
  }

  /**
   * function to hide an element
   * @param {string} locator - locator of element
   * @returns {void} nothing
   */
  async hideElement(locator) {
    await page.evaluate(
      (locator) => document.querySelector(locator).style.display = 'none',
      locator
    );
  }

  /**
   * function to get element's background style
   * @param {string} locator - locator of element
   * @returns {string} style property value
   */
  async getBackground(locator) {
    const ele = await page.locator(locator);
    const background = await ele.evaluate((element) =>
      window.getComputedStyle(element).getPropertyValue('background'),
    );
    return background;
  }
};
