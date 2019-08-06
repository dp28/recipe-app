import { store } from "../state/store";
import { debug } from "../logging";
import { appLoaded } from "../actions";

export function enableIframeCommunication(
  windowObject = window,
  dispatch = store.dispatch
) {
  if (!inIframe(windowObject)) {
    debug("Not in an iframe - skipping iframe communication");
    return;
  }

  windowObject.addEventListener("message", handleExtensionMessage(dispatch));
  windowObject.parent.postMessage(appLoaded(), "*");
  debug("Ready to receive messages");
}

export function handleExtensionMessage(dispatch) {
  return messageEvent => {
    const action = messageEvent.data;
    if (action.source === "RECIPE_CHROME_EXTENSION") {
      debug("Received action from extension:", action);
      dispatch(action);
    }
  };
}

export function iframeCommunicationReduxMiddleware(windowObject = window) {
  if (!inIframe(windowObject)) {
    return store => next => action => next(action);
  }
  debug("Loaded iframe middleware to communicate with extension");
  return store => next => action => {
    if (action.destination === "BROWSER_EXTENSION") {
      debug("Sending action to extension", action);
      windowObject.parent.postMessage(action, "*");
    }
    return next(action);
  };
}

function inIframe(windowObject) {
  return windowObject.location !== windowObject.parent.location;
}
