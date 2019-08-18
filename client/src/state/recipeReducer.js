import {
  SET_RECIPE_URL,
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  SET_RECIPE_METHOD
} from "../extensionInterface/actions";

export function recipeReducer(recipe = {}, action) {
  switch (action.type) {
    case SET_RECIPE_URL:
      return { ...recipe, url: action.url };
    case SET_RECIPE_TITLE:
      return { ...recipe, title: action.title };
    case SET_RECIPE_INGREDIENTS:
      return { ...recipe, ingredients: action.ingredients };
    case SET_RECIPE_METHOD:
      return {
        ...recipe,
        method: { instructions: action.instructions.map(parseInstruction) }
      };
    case SET_RECIPE_SERVINGS:
      const digits = action.servings.match(/(\d+)/);
      return { ...recipe, servings: digits ? Number(digits[1]) : undefined };
    default:
      return recipe;
  }
}

function parseInstruction(text) {
  return { text };
}
