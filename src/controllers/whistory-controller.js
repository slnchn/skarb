const {
  addWhistoryEntry,
  removeWhistoryEntry,
  listWhistory,
  exportWhistory,
  plotWhistory,
  plotWhistoryDiff,
} = require('../../services/whistory-service');
const { logger } = require('../logger');

const handleAddWhistoryEntry = async (params) => {
  try {
    const { walletId, amount, date } = params;
    await addWhistoryEntry(walletId, amount, date);
  } catch (error) {
    console.error(error);
  }
};

const handleRmWhistoryEntry = async (params) => {
  try {
    const { walletHistoryId, hard } = params;
    await removeWhistoryEntry(walletHistoryId, hard);
  } catch (error) {
    console.error(error);
  }
};

const handleListWhistory = async (params) => {
  try {
    const { walletId } = params;
    await listWhistory(walletId);
  } catch (error) {
    console.error(error);
  }
};

const handleExportWhistory = async (params) => {
  try {
    const { walletId } = params;
    await exportWhistory(walletId);
  } catch (error) {
    console.error(error);
  }
};

const handlePlotWhistory = async (params) => {
  try {
    const { walletId } = params;
    await plotWhistory(walletId);
  } catch (error) {
    console.error(error);
  }
};

const handlePlotWhistoryDiff = async (params) => {
  try {
    const { walletId, span } = params;
    await plotWhistoryDiff(walletId, span);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  handleAddWhistoryEntry,
  handleRmWhistoryEntry,
  handleListWhistory,
  handleExportWhistory,
  handlePlotWhistory,
  handlePlotWhistoryDiff,
};
