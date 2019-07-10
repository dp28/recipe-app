import { APP_URL } from "./config/index.js";
import * as popup from "./popup.js";
import { debug, error } from "./logging.js";
import { APP_LOADED } from "./appEventTypes.js";
import { identifyRecipeUrl } from "./actions.js";

export async function buildChannel({
  getIframeWindow = popup.getIframeWindow,
  location = window.location
} = {}) {
  let started = false;
  const iframeWindow = getIframeWindow();
  const listeners = [];

  if (!iframeWindow) {
    throw new Error("iframe not yet loaded");
  }

  iframeWindow.addEventListener("message", event => {
    debug("Received message", event);
    if (event.type === APP_LOADED) {
      started = true;
    } else {
      listeners.forEach(listener => listener(event));
    }
  });

  await waitForWindowToLoad(iframeWindow);
  iframeWindow.postMessage(identifyRecipeUrl(location.href), APP_URL);

  return {
    sendAction(action) {
      debug("Sending action", action);
      if (!started) {
        throw new Error("app not yet ready to receive messages");
      }
      iframeWindow.postMessage(action, APP_URL);
    },
    addListener(listener) {
      listeners.push(listener);
    }
  };
}

function waitForWindowToLoad(windowObject) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      try {
        const targetHref = windowObject.location.href;
        debug("href still accessible:", targetHref);
      } catch (error) {
        if (error.toString().includes("cross-origin frame")) {
          clearInterval(interval);
          resolve();
          return;
        }
        throw error;
      }
    }, 100);
  });
}
