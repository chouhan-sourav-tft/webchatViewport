const { When, Then } = require('@cucumber/cucumber');
const { AgentManagement } = require('../page-objects/AgentManagement.po');

const agent = new AgentManagement();

When('as supervisor navigate to Agent Management sub-menu', async () => {
  await agent.clickAgentManagement();
});

Then('user select {string} from agents_table', async (agentName) => {
  await agent.selectAgent(agentName);
});

Then('user select {string} from queue table', async (queueName) => {
  await agent.selectQueue(queueName);
});

Then('click on Associate Agents & Queues button', async () => {
  await agent.clickAssociateAgentQueueButton();
});

Then('click on Dessociate Agents & Queues button', async () => {
  await agent.clickDessociateAgentQueueButton();
});

Then('user select the permanent option', async () => {
  await agent.clickPermanentButton();
});

Then('verify the notification {string}', async (successMessage) => {
  await agent.verifySuccessPopup(successMessage);
});

Then('user update Force Inbound Queues to {string}',async(action)=>{
  if(action === 'true')
    await agent.activateForceInbound();
  else
    await agent.deactivateForceInbound();
});

Then('user select {string} from users_table', async (user) => {
  await agent.selectUser(user);
});