const path = require('node:path');

const { app, ipcMain, BrowserWindow } = require('electron');
const Store = require('electron-store');

const { filterExistingFiles } = require('./service');

const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));
}

const handleAddDbSource = async (event, dbSource) => {
  const dbSources = store.get('dbSources', []);
  const connectionsToSet = [...dbSources, dbSource];
  const existingFiles = await filterExistingFiles(connectionsToSet);
  const uniqueFiles = [...new Set(existingFiles)];
  store.set('dbSources', uniqueFiles);
  return uniqueFiles;
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.handle('add-db-source', handleAddDbSource);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
