const {
  insertWhistory,
  selectWalletsHistory,
  deleteWalletHistorySoft,
  deleteWalletHistoryHard,
  selectWalletHistory,
} = require('../repositories/whistory-repository');
const { selectWalletById } = require('../repositories/wallet-repository');
const { formatWhistoryFromDb } = require('../formatters/whistory-formatter');

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

module.exports = {
  handleAddWhistoryEntry,
  handleRmWhistoryEntry,
  handleListWhistory,
};
