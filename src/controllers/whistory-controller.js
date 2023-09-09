const path = require('path');
const child = require('child_process');

const {
  insertWhistory,
  selectWalletsHistory,
  deleteWalletHistorySoft,
  deleteWalletHistoryHard,
  selectWalletHistory,
} = require('../repositories/whistory-repository');
const { selectWalletById } = require('../repositories/wallet-repository');
const { exportWhistoryToCsv } = require('../services/whistory-service');
const { formatWhistoryFromDb } = require('../formatters/whistory-formatter');
const { logger } = require('../logger');
const {
  chunkWhistoryByDays,
  getWhistorySpanDiff,
} = require('../utils/whistory-utils');

const handleAddWhistoryEntry = async (params) => {
  try {
    const { walletId, amount, date } = params;

    const [wallet] = await selectWalletById(walletId);
    if (wallet) {
      const result = await insertWhistory({ walletId, amount, date });
      console.table(result.map(formatWhistoryFromDb));
    } else {
      console.log(`Wallet with id ${walletId} does not exist`);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleRmWhistoryEntry = async (params) => {
  try {
    const { walletHistoryId, hard } = params;
    let result = {};
    if (hard) {
      result = await deleteWalletHistoryHard(walletHistoryId);
    } else {
      result = await deleteWalletHistorySoft(walletHistoryId);
    }

    console.table(result.map(formatWhistoryFromDb));
  } catch (error) {
    console.error(error);
  }
};

const handleListWhistory = async (params) => {
  try {
    const { walletId } = params;

    let result = [];
    if (walletId) {
      result = await selectWalletHistory(walletId);
    } else {
      result = await selectWalletsHistory();
    }

    console.table(result.map(formatWhistoryFromDb));
  } catch (error) {
    console.error(error);
  }
};

const handleExportWhistory = async (params) => {
  try {
    const { walletId } = params;

    let result = [];
    let walletName = '';
    if (walletId) {
      result = await selectWalletHistory(walletId);
      walletName = result[0].w_name;
    } else {
      result = await selectWalletsHistory();
    }

    await exportWhistoryToCsv(result, walletName);
  } catch (error) {
    console.error(error);
  }
};

const handlePlotWhistory = async (params) => {
  try {
    const { walletId } = params;
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
  } catch (error) {
    console.error(error);
  }
};

const handlePlotWhistoryDiff = async (params) => {
  try {
    const { walletId, span } = params;

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
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  handleAddWhistoryEntry,
  handleRmWhistoryEntry,
  handleListWhistory,
  handleExportWhistory,
  handlePlotWhistory,
  handlePlotWhistoryDiff,
};
