import {
  REQUEST_TITLE,
  REQUEST_SERVINGS,
  REQUEST_INGREDIENTS,
  REQUEST_METHOD,
  setRecipeTitle,
  setRecipeServings,
  setRecipeIngredients,
  setRecipeMethod
} from "../actions";

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
  ingredients: setRecipeIngredients,
  method: setRecipeMethod
};

export function translateActionToMessage(action) {
  const type = ActionTypeToMessageType[action.type];
  return type ? { type, source: RECIPE_APP_SOURCE } : null;
}

export function translateMessageToAction(state, message) {
  const { waitingFor } = state.browserExtension;
  if (!waitingFor) {
    return null;
  }
  if (message.type === TEXT_RESPONSE) {
    const actionCreator = ActionCreatorsForText[waitingFor];
    return actionCreator ? actionCreator(message.text) : null;
  }
  if (message.type === TEXT_LIST_RESPONSE) {
    const actionCreator = ActionCreatorsForTextList[waitingFor];
    return actionCreator ? actionCreator(message.list) : null;
  }
}
