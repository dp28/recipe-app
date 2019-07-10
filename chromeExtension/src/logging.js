import { APP_URL, LOGGING_ENABLED } from "./config/index.js";

const PREFIX = "[RECIPE-EXTENSION]";

export function debug(...args) {
  if (LOGGING_ENABLED) {
    console.debug(PREFIX, ...args);
  }
}

export function info(...args) {
  if (LOGGING_ENABLED) {
    console.info(PREFIX, ...args);
  }
}

export function warning(...args) {
  if (LOGGING_ENABLED) {
    console.warning(PREFIX, ...args);
  }
}

export function error(...args) {
  if (LOGGING_ENABLED) {
    console.error(PREFIX, ...args);
  }
}
