const fs = require('node:fs/promises');

async function filterExistingFiles(filePaths) {
  const existingFiles = [];
  for (const filePath of filePaths) {
    try {
      await fs.access(filePath, fs.constants.F_OK);
      existingFiles.push(filePath);
    } catch (err) {
      // File does not exist or another error occurred, ignore it
    }
  }

  return existingFiles;
}

module.exports = {
  filterExistingFiles,
};
