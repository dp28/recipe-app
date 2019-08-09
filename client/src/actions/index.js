export const REQUEST_API_METADATA = "REQUEST_API_METADATA";
export const API_METADATA_LOADED = "API_METADATA_LOADED";
export const ERROR_LOADING_API_METADATA = "ERROR_LOADING_API_METADATA";
export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS";
export const COMBINE_INGREDIENTS = "COMBINE_INGREDIENTS";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_TO_CATEGORY = "ADD_TO_CATEGORY";

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

export const requestApiMetadata = () => ({ type: REQUEST_API_METADATA });

export const apiMetadataLoaded = ({ version, environment, deployedAt }) => ({
  type: API_METADATA_LOADED,
  version,
  environment,
  deployedAt
});

export const errorLoadingApiMetadata = error => ({
  type: ERROR_LOADING_API_METADATA,
  error
});

export const updateIngredients = ({ ingredients }) => ({
  type: UPDATE_INGREDIENTS,
  ingredients
});

export const combineIngredients = ingredients => ({
  type: COMBINE_INGREDIENTS,
  ingredients
});

export const addCategory = ({ name }) => ({ type: ADD_CATEGORY, name });
export const addToCategory = ({ ingredient, categoryName }) => ({
  type: ADD_TO_CATEGORY,
  ingredient,
  categoryName
});

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

export const appLoaded = () => ({ type: APP_LOADED });
export const requestTitle = () => ({ type: REQUEST_TITLE });
export const requestServings = () => ({ type: REQUEST_SERVINGS });
export const requestIngredients = () => ({ type: REQUEST_INGREDIENTS });
export const requestMethod = () => ({ type: REQUEST_METHOD });
