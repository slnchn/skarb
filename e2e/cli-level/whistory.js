const {
  execAsync,
  insertWhistory,
  insertCurrencies,
  insertWallets,
} = require('../utils');

const RESULT_TABLE_AFTER_FIRST_INSERT = `
┌─────────┬────┬──────────┬─────────────┬──────────────┬────────┐
│ (index) │ id │ walletId │   wallet    │     date     │ amount │
├─────────┼────┼──────────┼─────────────┼──────────────┼────────┤
│    0    │ 3  │    1     │ 'WalletUSD' │ '2020-01-03' │  300   │
│    1    │ 2  │    1     │ 'WalletUSD' │ '2020-01-02' │  200   │
│    2    │ 1  │    1     │ 'WalletUSD' │ '2020-01-01' │  100   │
└─────────┴────┴──────────┴─────────────┴──────────────┴────────┘
`;

const RESULT_TABLE_AFTER_DELETION = `
┌─────────┬────┬──────────┬─────────────┬──────────────┬────────┐
│ (index) │ id │ walletId │   wallet    │     date     │ amount │
├─────────┼────┼──────────┼─────────────┼──────────────┼────────┤
│    0    │ 2  │    1     │ 'WalletUSD' │ '2020-01-02' │  200   │
│    1    │ 1  │    1     │ 'WalletUSD' │ '2020-01-01' │  100   │
└─────────┴────┴──────────┴─────────────┴──────────────┴────────┘
`;

const testInsertingWhistory = async () => {
  await insertCurrencies();
  await insertWallets();
  await insertWhistory();
  const { stdout } = await execAsync('skarb whistory list');
  if (!stdout.includes(RESULT_TABLE_AFTER_FIRST_INSERT)) {
    console.log(stdout);
    throw new Error('testInsertingWhistory failed');
  }
};

const testRemovingWhistory = async () => {
  await execAsync('skarb whistory rm -wh 3 --hard');
  const { stdout } = await execAsync('skarb whistory list');
  if (!stdout.includes(RESULT_TABLE_AFTER_DELETION)) {
    console.log(stdout);
    throw new Error('testRemovingWhistory failed');
  }
};

const testWhistory = async () => {
  await testInsertingWhistory();
  await testRemovingWhistory();
  console.log('testWhistory passed!');
};

module.exports = { testWhistory };
