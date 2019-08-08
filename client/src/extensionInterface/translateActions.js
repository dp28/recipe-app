import {
  REQUEST_TITLE,
  REQUEST_SERVINGS,
  setRecipeTitle,
  setRecipeServings
} from "../actions";

export const REQUEST_TEXT = "REQUEST_TEXT";
export const TEXT_RESPONSE = "TEXT_RESPONSE";

export const RECIPE_APP_SOURCE = "RECIPE_APP";

const ActionTypeToMessageType = {
  [REQUEST_TITLE]: REQUEST_TEXT,
  [REQUEST_SERVINGS]: REQUEST_TEXT
};

const ActionCreatorsForText = {
  title: setRecipeTitle,
  servings: setRecipeServings
};

export function translateActionToMessage(action) {
  const type = ActionTypeToMessageType[action.type];
  return type ? { type, source: RECIPE_APP_SOURCE } : null;
}

export function translateMessageToAction(state, message) {
  if (message.type !== TEXT_RESPONSE || !state.browserExtension.waitingFor) {
    return null;
  }
  const actionCreator =
    ActionCreatorsForText[state.browserExtension.waitingFor];
  return actionCreator ? actionCreator(message.text) : null;
}
