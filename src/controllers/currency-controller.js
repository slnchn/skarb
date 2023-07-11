const {
  insertCurrency,
  selectCurrencies,
  deleteCurrencyHard,
  deleteCurrencySoft,
} = require('../repositories/currency-repository');

const handleAddCurrency = async (params) => {
  try {
    const { name: currency } = params;
    const result = await insertCurrency({ currency });
    console.table(result);
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

    console.table(deletedCurrency);
  } catch (error) {
    console.error(error);
  }
};

const handleListCurrencies = async () => {
  try {
    const currencies = await selectCurrencies();
    console.table(currencies);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddCurrency,
  handleRmCurrency,
  handleListCurrencies,
};
