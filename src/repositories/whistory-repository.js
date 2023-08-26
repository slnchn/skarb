import { initDatabaseConnection, runSQL, allSQL } from '../database';

export const insertWhistory = async ({ walletId, amount, date }) => {
  const db = await initDatabaseConnection();

  if (date) {
    await runSQL(
      db,
      `INSERT INTO wallets_history (wh_walletId, wh_moneyAmount, wh_date) VALUES (${walletId}, ${amount}, '${date}')`,
    );
  } else {
    await runSQL(
      db,
      `INSERT INTO wallets_history (wh_walletId, wh_moneyAmount) VALUES (${walletId}, ${amount})`,
    );
  }

  const newWhistoryEntry = allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_walletId = ${walletId} ORDER BY wh_id DESC LIMIT 1`,
  );

  db.close();

  return newWhistoryEntry;
};

export const deleteWalletHistorySoft = async (id) => {
  const db = await initDatabaseConnection();

  await runSQL(
    db,
    `UPDATE wallets_history SET wh_deletedAt = DATETIME('now') WHERE wh_id = ${id}`,
  );

  const updatedWalletHistory = await allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_id = ${id}`,
  );

  db.close();

  return updatedWalletHistory;
};

export const deleteWalletHistoryHard = async (id) => {
  const db = await initDatabaseConnection();

  const walletHistoryToDelete = await allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_id = ${id}`,
  );

  await runSQL(db, `DELETE FROM wallets_history WHERE wh_id = ${id}`);

  db.close();

  return walletHistoryToDelete;
};

export const selectWalletsHistory = async () => {
  const db = await initDatabaseConnection();

  const whistory = await allSQL(
    db,
    `SELECT * FROM wallets_history INNER JOIN wallets on wallets.w_id = wallets_history.wh_walletId ORDER BY wh_date DESC`,
  );

  db.close();

  return whistory;
};

export const selectWalletsHistoryByWalletId = async (walletId) => {
  const db = await initDatabaseConnection();

  const whistory = await allSQL(
    db,
    `SELECT * FROM wallets_history WHERE wh_walletId = ${walletId}`,
  );

  db.close();

  return whistory;
};

export const selectWalletHistory = async (walletId) => {
  const db = await initDatabaseConnection();

  const whistory = await allSQL(
    db,
    `SELECT * FROM wallets_history INNER JOIN wallets on wallets.w_id = wallets_history.wh_walletId WHERE wh_walletId = ${walletId} ORDER BY wh_date DESC`,
  );

  db.close();

  return whistory;
};
