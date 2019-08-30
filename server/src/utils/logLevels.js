const DEBUG = "DEBUG";
const INFO = "INFO";
const WARNING = "WARNING";
const ERROR = "ERROR";
const DISABLED = "DISABLED";

const ordering = [ERROR, WARNING, INFO, DEBUG];

function buildIsEnabled(configuredLogLevel) {
  if (configuredLogLevel === DISABLED) {
    return () => false;
  }
  if (!ordering.includes(configuredLogLevel)) {
    throw new Error(`Unknown log level "${configuredLogLevel}"`);
  }

  const indexInOrdering = ordering.indexOf(configuredLogLevel);
  const enabledLogLevels = new Set(ordering.slice(0, indexInOrdering + 1));
  return logLevel => enabledLogLevels.has(logLevel);
}

module.exports = { DEBUG, INFO, WARNING, ERROR, DISABLED, buildIsEnabled };
