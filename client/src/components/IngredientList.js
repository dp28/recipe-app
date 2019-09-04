import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { Ingredient } from "./Ingredient";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "left"
  },
  list: {
    padding: 0,
    listStyle: "none"
  },
  listItem: {
    marginBottom: theme.spacing(1)
  }
}));

export function IngredientList({ ingredients }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h2>Ingredients</h2>
      <ul className={classes.list}>
        {ingredients.map(ingredient => (
          <li key={ingredient.id} className={classes.listItem}>
            <Ingredient ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </Paper>
  );
}
