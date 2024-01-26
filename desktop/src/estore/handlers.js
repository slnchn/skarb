const Store = require('electron-store');

const { filterExistingFiles } = require('../service');
const {
  initDatabaseConnection,
  getDatabaseConnectionData,
} = require('../../../database/db');

const store = new Store();

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

async function getCurrentConnection() {
  return getDatabaseConnectionData();
}

module.exports = {
  handleAddDbSource,
  handleGetDbSources,
  deleteDbSource,
  connectToDb,
  getCurrentConnection,
};
