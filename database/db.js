const fs = require('node:fs/promises');

const sqlite3 = require('sqlite3');

let databaseConnection = null;

const checkIfDatabaseExists = async () => {
  try {
    await fs.access('./skarb.sqlite3');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const runSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.run(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

const execSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.exec(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

const allSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

const initDatabaseConnection = async (filePath = './skarb.sqlite3') => {
  try {
    databaseConnection = new Promise((resolve, reject) => {
      const db = new sqlite3.Database(filePath, (err) => {
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
  runSQL,
  execSQL,
  allSQL,
};
