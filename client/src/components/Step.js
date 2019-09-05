import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StepIngredients } from "./StepIngredients";

const useStyles = makeStyles(theme => ({
  text: {
    marginBottom: theme.spacing(1),
    display: "flex"
  },
  ordering: {
    fontStyle: "italic",
    marginRight: theme.spacing(1)
  },
  instructions: {
    flexGrow: 1
  }
}));

export function Step({ step }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.text}>
        <div className={classes.ordering}>{step.ordering}.</div>
        <div className={classes.instructions}>{step.rawText}</div>
      </div>
      <StepIngredients step={step} />
    </div>
  );
}
