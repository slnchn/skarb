const {
  selectWalletsWithLatestWh,
} = require('../../../database/repositories/wallet-repository');
const {
  formatWalletWithLatestWhFromDb,
} = require('../../../formatters/wallets-formatter');

async function listWallets() {
  const wallets = await selectWalletsWithLatestWh();
  return wallets.map(formatWalletWithLatestWhFromDb);
}

module.exports = {
  listWallets,
};
