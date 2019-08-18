import { call, takeLatest, put } from "redux-saga/effects";
import {
  IMPORT_RECIPE_INGREDIENTS,
  setRecipeIngredients
} from "../extensionInterface/actions";
import { parseIngredients } from "../language/ingredients";

export function* watchImportIngredients() {
  yield takeLatest(IMPORT_RECIPE_INGREDIENTS, importIngredientsSaga);
}

export function* importIngredientsSaga({ ingredients }) {
  const parsedIngredients = yield call(parseIngredients, ingredients);
  yield put(setRecipeIngredients(parsedIngredients));
}
