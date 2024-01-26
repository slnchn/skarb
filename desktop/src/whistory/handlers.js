const {
  selectWalletHistory,
  selectWalletsHistory,
} = require('../../../database/repositories/whistory-repository');

async function getWhistory(event, walletId) {
  let result = [];
  if (walletId) {
    result = await selectWalletHistory(walletId);
  } else {
    result = await selectWalletsHistory();
  }

  return result;
}

module.exports = {
  getWhistory,
};
