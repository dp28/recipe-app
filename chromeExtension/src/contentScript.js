import { togglePopup } from "./popup.js";
import {
  TOGGLE_POPUP,
  REQUEST_TITLE,
  REQUEST_SERVINGS,
  setRecipeTitle,
  setRecipeServings
} from "./actions.js";
import { debug } from "./logging.js";
import { buildChannel } from "./channel.js";

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
      case REQUEST_TITLE:
        return startSelectingTitle(channel);
      case REQUEST_SERVINGS:
        return startSelectingServings(channel);
      default:
        return;
    }
  };
}

function startSelectingTitle(channel, root = document) {
  debug("Selecting title");
  const updateTitle = selectTitle(channel);
  root.addEventListener("mouseover", highlightTarget);
  root.addEventListener("mouseout", restoreTarget);
  root.addEventListener("click", updateTitle, { capture: true });

  root.addEventListener("click", function removeListeners() {
    debug("Removing listeners");
    root.removeEventListener("mouseover", highlightTarget);
    root.removeEventListener("mouseout", restoreTarget);
    root.removeEventListener("click", updateTitle, { capture: true });
    root.removeEventListener("click", removeListeners);
  });
}

function startSelectingServings(channel, root = document) {
  debug("Selecting servings");
  const updateServings = selectServings(channel);
  root.addEventListener("mouseover", highlightTarget);
  root.addEventListener("mouseout", restoreTarget);
  root.addEventListener("click", updateServings, { capture: true });

  root.addEventListener("click", function removeListeners() {
    debug("Removing listeners");
    root.removeEventListener("mouseover", highlightTarget);
    root.removeEventListener("mouseout", restoreTarget);
    root.removeEventListener("click", updateServings, { capture: true });
    root.removeEventListener("click", removeListeners);
  });
}

function highlightTarget({ target }) {
  if (target.style && hasText(target)) {
    target.style.backgroundColor = HIGHLIGHT_COLOUR;
    target.style.cursor = HIGHLIGHT_CURSOR;
  }
}

function hasText(element) {
  return element.textContent && element.textContent.replace(/\s/g, "");
}

function restoreTarget({ target }) {
  if (target.style) {
    target.style.backgroundColor = "";
    target.style.cursor = "";
  }
}

function selectTitle(channel) {
  return event => {
    event.preventDefault();
    restoreTarget(event);
    const title = removeExtraWhitespace(event.target.textContent);
    channel.sendAction(setRecipeTitle(title));
  };
}

function selectServings(channel) {
  return event => {
    event.preventDefault();
    restoreTarget(event);
    const servings = removeExtraWhitespace(event.target.textContent);
    channel.sendAction(setRecipeServings(servings));
  };
}

function removeExtraWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}
