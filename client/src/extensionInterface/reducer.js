import {
  REQUEST_TITLE,
  REQUEST_SERVINGS,
  REQUEST_INGREDIENTS,
  REQUEST_METHOD,
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  SET_RECIPE_METHOD,
  FINISH_CURRENT_EXTRACT_STEP
} from "../extensionInterface/actions";
import { RECIPE_LOADED } from "../actions";
import { OrderedExtractionSteps } from "./extractionSteps";

const InitialState = { waiting: false, currentStep: null, loading: true };

export function browserExtensionReducer(
  { browserExtension, recipe } = {},
  action
) {
  switch (action.type) {
    case RECIPE_LOADED:
      return {
        loading: false,
        waiting: false,
        currentStep: action.recipe ? null : "title"
      };
    case REQUEST_TITLE:
      return { ...browserExtension, waiting: true };
    case SET_RECIPE_TITLE:
      return stopWaiting(browserExtension);
    case REQUEST_SERVINGS:
      return { ...browserExtension, waiting: true };
    case SET_RECIPE_SERVINGS:
      return stopWaiting(browserExtension);
    case REQUEST_INGREDIENTS:
      return { ...browserExtension, waiting: true };
    case SET_RECIPE_INGREDIENTS:
      return stopWaiting(browserExtension);
    case REQUEST_METHOD:
      return { ...browserExtension, waiting: true };
    case SET_RECIPE_METHOD:
      return stopWaiting(browserExtension);
    case FINISH_CURRENT_EXTRACT_STEP:
      return finishCurrentStep(browserExtension, recipe);
    default:
      return browserExtension || InitialState;
  }
}

function stopWaiting(state) {
  return { ...state, waiting: false };
}

function finishCurrentStep(browserExtension, recipe) {
  if (!browserExtension.currentStep) {
    return browserExtension;
  }

  const currentStepIndex = OrderedExtractionSteps.findIndex(
    ({ property }) => property === browserExtension.currentStep
  );
  const currentStep = OrderedExtractionSteps[currentStepIndex];
  if (!currentStep.isFinished(recipe)) {
    return browserExtension;
  }

  const nextStepIndex = currentStepIndex + 1;
  if (nextStepIndex >= OrderedExtractionSteps.length) {
    return { ...browserExtension, currentStep: null };
  }
  return {
    ...browserExtension,
    currentStep: OrderedExtractionSteps[nextStepIndex].property
  };
}
