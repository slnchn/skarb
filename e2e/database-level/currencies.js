const { allSQL, initDatabaseConnection } = require('../../src/database');
const {
  insertCurrencies,
  checkIfAllItemsExist,
  execAsync,
} = require('../utils');

const expectedArrayAfterInserting = [
  {
    c_id: 1,
    c_name: 'USD',
  },
  {
    c_id: 2,
    c_name: 'EUR',
  },
  {
    c_id: 3,
    c_name: 'PLN',
  },
];

const expectedArrayAfterRemoving = [
  {
    c_id: 1,
    c_name: 'USD',
  },
  {
    c_id: 2,
    c_name: 'EUR',
  },
];

const testInsertingCurrencies = async () => {
  await insertCurrencies();
  const db = await initDatabaseConnection();
  const currencies = await allSQL(db, `SELECT * FROM currencies ORDER BY c_id`);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: currencies,
      referenceArray: expectedArrayAfterInserting,
      fields: ['c_id', 'c_name'],
    })
  ) {
    db.close();
    throw new Error('testInsertingCurrencies failed');
  }

  db.close();
};

const testRemovingCurrencies = async () => {
  await execAsync('skarb currencies rm -c 3 --hard');
  const db = await initDatabaseConnection();
  const currencies = await allSQL(db, `SELECT * FROM currencies ORDER BY c_id`);
  if (
    !checkIfAllItemsExist({
      arrayToCheck: currencies,
      referenceArray: expectedArrayAfterRemoving,
      fields: ['c_id', 'c_name'],
    })
  ) {
    db.close();
    throw new Error('testRemovingCurrencies failed');
  }

  db.close();
};

const testCurrencies = async () => {
  await testInsertingCurrencies();
  await testRemovingCurrencies();
  console.log('[dbl] testCurrencies passed!');
};

module.exports = {
  testCurrencies,
  insertCurrencies,
};
