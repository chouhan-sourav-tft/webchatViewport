const playwright = require('playwright');
const { BeforeAll, Before, After, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { BaseAction } = require('./baseAction');

const baseAction = new BaseAction();
setDefaultTimeout(60 * 8* 10000);

global.headlessValue = false;

if(process.argv.includes('ENV=jenkins'))
  global.headlessValue = true;

// Launch options.
const options = {
  args: ['--start-maximized'],
  headless: global.headlessValue,
  slowMo: 100,
  channel: 'chrome', // or 'msedge'
};

// Create a global browser for the test session.
BeforeAll(async () => {
  console.log('before all ...');
  global.browser = await playwright['chromium'].launch(options);
});

AfterAll(async () => {
  console.log('after all ...');
  await global.browser.close();
  await baseAction.wait(2);
});

// Create a fresh browser context for each test.
Before(async () => {
  console.log('before ...');
  global.context = await global.browser.newContext({ viewport:  { width: 1920, height: 1080 } });
  if (global.headlessValue === true) {
    global.context = await global.browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
  } else {
    global.context = await global.browser.newContext({ viewport: null });
  }
  
  global.page = await global.context.newPage();
});

// close the page and context after each test.
After(async () => {
  console.log('after pass...');
  await global.page.close();
  await global.context.close();
  if( global.secondSession){
    await global.secondSession.close();    
    console.log('second session closed successfully');
  }
  if( global.thirdSession && global.secondSession){
    await global.thirdSession.close();        
    await global.secondSession.close(); 
    console.log('second and third session closed successfully');       
  }      
  if( global.fourthSession && global.thirdSession && global.secondSession){
    await global.fourthSession.close();        
    await global.thirdSession.close();        
    await global.secondSession.close(); 
    console.log('second, third and fourth session closed successfully');       
  }   
});


After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    let buffer = await global.page.screenshot({ path: `reports/${scenario.pickle.name}.png`, fullPage: true });
    this.attach(buffer, 'image/png');
    if (global.secondSession) {
      buffer = await global.secondSession.screenshot({
        path: `reports/${scenario.pickle.name}_secondWindow.png`,
        fullPage: true,
      });
      this.attach(buffer, 'image/png');
    }
    if (global.thirdSession) {
      buffer = await global.thirdSession.screenshot({
        path: `reports/${scenario.pickle.name}_thirdWindow.png`,
        fullPage: true,
      });
      this.attach(buffer, 'image/png');
    }   
    if (global.fourthSession) {
      buffer = await global.fourthSession.screenshot({
        path: `reports/${scenario.pickle.name}_fourthWindow.png`,
        fullPage: true,
      });
      this.attach(buffer, 'image/png');
    }     
  }
});