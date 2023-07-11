#! /usr/bin/env node

const { program } = require('commander');
const sqlite3 = require('sqlite3');

// controllers
const {
  handleAddCurrency,
  handleListCurrencies,
  handleRmCurrency,
} = require('./controllers/currency-controller');

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

const currencies = program
  .command('currencies')
  .description('Manage currencies');

currencies
  .command('add')
  .description('Add a currency')
  .requiredOption('-n, --name <name>', 'Currency name')
  .action(handleAddCurrency);

currencies
  .command('rm')
  .description('Remove a currency')
  .requiredOption('-i, --id <id>', 'Currency id')
  .option('-h, --hard', 'Hard deletion')
  .action(handleRmCurrency);

currencies
  .command('list')
  .description('Shows a list of currencies')
  .action(handleListCurrencies);

program.parse(process.argv);
