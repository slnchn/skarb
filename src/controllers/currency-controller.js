import {
  insertCurrency,
  selectCurrencies,
  deleteCurrencyHard,
  deleteCurrencySoft,
  selectCurrenciesByNameCaseInsensitive,
} from '../repositories/currency-repository.js';
import { selectWalletsByCurrencyId } from '../repositories/wallet-repository.js';
import { formatCurrencyFromDb } from '../formatters/currency-formatter.js';
import { formatWalletFromDb } from '../formatters/wallets-formatter.js';

export const handleAddCurrency = async (params) => {
  try {
    const { name: currency } = params;

    const currenciesWithSameName = await selectCurrenciesByNameCaseInsensitive(
      currency,
    );

    if (!currenciesWithSameName.length) {
      const result = await insertCurrency({ currency });
      console.table(result.map(formatCurrencyFromDb));
    } else {
      console.error('Currency name is not unique. Please choose another one.');
      console.table(currenciesWithSameName.map(formatCurrencyFromDb));
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleRmCurrency = async (params) => {
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

export const handleListCurrencies = async () => {
  try {
    const currencies = await selectCurrencies();
    console.table(currencies.map(formatCurrencyFromDb));
  } catch (error) {
    console.error(error);
  }
};
