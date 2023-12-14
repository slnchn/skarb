const { initDatabaseConnection, allSQL } = require('../../src/database');
const {
  insertCurrencies,
  insertWallets,
  insertWhistory,
  checkIfAllItemsExist,
  execAsync,
} = require('../utils');

const expectedArrayAfterInserting = [
  {
    wh_id: 1,
    wh_walletId: 1,
    wh_moneyAmount: 100,
  },
  {
    wh_id: 2,
    wh_walletId: 1,
    wh_moneyAmount: 200,
  },
  {
    wh_id: 3,
    wh_walletId: 1,
    wh_moneyAmount: 300,
  },
];

const expectedArrayAfterRemoving = [
  {
    wh_id: 2,
    wh_walletId: 1,
    wh_moneyAmount: 200,
  },
  {
    wh_id: 1,
    wh_walletId: 1,
    wh_moneyAmount: 100,
  },
];

const testInsertingWhistory = async () => {
  await insertCurrencies();
  await insertWallets();
  await insertWhistory();
  const db = await initDatabaseConnection();
  const whistory = await allSQL(db, `SELECT * FROM wallets_history`);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: whistory,
      referenceArray: expectedArrayAfterInserting,
      fields: ['wh_id', 'wh_walletId', 'wh_moneyAmount'],
    })
  ) {
    db.close();
    throw new Error('testInsertingWhistory failed');
  }

  db.close();
};

const testRemovingWhistory = async () => {
  await execAsync('skarb whistory rm -wh 3 --hard');
  const db = await initDatabaseConnection();
  const whistory = await allSQL(db, `SELECT * FROM wallets_history`);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: whistory,
      referenceArray: expectedArrayAfterRemoving,
      fields: ['wh_id', 'wh_walletId', 'wh_moneyAmount'],
    })
  ) {
    db.close();
    throw new Error('testRemovingWhistory failed');
  }

  db.close();
};

const testWhistory = async () => {
  await testInsertingWhistory();
  await testRemovingWhistory();
  console.log('[dbl] testWhistory passed!');
};

module.exports = { testWhistory };
