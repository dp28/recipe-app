import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { requestMethod } from "../actions";
import { Extract } from "./Extract";

const useMethodStyles = makeStyles(theme => ({
  list: {
    listStyle: "decimal"
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
    >
      {method => (
        <div>
          <h4>Method</h4>

          <ol className={classes.list}>
            {method.steps.map(step => (
              <li key={step.id} className={classes.step}>
                {step.rawText}
              </li>
            ))}
          </ol>
        </div>
      )}
    </Extract>
  );
}
