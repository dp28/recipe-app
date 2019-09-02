import { call, put, takeLatest } from "redux-saga/effects";
import { errorSavingRecipe, recipeSaved, SAVE_RECIPE } from "../actions";
import { performQuery } from "./performQuery";

export function* watchSaveRecipe() {
  yield takeLatest(SAVE_RECIPE, performSaveRecipeMutation);
}

export function* performSaveRecipeMutation({ recipe }) {
  try {
    const result = yield call(performQuery, SAVE_RECIPE_MUTATION, {
      recipe
    });
    yield put(recipeSaved(result.saveRecipe.event.payload.recipe.id));
  } catch (error) {
    yield put(errorSavingRecipe(error));
  }
}

export const SAVE_RECIPE_MUTATION = `
  mutation saveRecipe($recipe: RecipeInput!) {
    saveRecipe: importRecipe(recipe: $recipe) {
      event {
        payload {
          recipe {
             id
          }
        }
      }
    }
  }
`;
