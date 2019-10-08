import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { requestMethod } from "../actions";
import { Extract } from "./Extract";

const useMethodStyles = makeStyles(theme => ({
  list: {
    listStyle: "decimal",
    paddingLeft: theme.spacing(2)
  },
  step: {
    marginBottom: theme.spacing(1)
  }
}));

export function ExtractMethod() {
  const classes = useMethodStyles();

  return (
    <Extract
      property="method"
      propertyName="steps"
      multiple={true}
      requestBuilder={requestMethod}
      count={method => method.steps.length}
    >
      {method => (
        <ol className={classes.list}>
          {method.steps.map(step => (
            <li key={step.id} className={classes.step}>
              {step.rawText}
            </li>
          ))}
        </ol>
      )}
    </Extract>
  );
}
