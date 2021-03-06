import { APP_URL } from "./config/index.js";
import * as popup from "./popup.js";
import { debug, error } from "./logging.js";
import { APP_LOADED } from "./appEventTypes.js";
import { registerUrl } from "./messages.js";

export async function buildChannel({
  getIframeWindow = popup.getIframeWindow,
  currentWindow = window
} = {}) {
  let started = false;
  const iframeWindow = getIframeWindow();
  const listeners = [];

  if (!iframeWindow) {
    throw new Error("iframe not yet loaded");
  }

  await waitForAppLoadedMessage(currentWindow);

  currentWindow.addEventListener("message", event => {
    if (event.data && event.data.source === "RECIPE_APP") {
      debug("Received message", event.data);
      listeners.forEach(listener => listener(event.data));
    }
  });

  debug("Sending startup message");
  iframeWindow.postMessage(registerUrl(currentWindow.location.href), APP_URL);

  return {
    sendAction(action) {
      iframeWindow.postMessage(action, APP_URL);
    },
    addListener(listener) {
      listeners.push(listener);
    }
  };
}

function waitForAppLoadedMessage(windowObject) {
  return new Promise((resolve, reject) => {
    function listenForAppLoaded(event) {
      debug("Received message while waiting for startup", event);
      if (event.data.type === APP_LOADED) {
        windowObject.removeEventListener("message", listenForAppLoaded);
        clearTimeout(killAfterTimeout);
        resolve();
      }
    }

    function killAfterTimeout() {
      windowObject.removeEventListener("message", listenForAppLoaded);
      reject(new Error("Timed out waiting for app startup"));
    }

    windowObject.addEventListener("message", listenForAppLoaded);
    setTimeout(killAfterTimeout, 5000);
  });
}
