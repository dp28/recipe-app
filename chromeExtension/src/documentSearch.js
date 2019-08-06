const HIGHLIGHT_COLOUR = "#90caf9";
const HIGHLIGHT_CURSOR = "pointer";
const listeners = [];

export function searchForText(callback, root = document) {
  cancelSearch();
  startHighlighting(root);
  onTextFound(root, callback);
}

export function cancelSearch(root = document) {
  while (listeners.length) {
    const { eventType, listener, options } = listeners.pop();
    root.removeEventListener(eventType, listener, options);
  }
}

function startHighlighting(root) {
  registerListener(root, "mouseover", highlightTarget);
  registerListener(root, "mouseout", restoreTarget);
}

function onTextFound(root, callback) {
  function onClick(event) {
    event.preventDefault();
    restoreTarget(event);
    cancelSearch();
    const text = removeExtraWhitespace(event.target.textContent);
    callback(text);
  }
  registerListener(root, "click", onClick, { capture: true });
}

function registerListener(root, eventType, listener, options = {}) {
  root.addEventListener(eventType, listener, options);
  listeners.push({ eventType, listener, options });
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

function removeExtraWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}
