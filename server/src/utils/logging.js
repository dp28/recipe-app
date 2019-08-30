const { DEBUG, INFO, WARNING, ERROR, buildIsEnabled } = require("./logLevels");
const { logLevel } = require("../config");

const isEnabled = buildIsEnabled(logLevel);

function debug(...args) {
  if (isEnabled(DEBUG)) {
    console.debug(...args);
  }
}

function info(...args) {
  if (isEnabled(INFO)) {
    console.log(isEnabled(INFO));
    console.info(...args);
  }
}

function warning(...args) {
  if (isEnabled(WARNING)) {
    console.warning(...args);
  }
}

function error(...args) {
  if (isEnabled(ERROR)) {
    console.error(...args);
  }
}

module.exports = { info, debug, warning, error };
