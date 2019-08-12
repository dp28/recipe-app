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
  instruction: {
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
        Click on the recipe instructions. Each instruction should be highlighted
        separately.
      </Help>
    );
  }
  if (method) {
    return (
      <div>
        <h4>Method</h4>
        <Button onClick={requestMethod}>Change instructions</Button>

        <ol className={classes.list}>
          {method.instructions.map(instruction => (
            <li key={instruction.text} className={classes.instruction}>
              {instruction.text}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={requestMethod}>Set instructions</Button>
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
