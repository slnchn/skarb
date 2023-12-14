const { testCurrencies } = require('./currencies');
const { testWallets } = require('./wallets');
const { testWhistory } = require('./whistory');

const { runTest } = require('../utils');

const runDatabaseLevelTests = async () => {
  await runTest(testCurrencies);
  await runTest(testWallets);
  await runTest(testWhistory);
};

module.exports = { runDatabaseLevelTests };
