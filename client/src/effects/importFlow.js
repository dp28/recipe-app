import { takeLatest, put, select } from "redux-saga/effects";
import { requestTitle } from "../extensionInterface/actions";
import { RECIPE_LOADED } from "../actions";

const NextSteps = {
  [RECIPE_LOADED]: {
    buildRequest: requestTitle,
    condition: ({ action }) => !action.recipe
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
