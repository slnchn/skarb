import { initDatabaseConnection, runSQL, allSQL } from '../database.js';

export const insertCurrency = async ({ currency }) => {
  const db = await initDatabaseConnection();

  await runSQL(db, `INSERT INTO currencies (c_name) VALUES ("${currency}")`);

  const latestInserted = await allSQL(
    db,
    `SELECT * FROM currencies ORDER BY c_createdAt DESC LIMIT 1`,
  );

  db.close();
  return latestInserted;
};

export const deleteCurrencySoft = async (id) => {
  const db = await initDatabaseConnection();

  await runSQL(
    db,
    `UPDATE currencies SET c_deletedAt = DATETIME('now') WHERE c_id = ${id}`,
  );

  const updatedCurrency = await allSQL(
    db,
    `SELECT * FROM currencies WHERE c_id = ${id} LIMIT 1`,
  );

  db.close();
  return updatedCurrency;
};

export const deleteCurrencyHard = async (id) => {
  const db = await initDatabaseConnection();

  const currencyToDelete = await allSQL(
    db,
    `SELECT * FROM currencies WHERE c_id = ${id} LIMIT 1`,
  );

  await runSQL(db, `DELETE FROM currencies WHERE c_id = ${id}`);

  db.close();
  return currencyToDelete;
};

export const selectCurrencies = async () => {
  const db = await initDatabaseConnection();
  const currencies = await allSQL(db, `SELECT * FROM currencies`);
  db.close();
  return currencies;
};

export const selectCurrencyById = async (id) => {
  const db = await initDatabaseConnection();

  const currency = await allSQL(
    db,
    `SELECT * FROM currencies WHERE c_id = ${id} LIMIT 1`,
  );

  db.close();
  return currency;
};

export const selectCurrenciesByNameCaseInsensitive = async (name) => {
  const db = await initDatabaseConnection();

  const currency = await allSQL(
    db,
    `SELECT * FROM currencies WHERE LOWER(c_name) = LOWER("${name}")`,
  );

  db.close();
  return currency;
};
