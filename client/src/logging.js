import { loggingEnabled } from "./config";

const PREFIX = "[RECIPE-APP]";

export function debug(...args) {
  if (loggingEnabled) {
    console.debug(PREFIX, ...args);
  }
}

export function info(...args) {
  if (loggingEnabled) {
    console.info(PREFIX, ...args);
  }
}

export function warning(...args) {
  if (loggingEnabled) {
    console.warning(PREFIX, ...args);
  }
}

export function error(...args) {
  if (loggingEnabled) {
    console.error(PREFIX, ...args);
  }
}
