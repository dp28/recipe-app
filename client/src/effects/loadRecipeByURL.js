import { call, put, takeLatest } from "redux-saga/effects";
import {
  errorLoadingRecipe,
  recipeLoaded,
  LOAD_RECIPE_BY_URL
} from "../actions";
import { performQuery } from "./performQuery";
import { FullRecipeFragment } from "./loadRecipeById";

export function* watchLoadRecipeByURL() {
  yield takeLatest(LOAD_RECIPE_BY_URL, fetchRecipeByURL);
}

export function* fetchRecipeByURL({ url }) {
  try {
    const result = yield call(performQuery, GET_RECIPE_BY_URL, { url });
    yield put(recipeLoaded(result.recipe));
  } catch (error) {
    yield put(errorLoadingRecipe(error));
  }
}

export const GET_RECIPE_BY_URL = `
  ${FullRecipeFragment}
  query getRecipe($url: String!) {
    recipe: findRecipeByURL(url: $url) {
      ...FullRecipe
    }
  }
`;
