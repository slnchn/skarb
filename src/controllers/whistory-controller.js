import {
  insertWhistory,
  selectWalletsHistory,
  deleteWalletHistorySoft,
  deleteWalletHistoryHard,
  selectWalletHistory,
} from '../repositories/whistory-repository.js';
import { selectWalletById } from '../repositories/wallet-repository.js';
import { exportWhistoryToCsv } from '../services/whistory-service.js';
import { formatWhistoryFromDb } from '../formatters/whistory-formatter.js';

export const handleAddWhistoryEntry = async (params) => {
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

export const handleRmWhistoryEntry = async (params) => {
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

export const handleListWhistory = async (params) => {
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

export const handleExportWhistory = async (params) => {
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
