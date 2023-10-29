const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    addDbSource: (dbSource) => ipcRenderer.invoke('add-db-source', dbSource),
    getDbSources: () => ipcRenderer.invoke('get-db-sources'),
    deleteDbSource: (dbSource) =>
      ipcRenderer.invoke('delete-db-source', dbSource),
    connectToDb: (dbSource) => ipcRenderer.invoke('connect-to-db', dbSource),

    whistory: {
      list: (walletId) => ipcRenderer.invoke('whistory:list', walletId),
    },
  },
});
