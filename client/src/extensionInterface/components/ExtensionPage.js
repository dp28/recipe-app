import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { ExtractTitle } from "./ExtractTitle";
import { ExtractServings } from "./ExtractServings";
import { ExtractIngredients } from "./ExtractIngredients";
import { ExtractMethod } from "./ExtractMethod";
import { SaveRecipeButton } from "./SaveRecipeButton";
import { Loading } from "../../components/Loading";
import { OrderedExtractionSteps } from "../extractionSteps";
import { finishCurrentExtractStep } from "../actions";

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
  }
}));

export function UnconnectedExtensionPage({
  activeStepIndex,
  restartStep,
  finishStep,
  loading,
  waitingForExtraction
}) {
  const classes = useStyles();
  return (
    <Loading loading={loading}>
      <Stepper activeStep={activeStepIndex} orientation="vertical">
        {OrderedExtractionSteps.map(({ property, requestBuilder }) => {
          const { Component, label } = StepMap[property];
          return (
            <Step key={property}>
              <StepLabel>{label}</StepLabel>
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
      </Stepper>
    </Loading>
  );
}

function mapStateToProps(state) {
  const { waiting, loading } = state.browserExtension;
  return {
    loading,
    waitingForExtraction: waiting,
    activeStepIndex: getActiveStepIndex(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    finishStep: stepIndex => () => {
      dispatch(finishCurrentExtractStep());
      const nextStep = OrderedExtractionSteps[stepIndex + 1];
      if (nextStep) {
        dispatch(nextStep.buildRequest());
      }
    },
    restartStep: stepIndex => () =>
      dispatch(OrderedExtractionSteps[stepIndex].buildRequest())
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    finishStep: dispatchProps.finishStep(stateProps.activeStepIndex),
    restartStep: dispatchProps.restartStep(stateProps.activeStepIndex)
  };
}

function getActiveStepIndex(state) {
  const { currentStep } = state.browserExtension;
  return (
    OrderedExtractionSteps.findIndex(step => step.property === currentStep) || 0
  );
}

export const ExtensionPage = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UnconnectedExtensionPage);
