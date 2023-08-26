#! /usr/bin/env node

import { program } from 'commander';

import { logger, decorateWithArgsLogger } from './logger.js';

// controllers
import { handleInit, handleMigrate } from './controllers/database-controller';
import {
  handleAddCurrency,
  handleListCurrencies,
  handleRmCurrency,
} from './controllers/currency-controller';
import {
  handleAddWallet,
  handleListWallets,
  handleRmWallet,
} from './controllers/wallet-controller';
import {
  handleAddWhistoryEntry,
  handleListWhistory,
  handleRmWhistoryEntry,
  handleExportWhistory,
} from './controllers/whistory-controller';

logger.info('Skarb CLI started');

program.command('init').action(decorateWithArgsLogger(handleInit));

program.command('migrate').action(decorateWithArgsLogger(handleMigrate));

// currencies

const currencies = program
  .command('currencies')
  .description('Manage currencies');

currencies
  .command('add')
  .description('Add a currency')
  .requiredOption('-n, --name <name>', 'Currency name')
  .action(decorateWithArgsLogger(handleAddCurrency));

currencies
  .command('rm')
  .description('Remove a currency')
  .requiredOption('-c, --currency-id <currencyId>', 'Currency id')
  .option('-h, --hard', 'Hard deletion')
  .action(decorateWithArgsLogger(handleRmCurrency));

currencies
  .command('list')
  .description('Shows a list of currencies')
  .action(decorateWithArgsLogger(handleListCurrencies));

// wallets

const wallets = program.command('wallets').description('Manage wallets');

wallets
  .command('add')
  .description('Add a wallet')
  .requiredOption('-n, --name <name>', 'Wallet name')
  .requiredOption('-c, --currency-id <currencyId>', 'Currency id')
  .action(decorateWithArgsLogger(handleAddWallet));

wallets
  .command('rm')
  .description('Remove a wallet')
  .requiredOption('-w, --walletId <id>', 'Wallet id')
  .option('-h, --hard', 'Hard deletion')
  .action(decorateWithArgsLogger(handleRmWallet));

wallets
  .command('list')
  .description('Shows a list of wallets')
  .action(decorateWithArgsLogger(handleListWallets));

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
  .action(decorateWithArgsLogger(handleAddWhistoryEntry));

whistory
  .command('rm')
  .description('Remove a wallet history entry')
  .requiredOption(
    '-wh, --wallet-history-id <walletHistoryId>',
    'Wallet history id',
  )
  .option('-h, --hard', 'Hard deletion')
  .action(decorateWithArgsLogger(handleRmWhistoryEntry));

whistory
  .command('list')
  .description('Shows a list of wallets history')
  .option('-w, --walletId <walletId>', 'Wallet id')
  .action(decorateWithArgsLogger(handleListWhistory));

whistory
  .command('export')
  .description('Export wallets history')
  .option('-w, --walletId <walletId>')
  .action(decorateWithArgsLogger(handleExportWhistory));

program.parse(process.argv);

process.on('uncaughtException', async (err) => {
  await logger.error('uncaughtException', err);
});

process.on('unhandledRejection', async (err) => {
  await logger.error('unhandledRejection', err);
});

process.on('exit', async (code) => {
  await logger.info('Skarb CLI exited with code', code);
});
