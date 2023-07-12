#! /usr/bin/env node

const { program } = require('commander');
const sqlite3 = require('sqlite3');

// controllers
const {
  handleAddCurrency,
  handleListCurrencies,
  handleRmCurrency,
} = require('./controllers/currency-controller');
const {
  handleAddWallet,
  handleListWallets,
  handleRmWallet,
} = require('./controllers/wallet-controller');
const {
  handleAddWhistoryEntry,
  handleListWhistory,
  handleRmWhistoryEntry,
} = require('./controllers/whistory-controller');

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

// currencies

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

// wallets

const wallets = program.command('wallets').description('Manage wallets');

wallets
  .command('add')
  .description('Add a wallet')
  .requiredOption('-n, --name <name>', 'Wallet name')
  .requiredOption('-c, --currency-id <currencyId>', 'Currency id')
  .action(handleAddWallet);

wallets
  .command('rm')
  .description('Remove a wallet')
  .requiredOption('-w, --walletId <id>', 'Wallet id')
  .option('-h, --hard', 'Hard deletion')
  .action(handleRmWallet);

wallets
  .command('list')
  .description('Shows a list of wallets')
  .action(handleListWallets);

// whistory

const whistory = program
  .command('whistory')
  .description('Manage wallets history');

whistory
  .command('add')
  .description('Add a wallet history entry')
  .requiredOption('-w, --walletId <walletId>', 'Wallet id')
  .requiredOption('-a, --amount <amount>', 'Amount')
  .action(handleAddWhistoryEntry);

whistory
  .command('rm')
  .description('Remove a wallet history entry')
  .requiredOption(
    '-wh, --wallet-history-id <walletHistoryId>',
    'Wallet history id',
  )
  .option('-h, --hard', 'Hard deletion')
  .action(handleRmWhistoryEntry);

whistory
  .command('list')
  .description('Shows a list of wallets history')
  .action(handleListWhistory);

program.parse(process.argv);
