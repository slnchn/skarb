const { testCurrencies } = require('./currencies');
const { testWallets } = require('./wallets');
const { execAsync } = require('./utils');
const { testWhistory } = require('./whistory');

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

(async () => {
  // test currencies
  await cleanup();
  await init();
  await testCurrencies();

  // // test wallets
  await cleanup();
  await init();
  await testWallets();

  // test whistory
  await cleanup();
  await init();
  await testWhistory();
})();
