import { call, put, takeLatest } from "redux-saga/effects";
import {
  errorLoadingRecipe,
  recipeLoaded,
  LOAD_RECIPE_BY_ID
} from "../actions";
import { performQuery } from "./performQuery";

export function* watchLoadRecipeById() {
  yield takeLatest(LOAD_RECIPE_BY_ID, fetchRecipeById);
}

export function* fetchRecipeById({ id }) {
  try {
    const result = yield call(performQuery, GET_RECIPE_BY_ID, { id });
    yield put(recipeLoaded(result.recipe));
  } catch (error) {
    yield put(errorLoadingRecipe(error));
  }
}

export const FullRecipeFragment = `
  fragment FullRecipe on Recipe {
    id
    url
    title
    servings

    ingredients {
      id
      rawText
      instruction
      notes

      food {
        name
      }

      measurement {
        amount
        size
        unit
      }
    }

    method {
      steps {
        id
        ordering
        rawText
        ingredientIds

        timers {
          unit
          amount
        }
      }
    }
  }
`;

export const GET_RECIPE_BY_ID = `
  ${FullRecipeFragment}
  query getRecipe($id: String!) {
    recipe: findRecipeById(id: $id) {
      ...FullRecipe
    }
  }
`;
