const child = require('node:child_process');
const path = require('node:path');

const {
  selectWalletById,
} = require('../database/repositories/wallet-repository');
const {
  insertWhistory,
  deleteWalletHistoryHard,
  deleteWalletHistorySoft,
  selectWalletHistory,
  selectWalletsHistory,
} = require('../database/repositories/whistory-repository');

// services
const { getTableCsvContent, exportData } = require('./exporting-service');

// formatters
const { formatWhistoryFromDb } = require('../formatters/whistory-formatter');

// utils
const { formatDateToSimpleString } = require('../utils/utils');
const {
  chunkWhistoryByDays,
  getWhistorySpanDiff,
} = require('../utils/whistory-utils');

const exportWhistoryToCsv = async (walletsHistory, walletName) => {
  try {
    const csvContent = getTableCsvContent(walletsHistory);
    await exportData(
      'csv',
      `whistory-${
        walletName ? `${walletName.split(' ').join('')}-` : ''
      }${formatDateToSimpleString(new Date())}`,
      csvContent,
    );
  } catch (error) {
    console.error(error);
  }
};

const addWhistoryEntry = async (walletId, amount, date) => {
  const [wallet] = await selectWalletById(walletId);
  if (wallet) {
    const result = await insertWhistory({ walletId, amount, date });
    console.table(result.map(formatWhistoryFromDb));
  } else {
    console.log(`Wallet with id ${walletId} does not exist`);
  }
};

const removeWhistoryEntry = async (walletHistoryId, hard = false) => {
  let result = {};
  if (hard) {
    result = await deleteWalletHistoryHard(walletHistoryId);
  } else {
    result = await deleteWalletHistorySoft(walletHistoryId);
  }

  console.table(result.map(formatWhistoryFromDb));
};

const listWhistory = async (walletId) => {
  let result = [];
  if (walletId) {
    result = await selectWalletHistory(walletId);
  } else {
    result = await selectWalletsHistory();
  }

  console.table(result.map(formatWhistoryFromDb));
};

const exportWhistory = async (walletId) => {
  let result = [];
  let walletName = '';
  if (walletId) {
    result = await selectWalletHistory(walletId);
    walletName = result[0].w_name;
  } else {
    result = await selectWalletsHistory();
  }

  await exportWhistoryToCsv(result, walletName);
};

const plotWhistory = async (walletId) => {
  const walletHistory = await selectWalletHistory(walletId);

  const process = child.spawn('python', [
    path.join(__dirname, '../../scripts/plot_whistory.py'),
    JSON.stringify(walletHistory),
  ]);

  process.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
  });
};

const plotWhistoryDiff = async (walletId, span) => {
  const walletHistory = await selectWalletHistory(walletId);
  const formattedWalletHistory = walletHistory.map(formatWhistoryFromDb);
  const whistoryByDays = chunkWhistoryByDays(formattedWalletHistory, +span);
  const whistoryDiff = whistoryByDays.map(getWhistorySpanDiff);

  const process = child.spawn('python', [
    path.join(__dirname, '../../scripts/plot_whistory_diff.py'),
    JSON.stringify(whistoryDiff),
  ]);

  process.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
  });
};

module.exports = {
  addWhistoryEntry,
  removeWhistoryEntry,
  listWhistory,
  exportWhistory,
  plotWhistory,
  plotWhistoryDiff,
};
