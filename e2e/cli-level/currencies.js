const { execAsync, insertCurrencies } = require('../utils');

const RESULT_TABLE_AFTER_FIRST_INSERT = `
┌─────────┬────┬───────┐
│ (index) │ id │ name  │
├─────────┼────┼───────┤
│    0    │ 1  │ 'USD' │
│    1    │ 2  │ 'EUR' │
│    2    │ 3  │ 'PLN' │
└─────────┴────┴───────┘`;

const RESULT_TABLE_AFTER_DELETION = `
┌─────────┬────┬───────┐
│ (index) │ id │ name  │
├─────────┼────┼───────┤
│    0    │ 1  │ 'USD' │
│    1    │ 2  │ 'EUR' │
└─────────┴────┴───────┘`;

const testInsertingCurrencies = async () => {
  await insertCurrencies();
  const { stdout } = await execAsync('skarb currencies list');
  if (!stdout.includes(RESULT_TABLE_AFTER_FIRST_INSERT)) {
    console.log(stdout);
    throw new Error('testInsertingCurrencies failed');
  }
};

const testRemovingCurrencies = async () => {
  await execAsync('skarb currencies rm -c 3 --hard');
  const { stdout } = await execAsync('skarb currencies list');
  if (!stdout.includes(RESULT_TABLE_AFTER_DELETION)) {
    console.log(stdout);
    throw new Error('testRemovingCurrencies failed');
  }
};

const testCurrencies = async () => {
  await testInsertingCurrencies();
  await testRemovingCurrencies();
  console.log('testCurrencies passed!');
};

module.exports = { testCurrencies, insertCurrencies };
