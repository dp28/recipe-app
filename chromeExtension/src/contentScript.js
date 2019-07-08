import { insertPopup, togglePopup } from "./popup.js";
import { TOGGLE_POPUP } from "./actions.js";

export function main() {
  console.debug("Loaded!");
  insertPopup();
}

chrome.runtime.onMessage.addListener(action => {
  console.debug("Message received by content script:", action);
  switch (action.type) {
    case TOGGLE_POPUP:
      return togglePopup();
    default:
      return;
  }
});
