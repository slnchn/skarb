const { initDatabaseConnection, allSQL } = require('../database');
const selectLatestMigration = async () => {
  const db = await initDatabaseConnection();

  const [latestMigration] = await allSQL(
    db,
    'SELECT * FROM migrations ORDER BY title DESC LIMIT 1',
  );

  db.close();

  return latestMigration;
};

module.exports = {
  selectLatestMigration,
};
