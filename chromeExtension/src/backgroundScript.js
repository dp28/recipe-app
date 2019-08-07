import { togglePopup } from "./messages.js";
import { debug } from "./logging.js";

export function main() {
  debug("Loaded!");
  registerListeners();
}

function registerListeners() {
  chrome.browserAction.onClicked.addListener(tab => {
    debug("Clicked - tab:", tab.id);
    chrome.tabs.sendMessage(tab.id, togglePopup());
  });
}
