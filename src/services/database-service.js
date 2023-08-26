import { initDatabaseConnection, execSQL } from '../database';
import { migrationsMap } from '../queries/migrations';
import { selectLatestMigration } from '../repositories/migrations-repository';

export const createDatabase = async () => {
  try {
    const db = await initDatabaseConnection();

    await Promise.all(
      Object.entries(migrationsMap).map(async ([key, migration]) => {
        try {
          console.info(`Running migration ${key}--${migration.title}...`);
          await execSQL(db, migration.sql);
        } catch (error) {
          console.error(`Migration ${key}--${migration.title} failed!`);
          console.error(error);
        }
      }),
    );

    db.close();
  } catch (error) {
    console.error(error);
  }
};

export const migrateDatabase = async () => {
  try {
    const latestMigration = await selectLatestMigration();
    console.table(latestMigration);

    const db = await initDatabaseConnection();

    Object.entries(migrationsMap).map(async ([key, migration]) => {
      if (key <= latestMigration.m_title) {
        return;
      }

      console.info(`Running migration ${key}--${migration.m_title}...`);

      await execSQL(db, migration.sql);
    });

    db.close();
  } catch (error) {
    console.error(error);
  }
};
