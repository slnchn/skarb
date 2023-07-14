const formatWhistoryFromDb = (whistoryData) => ({
  id: whistoryData.wh_id,
  walletId: whistoryData.wh_walletId,
  date: whistoryData.wh_date,
  amount: whistoryData.wh_moneyAmount,
});

module.exports = {
  formatWhistoryFromDb,
};
