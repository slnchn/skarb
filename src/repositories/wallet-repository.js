const { initDatabaseConnection } = require('../database');

const insertWallet = async ({ wallet, currencyId }) => {
  const db = await initDatabaseConnection();

  await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO wallets (name, currency_id) VALUES ('${wallet}', ${currencyId})`,
      (err) => {
        if (err) {
          reject(err);
        }

        resolve({});
      },
    );
  });

  const latestInserted = new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM wallets ORDER BY created_at DESC LIMIT 1',
      (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      },
    );
  });

  db.close();

  return latestInserted;
};

module.exports = {
  insertWallet,
};
