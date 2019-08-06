export const TOGGLE_POPUP = "TOGGLE_POPUP";
export const SET_RECIPE_URL = "SET_RECIPE_URL";
export const SET_RECIPE_TITLE = "SET_RECIPE_TITLE";
export const SET_RECIPE_SERVINGS = "SET_RECIPE_SERVINGS";

// Actions sent from app
export const REQUEST_TITLE = "REQUEST_TITLE";
export const REQUEST_SERVINGS = "REQUEST_SERVINGS";

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

export const setRecipeServings = servings => ({
  source: SOURCE,
  type: SET_RECIPE_SERVINGS,
  servings
});
