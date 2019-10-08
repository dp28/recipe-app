import {
  REQUEST_TITLE,
  REQUEST_SERVINGS,
  REQUEST_INGREDIENTS,
  REQUEST_METHOD,
  setRecipeUrl,
  setRecipeTitle,
  setRecipeServings,
  importRecipeIngredients,
  importRecipeMethod
} from "./actions";
import { loadRecipeByURL } from "../actions";
import { debug } from "../logging";

export const REGISTER_URL = "REGISTER_URL";
export const REQUEST_TEXT = "REQUEST_TEXT";
export const REQUEST_TEXT_LIST = "REQUEST_TEXT_LIST";
export const TEXT_RESPONSE = "TEXT_RESPONSE";
export const TEXT_LIST_RESPONSE = "TEXT_LIST_RESPONSE";

export const RECIPE_APP_SOURCE = "RECIPE_APP";

const ActionTypeToMessageType = {
  [REQUEST_TITLE]: REQUEST_TEXT,
  [REQUEST_SERVINGS]: REQUEST_TEXT,
  [REQUEST_INGREDIENTS]: REQUEST_TEXT_LIST,
  [REQUEST_METHOD]: REQUEST_TEXT_LIST
};

const ActionCreatorsForText = {
  title: setRecipeTitle,
  servings: setRecipeServings
};

const ActionCreatorsForTextList = {
  ingredients: importRecipeIngredients,
  method: importRecipeMethod
};

export function translateActionToMessage(action) {
  const type = ActionTypeToMessageType[action.type];
  return type ? { type, source: RECIPE_APP_SOURCE } : null;
}

export function translateMessageToActions(state, message) {
  debug("Received", message);
  if (message.type === REGISTER_URL) {
    return [setRecipeUrl(message.url), loadRecipeByURL(message.url)];
  }
  const { currentStep } = state.browserExtension;
  if (!currentStep) {
    return [];
  }
  if (message.type === TEXT_RESPONSE) {
    const actionCreator = ActionCreatorsForText[currentStep];
    return actionCreator ? [actionCreator(message.text)] : [];
  }
  if (message.type === TEXT_LIST_RESPONSE) {
    const actionCreator = ActionCreatorsForTextList[currentStep];
    return actionCreator ? [actionCreator(message.list)] : [];
  }
  return [];
}
