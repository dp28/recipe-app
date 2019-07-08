import { togglePopup } from "./actions.js";

export function main() {
  console.log("Loaded!");
  registerListeners();
}

function registerListeners() {
  chrome.browserAction.onClicked.addListener(tab => {
    console.log("Clicked - tab:", tab.id);
    chrome.tabs.sendMessage(tab.id, togglePopup());
  });
}
