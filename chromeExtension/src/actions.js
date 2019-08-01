export const TOGGLE_POPUP = "TOGGLE_POPUP";
export const SET_RECIPE_URL = "SET_RECIPE_URL";

export const SOURCE = "RECIPE_CHROME_EXTENSION";

export const togglePopup = () => ({ source: SOURCE, type: TOGGLE_POPUP });
export const setRecipeUrl = url => ({
  source: SOURCE,
  type: SET_RECIPE_URL,
  url
});
