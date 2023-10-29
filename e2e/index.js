const { testCurrencies } = require('./currencies');
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

(async () => {
  await cleanup();
  await init();

  // currencies
  await testCurrencies();
})();
