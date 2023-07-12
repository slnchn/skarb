const { initDatabaseConnection } = require('../database');

const insertWhistory = async ({ walletId, amount }) => {
  const db = await initDatabaseConnection();

  await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO wallets_history (wallet_id, money_amount) VALUES (${walletId}, ${amount})`,
      (err) => {
        if (err) {
          reject(err);
        }

        resolve({});
      },
    );
  });

  const newWhistoryEntry = await new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM wallets_history WHERE wallet_id = ${walletId} ORDER BY id DESC LIMIT 1`,
      (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      },
    );
  });

  db.close();

  return newWhistoryEntry;
};

module.exports = {
  insertWhistory,
};
