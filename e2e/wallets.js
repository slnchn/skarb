const { insertCurrencies } = require('./currencies');
const { execAsync, delay } = require('./utils');

const RESULT_TABLE_AFTER_FIRST_INSERT = `
┌─────────┬────┬─────────────┬────────────┬──────────┐
│ (index) │ id │    name     │ currencyId │ currency │
├─────────┼────┼─────────────┼────────────┼──────────┤
│    0    │ 1  │ 'WalletUSD' │     1      │  'USD'   │
│    1    │ 2  │ 'WalletEUR' │     2      │  'EUR'   │
│    2    │ 3  │ 'WalletPLN' │     3      │  'PLN'   │
└─────────┴────┴─────────────┴────────────┴──────────┘`;

const RESULT_TABLE_AFTER_DELETION = `
┌─────────┬────┬─────────────┬────────────┬──────────┐
│ (index) │ id │    name     │ currencyId │ currency │
├─────────┼────┼─────────────┼────────────┼──────────┤
│    0    │ 1  │ 'WalletUSD' │     1      │  'USD'   │
│    1    │ 2  │ 'WalletEUR' │     2      │  'EUR'   │
└─────────┴────┴─────────────┴────────────┴──────────┘`;

const insertWallets = async () => {
  await execAsync('skarb wallets add -n WalletUSD -c 1');
  await delay(100);
  await execAsync('skarb wallets add -n WalletEUR -c 2');
  await delay(100);
  await execAsync('skarb wallets add -n WalletPLN -c 3');
};

const testInsertingWallets = async () => {
  await insertCurrencies();
  await insertWallets();
  const { stdout } = await execAsync('skarb wallets list');
  if (!stdout.includes(RESULT_TABLE_AFTER_FIRST_INSERT)) {
    console.log(stdout);
    throw new Error('testInsertingWallets failed');
  }
};

const testRemovingWallets = async () => {
  await execAsync('skarb wallets rm -w 3 --hard');
  const { stdout } = await execAsync('skarb wallets list');
  if (!stdout.includes(RESULT_TABLE_AFTER_DELETION)) {
    console.log(stdout);
    throw new Error('testRemovingWallets failed');
  }
};

const testWallets = async () => {
  await testInsertingWallets();
  await testRemovingWallets();
  console.log('testWallets passed!');
};

module.exports = { testWallets, insertWallets };
