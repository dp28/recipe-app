import { combineReducers } from "redux";
import {
  API_METADATA_LOADED,
  ERROR_LOADING_API_METADATA,
  REQUEST_API_METADATA,
  LOAD_RECIPES,
  RECIPES_LOADED,
  ERROR_LOADING_RECIPES,
  LOAD_RECIPE_BY_ID,
  LOAD_RECIPE_BY_URL,
  RECIPE_LOADED,
  ERROR_LOADING_RECIPE
} from "../actions";

export const metadataReducer = combineReducers({
  api: apiMetadataReducer,
  recipes: recipesMetadataReducer,
  recipe: recipeMetadataReducer
});

function apiMetadataReducer(state = { loading: true }, action) {
  switch (action.type) {
    case REQUEST_API_METADATA:
      return { loading: true };
    case API_METADATA_LOADED:
      return {
        version: action.version,
        environment: action.environment,
        deployedAt: new Date(Date.parse(action.deployedAt)),
        loading: false
      };
    case ERROR_LOADING_API_METADATA:
      return { error: action.error, loading: false };

    default:
      return state;
  }
}

function recipesMetadataReducer(state = { loading: false }, action) {
  switch (action.type) {
    case LOAD_RECIPES:
      return { loading: true };
    case RECIPES_LOADED:
      return { loading: false };
    case ERROR_LOADING_RECIPES:
      return { error: action.error, loading: false };
    default:
      return state;
  }
}

function recipeMetadataReducer(state = { loading: false }, action) {
  switch (action.type) {
    case LOAD_RECIPE_BY_ID:
      return { loading: true };
    case LOAD_RECIPE_BY_URL:
      return { loading: true };
    case RECIPE_LOADED:
      return { loading: false };
    case ERROR_LOADING_RECIPE:
      return { error: action.error, loading: false };
    default:
      return state;
  }
}
