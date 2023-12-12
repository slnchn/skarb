const { insertCurrencies } = require('./currencies');
const { insertWallets } = require('./wallets');

const { execAsync, delay } = require('./utils');

const FIRST_WHISTORY_DATE = '2020-01-01';
const SECOND_WHISTORY_DATE = '2020-01-02';
const THIRD_WHISTORY_DATE = '2020-01-03';

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

const insertWhistory = async () => {
  await execAsync(`skarb whistory add -w 1 -a 100 -d ${FIRST_WHISTORY_DATE}`);
  await delay(100);
  await execAsync(`skarb whistory add -w 1 -a 200 -d ${SECOND_WHISTORY_DATE}`);
  await delay(100);
  await execAsync(`skarb whistory add -w 1 -a 300 -d ${THIRD_WHISTORY_DATE}`);
};

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
