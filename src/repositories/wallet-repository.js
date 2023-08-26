import { initDatabaseConnection, runSQL, allSQL } from '../database.js';

export const insertWallet = async ({ wallet, currencyId }) => {
  const db = await initDatabaseConnection();

  await runSQL(
    db,
    `INSERT INTO wallets (w_name, w_currencyId) VALUES ("${wallet}", ${currencyId})`,
  );

  const latestInserted = await allSQL(
    db,
    `SELECT * FROM wallets ORDER BY w_createdAt DESC LIMIT 1`,
  );

  db.close();

  return latestInserted;
};

export const deleteWalletSoft = async (id) => {
  const db = await initDatabaseConnection();

  await runSQL(
    db,
    `UPDATE wallets SET w_deletedAt = DATETIME('now') WHERE w_id = ${id}`,
  );

  const updatedWallet = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_id = ${id}`,
  );

  db.close();

  return updatedWallet;
};

export const deleteWalletHard = async (id) => {
  const db = await initDatabaseConnection();

  const walletToDelete = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_id = ${id}`,
  );

  await runSQL(db, `DELETE FROM wallets WHERE w_id = ${id}`);

  db.close();

  return walletToDelete;
};

export const selectWallets = async () => {
  const db = await initDatabaseConnection();

  const wallets = await allSQL(
    db,
    `SELECT * FROM wallets LEFT JOIN currencies ON currencies.c_id = wallets.w_currencyId ORDER BY w_createdAt DESC`,
  );

  db.close();

  return wallets;
};

export const selectWalletById = async (id) => {
  const db = await initDatabaseConnection();

  const wallet = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_id = ${id} LIMIT 1`,
  );

  db.close();

  return wallet;
};

export const selectWalletsByCurrencyId = async (currencyId) => {
  const db = await initDatabaseConnection();

  const wallets = await allSQL(
    db,
    `SELECT * FROM wallets WHERE w_currencyId = ${currencyId}`,
  );

  db.close();

  return wallets;
};

export const selectWalletsByNameCaseInsensitive = async (name) => {
  const db = await initDatabaseConnection();

  const wallets = await allSQL(
    db,
    `SELECT * FROM wallets WHERE LOWER(w_name) = LOWER("${name}")`,
  );

  db.close();

  return wallets;
};
