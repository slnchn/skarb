const {
  insertCurrency,
  selectCurrencies,
  deleteCurrencyHard,
  deleteCurrencySoft,
} = require('../repositories/currency-repository');
const {
  selectWalletsByCurrencyId,
} = require('../repositories/wallet-repository');
const { formatCurrencyFromDb } = require('../formatters/currency-formatter');
const { formatWalletFromDb } = require('../formatters/wallets-formatter');

const handleAddCurrency = async (params) => {
  try {
    const { name: currency } = params;
    const result = await insertCurrency({ currency });
    console.table(result.map(formatCurrencyFromDb));
  } catch (error) {
    console.error(error);
  }
};

const handleRmCurrency = async (params) => {
  try {
    const { currencyId, hard } = params;

    const relatedWallets = await selectWalletsByCurrencyId(currencyId);
    if (!relatedWallets.length) {
      let deletedCurrency = {};
      if (hard) {
        deletedCurrency = await deleteCurrencyHard(currencyId);
      } else {
        deletedCurrency = await deleteCurrencySoft(currencyId);
      }

      console.table(deletedCurrency.map(formatCurrencyFromDb));
    } else {
      console.error(
        'There are wallets related to this currency. Please remove them first.',
      );

      console.table(relatedWallets.map(formatWalletFromDb));
    }
  } catch (error) {
    console.error(error);
  }
};

const handleListCurrencies = async () => {
  try {
    const currencies = await selectCurrencies();
    console.table(currencies.map(formatCurrencyFromDb));
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddCurrency,
  handleRmCurrency,
  handleListCurrencies,
};
