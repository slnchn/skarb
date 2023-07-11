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
  selectCurrencies,
};
