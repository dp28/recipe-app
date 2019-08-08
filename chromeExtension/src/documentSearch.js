const HIGHLIGHT_BOX_SHADOW = "0 0 2px 2px #90caf9";
const HIGHLIGHT_CURSOR = "pointer";
const listeners = [];

export function searchForText(callback, root = document) {
  search({
    root,
    callback,
    highlight: highlightElement,
    restore: restoreElement,
    extractValue: getTextContent
  });
}

export function searchForTextList(callback, root = document) {
  search({
    root,
    callback,
    highlight: highlightSiblings,
    restore: restoreSiblings,
    extractValue: getSiblingsTextContent
  });
}

export function cancelSearch(root = document) {
  while (listeners.length) {
    const { eventType, listener, options } = listeners.pop();
    root.removeEventListener(eventType, listener, options);
  }
}

function search({ root, highlight, extractValue, restore, callback }) {
  cancelSearch();
  startHighlighting({ root, highlight, restore });
  onSelected({ root, restore, extractValue, callback });
}

function startHighlighting({ root, highlight, restore }) {
  registerListener(root, "mouseover", withTarget(highlight));
  registerListener(root, "mouseout", withTarget(restore));
}

function onSelected({ root, restore, extractValue, callback }) {
  function onClick(event) {
    event.preventDefault();
    restore(event.target);
    cancelSearch();
    callback(extractValue(event.target));
  }
  registerListener(root, "click", onClick, { capture: true });
}

function registerListener(root, eventType, listener, options = {}) {
  root.addEventListener(eventType, listener, options);
  listeners.push({ eventType, listener, options });
}

function highlightElement(element) {
  if (element.style && hasText(element)) {
    element.style.boxShadow = HIGHLIGHT_BOX_SHADOW;
    element.style.cursor = HIGHLIGHT_CURSOR;
  }
}

function hasText(element) {
  return element.textContent && element.textContent.replace(/\s/g, "");
}

function restoreElement(element) {
  if (element.style) {
    element.style.boxShadow = "";
    element.style.cursor = "";
  }
}

function highlightSiblings(element) {
  element.parentNode.childNodes.forEach(highlightElement);
}

function restoreSiblings(element) {
  element.parentNode.childNodes.forEach(restoreElement);
}

function removeExtraWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function withTarget(func) {
  return event => func(event.target);
}

function getTextContent(element) {
  return removeExtraWhitespace(element.textContent);
}

function getSiblingsTextContent(element) {
  return [...element.parentNode.childNodes].map(getTextContent).filter(Boolean);
}
