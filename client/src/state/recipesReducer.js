import { RECIPES_LOADED } from "../actions";

export function recipesReducer(recipes = [], action) {
  switch (action.type) {
    case RECIPES_LOADED:
      return action.recipes;
    default:
      return recipes;
  }
}
