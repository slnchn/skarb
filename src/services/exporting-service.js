import fs from 'node:fs/promises';

export const getTableCsvContent = (tableData) =>
  tableData.reduce(
    (acc, item) => `${acc}${Object.values(item).join(',')}\n`,
    `${Object.keys(tableData[0]).join(',')}\n`,
  );

export const exportData = async (type, fileName, content) => {
  try {
    const exportsFolderName = `./exports`;
    await fs.mkdir(exportsFolderName, { recursive: true });
    await fs.writeFile(`${exportsFolderName}/${fileName}.${type}`, content);
  } catch (error) {
    console.error(error);
  }
};
