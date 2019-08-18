import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as actions from "../actions";
import { Help } from "./Help";
import { Ingredient } from "../../components/Ingredient";

const useIngredientStyles = makeStyles(theme => ({
  list: {
    listStyle: "none",
    padding: theme.spacing(1)
  },
  ingredient: {
    marginBottom: theme.spacing(2)
  }
}));

export function UnconnectedExtractIngredients({
  ingredients,
  requestIngredients,
  waitingForIngredients
}) {
  const classes = useIngredientStyles();

  if (waitingForIngredients) {
    return (
      <Help>
        Click on the recipe ingredients. Each ingredient should be highlighted
        separately.
      </Help>
    );
  }
  if (ingredients) {
    return (
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
    );
  }
  return (
    <div>
      <Button onClick={requestIngredients}>Set ingredients</Button>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    ingredients: state.recipe.ingredients,
    waitingForIngredients: state.browserExtension.waitingFor === "ingredients"
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    requestIngredients: () => dispatch(actions.requestIngredients())
  };
}

export const ExtractIngredients = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedExtractIngredients);
