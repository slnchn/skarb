const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  await cleanup();
};

const insertCurrencies = async () => {
  await execAsync('skarb currencies add -n USD');
  await delay(100);
  await execAsync('skarb currencies add -n EUR');
  await delay(100);
  await execAsync('skarb currencies add -n PLN');
};

const insertWallets = async () => {
  await execAsync('skarb wallets add -n WalletUSD -c 1');
  await delay(100);
  await execAsync('skarb wallets add -n WalletEUR -c 2');
  await delay(100);
  await execAsync('skarb wallets add -n WalletPLN -c 3');
};

const insertWhistory = async () => {
  await execAsync(`skarb whistory add -w 1 -a 100 -d 2020-01-01`);
  await delay(100);
  await execAsync(`skarb whistory add -w 1 -a 200 -d 2020-01-02`);
  await delay(100);
  await execAsync(`skarb whistory add -w 1 -a 300 -d 2020-01-03`);
};

const checkIfAllItemsExist = ({ arrayToCheck, referenceArray, fields }) =>
  arrayToCheck.every((item) =>
    referenceArray.some((referenceItem) =>
      fields.every((field) => item[field] === referenceItem[field]),
    ),
  );

module.exports = {
  execAsync,
  delay,
  init,
  cleanup,
  runTest,
  insertCurrencies,
  insertWallets,
  insertWhistory,
  checkIfAllItemsExist,
};
