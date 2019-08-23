import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as actions from "../actions";
import { Help } from "./Help";

const useMethodStyles = makeStyles(theme => ({
  list: {
    listStyle: "decimal"
  },
  step: {
    marginBottom: theme.spacing(1)
  }
}));

export function UnconnectedExtractMethod({
  method,
  requestMethod,
  waitingForMethod
}) {
  const classes = useMethodStyles();

  if (waitingForMethod) {
    return (
      <Help>
        Click on the recipe steps. Each step should be highlighted separately.
      </Help>
    );
  }
  if (method) {
    return (
      <div>
        <h4>Method</h4>
        <Button onClick={requestMethod}>Change steps</Button>

        <ol className={classes.list}>
          {method.steps.map(step => (
            <li key={step.id} className={classes.step}>
              {step.rawText}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={requestMethod}>Set steps</Button>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    method: state.recipe.method,
    waitingForMethod: state.browserExtension.waitingFor === "method"
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    requestMethod: () => dispatch(actions.requestMethod())
  };
}

export const ExtractMethod = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedExtractMethod);
