const {
  insertWhistory,
  selectWalletsHistory,
  deleteWalletHistorySoft,
  deleteWalletHistoryHard,
} = require('../repositories/whistory-repository');
const { formatWhistoryFromDb } = require('../formatters/whistory-formatter');

const handleAddWhistoryEntry = async (params) => {
  try {
    const { walletId, amount, date } = params;
    const result = await insertWhistory({ walletId, amount, date });
    console.table(result.map(formatWhistoryFromDb));
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

const handleListWhistory = async () => {
  try {
    const result = await selectWalletsHistory();
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
