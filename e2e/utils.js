const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  execAsync,
  delay,
};
