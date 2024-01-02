const {
  createDatabase,
  migrateDatabase,
} = require('../../database/db-service');
const { exportData } = require('../services/exporting-service');

const handleInit = async () => {
  try {
    await createDatabase();
  } catch (error) {
    console.error(error);
  }
};

const handleMigrate = async () => {
  try {
    await migrateDatabase();
  } catch (error) {
    console.error(error);
  }
};

const handleExport = async (params) => {
  try {
    const { type } = params;
    console.log(`Exporting data to ${type}...`);
    await exportData(type);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleInit,
  handleMigrate,
  handleExport,
};
