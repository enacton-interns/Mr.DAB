const chalk = require("chalk");

function logError(msg) {
  console.log(chalk.red("Error:"), msg);
}

function logInfo(msg) {
  console.log(chalk.blue("Info:"), msg);
}

module.exports = { logError, logInfo };
