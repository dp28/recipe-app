import { takeLatest, put, select } from "redux-saga/effects";
import {
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod
} from "../extensionInterface/actions";
import { RECIPE_LOADED } from "../actions";

const NextSteps = {
  [RECIPE_LOADED]: {
    buildRequest: requestTitle,
    condition: ({ action }) => !action.recipe
  },
  [SET_RECIPE_TITLE]: {
    buildRequest: requestServings,
    condition: ({ recipe }) => !recipe.servings
  },
  [SET_RECIPE_SERVINGS]: {
    buildRequest: requestIngredients,
    condition: ({ recipe }) => !recipe.ingredients
  },
  [SET_RECIPE_INGREDIENTS]: {
    buildRequest: requestMethod,
    condition: ({ recipe: { method } }) =>
      !method || !method.steps || !method.steps.length
  }
};

export function* watchImportActions() {
  yield takeLatest(Object.keys(NextSteps), startNextImportStep);
}

export function* startNextImportStep(action) {
  const recipe = yield select(state => state.recipe);
  const nextStep = NextSteps[action.type];
  if (nextStep && nextStep.condition({ recipe, action })) {
    yield put(nextStep.buildRequest());
  }
}
