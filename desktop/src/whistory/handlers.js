const {
  selectWalletHistory,
} = require('../../../database/repositories/whistory-repository');
const {
  formatWhistoryFromDb,
} = require('../../../formatters/whistory-formatter');

async function getWhistory(event, walletId) {
  const rawWhistory = await selectWalletHistory(walletId);
  return rawWhistory.map(formatWhistoryFromDb);
}

module.exports = {
  getWhistory,
};
