const { insertWallet } = require('../repositories/wallet-repository');

const handleAddWallet = async (params) => {
  try {
    const { name: wallet, currencyId } = params;
    const result = await insertWallet({ wallet, currencyId });
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleAddWallet,
};
