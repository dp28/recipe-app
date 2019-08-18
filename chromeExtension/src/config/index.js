const HOST = "localhost:3001";

export const APP_URL = `https://${HOST}/as_browser_extension`;

export const LOGGING_ENABLED = getEnvironment() !== "test";

function getEnvironment() {
  try {
    return process.env.ENVIRONMENT;
  } catch (error) {
    return undefined;
  }
}
