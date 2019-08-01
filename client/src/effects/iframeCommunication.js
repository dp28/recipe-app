import { store } from "../state/store";
import { debug } from "../logging";

export function enableIframeCommunication(
  windowObject = window,
  dispatch = store.dispatch
) {
  if (windowObject.location === windowObject.parent.location) {
    debug("Not in an iframe - skipping iframe communication");
    return;
  }

  windowObject.addEventListener("message", handleExtensionMessage(dispatch));
  windowObject.parent.postMessage(
    { type: "APP_LOADED", source: "RECIPE_APP" },
    "*"
  );
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
