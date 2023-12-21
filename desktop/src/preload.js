const { contextBridge, ipcRenderer } = require('electron');

const {
  ADD_DB_SOURCE,
  GET_DB_SOURCES,
  DELETE_DB_SOURCE,
  CONNECT_TO_DB,
} = require('./estore/channels');
const { LIST_WHISTORY } = require('./whistory/channels');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    addDbSource: (dbSource) => ipcRenderer.invoke(ADD_DB_SOURCE, dbSource),
    getDbSources: () => ipcRenderer.invoke(GET_DB_SOURCES),
    deleteDbSource: (dbSource) =>
      ipcRenderer.invoke(DELETE_DB_SOURCE, dbSource),
    connectToDb: (dbSource) => ipcRenderer.invoke(CONNECT_TO_DB, dbSource),

    whistory: {
      list: (walletId) => ipcRenderer.invoke(LIST_WHISTORY, walletId),
    },
  },
});
