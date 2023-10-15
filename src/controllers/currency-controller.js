const {
  removeCurrency,
  listCurrencies,
  addCurrency,
} = require('../services/currency-service');

const handleAddCurrency = async (params) => {
  try {
    const { name } = params;
    await addCurrency(name);
  } catch (error) {
    console.error(error);
  }
};

const handleRmCurrency = async (params) => {
  try {
    const { currencyId, hard } = params;
    await removeCurrency(currencyId, hard);
  } catch (error) {
    console.error(error);
  }
};

const handleListCurrencies = async () => {
  try {
    await listCurrencies();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddCurrency,
  handleRmCurrency,
  handleListCurrencies,
};
