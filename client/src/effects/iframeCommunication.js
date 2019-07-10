import { store } from "../state/store";

export function enableIframeCommunication(
  windowObject = window,
  dispatch = store.dispatch
) {
  if (windowObject.location === windowObject.parent.location) {
    console.debug("Not in an iframe - skipping iframe communication");
    return;
  }

  windowObject.addEventListener("message", handleExtensionMessage(dispatch));
}

export function handleExtensionMessage(dispatch) {
  return messageEvent => {
    const action = messageEvent.data;
    if (action.source === "RECIPE_CHROME_EXTENSION") {
      console.debug("Received action from extension:", action);
      dispatch(action);
    }
  };
}
