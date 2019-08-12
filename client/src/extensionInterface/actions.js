export const APP_LOADED = "APP_LOADED";
export const REQUEST_TITLE = "REQUEST_TITLE";
export const REQUEST_SERVINGS = "REQUEST_SERVINGS";
export const REQUEST_INGREDIENTS = "REQUEST_INGREDIENTS";
export const REQUEST_METHOD = "REQUEST_METHOD";

export const SET_RECIPE_URL = "SET_RECIPE_URL";
export const SET_RECIPE_TITLE = "SET_RECIPE_TITLE";
export const SET_RECIPE_SERVINGS = "SET_RECIPE_SERVINGS";
export const SET_RECIPE_INGREDIENTS = "SET_RECIPE_INGREDIENTS";
export const SET_RECIPE_METHOD = "SET_RECIPE_METHOD";

export const appLoaded = () => ({ type: APP_LOADED });
export const requestTitle = () => ({ type: REQUEST_TITLE });
export const requestServings = () => ({ type: REQUEST_SERVINGS });
export const requestIngredients = () => ({ type: REQUEST_INGREDIENTS });
export const requestMethod = () => ({ type: REQUEST_METHOD });

export const setRecipeUrl = url => ({
  type: SET_RECIPE_URL,
  url
});

export const setRecipeTitle = title => ({
  type: SET_RECIPE_TITLE,
  title
});

export const setRecipeServings = servings => ({
  type: SET_RECIPE_SERVINGS,
  servings
});

export const setRecipeIngredients = ingredients => ({
  type: SET_RECIPE_INGREDIENTS,
  ingredients
});

export const setRecipeMethod = instructions => ({
  type: SET_RECIPE_METHOD,
  instructions
});
