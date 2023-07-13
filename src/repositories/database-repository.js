const { initDatabaseConnection, execSQL } = require('../database');
const { migrationsMap } = require('../queries/migrations');

const createDatabase = async () => {
  try {
    const db = await initDatabaseConnection();

    await Promise.all(
      Object.values(migrationsMap).map((sql) => execSQL(db, sql)),
    );

    db.close();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createDatabase,
};
