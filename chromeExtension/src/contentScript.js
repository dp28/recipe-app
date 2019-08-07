import { togglePopup } from "./popup.js";
import { TOGGLE_POPUP, REQUEST_TEXT, textResponse } from "./messages.js";
import { debug } from "./logging.js";
import { buildChannel } from "./channel.js";
import { searchForText } from "./documentSearch.js";

const HIGHLIGHT_COLOUR = "#90caf9";
const HIGHLIGHT_CURSOR = "pointer";

export function main() {
  debug("Loaded!");
  registerListeners();
}

let channel;

function registerListeners() {
  chrome.runtime.onMessage.addListener(action => {
    debug("Message received by content script:", action);
    switch (action.type) {
      case TOGGLE_POPUP:
        togglePopup();
        setupMessaging();
        return;
      default:
        return;
    }
  });
}

async function setupMessaging() {
  if (!channel) {
    channel = await buildChannel();
    channel.addListener(handleAppAction(channel));
  }
}

function handleAppAction(channel) {
  return action => {
    switch (action.type) {
      case REQUEST_TEXT:
        return startSelectingText(channel);
      default:
        return;
    }
  };
}

function startSelectingText(channel) {
  debug("Selecting text");
  searchForText(text => {
    channel.sendAction(textResponse(text));
  });
}
