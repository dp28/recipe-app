import { call, takeLatest, put, select } from "redux-saga/effects";
import {
  IMPORT_RECIPE_METHOD,
  setRecipeMethod
} from "../extensionInterface/actions";
import { parseMethod } from "../language/method";

export function* watchImportMethod() {
  yield takeLatest(IMPORT_RECIPE_METHOD, importMethodSaga);
}

export function* importMethodSaga({ steps }) {
  const ingredients = yield select(selectIngredients);
  const parsedMethod = yield call(parseMethod, { ingredients, steps });
  yield put(setRecipeMethod(parsedMethod));
}

export function selectIngredients(state) {
  return state.recipe.ingredients;
}
