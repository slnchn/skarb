const { runCliLevelTests } = require('./cli-level');
const { runDatabaseLevelTests } = require('./database-level');

(async () => {
  await runCliLevelTests();
  await runDatabaseLevelTests();
})();
