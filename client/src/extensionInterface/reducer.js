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

export function browserExtensionReducer(state = { waitingFor: null }, action) {
  switch (action.type) {
    case REQUEST_TITLE:
      return { ...state, waitingFor: "title" };
    case SET_RECIPE_TITLE:
      return { ...state, waitingFor: null };
    case REQUEST_SERVINGS:
      return { ...state, waitingFor: "servings" };
    case SET_RECIPE_SERVINGS:
      return { ...state, waitingFor: null };
    case REQUEST_INGREDIENTS:
      return { ...state, waitingFor: "ingredients" };
    case SET_RECIPE_INGREDIENTS:
      return { ...state, waitingFor: null };
    case REQUEST_METHOD:
      return { ...state, waitingFor: "method" };
    case SET_RECIPE_METHOD:
      return { ...state, waitingFor: null };
    default:
      return state;
  }
}
