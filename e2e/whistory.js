const { execAsync } = require('./utils');

const RESULT_TABLE_AFTER_FIRST_INSERT = `
┌─────────┬────┬──────────┬─────────────┬───────────────────────┬────────┐
│ (index) │ id │ walletId │   wallet    │         date          │ amount │
├─────────┼────┼──────────┼─────────────┼───────────────────────┼────────┤
│    0    │ 1  │    1     │ 'WalletUSD' │ '2023-10-29 17:11:59' │  100   │
│    1    │ 2  │    2     │ 'WalletEUR' │ '2023-10-29 17:11:59' │  200   │
│    2    │ 3  │    3     │ 'WalletPLN' │ '2023-10-29 17:11:59' │  300   │
└─────────┴────┴──────────┴─────────────┴───────────────────────┴────────┘`;

const RESULT_TABLE_AFTER_DELETION = `
┌─────────┬────┬──────────┬─────────────┬───────────────────────┬────────┐
│ (index) │ id │ walletId │   wallet    │         date          │ amount │
├─────────┼────┼──────────┼─────────────┼───────────────────────┼────────┤
│    0    │ 1  │    1     │ 'WalletUSD' │ '2023-10-29 17:11:59' │  100   │
│    1    │ 2  │    2     │ 'WalletEUR' │ '2023-10-29 17:11:59' │  200   │
└─────────┴────┴──────────┴─────────────┴───────────────────────┴────────┘
`;

const insertCurrencies = async () => {
  await execAsync('skarb currencies add -n USD');
  await execAsync('skarb currencies add -n EUR');
  await execAsync('skarb currencies add -n PLN');
};

const insertWallets = async () => {
  await execAsync('skarb wallets add -n WalletUSD -c 1');
  await execAsync('skarb wallets add -n WalletEUR -c 2');
  await execAsync('skarb wallets add -n WalletPLN -c 3');
};

const insertWhistory = async () => {
  await execAsync('skarb whistory add -w 1 -a 100');
  await execAsync('skarb whistory add -w 2 -a 200');
  await execAsync('skarb whistory add -w 3 -a 300');
};

const testInsertingWhistory = async () => {
  await insertCurrencies();
  await insertWallets();
  await insertWhistory();
  const { stdout } = await execAsync('skarb whistory list');
  if (!stdout.includes(RESULT_TABLE_AFTER_FIRST_INSERT)) {
    console.log(stdout);
    throw new Error('testInsertingWhistory failed!');
  }
};

const testRemovingWhistory = async () => {
  await execAsync('skarb whistory rm -w 3 --hard');
  const { stdout } = await execAsync('skarb whistory list');
  if (!stdout.includes(RESULT_TABLE_AFTER_DELETION)) {
    console.log(stdout);
    throw new Error('testRemovingWhistory failed!');
  }
};

const testWhistory = async () => {
  await testInsertingWhistory();
  await testRemovingWhistory();
  console.log('testWhistory passed!');
};

module.exports = { testWhistory };
