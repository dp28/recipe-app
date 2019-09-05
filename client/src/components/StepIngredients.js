import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Ingredient } from "./Ingredient";

const useStyles = makeStyles(theme => ({
  list: {
    paddingLeft: theme.spacing(2),
    listStyle: "none"
  },
  listItem: {
    marginBottom: theme.spacing(1)
  }
}));

export function UnconnectedStepIngredients({ step, ingredients }) {
  const classes = useStyles();
  const [hidden, setHidden] = useState(true);

  if (ingredients.length === 0) {
    return null;
  }

  if (hidden) {
    return (
      <div>
        <Button onClick={() => setHidden(false)}>Show ingredients</Button>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => setHidden(true)}>Hide ingredients</Button>
      <ul className={classes.list}>
        {ingredients.map(ingredient => (
          <li className={classes.listItem}>
            <Ingredient key={ingredient.id} ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function mapStateToProps(state, { step }) {
  const allIngredients = state.recipe.ingredients;
  const ingredientIds = new Set(step.ingredientIds);
  return {
    ingredients: allIngredients.filter(({ id }) => ingredientIds.has(id))
  };
}

export const StepIngredients = connect(mapStateToProps)(
  UnconnectedStepIngredients
);
