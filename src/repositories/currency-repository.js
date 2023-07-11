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

        console.table(rows);
        resolve(rows);
      },
    );
  });

  db.close();

  return latestInserted;
};

module.exports = {
  insertCurrency,
};
