import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  list: {
    listStyle: "none",
    textAlign: "left",
    padding: 0
  }
}));

export function UnconnectedIngredientList({ ingredients }) {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {ingredients.map(ingredient => (
        <li key={ingredient.rawText}>{ingredient.rawText}</li>
      ))}
    </ul>
  );
}

export function mapStateToProps(state) {
  return {
    ingredients: state.ingredients
  };
}

export const IngredientList = connect(mapStateToProps)(
  UnconnectedIngredientList
);
