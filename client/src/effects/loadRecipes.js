import { call, put, takeLatest } from "redux-saga/effects";
import { errorLoadingRecipes, recipesLoaded, LOAD_RECIPES } from "../actions";
import { performQuery } from "./performQuery";

export function* watchLoadRecipes() {
  yield takeLatest(LOAD_RECIPES, fetchRecipes);
}

export function* fetchRecipes() {
  try {
    const result = yield call(performQuery, GET_RECIPES);
    yield put(recipesLoaded(result.recipes));
  } catch (error) {
    yield put(errorLoadingRecipes(error));
  }
}

export const GET_RECIPES = `
  query getRecipes {
    recipes {
      id
      title
    }
  }
`;
