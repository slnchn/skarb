const { testCurrencies } = require('./currencies');
const { testWallets } = require('./wallets');
const { testWhistory } = require('./whistory');

const { execAsync } = require('./utils');

const cleanup = async () => {
  try {
    await execAsync('rm -rf skarb.log');
    await execAsync('rm -rf skarb.sqlite3');
  } catch (err) {
    console.error(err);
  }
};

const init = async () => {
  await execAsync('skarb init');
  await execAsync('skarb migrate');
};

const runTest = async (test) => {
  await cleanup();
  await init();
  await test();
};

(async () => {
  await runTest(testCurrencies);
  await runTest(testWallets);
  await runTest(testWhistory);

  await cleanup();
})();
