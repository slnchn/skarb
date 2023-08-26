const fs = require('node:fs/promises');
const sqlite3 = require('sqlite3');

let databaseConnection = null;

export const checkIfDatabaseExists = async () => {
  try {
    await fs.access('./skarb.sqlite3');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const runSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.run(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

export const execSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.exec(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

export const allSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

export const initDatabaseConnection = async () => {
  try {
    databaseConnection = new Promise((resolve, reject) => {
      const db = new sqlite3.Database('./skarb.sqlite3', (err) => {
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
