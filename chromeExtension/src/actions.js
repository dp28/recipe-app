export const TOGGLE_POPUP = "TOGGLE_POPUP";
export const SET_RECIPE_URL = "SET_RECIPE_URL";
export const SET_RECIPE_TITLE = "SET_RECIPE_TITLE";

// Actions sent from app
export const REQUEST_TITLE = "REQUEST_TITLE";

export const SOURCE = "RECIPE_CHROME_EXTENSION";

export const togglePopup = () => ({ source: SOURCE, type: TOGGLE_POPUP });
export const setRecipeUrl = url => ({
  source: SOURCE,
  type: SET_RECIPE_URL,
  url
});

export const setRecipeTitle = title => ({
  source: SOURCE,
  type: SET_RECIPE_TITLE,
  title
});
