import { initDatabaseConnection, allSQL } from '../database';

export const selectLatestMigration = async () => {
  const db = await initDatabaseConnection();

  const [latestMigration] = await allSQL(
    db,
    'SELECT * FROM migrations ORDER BY m_title DESC LIMIT 1',
  );

  db.close();

  return latestMigration;
};
