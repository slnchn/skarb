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

const selectWallets = async () => {
  const db = await initDatabaseConnection();

  const wallets = new Promise((resolve, reject) => {
    db.all(
      'SELECT wallets.id as wid, wallets.name as wname, currencies.name as cname, wallets.created_at as wcreated_at FROM wallets LEFT JOIN currencies ON currencies.id = wallets.currency_id',
      (err, rows) => {
        if (err) {
          reject(err);
        }

        resolve(rows);
      },
    );
  });

  db.close();

  return wallets;
};

module.exports = {
  insertWallet,
  selectWallets,
};
