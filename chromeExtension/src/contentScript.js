import { togglePopup } from "./popup.js";
import {
  TOGGLE_POPUP,
  REQUEST_TEXT,
  REQUEST_TEXT_LIST,
  textResponse,
  textListResponse
} from "./messages.js";
import { debug } from "./logging.js";
import { buildChannel } from "./channel.js";
import { searchForText, searchForTextList } from "./documentSearch.js";

const HIGHLIGHT_COLOUR = "#90caf9";
const HIGHLIGHT_CURSOR = "pointer";

let channel;

export function main() {
  debug("Loaded!");
  registerListeners();
  togglePopup();
  setupMessaging();
}

function registerListeners() {
  chrome.runtime.onMessage.addListener(action => {
    debug("Message received by content script:", action);
    switch (action.type) {
      case TOGGLE_POPUP:
        togglePopup();
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
      case REQUEST_TEXT_LIST:
        return startSelectingTextList(channel);
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

function startSelectingTextList(channel) {
  debug("Selecting list");
  searchForTextList(list => {
    channel.sendAction(textListResponse(list));
  });
}
