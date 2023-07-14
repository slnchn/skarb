const formatWalletFromDb = (walletData) => ({
  id: walletData.w_id,
  name: walletData.w_name,
  currencyId: walletData.w_currencyId,
  currency: walletData.c_name,
});

module.exports = {
  formatWalletFromDb,
};
