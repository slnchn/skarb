import { getTableCsvContent, exportData } from './exporting-service.js';
import { formatDateToSimpleString } from '../utils.js';

export const exportWhistoryToCsv = async (walletsHistory, walletName) => {
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
