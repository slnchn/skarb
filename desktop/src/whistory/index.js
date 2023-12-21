const { ipcMain } = require('electron');

const { LIST_WHISTORY } = require('./channels');
const { getWhistory } = require('./handlers');

const setupWhistoryHandlers = () => {
  ipcMain.handle(LIST_WHISTORY, getWhistory);
};

module.exports = {
  setupWhistoryHandlers,
};
