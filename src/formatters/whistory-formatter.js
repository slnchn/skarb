const formatWhistoryFromDb = (whistoryData) => ({
  id: whistoryData.wh_id,
  walletId: whistoryData.wh_walletId,
  amount: whistoryData.wh_moneyAmount,
});

module.exports = {
  formatWhistoryFromDb,
};
