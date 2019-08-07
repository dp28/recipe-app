export const TOGGLE_POPUP = "TOGGLE_POPUP";
export const REGISTER_URL = "REGISTER_URL";
export const TEXT_RESPONSE = "TEXT_RESPONSE";

// Request types sent from app
export const REQUEST_TEXT = "REQUEST_TEXT";

export const togglePopup = () => ({ type: TOGGLE_POPUP });
export const registerUrl = url => ({ type: REGISTER_URL, url });
export const textResponse = text => ({ type: TEXT_RESPONSE, text });
