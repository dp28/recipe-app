import { togglePopup } from "./popup.js";
import { TOGGLE_POPUP } from "./actions.js";
import { debug } from "./logging.js";
import { buildChannel } from "./channel.js";

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
        if (!channel) {
          buildChannel()
            .then(c => {
              channel = c;
            })
            .then(() => channel.addListener(console.log));
        }
        return;
      default:
        return;
    }
  });
}
