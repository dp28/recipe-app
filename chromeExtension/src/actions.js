export const TOGGLE_POPUP = "TOGGLE_POPUP";
export const IDENTIFY_RECIPE_URL = "IDENTIFY_RECIPE_URL";

export const togglePopup = () => ({ type: TOGGLE_POPUP });
export const identifyRecipeUrl = url => ({ type: IDENTIFY_RECIPE_URL, url });
