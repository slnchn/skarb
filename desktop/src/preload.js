const { contextBridge, ipcRenderer } = require('electron');

const {
  ADD_DB_SOURCE,
  GET_DB_SOURCES,
  DELETE_DB_SOURCE,
  CONNECT_TO_DB,
  GET_CURRENT_CONNECTION,
} = require('./connection/channels');
const { LIST_WALLETS } = require('./wallets/channels');
const { LIST_WHISTORY } = require('./whistory/channels');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    connection: {
      addDbSource: (dbSource) => ipcRenderer.invoke(ADD_DB_SOURCE, dbSource),
      getDbSources: () => ipcRenderer.invoke(GET_DB_SOURCES),
      deleteDbSource: (dbSource) =>
        ipcRenderer.invoke(DELETE_DB_SOURCE, dbSource),
      connectToDb: (dbSource) => ipcRenderer.invoke(CONNECT_TO_DB, dbSource),
      getCurrentConnection: () => ipcRenderer.invoke(GET_CURRENT_CONNECTION),
    },

    whistory: {
      list: (walletId) => ipcRenderer.invoke(LIST_WHISTORY, walletId),
    },

    wallets: {
      list: () => ipcRenderer.invoke(LIST_WALLETS),
    },
  },
});
