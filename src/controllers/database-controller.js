const { createDatabase } = require('../repositories/database-repository');
const handleInit = async () => {
  try {
    await createDatabase();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleInit,
};
