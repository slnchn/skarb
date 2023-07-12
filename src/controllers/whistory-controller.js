const {
  insertWhistory,
  selectWalletsHistory,
} = require('../repositories/whistory-repository');

const handleAddWhistoryEntry = async (params) => {
  try {
    const { walletId, amount } = params;
    const result = await insertWhistory({ walletId, amount });
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};

const handleListWhistory = async () => {
  try {
    const result = await selectWalletsHistory();
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddWhistoryEntry,
  handleListWhistory,
};
