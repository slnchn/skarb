const {
  insertWallet,
  selectWallets,
  deleteWalletHard,
  deleteWalletSoft,
} = require('../repositories/wallet-repository');
const { formatWalletFromDb } = require('../formatters/wallets-formatter');

const handleAddWallet = async (params) => {
  try {
    const { name: wallet, currencyId } = params;
    const result = await insertWallet({ wallet, currencyId });
    console.table(result.map(formatWalletFromDb));
  } catch (error) {
    console.error(error);
  }
};

const handleRmWallet = async (params) => {
  try {
    const { walletId, hard } = params;

    let deletedWallet = {};
    if (hard) {
      deletedWallet = await deleteWalletHard(walletId);
    } else {
      deletedWallet = await deleteWalletSoft(walletId);
    }

    console.table(deletedWallet.map(formatWalletFromDb));
  } catch (error) {
    console.error(error);
  }
};

const handleListWallets = async () => {
  try {
    const wallets = await selectWallets();
    console.table(wallets.map(formatWalletFromDb));
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddWallet,
  handleRmWallet,
  handleListWallets,
};
