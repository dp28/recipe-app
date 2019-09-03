import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { IngredientsInput } from "./IngredientsInput";
import { ShoppingList } from "./ShoppingList";
import { Page } from "../Page";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export function ShoppingListPage() {
  const classes = useStyles();

  return (
    <Page>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <IngredientsInput />
          <ShoppingList />
        </Paper>
      </Grid>
    </Page>
  );
}
