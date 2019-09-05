import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StepIngredients } from "./StepIngredients";

const useStyles = makeStyles(theme => ({
  ordering: {
    fontWeight: "bold",
    display: "inline-block"
  }
}));

export function Step({ step }) {
  const classes = useStyles();

  return (
    <div>
      <span className={classes.ordering}>{step.ordering}.</span>{" "}
      <span>{step.rawText}</span>
      <StepIngredients step={step} />
    </div>
  );
}
