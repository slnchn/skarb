const formatCurrencyFromDb = (currencyData) => ({
  id: currencyData.c_id,
  name: currencyData.c_name,
});

module.exports = {
  formatCurrencyFromDb,
};
