export const formatWhistoryFromDb = (whistoryData) => ({
  id: whistoryData.wh_id,
  walletId: whistoryData.wh_walletId,
  wallet: whistoryData.w_name,
  date: whistoryData.wh_date,
  amount: whistoryData.wh_moneyAmount,
});
