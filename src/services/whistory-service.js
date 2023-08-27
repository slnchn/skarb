const { getTableCsvContent, exportData } = require('./exporting-service');
const { formatDateToSimpleString } = require('../utils');

const exportWhistoryToCsv = async (walletsHistory, walletName) => {
  try {
    const csvContent = getTableCsvContent(walletsHistory);
    await exportData(
      'csv',
      `whistory-${
        walletName ? `${walletName.split(' ').join('')}-` : ''
      }${formatDateToSimpleString(new Date())}`,
      csvContent,
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  exportWhistoryToCsv,
};
