import { combineReducers } from "redux";
import {
  API_METADATA_LOADED,
  ERROR_LOADING_API_METADATA,
  REQUEST_API_METADATA,
  UPDATE_INGREDIENTS,
  COMBINE_INGREDIENTS
} from "../actions";
import { parseIngredient } from "../domain/parseIngredient";
import { combineIngredientsIfPossible } from "../domain/combineIngredients";

const metadataReducer = combineReducers({ api: apiMetadataReducer });

export const reducer = combineReducers({
  meta: metadataReducer,
  ingredients: ingredientsReducer
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

function ingredientsReducer(ingredients = [], action) {
  switch (action.type) {
    case UPDATE_INGREDIENTS:
      return action.ingredients.split("\n").map(parseIngredient);

    case COMBINE_INGREDIENTS:
      return combineIngredients(ingredients, action.ingredients);
    default:
      return ingredients;
  }
}

function combineIngredients(allIngredients, ingredientsToCombine) {
  console.log({ allIngredients, ingredientsToCombine });
  const combined = combineIngredientsIfPossible(ingredientsToCombine, {
    ignoreFood: true
  });
  const foodNamesToRemove = ingredientsToCombine.reduce((names, { food }) => {
    if (food.name !== combined.food.name) {
      names.add(food.name);
    }
    return names;
  }, new Set());
  return allIngredients.reduce((all, ingredient) => {
    if (foodNamesToRemove.has(ingredient.food.name)) {
      return all;
    }
    if (ingredient.food.name === combined.food.name) {
      all.push(combined);
    } else {
      all.push(ingredient);
    }
    return all;
  }, []);
}
