import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
        <div>
          <h4>Ingredients</h4>
          <Button onClick={requestIngredients}>Change ingredients</Button>

          <ol className={classes.list}>
            {ingredients.map(ingredient => (
              <li key={ingredient.id} className={classes.ingredient}>
                <Ingredient ingredient={ingredient} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </Extract>
  );
}
