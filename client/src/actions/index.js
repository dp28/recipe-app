export const REQUEST_VERSION = "REQUEST_VERSION";
export const VERSION_LOADED = "VERSION_LOADED";
export const ERROR_LOADING_VERSION = "ERROR_LOADING_VERSION";

export const requestVersion = () => ({ type: REQUEST_VERSION });
export const versionLoaded = version => ({ type: VERSION_LOADED, version });
export const errorLoadingVersion = error => ({
  type: ERROR_LOADING_VERSION,
  error
});
