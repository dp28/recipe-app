import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepContent from "@material-ui/core/StepContent";
import { ExtractTitle } from "./ExtractTitle";
import { ExtractServings } from "./ExtractServings";
import { ExtractIngredients } from "./ExtractIngredients";
import { ExtractMethod } from "./ExtractMethod";
import { SaveRecipeButton } from "./SaveRecipeButton";
import { Loading } from "../../components/Loading";
import { OrderedExtractionSteps } from "../extractionSteps";
import { finishCurrentExtractStep, startExtractStep } from "../actions";

const StepMap = {
  title: {
    label: "Identify the recipe's title",
    Component: ExtractTitle
  },
  servings: {
    label: "Identify the number of servings the recipe will make",
    Component: ExtractServings
  },
  ingredients: {
    label: "Identify all of the recipe's ingredients",
    Component: ExtractIngredients
  },
  method: {
    label: "Identify the recipe's steps",
    Component: ExtractMethod
  }
};

const useStyles = makeStyles(theme => ({
  action: {
    marginRight: theme.spacing(1)
  },
  actions: {
    marginTop: theme.spacing(2)
  },
  stepButton: {
    textAlign: "left"
  }
}));

export function UnconnectedExtensionPage({
  activeStepIndex,
  restartStep,
  finishStep,
  loading,
  waitingForExtraction,
  startStep,
  completedSteps
}) {
  const classes = useStyles();
  return (
    <Loading loading={loading}>
      <Stepper nonLinear activeStep={activeStepIndex} orientation="vertical">
        {OrderedExtractionSteps.map(({ property, requestBuilder }, index) => {
          const { Component, label } = StepMap[property];
          return (
            <Step key={property}>
              <StepButton
                onClick={() => startStep(property)}
                completed={completedSteps.has(property)}
                className={classes.stepButton}
              >
                {label}
              </StepButton>

              <StepContent>
                <Component />

                {!waitingForExtraction && (
                  <div className={classes.actions}>
                    <Button className={classes.action} onClick={restartStep}>
                      Retry
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.action}
                      onClick={finishStep}
                    >
                      Accept
                    </Button>
                  </div>
                )}
              </StepContent>
            </Step>
          );
        })}
        <Step>
          <StepButton onClick={() => startStep(null)} completed={false}>
            Save the recipe
          </StepButton>
          <StepContent>
            <SaveRecipeButton />
          </StepContent>
        </Step>
      </Stepper>
    </Loading>
  );
}

function mapStateToProps(state) {
  const { waiting, loading } = state.browserExtension;
  return {
    loading,
    recipe: state.recipe,
    waitingForExtraction: waiting,
    activeStepIndex: getActiveStepIndex(state),
    completedSteps: new Set(
      OrderedExtractionSteps.filter(step => step.isFinished(state.recipe)).map(
        step => step.property
      )
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startStep: stepId => dispatch(startExtractStep(stepId)),
    finishStep: (stepIndex, recipe) => () => {
      dispatch(finishCurrentExtractStep());
      const nextStep = OrderedExtractionSteps[stepIndex + 1];
      if (nextStep && !nextStep.isFinished(recipe)) {
        dispatch(nextStep.buildRequest());
      }
    },
    restartStep: stepIndex => () => {
      const step = OrderedExtractionSteps[stepIndex];
      if (step) {
        dispatch(step.buildRequest());
      }
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    finishStep: dispatchProps.finishStep(
      stateProps.activeStepIndex,
      stateProps.recipe
    ),
    restartStep: dispatchProps.restartStep(stateProps.activeStepIndex)
  };
}

function getActiveStepIndex(state) {
  const { currentStep } = state.browserExtension;
  const extractStepIndex = OrderedExtractionSteps.findIndex(
    step => step.property === currentStep
  );
  if (extractStepIndex >= 0) {
    return extractStepIndex;
  }
  if (
    !state.browserExtension.loading &&
    state.recipe &&
    state.recipe.method &&
    state.recipe.method.steps &&
    state.recipe.method.steps.length
  ) {
    return OrderedExtractionSteps.length;
  }
  return 0;
}

export const ExtensionPage = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UnconnectedExtensionPage);
