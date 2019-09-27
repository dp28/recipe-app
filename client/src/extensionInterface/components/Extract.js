import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { Help } from "./Help";

const useStyles = makeStyles(theme => ({
  helpMultiple: {
    marginTop: theme.spacing(1)
  }
}));

export function UnconnectedExtract({
  dispatchRequest,
  waiting,
  property,
  value,
  children,
  propertyName,
  multiple = false
}) {
  const classes = useStyles();

  if (waiting) {
    return (
      <Help>
        Click on the recipe {propertyName}.
        {multiple && (
          <div className={classes.helpMultiple}>
            Each one should be highlighted separately.
          </div>
        )}
      </Help>
    );
  }
  if (value) {
    return (
      <div>
        {children(value)}
        <Button onClick={dispatchRequest}>Change {propertyName}</Button>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={dispatchRequest}>Set {propertyName}</Button>
    </div>
  );
}

export function mapStateToProps(state, { property, propertyName }) {
  return {
    value: state.recipe[property],
    waiting: state.browserExtension.waitingFor === property,
    propertyName: propertyName || property
  };
}

export function mapDispatchToProps(dispatch, { requestBuilder }) {
  return {
    dispatchRequest: () => dispatch(requestBuilder())
  };
}

export const Extract = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedExtract);
