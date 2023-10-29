const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    addDbSource: (dbSource) => {
      ipcRenderer.invoke('add-db-source', dbSource);
    },

    // send: (channel, data) => {
    //   ipcRenderer.send(channel, data);
    // },

    // on: (channel, callback) => {
    //   ipcRenderer.on(channel, (event, ...args) => callback(...args));
    // },
  },
});
