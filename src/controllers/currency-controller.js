const {
  insertCurrency,
  selectCurrencies,
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
  handleListCurrencies,
};
