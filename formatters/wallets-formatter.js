const formatWalletFromDb = (walletData) => ({
  id: walletData.w_id,
  name: walletData.w_name,
  currencyId: walletData.w_currencyId,
  currency: walletData.c_name,
});

const formatWalletWithLatestWhFromDb = (walletData) => ({
  id: walletData.w_id,
  name: walletData.w_name,
  currency: walletData.c_name,
  latestBalance: walletData.wh_moneyAmount,
  latestBalanceTs: walletData.wh_createdAt,
  createdAt: walletData.wh_createdAt,
});

module.exports = {
  formatWalletFromDb,
  formatWalletWithLatestWhFromDb,
};
