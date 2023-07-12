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

const deleteWalletSoft = async (id) => {
  const db = await initDatabaseConnection();

  await new Promise((resolve, reject) => {
    db.run(
      `UPDATE wallets SET deleted_at = DATETIME('now') WHERE id = ${id}`,
      (err) => {
        if (err) {
          reject(err);
        }

        console.info(`Wallet ${id} soft-deleted`);

        resolve({});
      },
    );
  });

  const updatedWallet = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM wallets WHERE id = ${id} LIMIT 1`, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  db.close();

  return updatedWallet;
};

const deleteWalletHard = async (id) => {
  const db = await initDatabaseConnection();

  const walletToDelete = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM wallets WHERE id = ${id} LIMIT 1`, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  await new Promise((resolve, reject) => {
    db.run(`DELETE FROM wallets WHERE id = ${id}`, (err) => {
      if (err) {
        reject(err);
      }

      console.info(`Wallet ${id} hard-deleted`);

      resolve({});
    });
  });

  db.close();

  return walletToDelete;
};

const selectWallets = async () => {
  const db = await initDatabaseConnection();

  const wallets = new Promise((resolve, reject) => {
    db.all(
      'SELECT wallets.id as wid, wallets.name as wname, currencies.name as cname, wallets.created_at as wcreated_at, wallets.updated_at as wupdated_at, wallets.deleted_at as wdeleted_at FROM wallets LEFT JOIN currencies ON currencies.id = wallets.currency_id',
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
  deleteWalletSoft,
  deleteWalletHard,
  selectWallets,
};
