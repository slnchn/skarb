const {
  insertCurrency,
  selectCurrencies,
  deleteCurrencyHard,
  deleteCurrencySoft,
} = require('../repositories/currency-repository');
const { formatCurrencyFromDb } = require('../formatters/currency-formatter');

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
    const { id, hard } = params;

    let deletedCurrency = {};
    if (hard) {
      deletedCurrency = await deleteCurrencyHard(id);
    } else {
      deletedCurrency = await deleteCurrencySoft(id);
    }

    console.table(deletedCurrency.map(formatCurrencyFromDb));
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
