import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import * as actions from "../../actions";

export function UnconnectedSaveRecipeButton({ recipe, saveRecipe }) {
  return (
    <Button
      disabled={!recipe}
      color="primary"
      variant="contained"
      onClick={() => saveRecipe(recipe)}
    >
      Save
    </Button>
  );
}

export function mapStateToProps({ recipe }) {
  if (
    recipe.title &&
    recipe.servings &&
    recipe.ingredients &&
    recipe.ingredients.length &&
    recipe.method &&
    recipe.method.steps &&
    recipe.method.steps.length
  ) {
    return { recipe };
  }
  return {
    recipe: null
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    saveRecipe: recipe => dispatch(actions.saveRecipe(recipe))
  };
}

export const SaveRecipeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedSaveRecipeButton);
