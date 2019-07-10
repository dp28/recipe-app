export const TOGGLE_POPUP = "TOGGLE_POPUP";
export const IDENTIFY_RECIPE_URL = "IDENTIFY_RECIPE_URL";

export const SOURCE = "RECIPE_CHROME_EXTENSION";

export const togglePopup = () => ({ source: SOURCE, type: TOGGLE_POPUP });
export const identifyRecipeUrl = url => ({
  source: SOURCE,
  type: IDENTIFY_RECIPE_URL,
  url
});
