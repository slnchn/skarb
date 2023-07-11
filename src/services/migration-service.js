const fs = require('fs/promises');

const getMigrationFiles = async () => {
  const files = await fs.readdir('./sql');
  const filesWithContent = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(`./sql/${file}`, 'utf-8');
      return {
        name: file,
        content,
      };
    }),
  );

  return filesWithContent;
};

const initializeDatabase = async (db) => {
  const migrationFiles = await getMigrationFiles();
  const promises = migrationFiles.map(
    (file) =>
      new Promise((resolve, reject) => {
        db.exec(file.content, (err) => {
          if (err) {
            reject(err);
          }

          resolve(`${file.name} migration has been applied`);
        });
      }),
  );

  return Promise.all(promises);
};

module.exports = {
  initializeDatabase,
};
