import {
  REQUEST_TITLE,
  REQUEST_SERVINGS,
  REQUEST_INGREDIENTS,
  REQUEST_METHOD,
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  SET_RECIPE_METHOD
} from "../extensionInterface/actions";
import { RECIPE_LOADED } from "../actions";

export function browserExtensionReducer(state = { waitingFor: null }, action) {
  switch (action.type) {
    case RECIPE_LOADED:
      return stopWaiting(state);
    case REQUEST_TITLE:
      return { ...state, waitingFor: "title" };
    case SET_RECIPE_TITLE:
      return stopWaiting(state);
    case REQUEST_SERVINGS:
      return { ...state, waitingFor: "servings" };
    case SET_RECIPE_SERVINGS:
      return stopWaiting(state);
    case REQUEST_INGREDIENTS:
      return { ...state, waitingFor: "ingredients" };
    case SET_RECIPE_INGREDIENTS:
      return stopWaiting(state);
    case REQUEST_METHOD:
      return { ...state, waitingFor: "method" };
    case SET_RECIPE_METHOD:
      return stopWaiting(state);
    default:
      return state;
  }
}

function stopWaiting(state) {
  return { ...state, waitingFor: null };
}
