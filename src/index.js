#! /usr/bin/env node

const { program } = require('commander');
const sqlite3 = require('sqlite3');

// controllers
const { handleAddCurrency } = require('./controllers/currency-controller');

// services
const { initializeDatabase } = require('./services/migration-service');

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

program
  .command('currencies')
  .command('add')
  .requiredOption('-n, --name <name>', 'Currency name')
  .action(handleAddCurrency);

program.parse(process.argv);
