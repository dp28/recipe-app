import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Ingredient } from "../../components/Ingredient";
import { requestIngredients } from "../actions";
import { Extract } from "./Extract";

const useIngredientStyles = makeStyles(theme => ({
  list: {
    listStyle: "none",
    padding: theme.spacing(1)
  },
  ingredient: {
    marginBottom: theme.spacing(2)
  }
}));

export function ExtractIngredients() {
  const classes = useIngredientStyles();
  return (
    <Extract
      property="ingredients"
      multiple={true}
      requestBuilder={requestIngredients}
    >
      {ingredients => (
        <ol className={classes.list}>
          {ingredients.map(ingredient => (
            <li key={ingredient.id} className={classes.ingredient}>
              <Ingredient ingredient={ingredient} />
            </li>
          ))}
        </ol>
      )}
    </Extract>
  );
}
