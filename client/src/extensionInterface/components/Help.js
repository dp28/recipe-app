import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

const useHelpStyles = makeStyles(theme => ({
  instruction: {
    padding: theme.spacing(2),
    backgroundColor: yellow[200]
  }
}));

export function Help({ children }) {
  const classes = useHelpStyles();
  return <div className={classes.instruction}>{children}</div>;
}
