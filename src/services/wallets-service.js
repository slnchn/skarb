// repositories
const {
  selectWalletsByNameCaseInsensitive,
  insertWallet,
  deleteWalletHard,
  deleteWalletSoft,
  selectWallets,
} = require('../../database/repositories/wallet-repository');
const {
  selectCurrencyById,
} = require('../../database/repositories/currency-repository');
const {
  selectWalletsHistoryByWalletId,
} = require('../../database/repositories/whistory-repository');

// formatters
const { formatWalletFromDb } = require('../formatters/wallets-formatter');

const addWallet = async (currencyId, wallet) => {
  const walletsWithSameName = await selectWalletsByNameCaseInsensitive(wallet);

  if (!walletsWithSameName.length) {
    const [currency] = await selectCurrencyById(currencyId);
    if (currency) {
      // create wallet only if the referenced currency already exists
      const result = await insertWallet({ wallet, currencyId });
      console.table(result.map(formatWalletFromDb));
    } else {
      console.error(`Currency with id ${currencyId} not found!`);
    }
  } else {
    console.error('Wallet name is not unique. Please choose another one.');
    console.table(walletsWithSameName.map(formatWalletFromDb));
  }
};

const removeWallet = async (walletId, hard = false) => {
  const relatedWhistoryEntries = await selectWalletsHistoryByWalletId(walletId);

  if (!relatedWhistoryEntries.length) {
    let deletedWallet = {};
    if (hard) {
      deletedWallet = await deleteWalletHard(walletId);
    } else {
      deletedWallet = await deleteWalletSoft(walletId);
    }

    console.table(deletedWallet.map(formatWalletFromDb));
  } else {
    console.error(`Wallet with id ${walletId} has related whistory entries!`);
    console.table(relatedWhistoryEntries);
  }
};

const listWallets = async () => {
  const wallets = await selectWallets();
  console.table(wallets.map(formatWalletFromDb));
};

module.exports = {
  addWallet,
  removeWallet,
  listWallets,
};
