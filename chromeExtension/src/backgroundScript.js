import { togglePopup } from "./messages.js";
import { debug } from "./logging.js";

export function main() {
  debug("Loaded!");
  registerListeners();
}

function registerListeners() {
  chrome.browserAction.onClicked.addListener(tab => {
    debug("Clicked - tab:", tab.id);
    chrome.tabs.executeScript(
      tab.id,
      {
        file: "src/loadContentScript.js",
        runAt: "document_end",
        allFrames: false
      },
      (...results) => {
        debug("Content script loaded", ...results);
        chrome.tabs.sendMessage(tab.id, togglePopup());
      }
    );
  });
}
