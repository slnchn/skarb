const fs = require('fs/promises');
const sqlite3 = require('sqlite3');

let databaseConnection = null;

const checkIfDatabaseExists = async () => {
  try {
    await fs.access('./cream.sqlite3');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const initDatabaseConnection = async () => {
  try {
    databaseConnection = new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./cream.sqlite3', (err) => {
        if (err) {
          reject(err);
        }

        resolve(db);
      });
    });

    return databaseConnection;
  } catch (error) {
    return null;
  }
};

module.exports = {
  checkIfDatabaseExists,
  initDatabaseConnection,
};
