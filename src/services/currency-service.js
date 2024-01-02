// repositories
const {
  selectCurrenciesByNameCaseInsensitive,
  insertCurrency,
  deleteCurrencyHard,
  deleteCurrencySoft,
  selectCurrencies,
} = require('../../database/repositories/currency-repository');
const {
  selectWalletsByCurrencyId,
} = require('../../database/repositories/wallet-repository');

// formatters
const { formatCurrencyFromDb } = require('../formatters/currency-formatter');
const { formatWalletFromDb } = require('../formatters/wallets-formatter');

const addCurrency = async (name) => {
  const currenciesWithSameName = await selectCurrenciesByNameCaseInsensitive(
    name,
  );

  if (!currenciesWithSameName.length) {
    const result = await insertCurrency({ currency: name });
    console.table(result.map(formatCurrencyFromDb));
  } else {
    console.error('Currency name is not unique. Please choose another one.');
    console.table(currenciesWithSameName.map(formatCurrencyFromDb));
  }
};

const removeCurrency = async (currencyId, hard = false) => {
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
};

const listCurrencies = async () => {
  const currencies = await selectCurrencies();
  console.table(currencies.map(formatCurrencyFromDb));
};

module.exports = { addCurrency, removeCurrency, listCurrencies };
