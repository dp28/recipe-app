import { combineReducers } from "redux";
import {
  UPDATE_INGREDIENTS,
  COMBINE_INGREDIENTS,
  ADD_CATEGORY,
  ADD_TO_CATEGORY
} from "../actions";
import { parseIngredient as oldParseIngredient } from "../domain/parseIngredient";
import { combineIngredientsIfPossible } from "../domain/combineIngredients";
import { browserExtensionReducer } from "../extensionInterface/reducer";
import { recipeReducer } from "./recipeReducer";
import { recipesReducer } from "./recipesReducer";
import { metadataReducer } from "./metadataReducer";

export const reducer = combineReducers({
  meta: metadataReducer,
  ingredients: ingredientsReducer,
  categories: categoriesReducer,
  recipe: recipeReducer,
  recipes: recipesReducer,
  browserExtension: browserExtensionReducer
});

function categoriesReducer(categories = [], action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...categories, { name: action.name }];
    default:
      return categories;
  }
}

function ingredientsReducer(ingredients = [], action) {
  switch (action.type) {
    case UPDATE_INGREDIENTS:
      return action.ingredients.split("\n").map(oldParseIngredient);

    case COMBINE_INGREDIENTS:
      return combineIngredients(ingredients, action.ingredients);

    case ADD_TO_CATEGORY:
      return ingredients.map(ingredient =>
        ingredient.food.name === action.ingredient.food.name
          ? { ...ingredient, categoryName: action.categoryName }
          : ingredient
      );
    default:
      return ingredients;
  }
}

function combineIngredients(allIngredients, ingredientsToCombine) {
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
