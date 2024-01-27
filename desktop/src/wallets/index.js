const { ipcMain } = require('electron');

const { LIST_WALLETS } = require('./channels');
const { listWallets } = require('./handlers');

const setupWalletsHandlers = () => {
  ipcMain.handle(LIST_WALLETS, listWallets);
};

module.exports = {
  setupWalletsHandlers,
};
