import {
  SET_RECIPE_URL,
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  SET_RECIPE_METHOD
} from "../extensionInterface/actions";
import { SET_RECIPE_ID, SCALE_BY_SERVINGS, RECIPE_LOADED } from "../actions";

export function recipeReducer(recipe = {}, action) {
  switch (action.type) {
    case SET_RECIPE_ID:
      return recipe.id ? recipe : { ...recipe, id: action.id };
    case SET_RECIPE_URL:
      return { ...recipe, url: action.url };
    case SET_RECIPE_TITLE:
      return { ...recipe, title: action.title };
    case SET_RECIPE_INGREDIENTS:
      return { ...recipe, ingredients: action.ingredients };
    case SET_RECIPE_METHOD:
      return { ...recipe, method: action.method };
    case SET_RECIPE_SERVINGS:
      const digits = action.servings.match(/(\d+)/);
      return { ...recipe, servings: digits ? Number(digits[1]) : undefined };
    case SCALE_BY_SERVINGS:
      return { ...recipe, scaledServings: action.servings };
    case RECIPE_LOADED:
      return action.recipe || recipe;
    default:
      return recipe;
  }
}
