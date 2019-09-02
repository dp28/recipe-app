export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS";
export const COMBINE_INGREDIENTS = "COMBINE_INGREDIENTS";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_TO_CATEGORY = "ADD_TO_CATEGORY";
export const SCALE_BY_SERVINGS = "SCALE_BY_SERVINGS";

export const REQUEST_API_METADATA = "REQUEST_API_METADATA";
export const API_METADATA_LOADED = "API_METADATA_LOADED";
export const ERROR_LOADING_API_METADATA = "ERROR_LOADING_API_METADATA";

export const LOAD_RECIPES = "LOAD_RECIPES";
export const RECIPES_LOADED = "RECIPES_LOADED";
export const ERROR_LOADING_RECIPES = "ERROR_LOADING_RECIPES";

export const LOAD_RECIPE_BY_ID = "LOAD_RECIPE_BY_ID";
export const LOAD_RECIPE_BY_URL = "LOAD_RECIPE_BY_URL";
export const RECIPE_LOADED = "RECIPE_LOADED";
export const ERROR_LOADING_RECIPE = "ERROR_LOADING_RECIPE";

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

export const scaleByServings = servings => ({
  type: SCALE_BY_SERVINGS,
  servings
});

export const loadRecipes = () => ({ type: LOAD_RECIPES });
export const recipesLoaded = recipes => ({ type: RECIPES_LOADED, recipes });
export const errorLoadingRecipes = error => ({
  type: ERROR_LOADING_RECIPES,
  error
});

export const loadRecipeById = id => ({ type: LOAD_RECIPE_BY_ID, id });
export const loadRecipeByURL = url => ({ type: LOAD_RECIPE_BY_URL, url });
export const recipeLoaded = recipe => ({ type: RECIPE_LOADED, recipe });
export const errorLoadingRecipe = error => ({
  type: ERROR_LOADING_RECIPE,
  error
});
