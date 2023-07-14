const {
  createDatabase,
  migrateDatabase,
} = require('../services/database-service');

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

module.exports = {
  handleInit,
  handleMigrate,
};
