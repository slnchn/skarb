const path = require('node:path');

const { app, ipcMain, BrowserWindow } = require('electron');
const Store = require('electron-store');

const { filterExistingFiles } = require('./service');
const { initDatabaseConnection } = require('../../src/database');
const { listWhistory } = require('../../src/services/whistory-service');
const {
  selectWalletHistory,
  selectWalletsHistory,
} = require('../../src/repositories/whistory-repository');

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

async function handleAddDbSource(event, dbSource) {
  const dbSources = store.get('dbSources', []);
  const connectionsToSet = [...dbSources, dbSource];
  const existingFiles = await filterExistingFiles(connectionsToSet);
  const uniqueFiles = [...new Set(existingFiles)];
  store.set('dbSources', uniqueFiles);
  return uniqueFiles;
}

async function handleGetDbSources() {
  const dbSources = store.get('dbSources', []);
  const existingFiles = await filterExistingFiles(dbSources);
  const uniqueFiles = [...new Set(existingFiles)];
  return uniqueFiles;
}

async function deleteDbSource(event, dbSource) {
  const dbSources = store.get('dbSources', []);
  const connectionsToSet = dbSources.filter((db) => db !== dbSource);
  const existingFiles = await filterExistingFiles(connectionsToSet);
  const uniqueFiles = [...new Set(existingFiles)];
  store.set('dbSources', uniqueFiles);
  return uniqueFiles;
}

async function connectToDb(event, dbSource) {
  await initDatabaseConnection(dbSource);
}

async function getWhistory(event, walletId) {
  let result = [];
  if (walletId) {
    result = await selectWalletHistory(walletId);
  } else {
    result = await selectWalletsHistory();
  }

  return result;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.handle('add-db-source', handleAddDbSource);
  ipcMain.handle('get-db-sources', handleGetDbSources);
  ipcMain.handle('delete-db-source', deleteDbSource);
  ipcMain.handle('connect-to-db', connectToDb);

  ipcMain.handle('whistory:list', getWhistory);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
