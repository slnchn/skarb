const { insertCurrency } = require('../repositories/currency-repository');

const handleAddCurrency = async (params) => {
  try {
    const { name: currency } = params;
    await insertCurrency({ currency });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddCurrency,
};
