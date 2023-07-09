#! /usr/bin/env node

const { program } = require('commander');
const sqlite3 = require('sqlite3');

// services
const { initializeDatabase } = require('./migrations-service');

program.command('init').action(async () => {
  try {
    const db = new sqlite3.Database('./cream.sqlite3', async (err) => {
      if (err) {
        console.error(err.message);
      }

      await initializeDatabase(db);

      db.close();
    });
  } catch (error) {
    console.error(error);
  }
});

program.parse(process.argv);
