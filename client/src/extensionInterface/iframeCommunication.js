import { store as reduxStore } from "../state/store";
import { debug } from "../logging";
import { appLoaded } from "../actions";
import {
  translateActionToMessage,
  translateMessageToAction
} from "./translateActions";

export function enableIframeCommunication(
  windowObject = window,
  store = reduxStore,
  translateToAction = translateMessageToAction
) {
  if (!inIframe(windowObject)) {
    debug("Not in an iframe - skipping iframe communication");
    return;
  }

  windowObject.addEventListener(
    "message",
    handleExtensionMessage(store, translateToAction)
  );
  windowObject.parent.postMessage(appLoaded(), "*");
  debug("Ready to receive messages");
}

export function handleExtensionMessage(store, translateToAction) {
  return messageEvent => {
    const action = translateToAction(store.getState(), messageEvent.data);
    if (action) {
      debug("Received action:", action);
      store.dispatch(action);
    }
  };
}

export function iframeCommunicationReduxMiddleware(
  translateToMessage = (...args) => translateActionToMessage(...args),
  windowObject = window
) {
  if (!inIframe(windowObject)) {
    return store => next => action => next(action);
  }
  debug("Loaded iframe middleware to communicate with extension");
  return store => next => action => {
    const message = translateToMessage(action);
    if (message) {
      debug("Sending message to extension", message);
      windowObject.parent.postMessage(message, "*");
    }
    return next(action);
  };
}

function inIframe(windowObject) {
  return windowObject.location !== windowObject.parent.location;
}
