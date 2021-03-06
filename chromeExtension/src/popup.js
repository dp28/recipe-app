import { APP_URL } from "./config/index.js";
const PopupId = "recipe-app-popup-parent";
const IframeId = "recipe-app-popup-iframe";

const popupCSS = `
  all: initial;
  font-family: sans-serif;
  top: 10px;
  right: 10px;
  width: 300px;
  height: 500px;
  position: fixed;
  z-index: 1000000000;
  background: white;
  padding: 0px;
  box-shadow: -1px 1px 10px #333;
  border-radius: 5px;
  display: none;
`;

const iframeCSS = `
  width: 100%;
  height: calc(100%);
  border: none;
  overflow-y: auto;
`;

export function togglePopup() {
  const { style } = getPopup();
  const isHidden = style.display && style.display === "none";
  style.display = isHidden ? "block" : "none";
}

let iframeWindow = null;

export function getIframeWindow() {
  return iframeWindow;
}

function getPopup() {
  const popup = document.getElementById(PopupId);
  if (popup) {
    return popup;
  }
  const newPopup = insertPopup();
  iframeWindow = document.getElementById(IframeId).contentWindow;
  return newPopup;
}

function insertPopup() {
  const popup = document.createElement("div");
  popup.id = PopupId;
  popup.style.cssText = popupCSS;

  const iframe = document.createElement("iframe");
  iframe.src = APP_URL;
  iframe.id = IframeId;
  iframe.style.cssText = iframeCSS;
  popup.appendChild(iframe);
  document.body.appendChild(popup);
  return popup;
}
