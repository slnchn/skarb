const { ipcMain } = require('electron');

const {
  ADD_DB_SOURCE,
  GET_DB_SOURCES,
  DELETE_DB_SOURCE,
  CONNECT_TO_DB,
} = require('./channels');
const {
  handleAddDbSource,
  handleGetDbSources,
  deleteDbSource,
  connectToDb,
} = require('./handlers');

const setupEstoreHandlers = () => {
  ipcMain.handle(ADD_DB_SOURCE, handleAddDbSource);
  ipcMain.handle(GET_DB_SOURCES, handleGetDbSources);
  ipcMain.handle(DELETE_DB_SOURCE, deleteDbSource);
  ipcMain.handle(CONNECT_TO_DB, connectToDb);
};

module.exports = {
  setupEstoreHandlers,
};
