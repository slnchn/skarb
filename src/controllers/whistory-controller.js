const { insertWhistory } = require('../repositories/whistory-repository');

const addWhistoryEntry = async (params) => {
  try {
    const { walletId, amount } = params;
    const result = await insertWhistory({ walletId, amount });
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addWhistoryEntry,
};
