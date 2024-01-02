const {
  addWallet,
  removeWallet,
  listWallets,
} = require('../../services/wallets-service');

const handleAddWallet = async (params) => {
  try {
    const { name: wallet, currencyId } = params;
    await addWallet(currencyId, wallet);
  } catch (error) {
    console.error(error);
  }
};

const handleRmWallet = async (params) => {
  try {
    const { walletId, hard } = params;
    await removeWallet(walletId, hard);
  } catch (error) {
    console.error(error);
  }
};

const handleListWallets = async () => {
  try {
    await listWallets();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddWallet,
  handleRmWallet,
  handleListWallets,
};
