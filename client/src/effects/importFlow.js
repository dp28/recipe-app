import { takeLatest, put, select } from "redux-saga/effects";
import {
  SET_RECIPE_URL,
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod
} from "../extensionInterface/actions";

export function* watchImportActions() {
  yield takeLatest(
    [
      SET_RECIPE_URL,
      SET_RECIPE_TITLE,
      SET_RECIPE_SERVINGS,
      SET_RECIPE_INGREDIENTS
    ],
    startNextImportStep
  );
}

const NextSteps = {
  [SET_RECIPE_URL]: {
    buildRequest: requestTitle,
    condition: () => true
  },
  [SET_RECIPE_TITLE]: {
    buildRequest: requestServings,
    condition: recipe => !recipe.servings
  },
  [SET_RECIPE_SERVINGS]: {
    buildRequest: requestIngredients,
    condition: recipe => !recipe.ingredients
  },
  [SET_RECIPE_INGREDIENTS]: {
    buildRequest: requestMethod,
    condition: ({ method }) => !method || !method.steps || !method.steps.length
  }
};

export function* startNextImportStep(action) {
  const recipe = yield select(state => state.recipe);
  const nextStep = NextSteps[action.type];
  if (nextStep && nextStep.condition(recipe)) {
    yield put(nextStep.buildRequest());
  }
}
