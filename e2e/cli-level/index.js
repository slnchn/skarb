const { testCurrencies } = require('./currencies');
const { testWallets } = require('./wallets');
const { testWhistory } = require('./whistory');

const { runTest } = require('../utils');

const runCliLevelTests = async () => {
  await runTest(testCurrencies);
  await runTest(testWallets);
  await runTest(testWhistory);
};

module.exports = { runCliLevelTests };
