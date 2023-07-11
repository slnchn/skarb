const { initDatabaseConnection } = require('../database');

const insertCurrency = async ({ currency }) => {
  const db = await initDatabaseConnection();
  await new Promise((resolve, reject) => {
    db.run(`INSERT INTO currencies (name) VALUES ("${currency}")`, (err) => {
      if (err) {
        reject(err);
      }

      resolve({});
    });
  });

  const latestInserted = new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM currencies ORDER BY created_at DESC LIMIT 1',
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

const deleteCurrencySoft = async (id) => {
  const db = await initDatabaseConnection();

  await new Promise((resolve, reject) => {
    db.run(
      `UPDATE currencies SET deleted_at = DATETIME('now') WHERE id = ${id}`,
      (err) => {
        if (err) {
          reject(err);
        }

        console.info(`Currency ${id} soft-deleted`);

        resolve({});
      },
    );
  });

  const updatedCurrency = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM currencies WHERE id = ${id} LIMIT 1`, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  db.close();

  return updatedCurrency;
};

const deleteCurrencyHard = async (id) => {
  const db = await initDatabaseConnection();

  const currencyToDelete = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM currencies WHERE id = ${id} LIMIT 1`, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  await new Promise((resolve, reject) => {
    db.run(`DELETE FROM currencies WHERE id = ${id}`, (err) => {
      if (err) {
        reject(err);
      }

      console.info(`Currency ${id} hard-deleted`);

      resolve({});
    });
  });

  db.close();

  return currencyToDelete;
};

const selectCurrencies = async () => {
  const db = await initDatabaseConnection();
  const currencies = new Promise((resolve, reject) => {
    db.all('SELECT * FROM currencies', (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  db.close();

  return currencies;
};

module.exports = {
  insertCurrency,
  deleteCurrencySoft,
  deleteCurrencyHard,
  selectCurrencies,
};
