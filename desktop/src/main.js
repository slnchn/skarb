const path = require('node:path');

const { app, BrowserWindow } = require('electron');

const { setupConnectionHandlers } = require('./connection');
const { setupWalletsHandlers } = require('./wallets');
const { setupWhistoryHandlers } = require('./whistory');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 600,
    webPreferences: {
      // TODO: investigate if it's correct to set this to false
      sandbox: false,
      preload: path.join(__dirname, './preload.js'),
      devTools: true,
    },
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // setup handlers
  setupConnectionHandlers();
  setupWalletsHandlers();
  setupWhistoryHandlers();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
