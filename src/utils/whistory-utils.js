const { getDateDiffInDays } = require('../utils');

const chunkWhistoryByDays = (data, days) => {
  const result = [[]];

  let prevChunkStartDate = new Date(data[0].date);
  let resultIndex = 0;

  data.forEach((entry) => {
    const date = new Date(entry.date);
    if (getDateDiffInDays(prevChunkStartDate, date) < days) {
      result[resultIndex].push(entry);
    } else {
      resultIndex += 1;
      result[resultIndex] = [entry];
      prevChunkStartDate = date;
    }
  });

  return result;
};

const getWhistorySpanDiff = (whistorySpan) => {
  const firstWhistoryEntry = whistorySpan[0];
  const lastWhistoryEntry = whistorySpan[whistorySpan.length - 1];
  return {
    amountDiff: lastWhistoryEntry.amount - firstWhistoryEntry.amount,
    startDate: firstWhistoryEntry.date,
    endDate: lastWhistoryEntry.date,
  };
};

module.exports = {
  chunkWhistoryByDays,
  getWhistorySpanDiff,
};
