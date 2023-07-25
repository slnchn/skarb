#! /usr/bin/env node

const { program } = require('commander');

// controllers
const {
  handleInit,
  handleMigrate,
} = require('./controllers/database-controller');
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
  handleExportWhistory,
} = require('./controllers/whistory-controller');

program.command('init').action(handleInit);

program.command('migrate').action(handleMigrate);

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
  .requiredOption('-c, --currency-id <currencyId>', 'Currency id')
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
  .option('-d, --date <date>', 'Date')
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
  .option('-w, --walletId <walletId>', 'Wallet id')
  .action(handleListWhistory);

whistory
  .command('export')
  .description('Export wallets history')
  .option('-w, --walletId <walletId>')
  .action(handleExportWhistory);

program.parse(process.argv);
