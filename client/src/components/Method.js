import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { Step } from "./Step";

const useStyles = makeStyles(theme => ({
  item: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: "left"
  }
}));

export function Method({ method }) {
  const classes = useStyles();

  return [
    <Paper key="title" className={classes.item}>
      <h2>Method</h2>
    </Paper>,
    ...method.steps.map(step => (
      <Paper key={step.id} className={classes.item}>
        <Step step={step} />
      </Paper>
    ))
  ];
}
