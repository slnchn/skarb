const {
  insertWallet,
  selectWallets,
  deleteWalletHard,
  deleteWalletSoft,
  selectWalletsByNameCaseInsensitive,
} = require('../repositories/wallet-repository');
const { selectCurrencyById } = require('../repositories/currency-repository');
const {
  selectWalletsHistoryByWalletId,
} = require('../repositories/whistory-repository');
const { formatWalletFromDb } = require('../formatters/wallets-formatter');

const handleAddWallet = async (params) => {
  try {
    const { name: wallet, currencyId } = params;

    const walletsWithSameName = await selectWalletsByNameCaseInsensitive(
      wallet,
    );

    if (!walletsWithSameName.length) {
      const [currency] = await selectCurrencyById(currencyId);
      console.log(currency);
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
  } catch (error) {
    console.error(error);
  }
};

const handleRmWallet = async (params) => {
  try {
    const { walletId, hard } = params;

    const relatedWhistoryEntries = await selectWalletsHistoryByWalletId(
      walletId,
    );

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
