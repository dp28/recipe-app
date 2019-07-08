const PopupId = "recipe-app-popup-parent";

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

export function insertPopup(src = "https://localhost:3001") {
  const popup = document.createElement("div");
  popup.id = PopupId;
  popup.style.cssText = popupCSS;

  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.style.cssText = iframeCSS;
  popup.appendChild(iframe);
  document.body.appendChild(popup);
}

export function togglePopup() {
  const { style } = document.getElementById(PopupId);
  const isHidden = style.display && style.display === "none";
  style.display = isHidden ? "block" : "none";
}