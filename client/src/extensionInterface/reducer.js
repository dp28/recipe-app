import {
  REQUEST_TITLE,
  REQUEST_SERVINGS,
  REQUEST_INGREDIENTS,
  REQUEST_METHOD,
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  SET_RECIPE_METHOD,
  FINISH_CURRENT_EXTRACT_STEP,
  START_EXTRACT_STEP
} from "../extensionInterface/actions";
import { RECIPE_LOADED } from "../actions";
import { OrderedExtractionSteps as Steps } from "./extractionSteps";

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
    case REQUEST_SERVINGS:
    case REQUEST_INGREDIENTS:
    case REQUEST_METHOD:
      return { ...browserExtension, waiting: true };
    case SET_RECIPE_TITLE:
    case SET_RECIPE_SERVINGS:
    case SET_RECIPE_INGREDIENTS:
    case SET_RECIPE_METHOD:
      return stopWaiting(browserExtension);
    case FINISH_CURRENT_EXTRACT_STEP:
      return finishCurrentStep(browserExtension, recipe);
    case START_EXTRACT_STEP:
      return startStep(action.stepId, browserExtension, recipe);
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

  const currentStepIndex = getCurrentStepIndex(browserExtension.currentStep);
  const currentStep = Steps[currentStepIndex];
  if (!currentStep.isFinished(recipe)) {
    return browserExtension;
  }

  const nextStepIndex = currentStepIndex + 1;
  if (nextStepIndex >= Steps.length) {
    return { ...browserExtension, currentStep: null };
  }
  return {
    ...browserExtension,
    currentStep: Steps[nextStepIndex].property
  };
}

function startStep(stepId, browserExtension, recipe) {
  const index = getCurrentStepIndex(stepId);
  const targetStepIndex = index >= 0 ? index : Steps.length;

  const available = Steps.slice(0, targetStepIndex + 1).every(step =>
    step.isFinished(recipe)
  );

  if (!available) {
    return browserExtension;
  }

  const targetStep = Steps[targetStepIndex]
    ? Steps[targetStepIndex].property
    : null;
  return {
    ...browserExtension,
    currentStep: targetStep
  };
}

function getCurrentStepIndex(currentStep) {
  return Steps.findIndex(({ property }) => property === currentStep);
}
