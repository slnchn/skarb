const { initDatabaseConnection } = require('../database');

const insertCurrency = async ({ currency }) => {
  const db = await initDatabaseConnection();
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO currencies (name) VALUES ("${currency}")`, (err) => {
      if (err) {
        reject(err);
      }

      db.close();

      resolve({});
    });
  });
};

module.exports = {
  insertCurrency,
};
