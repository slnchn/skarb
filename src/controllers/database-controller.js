import {
  createDatabase,
  migrateDatabase,
} from '../services/database-service.js';
import { exportData } from '../services/exporting-service.js';

export const handleInit = async () => {
  try {
    await createDatabase();
  } catch (error) {
    console.error(error);
  }
};

export const handleMigrate = async () => {
  try {
    await migrateDatabase();
  } catch (error) {
    console.error(error);
  }
};

export const handleExport = async (params) => {
  try {
    const { type } = params;
    console.log(`Exporting data to ${type}...`);
    await exportData(type);
  } catch (error) {
    console.error(error);
  }
};
